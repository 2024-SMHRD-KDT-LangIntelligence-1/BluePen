// 알람 토글 함수
function toggleAlram() {
  const alramContainer = document.getElementById('alramContainer'); // 알람 목록 컨테이너 선택
  alramContainer.style.display = alramContainer.style.display === 'none' || alramContainer.style.display === '' ? 'block' : 'none'; // 보이거나 숨기기
}

// 알람 데이터
const alarmData = {
  title: "자격증접수일정",
  time: "어제 오후 09:12",
  body: "내일은 정보처리기사 실지 접수일입니다!",
};

// 알림 항목을 동적으로 생성하는 함수
function createAlarmItem(data) {
  const alramPopup = document.getElementById('alramPopup'); // 알람 팝업을 선택

  const alramItem = document.createElement('div'); // 알람 아이템 생성
  alramItem.classList.add('alram-item'); // 클래스 추가

  // 알람 아이템의 메뉴 버튼
  const menuButton = document.createElement('button');
  menuButton.classList.add('menu-button');
  menuButton.innerHTML = `<i class="fa-solid fa-ellipsis-vertical" style="color: gray;"></i>`;
  menuButton.onclick = () => toggleMenu(menuButton);

  const menuPopup = document.createElement('div');
  menuPopup.classList.add('menu-popup');
  menuPopup.innerHTML = `
    <button onclick="deleteItem()">삭제하기</button>
    <button onclick="turnOffNotification()">알림 끄기</button>
    <button onclick="closeMenu()">취소</button>
  `;
  menuButton.appendChild(menuPopup);

  // 각 버튼에 대한 함수 정의
  function deleteItem() {
    // 삭제 로직을 여기에 작성합니다.
    console.log("삭제하기 버튼 클릭됨");
  }

  function turnOffNotification() {
    // 알림 끄기 로직을 여기에 작성합니다.
    console.log("알림 끄기 버튼 클릭됨");
  }

  function closeMenu() {
    // 메뉴 닫기 로직을 여기에 작성합니다.
    console.log("취소 버튼 클릭됨");
  }

  // 알람 내용
  const alramContent = document.createElement('div');
  alramContent.classList.add('alram-content');
  
  const contentHeader = document.createElement('div');
  contentHeader.innerHTML = `
    <span class="alram-title">${data.title}</span>
    <span class="alram-time">${data.time}</span>
  `;

  const contentBody = document.createElement('div');
  contentBody.classList.add('alram-body');
  contentBody.innerText = data.body;

  const moreInfo = document.createElement('div');
  moreInfo.classList.add('alram-more');
  moreInfo.innerText = '+1 알림 더보기';

  // 각 요소들을 alramItem에 추가
  alramItem.appendChild(menuButton);
  alramItem.appendChild(contentHeader);
  alramItem.appendChild(contentBody);
  alramItem.appendChild(moreInfo);

  // alramPopup에 알람 아이템 추가
  alramPopup.appendChild(alramItem);
}

// 알림 항목을 추가하는 함수 호출
createAlarmItem(alarmData);

// 메뉴 토글 함수 (기본 구현)
function toggleMenu(button) {
  const menuPopup = button.querySelector('.menu-popup');
  menuPopup.classList.toggle('show');
}

// 외부 클릭 시 메뉴 닫기
document.addEventListener('click', function(event) {
  const menuButton = document.querySelector('.menu-button');
  const openMenu = document.querySelector('.menu-popup.show');

  // 메뉴 버튼을 클릭한 경우는 예외로 두고, 다른 곳을 클릭하면 메뉴 닫기
  if (menuButton && !menuButton.contains(event.target) && openMenu) {
    openMenu.classList.remove('show'); // 메뉴 닫기
  }
});

//------------------------------------------------------------------------------------
// 모달 요소 가져오기
const modal = document.getElementById("bookmarkpopup");
const closeButton = document.querySelector(".bookmark-close-btn");

// 모달 열기 함수
function openPopup(event) {
  event.stopPropagation(); // 클릭 이벤트 전파 방지
  modal.style.display = "flex"; // flex로 설정해서 화면 중앙 정렬
}

// 모달 닫기 함수
function closeModal() {
  modal.style.display = "none";
}

// 닫기 버튼 클릭 시 모달 닫기
closeButton.addEventListener("click", closeModal);

// 모달 바깥 영역 클릭 시 닫기
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// 북마크 데이터를 담을 배열
const bookmarks = [
  { name: "로그인 페이지 제작 도움", date: "2025년 3월 19일" },
  { name: "최겨울 등장!", date: "2025년 3월 11일" }
];

// 북마크 리스트를 생성하는 함수
function renderBookmarks() {
  const bookmarkList = document.getElementById("bookmarkList");
  bookmarkList.innerHTML = ""; // 기존 목록 초기화

  bookmarks.forEach((bookmark, index) => {
    const row = document.createElement("tr"); // 새로운 행 생성

    // 이름 열 (클릭하면 해당 북마크 열도록 설정 가능)
    const nameCell = document.createElement("td");
    nameCell.textContent = bookmark.name;
    nameCell.style.cursor = "pointer";
    nameCell.addEventListener("click", () => {
      alert(`"${bookmark.name}"을(를) 클릭했습니다!`);
    });

    // 생성 일자 열
    const dateCell = document.createElement("td");
    dateCell.textContent = bookmark.date;

    // 삭제 버튼 열
    const deleteCell = document.createElement("td");
    deleteCell.style.textAlign = "center";
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome 아이콘으로 변경
    deleteButton.style.border = "none";
    deleteButton.style.background = "none";
    deleteButton.style.cursor = "pointer";
    deleteButton.addEventListener("click", () => removeBookmark(index)); // 삭제 기능 연결

    deleteCell.appendChild(deleteButton);

    // 행에 추가
    row.appendChild(nameCell);
    row.appendChild(dateCell);
    row.appendChild(deleteCell);
    bookmarkList.appendChild(row);
  });
}

// 북마크 삭제 함수
function removeBookmark(index) {
  bookmarks.splice(index, 1); // 배열에서 해당 북마크 삭제
  renderBookmarks(); // 다시 그리기
}

// 모달을 열 때 북마크 리스트도 렌더링
function openPopup(event) {
  event.stopPropagation(); // 클릭 이벤트 전파 방지
  modal.style.display = "flex";
  renderBookmarks(); // 최신 북마크 리스트 표시
}

// 모달 닫기 함수
function closeModal() {
  modal.style.display = "none";
}

// 페이지 로드 시 북마크 목록 렌더링 (초기 데이터 표시)
document.addEventListener("DOMContentLoaded", renderBookmarks);


