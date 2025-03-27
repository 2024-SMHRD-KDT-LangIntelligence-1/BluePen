package LicenseCodeAPI;

//import org.w3c.dom.*;
//import javax.xml.parsers.*;
//import java.io.*;
//import java.net.*;
//import java.sql.*;
//
//public class ProQualificationAPI {
//	public static void main(String[] args) {
//		try {
//			// 1. 데이터베이스에서 seriesCd 값 조회
//			Connection conn = DriverManager.getConnection("jdbc:mysql://project-db-campus.smhrd.com:3307/cothink4",
//					"cothink4", "co4think@@");
//			Statement stmt = conn.createStatement();
//			ResultSet rs = stmt.executeQuery("SELECT DISTINCT l1st.seriesCd "
//					+ "FROM qualificationlist as l1st "
//					+ "LEFT JOIN proqualifications as pro ON l1st.seriesCd = pro.seriesCd "
//					+ "WHERE pro.seriesCd IS NULL");
//
//			while (rs.next()) {
//				String seriesCdValue = rs.getString("seriesCd");
//				System.out.println("Fetching data for seriesCd: " + seriesCdValue);
//
//				// 2. API 호출 및 응답 데이터 저장
//				String responseXml = fetchApiData(seriesCdValue);
//				
//				if (responseXml != null) { storeApiResponse(conn, responseXml, seriesCdValue); }
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
//	public static String fetchApiData(String seriesCdValue) throws IOException {
//        StringBuilder urlBuilder = new StringBuilder("http://openapi.q-net.or.kr/api/service/rest/InquiryTestDatesNationalProfessionalQualificationSVC/getList"); /*URL*/
//        urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=xpiTjg%2FjQSwlHvprRxo8ARUahlPYJPptVfcvMMg8GDl9zp%2Bn3vcDKrRVpSH9lflZVOk2eegHCc4MwAw8URQ01A%3D%3D"); /*Service Key*/
//        urlBuilder.append("&" + URLEncoder.encode("seriesCd","UTF-8") + "=" + URLEncoder.encode("01", "UTF-8")); /*계열코드*/
//        URL url = new URL(urlBuilder.toString());
//        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//        conn.setRequestMethod("GET");
//        conn.setRequestProperty("Content-type", "application/json");
//        System.out.println("Response code: " + conn.getResponseCode());
//        BufferedReader rd;
//        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
//            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//        } else {
//            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
//        }
//        StringBuilder sb = new StringBuilder();
//        String line;
//        while ((line = rd.readLine()) != null) {
//            sb.append(line);
//        }
//        rd.close();
//        conn.disconnect();
//        System.out.println(sb.toString());
//        
//        return sb.toString();
//    }
//	
//	private static void storeApiResponse(Connection conn, String xml, String seriesCdValue) {
//		try {
//			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//			DocumentBuilder builder = factory.newDocumentBuilder();
//			Document document = builder.parse(new ByteArrayInputStream(xml.getBytes("UTF-8")));
//
//			NodeList items = document.getElementsByTagName("item");
//
//			String sql = "INSERT INTO proqualifications (seriesCd, description, examenddt, examregenddt, examregstartdt, examstartdt, "
//					+ "passenddt, passstartdt) "
//					+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
//			PreparedStatement pstmt = conn.prepareStatement(sql);
//
//			for (int i = 0; i < items.getLength(); i++) {
//				Element item = (Element) items.item(i);
//
//				// 예시 필드 (API 응답 데이터에 맞게 수정 필요)
//				String description = getTagValue("description", item);
//				String examenddt = getTagValue("examenddt", item);
//				String examregenddt = getTagValue("examregenddt", item);
//				String examregstartdt = getTagValue("examregstartdt", item);
//				String examstartdt = getTagValue("examstartdt", item);
//				String passenddt = getTagValue("passenddt", item);
//				String passstartdt = getTagValue("passstartdt", item);
//
//
//				pstmt.setString(1, seriesCdValue);
//				pstmt.setString(2, description);
//				pstmt.setString(3, examenddt);
//				pstmt.setString(4, examregenddt);
//				pstmt.setString(5, examregstartdt);
//				pstmt.setString(6, examstartdt);
//				pstmt.setString(7, passenddt);
//				pstmt.setString(8, passstartdt);
//				
//
//				pstmt.executeUpdate();
//			}
//
//			pstmt.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//	// XML 태그 값을 가져오는 메서드
//		private static String getTagValue(String tag, Element element)
//
//		{
//			NodeList nodeList = element.getElementsByTagName(tag);
//			if (nodeList.getLength() > 0) {
//				return nodeList.item(0).getTextContent();
//			}
//			return null;
//		}
//	
//}
