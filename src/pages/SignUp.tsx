import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const watchEmail = watch("email");
  const watchPassword = watch("password");
  const watchPasswordCheck = watch("passwordCheck");

  const duplicatedEmail = async () => {
    const q = query(collection(db, "users"), where("email", "==", watchEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("이미 있는 이메일입니다.");
    } else {
      navigate("/signup/setprofile", {
        state: {
          // userId: userCredential.user.uid,
          email: watchEmail,
          password: watchPassword,
        },
      });
    }
  };

  const onSubmit = (data) => {
    duplicatedEmail();
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
