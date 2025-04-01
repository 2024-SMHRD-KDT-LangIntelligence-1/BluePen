package com.cothink.bluepen.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cothink.bluepen.entity.TblChat;

@Repository
public interface ChatRepo extends JpaRepository<TblChat, Long> {

	@Query(value = """
			    SELECT c.prompt_idx, c.chat_content, c.created_at
			    FROM tbl_chat c
			    WHERE (c.chat_idx, c.prompt_idx) IN (
			        SELECT MIN(chat_idx), prompt_idx
			        FROM tbl_chat
			        GROUP BY prompt_idx
			    )
			    ORDER BY c.created_at DESC
			""", nativeQuery = true)
	List<Object[]> findFirstChatsByPromptIdx();
}
