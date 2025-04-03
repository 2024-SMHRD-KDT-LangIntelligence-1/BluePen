package com.cothink.bluepen.entity;

import java.sql.Date;
import java.sql.Time;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_schedule")
public class Tblschedule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int scheIdx;

	private String userId;
	private String scheTitle;
	private Date scheDt;
	private Time scheTm;
	private String scheType;
	private String scheColor;

	// 선택적으로 비워둘 수 있는 필드들
	private String scheContent;
	private String scheFile;
	private String alertSetting = "off";
	private String scheStatus = "active";

	// === Getter & Setter ===

	public int getScheIdx() {
		return scheIdx;
	}

	public void setScheIdx(int scheIdx) {
		this.scheIdx = scheIdx;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getScheTitle() {
		return scheTitle;
	}

	public void setScheTitle(String scheTitle) {
		this.scheTitle = scheTitle;
	}

	public Date getScheDt() {
		return scheDt;
	}

	public void setScheDt(Date scheDt) {
		this.scheDt = scheDt;
	}

	public Time getScheTm() {
		return scheTm;
	}

	public void setScheTm(Time scheTm) {
		this.scheTm = scheTm;
	}

	public String getScheType() {
		return scheType;
	}

	public void setScheType(String scheType) {
		this.scheType = scheType;
	}

	public String getScheColor() {
		return scheColor;
	}

	public void setScheColor(String scheColor) {
		this.scheColor = scheColor;
	}

	public String getScheContent() {
		return scheContent;
	}

	public void setScheContent(String scheContent) {
		this.scheContent = scheContent;
	}

	public String getScheFile() {
		return scheFile;
	}

	public void setScheFile(String scheFile) {
		this.scheFile = scheFile;
	}

	public String getAlertSetting() {
		return alertSetting;
	}

	public void setAlertSetting(String alertSetting) {
		this.alertSetting = alertSetting;
	}

	public String getScheStatus() {
		return scheStatus;
	}

	public void setScheStatus(String scheStatus) {
		this.scheStatus = scheStatus;
	}
}
