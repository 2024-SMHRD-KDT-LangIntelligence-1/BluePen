document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var modal = document.getElementById("eventModal");
  var closeModal = document.getElementById("closeModal");
  var addEventBtn = document.getElementById("addEventBtn");
  var eventTitleInput = document.getElementById("eventTitle");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "ko", // 한국어로 설정
    initialView: "dayGridMonth",
    initialDate: new Date(), // 오늘 날짜로 설정
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    editable: true,
    selectable: true,
    events: [
      {
        id: "1",
        title: "자격증 공부",
        start: "2025-04-01T10:00:00",
        end: "2025-04-01T12:00:00",
        backgroundColor: "yellow",
        borderColor: "yellow",
      },
      {
        id: "2",
        title: "취업 면접",
        start: "2025-04-01T14:00:00",
        end: "2025-04-01T16:00:00",
        backgroundColor: "lightgreen",
        borderColor: "lightgreen",
      },
      {
        id: "3",
        title: "자격증 복습",
        start: "2025-04-01T16:00:00",
        end: "2025-04-01T18:00:00",
        backgroundColor: "yellow",
        borderColor: "yellow",
      },
      {
        id: "4",
        title: "취업 준비",
        start: "2025-04-01T09:00:00",
        end: "2025-04-01T11:00:00",
        backgroundColor: "lightgreen",
        borderColor: "lightgreen",
      },
      {
        id: "5",
        title: "자격증 시험",
        start: "2025-04-01T13:00:00",
        end: "2025-04-01T15:00:00",
        backgroundColor: "yellow",
        borderColor: "yellow",
      }
    ],
    eventRender: function(info) {
      // 하루 이상 일정은 라인으로 표시하기
      if (info.event.end) {
        info.el.style.borderLeft = "5px solid #19335a"; // 왼쪽에 라인 추가
        info.el.style.backgroundColor = "#f1f1f1"; // 배경색 변경
      }

      // 자격증 관련 일정 색상 변경
      if (info.event.title.includes("자격증")) {
        info.el.style.backgroundColor = "yellow";
        info.el.style.borderColor = "yellow";
      }
      // 취업 관련 일정 색상 변경
      if (info.event.title.includes("취업")) {
        info.el.style.backgroundColor = "lightgreen";
        info.el.style.borderColor = "lightgreen";
      }
    },
    dayRender: function(info) {
      var day = info.el;
      var dayNumber = info.date.getDate();  // 날짜만 추출

      // 해당 날짜의 일정을 가져옵니다
      var events = info.view.calendar.getEvents();
      var dayEvents = events.filter(function(event) {
        return event.startStr.startsWith(info.dateStr); // 해당 날짜의 일정만 필터링
      });

      // 일정이 3개 이상인 경우 "더 보기" 버튼 추가
      if (dayEvents.length > 3) {
        var moreLink = document.createElement("div");
        moreLink.classList.add("more-events");
        moreLink.textContent = "..."; // '더 보기' 텍스트
        day.appendChild(moreLink);

        // 첫 3개의 일정만 보여주기
        dayEvents.slice(0, 3).forEach(function(event) {
          var li = document.createElement("li");
          li.textContent = event.title; // 일정 제목만 표시
          day.appendChild(li);
        });

        // 더 보기 클릭 시 나머지 일정 보여주기
        moreLink.addEventListener("click", function () {
          var eventList = document.createElement("ul");
          dayEvents.forEach(function (event) {
            var li = document.createElement("li");
            li.textContent = event.title;
            eventList.appendChild(li);
          });
          day.appendChild(eventList);
          moreLink.style.display = "none"; // '더 보기' 링크 숨기기
        });

        // 진한 색으로 표시하여 구분하기
        day.style.backgroundColor = "#c8d6e5";  // 진한 색으로 변경
      } else {
        // 3개 이하일 경우 모든 일정을 나열합니다
        var eventList = document.createElement("ul");
        dayEvents.forEach(function (event) {
          var li = document.createElement("li");
          li.textContent = event.title; // 일정 제목만 표시
          eventList.appendChild(li);
        });
        day.appendChild(eventList);
      }
    },

    dayClick: function(info) {
      // 날짜 클릭 시 모달 띄우기
      modal.style.display = "block";
      var selectedDate = info.dateStr;

      addEventBtn.onclick = function() {
        var eventTitle = eventTitleInput.value;
        if (eventTitle) {
          calendar.addEvent({
            title: eventTitle,
            start: selectedDate,
            allDay: true
          });
          modal.style.display = "none"; // 모달 닫기
          eventTitleInput.value = ""; // 입력 필드 초기화
        }
      };
    }
  });

  calendar.render();

  // 모달 닫기 버튼 클릭 시
  closeModal.onclick = function() {
    modal.style.display = "none";
  };

  // 모달 외부 클릭 시 모달 닫기
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
