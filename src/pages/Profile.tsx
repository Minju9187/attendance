import { useState, useEffect } from "react";
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
import { tomorrow } from "@/components/Common/date";

interface UserData {
  userId: string;
  email: string;
  username: string;
  resolution: string;
  오전출석: number;
  오후출석: number;
  지각: number;
  결석: number;
  isManager: boolean;
  active: boolean;
}

interface SurveyData {
  userId: string;
  username: string;
  오전참여: boolean;
  오후참여: boolean;
}

export default function Profile() {
  const { uid }: { uid?: string } = useParams();
  const [userData, setUserData] = useState<UserData>({
    userId: "",
    email: "",
    username: "",
    resolution: "",
    오전출석: 0,
    오후출석: 0,
    지각: 0,
    결석: 0,
    isManager: false,
    active: false,
  });

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
          active,
        } = doc.data() as UserData;
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
          active: active,
        });
      });
    };

    fetchData();
  }, []);

  const addSurvey = async () => {
    const q1 = query(collection(db, "users"));
    const querySnapshot = await getDocs(q1);
    const arr: SurveyData[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().active) {
        arr.push({
          userId: doc.data().userId,
          username: doc.data().username,
          오전참여: true,
          오후참여: false,
        });
      }
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
      {userData?.isManager ? (
        <Button onClick={addSurvey}>참석 여부 조사 추가</Button>
      ) : (
        <></>
      )}
      {!userData?.active ? (
        <NotAddStudy>
          아직 관리자가 스터디원으로 추가하지 않았습니다. <br />
          조금만 기다려주세요~!
        </NotAddStudy>
      ) : (
        <></>
      )}
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

const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
`;
const Resol = styled.div``;

const GripWrap = styled.div`
  display: grid;
  grid-template-areas: "a b" "c d";
  gap: 6px;
  padding: 30px;
`;

const Box1 = styled.div`
  grid-area: a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 15px;
`;

const Box2 = styled.div`
  grid-area: b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 15px;
`;

const Box3 = styled.div`
  grid-area: c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 15px;
`;

const Box4 = styled.div`
  grid-area: d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 15px;
`;

const Cnt = styled.span`
  color: #ff4948;
`;

const Button = styled.button`
  width: 322px;
  height: 44px;
  background-color: #ff4948;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  color: white;
  border-radius: 30px;
  font-weight: 500px;
  font-size: 14px;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const NotAddStudy = styled.p`
  text-align: center;
`;
