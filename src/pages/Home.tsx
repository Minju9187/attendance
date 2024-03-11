import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import styled from "styled-components";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = year + "-" + month + "-" + day;
  const userId = localStorage.getItem("userId");
  console.log(userId);

  return (
    <>
      <Topbar />
      <Title>출석체크</Title>
      <Wrap>
        <CheckBox>
          <span>오전(출석)</span>
          <CheckButton>Check</CheckButton>
        </CheckBox>
        <CheckBox>
          <span>오후(출석)</span>
          <CheckButton>Check</CheckButton>
        </CheckBox>
      </Wrap>
      <button
        onClick={() => {
          navigate(`/survey/${today}`);
        }}
      >
        참석 여부 체크하러 가기
      </button>
      <Navbar />
    </>
  );
}

const Title = styled.h2`
  font-size: 30px;
  text-align: center;
  margin-top: 30px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckButton = styled.button`
  width: 180px;
  height: 80px;
  color: white;
  font-size: 25px;
  background-color: #ff4948;
  border-radius: 10px;
  margin-top: 10px;
`;
