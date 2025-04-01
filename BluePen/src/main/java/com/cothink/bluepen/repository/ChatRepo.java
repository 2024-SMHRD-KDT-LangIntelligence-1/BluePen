package com.cothink.bluepen.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cothink.bluepen.entity.TblChat;

@Repository
public interface ChatRepo extends JpaRepository<TblChat, Long> {
	// 필요 시 커스텀 쿼리 작성 가능
}