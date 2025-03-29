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

document.addEventListener("click", function (event) {
  const alramContainer = document.getElementById("alramContainer");
  const alramButton = document.querySelector(".alram-icon");

  // 클릭한 대상이 알람 버튼이나 알람창 내부가 아니면 닫기
  if (
    alramContainer.style.display === "block" &&
    !alramContainer.contains(event.target) &&
    !alramButton.contains(event.target)
  ) {
    alramContainer.style.display = "none";
  }
});

//------------------------------------------------------------------------------------
// 북마크 팝업 요소
const bookmarkPopup = document.getElementById("bookmarkpopup");

// 북마크 데이터 배열
const bookmarks = [
  { name: "로그인 페이지 제작 도움", date: "2025년 3월 19일" },
  { name: "최겨울 등장!", date: "2025년 3월 11일" }
];

// 북마크 토글 함수 (열기/닫기)
function toggleBookmark(event) {
  event.stopPropagation();

  // 알람창이 열려있으면 닫기
  const alramContainer = document.getElementById('alramContainer');
  if (alramContainer?.style.display === 'block') {
    alramContainer.style.display = 'none';
  }

  // 북마크 팝업 토글
  if (bookmarkPopup.style.display === "flex") {
    bookmarkPopup.style.display = "none";
  } else {
    bookmarkPopup.style.display = "flex";
    renderBookmarks();
  }
}

// 북마크 리스트 렌더링 함수 (수정된 부분 포함!)
function renderBookmarks() {
  const bookmarkList = document.getElementById("bookmarkList");
  bookmarkList.innerHTML = "";

  if (bookmarks.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.classList.add("bookmark-empty");
    emptyMessage.textContent = "북마크를 추가해주세요!";
    bookmarkList.appendChild(emptyMessage);
    return;
  }

  bookmarks.forEach((bookmark, index) => {
    const item = document.createElement("div");
    item.classList.add("bookmark-item");

    const content = document.createElement("div");
    content.classList.add("bookmark-content");

    const title = document.createElement("div");
    title.classList.add("bookmark-title");
    title.innerHTML = `<i class="fa-solid fa-comment"></i> ${bookmark.name}`;

    const date = document.createElement("div");
    date.classList.add("bookmark-date");
    date.textContent = bookmark.date;

    content.appendChild(title);
    content.appendChild(date);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("bookmark-delete-btn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteBtn.onclick = (event) => {
      event.stopPropagation(); // 🔥 팝업 닫힘 방지!!!
      removeBookmark(index);
    };

    item.appendChild(content);
    item.appendChild(deleteBtn);
    bookmarkList.appendChild(item);
  });
}

// 북마크 삭제 함수
function removeBookmark(index) {
  bookmarks.splice(index, 1);
  renderBookmarks();
}

// 외부 클릭 시 북마크 팝업 닫기
document.addEventListener("click", function (event) {
  const bookmarkBtn = document.querySelector(".bookmark-icon");

  if (
    bookmarkPopup.style.display === "flex" &&
    !bookmarkPopup.contains(event.target) &&
    !bookmarkBtn.contains(event.target)
  ) {
    bookmarkPopup.style.display = "none";
  }
});

// 페이지 로드 시 초기 렌더링
document.addEventListener("DOMContentLoaded", renderBookmarks);
