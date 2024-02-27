import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

export default function SetProfile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;
  const email = location.state.email;
  const password = location.state.password;
  const watchUsername = watch("username");
  const watchResolution = watch("resolution");

  const onSubmit = async () => {
    const user = {
      userId: userId,
      email: email,
      username: watchUsername,
      resolution: watchResolution || "각오따위 없음",
    };
    const collectionRef = collection(db, "users");
    await addDoc(collectionRef, user);
    navigate("/signin");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>사진선택창</div>
        <label htmlFor="username">사용자 이름</label>
        <input
          id="username"
          type="text"
          placeholder="2~8자 이내여야 합니다."
          {...register("username", {
            required: "사용자 이름을 꼭 적어주세요.",
            pattern: {
              value: /^.{2,8}$/,
              message: "2자 이상 8자 이내로 입력해주세요",
            },
          })}
        />
        {errors.username && (
          <small role="alert">{errors.username.message}</small>
        )}
        <label htmlFor="resolution">각오</label>
        <input
          id="resolution"
          type="text"
          placeholder="짧게 각오를 적어주세요"
          {...register("resolution", {})}
        />
        {errors.resolution && (
          <small role="alert">{errors.resolution.message}</small>
        )}
        <button type="submit">시작하기</button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
