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

  // 엔터 키 입력 감지
  userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUserInput();
    }
  });

  // 추천 검색어 클릭 시 입력창에 자동 입력
  suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", function () {
      userInput.value = this.innerText;
      userInput.focus();
    });
  });
});
