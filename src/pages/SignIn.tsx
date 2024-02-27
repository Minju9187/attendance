import { sign } from "crypto";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import styled from "styled-components";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, watchEmail, watchPassword);
      navigate("/home");
    } catch (error) {
      const { code } = error as FirebaseError;
      switch (code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/email-already-in-use":
        case "auth/weak-password":
        case "auth/invalid-email":
        case "auth/invalid-credential":
          alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
          break;
        case "auth/network-request-failed":
          alert("네트워크 연결에 실패하였습니다.");
          break;
        case "auth/internal-error":
          alert("잘못된 요청입니다.");
          break;
        default:
          alert("로그인에 실패하였습니다.");
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          placeholder="이메일을 입력해 주세요"
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <small role="alert">{errors.email.message}</small>}
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          autoComplete="password"
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            minLength: {
              value: 8,
              message: "8자리 이상 비밀번호를 사용하세요.",
            },
          })}
        />
        {errors.password && (
          <small role="alert">{errors.password.message}</small>
        )}
        <button type="submit" disabled={!watchEmail || !watchPassword}>
          로그인
        </button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
