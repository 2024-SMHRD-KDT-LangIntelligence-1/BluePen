package com.cothink.bluepen.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.cothink.bluepen.entity.TblUser;

import jakarta.servlet.http.HttpSession;

@Controller
public class FastAPIController {
	private final WebClient webClient;

	public FastAPIController() {					// fastapi의 서버
		this.webClient = WebClient.builder().baseUrl("http://localhost:8000").build();
	}

	// Map으로 받아 온 이유 = http요청을 통해 받는 json응답 데이터는 키-값구조
	// 자바에서 처리하려면 이를 객체나 데이터 구조로 변환해야 함
	// 따라 Map<string, object>사용하면 간단히 JSON데이터를 표현 가능함.

	@GetMapping("/fast.do")
	public String fastDo(@RequestParam("text") String text, HttpSession session ,Model model) {
		
		// 현재 로그인한 userid 가져오기
		TblUser uid = (TblUser) session.getAttribute("user");
		String userid = uid.getUserId();
		
		Map<String, Object> response = webClient.get()
				.uri(uriBuilder -> uriBuilder
						.queryParam("sentence", text)
						.queryParam("userid", userid)
						.build())
				.retrieve()
				.bodyToMono(Map.class)
				.block(); // 동기적으로 결과 가져오기
		
		System.out.println(response);
		
		Object responseObject = response.get("response");
		
		String chatGptResponse = "";
		if (responseObject instanceof String) {
		    chatGptResponse = (String) responseObject;
		    // chatGptResponse를 사용
		} else if (responseObject instanceof Map) {
		    // 만약 response.get("response")가 Map이라면, 그 내부에서 필요한 값 추출
		    Map<String, Object> responseMap = (Map<String, Object>) responseObject;
		    // 예시: responseMap에서 "text"라는 필드 추출
		    chatGptResponse = (String) responseMap.get("content");
		    // chatGptResponse를 사용
		} else {
		    // 예상치 못한 타입일 경우 처리
		    throw new IllegalStateException("Unexpected response format: " + responseObject);
		}
		
//		// 응답에서 "response" 키의 값을 가져오기
//		String chatGptResponse = (String) response.get("response");
		
		// client의 질문과 llm의 답변을 model에 담아
		model.addAttribute("question", text);
		model.addAttribute("answer", chatGptResponse);

		// mainpage로 반환
		return "mainpage";
	}
}
