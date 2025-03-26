package com.cothink.bluepen.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cothink.bluepen.entity.TblUser;
import com.cothink.bluepen.entity.ZeroParty;
import com.cothink.bluepen.repository.UserRepo;
import com.cothink.bluepen.repository.ZeroPartyRepository;

import jakarta.servlet.http.HttpSession;

@Controller
public class ZeroController {
	@Autowired
	UserRepo userRepo;
	
	@Autowired
    ZeroPartyRepository zeroPartyRepository; // ✅ 올바른 Repository 주입
	
	@GetMapping("/zero")
	public String zeroName(HttpSession session) {
		TblUser uid = (TblUser) session.getAttribute("user");
		
		String userid = uid.getUserId();
		session.setAttribute("userid", userid);
		
		return "zero";
	}
	
	//zero data 연결 - 승혁 @@@@@
	@PostMapping("/save")
	public String saveToDb(@RequestParam("job") String job,
	                       @RequestParam("zero_aca") String education,
	                       @RequestParam("zero_career") String career,
	                       @RequestParam("region") String region,
	                       @RequestParam(value = "license", required = false) String license,
	                       @RequestParam(value = "hoped_license", required = false) String hopedLicense,
	                       @RequestParam(value = "salary_top", required = false) Integer salaryTop,
	                       @RequestParam(value = "salary_bottom", required = false) Integer salaryBottom,
	                       @RequestParam(value = "welfare", required = false) String welfare,
	                       @RequestParam(value = "working_condition", required = false) String workingCondition,
	                       HttpSession session) { // 세션 통해 로그인 사용자 가져옴
		
		// 🔽 로그인 사용자 정보 꺼내기
	    TblUser uid = (TblUser) session.getAttribute("user");
	    String userId = uid.getUserId();

	    ZeroParty zp = new ZeroParty();
	    zp.setJob(job);
	    zp.setEducation(education);
	    zp.setCareer(career);
	    zp.setRegion(region);
	    zp.setUserId(userId); // 🔽 사용자 ID 저장
	 // 🔽 추가 항목들 저장
	    zp.setLicense(license);
	    zp.setHopedLicense(hopedLicense);
	    zp.setSalaryTop(salaryTop);
	    zp.setSalaryBottom(salaryBottom);
	    zp.setWelfare(welfare);
	    zp.setWorkingCondition(workingCondition);

	    zeroPartyRepository.save(zp); // ✅ 올바르게 저장

	    return "redirect:/mainpage"; // 저장 후 mainpage로 이동
	}

	
}
