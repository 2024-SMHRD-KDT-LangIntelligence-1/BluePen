document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");

    // 사이드바가 존재하면 기본적으로 닫힌 상태로 설정
    if (sidebar) {
        sidebar.classList.add("closed"); // 'closed' 클래스를 추가하여 닫힌 상태로 설정
    }
});

// 현재 연도 가져오기
const currentYear = new Date().getFullYear();

// 입력 필드 가져오기
const fields = {
    password: document.getElementById("mypage-password"),
    confirmPassword: document.getElementById("mypage-confirm-password"),
    year: document.getElementById("mypage-year"),
    month: document.getElementById("mypage-month"),
    day: document.getElementById("mypage-day"),
    submitBtn: document.getElementById("mypage-submit-btn"),
};

// 오류 메시지 필드
const errorMessages = {
    password: document.getElementById("error-message"),
    confirmPassword: document.getElementById("confirm-error-message"),
};

// 정규식: 비밀번호 (8~16자, 소문자+숫자+특수문자 포함)
const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

// [1] 비밀번호 유효성 검사 함수
function validatePassword() {
    const password = fields.password.value;
    const confirmPassword = fields.confirmPassword.value;
    let isValid = true;

    // 비밀번호 조건 검사
    if (!passwordRegex.test(password)) {
        errorMessages.password.textContent = "8~16자 영문 소문자, 숫자, 특수문자를 사용해주세요.";
        isValid = false;
    } else {
        errorMessages.password.textContent = "";
    }

    // 비밀번호 확인 검사
    if (confirmPassword && password !== confirmPassword) {
        errorMessages.confirmPassword.textContent = "비밀번호가 일치하지 않습니다.";
        isValid = false;
    } else {
        errorMessages.confirmPassword.textContent = "";
    }

    return isValid;
}

// [2] 생년월일 유효성 검사 함수
function validateDate(event) {
    const year = fields.year.value;
    const month = fields.month.value;
    const day = fields.day.value;
    let isValid = true;

    // 연도 검사 (1900 ~ 현재 연도)
    if (!/^\d{4}$/.test(year) || year < 1900 || year > currentYear) {
        isValid = false;
    } else {
        // 연도가 유효하면 월 입력 필드로 자동 이동
        if (isValid) {
            fields.month.focus();
        }
    }

    // 월 검사 (01 ~ 12)
    if (isValid && (!/^\d{1,2}$/.test(month) || month < 1 || month > 12)) {
        isValid = false;
    } else {
        // 월이 유효하면 일 입력 필드로 자동 이동
        if (isValid) {
            fields.day.focus();
        }
    }

    // 일 검사 (1~해당 월의 최대 일자)
    if (isValid && (!/^\d{1,2}$/.test(day) || day < 1 || day > getDaysInMonth(year, month))) {
        isValid = false;
    }

    return isValid;
}


// [3] 엔터키 입력 시 다음 필드로 이동
function moveToNextInput(event) {
    if (event.key !== "Enter") return;

    let isValid = true;
    if (event.target === fields.password || event.target === fields.confirmPassword) {
        isValid = validatePassword();
    } else if (event.target === fields.year || event.target === fields.month || event.target === fields.day) {
        isValid = validateDate();
    }

    if (!isValid) {
        event.preventDefault(); // 유효하지 않으면 엔터키 동작 막기
        return;
    }

    // 다음 필드로 이동
    const fieldOrder = ["password", "confirmPassword", "year", "month", "day", "submitBtn"];
    const currentIndex = fieldOrder.findIndex(id => fields[id] === event.target);

    if (currentIndex !== -1 && currentIndex < fieldOrder.length - 1) {
        fields[fieldOrder[currentIndex + 1]].focus();
    }
}

// [4] 해당 월의 최대 일 수 반환 (윤년 고려)
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// [5] 성별 버튼 선택 함수
function selectGender(gender) {
    const maleBtn = document.getElementById('mypage-male-btn');
    const femaleBtn = document.getElementById('mypage-female-btn');

    maleBtn.classList.remove('active');
    femaleBtn.classList.remove('active');

    if (gender === 'male') {
        maleBtn.classList.add('active');
    } else {
        femaleBtn.classList.add('active');
    }
}

// [6] 이벤트 리스너 등록
Object.values(fields).forEach(field => {
    if (!field) return;
    field.addEventListener("input", (event) => {
        if (event.target === fields.password || event.target === fields.confirmPassword) {
            validatePassword();
        } else if (event.target === fields.year || event.target === fields.month || event.target === fields.day) {
            validateDate();
        }
    });
    field.addEventListener("keydown", moveToNextInput);
});


document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("mypage-submit-btn");
    const modal = document.getElementById("mypage-modal");
    const modalYesBtn = document.getElementById("modal-yes-btn");
    const modalNoBtn = document.getElementById("modal-no-btn");

    // 수정완료 버튼 클릭 시 모달 표시
    submitBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // "예" 버튼 클릭 시 저장 실행 (현재는 콘솔 출력)
    modalYesBtn.addEventListener("click", function () {
        console.log("저장 완료!"); // 실제 저장 로직 추가 가능
        modal.style.display = "none";
    });

    // "아니오" 버튼 클릭 시 모달 닫기
    modalNoBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // 모달 바깥 클릭 시 닫기
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

