import BackIcon from "@/assets/images/icon-back.svg?react";
import MoreIcon from "@/assets/images/icon-dot.svg?react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "@/firebase";
import { useDispatch } from "react-redux";
import { logOut } from "@/reducers/store";

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    const confirmed: boolean = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      auth
        .signOut()
        .then(() => {
          navigate("/");
          dispatch(logOut());
        })
        .catch((error) => {
          console.error("로그아웃 오류", error);
        });
    }
  };

  return (
    <Container>
      <BackBtn
        onClick={() => {
          navigate(-1);
        }}
      >
        {/* <img src={BackIcon} alt="뒤로가기" /> */}
        <BackIcon />
      </BackBtn>
      <LogoutBtn onClick={handleLogout}>
        {/* <img src={MoreIcon} alt="더보기" /> */}
        <MoreIcon />
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
