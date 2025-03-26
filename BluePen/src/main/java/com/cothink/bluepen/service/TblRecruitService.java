package com.cothink.bluepen.service;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.cothink.bluepen.entity.TblRecruit;
import com.cothink.bluepen.repository.RecruitRepo;

@Service
public class TblRecruitService {

	private final RecruitRepo recruitRepo;

	public TblRecruitService(RecruitRepo recruitRepo) {
		this.recruitRepo = recruitRepo;
	}

	public void fetchAndStoreRecruitData() {
		try {
			String apiUrl = "https://apis.data.go.kr/1051000/recruitment/list"
					+ "?serviceKey=xpiTjg%2FjQSwlHvprRxo8ARUahlPYJPptVfcvMMg8GDl9zp%2Bn3vcDKrRVpSH9lflZVOk2eegHCc4MwAw8URQ01A%3D%3D"
					+ "&pbancBgngYmd=2025-01-01" + "&pbancEndYmd=2025-12-31" + "&resultType=xml";

			URL url = new URL(apiUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/json");

			BufferedReader rd;
			if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}

			StringBuilder response = new StringBuilder();
			String line;
			while ((line = rd.readLine()) != null) {
				response.append(line);
			}

			System.out.println("🔥🔥🔥 API 응답 원문 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
			System.out.println(response.toString()); // 혹은 그냥 response
			System.out.println("🔥🔥🔥 API 응답 끝 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");

			rd.close();
			conn.disconnect();

			parseAndSaveData(response.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void parseAndSaveData(String xml) {
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document document = builder.parse(new ByteArrayInputStream(xml.getBytes("UTF-8")));

			NodeList itemList = document.getElementsByTagName("item");

			List<TblRecruit> recruits = new ArrayList<>();

			for (int i = 0; i < itemList.getLength(); i++) {
				Node item = itemList.item(i);

				String recrutPbancTtl = getTagValue(item, "recrutPbancTtl");
				String instNm = getTagValue(item, "instNm");
				String acbgCondNmLst = getTagValue(item, "acbgCondNmLst"); // academic
				String hireTypeNmLst = getTagValue(item, "hireTypeNmLst");
				String recrutSeNm = getTagValue(item, "recrutSeNm"); // duty
				String workRgnNmLst = getTagValue(item, "workRgnNmLst");
				String pbancEndYmd = getTagValue(item, "pbancEndYmd");
				String pbancBgngYmd = getTagValue(item, "pbancBgngYmd");
				String srcUrl = getTagValue(item, "srcUrl");

				TblRecruit recruit = new TblRecruit();
				recruit.setCompany(instNm);
				recruit.setRecruitTitle(recrutPbancTtl);
				recruit.setAcademic(acbgCondNmLst);
				recruit.setDuty(recrutSeNm);
				recruit.setPosition("N/A");
				recruit.setSalary(0);
				recruit.setWorkingArea(workRgnNmLst);
				recruit.setWorkingDay("N/A");

				if (pbancEndYmd != null && pbancEndYmd.matches("\\d{4}-\\d{2}-\\d{2}")) {
					recruit.setClosedAt(Timestamp.valueOf(pbancEndYmd + " 00:00:00"));
				}
				if (pbancBgngYmd != null && pbancBgngYmd.matches("\\d{4}-\\d{2}-\\d{2}")) {
					recruit.setPbancBgngYmd(Timestamp.valueOf(pbancBgngYmd + " 00:00:00"));
				}

				recruit.setSrcUrl(srcUrl);
				recruit.setInstNm(instNm);
				recruit.setHireTypeLst(hireTypeNmLst);
				recruit.setWorkRgnLst(workRgnNmLst);
				recruit.setRecrutPbancTtl(recrutPbancTtl);
				recruit.setOngoingYn("Y");

				recruits.add(recruit);
			}

			recruitRepo.saveAll(recruits);
			System.out.println("총 " + recruits.size() + "개의 채용 공고가 저장되었습니다!!!!");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String getTagValue(Node item, String tagName) {
		String value = "";
		try {
			NodeList nodeList = item.getChildNodes();
			for (int i = 0; i < nodeList.getLength(); i++) {
				Node node = nodeList.item(i);
				if (node.getNodeName().equals(tagName)) {
					value = node.getTextContent();
					break;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}
}

/*
 * public TblRecruit SaveRecruitData() { // 사람인 API 호출 URL String apiUrl =
 * "https://api.saramin.co.kr/job-search";
 * 
 * // Authorization 헤더 설정 HttpHeaders headers = new HttpHeaders();
 * headers.set("Authorization",
 * "QHnYbptlAJGdoMD3UwjtIb9ipGQ7bquTADZr68KLzsFIeuQkLpK");
 * headers.set("Content-Type", "application/json"); // JSON 요청을 보낼 때 설정
 * 
 * // RestTemplate을 통해 API 호출 HttpEntity<String> entity = new
 * HttpEntity<>(headers); RestTemplate restTemplate = new RestTemplate();
 * ResponseEntity<String> response = restTemplate.exchange(apiUrl,
 * HttpMethod.GET, entity, String.class);
 * 
 * // API 응답에서 필요한 데이터 추출 (예시) String responseBody = response.getBody();
 * 
 * // 실제로는 JSON 파싱을 해야 합니다. 여기서는 예시로 데이터를 처리. // 여기에 실제 JSON 파싱 로직을 추가해야 합니다.
 * 
 * // 예시: 첫 번째 채용공고만 가져온다고 가정 // (실제 코드에서는 JSON 파싱을 해서 각 값을 처리해야 함) TblRecruit
 * recruit = new TblRecruit();
 * 
 * // 예시로 받은 데이터를 매핑 recruit.setCompany("Example Company");
 * recruit.setRecruitTitle("Software Engineer");
 * recruit.setCareer("3+ years experience"); // 경력
 * recruit.setAcademic("Bachelor's degree"); // 학력
 * recruit.setDuty("Software Engineer"); recruit.setSalary(50000); // 연봉 (단위: 원)
 * recruit.setPosition("Full-time"); recruit.setWorkingDay("Monday to Friday");
 * recruit.setWorkingArea("Seoul");
 * 
 * 
 * // 마감일 설정 (예시로 API에서 반환되는 Unix timestamp를 LocalDateTime으로 변환) long
 * expirationTimestamp = 1629340800L; // 예시 Unix timestamp (2021-08-20)
 * LocalDateTime closedAt = LocalDateTime.ofEpochSecond(expirationTimestamp, 0,
 * java.time.ZoneOffset.UTC); recruit.setClosedAt(closedAt);
 * 
 * // DB에 저장 public TblRecruit addRecruit(TblRecruit recruit) { return
 * RecruitRepo.save(recruit);
 */

/* } */