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

      chatBox.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" });
   }
});
