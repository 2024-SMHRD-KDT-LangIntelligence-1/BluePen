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
// 버튼 요소 선택
const buttons = document.querySelectorAll('.job-btn, .education-btn, .career-btn, .region-btn');
const nextButton = document.querySelector('.next-btn'); // 다음 버튼

// 로컬 스토리지에서 선택 상태 불러오기
function loadSelectedState() {
  const categories = ['job', 'education', 'career', 'region'];
  
  categories.forEach(category => {
    const savedSelection = localStorage.getItem(`selected${capitalizeFirstLetter(category)}`);
    
    if (savedSelection) {
      // 저장된 선택값을 찾아서 active 클래스 추가
      const button = Array.from(document.querySelectorAll(`.${category}-btn`))
                           .find(btn => btn.innerText === savedSelection);
      if (button) {
        button.classList.add("active");
      }
    }
  });

  checkNextButton(); // 모든 그룹에서 버튼이 선택되었는지 확인
}

// 첫 글자를 대문자로 변환하는 함수
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// 버튼 클릭 시 선택 상태 저장 및 스타일 변경 함수
function handleButtonClick(category, button) {
  // 같은 그룹의 기존 선택된 버튼 초기화
  document.querySelectorAll(`.${category}-btn`).forEach(btn => {
    btn.classList.remove("active");
  });

  // 선택한 버튼 스타일 변경
  button.classList.add("active");

  // 선택 상태 저장
  localStorage.setItem(`selected${capitalizeFirstLetter(category)}`, button.innerText);

  checkNextButton(); // 모든 그룹에서 버튼이 선택되었는지 확인
}

// 모든 세션의 버튼이 클릭되었는지 확인하는 함수
function checkNextButton() {
  const categories = ['job', 'education', 'career', 'region'];
  let allSelected = true; // 모든 그룹이 선택되었는지 확인하는 변수

  // 모든 카테고리가 선택되었는지 확인
  categories.forEach(category => {
    const selected = localStorage.getItem(`selected${capitalizeFirstLetter(category)}`);
    if (!selected) {
      allSelected = false; // 하나라도 선택되지 않으면 false
    }
  });

  // 모든 세션에서 버튼이 선택되었을 때만 next 버튼 활성화
  if (allSelected) {
    nextButton.disabled = false;
  } else {
    nextButton.disabled = true;
  }
}

// 각 버튼에 클릭 이벤트 추가
buttons.forEach(button => {
  button.addEventListener("click", function () {
    if (this.classList.contains("job-btn")) handleButtonClick("job", this);
    if (this.classList.contains("education-btn")) handleButtonClick("education", this);
    if (this.classList.contains("career-btn")) handleButtonClick("career", this);
    if (this.classList.contains("region-btn")) handleButtonClick("region", this);
  });
});

// 페이지 로드 시 선택된 상태 적용
document.addEventListener("DOMContentLoaded", function () {
  loadSelectedState();
});

// 직무 선택 시 자격증 선택칸 보이게 하는 코드
document.addEventListener("DOMContentLoaded", function () {
  const jobButtons = document.querySelectorAll(".job-btn");
  const container2 = document.querySelector(".container2");

  jobButtons.forEach((button) => {
    button.addEventListener("click", function () {
      container2.style.display = "block";
    });
  });
});

// next 버튼 클릭 시 mainpage로 이동 승혁 수정 @@@@
nextButton.addEventListener('click', function() {
  if (!this.disabled) {
	document.getElementById('interest-form').submit(); // form 전송
	  }
	});


// 버튼 클릭 시 hidden input에 값 넣기 승혁@@@@@
function setupSelection(category, btnClass, hiddenInputId) {
  const buttons = document.querySelectorAll(`.${btnClass}`);
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 스타일 처리
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // hidden input에 값 저장
      document.getElementById(hiddenInputId).value = btn.innerText.trim();
    });
  });
}

// 카테고리별 설정
setupSelection("job", "job-btn", "hidden-job");
setupSelection("zero_aca", "education-btn", "hidden-aca");
setupSelection("zero_career", "career-btn", "hidden-career");
setupSelection("region", "region-btn", "hidden-region");

