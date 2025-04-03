package com.cothink.bluepen.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

import com.cothink.bluepen.entity.TblRecruit;
import com.cothink.bluepen.repository.RecruitRepo;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TblPublicService {

	private final RecruitRepo recruitRepo;

	public void fetchPublicRecruit() throws IOException {
		String serviceKey = "Tkhcf%2FIzpxOGAHtelWE2J0S8UOHaRjjD1tPbLeL0pXTQ5pWfI7kSVvynqNpbmIZGdwM9BsRl%2FWEQAmCPPMAiVA%3D%3D";
		int numOfRows = 20;
		int currentPage = 1;
		int totalPages = 1; // 기본값

		boolean first = true;

		while (currentPage <= totalPages) {
			// ✅ URL 구성
			StringBuilder urlBuilder = new StringBuilder("https://apis.data.go.kr/1051000/recruitment/list");
			urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=" + serviceKey);
			urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
					+ URLEncoder.encode(String.valueOf(numOfRows), "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("ongoingYn", "UTF-8") + "=" + URLEncoder.encode("Y", "UTF-8"));
			urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "="
					+ URLEncoder.encode(String.valueOf(currentPage), "UTF-8"));
			urlBuilder.append(
					"&" + URLEncoder.encode("pbancBgngYmd", "UTF-8") + "=" + URLEncoder.encode("2025-01-01", "UTF-8"));
			urlBuilder.append(
					"&" + URLEncoder.encode("pbancEndYmd", "UTF-8") + "=" + URLEncoder.encode("2025-12-31", "UTF-8"));
			urlBuilder
					.append("&" + URLEncoder.encode("resultType", "UTF-8") + "=" + URLEncoder.encode("json", "UTF-8"));

			// ✅ API 호출
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			BufferedReader rd;
			if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}

			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			rd.close();
			conn.disconnect();

			// ✅ JSON 파싱
			ObjectMapper mapper = new ObjectMapper();
			JsonNode root = mapper.readTree(sb.toString());

			// 전체 페이지 계산 (최초 한 번만)
			if (first) {
				int totalCount = root.path("totalCount").asInt(0);
				totalPages = (int) Math.ceil((double) totalCount / numOfRows);
				System.out.println("📦 총 공고 수: " + totalCount + "개 / 📄 총 페이지 수: " + totalPages + "페이지");
				first = false;
			}

			JsonNode items = root.path("result");
			if (!items.isArray()) {
				System.out.println("❌ item 배열이 없습니다 (page=" + currentPage + ")");
				break;
			}

			for (JsonNode item : items) {
				String recruitTitle = item.path("recrutPbancTtl").asText("제공 없음");
				String company = item.path("instNm").asText("제공 없음");
				String academic = item.path("acbgCondNmLst").asText("제공 없음");
				String duty = item.path("hireTypeNmLst").asText("제공 없음");
				String career = item.path("recrutSeNm").asText("제공 없음");
				String position = item.path("ncsCdNmLst").asText("제공 없음");
				String workingArea = item.path("workRgnNmLst").asText("제공 없음");
				String startedAt = item.path("pbancBgngYmd").asText("20250101");
				String closedAt = item.path("pbancEndYmd").asText("20251231");
				String srcUrl = item.path("srcUrl").asText("제공 없음");

				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
				LocalDate startedDate = LocalDate.parse(startedAt, formatter);
				LocalDate closedDate = LocalDate.parse(closedAt, formatter);

				// 중복 제거
				recruitRepo.findRecruit(company, recruitTitle, startedDate).forEach(r -> recruitRepo.delete(r));

				// 저장
				TblRecruit recruit = TblRecruit.builder().company(company).recruitTitle(recruitTitle).academic(academic)
						.duty(duty).position(position).career(career).salary("제공 없음").workingDay("제공 없음")
						.workingArea(workingArea).startedAt(startedDate).closedAt(closedDate).srcUrl(srcUrl).build();

				recruitRepo.save(recruit);
				System.out.println("✅ 저장됨 [" + currentPage + "p]: " + recruitTitle);
			}

			currentPage++;
		}
	}
}
