document.addEventListener("DOMContentLoaded", function() {
	const sidebar = document.getElementById("sidebar");
	const userInput = document.getElementById("user-input");
	const chatBox = document.getElementById("chat-box");
	const chatContainer = document.querySelector(".chat-interface");
	const welcomeMessage = document.querySelector(".welcome-message");
	const botResponseElement = document.getElementById("bot-response");
	const userQuestionElement = document.getElementById("user-question");

	// 사이드바 초기 닫기
	if (sidebar) {
		sidebar.classList.add("closed");
		sidebar.classList.remove("opened");
	}

	// 서버에서 받은 질문 출력
	/*if (userQuestionElement) {
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
	}*/

	// 서버에서 받은 응답 출력
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

	// 채팅 메시지가 있으면 웰컴 메시지 숨김
	if (chatBox && chatBox.children.length > 0) {
		if (welcomeMessage && !chatContainer.classList.contains("active")) {
			welcomeMessage.classList.add("hidden");
			chatContainer.classList.add("active");
		}
	}

/*	// ✅ 웰컴 메시지는 입력 시작하면 숨긴다!
	if (userInput && welcomeMessage) {
		userInput.addEventListener("input", () => {
			if (!welcomeMessage.classList.contains("hidden")) {
				welcomeMessage.classList.add("hidden");
			}
		});
	}*/
});



/*//----------------------------------------------------------------------
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
*/