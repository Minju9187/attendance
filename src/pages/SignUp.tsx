import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    resetField,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const watchPasswordCheck = watch("passwordCheck");

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        watchEmail,
        watchPassword
      );
      navigate("/signup/setprofile", {
        state: {
          userId: userCredential.user.uid,
          email: watchEmail,
          password: watchPassword,
        },
      });
    } catch (error) {
      const { code } = error as FirebaseError;
      switch (code) {
        case "auth/email-already-in-use":
          alert("이미 사용중인 이메일 입니다.");
          resetField("email");
          resetField("password");
          resetField("passwordCheck");
          break;
        case "auth/network-request-failed":
          alert("네트워크 연결에 실패하였습니다.");
          break;
        case "auth/internal-error":
          alert("잘못된 요청입니다.");
          break;
        default:
          alert("회원가입에 실패하였습니다.");
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
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input
          id="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 한번 입력해 주세요"
          autoComplete="password"
          {...register("passwordCheck", {
            required: "비밀번호체크는 필수 입력입니다.",
            validate: (value) =>
              value === getValues("password") ||
              "비밀번호가 일치하지 않습니다.",
          })}
        />
        <button
          type="submit"
          disabled={!watchEmail || !watchPassword || !watchPasswordCheck}
        >
          다음
        </button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
