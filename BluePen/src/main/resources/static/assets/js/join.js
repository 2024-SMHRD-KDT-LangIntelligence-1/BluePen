function checkDuplicate() {
    alert("아이디 중복 확인 기능 구현 예정");
}

function register() {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const gender = document.getElementById("gender").value;
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;

    if (!userId || !password || !confirmPassword || !gender || !year || !month || !day) {
        alert("모든 필드를 입력해주세요.");
        return;
    }

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    alert("회원가입 완료!" + "\n아이디: " + userId);
}