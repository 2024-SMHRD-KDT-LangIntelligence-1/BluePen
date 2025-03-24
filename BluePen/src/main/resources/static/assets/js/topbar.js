const data = [
    { id: 1, title: "입력창 고정 방법", date: "2025년 3월 20일" },
    { id: 2, title: "페이지네이션 추가 방법", date: "2025년 3월 19일" },
    { id: 3, title: "AI 취업 일정 관리", date: "2025년 3월 15일" },
    { id: 4, title: "5060 창업 강의 자료", date: "2025년 3월 23일" },
    { id: 5, title: "성공 창업 특성 5가지", date: "2025년 3월 22일" },
    { id: 6, title: "스타트업 경영전략 강의", date: "2025년 3월 20일" },
    { id: 7, title: "UI 구성 요소 예시", date: "2025년 3월 19일" },
    { id: 8, title: "UX 개선 방법", date: "2025년 3월 15일" },
    { id: 9, title: "GPT 활용법", date: "2025년 3월 11일" },
    { id: 2, title: "페이지네이션 추가 방법", date: "2025년 3월 12일" },
    { id: 3, title: "AI 취업 일정 관리", date: "2025년 3월 13일" },
    { id: 4, title: "5060 창업 강의 자료", date: "2025년 3월 21일" },
    { id: 5, title: "성공 창업 특성 5가지", date: "2025년 3월 17일" },
    { id: 6, title: "스타트업 경영전략 강의", date: "2025년 3월 16일" },
    { id: 7, title: "UI 구성 요소 예시", date: "2025년 3월 15일" },
    { id: 8, title: "UX 개선 방법", date: "2025년 3월 14일" },
    { id: 9, title: "GPT 활용법", date: "2025년 3월 12일" },
  ];

  function openPopup() {
    document.getElementById("popupOverlay").style.display = "flex";
    renderBookmarkList();
  }

  function closePopup() {
    document.getElementById("popupOverlay").style.display = "none";
  }

  function renderBookmarkList() {
    const tbody = document.getElementById("bookmarkList");
    tbody.innerHTML = "";

     // 🔽 생성일 내림차순 정렬
const sortedData = [...data].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB - dateA; // 최신순
});

    data.forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
         <td style="text-align: left; padding-left: 12px;">
          <a class="title-link" href="https://example.com/chat/${item.id}" target="_blank">${item.title}</a>
          </td>
          <td style="text-align: left; padding-left: 12px;">${item.date}</td>
          <td>
          <div class="action-icons">
          <span class="row-icon" title="북마크 삭제" onclick="deleteItem(${index})">🗑️</span>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }
  

  function toSlug(text) {
    return encodeURIComponent(text.trim().replace(/\s+/g, '-'));
  }


  function deleteItem(index) {
    // 얼럿 없이 바로 아이템 삭제
    data.splice(index, 1);
    renderBookmarkList();
  }