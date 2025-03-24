document.addEventListener("DOMContentLoaded", function () {
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
//------------------------------------------------------------------------------------
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
  });

  // 파일 선택 후 처리
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
});

/*//PDF 파일 업로드 처리
document.getElementById("resumeFile").addEventListener("change", function(event) {
  let file = event.target.files[0];
  let fileNameSpan = document.getElementById("file-name");
  let uploadBtn = document.getElementById("upload-btn");

  if (file) {
      if (file.size > 50 * 1024 * 1024) {
          alert("파일 크기가 50MB를 초과하였습니다.");
          event.target.value = ""; 
          fileNameSpan.textContent = "파일을 선택해주세요 (최대 50MB)";
      } else {
          fileNameSpan.textContent = file.name;
          uploadBtn.disabled = false; // 버튼 활성화
      }
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
              .catch(error => console.error("파일 업로드 실패:", error));
  }*/


document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const chatContainer = document.querySelector(".chat-container");
  const suggestions = document.querySelectorAll(".suggestion");

  // 메시지 추가 함수
  function addMessage(text, isUser = true) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", isUser ? "user-message" : "bot-message");
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // 스크롤 아래로 이동

    // 대화 시작 시 하단으로 이동
    if (!chatContainer.classList.contains("active")) {
      chatContainer.classList.add("active");
    }
  }

  // 사용자 입력 처리
  function handleUserInput() {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, true); // 사용자 메시지 추가
    userInput.value = ""; // 입력 필드 초기화

    setTimeout(() => {
      addMessage("AI 응답 예시: 질문을 이해했습니다!", false);
    }, 1000);
  }

  // 엔터 키 입력 감지
  userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUserInput();
    }
  });

  // 추천 검색어 클릭 시 입력창에 자동 입력
  suggestions.forEach((suggestion) => {
    suggestion.addEventListener("click", function () {
      userInput.value = this.innerText;
      userInput.focus();
    });
  });
});

