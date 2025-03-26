package com.cothink.bluepen.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.cothink.bluepen.entity.TblRecruit;
import com.cothink.bluepen.repository.RecruitRepo;

@Service
public class TblRecruitService {

	private final RecruitRepo recruitRepo;
	private final DataSource dataSource;

	@Autowired
	public TblRecruitService(RecruitRepo recruitRepo, DataSource dataSource) {
		this.recruitRepo = recruitRepo;
		this.dataSource = dataSource;
	}

	public void fetchAndStoreRecruitData() {
		try {
			// 먼저 컬럼이 존재하는지 확인하고 없으면 추가하는 메서드 호출
			addMissingColumnsIfNeeded();

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
			rd.close();
			conn.disconnect();

			parseAndSaveData(response.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void parseAndSaveData(String xmlData) {
		try {
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(new java.io.ByteArrayInputStream(xmlData.getBytes()));
			doc.getDocumentElement().normalize();

			NodeList itemList = doc.getElementsByTagName("item");
			List<TblRecruit> recruitList = new ArrayList<>();

			for (int i = 0; i < itemList.getLength(); i++) {
				Node item = itemList.item(i);
				TblRecruit recruit = new TblRecruit();

				recruit.setRecruitTitle(getTagValue(item, "recrutPbancTtl"));
				recruit.setInstNm(getTagValue(item, "instNm"));
				recruit.setDuty(getTagValue(item, "recrutSeNm"));
				recruit.setHireTypeLst(getTagValue(item, "hireTypeNmLst"));
				recruit.setWorkingArea(getTagValue(item, "workRgnNmLst"));
				recruit.setWorkingDay(getTagValue(item, "workdayWeek"));
				recruit.setPosition(getTagValue(item, "jobsNm"));
				recruit.setCompany(getTagValue(item, "repr"));
				recruit.setOngoingYn(getTagValue(item, "recrutPsblYn"));
				recruit.setSrcUrl(getTagValue(item, "srcUrl"));
				recruit.setRecrutPbancTtl(getTagValue(item, "recrutPbancTtl"));
				recruit.setWorkRgnLst(getTagValue(item, "workRgnNmLst"));
				recruit.setAcademic(getTagValue(item, "acbgCondNmLst"));

				String pblntSnStr = getTagValue(item, "recrutPblntSn");
				if (pblntSnStr != null && !pblntSnStr.isBlank()) {
					try {
						recruit.setRecrutPblntSn(Integer.parseInt(pblntSnStr));
					} catch (NumberFormatException e) {
						System.out.println(" recrutPblntSn 변환 실패: " + pblntSnStr);
					}
				}

				String pbancBgngYmdStr = getTagValue(item, "pbancBgngYmd");
				if (pbancBgngYmdStr != null && pbancBgngYmdStr.matches("\\d{8}")) {
					String formattedStart = pbancBgngYmdStr.substring(0, 4) + "-" + pbancBgngYmdStr.substring(4, 6)
							+ "-" + pbancBgngYmdStr.substring(6, 8);
					recruit.setPbancBgngYmd(Timestamp.valueOf(formattedStart + " 00:00:00"));
					System.out.println(" 시작일 설정: " + recruit.getPbancBgngYmd());
				}

				String pbancEndYmdStr = getTagValue(item, "pbancEndYmd");
				if (pbancEndYmdStr != null && pbancEndYmdStr.matches("\\d{8}")) {
					String formattedEnd = pbancEndYmdStr.substring(0, 4) + "-" + pbancEndYmdStr.substring(4, 6) + "-"
							+ pbancEndYmdStr.substring(6, 8);
					recruit.setClosedAt(Timestamp.valueOf(formattedEnd + " 00:00:00"));
					System.out.println(" 마감일 설정 (closed_at): " + recruit.getClosedAt());
				}

				recruitList.add(recruit);
			}

			recruitRepo.saveAll(recruitList);
			System.out.println("✅ 총 " + recruitList.size() + "개의 채용 공고 저장 완료!!!!");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String getTagValue(Node item, String tagName) {
		try {
			NodeList children = ((Element) item).getElementsByTagName(tagName);
			if (children.getLength() > 0) {
				return children.item(0).getTextContent();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 컬럼이 없으면 추가하는 메서드
	private void addMissingColumnsIfNeeded() {
		try (Connection conn = dataSource.getConnection()) {
			String tableName = "tbl_recruit";

			// 컬럼 'pbancBgngYmd'가 존재하는지 확인
			if (!columnExists(conn, tableName, "pbancBgngYmd")) {
				addColumn(conn, tableName, "pbancBgngYmd", "DATETIME");
			}

			// 컬럼 'srcUrl'가 존재하는지 확인
			if (!columnExists(conn, tableName, "srcUrl")) {
				addColumn(conn, tableName, "srcUrl", "VARCHAR(255)");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	// 컬럼이 존재하는지 확인하는 메서드
	private boolean columnExists(Connection conn, String tableName, String columnName) throws SQLException {
		DatabaseMetaData metaData = conn.getMetaData();
		ResultSet columns = metaData.getColumns(null, null, tableName, columnName);
		return columns.next(); // 컬럼이 존재하면 true 반환
	}

	// 컬럼을 추가하는 메서드
	private void addColumn(Connection conn, String tableName, String columnName, String columnType)
			throws SQLException {
		String sql = "ALTER TABLE " + tableName + " ADD COLUMN " + columnName + " " + columnType;
		try (PreparedStatement stmt = conn.prepareStatement(sql)) {
			stmt.executeUpdate();
			System.out.println("✅ 컬럼 추가 완료: " + columnName);
		}
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