package com.cothink.bluepen.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tb_recruit")
public class TblRecruit {
	// 필드와 매핑

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "recruit_idx")
	private Integer recruitIdx; // 채용 식별자

	@Column(name = "company")
	private String company; // 기업명

	@Column(name = "recruit_title")
	private String recruitTitle; // 공고명

	@Column(name = "career")
	private String career; // 경력

	@Column(name = "academic")
	private String academic; // 학력

	@Column(name = "duty")
	private String duty; // 근무형태

	@Column(name = "salary")
	private Integer salary; // 급여

	@Column(name = "position")
	private String position; // 직급

	@Column(name = "working_day")
	private String workingDay; // 근무일시

	@Column(name = "working_area")
	private String workingArea; // 근무지

	@Column(name = "closed_at")
	private Timestamp closedAt; // 마감일자

	@Column(name = "recrutPblntSn")
	private Integer recrutPblntSn; // 채용 공고 식별 번호

	@Column(name = "instNm")
	private String instNm; // 기관명

	@Column(name = "hireTypeLst")
	private String hireTypeLst; // 채용 유형 목록

	@Column(name = "workRgnLst")
	private String workRgnLst; // 근무 지역 목록

	@Column(name = "pbancBgngYmd")
	private Timestamp pbancBgngYmd; // 채용 공고 시작일

	@Column(name = "pbancEndYmd")
	private Timestamp pbancEndYmd; // 채용 공고 종료일

	@Column(name = "recrutPbancTtl")
	private String recrutPbancTtl; // 채용 공고 제목

	@Column(name = "srcUrl")
	private String srcUrl; // 공고의 출처 URL

	@Column(name = "ongoingYn")
	private String ongoingYn; // 진행 중 여부

	// 동기화 메소드: 엔티티가 저장되기 전에 호출
	@PrePersist
	@PreUpdate
	public void syncFields() {
		// 1. company와 instNm 동기화 (기업명=기관명)
		if (this.instNm != null) {
			this.company = this.instNm;
		}

		// 2. duty와 hireTypeLst 동기화 (근무형태=채용유형)
		if (this.hireTypeLst != null) {
			this.duty = this.hireTypeLst;
		}

		// 3. workingArea와 workRgnLst 동기화 (근무지=근무지역)
		if (this.workRgnLst != null) {
			this.workingArea = this.workRgnLst;
		}

		// 4. closedAt과 pbancEndYmd 동기화 (마감일자=채용종료일자)
		if (this.pbancEndYmd != null) {
			this.closedAt = new Timestamp(this.pbancEndYmd.getTime());
		}

		// 5. recruitTitle과 recrutPbancTtl 동기화 (공고명=채용공고제목)
		if (this.recrutPbancTtl != null) {
			this.recruitTitle = this.recrutPbancTtl;
		}

		// 6. recruitIdx와 recrutPblntSn 동기화 (채용식별자=채용 공고 식별 번호)
		if (this.recrutPblntSn != null) {
			this.recruitIdx = this.recrutPblntSn;
		}
	}
}
