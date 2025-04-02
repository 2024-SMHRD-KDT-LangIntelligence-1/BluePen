document.addEventListener("DOMContentLoaded", function () {
   const userInput = document.getElementById("user-input");
   const chatBox = document.getElementById("chat-box");
   const chatContainer = document.querySelector(".chat-interface");
   const welcomeMessage = document.querySelector(".welcome-message");
   const botResponseElement = document.getElementById("bot-response");

   // ✅ 서버에서 받은 응답(answer)이 있다면 자동 추가
   if (botResponseElement) {
      const botMessageText = botResponseElement.getAttribute("data-answer").trim();
      
      if (botMessageText !== "") {
         const messageSet = document.createElement("div");
         messageSet.classList.add("message-set");

         // ✅ 기존에 answer 값이 있으면 메시지 추가
         const botMsg = document.createElement("div");
         botMsg.classList.add("chat-message", "bot-message");
         botMsg.innerText = botMessageText;

         messageSet.appendChild(botMsg);
         chatBox.appendChild(messageSet);

         // ✅ 채팅창이 활성화되지 않았다면 활성화
         if (welcomeMessage && !chatContainer.classList.contains("active")) {
            welcomeMessage.classList.add("hidden");
            chatContainer.classList.add("active");
         }

         // ✅ 채팅이 추가되면 자동 스크롤
         messageSet.scrollIntoView({ behavior: "smooth", block: "end" });
      }
   }

   // ✅ 사용자 입력 처리
   function handleUserInput() {
      const text = userInput.value.trim();
      if (text === "") return;

      // ✅ 대화 시작되면 환영 메시지 숨기기 + active 클래스 추가
      if (welcomeMessage && !chatContainer.classList.contains("active")) {
         welcomeMessage.classList.add("hidden");
         chatContainer.classList.add("active");
      }

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

   // ✅ 엔터 키 입력 감지
   userInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
         event.preventDefault(); // 기본 폼 제출 방지
         handleUserInput();
         document.querySelector("form").submit();
      }
   });

   // ✅ 자동 리사이즈 (textarea 늘어나게)
   userInput.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
   });
});
