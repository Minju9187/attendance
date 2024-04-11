import {
  StyledCalendarWrapper,
  StyledCalendar,
  StyledToday,
  StyledMorningDot,
  StyledAfternoonDot,
} from "./MiniCalendarStyle";
import moment from "moment";
import { useState } from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MiniCalendar = ({ data }) => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const attendData = {};
  Object.keys(data).forEach((dateString) => {
    const date = moment(dateString).format("YYYY-MM-DD");
    const parts = data[dateString].split(",");
    const formattedData = {};
    parts.forEach((part) => {
      const [time, status] = part.split(":");
      formattedData[time] = status;
    });
    attendData[date] = formattedData;
  });

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
        activeStartDate={activeStartDate === null ? undefined : activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
        tileContent={({ date, view }) => {
          let html = [];
          const formattedDate = moment(date).format("YYYY-MM-DD");
          const attendance = attendData[formattedDate];
          if (
            view === "month" &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
          ) {
            html.push(<StyledToday key={"today"}>오늘</StyledToday>);
          }
          if (attendance) {
            html.push(
              <StyledMorningDot
                key={moment(date).format("YYYY-MM-DD" + "오전")}
                $status={attendance["오전"]}
              />
            );
            html.push(
              <StyledAfternoonDot
                key={moment(date).format("YYYY-MM-DD" + "오후")}
                $status={attendance["오후"]}
              />
            );
          }
          return <>{html}</>;
        }}
      />
    </StyledCalendarWrapper>
  );
};

export default MiniCalendar;
