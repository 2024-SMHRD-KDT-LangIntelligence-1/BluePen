package com.cothink.bluepen.controller;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cothink.bluepen.entity.TblUser;
import com.cothink.bluepen.repository.UserRepo;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class MypageController {
	
	 @Autowired
	 private UserRepo userRepo;

    @GetMapping("/mypage")
    public String mypage_do(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        TblUser uid = (TblUser) session.getAttribute("user");

        String user_id = uid.getUserId();
        session.setAttribute("user_id", user_id);
        model.addAttribute("user_id", user_id);

        return "mypage";
           
    }
    
    @PostMapping("/mypage/updateUserFields")
    public String updateUserInfo(HttpServletRequest request,
                                 @RequestParam("user_pw") String userPw,
                                 @RequestParam("user_gender") String userGender,
                                 @RequestParam("user_birthdate") Date userBirthdate) {
        HttpSession session = request.getSession();

        // ✅ 영속 상태의 유저 객체 가져오기
        TblUser user = userRepo.findByUserId(
            ((TblUser) session.getAttribute("user")).getUserId()
        );

        // ✅ 값 수정
        user.setUserPw(userPw);
        user.setUserGender(userGender);
        user.setUserBirthdate(userBirthdate);

        // ✅ DB 반영
        userRepo.save(user);

        // ✅ 세션 갱신
        session.setAttribute("user", user);

        return "redirect:/mypage";
    }
    
    
}

