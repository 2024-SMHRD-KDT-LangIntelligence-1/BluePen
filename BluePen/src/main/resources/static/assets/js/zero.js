// 각 슬라이드 이동 버튼 클릭 이벤트 핸들러
document.getElementById('next-slide-jobs').addEventListener('click', function() {
  moveSlide('jobs');
});

document.getElementById('next-slide-education').addEventListener('click', function() {
  moveSlide('education');
});

document.getElementById('next-slide-locations').addEventListener('click', function() {
  moveSlide('locations');
});

// 슬라이드를 5개씩 부드럽게 이동하는 함수
function moveSlide(sectionId) {
  const slider = document.querySelector(`#${sectionId} .slider`);
  const slides = slider.querySelectorAll('.option-btn');
  
  // 슬라이드의 너비를 가져옵니다
  const slideWidth = slides[0].offsetWidth;

  // 슬라이드가 이동할 때 transition을 적용하여 부드럽게 이동하도록 설정
  slider.style.transition = 'transform 0.6s ease-in-out'; // 이동 속도와 애니메이션 타이밍을 더 부드럽게 설정

  // 현재 transform 값 가져오기 (이동 전 현재 위치)
  const currentTransform = getComputedStyle(slider).transform;
  const currentTranslateX = currentTransform === 'none' ? 0 : parseInt(currentTransform.split(',')[4]);

  // 슬라이드를 오른쪽으로 5칸 이동시킴
  slider.style.transform = `translateX(${currentTranslateX - (slideWidth * 5)}px)`;

  // 600ms 후에 첫 번째 5개의 슬라이드를 맨 뒤로 이동시킴
  setTimeout(() => {
    slider.style.transition = 'none'; // transition을 없애서 위치 변경 후 자연스럽게 초기화

    // 첫 번째 5개의 슬라이드를 맨 뒤로 보냄
    for (let i = 0; i < 5; i++) {
      const firstSlide = slides[0];
      slider.appendChild(firstSlide);
    }

    // 슬라이드가 원위치로 가도록 수정 (이동된 거리 초기화)
    slider.style.transform = 'translateX(0)';
  }, 600); // 슬라이드가 0.6초 후 첫 번째 슬라이드 맨 뒤로 이동
}
//-----------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    // 버튼 그룹별 선택 상태 저장 객체
    let selected = {
        job: localStorage.getItem("selectedJob") || "",
        qualification: localStorage.getItem("selectedQualification") || "",
        experience: localStorage.getItem("selectedExperience") || "",
        region: localStorage.getItem("selectedRegion") || ""
    };

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

    // 첫 글자를 대문자로 변환하는 함수 (localStorage key 생성용)
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
    document.querySelectorAll(".job-btn, .aca-btn, .career-btn, .region-btn").forEach(button => {
        button.addEventListener("click", function () {
            if (this.classList.contains("job-btn")) handleButtonClick("job-btn", this);
            if (this.classList.contains("aca-btn")) handleButtonClick("aca-btn", this);
            if (this.classList.contains("career-btn")) handleButtonClick("career-btn", this);
            if (this.classList.contains("region-btn")) handleButtonClick("region-btn", this);
        });
    });

    // 저장된 선택 적용
    applySavedSelection();
});


