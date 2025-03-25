package com.cothink.bluepen.model;

import java.sql.Timestamp;

public class RecruitVO {
	private Integer recrutPblntSn; // 채용 공고 식별 번호
	private String pblntInstCd; // 공고 기관 코드
	private String instNm; // 기관명
	private String hireTypeLst; // 채용 유형 목록
	private String workRgnLst; // 근무 지역 목록
	private Timestamp pbancBgngYmd; // 채용 공고 시작일
	private Timestamp pbancEndYmd; // 채용 공고 종료일
	private String recrutPbancTtl; // 채용 공고 제목
	private String srcUrl; // 공고의 출처 URL
	private String ongoingYn; // 진행 중 여부

	// Getters and Setters
	public Integer getRecrutPblntSn() {
		return recrutPblntSn;
	}

	public void setRecrutPblntSn(Integer recrutPblntSn) {
		this.recrutPblntSn = recrutPblntSn;
	}

	public String getPblntInstCd() {
		return pblntInstCd;
	}

	public void setPblntInstCd(String pblntInstCd) {
		this.pblntInstCd = pblntInstCd;
	}

	public String getInstNm() {
		return instNm;
	}

	public void setInstNm(String instNm) {
		this.instNm = instNm;
	}

	public String getHireTypeLst() {
		return hireTypeLst;
	}

	public void setHireTypeLst(String hireTypeLst) {
		this.hireTypeLst = hireTypeLst;
	}

	public String getWorkRgnLst() {
		return workRgnLst;
	}

	public void setWorkRgnLst(String workRgnLst) {
		this.workRgnLst = workRgnLst;
	}

	public Timestamp getPbancBgngYmd() {
		return pbancBgngYmd;
	}

	public void setPbancBgngYmd(Timestamp pbancBgngYmd) {
		this.pbancBgngYmd = pbancBgngYmd;
	}

	public Timestamp getPbancEndYmd() {
		return pbancEndYmd;
	}

	public void setPbancEndYmd(Timestamp pbancEndYmd) {
		this.pbancEndYmd = pbancEndYmd;
	}

	public String getRecrutPbancTtl() {
		return recrutPbancTtl;
	}

	public void setRecrutPbancTtl(String recrutPbancTtl) {
		this.recrutPbancTtl = recrutPbancTtl;
	}

	public String getSrcUrl() {
		return srcUrl;
	}

	public void setSrcUrl(String srcUrl) {
		this.srcUrl = srcUrl;
	}

	public String getOngoingYn() {
		return ongoingYn;
	}

	public void setOngoingYn(String ongoingYn) {
		this.ongoingYn = ongoingYn;
	}
}
