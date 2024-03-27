import React from "react";
import BackIcon from "@/assets/images/icon-back.svg";
import MoreIcon from "@/assets/images/icon-dot.svg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "@/firebase";

export default function Topbar() {
  const navigate = useNavigate();
  return (
    <Container>
      <BackBtn
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={BackIcon} alt="뒤로가기" />
      </BackBtn>
      <LogoutBtn
        onClick={() => {
          auth.signOut();
          navigate(`/signin`);
        }}
      >
        <img src={MoreIcon} alt="더보기" />
      </LogoutBtn>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 390px;
  height: 45px;

  background-color: #ff4948;
`;

const BackBtn = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LogoutBtn = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
