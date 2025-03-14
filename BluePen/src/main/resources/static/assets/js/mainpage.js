document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.querySelector("#sidebar-toggle");
  const icon = toggleBtn.querySelector("i");
  const chatContainer = document.querySelector(".chat-container");

  // 기본적으로 열린 상태
  sidebar.classList.add("opened");
  icon.classList.add("fa-angle-left"); // 열린 상태 아이콘

  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("closed");
    sidebar.classList.toggle("opened");

    // 아이콘 변경
    if (sidebar.classList.contains("closed")) {
      icon.classList.remove("fa-angle-left");
      icon.classList.add("fa-angle-right"); // 닫힌 상태면 >
    } else {
      icon.classList.remove("fa-angle-right");
      icon.classList.add("fa-angle-left"); // 열린 상태면 <
    }

    // 대화 프롬프트 위치 조정
    if (sidebar.classList.contains("opened")) {
      chatContainer.style.marginLeft = "250px"; // 사이드바 너비만큼 이동
    } else {
      chatContainer.style.marginLeft = "0"; // 원래 위치로 복귀
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let userInput = document.getElementById("user-input");

  userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let userInputValue = this.value.trim();
      if (userInputValue === "") {
        return;
      }

      // h2 숨기기
      document.querySelector(".chat-container h2").style.display = "none";

      // 사용자 메시지 추가
      addMessage(userInputValue, "user");

      // 챗봇 응답 추가
      let botResponse = getBotResponse(userInputValue);
      addMessage(botResponse, "bot");

      // 입력창 초기화
      this.value = "";
    }
  });
});

// 메시지 추가 함수
function addMessage(message, sender) {
  const chatBox = document.getElementById("chat-box");

  // 대화 시작 시 chat-box 표시
  chatBox.style.display = "block";

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message", sender + "-message");

  // 사용자와 봇을 구분하여 p 태그 스타일 다르게 적용
  const pTag = document.createElement("p");
  pTag.textContent = message;

  // 사용자 메시지와 봇 메시지 구분
  if (sender === "user") {
    pTag.classList.add("user-message-p");
  } else {
    pTag.classList.add("bot-message-p");
  }

  messageDiv.appendChild(pTag);
  chatBox.appendChild(messageDiv);

  // 스크롤을 자동으로 맨 아래로 이동
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 챗봇 응답 함수 (간단한 예제)
function getBotResponse(input) {
  if (input.includes("하이")) {
    return "좋은 하루예요! 오늘 서류 제출 일정 확인하셨나요?";
  } else if (input.includes("면접일정")) {
    return "스마트인재개발원 면접은 4월 9일, 합격발표는 4월 10일입니다.";
  } else {
    return "죄송합니다, 이해하지 못했어요. 다시 시도해 주세요.";
  }
}
