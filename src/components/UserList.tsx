import { useState } from "react";
import { db } from "../firebase";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";

export default function UserList({ allData, data, idx }) {
  const { userId, username, 오전참여, 오후참여 } = data;
  const [firstTime, setFirstTime] = useState(오전참여);
  const [secondTime, setSecondTime] = useState(오후참여);
  const user = localStorage.getItem("userId");
  const dateToday = new Date();
  const dateTomo = new Date(dateToday.setDate(dateToday.getDate() + 1));
  const yearTomo = dateTomo.getFullYear();
  const monthTomo = String(dateTomo.getMonth() + 1).padStart(2, "0");
  const dayTomo = String(dateTomo.getDate()).padStart(2, "0");
  const tomorrow = yearTomo + "-" + monthTomo + "-" + dayTomo;

  const handleActivateBtn = () => {
    return user === userId;
  };

  const updateSurveyData = async () => {
    try {
      const collectionRef = doc(db, "survey", tomorrow);
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
      <UserInfo>
        <InfoName>{username}</InfoName>
        <div>
          <label htmlFor="오전참여">오전 : </label>
          <select
            id="오전참여"
            name="오전참여"
            onChange={handleChangeSelect}
            disabled={!handleActivateBtn()}
            value={firstTime}
          >
            <option value="true">참여</option>
            <option value="false">불참여</option>
          </select>
        </div>
        <div>
          <label htmlFor="오후참여">오후 : </label>
          <select
            id="오후참여"
            name="오후참여"
            onChange={handleChangeSelect}
            disabled={!handleActivateBtn()}
            value={secondTime}
          >
            <option value="true">참여</option>
            <option value="false">불참여</option>
          </select>
        </div>
      </UserInfo>
    </>
  );
}

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 156px;
  height: 120px;
`;

const InfoName = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;
