package com.cothink.bluepen.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


@Controller
@RequestMapping("/upload")
public class RecruitUploadController {
	
	
	 private static final String FASTAPI_URL = "http://0.0.0.0:8000/upload"; // FastAPI 서버 URL
	
	 @PostMapping
	    public ResponseEntity<String> uploadResume(@RequestParam("resumeFile") MultipartFile file) throws IOException {
	        if (file.isEmpty()) {
	            return ResponseEntity.badRequest().body("파일이 없습니다.");
	        }

	        // PDF 파일만 허용
	        if (!file.getContentType().equals("application/pdf")) {
	            return ResponseEntity.badRequest().body("PDF 파일만 업로드 가능합니다.");
	        }

	        // FastAPI로 파일을 바로 전송
	        RestTemplate restTemplate = new RestTemplate();
	        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
	        body.add("file", file.getResource()); // 파일 리소스를 직접 전송

	        HttpHeaders headers = new HttpHeaders();
	        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

	        ResponseEntity<String> response = restTemplate.postForEntity(FASTAPI_URL, requestEntity, String.class);

	        return ResponseEntity.ok("FastAPI 응답: " + response.getBody());
	    }
	
}