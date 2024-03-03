import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "./calendar.css";
import "react-calendar/dist/Calendar.css"; // css import

export default function MiniCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      <Calendar onChange={setValue} value={value} />
      {/* <div className="text-gray-500 mt-4">
        {moment(value).format("YYYY년 MM월 DD일")}
      </div> */}
    </div>
  );
}
