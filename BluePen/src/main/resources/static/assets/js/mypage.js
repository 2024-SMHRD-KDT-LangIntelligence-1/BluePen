document.addEventListener("DOMContentLoaded", function () {
  // DOM 요소 선택
  const submitBtn = document.getElementById("mypage-submit-btn");
  const modal = document.getElementById("mypage-modal");
  const modalYesBtn = document.getElementById("modal-yes-btn");
  const modalNoBtn = document.getElementById("modal-no-btn");

  // 모달을 처음에 숨김
  modal.style.display = "none";
  
  // 성별 버튼
  const genderBtns = document.querySelectorAll(".gender-btn");

  // 비밀번호 입력 필드
  const passwordField = document.getElementById("mypage-password");
  const confirmPasswordField = document.getElementById("mypage-confirm-password");
  const passwordError = document.getElementById("error-message");
  const confirmPasswordError = document.getElementById("confirm-error-message");

  // 정규식: 비밀번호 (8~16자, 소문자+숫자+특수문자 포함)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

  // 비밀번호 유효성 검사 함수
  function validatePassword() {
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;
    let isValid = true;

    // 비밀번호 조건 검사
    if (!passwordRegex.test(password)) {
      passwordError.textContent = "8~16자 영문 소문자, 숫자, 특수문자를 사용해주세요.";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }

    // 비밀번호 확인 검사
    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordError.textContent = "비밀번호가 일치하지 않습니다.";
      isValid = false;
    } else {
      confirmPasswordError.textContent = "";
    }

    return isValid;
  }

  // 성별 버튼 선택 함수
  function selectGender(gender) {
    genderBtns.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("data-gender") === gender) {
        btn.classList.add("active");
      }
    });
  }

  // 성별 버튼 클릭 시 선택 처리
  genderBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const gender = this.getAttribute("data-gender");
      selectGender(gender);
    });
  });

  // 비밀번호 입력 시 유효성 검사
  passwordField.addEventListener("input", function () {
    validatePassword();
  });

  // 비밀번호 확인 입력 시 유효성 검사
  confirmPasswordField.addEventListener("input", function () {
    validatePassword();
  });

  // 제출 버튼 클릭 시 모달 표시
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault(); // 폼 제출 방지
    if (!validatePassword()) {
      return; // 비밀번호 유효성 검사가 실패하면 폼 제출을 막음
    }
    modal.style.display = "flex"; // 모달 열기
  });

  // "예" 버튼 클릭 시 저장 작업 후 모달 닫고 실제로 form 제출
  modalYesBtn.addEventListener("click", function () {
      modal.style.display = "none";
	  // ✅ fetch 끝난 뒤 submit 실행되도록 비동기 처리
	     saveZeroPartyData().then(() => {
	         document.getElementById("mypage-form").submit(); // 🔥 fetch 완료 후 submit!
	     });
  });

  // "아니오" 버튼 클릭 시 모달 닫기
  modalNoBtn.addEventListener("click", function () {
    modal.style.display = "none"; // 모달 닫기
  });

  // 모달 바깥 부분 클릭 시 모달 닫기
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none"; // 모달 닫기
    }
  });
});

// 성별 버튼 클릭 처리
const genderButtons = document.querySelectorAll(".gender-btn");
const genderHiddenInput = document.getElementById("user_gender_hidden");

genderButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    genderButtons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    const selectedGender = this.dataset.gender;
    genderHiddenInput.value = selectedGender;
  });
});
//제로파티 따로 연동하기 위한 코드
async function saveZeroPartyData() {
    const formData = new FormData();
    formData.append("salary_top", document.getElementById("salary_top").value);
    formData.append("salary_bottom", document.getElementById("salary_bottom").value);
    formData.append("welfare", document.getElementById("welfare").value);
    formData.append("working_condition", document.getElementById("working_condition").value);

    await fetch("/mypage/saveOnlySalary", {
      method: "POST",
      body: formData
    });
  }





