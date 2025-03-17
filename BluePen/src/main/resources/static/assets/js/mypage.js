function selectGender(gender) {
    document.getElementById('male-btn').classList.remove('active');
    document.getElementById('female-btn').classList.remove('active');
    
    if (gender === 'male') {
        document.getElementById('male-btn').classList.add('active');
    } else {
        document.getElementById('female-btn').classList.add('active');
    }
}
document.getElementById("reset-btn").addEventListener("click", function() {
    alert("제로 파티 데이터를 다시 설정하세요.");
});

document.getElementById("submit-btn").addEventListener("click", function() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;

    if (password.length < 6) {
        alert("비밀번호는 6자 이상 입력해야 합니다.");
        return;
    }
    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다. 다시 입력하세요.");
        return;
    }
    if (!year || !month || !day) {
        alert("생년월일을 올바르게 입력하세요.");
        return;
    }
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        alert("생년월일은 숫자로 입력해야 합니다.");
        return;
    }
    alert("정보가 수정되었습니다.");
});