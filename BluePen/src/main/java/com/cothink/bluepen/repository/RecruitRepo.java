package com.cothink.bluepen.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cothink.bluepen.entity.TblRecruit;

@Repository
public interface RecruitRepo extends JpaRepository<TblRecruit, Long> {

	boolean existsByCompanyAndRecruitTitleAndStartedAt(String company, String recruitTitle, LocalDateTime startedAt);

	List<TblRecruit> findByCompanyAndRecruitTitleAndStartedAt(String company, String recruitTitle,
			LocalDateTime startedAt);
}