package com.cothink.bluepen.controller;

import java.sql.Date;
import java.sql.Time;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import com.cothink.bluepen.entity.TblUser;
import com.cothink.bluepen.entity.Tblschedule;
import com.cothink.bluepen.repository.UserRepo;

import jakarta.servlet.http.HttpSession;

@Controller
public class ScheduleController {
	@Autowired
	UserRepo userRepo;

	@Autowired
	com.cothink.bluepen.repository.ScheduleRepo ScheduleRepo; // 올바른 Repository 주입

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

		ScheduleRepo.save(sc); // 올바르게 저장

		return "redirect:/calendar"; // 저장 후 이동
	}

}
