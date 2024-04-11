import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@/assets/images/icon-home.svg?react";
import CalendarIcon from "@/assets/images/icon-calendar.svg?react";
import ProfileIcon from "@/assets/images/icon-profile.svg?react";

export default function Navbar() {
  const auth = getAuth();
  const [data, setData] = useState<User | null>(null);
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
          <HomeIcon />홈
        </NavLinkTag>
        <NavLinkTag to={`/calendar/${data?.uid}`}>
          <CalendarIcon />
          캘린더
        </NavLinkTag>
        <NavLinkTag to={`/profile/${data?.uid}`}>
          <ProfileIcon />
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
  padding: 0 30px 0 30px;
  background-color: white;
`;

const NavLinkTag = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 0 20px;
  &.active {
    color: #ff4948;

    svg {
      fill: #ff4948;
    }
  }
`;
