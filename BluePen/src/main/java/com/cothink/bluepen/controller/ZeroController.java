package com.cothink.bluepen.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cothink.bluepen.entity.TblUser;
import com.cothink.bluepen.entity.ZeroParty;
import com.cothink.bluepen.repository.UserRepo;
import com.cothink.bluepen.repository.ZeroPartyRepository;

import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;

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
	@Transactional
	public String saveToDb(@RequestParam("job") String job,
	                       @RequestParam("zero_aca") String education,
	                       @RequestParam("zero_career") String career,
	                       @RequestParam("region") String region,
	                       @RequestParam(value = "license", required = false) String license,
	                       @RequestParam(value = "hoped_license", required = false) String hopedLicense,
	                       HttpSession session) {

	    TblUser uid = (TblUser) session.getAttribute("user");
	    String userId = uid.getUserId();

	    Optional<ZeroParty> optional = zeroPartyRepository.findByUserId(userId);

	    if (optional.isPresent()) {
	        // 🔥 이미 존재하는 데이터 → 업데이트
	        ZeroParty zp = optional.get();
	        zp.setJob(job);
	        zp.setEducation(education);
	        zp.setCareer(career);
	        zp.setRegion(region);
	        zp.setLicense(license);
	        zp.setHopedLicense(hopedLicense);
	        // ✅ save 호출 안 해도 됨 (변경감지)
	    } else {
	        // 🔥 처음 저장하는 사용자 → 새로 insert
	        ZeroParty zp = new ZeroParty();
	        zp.setUserId(userId);
	        zp.setJob(job);
	        zp.setEducation(education);
	        zp.setCareer(career);
	        zp.setRegion(region);
	        zp.setLicense(license);
	        zp.setHopedLicense(hopedLicense);
	        zeroPartyRepository.save(zp); // ✅ insert 발생
	    }

	    return "redirect:/mainpage";
	}
	
	@PostMapping("/mypage/saveOnlySalary")
	@Transactional
	public ResponseEntity<String> saveOnlySalary(
	        @RequestParam("salary_top") Integer salaryTop,
	        @RequestParam("salary_bottom") Integer salaryBottom,
	        @RequestParam("welfare") String welfare,
	        @RequestParam("working_condition") String workingCondition,
	        HttpSession session
	) {
	    TblUser user = (TblUser) session.getAttribute("user");
	    if (user == null) {
	        return ResponseEntity.status(401).body("로그인 정보 없음");
	    }

	    String userId = user.getUserId();
	    Optional<ZeroParty> optional = zeroPartyRepository.findByUserId(userId);

	    if (optional.isPresent()) {
	        ZeroParty zp = optional.get();
	        zp.setSalaryTop(salaryTop);
	        zp.setSalaryBottom(salaryBottom);
	        zp.setWelfare(welfare);
	        zp.setWorkingCondition(workingCondition);
	    } else {
	        ZeroParty zp = new ZeroParty();
	        zp.setUserId(userId);
	        zp.setSalaryTop(salaryTop);
	        zp.setSalaryBottom(salaryBottom);
	        zp.setWelfare(welfare);
	        zp.setWorkingCondition(workingCondition);
	        zeroPartyRepository.save(zp);
	    }

	    return ResponseEntity.ok("성공!");
	}

	
}
