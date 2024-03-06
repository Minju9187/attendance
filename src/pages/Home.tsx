import MiniCalendar from "@/components/MiniCalendar";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Topbar />
      <MiniCalendar />
      <h2>출석체크</h2>
      <div>
        <button>오전 Check</button>
        <button>오후 Check</button>
      </div>
      <button
        onClick={() => {
          navigate("/check");
        }}
      >
        참석 여부 체크하러 가기
      </button>
      <Navbar />
    </>
  );
}
