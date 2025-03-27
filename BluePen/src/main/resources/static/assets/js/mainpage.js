/*document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const chatContainer = document.querySelector(".chat-container");
  const suggestions = document.querySelectorAll(".suggestion");

  // 메시지 추가 함수
  function addMessage(text, isUser = true) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", isUser ? "user-message" : "bot-message");
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // 스크롤 아래로 이동

    // 대화 시작 시 하단으로 이동
    if (!chatContainer.classList.contains("active")) {
      chatContainer.classList.add("active");
    }
  }

  // 사용자 입력 처리
  function handleUserInput() {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, true); // 사용자 메시지 추가
    userInput.value = ""; // 입력 필드 초기화

    setTimeout(() => {
      addMessage("AI 응답 예시: 질문을 이해했습니다!", false);
    }, 1000);
  }

  // 추천 검색어 클릭 시 입력창에 자동 입력
  suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", function () {
      userInput.value = this.innerText;
      userInput.focus();
    });
  });
});
*/

document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const chatContainer = document.querySelector(".chat-container");
  const suggestions = document.querySelectorAll(".suggestion");

  // 메시지 추가 함수
  function addMessage(text, isUser = true) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", isUser ? "user-message" : "bot-message");
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // 스크롤 아래로 이동

    // chatContainer가 있을 경우에만 active 추가
    if (chatContainer && !chatContainer.classList.contains("active")) {
      chatContainer.classList.add("active");
    }
  }

  // 사용자 입력 처리
  function handleUserInput() {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, true); // 사용자 메시지 추가
    userInput.value = ""; // 입력 필드 초기화

    setTimeout(() => {
      addMessage("AI 응답 예시: 질문을 이해했습니다!", false);
    }, 1000);
  }

  // 엔터 키 입력 감지
  userInput.addEventListener("submit", function (event) {
    if (event.key === "Enter") {
      handleUserInput();
    }
  });

});

document.addEventListener("DOMContentLoaded", function () {
      const botMessage = document.getElementById("bot-response");
      const gptResponse = botMessage.getAttribute("data-answer"); // 서버에서 받은 답변

      if (gptResponse && gptResponse.trim() !== "") {
          addMessage(gptResponse, false); // GPT 응답을 대화창에 추가
      }
  });

//--------------------------------------------------------------------------------------
const bookmarkBtn = document.getElementById('bookmark-btn');
const bookmarkIcon = bookmarkBtn.querySelector('i');  // 버튼 내 아이콘 선택

bookmarkBtn.addEventListener('click', function() {
  saveBookmark();
});

function saveBookmark() {
  const bookmark = {
    url: window.location.href,
    title: document.title
  };

  fetch('/save-bookmark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookmark)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // 북마크 저장 성공 시 아이콘 변경
      bookmarkIcon.classList.remove('fa-regular', 'fa-bookmark');  // 기존 아이콘 클래스 제거
      bookmarkIcon.classList.add('fa-solid', 'fa-bookmark');  // 새로운 아이콘 클래스 추가
      alert('북마크가 DB에 저장되었습니다!');
    } else {
      alert('북마크 저장에 실패했습니다.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('에러가 발생했습니다.');
  });
}

