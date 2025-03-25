package com.cothink.bluepen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cothink.bluepen.model.RecruitVO;
import com.cothink.bluepen.service.RecruitService;

@RestController
@RequestMapping("/api/recruit")
public class RecruitController {

	@Autowired
	private RecruitService recruitService;

	@PostMapping("/save")
	public String saveRecruit(@RequestBody RecruitVO recruitVO) {
		recruitService.saveRecruit(recruitVO);
		return "채용 공고 저장 성공!";
	}

	public RecruitController(RecruitService recruitService) {
		this.recruitService = recruitService;
	}

//채용 공고 추가 (사람인 API 호출 후 데이터 저장)
	/*
	 * @PostMapping("/recruit") public TblRecruit add_Recruit(@RequestBody
	 * TblRecruit recruit) { // 사람인 API 호출 예시 String apiUrl =
	 * "https://api.saramin.co.kr/job-search"; HttpHeaders headers = new
	 * HttpHeaders(); headers.set("Authorization", "Bearer YOUR_ACCESS_KEY"); // 실제
	 * Access Key 넣어야 함 HttpEntity<String> entity = new HttpEntity<>(headers);
	 * 
	 * RestTemplate restTemplate = new RestTemplate(); ResponseEntity<String>
	 * response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity,
	 * String.class);
	 * 
	 * // API 호출 후 응답 처리 (예시로 JSON 파싱, 필요에 따라 추가 처리) String responseBody =
	 * response.getBody(); // 여기서 응답을 바탕으로 필요한 정보를 파싱하고, recruit 객체에 추가할 수 있음
	 * 
	 * // 채용 공고 저장 return recruitService.addRecruit(recruit); }
	 */
}
