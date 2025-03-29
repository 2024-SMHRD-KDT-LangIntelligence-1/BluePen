package com.cothink.bluepen.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cothink.bluepen.service.TblRecruitService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recruit")
public class RecruitController {

	private final TblRecruitService recruitService;

	@GetMapping("/fetch-all")
	public ResponseEntity<String> fetchAll() {
		recruitService.fetchAllRecruitData();
		return ResponseEntity.ok("사람인 + 공공데이터 수집 완료!");
	}
}