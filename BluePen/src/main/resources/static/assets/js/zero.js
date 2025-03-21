// 슬라이드 이동 하게 하는 코드
document.addEventListener("DOMContentLoaded", function () {
  // 슬라이드 이동 함수
  function moveSlide(slider, direction) {
    const items = slider.querySelectorAll("button");
    const itemWidth = items[0].offsetWidth;
    const visibleItems = Math.floor(slider.offsetWidth / itemWidth);
    
    if (direction === "next") {
      slider.scrollBy(itemWidth * visibleItems, 0);
    } else if (direction === "prev") {
      slider.scrollBy(-itemWidth * visibleItems, 0);
    }
  }

  // 각 슬라이드와 버튼에 대한 설정
  const sliders = [
    { sliderId: "job-slider", buttonId: "next-slide-job-list" },
    { sliderId: "education-slider", buttonId: "next-slide-education-level" },
    { sliderId: "region-slider", buttonId: "next-slide-region" },
    { sliderId: "license-slider1", buttonId: "next-slide-button1" },
    { sliderId: "license-slider2", buttonId: "next-slide-button2" },
    { sliderId: "hoped-licenses-slider1", buttonId: "next-slide-hoped-button1" },
    { sliderId: "hoped-licenses-slider2", buttonId: "next-slide-hoped-button2" },
  ];

  // 슬라이드 버튼에 클릭 이벤트 리스너 추가
  sliders.forEach(({ sliderId, buttonId }) => {
    const slider = document.getElementById(sliderId);
    const button = document.getElementById(buttonId);
    
    if (slider && button) {
      button.addEventListener("click", function () {
        moveSlide(slider, "next");  // "next" 방향으로 이동
      });
    }
  });

  // 슬라이드를 한 번에 이동하는 함수
  function moveSlide(slider, direction) {
    if (!slider) {
      console.error(`Slider not found!`);
      return;
    }

    const slides = slider.querySelectorAll('button');
    if (slides.length === 0) {
      console.error('No slides found!');
      return;
    }

    const slideWidth = slides[0].offsetWidth; // 슬라이드 너비

    slider.style.transition = "transform 0.6s ease-in-out"; // 부드럽게 이동하도록 설정

    // 현재 transform 값 가져오기
    const currentTransform = getComputedStyle(slider).transform;
    const currentTranslateX = currentTransform === "none" ? 0 : parseInt(currentTransform.split(",")[4]);

    // 슬라이드를 이동시킴 (5개씩 이동)
    slider.style.transform = `translateX(${currentTranslateX - slideWidth * 5}px)`;

    setTimeout(() => {
      slider.style.transition = "none"; // transition을 없앰
      const firstSlides = Array.from(slides).slice(0, 5); // 5개 슬라이드 선택
      firstSlides.forEach(slide => {
        slider.appendChild(slide); // 첫 5개 슬라이드를 맨 뒤로 추가
      });

      slider.style.transform = "translateX(0)"; // 이동된 거리 초기화

      setTimeout(() => {
        slider.style.transition = "transform 0.6s ease-in-out"; // transition 다시 활성화
      }, 50); // 작은 시간 지연 후 transition 활성화
    }, 600); // 0.6초 후 첫 5개 슬라이드를 맨 뒤로 보냄
  }
});

//---------------------------------------------------------------------------------------------------------
// 버튼 선택시 이전에 선택한 버튼 유지되게하는 코드
document.addEventListener("DOMContentLoaded", function () {
    // 버튼 그룹별 선택 상태 저장 객체
    let selected = {
        job: localStorage.getItem("selectedJob") || "",
        qualification: localStorage.getItem("selectedQualification") || "",
        experience: localStorage.getItem("selectedExperience") || "",
        region: localStorage.getItem("selectedRegion") || "",
        license: localStorage.getItem("selectedLicense") || "",
        hopedLicense: localStorage.getItem("selectedHopedLicense") || ""
    };

	// 첫 글자를 대문자로 바꾸는 함수 정의
	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
    // 버튼 클릭 시 선택 상태 저장 및 스타일 변경 함수
    function handleButtonClick(category, button) {
        // 해당 카테고리의 기존 선택된 버튼 초기화
        document.querySelectorAll(`.${category}`).forEach(btn => {
            btn.style.backgroundColor = "";  // 원래 스타일로 초기화
            btn.style.color = "";  // 원래 스타일로 초기화
        });

        // 선택한 버튼 스타일 변경
        button.style.backgroundColor = "#19335A";
        button.style.color = "white";

        // 선택 상태 저장
        selected[category] = button.innerText;
        localStorage.setItem(`selected${capitalizeFirstLetter(category)}`, button.innerText);
    }

    // 기존 선택 상태 불러와서 스타일 적용
    function applySavedSelection() {
        Object.keys(selected).forEach(category => {
            if (selected[category]) {
                let savedButton = Array.from(document.querySelectorAll(`.${category}`))
                    .find(btn => btn.innerText === selected[category]);
                if (savedButton) {
                    savedButton.style.backgroundColor = "#19335A";
                    savedButton.style.color = "white";
                }
            }
        });
    }

    // 모든 버튼에 클릭 이벤트 추가
    document.querySelectorAll(".job-btn, .education-btn, .career-btn, .region-btn, .license-btn, .license-btn.hoped").forEach(button => {
        button.addEventListener("click", function () {
            if (this.classList.contains("job-btn")) handleButtonClick("job", this);
            if (this.classList.contains("education-btn")) handleButtonClick("qualification", this);
            if (this.classList.contains("career-btn")) handleButtonClick("experience", this);
            if (this.classList.contains("region-btn")) handleButtonClick("region", this);
            if (this.classList.contains("license-btn")) handleButtonClick("license", this);
            if (this.classList.contains("license-btn") && this.classList.contains("hoped")) handleButtonClick("hopedLicense", this);
        });
    });

    // 저장된 선택 적용
    applySavedSelection();
});
//------------------------------------------------------------------------------------------------------
// 버튼 요소들을 선택
const buttons = document.querySelectorAll('.job-btn, .education-btn, .career-btn, .region-btn');

buttons.forEach(button => {
  button.addEventListener("click", function () {
    // active 클래스를 토글
    button.classList.toggle("active");
  });
});
//----------------------------------------------------------------------------------------------
// 직무 선택시 자격증 선택칸 밑에 생성하게 하는 코드
document.addEventListener("DOMContentLoaded", function () {
  // 모든 직무 버튼 선택
  const jobButtons = document.querySelectorAll(".job-btn");
  // container2 요소 선택
  const container2 = document.querySelector(".container2");

  // 버튼 클릭 시 container2를 보이게 설정
  jobButtons.forEach((button) => {
    button.addEventListener("click", function () {
      container2.style.display = "block";
    });
  });
});
//---------------------------------------------------------------------------------------
 