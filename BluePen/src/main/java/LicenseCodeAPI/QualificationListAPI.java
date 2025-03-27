package LicenseCodeAPI;

//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.net.URLEncoder;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.PreparedStatement;
//import java.sql.Statement;
//
//import javax.xml.parsers.DocumentBuilder;
//import javax.xml.parsers.DocumentBuilderFactory;
//
//import org.w3c.dom.Document;
//import org.w3c.dom.NodeList;
//
//public class QualificationListAPI {
//	public static void main(String[] args) throws IOException {
//		StringBuilder urlBuilder = new StringBuilder(
//				"http://openapi.q-net.or.kr/api/service/rest/InquiryListNationalQualifcationSVC/getList"); /* URL */
//		urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8")
//				+ "=xpiTjg/jQSwlHvprRxo8ARUahlPYJPptVfcvMMg8GDl9zp+n3vcDKrRVpSH9lflZVOk2eegHCc4MwAw8URQ01A=="); /*
//																												 * Service
//																												 * Key
//																												 */
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
//		// 응답을 출력
//		System.out.println(sb.toString());
//
//		// xml의 응답을 jdbc에 저장
//
//		parseAndStoreData(sb.toString());
//
//	}
//
//	private static void parseAndStoreData(String xml) {
//		try {
//			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//			DocumentBuilder builder = factory.newDocumentBuilder();
//			Document document = builder.parse(new java.io.ByteArrayInputStream(xml.getBytes("UTF-8")));
//
//			NodeList qualgbcdList = document.getElementsByTagName("qualgbcd");
//			NodeList seriescdList = document.getElementsByTagName("seriescd");
//			NodeList jmCdList = document.getElementsByTagName("jmCd");
//			NodeList jmfldnmList = document.getElementsByTagName("jmfldnm");
//			NodeList obligfldnmList = document.getElementsByTagName("obligfldnm");
//			NodeList mdobligfldnmList = document.getElementsByTagName("mdobligfldnm");
//
//			Connection conn = DriverManager.getConnection("jdbc:mysql://project-db-campus.smhrd.com:3307/cothink4",
//					"cothink4", "co4think@@");
//
//			// 테이블이 없으면 생성
//			Statement stmt = conn.createStatement();
//			String createTableSQL = "CREATE TABLE IF NOT EXISTS qualificationlist (" + "id INT AUTO_INCREMENT PRIMARY KEY,"
//					+ "qualgbcd VARCHAR(10)," + "seriescd VARCHAR(10)," + "jmCd VARCHAR(10)," + "jmfldnm VARCHAR(255),"
//					+ "obligfldnm VARCHAR(255)," + "mdobligfldnm VARCHAR(255)" + ")";
//			stmt.execute(createTableSQL);
//			stmt.close();
//
//			String sql = "INSERT INTO qualificationlist (qualgbcd, seriescd, jmCd, jmfldnm, obligfldnm, mdobligfldnm) VALUES (?, ?, ?, ?, ?, ?)";
//			PreparedStatement pstmt = conn.prepareStatement(sql);
//
//			for (int i = 0; i < qualgbcdList.getLength(); i++) {
//				pstmt.setString(1, qualgbcdList.item(i).getTextContent());
//				pstmt.setString(2, seriescdList.item(i).getTextContent());
//				pstmt.setString(3, jmCdList.item(i).getTextContent());
//				pstmt.setString(4, jmfldnmList.item(i).getTextContent());
//				pstmt.setString(5, obligfldnmList.item(i).getTextContent());
//				pstmt.setString(6, mdobligfldnmList.item(i).getTextContent());
//				pstmt.executeUpdate();
//			}
//
//			pstmt.close();
//			conn.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//}
