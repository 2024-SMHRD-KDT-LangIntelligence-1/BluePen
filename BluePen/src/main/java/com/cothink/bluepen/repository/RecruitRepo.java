package com.cothink.bluepen.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cothink.bluepen.entity.TblRecruit;

@Repository
public interface RecruitRepo extends JpaRepository<TblRecruit, Long> {

	// ✅ 대체: LocalDate 버전 JPQL 커스텀 쿼리 사용
	@Query("SELECT r FROM TblRecruit r WHERE r.company = :company AND r.recruitTitle = :recruitTitle AND r.startedAt = :startedAt")
	List<TblRecruit> findRecruit(@Param("company") String company, @Param("recruitTitle") String recruitTitle,
			@Param("startedAt") LocalDate startedAt);
}
