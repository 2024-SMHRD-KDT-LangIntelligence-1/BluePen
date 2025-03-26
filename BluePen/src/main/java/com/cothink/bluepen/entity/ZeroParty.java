package com.cothink.bluepen.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_zeroparty") // MySQL 테이블과 매핑
public class ZeroParty {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 증가 ID
	    private Long id;

	    @Column(name = "job")
	    private String job; // 관심 직무

	    @Column(name = "zero_aca")
	    private String education; // 학력

	    @Column(name = "zero_career")
	    private String career; // 경력

	    @Column(name = "region")
	    private String region; // 관심 지역

	    // Getters and Setters 생략 가능 (Lombok 사용 시 @Data 추가 가능)
	    public Long getId() {
	        return id;
	    }

	    public String getJob() {
	        return job;
	    }

	    public void setJob(String job) {
	        this.job = job;
	    }

	    public String getEducation() {
	        return education;
	    }

	    public void setEducation(String education) {
	        this.education = education;
	    }

	    public String getCareer() {
	        return career;
	    }

	    public void setCareer(String career) {
	        this.career = career;
	    }

	    public String getRegion() {
	        return region;
	    }

	    public void setRegion(String region) {
	        this.region = region;
	    }
	}


