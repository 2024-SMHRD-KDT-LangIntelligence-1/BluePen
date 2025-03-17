package com.cothink.bluepen.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

	@GetMapping("/")
	public String index() {

		return "index";
	}

	@GetMapping("/mainpage")
	public String mianpage() {

		return "mainpage";
	}

	@GetMapping("/sidebar")
	public String sidebar() {

		return "sidebar";
	}

	@GetMapping("/topbar")
	public String topbar() {

		return "topbar";
	}

	@GetMapping("/signup")
	public String signup() {

		return "signup";
	}

	@GetMapping("/login")
	public String login() {

		return "login";
	}

	@GetMapping("/zero")
	public String zero() {

		return "zero";
	}

	@GetMapping("/calendar")
	public String calendar() {

		return "calendar";
	}
	
	@GetMapping("/flasktest")
	public String flasktest() {

		return "flasktest";
	}


	@GetMapping("/list")
	public String list() {

		return "list";
	}

	@GetMapping("/bookmark")
	public String bookmark() {

		return "bookmark";
	}

	@GetMapping("/editing")
	public String editing() {

		return "editing";
	}

	@GetMapping("/mypage")
	public String mypage() {

		return "mypage";
	}

}
