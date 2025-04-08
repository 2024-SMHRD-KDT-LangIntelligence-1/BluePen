document.addEventListener("DOMContentLoaded", function () {
   const userInput = document.getElementById("user-input");
   const chatBox = document.getElementById("chat-box");
   const chatContainer = document.querySelector(".chat-interface");
   const welcomeMessage = document.querySelector(".welcome-message");
   const botResponseElement = document.getElementById("bot-response");

   // ✅ 서버에서 받은 질문(question)이 있다면 출력
   const userQuestionElement = document.getElementById("user-question");
   if (userQuestionElement) {
      const userQuestionText = userQuestionElement.getAttribute("data-question").trim();

      if (userQuestionText !== "") {
         const messageSet = document.createElement("div");
         messageSet.classList.add("message-set");

         const userMsg = document.createElement("div");
         userMsg.classList.add("chat-message", "user-message");
         userMsg.innerText = userQuestionText;

         messageSet.appendChild(userMsg);
         chatBox.appendChild(messageSet);
      }
   }

   // ✅ 서버에서 받은 응답(answer)이 있다면 출력
   if (botResponseElement) {
      const botMessageText = botResponseElement.getAttribute("data-answer").trim();

      if (botMessageText !== "") {
         const messageSet = document.createElement("div");
         messageSet.classList.add("message-set");

         const botMsg = document.createElement("div");
         botMsg.classList.add("chat-message", "bot-message");
         botMsg.innerText = botMessageText;

         messageSet.appendChild(botMsg);
         chatBox.appendChild(messageSet);
      }
   }

   // ✅ 메시지가 하나라도 있으면 채팅 인터페이스 활성화
   if (chatBox.children.length > 0) {
      if (welcomeMessage && !chatContainer.classList.contains("active")) {
         welcomeMessage.classList.add("hidden");
         chatContainer.classList.add("active");
      }

//----------------------------------------------------------------------
      // ✅ 사용자 메시지 생성
      const messageSet = document.createElement("div");
      messageSet.classList.add("message-set");

      const userMsg = document.createElement("div");
      userMsg.classList.add("chat-message", "user-message");
      userMsg.innerText = text;
      messageSet.appendChild(userMsg);

      chatBox.appendChild(messageSet);
      userInput.value = ""; // 입력 필드 초기화

      // ✅ 자동 스크롤
      messageSet.scrollIntoView({ behavior: "smooth", block: "end" });

      // ✅ AI 응답 추가
      setTimeout(() => {
         const botMsg = document.createElement("div");
         botMsg.classList.add("chat-message", "bot-message");
         botMsg.innerHTML = botMessageText; // ✅ 여기를 수정!!!

         messageSet.appendChild(botMsg);
         chatBox.scrollTop = chatBox.scrollHeight; // ✅ 여기도 스크롤 추가
      }, 500);
   }
});

document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("user-input");
  const sideList = document.getElementById("side-task-list1");


  userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const value = userInput.value.trim();
      if (value === "") return;

      const li = document.createElement("li");

      const textSpan = document.createElement("span");
      textSpan.textContent = value.length > 14 ? value.substring(0, 14) : value;

      const delBtn = document.createElement("button");
      delBtn.textContent = "✖";
      delBtn.className = "delete-btn";
	  delBtn.onclick = function () {
	    const confirmDelete = confirm("삭제하시겠습니까?");
	    if (confirmDelete) {
	      li.remove(); // 확인 누르면 삭제!!
	    }
	  };

      li.appendChild(textSpan);
      li.appendChild(delBtn);

      sideList.prepend(li);
      userInput.value = "";
    }
  });
});
