
function login() {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    if (!userId || !password) {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }

    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("로그인 성공!");
            window.location.href = "/dashboard";
        } else {
            alert("로그인 실패: " + data.message);
        }
    })
    .catch(error => console.error("로그인 오류:", error));
}

function findUserId() {
    const email = prompt("가입 시 등록한 이메일을 입력하세요:");
    if (!email) return;

    fetch("/find-user-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("가입된 아이디: " + data.userId);
        } else {
            alert("등록된 아이디가 없습니다.");
        }
    })
    .catch(error => console.error("아이디 찾기 오류:", error));
}

function findPassword() {
    const userId = prompt("아이디를 입력하세요:");
    if (!userId) return;

    fetch("/find-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
        } else {
            alert("해당 아이디를 찾을 수 없습니다.");
        }
    })
    .catch(error => console.error("비밀번호 찾기 오류:", error));
}
