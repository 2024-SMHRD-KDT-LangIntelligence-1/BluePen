package com.cothink.bluepen.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.cothink.bluepen.entity.TblUser;

import jakarta.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


@Controller
@RequestMapping("/upload")
public class RecruitUploadController {

	private static final String FASTAPI_URL = "http://localhost:8000/upload"; // FastAPI 서버 URL

	@PostMapping
	public String uploadResume(@RequestParam("resumeFile") MultipartFile file, HttpSession session, Model model) throws IOException {
		TblUser uid = (TblUser) session.getAttribute("user");
		String userid = uid.getUserId();
		
		if (file.isEmpty()) {
	        model.addAttribute("error", "파일이 없습니다.");
	        return "upload";
	    }

	    if (!file.getContentType().equals("application/pdf")) {
	        model.addAttribute("error", "PDF 파일만 업로드 가능합니다.");
	        return "upload";
	    }
	    
	    try {
		// FastAPI로 파일을 바로 전송
		RestTemplate restTemplate = new RestTemplate();
		MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
		body.add("file", file.getResource()); // 파일 리소스를 직접 전송
		body.add("userid", userid);

		HttpHeaders headers = new HttpHeaders();
		HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

		ResponseEntity<String> response = restTemplate.postForEntity(FASTAPI_URL, requestEntity, String.class);
		String responseAI = response.getBody();
		System.out.println(responseAI);
		
		// JSON 파싱
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode rootNode = objectMapper.readTree(responseAI);
		JsonNode resultNode = rootNode.path("result");
		
		String question = resultNode.path("question").asText();
		String answer = resultNode.path("answer").asText();

		// 디버깅용 출력
		System.out.println("Question: " + question);
		System.out.println("Answer: " + answer);

		// 모델에 각각 따로 저장
		model.addAttribute("question", question);
		model.addAttribute("answer", answer);
		
		//return ResponseEntity.ok("FastAPI 응답: " + response.getBody());
		
		return "upload";
		
		
	    } catch (Exception e) {
	    	model.addAttribute("error", "FastAPI 서버와 통신 중 오류 발생: " + e.getMessage());
	        return "upload";
	    }
	    
		
	}

}