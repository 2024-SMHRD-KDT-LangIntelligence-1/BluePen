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

  });
});

function handleEnterKey(event) {
        if (event.key === "Enter") {
            document.querySelector('form').submit();
            return false; // Enter 키가 제출 외의 기본 동작을 수행하지 않도록 방지
        }
    }

    document.getElementById('text').addEventListener("keypress", handleEnterKey);

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

document.getElementById('user-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    // 메시지 입력 후 위로 이동
    document.querySelector('.input-container').style.bottom = '60px';
    
    // 입력된 메시지 처리 부분 (필요시 여기에 메시지 추가하는 코드 작성)
    const userInput = event.target.value;
    // 예: 메시지를 chat-box에 추가하는 코드
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'user-message');
    messageElement.textContent = userInput;
    document.getElementById('chat-box').appendChild(messageElement);
    
    // 메시지 입력 후 input 필드 비우기
    event.target.value = '';
    
    // 입력 후 채팅창 스크롤을 맨 아래로 이동 (기본적으로 새 메시지가 아래로 추가되게)
    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}); 



