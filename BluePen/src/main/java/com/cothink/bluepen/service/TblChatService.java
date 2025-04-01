package com.cothink.bluepen.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cothink.bluepen.entity.TblChat;
import com.cothink.bluepen.model.ChatListVO;
import com.cothink.bluepen.model.ChatSaveVO;
import com.cothink.bluepen.repository.ChatRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TblChatService {

	private final ChatRepo chatRepository;

	public void saveChats(List<ChatSaveVO> chatList) {
		for (ChatSaveVO vo : chatList) {
			TblChat entity = new TblChat();
			entity.setPromptIdx(vo.getPromptIdx());
			entity.setChatter(vo.getChatter());
			entity.setChatType(vo.getChatType());
			entity.setChatContent(vo.getChatContent());
			entity.setChatFile(vo.getChatFile());

			chatRepository.save(entity);
		}
	}

	public List<ChatListVO> getChatList() {
		List<Object[]> rows = chatRepository.findFirstChatsByPromptIdx();
		return rows.stream().map(row -> new ChatListVO((Integer) row[0], (String) row[1], (Timestamp) row[2]))
				.collect(Collectors.toList());
	}

}
