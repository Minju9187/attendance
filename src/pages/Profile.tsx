import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  where,
  getDocs,
  query,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import Topbar from "@/components/Topbar/Topbar";
import Navbar from "@/components/Navbar/Navbar";
import styled from "styled-components";

export default function Profile() {
  const { uid } = useParams();
  const [userData, setUserData] = useState({});
  const dateToday = new Date();
  const date = new Date(dateToday.setDate(dateToday.getDate() + 1));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const tomorrow = year + "-" + month + "-" + day;

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const {
          userId,
          email,
          username,
          resolution,
          오전출석,
          오후출석,
          지각,
          결석,
          isManager,
        } = doc.data();
        setUserData({
          userId: userId,
          email: email,
          username: username,
          resolution: resolution,
          오전출석: 오전출석,
          오후출석: 오후출석,
          지각: 지각,
          결석: 결석,
          isManager: isManager,
        });
      });
    };

    fetchData();
  }, []);

  const addSurvey = async () => {
    const q1 = query(collection(db, "users"));
    const querySnapshot = await getDocs(q1);
    const arr = [];
    querySnapshot.forEach((doc) => {
      arr.push({
        userId: doc.data().userId,
        username: doc.data().username,
        오전참여: true,
        오후참여: true,
      });
    });
    const data = { arr: JSON.stringify(arr) };
    try {
      const collectionRef = doc(db, "survey", tomorrow);
      const docSnapshot = await getDoc(collectionRef);
      if (docSnapshot.exists()) {
        await updateDoc(collectionRef, data);
      } else {
        // 문서가 없으면 새로운 문서를 생성하여 데이터를 추가합니다.
        await setDoc(collectionRef, data);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <Topbar />
      <InfoWrap>
        <Img src="" alt="캐릭터" />
        <Name>{userData?.username}</Name>
        <Resol>{userData?.resolution}</Resol>
      </InfoWrap>
      <GripWrap>
        <Box1>
          <span>오전(출석)</span>
          <Cnt>{userData?.오전출석}</Cnt>
        </Box1>
        <Box2>
          <span>오후(출석)</span>
          <Cnt>{userData?.오후출석}</Cnt>
        </Box2>
        <Box3>
          <span>지각</span>
          <Cnt>{userData?.지각}</Cnt>
        </Box3>
        <Box4>
          <span>결석</span>
          <Cnt>{userData?.결석}</Cnt>
        </Box4>
      </GripWrap>
      {userData?.isManager ? <button onClick={addSurvey}>추가</button> : <>/</>}
      <Navbar />
    </>
  );
}

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f5f5f5;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
`;
const Resol = styled.div``;

const GripWrap = styled.div`
  display: grid;
  grid-template-areas: "a b" "c d";
  gap: 5px;
  padding: 10px;
`;

const Box1 = styled.div`
  grid-area: a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const Box2 = styled.div`
  grid-area: b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const Box3 = styled.div`
  grid-area: c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const Box4 = styled.div`
  grid-area: d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const Cnt = styled.span`
  color: #ff4948;
`;
