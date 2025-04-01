package com.cothink.bluepen.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cothink.bluepen.model.ChatListVO;
import com.cothink.bluepen.model.ChatSaveVO;
import com.cothink.bluepen.service.TblChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

	private final TblChatService chatService;

	@PostMapping("/save")
	public ResponseEntity<String> saveChat(@RequestBody List<ChatSaveVO> chatList) {
		try {
			chatService.saveChats(chatList);
			return ResponseEntity.ok("대화 저장 성공!!!");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body("대화 저장 실패!!!");
		}
	}

	@GetMapping("/list")
	public ResponseEntity<List<ChatListVO>> getChatList() {
		List<ChatListVO> chatList = chatService.getChatList();
		return ResponseEntity.ok(chatList);
	}
}
