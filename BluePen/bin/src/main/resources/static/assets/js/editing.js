/*document.addEventListener("DOMContentLoaded", function() {
	const sidebar = document.getElementById("sidebar");
	const toggleBtn = document.getElementById("side-toggle-btn");
	const icon = toggleBtn.querySelector("i");

	if (!sidebar || !toggleBtn || !icon) {
		console.error("필요한 DOM 요소들이 존재하지 않습니다.");
		return;
	}

	toggleBtn.addEventListener("click", () => {
		console.log("Toggle button clicked!"); // 버튼 클릭 시 로그 찍기
		sidebar.classList.toggle("closed");
		sidebar.classList.toggle("opened");
		icon.classList.toggle("fa-angle-right");
		icon.classList.toggle("fa-angle-left");
	});

	// 사이드바를 기본적으로 닫힌 상태로 설정
	sidebar.classList.add("closed");
	sidebar.classList.remove("opened");

	// 아이콘을 닫힌 상태에 맞게 설정 ('>' 아이콘)
	icon.classList.replace("fa-angle-left", "fa-angle-right");

	// 사이드바 토글 버튼 클릭 이벤트
	toggleBtn.addEventListener("click", () => {
		sidebar.classList.toggle("closed");
		sidebar.classList.toggle("opened");
		icon.classList.toggle("fa-angle-right");
		icon.classList.toggle("fa-angle-left");
	});
});
*/
document.addEventListener("DOMContentLoaded", function() {
	const fileInput = document.getElementById("resumeFile");
	const fileNameSpan = document.getElementById("file-name");
	const uploadBtn = document.getElementById("upload-btn");
	const dragDropZone = document.getElementById("drag-drop-zone");

	// 클릭 시 파일 선택
	dragDropZone.addEventListener("click", function() {
		fileInput.click(); // 파일 선택 창 열기
	});

	// 드래그 앤 드롭 이벤트 처리
	dragDropZone.addEventListener("dragover", function(event) {
		event.preventDefault(); // 기본 동작 방지
		dragDropZone.classList.add("drag-over"); // 드래그 오버 상태 스타일 추가
	});

	dragDropZone.addEventListener("dragleave", function() {
		dragDropZone.classList.remove("drag-over"); // 드래그 오버 상태 스타일 제거
	});

	dragDropZone.addEventListener("drop", function(event) {
		event.preventDefault();
		dragDropZone.classList.remove("drag-over"); // 드래그 오버 상태 스타일 제거
		const file = event.dataTransfer.files[0]; // 드래그한 파일

		if (file) {
			handleFileSelection(file);
		}
	})
})

/*  // 파일 선택 후 처리
  fileInput.addEventListener("change", function(event) {
	  const file = event.target.files[0];
	  if (file) {
		  handleFileSelection(file);
	  }
  });
	
  // 파일 처리 함수
  function handleFileSelection(file) {
	  if (file.size > 50 * 1024 * 1024) {
		  alert("파일 크기가 50MB를 초과하였습니다.");
		  fileInput.value = ""; // 파일 입력 초기화
		  fileNameSpan.textContent = "PDF 파일을 선택해주세요 (최대 50MB)";
		  uploadBtn.disabled = true; // 버튼 비활성화
	  } else {
		  fileNameSpan.textContent = file.name; // 파일명 표시
		  uploadBtn.disabled = false; // 버튼 활성화
	  }
  }
});*/

//PDF 파일 업로드 처리
document.getElementById("resumeFile").addEventListener("change", function(event) {
	let file = event.target.files[0];
	let fileNameSpan = document.getElementById("file-name");
	let uploadBtn = document.getElementById("upload-btn");

	if (file) {
		if (file.size > 50 * 1024 * 1024) {
			alert("파일 크기가 50MB를 초과하였습니다.");
			event.target.value = "";
			fileNameSpan.textContent = "파일을 선택해주세요 (최대 50MB)";
			uploadBtn.disabled = true; // 버튼 비활성화
			return; // 파일이 크면 여기서 종료
		}

		fileNameSpan.textContent = file.name;
		uploadBtn.disabled = false; // 버튼 활성화

		// 파일 업로드 처리
		const formData = new FormData();
		formData.append("resumeFile", file);

		fetch("http://localhost:8085/upload", {
			method: "POST",
			body: formData
		})
			.then(response => response.text())
			.then(data => {
				alert(data); // 업로드 성공 메시지 출력
			})
			.catch(error => {
				console.error("파일 업로드 실패:", error);
				alert("파일 업로드 중 오류가 발생했습니다.");
			});
	}
});


// ---------------------- 충돌 (처리 필요)
  /*document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const welcomeMessage = document.querySelector(".welcome-message");
    const uploadBtn = document.getElementById("upload-btn");
    const resumeContainer = document.querySelector(".resume-container");
	const wrapper = document.querySelector(".wrapper"); // ← 추가

    // ✅ 업로드 버튼 누르면 이력서 업로드 영역 숨김
    uploadBtn.addEventListener("click", function (e) {
      e.preventDefault(); // 폼 전송 방지
      resumeContainer.classList.add("hidden");
	  wrapper.classList.remove("hidden"); // ← 이 줄 추가!
    });

    // ✅ 대화 처리
    function handleUserInput() {
      const text = userInput.value.trim();
      if (text === "") return;

      // 대화 시작 시 welcomeMessage 숨김
      if (welcomeMessage && !welcomeMessage.classList.contains("hidden")) {
        welcomeMessage.classList.add("hidden");
      }

      const messageSet = document.createElement("div");
      messageSet.classList.add("message-set");

      const userMsg = document.createElement("div");
      userMsg.classList.add("chat-message", "user-message");
      userMsg.innerText = text;
      messageSet.appendChild(userMsg);

      chatBox.appendChild(messageSet);
      userInput.value = "";

      messageSet.scrollIntoView({ behavior: "smooth", block: "end" });

      setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.classList.add("chat-message", "bot-message");
        botMsg.innerText = "AI 응답 예시: 질문을 이해했습니다!";
        messageSet.appendChild(botMsg);
        messageSet.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 1000);
    }

    userInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        handleUserInput();
      }
    });

    userInput.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  });*/

