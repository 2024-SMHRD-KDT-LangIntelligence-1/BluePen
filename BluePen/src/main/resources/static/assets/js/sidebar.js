document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("side-modal");
  const modalYesBtn = document.getElementById("modal-yes-btn");
  const modalNoBtn = document.getElementById("modal-no-btn");
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("side-toggle-btn");
  const trashBtn = document.getElementById("side-trash-btn");
  const selectAllContainer = document.getElementById(
    "side-select-all-container"
  );
  const selectAllCheckbox = document.getElementById("side-select-all");
  const taskLists = [
    document.getElementById("side-task-list1"),
    document.getElementById("side-task-list2"),
  ];
  const icon = toggleBtn.querySelector("i");

  let checkboxesCreated = false;

  // 모달을 처음에 숨김
  modal.style.display = "none";

  // 사이드바 초기 상태 설정
  sidebar.classList.add("opened");
  icon.classList.replace("fa-angle-right", "fa-angle-left");

  // 사이드바 토글 버튼 클릭 이벤트
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("closed");
    sidebar.classList.toggle("opened");
    icon.classList.toggle("fa-angle-right");
    icon.classList.toggle("fa-angle-left");
  });

  // 휴지통 버튼 클릭 시 체크박스 생성/제거 및 모달 표시
  trashBtn.addEventListener("click", () => {
    const listItems = document.querySelectorAll(
      "#side-task-list1 li, #side-task-list2 li"
    );
    const hasCheckbox = listItems[0]?.querySelector("input[type='checkbox']");

    if (hasCheckbox) {
      const checkedItems = document.querySelectorAll(
        "#side-task-list1 li input[type='checkbox']:checked, #side-task-list2 li input[type='checkbox']:checked"
      );

      if (checkedItems.length > 0) {
        modal.style.display = "flex"; // 모달을 보이도록 설정
      } else {
        listItems.forEach((li) => {
          const checkbox = li.querySelector("input[type='checkbox']");
          if (checkbox) checkbox.remove();
        });

        selectAllContainer.style.display = "none";
        checkboxesCreated = false;
      }
    } else {
      listItems.forEach((li) => {
        const newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.classList.add("side-task-checkbox");
        li.prepend(newCheckbox);
      });

      selectAllContainer.style.display = "block";
      checkboxesCreated = true;
    }

    updateSelectAllCheckboxState();
  });

  // 전체선택 체크박스 클릭 시
  selectAllCheckbox.addEventListener("change", () => {
    const isChecked = selectAllCheckbox.checked;
    const listItems = document.querySelectorAll(
      "#side-task-list1 li input[type='checkbox'], #side-task-list2 li input[type='checkbox']"
    );
    listItems.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
  });

  // 개별 체크박스 상태에 맞게 전체 선택 체크박스 상태 업데이트
  function updateSelectAllCheckboxState() {
    const taskCheckboxes = document.querySelectorAll(".side-task-checkbox");
    const totalCheckboxes = taskCheckboxes.length;
    const checkedCheckboxes = Array.from(taskCheckboxes).filter(
      (checkbox) => checkbox.checked
    ).length;

    selectAllCheckbox.disabled = totalCheckboxes === 0;
    selectAllCheckbox.checked = checkedCheckboxes === totalCheckboxes;
  }

  // li 클릭 시 체크박스 상태 변경
  function handleTaskClick(event) {
    const li = event.target.closest("li");
    const checkbox = li.querySelector("input[type='checkbox']");
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
    updateSelectAllCheckboxState();
  }

  // task list 클릭 이벤트
  taskLists.forEach((taskList) => {
    taskList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI" || event.target.closest("li")) {
        handleTaskClick(event);
      }
    });
  });

  // 전체 선택 컨테이너 클릭 시
  selectAllContainer.addEventListener("click", (event) => {
    const checkbox = selectAllContainer.querySelector("input[type='checkbox']");
    if (
      checkbox &&
      (event.target.tagName === "STRONG" || event.target === selectAllContainer)
    ) {
      checkbox.checked = !checkbox.checked;
      selectAllCheckbox.dispatchEvent(new Event("change"));
    }
  });

  // "예" 버튼 클릭 시 모달 닫기
  modalYesBtn.addEventListener("click", () => {
    console.log("삭제 완료");
    modal.style.display = "none"; // 모달을 숨기기
  });

  // "아니오" 버튼 클릭 시 모달 닫기 및 체크박스 제거
  modalNoBtn.addEventListener("click", () => {
    console.log("모달 닫기");

    // 체크박스 제거
    const listItems = document.querySelectorAll(
      "#side-task-list1 li, #side-task-list2 li"
    );
    listItems.forEach((li) => {
      const checkbox = li.querySelector("input[type='checkbox']");
      if (checkbox) checkbox.remove();
    });

    selectAllContainer.style.display = "none"; // 전체 선택 컨테이너 숨기기
    checkboxesCreated = false; // 체크박스 생성 상태 초기화

    modal.style.display = "none"; // 모달을 숨기기
  });

  // 모달 바깥 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      console.log("모달 바깥 클릭");
      modal.style.display = "none"; // 모달 바깥 클릭 시 모달 숨기기
    }
  });

  // 예시로 사용할 동적 데이터
  const taskData1 = [
    { task: "언제 끝나....", id: 1 },
    { task: "프로젝트 관리", id: 2 },
    { task: "코드 리팩토링", id: 3 },
  ];

  const taskData2 = [
    { task: "초봉 3000 이상 주는 회사", id: 4 },
    { task: "면접 일정 조정", id: 5 },
    { task: "공채 일정 확인", id: 6 },
    { task: "이력서 업데이트", id: 7 },
    { task: "자기소개서 작성", id: 8 },
    { task: "포트폴리오 점검", id: 9 },
  ];

  // task list1 동적으로 생성
  function createTaskList(listContainer, taskData) {
    listContainer.innerHTML = ""; // 기존 내용을 지운 후 새로운 항목을 추가
    taskData.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.dataset.id = task.id; // 각 항목에 고유한 id를 data-속성으로 추가

      const taskText = document.createElement("span");
      taskText.textContent = task.task;
      listItem.appendChild(taskText);

      // 체크박스 추가
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("side-task-checkbox");
      listItem.prepend(checkbox);

      listContainer.appendChild(listItem);
    });
  }

  // 두 리스트에 데이터 추가
  createTaskList(taskLists[0], taskData1);
  createTaskList(taskLists[1], taskData2);
});
