document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    initialDate: '2025-02-07',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      {
        title: 'All Day Event',
        start: '2025-02-01'
      },
      {
        title: 'Long Event',
        start: '2025-02-07',
        end: '2025-02-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2025-02-09T16:00:00'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2025-02-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2025-02-11',
        end: '2025-02-13'
      },
      {
        title: 'Meeting',
        start: '2025-02-12T10:30:00',
        end: '2025-02-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2025-02-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2025-02-12T14:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2025-02-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'https://google.com/',
        start: '2025-02-28'
      }
    ]
  });

  calendar.render();
});

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    initialDate: '2025-04-01',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true, // 일정 드래그 가능
    selectable: true, // 날짜 선택 가능
    events: [
      {
        title: '회의',
        start: '2025-04-01T10:00:00',
        end: '2025-04-01T12:00:00'
      },
      {
        title: '점심 약속',
        start: '2025-04-05T12:30:00'
      }
    ],
    // 날짜 클릭 시 일정 추가
    dateClick: function(info) {
      var eventTitle = prompt('이벤트 제목을 입력하세요:');
      if (eventTitle) {
        calendar.addEvent({
          title: eventTitle,
          start: info.dateStr
        });
      }
    },
    // 일정 이동 가능
    eventDrop: function(info) {
      alert(info.event.title + ' 날짜가 ' + info.event.start.toISOString() + '로 변경되었습니다.');
    }
  });

  calendar.render();
});

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var eventListEl = document.getElementById("eventList");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2025-04-01",
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
        title: "회의",
        start: "2025-04-01T10:00:00",
        end: "2025-04-01T12:00:00",
      },
      {
        id: "2",
        title: "출장",
        start: "2025-04-05",
        end: "2025-04-08",
      },
      {
        id: "3",
        title: "휴가",
        start: "2025-04-10",
        end: "2025-04-15",
      },
    ],
    // 일정 클릭 시 아래 리스트에 표시
    eventClick: function (info) {
      var event = info.event;
      var eventId = event.id;
      var eventTitle = event.title;
      var eventStart = event.start.toISOString().split("T")[0]; // YYYY-MM-DD 형식
      var eventEnd = event.end ? event.end.toISOString().split("T")[0] : null;

      // 이미 존재하는지 확인
      if (document.getElementById("event-" + eventId)) return;

      var li = document.createElement("li");
      li.id = "event-" + eventId;
      li.innerHTML = `<strong>${eventTitle}</strong> - ${eventStart} ${
        eventEnd ? `~ ${eventEnd}` : ""
      } 
                      <button onclick="removeEvent('${eventId}')">삭제</button>`;
      eventListEl.appendChild(li);
    },
  });

  calendar.render();

  // 리스트에서 일정 삭제
  window.removeEvent = function (eventId) {
    var event = calendar.getEventById(eventId);
    if (event) event.remove();

    var li = document.getElementById("event-" + eventId);
    if (li) li.remove();
  };
});
