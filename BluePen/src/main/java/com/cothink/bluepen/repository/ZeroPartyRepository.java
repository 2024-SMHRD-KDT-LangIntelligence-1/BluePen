package com.cothink.bluepen.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cothink.bluepen.entity.ZeroParty;

//DB에 접근하기 위한 Repository
@Repository
public interface ZeroPartyRepository extends JpaRepository<ZeroParty, Long> {
 // 기본적인 save(), findAll() 등 자동 제공
	 Optional<ZeroParty> findByUserId(String userId);
}