import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import UserList from "@/components/User/UserList";
import { useState, useEffect } from "react";
import styled from "styled-components";

interface UserData {
  userId: string;
  username: string;
  오전참여: boolean;
  오후참여: boolean;
}

export default function Survey() {
  const { day }: { day?: string } = useParams();
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!day) return;
      const collectionRef = doc(db, "survey", day);
      const docSnapshot = await getDoc(collectionRef);
      if (docSnapshot.exists()) {
        const arr: UserData[] = JSON.parse(docSnapshot.data().arr);
        setData(arr);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Topbar />
      <SurveyDate>{day}</SurveyDate>
      <Title>참여 여부 조사</Title>
      <Wrap>
        {data.length !== 0 ? (
          data.map((userData, i) => {
            return <UserList allData={data} data={userData} idx={i} key={i} />;
          })
        ) : (
          <p>참여 여부 조사 페이지가 아직 생성되지 않았습니다.</p>
        )}
      </Wrap>
      <Navbar />
    </>
  );
}

const SurveyDate = styled.div`
  margin-top: 30px;
  font-size: 30px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
