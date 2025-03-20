// 아이디 중복 확인 함수
function checkDuplicate() {
  const userId = document.getElementById('user_id').value;
  const errorMessage = document.getElementById('error-message');

  if (userId === "") {
    errorMessage.textContent = "아이디를 입력해 주세요.";
    return false;
  }

  // 서버와 연동하여 아이디 중복 체크하는 부분 (추후 구현 가능)
  errorMessage.textContent = "";  
  alert("아이디 중복 확인 완료");
  return true;
}

// 비밀번호 유효성 검사 정규식 (8~16자, 소문자+숫자+특수문자 포함)
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
  return passwordRegex.test(password);
}

// 비밀번호 입력 시 실시간 검증
document.getElementById("user_pw").addEventListener("input", function () {
  const password = this.value;
  const errorMessage = document.getElementById("password-error");

  if (!validatePassword(password)) {
    errorMessage.textContent = "비밀번호는 8~16자이며, 소문자+숫자+특수문자를 포함해야 합니다.";
  } else {
    errorMessage.textContent = "";
  }
});

// 비밀번호 확인 입력 시 실시간 검증
document.getElementById("confirmPassword").addEventListener("input", function () {
  const password = document.getElementById("user_pw").value;
  const confirmPassword = this.value;
  const errorMessage = document.getElementById("confirm-password-error");

  if (password !== confirmPassword) {
    errorMessage.textContent = "비밀번호가 일치하지 않습니다.";
  } else {
    errorMessage.textContent = "";
  }
});

// 회원가입 함수
function register(event) {
  event.preventDefault(); // 폼 자동 제출 방지

  const userId = document.getElementById("user_id").value;
  const userPw = document.getElementById("user_pw").value;
  const confirmPw = document.getElementById("confirmPassword").value;
  const genderButtons = document.querySelectorAll(".gender-btn");
  const errorMessage = document.getElementById("error-message");

  if (userId === "" || userPw === "" || confirmPw === "") {
    errorMessage.textContent = "모든 필드를 입력해 주세요.";
    return false;
  }

  if (!validatePassword(userPw)) {
    errorMessage.textContent = "비밀번호 조건을 충족하지 않습니다.";
    return false;
  }

  if (userPw !== confirmPw) {
    errorMessage.textContent = "비밀번호가 일치하지 않습니다.";
    return false;
  }

  let genderSelected = false;
  genderButtons.forEach((button) => {
    if (button.classList.contains("active")) {
      genderSelected = true;
    }
  });

  if (!genderSelected) {
    errorMessage.textContent = "성별을 선택해 주세요.";
    return false;
  }

  alert("회원가입 성공!");
  return true;
}

// 성별 선택 버튼 클릭 이벤트
document.querySelectorAll(".gender-btn").forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelectorAll(".gender-btn").forEach((btn) =>
      btn.classList.remove("active")
    );
    this.classList.add("active");
  });
});

// 회원가입 버튼 이벤트 리스너 추가
document.querySelector("form").addEventListener("submit", register);
