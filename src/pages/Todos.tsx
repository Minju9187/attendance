import MyCalendar from "@/components/Calendar/MyCalendar";
import { useState } from "react";

type DatePiece = Date | null;

type SelectedDate = DatePiece | [DatePiece, DatePiece];

export default function Todos() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  return (
    <>
      <MyCalendar />
    </>
  );
}
