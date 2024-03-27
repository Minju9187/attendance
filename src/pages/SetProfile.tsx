import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { db, auth } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function SetProfile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const password = location.state.password;
  const watchUsername = watch("username");
  const watchResolution = watch("resolution");

  const onSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = {
        userId: userCredential.user.uid,
        email: email,
        username: watchUsername,
        resolution: watchResolution || "각오따위 없음",
        오전출석: 0,
        오후출석: 0,
        지각: 0,
        결석: 0,
        isManager: false,
      };
      const collectionRef = collection(db, "users");
      await addDoc(collectionRef, user);
      navigate("/signin");
    } catch (error) {
      const { code } = error as FirebaseError;
      switch (code) {
        case "auth/email-already-in-use":
          alert("이미 사용중인 이메일 입니다.");
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
