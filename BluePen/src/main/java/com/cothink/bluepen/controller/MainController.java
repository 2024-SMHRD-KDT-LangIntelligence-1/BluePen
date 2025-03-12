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
}
