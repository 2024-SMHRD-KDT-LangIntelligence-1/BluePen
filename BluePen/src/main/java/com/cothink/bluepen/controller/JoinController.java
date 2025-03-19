package com.cothink.bluepen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import com.cothink.bluepen.entity.TblUser;
import com.cothink.bluepen.model.UserVO;
import com.cothink.bluepen.repository.UserRepo;

@Controller
public class JoinController {
	
	@Autowired
	private UserRepo userRepo;
	
	
	@PostMapping("/join.do")
	public String joinDo(UserVO userVo) {
		TblUser userinfo = new TblUser(userVo);
		userRepo.save(userinfo);
		System.out.println(userinfo.getUserId());
		System.out.println(userinfo.getUserPw());
		System.out.println(userinfo.getUserBirthdate());
		System.out.println(userinfo.getUserGender());
		System.out.println(userinfo.getJoinedAt());
		return "redirect:/login";
	}
	
}
