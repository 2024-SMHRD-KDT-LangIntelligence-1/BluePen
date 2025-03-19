document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 기본 제출 이벤트 방지

    // 아이디와 비밀번호 가져오기
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 간단한 로그인 검증 (아이디와 비밀번호가 비어있는지 확인)
    if (username === "" || password === "") {
      showErrorMessage("아이디와 비밀번호를 모두 입력해주세요.");
    } else if (
      username !== "correctUsername" ||
      password !== "correctPassword"
    ) {
      showErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
    } else {
      alert("로그인 성공!");
      // 여기서 실제 로그인 처리 로직이 필요함
    }
  });

function showErrorMessage(message) {
  const errorMessageDiv = document.getElementById("error-message");
  errorMessageDiv.textContent = message;
  errorMessageDiv.style.display = "block"; // 에러 메시지 표시
}
