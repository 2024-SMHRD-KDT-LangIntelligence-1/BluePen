package com.cothink.bluepen.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.cothink.bluepen.entity.TblRecruit;
import com.cothink.bluepen.repository.RecruitRepo;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TblRecruitService {

	private final RecruitRepo recruitRepo;
	private final RestTemplate restTemplate = new RestTemplate();
	private final DateTimeFormatter saraminDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ssZ");
	private final DateTimeFormatter publicDateFormat = DateTimeFormatter.ofPattern("yyyyMMdd");

	@Transactional
	public void fetchAllRecruitData() {
		fetchFromSaramin(); // 사람인 API 데이터 수집
		fetchFromPublicApi(); // 공공데이터 API 데이터 수집
	}

	public void fetchFromSaramin() {
		try {
			System.out.println("✅ 사람인 API 수집 시작");

			int count = 10; // 한 번에 가져올 개수
			int total = 0; // 전체 공고 수

			// 첫 요청 보내서 전체 개수 확인
			String initUrl = "https://oapi.saramin.co.kr/job-search?access-key=QHnYbptlAJGdoMD3UwjtIb9ipGQ7bquTADZr68KLzsFIeuQkLpK"
					+ "&keywords=개발자&stock=kospi+kosdaq+konex&sr=directhire"
					+ "&fields=posting-date+expiration-date&count=" + count + "&start=1";

			String initJson = restTemplate.getForObject(initUrl, String.class);
			ObjectMapper mapper = new ObjectMapper();
			JsonNode root = mapper.readTree(initJson);

			total = root.path("jobs").path("total").asInt();
			System.out.println("📊 전체 공고 수: " + total);

			int lastStart = ((total - 1) / count) * count + 1;

			// 데이터 반복 수집
			for (int start = 1; start <= lastStart; start += count) {
				String url = "https://oapi.saramin.co.kr/job-search?access-key=QHnYbptlAJGdoMD3UwjtIb9ipGQ7bquTADZr68KLzsFIeuQkLpK"
						+ "&keywords=개발자&stock=kospi+kosdaq+konex&sr=directhire"
						+ "&fields=posting-date+expiration-date&count=" + count + "&start=" + start;

				String json = restTemplate.getForObject(url, String.class);
				JsonNode jobList = mapper.readTree(json).path("jobs").path("job");

				if (jobList.isEmpty()) {
					System.out.println("📴 더 이상 수신된 job이 없습니다. 루프 종료!!!");
					break;
				}

				for (JsonNode job : jobList) {
					String title = extractJsonValue(job, "position", "title");
					String company = extractJsonValue(job, "company", "detail", "name");

					String location = extractJsonValue(job, "position", "location", "name");
					location = decodeHtmlEntities(location);
					location = location.replace(">", " ");

					String jobType = extractJsonValue(job, "position", "job-type", "name"); // ← 요기 제대로 들어가야 함!!!
					String experience = extractJsonValue(job, "position", "experience-level", "name");
					String education = extractJsonValue(job, "position", "required-education-level", "name");
					String position = extractJsonValue(job, "position", "job-mid-code", "name");
					String srcUrl = extractJsonValue(job, "url"); // 실제 경로 구조에 따라 조정 필요
					String startedRaw = job.path("posting-date").asText();
					String closedTimestampStr = job.path("expiration-timestamp").asText();

					LocalDateTime startedAt = LocalDateTime.parse(startedRaw, saraminDateFormat);
					LocalDateTime closedAt = LocalDateTime.ofEpochSecond(Long.parseLong(closedTimestampStr), 0,
							ZoneOffset.of("+09:00"));

					// 기존 공고 삭제 처리
					List<TblRecruit> existing = recruitRepo.findByCompanyAndRecruitTitleAndStartedAt(company, title,
							startedAt);
					if (!existing.isEmpty()) {
						recruitRepo.deleteAll(existing);
						System.out.println("🧹 기존 중복 공고 삭제 완료: " + title);
					}

					TblRecruit recruit = TblRecruit.builder().company(company).recruitTitle(title).career(experience)
							.academic(education).duty(jobType).salary("협의").position(position).workingDay("협의")
							.workingArea(location).startedAt(startedAt).closedAt(closedAt).srcUrl(srcUrl).build();

					try {
						recruitRepo.save(recruit);
						System.out.println("✅ 저장 완료: " + recruit.getRecruitTitle());
					} catch (Exception saveEx) {
						System.out.println("❌ 저장 실패: " + title);
						saveEx.printStackTrace();
					}
				}
			}
		} catch (Exception e) {
			System.out.println("❌ 사람인 전체 수집 실패!!!");
			e.printStackTrace();
		}
	}

	// ✅ 요기요기!!!! 이 중괄호 `}` 다음에!!!! 👇
	private static String decodeHtmlEntities(String input) {
		if (input == null)
			return null;
		return input.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&").replace("&quot;", "\"")
				.replace("&#39;", "'");
	}

	// ✅ JSON 경로 안전 파싱 유틸 함수 (형님 전용 강화버전)
	private String extractJsonValue(JsonNode root, String... keys) {
		JsonNode node = root;
		for (String key : keys) {
			if (node == null || node.isMissingNode()) {
				return "협의"; // 기본값
			}
			node = node.path(key);
		}
		return node == null || node.isMissingNode() ? "협의" : node.asText().trim();
	}

	public void fetchFromPublicApi() {
		try {
			System.out.println("✅ 공공데이터 API(XML) 수집 시작");

			String serviceKey = "Tkhcf%2FIzpxOGAHtelWE2J0S8UOHaRjjD1tPbLeL0pXTQ5pWfI7kSVvynqNpbmIZGdwM9BsRl%2FWEQAmCPPMAiVA%3D%3D";
			int numOfRows = 20;
			String startDate = "20250101";
			String endDate = "20251231";

			for (int pageNo = 1; pageNo <= 23; pageNo++) {
				try {
					String url = String.format("https://apis.data.go.kr/1051000/recruitment/list" + "?serviceKey=%s"
							+ "&numOfRows=%d" + "&pageNo=%d" + "&ongoingYn=Y" + "&pbancBgngYmd=%s" + "&pbancEndYmd=%s"
							+ "Type=XML", serviceKey, numOfRows, pageNo, startDate, endDate);

					System.out.println("📡 URL 요청 전: " + url);

					String xml = restTemplate.getForObject(url, String.class);
					System.out.println("📥 수신된 XML: " + xml);

					Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder()
							.parse(new java.io.ByteArrayInputStream(xml.getBytes()));
					doc.getDocumentElement().normalize();

					NodeList itemList = doc.getElementsByTagName("item");
					System.out.println("📊 데이터 크기: " + itemList.getLength());

					for (int i = 0; i < itemList.getLength(); i++) {
						Node item = itemList.item(i);
						if (item.getNodeType() != Node.ELEMENT_NODE)
							continue;
						Element elem = (Element) item;

						String recruitTitle = getTagValue(elem, "recrutPbancTtl");
						String company = getTagValue(elem, "instNm");
						String academic = getTagValue(elem, "acbgCondNmLst");
						String duty = getTagValue(elem, "hireTypeNmLst");
						String position = getTagValue(elem, "recrutSeNm");
						String workingArea = getTagValue(elem, "workRgnNmLst");
						String startedAtStr = getTagValue(elem, "pbancBgngYmd");
						String closedAtStr = getTagValue(elem, "pbancEndYmd");
						String srcUrl = getTagValue(elem, "srcUrl");

						LocalDateTime startedAt = LocalDate.parse(startedAtStr, publicDateFormat).atStartOfDay();
						LocalDateTime closedAt = LocalDate.parse(closedAtStr, publicDateFormat).atStartOfDay();

						List<TblRecruit> existing = recruitRepo.findByCompanyAndRecruitTitleAndStartedAt(company,
								recruitTitle, startedAt);
						if (!existing.isEmpty()) {
							recruitRepo.deleteAll(existing);
							System.out.println("🧹 기존 공고 삭제: " + recruitTitle);
						}

						TblRecruit recruit = TblRecruit.builder().company(company).recruitTitle(recruitTitle)
								.academic(academic).duty(duty).position(position).career("협의").salary("협의")
								.workingArea(workingArea).workingDay("협의").startedAt(startedAt).closedAt(closedAt)
								.srcUrl(srcUrl).build();

						recruitRepo.save(recruit);
						System.out.println("✅ 저장 완료: " + recruitTitle);
					}
				} catch (Exception pageErr) {
					System.out.println("❌ 페이지 수집 실패 (pageNo=" + pageNo + ") !!!");
					pageErr.printStackTrace();
				}
			}
		} catch (Exception e) {
			System.out.println("❌ 공공데이터 전체 수집 실패!!!!!");
			e.printStackTrace();
		}
	}

	private String getTagValue(Element elem, String tag) {
		try {
			NodeList nList = elem.getElementsByTagName(tag);
			if (nList.getLength() == 0)
				return "협의";
			Node node = nList.item(0);
			if (node == null || node.getTextContent() == null)
				return "협의";
			return node.getTextContent().trim();
		} catch (Exception e) {
			return "협의";
		}
	}
}