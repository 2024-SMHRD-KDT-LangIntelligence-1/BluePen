// prompt.js

document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const suggestionsContainer = document.getElementById("suggestions");
  const suggestions = document.querySelectorAll(".suggestion");

  // 추천 검색어 클릭 시 입력창에 채워주는 기능
  suggestions.forEach(suggestion => {
    suggestion.addEventListener("click", (event) => {
      userInput.value = event.target.textContent; // 추천 검색어 값으로 입력창 채우기
      showChatMessage(event.target.textContent, "user");
      suggestionsContainer.style.display = "none"; // 추천 검색어 숨기기
    });
  });

  // 사용자가 입력을 시작하면 추천 검색어 표시
  userInput.addEventListener("input", () => {
    if (userInput.value.trim()) {
      suggestionsContainer.style.display = "block"; // 추천 검색어 보여주기
    } else {
      suggestionsContainer.style.display = "none"; // 입력값 없으면 숨기기
    }
  });

  // 사용자 메시지와 봇 메시지 출력 함수
  function showChatMessage(message, sender) {
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");
    chatMessage.textContent = message;
    chatBox.appendChild(chatMessage);

    // 자동으로 스크롤을 맨 아래로
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Enter 키로 메시지 전송 기능
  userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && userInput.value.trim() !== "") {
      showChatMessage(userInput.value, "user");
      setTimeout(() => {
        // 봇의 응답을 예시로 출력 (실제로는 API 호출 등을 할 수 있음)
        showChatMessage("자동 응답: " + userInput.value, "bot");
      }, 1000);

      userInput.value = ""; // 입력창 비우기
      suggestionsContainer.style.display = "none"; // 추천 검색어 숨기기
    }
  });
});
