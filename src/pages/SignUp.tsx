import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "passwordCheck") {
      setPasswordCheck(value);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signup/setProfile", {
      state: { email: email, password: password },
    });
  };

  return (
    <>
      <Form onSubmit={handleSignUp}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={email}
          name="email"
          onChange={onChange}
          placeholder="이메일 주소를 입력해주세요"
          required
          autoComplete="current-email"
        />

        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          name="password"
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요"
          required
          autoComplete="current-password"
        />

        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input
          id="passwordCheck"
          type="password"
          value={passwordCheck}
          name="passwordCheck"
          onChange={onChange}
          placeholder="비밀번호를 다시 한번 입력해주세요"
          required
          autoComplete="new-password"
        />
        <button type="submit">다음</button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
