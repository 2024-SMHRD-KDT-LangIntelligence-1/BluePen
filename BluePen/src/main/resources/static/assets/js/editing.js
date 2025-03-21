// PDF 파일 업로드 처리
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
    }
});