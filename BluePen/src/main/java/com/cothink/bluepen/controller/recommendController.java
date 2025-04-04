package com.cothink.bluepen.controller;

import java.sql.Date;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties.Job;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cothink.bluepen.entity.TblUser;
import com.cothink.bluepen.entity.Tblschedule;
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
                Matcher enddtMatch = Pattern.compile("마감일:(.*?) 공고링크:").matcher(plan);
                Matcher urlRMatch = Pattern.compile("공고링크:(.*)").matcher(plan);

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
                if (urlRMatch.find()) {
                    planMap.put("urlR", urlRMatch.group(1).trim());
                } else {
                    planMap.put("urlR", "");
                }

                parsedPlans.add(planMap);
            }

        }

        model.addAttribute("parsedPlans", parsedPlans);
	    
	    
	    return "recommendpage"; // recommendpage로 이동
	}
	
	@PostMapping("/addJob")
	@ResponseBody
    public ResponseEntity<Map<String, Object>> addRecommendsche(@RequestBody Map<String, String> requestData, HttpSession session) {
		
		Map<String, Object> response = new HashMap<>();
		
		 try {
		        TblUser uid = (TblUser) session.getAttribute("user");
		        if (uid == null) {
		            response.put("success", false);
		            response.put("message", "User session not found.");
		            return ResponseEntity.badRequest().body(response);
		        }

		        String userId = uid.getUserId();
		        Tblschedule sc = new Tblschedule();

		        String scheTitle = requestData.get("sche_title");
		        String scheContent = requestData.get("sche_content");
		        String scheDtStr = requestData.get("sche_dt");
		        String scheTmStr = "08:30:00";
		        String scheFile = requestData.get("sche_file");
		        

		        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");

		        java.sql.Date sqlDate = (scheDtStr != null && !scheDtStr.isEmpty()) 
		            ? new java.sql.Date(dateFormat.parse(scheDtStr).getTime()) : null;

		        java.sql.Time sqlTime = (scheTmStr != null && !scheTmStr.isEmpty()) 
		            ? new java.sql.Time(timeFormat.parse(scheTmStr).getTime()) : null;

		        sc.setScheTitle(scheTitle);
		        sc.setScheContent(scheContent);
		        sc.setUserId(userId);
		        sc.setScheDt(sqlDate);
		        sc.setScheTm(sqlTime);
		        sc.setScheFile(scheFile);
		        
		        
		        // 기본값 NULL 처리
		        sc.setScheColor("#FF9A9A");
		        sc.setScheType("취업");
		        sc.setScheStatus(null);

		        scheduleRepo.save(sc);

		        response.put("success", true);
		        response.put("message", "일정이 성공적으로 추가되었습니다.");
		        return ResponseEntity.ok(response);

		    } catch (ParseException e) {
		        e.printStackTrace();
		        response.put("success", false);
		        response.put("message", "날짜 변환 오류 발생.");
		        return ResponseEntity.badRequest().body(response);
		    } catch (Exception e) {
		        e.printStackTrace();
		        response.put("success", false);
		        response.put("message", "서버 내부 오류 발생.");
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		    }
	}
	
}
