document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.add("closed");
  sidebar.classList.remove("opened");
});

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
