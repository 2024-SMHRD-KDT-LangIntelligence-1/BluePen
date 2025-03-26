package com.cothink.bluepen.model;

import java.sql.Date;
import java.sql.Time;

public class ScheduleVO {
	private int scheIdx;
	private String userId;
	private String scheTitle;
	private String scheContent;
	private String scheFile;
	private Date scheDt;
	private Time scheTm;
	private String scheType;
	private String scheColor;
	private String alertSetting;
	private String scheStatus;

	// ✅ Getter & Setter

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
