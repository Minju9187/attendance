import {
  StyledCalendarWrapper,
  StyledCalendar,
  StyledToday,
  StyledMorningDot,
  StyledAfternoonDot,
  GreenDot,
  YellowDot,
  RedDot,
  Status,
  Info,
  Wrap,
} from "./MiniCalendarStyle";
import moment from "moment";
import { useState } from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface AttendanceData {
  [date: string]: string;
}

interface Props {
  data: AttendanceData;
}

const MiniCalendar = ({ data }: Props) => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const attendData: Record<string, Record<string, string>> = {};
  Object.keys(data).forEach((dateString) => {
    const date = moment(dateString).format("YYYY-MM-DD");
    const parts = data[dateString].split(",");
    const formattedData: Record<string, string> = {};
    parts.forEach((part) => {
      const [time, status] = part.split(":");
      formattedData[time] = status;
    });
    attendData[date] = formattedData;
  });

  const getDotStyle = (status: "출석" | "지각" | "결석") => {
    if (status === "출석") return { backgroundColor: "#008000" };
    if (status === "지각") return { backgroundColor: "#FFD700" };
    if (status === "결석") return { backgroundColor: "#FF0000" };
    return {}; // 기본 색상
  };

  return (
    <>
      <StyledCalendarWrapper>
        <StyledCalendar
          value={date}
          onChange={handleDateChange}
          formatDay={(_, date) => moment(date).format("D")}
          formatYear={(_, date) => moment(date).format("YYYY")}
          formatMonthYear={(_, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
          activeStartDate={
            activeStartDate === null ? undefined : activeStartDate
          }
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
          // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
          tileContent={({ date, view }) => {
            const html = [];
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
                  style={getDotStyle(
                    attendance.오전 as "출석" | "지각" | "결석"
                  )}
                />
              );
              html.push(
                <StyledAfternoonDot
                  key={moment(date).format("YYYY-MM-DD" + "오후")}
                  style={getDotStyle(
                    attendance.오후 as "출석" | "지각" | "결석"
                  )}
                />
              );
            }
            return <>{html}</>;
          }}
        />
      </StyledCalendarWrapper>
      <Info>
        <Wrap>
          <GreenDot />
          <Status>출석</Status>
        </Wrap>
        <Wrap>
          <YellowDot />
          <Status>지각</Status>
        </Wrap>
        <Wrap>
          <RedDot />
          <Status>결석</Status>
        </Wrap>
      </Info>
    </>
  );
};

export default MiniCalendar;
