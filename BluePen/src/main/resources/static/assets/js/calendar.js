document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const modal = document.getElementById("eventModal");
  const closeModal = document.getElementById("closeModal");
  const addEventBtn = document.getElementById("addEventBtn");
  const eventTitleInput = document.getElementById("eventTitle");
  const eventTypeInput = document.getElementById("eventType"); // ✅ 일정 유형 셀렉트
  const eventTimeInput = document.getElementById("eventTime");
  const deleteModal = document.getElementById("deleteModal");
  const closeDeleteModal = document.getElementById("closeDeleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  let selectedDate = null;
  let eventToDelete = null;

  // 모달 닫기
  closeModal.onclick = function () {
    modal.style.display = "none";
    eventTitleInput.value = "";
    eventTimeInput.value = "";
    eventTypeInput.value = "자격증";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      eventTitleInput.value = "";
      eventTimeInput.value = "";
      eventTypeInput.value = "자격증";
    }
  };

  closeDeleteModal.onclick = cancelDeleteBtn.onclick = function () {
    deleteModal.style.display = "none";
    eventToDelete = null;
  };

  confirmDeleteBtn.onclick = function () {
    if (eventToDelete) {
      eventToDelete.remove();
      eventToDelete = null;
      deleteModal.style.display = "none";
    }
  };

  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "ko",
    initialView: "dayGridMonth",
	events: "/calendar/events", // ✅ DB에서 일정 가져옴
    selectable: true,
    editable: true,
    dayMaxEvents: false,
    moreLinkClick: "none",

    dateClick: function (info) {
      if (info.jsEvent.target.closest(".custom-more")) return;
      selectedDate = info.dateStr;
      modal.style.display = "block";
    },

	eventClick: function (info) {
	  eventToDelete = info.event;

	  // 모달에 내용 설정
	  const event = info.event;
	  const title = event.title;
	  const start = event.start;

	  viewModalContent.innerHTML = `
	    <strong>일정 제목:</strong> ${title}<br>
	    <strong>시작 시간:</strong> ${start.toLocaleString()}
	  `;

	  // 상세보기 모달 오픈
	  viewModal.style.display = "block";
	},

    eventDidMount: function (info) {
      const event = info.event;
      const el = info.el;

      const title = event.title;
      if (title.includes("자격증")) {
        el.style.backgroundColor = "#5F8B4C";
        el.style.borderColor = "#5F8B4C";
      }
      if (title.includes("취업")) {
        el.style.backgroundColor = "#FF9A9A";
        el.style.borderColor = "#FF9A9A";
      }

      if (event.start && event.end) {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        const dayDiff = (endDate - startDate) / (1000 * 60 * 60 * 24);
        if (dayDiff >= 1) {
          el.style.borderLeft = "5px solid #19335a";
          el.style.backgroundColor = "#f1f1f1";
          el.style.fontWeight = "bold";
        }
      }
    },


  });
  //상단 변수 선언부 추가
  const viewModal = document.getElementById("viewModal");
  const closeViewModal = document.getElementById("closeViewModal");
  const viewModalContent = document.getElementById("viewModalContent");
  
  //닫기 버튼 이벤트 추가
  closeViewModal.onclick = function () {
    viewModal.style.display = "none";
  };

  // ✅ 일정 추가 버튼 클릭 시
  addEventBtn.onclick = function () {
    const title = eventTitleInput.value;
    const type = eventTypeInput.value;
    const time = eventTimeInput.value;
    const color = type === "자격증" ? "#5F8B4C" : "#FF9A9A";

    if (title && selectedDate) {
      const timeFormatted = time ? `${time}:00` : "00:00:00";

      // fetch로 서버에 저장 요청
      const formData = new URLSearchParams();
      formData.append("scheTitle", title);
      formData.append("scheDt", selectedDate);
      formData.append("scheTm", timeFormatted);
      formData.append("scheType", type);
      formData.append("scheColor", color);

      fetch("/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      })
        .then((res) => {
          if (res.ok) {
            calendar.addEvent({
              title: title,
              start: time ? `${selectedDate}T${time}` : selectedDate,
              allDay: !time,
              backgroundColor: color,
              borderColor: color,
            });
            modal.style.display = "none";
            eventTitleInput.value = "";
            eventTimeInput.value = "";
            eventTypeInput.value = "자격증";
          } else {
            alert("서버 오류로 저장에 실패했습니다.");
          }
        })
        .catch((err) => console.error("에러 발생:", err));
    }
  };

  calendar.render();
});
