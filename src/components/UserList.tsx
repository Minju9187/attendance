import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";

export default function UserList({ allData, data, idx }) {
  const { userId, username, 오전참여, 오후참여 } = data;
  const [firstTime, setFirstTime] = useState(오전참여);
  const [secondTime, setSecondTime] = useState(오후참여);
  const user = localStorage.getItem("userId");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = year + "-" + month + "-" + day;

  const handleActivateBtn = () => {
    return user === userId;
  };

  const updateSurveyData = async () => {
    try {
      const collectionRef = doc(db, "survey", today);
      const docSnapshot = await getDoc(collectionRef);
      if (docSnapshot.exists()) {
        await updateDoc(collectionRef, { arr: JSON.stringify(allData) });
      } else {
        // 문서가 없으면 새로운 문서를 생성하여 데이터를 추가합니다.
        await setDoc(collectionRef, { arr: JSON.stringify(allData) });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleChangeSelect = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "오전참여") {
      setFirstTime(value);
      allData[idx].오전참여 = value;
    }
    if (name === "오후참여") {
      setSecondTime(value);
      allData[idx].오후참여 = value;
    }
    updateSurveyData();
  };

  return (
    <>
      <div>{userId}</div>
      <div>{username}</div>
      <label htmlFor="오전참여">오전참여</label>
      <select
        id="오전참여"
        name="오전참여"
        onChange={handleChangeSelect}
        disabled={!handleActivateBtn()}
      >
        <option value="true">참여</option>
        <option value="false">불참여</option>
      </select>
      <label htmlFor="오후참여">오후참여</label>
      <select
        id="오후참여"
        name="오후참여"
        onChange={handleChangeSelect}
        disabled={!handleActivateBtn()}
      >
        <option value="true">참여</option>
        <option value="false">불참여</option>
      </select>
    </>
  );
}
