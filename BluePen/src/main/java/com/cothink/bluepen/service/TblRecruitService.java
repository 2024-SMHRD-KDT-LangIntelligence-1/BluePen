package com.cothink.bluepen.service;

/*
 * import java.io.BufferedReader; import java.io.InputStreamReader; import
 * java.net.HttpURLConnection; import java.net.URL; import java.sql.Connection;
 * import java.sql.DatabaseMetaData; import java.sql.PreparedStatement; import
 * java.sql.ResultSet; import java.sql.SQLException; import java.sql.Timestamp;
 * import java.util.ArrayList; import java.util.List;
 * 
 * import javax.sql.DataSource; import javax.xml.parsers.DocumentBuilder; import
 * javax.xml.parsers.DocumentBuilderFactory;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.stereotype.Service; import org.w3c.dom.Document; import
 * org.w3c.dom.Element; import org.w3c.dom.Node; import org.w3c.dom.NodeList;
 * 
 * import com.cothink.bluepen.entity.TblRecruit; import
 * com.cothink.bluepen.repository.RecruitRepo;
 * 
 * @Service public class TblRecruitService {
 * 
 * private final RecruitRepo recruitRepo; private final DataSource dataSource;
 * 
 * @Autowired public TblRecruitService(RecruitRepo recruitRepo, DataSource
 * dataSource) { this.recruitRepo = recruitRepo; this.dataSource = dataSource; }
 * 
 * public void fetchFixedPages() { try { addMissingColumnsIfNeeded();
 * 
 * int totalPages = 26; int numOfRows = 20;
 * 
 * for (int page = 1; page <= totalPages; page++) { String apiUrl =
 * "https://apis.data.go.kr/1051000/recruitment/list" +
 * "?serviceKey=xpiTjg%2FjQSwlHvprRxo8ARUahlPYJPptVfcvMMg8GDl9zp%2Bn3vcDKrRVpSH9lflZVOk2eegHCc4MwAw8URQ01A%3D%3D"
 * + "&numOfRows=" + numOfRows + "&ongoingYn=Y" + "&pageNo=" + page +
 * "&pbancBgngYmd=2025-01-01" + "&pbancEndYmd=2025-12-31" + "&resultType=xml";
 * 
 * System.out.println("📡 요청 URL: " + apiUrl);
 * 
 * URL url = new URL(apiUrl); HttpURLConnection conn = (HttpURLConnection)
 * url.openConnection(); conn.setRequestMethod("GET");
 * conn.setRequestProperty("Content-type", "application/json");
 * 
 * BufferedReader rd; if (conn.getResponseCode() >= 200 &&
 * conn.getResponseCode() <= 300) { rd = new BufferedReader(new
 * InputStreamReader(conn.getInputStream())); } else { rd = new
 * BufferedReader(new InputStreamReader(conn.getErrorStream())); }
 * 
 * StringBuilder response = new StringBuilder(); String line; while ((line =
 * rd.readLine()) != null) { response.append(line); } rd.close();
 * conn.disconnect();
 * 
 * int savedCount = parseAndSaveData(response.toString());
 * System.out.println("📦 응답 내용:\n" + response.substring(0, Math.min(3000,
 * response.length()))); System.out.println("✅ page " + page + " → 저장된 공고 수: " +
 * savedCount); }
 * 
 * System.out.println("🎉 총 26페이지, 진행 중인 공고 수집 완료!!!!!!");
 * 
 * } catch (Exception e) { e.printStackTrace(); } }
 * 
 * private int parseAndSaveData(String xmlData) {
 * 
 * List<TblRecruit> recruitList = new ArrayList<>(); int savedCount = 0;
 * 
 * try { DocumentBuilderFactory dbFactory =
 * DocumentBuilderFactory.newInstance(); dbFactory.setNamespaceAware(false); //
 * 네임스페이스 무시 DocumentBuilder dBuilder = dbFactory.newDocumentBuilder(); Document
 * doc = dBuilder.parse(new java.io.ByteArrayInputStream(xmlData.getBytes()));
 * doc.getDocumentElement().normalize();
 * 
 * // ✅ 여기서 선언! 밖에서 쓸 수 있도록! NodeList itemList = null;
 * 
 * // result → item 직접 진입 NodeList resultList =
 * doc.getElementsByTagName("result"); if (resultList.getLength() > 0) { Element
 * result = (Element) resultList.item(0); itemList =
 * result.getElementsByTagName("item");
 * System.out.println("📦 result 안에 있는 item 개수: " + itemList.getLength()); }
 * else { System.out.println("❌ result 태그 없음! 수집 불가!"); return 0; }
 * 
 * for (int i = 0; i < itemList.getLength(); i++) { Node item =
 * itemList.item(i); if (item.getNodeType() != Node.ELEMENT_NODE) continue;
 * 
 * Element element = (Element) item; TblRecruit recruit = new TblRecruit();
 * 
 * // 값 세팅 recruit.setCompany(getTagValue(element, "instNm"));
 * recruit.setRecruitTitle(getTagValue(element, "recrutPbancTtl"));
 * recruit.setAcademic(getTagValue(element, "acbgCondNmLst"));
 * recruit.setDuty(getTagValue(element, "hireTypeNmLst"));
 * recruit.setPosition(getTagValue(element, "recrutSeNm"));
 * recruit.setWorkingArea(getTagValue(element, "workRgnNmLst"));
 * recruit.setSrcUrl(getTagValue(element, "srcUrl"));
 * recruit.setOngoingYn(getTagValue(element, "recrutPsblYn"));
 * 
 * // 공고 번호 파싱 String pblntSnStr = getTagValue(element, "recrutPblntSn"); if
 * (pblntSnStr != null && !pblntSnStr.isBlank()) { try {
 * recruit.setRecrutPblntSn(Integer.parseInt(pblntSnStr)); } catch
 * (NumberFormatException e) { System.out.println("❌ recrutPblntSn 변환 실패: " +
 * pblntSnStr); } }
 * 
 * // 날짜 파싱 String endDateStr = getTagValue(element, "pbancEndYmd"); if
 * (endDateStr != null && endDateStr.matches("\\d{8}")) { String formatted =
 * endDateStr.substring(0, 4) + "-" + endDateStr.substring(4, 6) + "-" +
 * endDateStr.substring(6, 8); recruit.setClosedAt(Timestamp.valueOf(formatted +
 * " 00:00:00")); }
 * 
 * // 필수값 확인 if (recruit.getCompany() == null) {
 * System.out.println("❌ company NULL, 저장 안 함"); continue; }
 * 
 * // 중복 체크 후 저장 if (recruit.getRecrutPblntSn() != null &&
 * !recruitRepo.existsByRecrutPblntSn(recruit.getRecrutPblntSn())) {
 * recruitList.add(recruit); savedCount++; } else {
 * System.out.println("⚠️ 중복된 공고, 저장 생략: " + recruit.getRecrutPblntSn()); } }
 * 
 * recruitRepo.saveAll(recruitList); System.out.println("✅ 이번 페이지 저장 완료! 총 " +
 * savedCount + "건 저장됨!!!!!!");
 * 
 * } catch (Exception e) { e.printStackTrace(); }
 * 
 * return savedCount; }
 * 
 * private String getTagValue(Node item, String tagName) { try { NodeList
 * children = ((Element) item).getElementsByTagName(tagName); if
 * (children.getLength() > 0) { String value =
 * children.item(0).getTextContent(); System.out.println("✅ 태그 [" + tagName +
 * "] 값: " + value); // ← 여기!!! return value; } else {
 * System.out.println("⚠️ 태그 없음: " + tagName); // ← 태그가 없을 경우 } } catch
 * (Exception e) { System.out.println("❌ 태그 추출 실패: " + tagName); // ← 예외 발생
 * e.printStackTrace(); // ← 정확한 원인 로그 } return null; }
 * 
 * private void addMissingColumnsIfNeeded() { try (Connection conn =
 * dataSource.getConnection()) { String tableName = "tbl_recruit";
 * 
 * String[][] columnsToCheck = { { "recruit_title", "VARCHAR(255)" }, {
 * "company", "VARCHAR(255)" }, { "academic", "VARCHAR(100)" }, { "duty",
 * "VARCHAR(100)" }, { "position", "VARCHAR(100)" }, { "working_area",
 * "VARCHAR(100)" }, { "closed_at", "DATETIME" }, { "pbancBgngYmd", "DATETIME"
 * }, { "srcUrl", "VARCHAR(255)" } };
 * 
 * for (String[] col : columnsToCheck) { if (!columnExists(conn, tableName,
 * col[0])) { addColumn(conn, tableName, col[0], col[1]); } } } catch
 * (SQLException e) { e.printStackTrace(); } }
 * 
 * private boolean columnExists(Connection conn, String tableName, String
 * columnName) throws SQLException { DatabaseMetaData metaData =
 * conn.getMetaData(); ResultSet columns = metaData.getColumns(null, null,
 * tableName, columnName); return columns.next(); }
 * 
 * private void addColumn(Connection conn, String tableName, String columnName,
 * String columnType) throws SQLException { String sql = "ALTER TABLE " +
 * tableName + " ADD COLUMN " + columnName + " " + columnType; try
 * (PreparedStatement stmt = conn.prepareStatement(sql)) { stmt.executeUpdate();
 * System.out.println("✅ 컬럼 추가 완료: " + columnName); } } }
 */

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