package com.cothink.bluepen.controller;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cothink.bluepen.model.ScheduleVO;

@RestController
@RequestMapping("/calendar")
public class CalendarController {

	@PostMapping("/insert")
	public Map<String, Object> insertSchedule(@RequestBody ScheduleVO vo) {
		Map<String, Object> result = new HashMap<>();

		try (Connection conn = DriverManager.getConnection("jdbc:mysql://project-db-campus.smhrd.com:3307/cothink4",
				"cothink4", "co4think@@");
				PreparedStatement pstmt = conn.prepareStatement(
						"INSERT INTO tbl_schedule(user_id, sche_title, sche_content, sche_file, sche_dt, sche_tm, sche_type, sche_color, alert_setting, sche_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

			pstmt.setString(1, vo.getUserId());
			pstmt.setString(2, vo.getScheTitle());
			pstmt.setString(3, vo.getScheContent());
			pstmt.setString(4, vo.getScheFile());
			pstmt.setDate(5, vo.getScheDt());
			pstmt.setTime(6, vo.getScheTm());
			pstmt.setString(7, vo.getScheType());
			pstmt.setString(8, vo.getScheColor());
			pstmt.setString(9, vo.getAlertSetting());
			pstmt.setString(10, vo.getScheStatus());

			int rows = pstmt.executeUpdate();
			result.put("success", rows > 0);

		} catch (Exception e) {
			result.put("success", false);
			result.put("error", e.getMessage());
		}

		return result;
	}
}
