package com.cothink.bluepen.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
public class FlaskController {
	
	@GetMapping("/flasktest.do")
	public String flasktestdo(@RequestParam("text") String text) {
		String url = "http://112.217.124.196:30004/?sentence="+text;
		RestTemplate restTemplate = new RestTemplate();
		return restTemplate.getForObject(url, String.class);
	}
}