package com.cothink.bluepen.model;

public class ChatSaveVO {

	private Integer promptIdx;
	private String chatter;
	private String chatType;
	private String chatContent;
	private String chatFile;

	public ChatSaveVO() {
	} // Jackson을 위한 기본 생성자

	public ChatSaveVO(Integer promptIdx, String chatter, String chatType, String chatContent, String chatFile) {
		this.promptIdx = promptIdx;
		this.chatter = chatter;
		this.chatType = chatType;
		this.chatContent = chatContent;
		this.chatFile = chatFile;
	}

	public Integer getPromptIdx() {
		return promptIdx;
	}

	public String getChatter() {
		return chatter;
	}

	public String getChatType() {
		return chatType;
	}

	public String getChatContent() {
		return chatContent;
	}

	public String getChatFile() {
		return chatFile;
	}
}
