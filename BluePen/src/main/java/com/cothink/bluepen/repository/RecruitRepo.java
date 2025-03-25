package com.cothink.bluepen.repository;

import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cothink.bluepen.entity.TblRecruit;

// TblRecruit 엔티티를 사용하여 데이터베이스와 상호작용
public interface RecruitRepo extends JpaRepository<TblRecruit, Integer> {
	// 기본적인 CRUD 기능은 JpaRepository가 제공하므로,
	// 필요한 커스텀 쿼리 메서드만 추가하면 됩니다.

	// 예시: 채용 공고 제목으로 검색하는 메서드
	List findByRecruitTitle(String recruitTitle);
}
