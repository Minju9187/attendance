import { useState } from "react";

const week = ["일", "월", "화", "수", "목", "금", "토"];

export default function MyCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false);

  const today = new Date().toDateString();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = endOfMonth.getDate();
  const startDay = startOfMonth.getDay();

  const dates = [];
  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  const changeMonth = (offset: number) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1),
    );
  };

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-center gap-3">
        <button onClick={() => changeMonth(-1)} className="px-2 text-xl">
          ◀
        </button>
        <h2 className="flex w-32 items-center justify-center gap-2 text-center text-lg font-bold">
          <span
            onClick={() => setShowYearSelect(!showYearSelect)}
            className="cursor-pointer hover:underline"
          >
            {year}년
          </span>
          <span
            onClick={() => setShowMonthSelect(!showMonthSelect)}
            className="cursor-pointer hover:underline"
          >
            {month + 1}월
          </span>
        </h2>
        <button onClick={() => changeMonth(1)} className="px-2 text-xl">
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 text-center font-bold">
        {week.map((day) => (
          <div key={`${day}요일`}>{day}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center">
        {dates.map((date, idx) =>
          date ? (
            <div
              key={idx}
              onClick={() => console.log(date)}
              className={`cursor-pointer rounded-lg p-2 ${
                date.toDateString() === today
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {date.getDate()}
            </div>
          ) : (
            <div key={idx} />
          ),
        )}
      </div>
      {showYearSelect && (
        <div className="absolute top-10 left-1/2 z-10 mt-2 grid w-56 -translate-x-1/2 transform grid-cols-4 gap-1 rounded border bg-white p-2 shadow">
          {Array.from({ length: 21 }, (_, i) => 2015 + i).map((y) => (
            <div
              key={y}
              onClick={() => {
                setCurrentDate(new Date(y, month, 1));
                setShowYearSelect(false);
              }}
              className="cursor-pointer rounded p-1 text-center hover:bg-blue-100"
            >
              {y}
            </div>
          ))}
        </div>
      )}
      {showMonthSelect && (
        <div className="absolute top-10 left-1/2 z-10 mt-2 grid w-48 -translate-x-1/2 transform grid-cols-4 gap-1 rounded border bg-white p-2 shadow">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentDate(new Date(year, i, 1));
                setShowMonthSelect(false);
              }}
              className="cursor-pointer rounded p-1 text-center hover:bg-blue-100"
            >
              {i + 1}월
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
