import React, { useState } from "react";
import leftIcon from "../assets/images/left-arrow.svg";
import rightIcon from "../assets/images/right-arrow.svg";
import styled from "styled-components";

export default function Calendar() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const previousMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else setMonth(month + 1);
  };

  const generateCalendar = (year, month) => {
    const startDay = new Date(year, month - 1, 1).getDay();
    const endDate = new Date(year, month, 0).getDate();
    const weekNumber = Math.ceil((startDay + endDate) / 7);
    const calendar = [];

    let nowDate = 0;
    let nowDay = 0;

    for (let j = 0; j < weekNumber; j++) {
      const nowWeek = [];
      for (let i = 0; i < 7; i++) {
        if (startDay <= nowDay && nowDate < endDate) {
          nowDate++;
          nowWeek.push(nowDate);
        } else {
          nowWeek.push(0);
        }
        nowDay++;
      }
      calendar.push(nowWeek);
    }
    return renderCalendar({ calendar });
  };

  const renderCalendar = ({ calendar }) => {
    const result = [];
    for (let j = 0; j < calendar.length; j++) {
      const row = [];
      for (let i = 0; i < 7; i++) {
        let date = calendar[j][i] ? calendar[j][i] : null;

        row.push(
          <div>
            <div>{date}</div>
          </div>
        );
      }
      result.push(<div>{row}</div>);
    }
    return result;
  };

  return (
    <div>
      <div>
        <img
          src={leftIcon}
          alt="left-icon"
          style={{ height: "25px", width: "25px" }}
          onClick={previousMonth}
        />
        <div>
          {year}.{month}
        </div>
        <img
          src={rightIcon}
          alt="right-icon"
          style={{ height: "25px", width: "25px" }}
          onClick={nextMonth}
        />
      </div>
      <div>{generateCalendar(year, month)}</div>
    </div>
  );
}
