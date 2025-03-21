package com.cothink.bluepen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;

import com.cothink.bluepen.entity.TblUser;
import com.cothink.bluepen.repository.UserRepo;

import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {
	@Autowired
	UserRepo userRepo;
	
	@PostMapping("/login.do")
	public String loginDo(String user_id, String user_pw, HttpSession session, Model model) {
		
		TblUser user = userRepo.findByUserId(user_id);
		
		if (user == null) {
			model.addAttribute("error", "아이디가 존재하지 않습니다.");
			return "login";
		}else if(!user.getUserPw().equals(user_pw)) {
			model.addAttribute("error", "비밀번호가 일치하지 않습니다.");
			return "login";
		}
		
		session.setAttribute("user", user);
		
		return "redirect:/mainpage";
	}
		
	
}