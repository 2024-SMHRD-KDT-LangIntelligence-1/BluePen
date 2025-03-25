package com.cothink.bluepen.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cothink.bluepen.entity.TblRecruit;
import com.cothink.bluepen.model.RecruitVO;
import com.cothink.bluepen.repository.RecruitRepo;

@Service
public class RecruitService {

	@Autowired
	private RecruitRepo recruitRepo;

	public void saveRecruit(RecruitVO recruitVO) {
		// RecruitVO를 TblRecruit 엔티티로 변환
		TblRecruit tblRecruit = new TblRecruit();

		// VO에서 엔티티로 값 복사
		tblRecruit.setRecrutPblntSn(recruitVO.getRecrutPblntSn());
		tblRecruit.setInstNm(recruitVO.getInstNm());
		tblRecruit.setHireTypeLst(recruitVO.getHireTypeLst());
		tblRecruit.setWorkRgnLst(recruitVO.getWorkRgnLst());
		tblRecruit.setPbancBgngYmd(recruitVO.getPbancBgngYmd());
		tblRecruit.setPbancEndYmd(recruitVO.getPbancEndYmd());
		tblRecruit.setRecrutPbancTtl(recruitVO.getRecrutPbancTtl());
		tblRecruit.setSrcUrl(recruitVO.getSrcUrl());
		tblRecruit.setOngoingYn(recruitVO.getOngoingYn());

		// 엔티티 저장
		recruitRepo.save(tblRecruit);
	}

	/*
	 * public TblRecruit SaveRecruitData() { // 사람인 API 호출 URL String apiUrl =
	 * "https://api.saramin.co.kr/job-search";
	 * 
	 * // Authorization 헤더 설정 HttpHeaders headers = new HttpHeaders();
	 * headers.set("Authorization",
	 * "QHnYbptlAJGdoMD3UwjtIb9ipGQ7bquTADZr68KLzsFIeuQkLpK");
	 * headers.set("Content-Type", "application/json"); // JSON 요청을 보낼 때 설정
	 * 
	 * // RestTemplate을 통해 API 호출 HttpEntity<String> entity = new
	 * HttpEntity<>(headers); RestTemplate restTemplate = new RestTemplate();
	 * ResponseEntity<String> response = restTemplate.exchange(apiUrl,
	 * HttpMethod.GET, entity, String.class);
	 * 
	 * // API 응답에서 필요한 데이터 추출 (예시) String responseBody = response.getBody();
	 * 
	 * // 실제로는 JSON 파싱을 해야 합니다. 여기서는 예시로 데이터를 처리. // 여기에 실제 JSON 파싱 로직을 추가해야 합니다.
	 * 
	 * // 예시: 첫 번째 채용공고만 가져온다고 가정 // (실제 코드에서는 JSON 파싱을 해서 각 값을 처리해야 함) TblRecruit
	 * recruit = new TblRecruit();
	 * 
	 * // 예시로 받은 데이터를 매핑 recruit.setCompany("Example Company");
	 * recruit.setRecruitTitle("Software Engineer");
	 * recruit.setCareer("3+ years experience"); // 경력
	 * recruit.setAcademic("Bachelor's degree"); // 학력
	 * recruit.setDuty("Software Engineer"); recruit.setSalary(50000); // 연봉 (단위: 원)
	 * recruit.setPosition("Full-time"); recruit.setWorkingDay("Monday to Friday");
	 * recruit.setWorkingArea("Seoul");
	 * 
	 * 
	 * // 마감일 설정 (예시로 API에서 반환되는 Unix timestamp를 LocalDateTime으로 변환) long
	 * expirationTimestamp = 1629340800L; // 예시 Unix timestamp (2021-08-20)
	 * LocalDateTime closedAt = LocalDateTime.ofEpochSecond(expirationTimestamp, 0,
	 * java.time.ZoneOffset.UTC); recruit.setClosedAt(closedAt);
	 * 
	 * // DB에 저장 public TblRecruit addRecruit(TblRecruit recruit) { return
	 * RecruitRepo.save(recruit);
	 */

}