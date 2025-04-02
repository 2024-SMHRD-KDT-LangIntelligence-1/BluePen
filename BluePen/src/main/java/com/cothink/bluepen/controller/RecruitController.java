package com.cothink.bluepen.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cothink.bluepen.service.TblPublicService; // ✅ 새로 추가!
import com.cothink.bluepen.service.TblRecruitService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recruit")
public class RecruitController {

	private final TblRecruitService recruitService;
	private final TblPublicService publicService; // ✅ 필드 추가!

	@GetMapping("/fetch-all")
	public ResponseEntity<String> fetchAll() {
		recruitService.fetchAllRecruitData();
		return ResponseEntity.ok("사람인 수집 완료!");
	}

	@GetMapping("/fetch-public")
	public ResponseEntity<String> fetchPublic() {
		try {
			publicService.fetchPublicRecruit();
			return ResponseEntity.ok("공공데이터 수집 완료!");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("공공데이터 수집 중 에러 발생!");
		}
	}
}
