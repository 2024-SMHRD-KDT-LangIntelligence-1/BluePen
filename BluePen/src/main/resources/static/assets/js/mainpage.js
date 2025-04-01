document.addEventListener("DOMContentLoaded", function () {
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
			const botMessage = document.getElementById("bot-response");
			const gptResponse = botMessage.getAttribute("data-answer"); // 서버에서 받은 GPT 응답
			console.log(botMessage);

			if (gptResponse && gptResponse.trim() !== "") {
				botMsg.innerText = gptResponse; // GPT 응답을 추가
			} else {
				botMsg.innerText = "AI 응답을 가져올 수 없습니다."; // 예외 처리
			}

			// 💥 쌍 단위로 스크롤 이동
			messageSet.scrollIntoView({ behavior: "smooth", block: "end" });
		}, 500);
	}


	// 💥 엔터 키 입력 감지
	userInput.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			form.submit();
			handleUserInput();
		}
	});

	// 💥 자동 리사이즈 (textarea 늘어나게)
	userInput.addEventListener("input", function () {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + "px";
	});

	// 💥 사이드바 토글 시 chat-interface 위치 조정만 수행!!!
	const sidebar = document.querySelector(".sidebar");
	const chatInterface = document.querySelector(".chat-interface");
	const sidebarToggleBtn = document.getElementById("side-toggle-btn"); // ← 형님이 쓰신 ID 그대로 유지!

	if (sidebarToggleBtn) {
		sidebarToggleBtn.addEventListener("click", function () {
			// 💥 기존 sidebar.js에서 toggle 처리되므로 여기선 상태만 읽어서 위치만 조정!
			setTimeout(() => {
				const isClosed = sidebar.classList.contains("closed");

				if (isClosed) {
					chatInterface.classList.remove("sidebar-open");
					chatInterface.classList.add("sidebar-closed");
				} else {
					chatInterface.classList.remove("sidebar-closed");
					chatInterface.classList.add("sidebar-open");
				}
			}, 10); // 💥 살짝 늦게 확인해야 정확하게 상태 반영됨!
		});
	}
});

/*
document.addEventListener("DOMContentLoaded", function () {
	  const botMessage = document.getElementById("bot-response");
	  const gptResponse = botMessage.getAttribute("data-answer"); // 서버에서 받은 답변

	  if (gptResponse && gptResponse.trim() !== "") {
		  addMessage(gptResponse, false); // GPT 응답을 대화창에 추가
	  }
  });*/