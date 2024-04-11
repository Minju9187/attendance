import { ChangeEvent, useState } from "react";
import { db } from "../../firebase";
import { getDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";

interface UserData {
  userId: string;
  username: string;
  오전참여: boolean;
  오후참여: boolean;
}

interface UserListProps {
  allData: UserData[];
  data: UserData;
  idx: number;
}

export default function UserList({ allData, data, idx }: UserListProps) {
  const { userId, username, 오전참여, 오후참여 } = data;
  const [firstTime, setFirstTime] = useState<boolean>(오전참여);
  const [secondTime, setSecondTime] = useState<boolean>(오후참여);
  const user = localStorage.getItem("userId");
  const dateToday = new Date();
  const dateTomo = new Date(dateToday.setDate(dateToday.getDate() + 1));
  const yearTomo = dateTomo.getFullYear();
  const monthTomo = String(dateTomo.getMonth() + 1).padStart(2, "0");
  const dayTomo = String(dateTomo.getDate()).padStart(2, "0");
  const tomorrow = yearTomo + "-" + monthTomo + "-" + dayTomo;

  const handleActivateBtn = (): boolean => {
    return user === userId;
  };

  const updateSurveyData = async (): Promise<void> => {
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

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const {
      target: { name, value },
    } = event;
    if (name === "오전참여") {
      setFirstTime(value === "true");
      allData[idx].오전참여 = value === "true";
    }
    if (name === "오후참여") {
      setSecondTime(value === "true");
      allData[idx].오후참여 = value === "true";
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
            value={String(firstTime)}
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
            value={String(secondTime)}
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
