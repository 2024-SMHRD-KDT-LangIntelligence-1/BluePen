document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggle-btn");
  const trashBtn = document.getElementById("trash-btn");
  const modal = document.getElementById("confirmation-modal");
  const confirmBtn = document.getElementById("confirm-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const selectAllContainer = document.getElementById("select-all-container");
  const selectAllCheckbox = document.getElementById("select-all");
  const taskList1 = document.getElementById("task-list1");
  const taskList2 = document.getElementById("task-list2");
  const icon = toggleBtn.querySelector("i");

  let checkboxesCreated = false;
  let selectedTasks = [];

  // 1. 사이드바 토글 버튼
  if (sidebar.classList.contains("closed")) {
    icon.classList.remove("fa-angle-left");
    icon.classList.add("fa-angle-right"); // 닫힌 상태면 >
  } else {
    icon.classList.remove("fa-angle-right");
    icon.classList.add("fa-angle-left"); // 열린 상태면 <
  }
  
  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("closed");
    toggleBtn.classList.toggle("closed");
    if (sidebar.classList.contains("closed")) {
      icon.classList.remove("fa-angle-left");
      icon.classList.add("fa-angle-right");
    } else {
      icon.classList.remove("fa-angle-right");
      icon.classList.add("fa-angle-left");
    }
  });

  // 2. 휴지통 버튼 클릭 시 체크박스 생성/제거 및 모달 표시
  trashBtn.addEventListener("click", function () {
    const listItems = document.querySelectorAll("#task-list1 li, #task-list2 li");
    let hasCheckbox = listItems[0]?.querySelector("input[type='checkbox']");

    if (hasCheckbox) {
      const checkedItems = document.querySelectorAll(
        "#task-list1 li input[type='checkbox']:checked, #task-list2 li input[type='checkbox']:checked"
      );

      if (checkedItems.length > 0) {
        // 체크된 항목이 있으면 모달 표시
        modal.style.display = "block";
        modal.style.position = "fixed";
        modal.style.zIndex = 9999;
      } else {
        // 체크된 항목이 없으면 체크박스 제거
        listItems.forEach((li) => {
          const checkbox = li.querySelector("input[type='checkbox']");
          if (checkbox) checkbox.remove();
        });

        selectAllContainer.style.display = "none"; // 전체 선택 숨기기
        checkboxesCreated = false; // 체크박스 상태 업데이트
      }
    } else {
      // 체크박스 추가
      listItems.forEach((li) => {
        const newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.classList.add("task-checkbox");
        li.prepend(newCheckbox);
      });

      selectAllContainer.style.display = "block"; // 전체 선택 보이기
      checkboxesCreated = true;
    }

    updateSelectAllCheckboxState(); // 전체 선택 체크박스 상태 업데이트
  });

  // 3. 전체선택 체크박스 클릭 시
  selectAllCheckbox.addEventListener("change", function () {
    const isChecked = selectAllCheckbox.checked;
    const listItems = document.querySelectorAll(
      "#task-list1 li input[type='checkbox'], #task-list2 li input[type='checkbox']"
    );
    listItems.forEach((checkbox) => {
      checkbox.checked = isChecked; // 체크박스를 모두 선택하거나 해제
    });
  });

  // 4. 개별 체크박스 상태에 맞게 전체 선택 체크박스의 상태를 업데이트
  function updateSelectAllCheckboxState() {
    const taskCheckboxes = document.querySelectorAll(".task-checkbox");
    const selectAllCheckbox = selectAllContainer.querySelector(
      "input[type='checkbox']"
    );

    const totalCheckboxes = taskCheckboxes.length;
    const checkedCheckboxes = Array.from(taskCheckboxes).filter(
      (checkbox) => checkbox.checked
    ).length;

    if (totalCheckboxes === 0) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.disabled = true;
    } else {
      selectAllCheckbox.disabled = false;
      if (checkedCheckboxes === totalCheckboxes) {
        selectAllCheckbox.checked = true;
      } else {
        selectAllCheckbox.checked = false;
      }
    }
  }

  // 5. li 클릭 시 체크박스 상태 변경
  function handleTaskClick(event) {
    const li = event.target.closest("li"); // 클릭한 요소가 li인지 확인
    const checkbox = li.querySelector("input[type='checkbox']");

    if (checkbox) {
      checkbox.checked = !checkbox.checked; // 체크박스 상태를 반전시킴
    }

    if (checkbox.checked) {
      selectedTasks.push(li);
    } else {
      selectedTasks = selectedTasks.filter((task) => task !== li);
    }

    updateSelectAllCheckboxState();
  }

  taskList1.addEventListener("click", function (event) {
    if (event.target.tagName === "LI" || event.target.closest("li")) {
      handleTaskClick(event);
    }
  });

  taskList2.addEventListener("click", function (event) {
    if (event.target.tagName === "LI" || event.target.closest("li")) {
      handleTaskClick(event);
    }
  });
  
  selectAllContainer.addEventListener("click", function (event) {
    const checkbox = selectAllContainer.querySelector("input[type='checkbox']");
    if (checkbox && (event.target.tagName === "STRONG" || event.target === selectAllContainer)) {
      checkbox.checked = !checkbox.checked;
      selectAllCheckbox.dispatchEvent(new Event("change")); // 체크박스 변경 이벤트 트리거
    }
  });

  // 6. 모달 확인 버튼 클릭 시 체크된 항목 삭제
  confirmBtn.addEventListener("click", function () {
    selectedTasks.forEach((task) => task.remove());
    modal.style.display = "none";
    selectedTasks = []; // 선택 초기화
  });

  // 7. 모달 취소 버튼 클릭 시 체크박스 제거 및 모달 꺼짐
  cancelBtn.addEventListener("click", function () {
    // 체크박스를 제거
    const listItems = document.querySelectorAll(
      "#task-list1 li input[type='checkbox'], #task-list2 li input[type='checkbox']"
    );
    listItems.forEach((checkbox) => {
      checkbox.remove(); // 체크박스 제거
    });

    selectAllContainer.style.display = "none"; // 전체 선택 체크박스 숨기기
    modal.style.display = "none"; // 모달 숨기기
    selectedTasks = []; // 선택 초기화
  });
});
