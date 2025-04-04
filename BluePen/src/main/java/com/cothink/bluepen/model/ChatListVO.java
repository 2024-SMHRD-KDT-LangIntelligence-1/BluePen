package com.cothink.bluepen.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatListVO {
	private Integer promptIdx;
	private String chatContent;
	private Timestamp createdAt;
}