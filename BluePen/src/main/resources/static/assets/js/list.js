let deleteTargetId = null;

      function confirmDelete(scheIdx) {
        deleteTargetId = scheIdx;
        document.getElementById("deleteModal").style.display = "flex";
      }

      function closeModal() {
        deleteTargetId = null;
        document.getElementById("deleteModal").style.display = "none";
      }

      function deleteConfirmed() {
        if (deleteTargetId != null) {
          fetch("/schedule-delete/" + deleteTargetId, {
            method: "DELETE"
          }).then(res => {
            if (res.ok) {
              location.reload();
            } else {
              alert("삭제 실패!");
            }
          });
        }
      }

      document.addEventListener("DOMContentLoaded", () => {
        let currentPage = 1;
        let itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
        const jobItems = Array.from(document.querySelectorAll('.job-item'));
        const paginationDiv = document.querySelector('.pagination');
		
		// 🔥 일정 정렬: 날짜 + 시간 기준 오름차순
		jobItems.sort((a, b) => {
		  const dateA = new Date(a.querySelector('.job-meta').textContent.replace("날짜: ", "").replace(" 시간:", ""));
		  const dateB = new Date(b.querySelector('.job-meta').textContent.replace("날짜: ", "").replace(" 시간:", ""));
		  return dateA - dateB;
		});
		
		// 🔁 정렬된 순서대로 다시 append
		const listContainer = document.getElementById("schedule-list");
		jobItems.forEach(item => listContainer.appendChild(item));

        function showPage(page) {
          jobItems.forEach((item, index) => {
            item.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? "flex" : "none";
          });
        }

        function renderPagination() {
          const pageCount = Math.ceil(jobItems.length / itemsPerPage);
          paginationDiv.innerHTML = '';
          for (let i = 1; i <= pageCount; i++) {
            let button = document.createElement('button');
            button.textContent = i;
            if (i === currentPage) button.classList.add('active');
            button.onclick = () => {
              currentPage = i;
              showPage(currentPage);
              renderPagination();
            };
            paginationDiv.appendChild(button);
          }
        }

        document.getElementById('itemsPerPage').addEventListener('change', e => {
          itemsPerPage = parseInt(e.target.value);
          currentPage = 1;
          showPage(currentPage);
          renderPagination();
        });

        showPage(currentPage);
        renderPagination();
      });
	  
	  // ✅ 전체삭제 모달 열기 함수
	  function confirmDeleteAll() {
	    document.querySelector(".modal-text").innerText = "정말 모든 일정을 삭제하시겠습니까?";
	    const confirmBtn = document.querySelector(".modal-confirm");
	    confirmBtn.onclick = deleteAllConfirmed;
	    document.getElementById("deleteModal").style.display = "flex";
	  }

	  // ✅ 삭제 실행 함수
	  function deleteAllConfirmed() {
	    fetch("/schedule-delete-all", {
	      method: "DELETE"
	    }).then(res => {
	      if (res.ok) {
	        alert("전체 일정이 삭제되었습니다.");
	        location.reload();
	      } else {
	        alert("삭제 실패!");
	      }
	    });
	  }