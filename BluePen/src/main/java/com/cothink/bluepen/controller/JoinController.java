package com.cothink.bluepen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import com.cothink.bluepen.entity.UserEntity;
import com.cothink.bluepen.model.UserVO;
import com.cothink.bluepen.repository.UserRepo;

@Controller
public class JoinController {
	@Autowired
	UserRepo userRepo;
	
	@PostMapping("/join.do")
	public String joinDo(UserVO userVO) {
		UserEntity user = new UserEntity(userVO);
		userRepo.save(user);
		
		
		return "redirect:/login";
	}
}
