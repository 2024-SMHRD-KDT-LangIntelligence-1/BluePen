package com.cothink.bluepen.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Job;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cothink.bluepen.repository.ScheduleRepo;
import com.cothink.bluepen.repository.UserRepo;

import jakarta.servlet.http.HttpSession;

@Controller
public class recommendController {
	
	@Autowired
	private ScheduleRepo scheduleRepo; // 올바른 Repository 주입
	
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

                if (companyMatch.find()) {
                    planMap.put("company", companyMatch.group(1).trim());
                } else {
                    planMap.put("company", "");
                }

                if (titleMatch.find()) {
                    planMap.put("title", titleMatch.group(1).trim());
                } else {
                    planMap.put("title", "");
                }

                if (enddtMatch.find()) {
                    String fullEnddt = enddtMatch.group(1).trim();
                    String[] dateTimeParts = fullEnddt.split(" ");
                    String datePart = dateTimeParts.length > 0 ? dateTimeParts[0] : "";
                    String timePart = dateTimeParts.length > 1 ? dateTimeParts[1] : "";

                    planMap.put("enddt", datePart); // 날짜만 저장
                    planMap.put("endtm", timePart); // 시간만 저장
                } else {
                    planMap.put("enddt", "");
                    planMap.put("endtm", "");
                }

                parsedPlans.add(planMap);
            }

        }

        model.addAttribute("parsedPlans", parsedPlans);
	    
	    
	    return "recommendpage"; // recommendpage로 이동
	}
	
	@PostMapping("/addJob")
    public String addRecommendsche(HttpSession session, Model model) {
		
		return "recommendpage";
    }
	
}
