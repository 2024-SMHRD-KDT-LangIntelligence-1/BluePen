package com.cothink.bluepen.entity;

import java.time.LocalDateTime;

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
	    
	    @Column(name = "user_id") // DB 컬럼명과 일치
	    private String userId;
	    
	 // 🔽 추가 항목들
	    @Column(name = "license")
	    private String license; // 보유 자격증

	    @Column(name = "hoped_license")
	    private String hopedLicense; // 관심 자격증

	    @Column(name = "salary_top")
	    private Integer salaryTop; // 연봉 상한

	    @Column(name = "salary_bottom")
	    private Integer salaryBottom; // 연봉 하한

	    @Column(name = "welfare")
	    private String welfare; // 복지

	    @Column(name = "working_condition")
	    private String workingCondition; // 근무 조건

	    @Column(name = "created_at")
	    private LocalDateTime createdAt = LocalDateTime.now(); // 등록일

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
	    
	    // 🔽 userId Getter & Setter
	    public String getUserId() {
	        return userId;
	    }

	    public void setUserId(String userId) {
	        this.userId = userId;
	    }
	    
	    public String getLicense() {
	        return license;
	    }

	    public void setLicense(String license) {
	        this.license = license;
	    }

	    public String getHopedLicense() {
	        return hopedLicense;
	    }

	    public void setHopedLicense(String hopedLicense) {
	        this.hopedLicense = hopedLicense;
	    }

	    public Integer getSalaryTop() {
	        return salaryTop;
	    }

	    public void setSalaryTop(Integer salaryTop) {
	        this.salaryTop = salaryTop;
	    }

	    public Integer getSalaryBottom() {
	        return salaryBottom;
	    }

	    public void setSalaryBottom(Integer salaryBottom) {
	        this.salaryBottom = salaryBottom;
	    }

	    public String getWelfare() {
	        return welfare;
	    }

	    public void setWelfare(String welfare) {
	        this.welfare = welfare;
	    }

	    public String getWorkingCondition() {
	        return workingCondition;
	    }

	    public void setWorkingCondition(String workingCondition) {
	        this.workingCondition = workingCondition;
	    }

	    public LocalDateTime getCreatedAt() {
	        return createdAt;
	    }

	    public void setCreatedAt(LocalDateTime createdAt) {
	        this.createdAt = createdAt;
	    }
	}


