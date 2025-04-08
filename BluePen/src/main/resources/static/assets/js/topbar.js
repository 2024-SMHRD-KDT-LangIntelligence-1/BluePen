document.getElementById("new-chat-btn").addEventListener("click", async function () {
  try {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

    if (chatHistory.length > 0) {
      const response = await fetch("/api/chat/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatHistory),
      });

      if (!response.ok) {
        throw new Error("서버에 대화 저장 실패했슴다!!!!");
      }

      console.log("대화 저장 성공했슴다!!!!");
    }

    localStorage.removeItem("chatHistory"); // 기존 대화 제거
    window.location.href = "/mainpage"; // 페이지 새로고침

  } catch (err) {
    console.error("새채팅 처리 중 에러 발생!!!!", err);
    alert("새 채팅 초기화 중 문제가 발생했습니다!!!!");
  }
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------
// 알람 토글 함수
function renderAlrams() {
  const alramPopup = document.getElementById("alramPopup");
  alramPopup.innerHTML = ""; // 초기화

  const alarms = [
    {
      title: "취업 일정 알림",
      time: "D-3",
      body: "삼성전자 면접이 3일 남았습니다. 준비하세요!"
    },
    {
      title: "취업 일정 알림",
      time: "D-5",
      body: "네이버 서류 마감이 5일 남았습니다."
    },
    {
      title: "취업 일정 알림",
      time: "D-7",
      body: "LG CNS 코딩 테스트가 7일 후 예정입니다."
    },
  ];

  alarms.forEach(alarm => {
    const alramItem = document.createElement("div");
    alramItem.className = "alram-item";

    alramItem.innerHTML = `
      <div class="alram-title">${alarm.title}</div>
      <div class="alram-time">${alarm.time}</div>
      <div class="alram-body">${alarm.body}</div>
    `;

    alramPopup.appendChild(alramItem);
  });
}

function toggleAlram() {
  const alramContainer = document.getElementById("alramContainer");
  if (alramContainer.style.display === "block") {
    alramContainer.style.display = "none";
  } else {
    alramContainer.style.display = "block";
    renderAlrams(); // 알람 표시
  }
}

// 알람 데이터
const alarmData = {
  title: "자격증접수일정",
  time: "어제 오후 09:12",
  body: "내일은 정보처리기사 실기 접수일입니다!",
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

// ✅ 전역 공유 가능하게 빈 배열 선언
window.bookmarks = [];

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

document.addEventListener("DOMContentLoaded", () => {
  window.bookmarks = window.bookmarks || []; // 사이드바에서 쓸 수 있게 공유!
  window.renderBookmarks = renderBookmarks;  // 렌더 함수도 공유!
  renderBookmarks(); // 초기 렌더링
});

function toggleBookmarkPopup() {
  const popup = document.getElementById("bookmarkPopup");
  popup.classList.toggle("visible");
}
