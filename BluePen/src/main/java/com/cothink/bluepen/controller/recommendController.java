package com.cothink.bluepen.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.boot.autoconfigure.batch.BatchProperties.Job;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpSession;

@Controller
public class recommendController {
	@GetMapping("/recommendpage")
	public String recommendPage(HttpSession session, Model model) {
	    String plansString = (String) session.getAttribute("plans"); // 📌 세션에서 plans 가져오기
	    List<Map<String, String>> parsedPlans = new ArrayList();

        if (plansString != null && !plansString.trim().isEmpty()) {
            String[] plansArray = plansString.split(", ");

            for (String plan : plansArray) {
                Map<String, String> planMap = new HashMap<>();
                Matcher companyMatch = Pattern.compile("회사:(.*?) 공고명:").matcher(plan);
                Matcher titleMatch = Pattern.compile("공고명:(.*?) 마감일:").matcher(plan);
                Matcher enddtMatch = Pattern.compile("마감일:(.*)").matcher(plan);

                planMap.put("company", companyMatch.find() ? companyMatch.group(1).trim() : "");
                planMap.put("title", titleMatch.find() ? titleMatch.group(1).trim() : "");
                planMap.put("enddt", enddtMatch.find() ? enddtMatch.group(1).trim() : "");

                parsedPlans.add(planMap);
            }
        }

        model.addAttribute("parsedPlans", parsedPlans);
	    
	    
	    return "recommendpage"; // recommendpage로 이동
	}
	
	
}
