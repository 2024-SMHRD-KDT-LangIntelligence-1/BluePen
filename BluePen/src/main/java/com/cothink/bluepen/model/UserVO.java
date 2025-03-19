package com.cothink.bluepen.model;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// model의 객체는 db의 이름과 같게
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserVO {
	// 회원 아이디
	private String user_id;

	// 회원 비밀번호
	private String user_pw;

	// 회원 생년월일
	private Date user_birthdate;

	// 회원 성별
	private String user_gender;

	// 회원 가입일자
	private Timestamp joined_at;

}
