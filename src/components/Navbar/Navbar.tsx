import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@/assets/images/icon-home.svg";
import CalendarIcon from "@/assets/images/icon-calendar.svg";
import ProfileIcon from "@/assets/images/icon-profile.svg";

export default function Navbar() {
  const auth = getAuth();
  let [data, setData] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setData(user);
      }
    });
  }, []);
  return (
    <>
      <NavContainer>
        <NavLinkTag to={"/home"}>
          <img src={HomeIcon} alt="home" />홈
        </NavLinkTag>
        <NavLinkTag to={`/calendar/${data?.uid}`}>
          <img src={CalendarIcon} alt="calendar" />
          캘린더
        </NavLinkTag>
        <NavLinkTag to={`/profile/${data?.uid}`}>
          <img src={ProfileIcon} alt="profile" />
          프로필
        </NavLinkTag>
      </NavContainer>
    </>
  );
}

const NavContainer = styled.nav`
  width: 390px;
  height: 50px;
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
`;

const NavLinkTag = styled(NavLink)``;
