package com.cothink.bluepen.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.cothink.bluepen.entity.TblUser;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class MypageController {

    @GetMapping("/mypage")
    public String mypage_do(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        TblUser uid = (TblUser) session.getAttribute("user");

        String user_id = uid.getUserId();
        session.setAttribute("user_id", user_id);
        model.addAttribute("user_id", user_id);

        return "mypage";
    }

    // String userid = uid.getUserId();
    // session.setAttribute("userid", userid);
    // System.out.println("저장된 유저아이디 가져오기" + userid);

    // List<TbCreditcard> cardlist = creditcard_repo.findAllByUserId(userid);
    // model.addAttribute("cardlist", cardlist);

}
