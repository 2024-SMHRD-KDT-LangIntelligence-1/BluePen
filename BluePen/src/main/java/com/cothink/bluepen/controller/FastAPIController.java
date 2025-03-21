package com.cothink.bluepen.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@Controller
public class FastAPIController {
    private final WebClient webClient;

    public FastAPIController() {
        this.webClient = WebClient.builder().baseUrl("http://localhost:8000").build();
    }
    
    // Map으로 받아 온 이유 = http요청을 통해 받는 json응답 데이터는 키-값구조
    // 자바에서 처리하려면 이를 객체나 데이터 구조로 변환해야 함
    // 따라 Map<string, object>사용하면 간단히 JSON데이터를 표현 가능함.
    @GetMapping("/fast.do")
    public String fastDo(@RequestParam("text") String text,
    		Model model) {
        Map<String, Object> response = webClient.get()
        		.uri(uriBuilder -> uriBuilder
        			.queryParam("sentence", text)
        			.build())
        		.retrieve()
        		.bodyToMono(Map.class)
        		.block();  // 동기적으로 결과 가져오기

        // 응답에서 "response" 키의 값을 가져오기
        String chatGptResponse = (String) response.get("response");
        
        model.addAttribute("question", text);
        model.addAttribute("answer", chatGptResponse);
        
        // 변수에 저장한 후 반환
        return "mainpage";
    }
}