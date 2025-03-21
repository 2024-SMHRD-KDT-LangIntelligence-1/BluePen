const jobList = document.querySelector('.job-list');

// 반복되는 채용 정보를 객체 배열로 정의
const jobs = [
    {
        category: "채용",
        company: "(주)케이비손해보험",
        title: "2025 상반기 KB손해보험 6급 신입사원 공개채용",
        meta: "신입 | 대학교(4년) | 정규직 | 서울전체",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "홈페이지 지원",
        buttonClass: "homepage"
    },
    {
        category: "채용",
        company: "현대해상화재보험(주)",
        title: "2025년 현대해상 자동차보험 소액보상 신입사원 채용",
        meta: "신입 | 대학교(2,3년) | 정규직 | 서울전체",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "홈페이지 지원",
        buttonClass: "homepage"
    },
    {
        category: "채용",
        company: "해태에이치티비(주)",
        title: "익산공장 QC 현장직(정규직) 채용",
        meta: "신입 | 고졸↑ | 정규직 | 전북 익산시",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "입사지원",
        buttonClass: "apply"
    },
    {
        category: "면접",
        company: "태광그룹",
        title: "KCT B2B 서비스 기획/사업관리 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | 서울 중구",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "면접준비",
        buttonClass: "interview"
    },
    {
        category: "이력서",
        company: "글로벌모터스",
        title: "자동차 제조 부문 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | ",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "이력서 수정",
        buttonClass: "resum"
    },
    {
        category: "이력서",
        company: "글로벌모터스",
        title: "자동차 제조 부문 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | ",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "이력서 수정",
        buttonClass: "resum"
    },
    {
        category: "면접",
        company: "태광그룹",
        title: "KCT B2B 서비스 기획/사업관리 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | 서울 중구",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "면접준비",
        buttonClass: "interview"
    },
    {
        category: "이력서",
        company: "글로벌모터스",
        title: "자동차 제조 부문 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | ",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "이력서 수정",
        buttonClass: "resum"
    },
    {
        category: "면접",
        company: "태광그룹",
        title: "KCT B2B 서비스 기획/사업관리 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | 서울 중구",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "면접준비",
        buttonClass: "interview"
    },
    {
        category: "이력서",
        company: "글로벌모터스",
        title: "자동차 제조 부문 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | ",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "이력서 수정",
        buttonClass: "resum"
    },
    {
        category: "면접",
        company: "태광그룹",
        title: "KCT B2B 서비스 기획/사업관리 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | 서울 중구",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "면접준비",
        buttonClass: "interview"
    },
    {
        category: "이력서",
        company: "글로벌모터스",
        title: "자동차 제조 부문 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | ",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "이력서 수정",
        buttonClass: "resum"
    },
    {
        category: "면접",
        company: "태광그룹",
        title: "KCT B2B 서비스 기획/사업관리 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | 서울 중구",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "면접준비",
        buttonClass: "interview"
    },
    {
        category: "이력서",
        company: "글로벌모터스",
        title: "자동차 제조 부문 담당자 채용(정규직)",
        meta: "신입 | 대학교(4년) | 정규직 | ",
        extra: "면접 일정: 04/05(금) | 이력서 지원 가능",
        deadline: "~03/31(월)",
        buttonText: "이력서 수정",
        buttonClass: "resum"
    },
    // 원하는 만큼 추가 가능
];

// 데이터를 기반으로 HTML 동적으로 생성
function renderJobs() {
    jobList.innerHTML = jobs.map(job => `
        <div class="job-item">
            <div class="job-category">${job.category}</div>
            <div class="company-name">${job.company}</div>
            <div class="job-info">
                <div class="job-details">
                    <div class="job-title">${job.title}</div>
                    <div class="job-meta">${job.meta}</div>
                    <div class="job-extra">${job.extra}</div>
                </div>
                <div class="job-deadline">${job.deadline}</div>
            </div>
            <button class="apply-btn ${job.buttonClass}">${job.buttonText}</button>
            <button class="delete-btn" onclick="this.closest('.job-item').remove()">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// 실행
renderJobs();
    // 리스트 나열
    function updateItemsPerPage() {
            let itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
            let jobItems = document.querySelectorAll('.job-item');
            
            jobItems.forEach((item, index) => {
                if (index < itemsPerPage) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });
        }
        
        document.addEventListener("DOMContentLoaded", updateItemsPerPage);
            // 실제 페이징 기능 추가 가능

            

        
    // 삭제 기능
    function confirmDeleteAll() {
        if (confirm("삭제하시겠습니까?")) {
            document.querySelector('.job-list').innerHTML = "";
        }
    }
    // 키워드 입력 
    function highlightText() {
            let searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
            let jobItems = document.querySelectorAll('.job-item');
            
            jobItems.forEach(item => {
                let textElements = item.querySelectorAll('.job-title, .job-meta, .job-extra, .company-name');
                textElements.forEach(el => {
                    let text = el.innerText;
                    let regex = new RegExp(`(${searchValue})`, 'gi');
                    el.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
                });
            });
        }
        // 현재 페이지 및 페이지당 아이템 수 저장
    let currentPage = 1;
    let itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);

    // 페이지당 아이템 수 변경 시 실행
    function updateItemsPerPage() {
        itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
        currentPage = 1; // 페이지 초기화
        renderPagination(); // 페이지 버튼 다시 그림
        showPage(currentPage); // 현재 페이지 보여줌
    }

    // 특정 페이지의 아이템만 보여주는 함수
    function showPage(page) {
        let jobItems = document.querySelectorAll('.job-item');
        jobItems.forEach((item, index) => {
            if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                item.style.display = "flex"; // 해당 페이지의 항목만 표시
            } else {
                item.style.display = "none"; // 나머지 숨김
            }
        });
    }

    // 페이지네이션 버튼을 렌더링하는 함수
    function renderPagination() {
        let jobItems = document.querySelectorAll('.job-item');
        let pageCount = Math.ceil(jobItems.length / itemsPerPage); // 전체 페이지 수 계산
        let paginationDiv = document.querySelector('.pagination');
        paginationDiv.innerHTML = ''; // 기존 버튼 제거

        for (let i = 1; i <= pageCount; i++) {
            let button = document.createElement('button');
            button.textContent = i;

            // 현재 페이지 버튼은 스타일 다르게
            if (i === currentPage) {
                button.classList.add('active');
            }

            // 버튼 클릭 시 해당 페이지로 이동
            button.onclick = () => {
                currentPage = i;
                showPage(currentPage);
                renderPagination();
            };

            paginationDiv.appendChild(button);
        }
    }

    // 전체 삭제 시 페이지네이션도 초기화
    function confirmDeleteAll() {
        if (confirm("삭제하시겠습니까?")) {
            document.querySelector('.job-list').innerHTML = "";
            document.querySelector('.pagination').innerHTML = "";
        }
    }

    // 키워드 하이라이팅 및 검색 필터링
    function highlightText() {
        let searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
        let jobItems = document.querySelectorAll('.job-item');

        jobItems.forEach(item => {
            let textElements = item.querySelectorAll('.job-title, .job-meta, .job-extra, .company-name');
            let matchFound = false;

            textElements.forEach(el => {
                let text = el.textContent;
                let regex = new RegExp(`(${searchValue})`, 'gi');
                let replaced = text.replace(regex, '<span class="highlight">$1</span>');
                if (replaced !== text) matchFound = true;
                el.innerHTML = replaced;
            });

            // 검색 결과에 따라 항목 보여줌/숨김 처리
            item.style.display = matchFound || searchValue === '' ? 'flex' : 'none';
        });

        // 검색 중일 때는 페이지네이션 숨기고, 초기화 시 다시 보여줌
        if (searchValue === '') {
            showPage(currentPage);
            renderPagination();
        } else {
            document.querySelector('.pagination').innerHTML = '';
        }
    }

    // 페이지 로드 시 초기 렌더링
    document.addEventListener("DOMContentLoaded", () => {
        renderPagination(); // 페이지네이션 생성
        showPage(currentPage); // 첫 페이지 보여줌
    });
	

	const sidebar = document.querySelector(".sidebar");
