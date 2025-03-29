document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("side-toggle-btn");
  const icon = toggleBtn.querySelector("i");

  const modal = document.getElementById("side-modal");
  const modalYesBtn = document.getElementById("modal-yes-btn");
  const modalNoBtn = document.getElementById("modal-no-btn");
  const trashBtn = document.getElementById("side-trash-btn");
  const selectAllContainer = document.getElementById("side-select-all-container");
  const selectAllCheckbox = document.getElementById("side-select-all");
  const taskLists = [
    document.getElementById("side-task-list1"),
    document.getElementById("side-task-list2")
  ];

  let checkboxesVisible = false;

  // ✅ 사이드바 토글 기능
  toggleBtn.addEventListener("click", () => {
    const isOpened = sidebar.classList.contains("opened");

    if (isOpened) {
      sidebar.classList.remove("opened");
      sidebar.classList.add("closed");
      icon.classList.remove("fa-angle-left");
      icon.classList.add("fa-angle-right");
    } else {
      sidebar.classList.remove("closed");
      sidebar.classList.add("opened");
      icon.classList.remove("fa-angle-right");
      icon.classList.add("fa-angle-left");
    }

    console.log("사이드바 상태:", sidebar.classList);
  });

  // ✅ 휴지통 버튼 클릭 → 체크박스 or 모달
  trashBtn.addEventListener("click", () => {
    const listItems = document.querySelectorAll("#side-task-list1 li, #side-task-list2 li");

    if (!checkboxesVisible) {
      listItems.forEach(li => {
        if (!li.classList.contains("title-li") && !li.querySelector("input[type='checkbox']")) {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.classList.add("side-task-checkbox");
          li.prepend(checkbox);
        }
      });

      checkboxesVisible = true;
      selectAllContainer.style.display = "flex";

    } else {
      const checked = document.querySelectorAll(".side-task-checkbox:checked");

      if (checked.length > 0) {
        modal.style.display = "flex"; // ✅ 삭제 모달 띄우기
      } else {
        document.querySelectorAll(".side-task-checkbox").forEach(cb => cb.remove());
        checkboxesVisible = false;
        selectAllContainer.style.display = "none";
      }
    }

    updateSelectAllCheckboxState();
  });

  // ✅ 리스트 클릭 시 체크박스 토글
  taskLists.forEach(list => {
    list.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      const checkbox = li?.querySelector("input[type='checkbox']");
      if (checkboxesVisible && checkbox) {
        checkbox.checked = !checkbox.checked;
        updateSelectAllCheckboxState();
      }
    });
  });

  // ✅ 전체선택 체크박스 동기화
  selectAllCheckbox.addEventListener("change", () => {
    const isChecked = selectAllCheckbox.checked;
    document.querySelectorAll(".side-task-checkbox").forEach(cb => {
      cb.checked = isChecked;
    });
  });

  // ✅ 전체선택 체크박스 상태 업데이트 함수
  function updateSelectAllCheckboxState() {
    const checkboxes = document.querySelectorAll(".side-task-checkbox");
    const checked = [...checkboxes].filter(cb => cb.checked).length;

    selectAllCheckbox.disabled = checkboxes.length === 0;
    selectAllCheckbox.checked = checked === checkboxes.length;
  }

  // ✅ "예" 클릭 시 체크된 항목 삭제
  modalYesBtn.addEventListener("click", () => {
    document.querySelectorAll(".side-task-checkbox:checked").forEach(cb => {
      cb.closest("li").remove();
    });

    document.querySelectorAll(".side-task-checkbox").forEach(cb => cb.remove());
    checkboxesVisible = false;
    selectAllContainer.style.display = "none";
    modal.style.display = "none";
  });

  // ❌ "아니오" 클릭 시 모달 닫고 체크 해제
  modalNoBtn.addEventListener("click", () => {
    document.querySelectorAll(".side-task-checkbox").forEach(cb => {
      cb.checked = false;
    });

    selectAllCheckbox.checked = false;
    modal.style.display = "none";
  });

  // ⛔ 모달 바깥 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // ✅ 예시 데이터
  const taskData1 = [
    { task: "프로젝트 관리", id: 1 },
    { task: "코드 리팩토링", id: 2 },
  ];

  const taskData2 = [
    { task: "면접 일정 조정", id: 3 },
    { task: "공채 일정 확인", id: 4 },
    { task: "이력서 업데이트", id: 5 },
    { task: "자기소개서 작성", id: 6 },
    { task: "포트폴리오 점검", id: 7 },
  ];

  // ✅ 리스트 생성 함수
  function createTaskList(listContainer, taskData) {
    listContainer.innerHTML = "";
    taskData.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.dataset.id = task.id;

      const taskText = document.createElement("span");
      taskText.textContent = task.task;
      listItem.appendChild(taskText);

      listContainer.appendChild(listItem);
    });
  }

  createTaskList(taskLists[0], taskData1);
  createTaskList(taskLists[1], taskData2);
});
