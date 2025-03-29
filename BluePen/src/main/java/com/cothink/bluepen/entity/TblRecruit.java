package com.cothink.bluepen.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_recruit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TblRecruit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "recruit_idx")
	private Long recruitIdx;

	@Column(nullable = false, length = 255)
	private String company;

	@Column(name = "recruit_title", nullable = false, length = 255)
	private String recruitTitle;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String career;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String academic;

	@Column(nullable = false, length = 255)
	private String duty;

	@Column(nullable = false, length = 255)
	private String salary;

	@Column(nullable = false, length = 255)
	private String position;

	@Column(name = "working_day", nullable = false, length = 255)
	private String workingDay;

	@Column(name = "working_area", nullable = false, length = 255)
	private String workingArea;

	@Column(name = "started_at", nullable = false)
	private LocalDateTime startedAt;

	@Column(name = "closed_at", nullable = false)
	private LocalDateTime closedAt;

	@Column(name = "src_url", length = 255, nullable = true)
	private String srcUrl;
}
