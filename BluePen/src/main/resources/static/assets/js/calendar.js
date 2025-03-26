document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const modal = document.getElementById("eventModal");
  const closeModal = document.getElementById("closeModal");
  const addEventBtn = document.getElementById("addEventBtn");
  const eventTitleInput = document.getElementById("eventTitle");
  const eventColorInput = document.getElementById("eventColor");
  const eventTimeInput = document.getElementById("eventTime");
  const deleteModal = document.getElementById("deleteModal");
  const closeDeleteModal = document.getElementById("closeDeleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  let selectedDate = null;
  let eventToDelete = null;

  closeModal.onclick = function () {
    modal.style.display = "none";
    eventTitleInput.value = "";
    eventTimeInput.value = "";
    eventColorInput.value = "#ffd700";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      eventTitleInput.value = "";
      eventTimeInput.value = "";
      eventColorInput.value = "#ffd700";
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
    selectable: true,
    editable: true,
    dayMaxEvents: false,
    moreLinkClick: "none",

    dateClick: function (info, jsEvent) {
      if (jsEvent.target.closest(".custom-more")) return;
      selectedDate = info.dateStr;
      modal.style.display = "block";
    },

    eventClick: function (info) {
      eventToDelete = info.event;
      deleteModal.style.display = "block";

      const clickedDate = info.event.startStr.substring(0, 10);
      const allEvents = calendar.getEvents();
      const filtered = allEvents.filter(e => e.startStr.startsWith(clickedDate));

      const listEl = document.getElementById("eventList");
      listEl.innerHTML = "";

      if (filtered.length === 0) {
        listEl.innerHTML = "<li>해당 날짜에 일정이 없습니다.</li>";
      } else {
        filtered.forEach(e => {
          const li = document.createElement("li");
          li.textContent = `${e.title} (${e.startStr.substring(11, 16) || "종일"})`;
          listEl.appendChild(li);
        });
      }
    },

    eventDidMount: function (info) {
      const event = info.event;
      const el = info.el;

      const title = event.title;
      if (title.includes("자격증")) {
        el.style.backgroundColor = "yellow";
        el.style.borderColor = "yellow";
      }
      if (title.includes("취업")) {
        el.style.backgroundColor = "lightgreen";
        el.style.borderColor = "lightgreen";
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

    dayCellDidMount: function (arg) {
      const dateStr = arg.date.toISOString().substring(0, 10);
      const cell = arg.el;
	  cell.innerHTML = ""; // ✅ 기존 내용 삭제!!!!
	  
      const events = calendar.getEvents().filter(e => e.startStr.startsWith(dateStr));

      const container = document.createElement("div");
      container.classList.add("custom-cell-events");

      events.forEach((event, idx) => {
        const item = document.createElement("div");
        item.classList.add("event-item");
        item.textContent = event.title;

        if (idx >= 3) {
          item.style.display = "none";
          item.classList.add("more-hidden");
        }

        container.appendChild(item);
      });

      if (events.length > 3) {
        const moreBtn = document.createElement("div");
        moreBtn.classList.add("custom-more");
        moreBtn.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
        moreBtn.onclick = function () {
          const hiddenItems = container.querySelectorAll(".more-hidden");
          hiddenItems.forEach(el => el.style.display = "block");
          moreBtn.style.display = "none";
        };
        container.appendChild(moreBtn);
      }

      cell.appendChild(container);
    },

  });

  addEventBtn.onclick = function () {
    const title = eventTitleInput.value;
    const color = eventColorInput.value;
    const time = eventTimeInput.value;

    if (title && selectedDate) {
      const startDateTime = time ? `${selectedDate}T${time}:00` : selectedDate;

      calendar.addEvent({
        title: title,
        start: startDateTime,
        allDay: !time,
        backgroundColor: color,
        borderColor: color
      });

      eventTitleInput.value = "";
      eventTimeInput.value = "";
      modal.style.display = "none";
    }
  };

  calendar.render();
});

addEventBtn.onclick = function () {
  const title = eventTitleInput.value;
  const color = eventColorInput.value;
  const time = eventTimeInput.value;

  if (title && selectedDate) {
    const startDateTime = time ? `${selectedDate}T${time}:00` : selectedDate;

    // ✅ 서버로 전송 (fetch)
    fetch("/schedule/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "user01", // 로그인 세션으로 받아야 함
        title: title,
        content: "내용 예시", // 필요시 입력폼 추가
        file: "",
        date: selectedDate,
        time: time || "00:00:00",
        type: "기타",
        color: color,
        alert: "off",
        status: "active"
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        calendar.addEvent({
          title: title,
          start: startDateTime,
          allDay: !time,
          backgroundColor: color,
          borderColor: color
        });
        modal.style.display = "none";
        eventTitleInput.value = "";
        eventTimeInput.value = "";
      }
    });
  }
};
