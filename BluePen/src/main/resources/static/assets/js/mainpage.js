document.getElementById("user-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") { // Enter 키를 눌렀을 때 실행
    let userInput = document.getElementById("user-input").value;

    if (userInput.trim() === "") {
      return; // 빈 입력 방지
    }

    // 사용자 메시지 추가
    addMessage(userInput, "user");

    // 챗봇 응답 처리
    let botResponse = getBotResponse(userInput);
    addMessage(botResponse, "bot");

    // 입력창 초기화
    document.getElementById("user-input").value = "";
  }
});

function addMessage(message, sender) {
  const chatBox = document.getElementById("chat-box");

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message");
  messageDiv.classList.add(sender + "-message");
  messageDiv.innerHTML = `<p>${message}</p>`;

  chatBox.appendChild(messageDiv);

  // 스크롤을 자동으로 맨 아래로
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
  // 간단한 응답 예시
  if (input.includes("하이")) {
    return "좋은 하루예요 민지님 오늘은 서류제출이 있는 날입니다.";
  } else if (input.includes("면접일정")) {
    return "스마트인재개발원 면접은 4월 9일, 합격발표는 4월 10일입니다.";
  } else {
    return "죄송합니다, 이해하지 못했어요. 다시 시도해 주세요.";
  }
}
