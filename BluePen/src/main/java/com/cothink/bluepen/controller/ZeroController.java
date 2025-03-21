package com.cothink.bluepen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.cothink.bluepen.entity.TblUser;
import com.cothink.bluepen.repository.UserRepo;

import jakarta.servlet.http.HttpSession;

@Controller
public class ZeroController {
	@Autowired
	UserRepo userRepo;
	
	@GetMapping("/zero")
	public String zeroName(HttpSession session) {
		TblUser uid = (TblUser) session.getAttribute("user");
		
		String userid = uid.getUserId();
		session.setAttribute("userid", userid);
		
		return "zero";
	}
	
}
