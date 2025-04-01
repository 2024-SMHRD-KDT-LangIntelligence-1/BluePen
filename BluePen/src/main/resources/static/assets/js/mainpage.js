document.addEventListener("DOMContentLoaded", function() {
   const userInput = document.getElementById("user-input");
   const chatBox = document.getElementById("chat-box");
   const chatContainer = document.querySelector(".chat-interface");
   const welcomeMessage = document.querySelector(".welcome-message");

   // 사용자 입력 처리
   function handleUserInput() {
      const text = userInput.value.trim();
      if (text === "") return;

      // 💥 대화 시작되면 환영 메시지 숨기기 + active 클래스 추가
      if (welcomeMessage && !chatContainer.classList.contains("active")) {
         welcomeMessage.classList.add("hidden");
         chatContainer.classList.add("active");
      }

      // 💥 message-set 생성
      const messageSet = document.createElement("div");
      messageSet.classList.add("message-set");

      // 사용자 메시지
      const userMsg = document.createElement("div");
      userMsg.classList.add("chat-message", "user-message");
      userMsg.innerText = text;
      messageSet.appendChild(userMsg);

      // chat-box에 붙이기
      chatBox.appendChild(messageSet);
      userInput.value = ""; // 입력 필드 초기화

      // 💥 자동 스크롤 (1차 위치)
      messageSet.scrollIntoView({ behavior: "smooth", block: "end" });

      // AI 응답 추가
      setTimeout(() => {
         const botMsg = document.createElement("div");
         botMsg.classList.add("chat-message", "bot-message");
         /*const botMessage = document.getElementById("bot-response");*/
         botMsg.innerText="IT·개발·데이터 분야에서 취업을 희망하신다면, 이미 보유하고 계신 정보처리기사 자격증은 매우 유용합니다. 추가로, 정보관리기술사 자격증을 희망하신다면, 이 자격증은 정보 관리 및 데이터 관련 업무에 필요한 전문성을 높여줄 것 입니다.";
         messageSet.appendChild(botMsg);

         // 💥 쌍 단위로 스크롤 이동
         messageSet.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 500);
   }

   // 엔터 키 입력 감지
    userInput.addEventListener("submit", function (event) {
   // 💥 엔터 키 입력 감지
//   userInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
         /*form.submit();*/
         handleUserInput();
      }
   });

   // 💥 자동 리사이즈 (textarea 늘어나게)
   userInput.addEventListener("input", function() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
   });
});
