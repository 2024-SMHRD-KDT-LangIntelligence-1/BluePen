package com.cothink.bluepen.entity;

import java.sql.Date;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import com.cothink.bluepen.model.UserVO;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TblUser {
	
	public TblUser(UserVO vo) {
		userId = vo.getUser_id();
		userPw = vo.getUser_pw();
		userBirthdate = vo.getUser_birthdate();
		userGender = vo.getUser_gender();
		joinedAt = vo.getJoined_at();

	}
	
	// 회원 아이디
	@Id
	private String userId;

	// 회원 비밀번호
	private String userPw;

	// 회원 생년월일
	private Date userBirthdate;

	// 회원 성별
	private String userGender;

	// 회원 가입일자
	@CreationTimestamp
	private Timestamp joinedAt;
}
