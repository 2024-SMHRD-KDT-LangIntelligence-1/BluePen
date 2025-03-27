package LicenseCodeAPI;

// 데이터베이스의 techqualifications 1000개 저장되어 더 이상 들어가지 않음.

//import org.w3c.dom.*;
//import javax.xml.parsers.*;
//import java.io.*;
//import java.net.*;
//import java.sql.*;
//
//public class TechQualificationAPI {
//
//	public static void main(String[] args) {
//		try {
//			// 1. 데이터베이스에서 jmCd 값 조회
//			Connection conn = DriverManager.getConnection("jdbc:mysql://project-db-campus.smhrd.com:3307/cothink4",
//					"cothink4", "co4think@@");
//			Statement stmt = conn.createStatement();
//			ResultSet rs = stmt.executeQuery("SELECT l1st.* "
//					+ "FROM qualificationlist as l1st "
//					+ "LEFT JOIN techqualifications as tech ON l1st.jmCd = tech.jmCd "
//					+ "WHERE tech.jmCd IS NULL");
//
//			while (rs.next()) {
//				String jmCdValue = rs.getString("jmCd");
//				System.out.println("Fetching data for jmCd: " + jmCdValue);
//
//				// 2. API 호출 및 응답 데이터 저장
//				String responseXml = fetchApiData(jmCdValue);
//				
//				if (responseXml != null) { storeApiResponse(conn, responseXml, jmCdValue); }
//				 
//			}
//
//			rs.close();
//			stmt.close();
//			conn.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	public static String fetchApiData(String jmCdValue) throws IOException {
//		StringBuilder urlBuilder = new StringBuilder(
//				"http://openapi.q-net.or.kr/api/service/rest/InquiryTestInformationNTQSVC/getJMList"); /* URL */
//		urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8")
//				+ "=xpiTjg/jQSwlHvprRxo8ARUahlPYJPptVfcvMMg8GDl9zp+n3vcDKrRVpSH9lflZVOk2eegHCc4MwAw8URQ01A=="); /*
//																												 * Service
//																												 * Key
//																												 */
//		urlBuilder.append(
//				"&" + URLEncoder.encode("jmCd", "UTF-8") + "=" + URLEncoder.encode(jmCdValue, "UTF-8")); /* 종목코드 */
//		URL url = new URL(urlBuilder.toString());
//		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//		conn.setRequestMethod("GET");
//		conn.setRequestProperty("Content-type", "application/json");
//		System.out.println("Response code: " + conn.getResponseCode());
//		BufferedReader rd;
//		if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
//			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//		} else {
//			rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
//		}
//		StringBuilder sb = new StringBuilder();
//		String line;
//		while ((line = rd.readLine()) != null) {
//			sb.append(line);
//		}
//		rd.close();
//		conn.disconnect();
//
//		System.out.println(sb.toString());
//
//		return sb.toString();
//	}
//
//	private static void storeApiResponse(Connection conn, String xml, String jmCdValue) {
//		try {
//			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//			DocumentBuilder builder = factory.newDocumentBuilder();
//			Document document = builder.parse(new ByteArrayInputStream(xml.getBytes("UTF-8")));
//
//			NodeList items = document.getElementsByTagName("item");
//
//			String sql = "INSERT INTO techqualifications (jmCd, jmfldnm, implplannm, docregstartdt, docregenddt, "
//					+ "docexamstartdt, docexamenddt, docpassdt, docsubmitstartdt, docsubmitenddt, "
//					+ "pracregstartdt, pracregenddt, pracexamstartdt, pracexamenddt, pracpassstartdt, pracpassenddt) "
//					+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//			PreparedStatement pstmt = conn.prepareStatement(sql);
//
//			for (int i = 0; i < items.getLength(); i++) {
//				Element item = (Element) items.item(i);
//
//				// 예시 필드 (API 응답 데이터에 맞게 수정 필요)
//				String jmfldnm = getTagValue("jmfldnm", item);
//				String implplannm = getTagValue("implplannm", item);
//				String docregstartdt = getTagValue("docregstartdt", item);
//				String docregenddt = getTagValue("docregenddt", item);
//				String docexamstartdt = getTagValue("docexamstartdt", item);
//				String docexamenddt = getTagValue("docexamenddt", item);
//				String docpassdt = getTagValue("docpassdt", item);
//				String docsubmitstartdt = getTagValue("docsubmitstartdt", item);
//				String docsubmitenddt = getTagValue("docsubmitenddt", item);
//				String pracregstartdt = getTagValue("pracregstartdt", item);
//				String pracregenddt = getTagValue("pracregenddt", item);
//				String pracexamstartdt = getTagValue("pracexamstartdt", item);
//				String pracexamenddt = getTagValue("pracexamenddt", item);
//				String pracpassstartdt = getTagValue("pracpassstartdt", item);
//				String pracpassenddt = getTagValue("pracpassenddt", item);
//
//				pstmt.setString(1, jmCdValue);
//				pstmt.setString(2, jmfldnm);
//				pstmt.setString(3, implplannm);
//				pstmt.setString(4, docregstartdt);
//				pstmt.setString(5, docregenddt);
//				pstmt.setString(6, docexamstartdt);
//				pstmt.setString(7, docexamenddt);
//				pstmt.setString(8, docpassdt);
//				pstmt.setString(9, docsubmitstartdt);
//				pstmt.setString(10, docsubmitenddt);
//				pstmt.setString(11, pracregstartdt);
//				pstmt.setString(12, pracregenddt);
//				pstmt.setString(13, pracexamstartdt);
//				pstmt.setString(14, pracexamenddt);
//				pstmt.setString(15, pracpassstartdt);
//				pstmt.setString(16, pracpassenddt);
//
//				pstmt.executeUpdate();
//			}
//
//			pstmt.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//
//	// XML 태그 값을 가져오는 메서드
//	private static String getTagValue(String tag, Element element)
//
//	{
//		NodeList nodeList = element.getElementsByTagName(tag);
//		if (nodeList.getLength() > 0) {
//			return nodeList.item(0).getTextContent();
//		}
//		return null;
//	}
//
//}
