document.addEventListener("DOMContentLoaded", function () {
  const userIdInput = document.getElementById("user_id");
  const passwordInput = document.getElementById("user_pw");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const errorMessages = document.querySelectorAll(".error-message");
  const joinForm = document.querySelector("form");

  // 비밀번호 유효성 검사 정규식 (8~16자, 소문자+숫자+특수문자 포함)
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  // 유효성 검사 함수
  function validateInput(input, regex, errorMessage) {
    const errorDiv = input.nextElementSibling;
    if (!regex.test(input.value)) {
      errorDiv.textContent = errorMessage;
      return false;
    } else {
      errorDiv.textContent = "";
      return true;
    }
  }

  // 비밀번호 실시간 검사
  passwordInput.addEventListener("input", function () {
    validateInput(passwordInput, passwordRegex, "비밀번호는 8~16자, 소문자+숫자+특수문자를 포함해야 합니다.");
  });

  // 비밀번호 확인 실시간 검사
  confirmPasswordInput.addEventListener("input", function () {
    const errorDiv = confirmPasswordInput.nextElementSibling;
    if (confirmPasswordInput.value !== passwordInput.value) {
      errorDiv.textContent = "비밀번호가 일치하지 않습니다.";
    } else {
      errorDiv.textContent = "";
    }
  });

  // 엔터키로 다음 입력칸 이동 (유효성 검사 실패 시 이동 불가)
  joinForm.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 엔터키 동작 방지
      const inputs = Array.from(joinForm.querySelectorAll("input"));
      const currentIndex = inputs.indexOf(event.target);

      if (currentIndex !== -1) {
        const currentInput = inputs[currentIndex];
        const nextInput = inputs[currentIndex + 1];

        // 현재 입력값이 유효하면 다음 칸으로 이동
        if (currentInput === passwordInput) {
          if (!validateInput(passwordInput, passwordRegex, "비밀번호는 8~16자, 소문자+숫자+특수문자를 포함해야 합니다.")) {
            return;
          }
        }

        if (currentInput === confirmPasswordInput) {
          if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.nextElementSibling.textContent = "비밀번호가 일치하지 않습니다.";
            return;
          }
        }

        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  });

  // 회원가입 버튼 클릭 시 최종 검사
  joinForm.addEventListener("submit", function (event) {
    let isValid = true;

    if (!validateInput(passwordInput, passwordRegex, "비밀번호는 8~16자, 소문자+숫자+특수문자를 포함해야 합니다.")) {
      isValid = false;
    }

    if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordInput.nextElementSibling.textContent = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault(); // 폼 제출 막음
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const genderButtons = document.querySelectorAll(".gender-btn");
  const form = document.querySelector("form");
  
  // Hidden input 추가
  let genderInput = document.createElement("input");
  genderInput.type = "hidden";
  genderInput.name = "user_gender";
  form.appendChild(genderInput);

  genderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // 모든 버튼에서 활성화 클래스 제거
      genderButtons.forEach((btn) => btn.classList.remove("selected"));

      // 클릭한 버튼만 활성화
      button.classList.add("selected");

      // 선택한 성별 값을 hidden input에 저장
      genderInput.value = button.dataset.gender;
    });
  });

  // 폼 제출 시 성별 선택 확인
  form.addEventListener("submit", function (event) {
    if (!genderInput.value) {
      event.preventDefault(); // 제출 막기
      alert("성별을 선택하세요.");
    }
  });
});

