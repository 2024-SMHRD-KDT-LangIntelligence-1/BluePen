/*document.getElementById('login-btn').addEventListener('click', function(event) {
    event.preventDefault(); // 기본 동작(링크 이동)을 막음

    // 입력값 가져오기
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    // 에러 메시지 초기화
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // 필수 입력값 체크
    if (!username || !password) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = '아이디와 비밀번호를 모두 입력하세요.';
        return;
    }

    // 서버로 로그인 요청 보내기 (예시: Fetch API 사용)
    fetch('/login.do', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_id=${username}&user_pw=${password}`,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // 로그인 성공, 리다이렉트 또는 다른 처리
            window.location.href = '/dashboard'; // 예시: 대시보드 페이지로 리다이렉트
        } else {
            // 로그인 실패 (비밀번호 틀림 등)
            errorMessage.style.display = 'block';
            errorMessage.textContent = '아이디 또는 비밀번호가 잘못되었습니다.';
        }
    })
    .catch(error => {
        console.error('로그인 요청 중 오류 발생:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = '서버 오류로 나중에 다시 시도해주세요.';
    });
});*/
