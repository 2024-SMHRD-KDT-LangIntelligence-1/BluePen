

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const modal = document.getElementById("side-modal");
  const modalYesBtn = document.getElementById("modal-yes-btn");
  const modalNoBtn = document.getElementById("modal-no-btn");
  const trashBtn = document.getElementById("side-trash-btn");
  const selectAllContainer = document.getElementById("side-select-all-container");
  const selectAllCheckbox = document.getElementById("side-select-all");
  const bookmarkModal = document.getElementById("bookmark-modal");
  const bookmarkYesBtn = document.getElementById("bookmark-yes-btn");
  const bookmarkNoBtn = document.getElementById("bookmark-no-btn");

  const taskLists = [
    document.getElementById("side-task-list1"),
    document.getElementById("side-task-list2"),
  ];

  let checkboxesVisible = false;
  let currentTargetId = null;
  let currentTargetLi = null;

  // ✅ 사이드바 자체 클릭으로 토글
  sidebar.addEventListener("click", (e) => {
    if (e.target.closest(".side-trash") || e.target.closest(".bookmark-btn") || e.target.closest(".common-modal") || e.target.closest(".modal-buttons")) {
      return; // 하단 요소나 모달 클릭 시 토글 무시
    }
    sidebar.classList.toggle("closed");
    sidebar.classList.toggle("opened");
  });

  trashBtn.addEventListener("click", () => {
    const listItems = document.querySelectorAll("#side-task-list1 li, #side-task-list2 li");

    if (!checkboxesVisible) {
      listItems.forEach((li) => {
        if (!li.classList.contains("title-li") && !li.querySelector("input[type='checkbox']")) {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add("side-task-checkbox");
          li.prepend(checkbox);

          const bookmarkBtn = li.querySelector(".bookmark-btn");
          if (bookmarkBtn) {
            bookmarkBtn.style.display = "none";
          }
        }
      });

      checkboxesVisible = true;
      selectAllContainer.classList.add("visible");
    } else {
      const checked = document.querySelectorAll(".side-task-checkbox:checked");

      if (checked.length > 0) {
        modal.style.display = "flex";
      } else {
        document.querySelectorAll(".side-task-checkbox").forEach((cb) => cb.remove());

        document.querySelectorAll(".bookmark-btn").forEach((btn) => {
          btn.style.display = "";
        });

        checkboxesVisible = false;
        selectAllContainer.classList.remove("visible");
      }
    }

    updateSelectAllCheckboxState();
  });

  taskLists.forEach((list) => {
    list.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      const checkbox = li?.querySelector("input[type='checkbox']");
      if (checkboxesVisible && checkbox) {
        checkbox.checked = !checkbox.checked;
        updateSelectAllCheckboxState();
      }
    });
  });

  selectAllCheckbox.addEventListener("change", () => {
    const isChecked = selectAllCheckbox.checked;
    document.querySelectorAll(".side-task-checkbox").forEach((cb) => {
      cb.checked = isChecked;
    });
  });

  function updateSelectAllCheckboxState() {
    const checkboxes = document.querySelectorAll(".side-task-checkbox");
    const checked = [...checkboxes].filter((cb) => cb.checked).length;

    selectAllCheckbox.disabled = checkboxes.length === 0;
    selectAllCheckbox.checked = checked === checkboxes.length;
  }

  modalYesBtn.addEventListener("click", () => {
    document.querySelectorAll(".side-task-checkbox:checked").forEach((cb) => {
      cb.closest("li").remove();
    });

    document.querySelectorAll(".side-task-checkbox").forEach((cb) => cb.remove());
    checkboxesVisible = false;
    selectAllContainer.classList.remove("visible");
    modal.style.display = "none";
  });

  modalNoBtn.addEventListener("click", () => {
    document.querySelectorAll(".side-task-checkbox").forEach((cb) => {
      cb.checked = false;
    });
    selectAllCheckbox.checked = false;
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // ✅ 북마크 "예" 클릭 → 상단 북마크에 추가
  bookmarkYesBtn.addEventListener("click", () => {
    bookmarkModal.classList.add("hidden");

    if (currentTargetLi) {
      const titleText = currentTargetLi.querySelector("span")?.textContent?.trim() ?? "제목 없음";

      const today = new Date();
      const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

      if (window.bookmarks) {
        window.bookmarks.push({
          name: titleText,
          date: formattedDate,
        });

        if (typeof window.renderBookmarks === "function") {
          window.renderBookmarks();
        }
      }

      console.log(`북마크 완료: ${titleText}`);
    }

    currentTargetId = null;
    currentTargetLi = null;
  });

  bookmarkNoBtn.addEventListener("click", () => {
    bookmarkModal.classList.add("hidden");
    currentTargetId = null;
    currentTargetLi = null;
  });

  window.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("/api/chat/list");
      const chatList = await response.json();

      const todayList = document.getElementById("side-task-list1");
      const pastList = document.getElementById("side-task-list2");

      const todayStr = new Date().toISOString().split("T")[0];

      chatList.forEach((chat) => {
        const li = document.createElement("li");
        li.classList.add("chat-list-item");
        li.setAttribute("data-prompt-idx", chat.promptIdx);

        const title = document.createElement("span");
        title.textContent = chat.firstMessage;

        const bookmarkBtn = document.createElement("button");
        bookmarkBtn.classList.add("bookmark-btn");
        bookmarkBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';

        bookmarkBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          bookmarkModal.classList.remove("hidden");
          currentTargetId = chat.promptIdx;
          currentTargetLi = li;
        });

        li.addEventListener("click", () => {
          window.location.href = `/chatroom?promptIdx=${chat.promptIdx}`;
        });

        li.appendChild(title);
        li.appendChild(bookmarkBtn);

        const createdDateStr = chat.createdAt.split("T")[0];
        if (createdDateStr === todayStr) {
          todayList.appendChild(li);
        } else {
          pastList.appendChild(li);
        }
      });
    } catch (error) {
      console.error("사이드바 채팅 리스트 불러오기 실패!!!!", error);
    }
  });
});