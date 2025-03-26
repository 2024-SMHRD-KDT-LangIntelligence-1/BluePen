package com.cothink.bluepen.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cothink.bluepen.entity.TblRecruit;

@Repository
public interface RecruitRepo extends JpaRepository<TblRecruit, Integer> {

	// 진행 중 여부 필터
	List<TblRecruit> findByOngoingYn(String ongoingYn);

	// 기관명(회사명) 키워드로 검색 (부분 검색)
	List<TblRecruit> findByCompanyContaining(String keyword);

	// 지역 필터링
	List<TblRecruit> findByWorkingArea(String area);

	// 제목 키워드 검색
	List<TblRecruit> findByRecruitTitleContaining(String keyword);

	// 마감일 순 정렬
	List<TblRecruit> findAllByOrderByClosedAtAsc();

	// 특정 날짜 이후 마감되는 공고만 보기
	List<TblRecruit> findByClosedAtAfter(Timestamp date);

}
