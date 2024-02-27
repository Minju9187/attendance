import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "@/components/LoginForm";

export default function SetProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const password = location.state.password;
  console.log(email, password);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "username") {
      console.log(value);
    }
    if (name === "resolution") {
      console.log(value);
    }
  };

  const startApp = async () => {
    const userInfo = doc(db, "userInfo");
    navigate("/signin");
  };

  return (
    <>
      <Form onSubmit={startApp}>
        <div>사진선택창</div>
        <label htmlFor="username">사용자 이름</label>
        <input
          type="text"
          placeholder="2~8자 이내여야 합니다."
          id="username"
          name="username"
          onChange={onChange}
          required
        />
        <label htmlFor="resolution">각오</label>
        <input
          type="text"
          placeholder="짧게 각오를 적어주세요"
          id="resolution"
          name="resolution"
          onChange={onChange}
          required
        />
        <button type="submit">시작하기</button>
      </Form>
      <LoginForm />
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
