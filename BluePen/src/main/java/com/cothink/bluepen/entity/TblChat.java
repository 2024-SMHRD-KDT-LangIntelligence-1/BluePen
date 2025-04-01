package com.cothink.bluepen.entity;

import java.security.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_chat")
public class TblChat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long chatIdx;

	private Integer promptIdx;
	private String chatter;
	private String chatType;

	@Column(columnDefinition = "TEXT")
	private String chatContent;

	private String chatFile;

	@CreationTimestamp
	private Timestamp createdAt;
}
