package com.cothink.bluepen.service;

import java.io.ByteArrayInputStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
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

			int count = 10;
			int total = 0;

			String initUrl = "https://oapi.saramin.co.kr/job-search?access-key=QHnYbptlAJGdoMD3UwjtIb9ipGQ7bquTADZr68KLzsFIeuQkLpK"
					+ "&keywords=개발자&stock=kospi+kosdaq+konex&sr=directhire"
					+ "&fields=posting-date+expiration-date&count=" + count + "&start=1";

			String initJson = restTemplate.getForObject(initUrl, String.class);
			ObjectMapper mapper = new ObjectMapper();
			JsonNode root = mapper.readTree(initJson);

			total = root.path("jobs").path("total").asInt();
			System.out.println("📊 전체 공고 수: " + total);

			int lastStart = ((total - 1) / count) * count + 1;

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
					location = decodeHtmlEntities(location).replace(">", " ");

					String jobType = extractJsonValue(job, "position", "job-type", "name");
					String experience = extractJsonValue(job, "position", "experience-level", "name");
					String education = extractJsonValue(job, "position", "required-education-level", "name");
					String position = extractJsonValue(job, "position", "job-mid-code", "name");
					String srcUrl = extractJsonValue(job, "url");
					String startedRaw = job.path("posting-date").asText();
					String closedTimestampStr = job.path("expiration-timestamp").asText();

					LocalDate startedAt = LocalDateTime.parse(startedRaw, saraminDateFormat).toLocalDate();
					LocalDate closedAt = LocalDateTime
							.ofEpochSecond(Long.parseLong(closedTimestampStr), 0, ZoneOffset.of("+09:00"))
							.toLocalDate();

					List<TblRecruit> duplicates = recruitRepo.findRecruit(company, title, startedAt);
					if (!duplicates.isEmpty()) {
						recruitRepo.deleteAll(duplicates);
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

	public void fetchFromPublicApi() {
		try {
			System.out.println("✅ 공공데이터 API(XML) 수집 시작");

			String rawServiceKey = "Tkhcf/IzpxOGAHtelWE2J0S8UOHaRjjD1tPbLeL0pXTQ5pWfI7kSVvynqNpbmIZGdwM9BsRl/WEQAmCPPMAiVA==";
			int numOfRows = 20;
			String startDate = "20250101"; // ✅ 날짜 포맷 수정됨!!!!
			String endDate = "20251231";

			for (int pageNo = 1; pageNo <= 23; pageNo++) {
				try {
					URI uri = new URI("http", "apis.data.go.kr", "/1051000/recruitment/list", String.format(
							"serviceKey=%s&numOfRows=%d&ongoingYn=Y&pageNo=%d&pbancBgngYmd=%s&pbancEndYmd=%s&resultType=xml",
							rawServiceKey, numOfRows, pageNo, startDate, endDate), null);

					System.out.println("📡 요청 URI: " + uri.toString());

					String xmlResponse = new String(restTemplate.getForObject(uri, byte[].class),
							StandardCharsets.UTF_8);
					System.out.println("📥 받은 XML: \n" + xmlResponse);

					DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = factory.newDocumentBuilder();
					Document doc = builder
							.parse(new ByteArrayInputStream(xmlResponse.getBytes(StandardCharsets.UTF_8)));

					doc.getDocumentElement().normalize();

					NodeList itemList = doc.getElementsByTagName("item");
					System.out.println("📊 데이터 크기: " + itemList.getLength());

					for (int i = 0; i < itemList.getLength(); i++) {
						Node node = itemList.item(i);
						if (node.getNodeType() == Node.ELEMENT_NODE) {
							Element elem = (Element) node;

							String recruitTitle = getTagValue(elem, "recrutPbancTtl");
							String company = getTagValue(elem, "instNm");
							String academic = getTagValue(elem, "acbgCondNmLst");
							String duty = getTagValue(elem, "hireTypeNmLst");
							String position = getTagValue(elem, "recrutSeNm");
							String workingArea = getTagValue(elem, "workRgnNmLst");
							String startedAtStr = getTagValue(elem, "pbancBgngYmd");
							String closedAtStr = getTagValue(elem, "pbancEndYmd");
							String srcUrl = getTagValue(elem, "srcUrl");

							LocalDate startedAt = LocalDate.parse(startedAtStr, publicDateFormat);
							LocalDate closedAt = LocalDate.parse(closedAtStr, publicDateFormat);

							List<TblRecruit> existing = recruitRepo.findRecruit(company, recruitTitle, startedAt);
							if (!existing.isEmpty()) {
								recruitRepo.deleteAll(existing);
								System.out.println("🧹 기존 공고 삭제: " + recruitTitle);
							}

							TblRecruit recruit = TblRecruit.builder().company(company).recruitTitle(recruitTitle)
									.academic(academic).duty(duty).position(position).career("제공 없음").salary("제공 없음")
									.workingArea(workingArea).workingDay("제공 없음").startedAt(startedAt)
									.closedAt(closedAt).srcUrl(srcUrl).build();

							recruitRepo.save(recruit);
							System.out.println("✅ 저장 완료: " + recruitTitle);
						}
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

	// ✅ HTML 엔티티 디코딩 함수
	private static String decodeHtmlEntities(String input) {
		if (input == null)
			return null;
		return input.replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&").replace("&quot;", "\"")
				.replace("&#39;", "'");
	}

	// ✅ JSON 유틸 함수
	private String extractJsonValue(JsonNode root, String... keys) {
		JsonNode node = root;
		for (String key : keys) {
			if (node == null || node.isMissingNode()) {
				return "협의";
			}
			node = node.path(key);
		}
		return node == null || node.isMissingNode() ? "협의" : node.asText().trim();
	}

	// ✅ XML 태그 값 파싱 함수
	private String getTagValue(Element elem, String tag) {
		try {
			NodeList nodeList = elem.getElementsByTagName(tag);
			Node node = nodeList.item(0);
			if (node == null || node.getTextContent().isBlank())
				return "제공 없음";
			return node.getTextContent().trim();
		} catch (Exception e) {
			return "제공 없음";
		}
	}
}
