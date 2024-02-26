import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          value={email}
          name="email"
          onChange={onChange}
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
          required
          autoComplete="current-password"
        />
        <button onClick={signIn}>로그인</button>
        <button onClick={() => navigate("/signup")}>회원가입</button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
