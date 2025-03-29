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
              alert("삭제되었습니다.");
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