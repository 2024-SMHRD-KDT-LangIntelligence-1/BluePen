package com.cothink.bluepen.controller;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cothink.bluepen.entity.TblUser;
import com.cothink.bluepen.entity.Tblschedule;
import com.cothink.bluepen.repository.ScheduleRepo;
import com.cothink.bluepen.repository.UserRepo;

import org.springframework.ui.Model;
import jakarta.servlet.http.HttpSession;

@Controller
public class ScheduleController {
	@Autowired
	UserRepo userRepo;

	@Autowired
	private ScheduleRepo scheduleRepo; // 올바른 Repository 주입

	@PostMapping("/insert")
	public String saveToDb(String scheTitle, Date scheDt, Time scheTm, String scheType, String scheColor,
			HttpSession session) { // 세션 통해 로그인 사용자 가져옴

		// 로그인 사용자 정보 꺼내기
		TblUser uid = (TblUser) session.getAttribute("user");
		String userId = uid.getUserId();

		Tblschedule sc = new Tblschedule();
		sc.setScheTitle(scheTitle);
		sc.setScheDt(scheDt);
		sc.setScheColor(scheColor);
		sc.setScheTm(scheTm);
		sc.setScheType(scheType);
		sc.setUserId(userId); // 사용자 ID 저장

		scheduleRepo.save(sc); // 올바르게 저장

		return "redirect:/calendar"; // 저장 후 이동
	}
	
	// 승혁 리스트 캘린더 연결@@@@@@@
	@GetMapping("/schedule-list") // ✅ 경로 이름 바꿈
	public String getScheduleList(Model model, HttpSession session) {
		TblUser uid = (TblUser) session.getAttribute("user");
		String userId = uid.getUserId();
	    List<Tblschedule> schedules = scheduleRepo.findByUserId(userId);
	    model.addAttribute("schedules", schedules);
	    return "list";
	}
	
	@DeleteMapping("/schedule-delete/{id}")
	@ResponseBody
	public ResponseEntity<String> deleteSchedule(@PathVariable("id") int id) {
	    scheduleRepo.deleteById(id);
	    return ResponseEntity.ok("deleted");
	}
	@GetMapping("/calendar/events")
	@ResponseBody
	public ResponseEntity<?> getAllSchedules(HttpSession session) {
	    TblUser user = (TblUser) session.getAttribute("user");

	    if (user == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                             .body("세션이 만료되었습니다");
	    }

	    List<Tblschedule> schedules = scheduleRepo.findByUserId(user.getUserId());

	    // 🔥 FullCalendar 형식으로 변환
	    List<Map<String, Object>> eventList = schedules.stream().map(s -> {
	        Map<String, Object> event = new HashMap<>();
	        event.put("title", s.getScheTitle());
	        event.put("start", s.getScheDt() + "T" + s.getScheTm());
	        return event;
	    }).collect(Collectors.toList()); // ✅ 빨간줄 해결 핵심!!!

	    return ResponseEntity.ok(eventList);
	}

}
