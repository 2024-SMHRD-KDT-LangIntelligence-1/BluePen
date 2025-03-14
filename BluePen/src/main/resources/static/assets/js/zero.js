function populateOptions(categoryId, items) {
    const container = document.getElementById(categoryId);
    items.forEach(item => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = item;
        div.onclick = () => toggleSelection(div);
        container.appendChild(div);
    });
}

const jobTitles = [
    "개발자", "디자이너", "마케팅", "영업", "기획자", "HR", "데이터 분석가", "AI 연구원", "PM", "컨설턴트",
    "영상 편집자", "회계사", "교수", "법률가", "공무원", "작가", "의사", "연구원", "운동 트레이너", "요리사"
];
const certificateTitles = [
    "정보처리기사", "SQLD", "컴퓨터활용능력", "토익", "MOS", "GTQ", "JLPT", "CFA", "FP", "변리사",
    "TEPS", "HSK", "사회복지사", "네트워크 관리사", "전기기사", "공인중개사", "세무사", "9급 공무원", "소방시설관리사", "CS관리사"
];
const locationTitles = [
    "서울", "부산", "대구", "광주", "인천", "대전", "울산", "세종", "경기", "강원",
    "충북", "충남", "전북", "전남", "경북", "경남", "제주", "해외", "전국", "기타"
];

populateOptions("jobs", jobTitles);
populateOptions("certificates", certificateTitles);
populateOptions("locations", locationTitles);

function toggleSelection(element) {
    element.classList.toggle("selected");
}

function nextSlide(categoryId) {
    const container = document.getElementById(categoryId);
    const firstItem = container.firstElementChild;

    container.style.transition = "transform 0.5s ease-in-out";
    container.style.transform = "translateX(-25%)"; // 4개만 보이도록 이동 거리 조정

    setTimeout(() => {
        container.appendChild(firstItem);
        container.style.transition = "none";
        container.style.transform = "translateX(0)";
    }, 500);
}

function submitSelection() {
    const selectedJobs = Array.from(document.querySelectorAll("#jobs .selected")).map(el => el.innerText);
    const selectedCertificates = Array.from(document.querySelectorAll("#certificates .selected")).map(el => el.innerText);
    const selectedLocations = Array.from(document.querySelectorAll("#locations .selected")).map(el => el.innerText);

    if (selectedJobs.length === 0 || selectedCertificates.length === 0 || selectedLocations.length === 0) {
        alert("각 카테고리에서 최소 한 개 이상 선택해주세요.");
        return;
    }

    const userData = {
        jobs: selectedJobs,
        certificates: selectedCertificates,
        locations: selectedLocations
    };

    fetch("/save-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        alert("선택한 정보가 저장되었습니다.");
    })
    .catch(error => console.error("저장 오류:", error));
}