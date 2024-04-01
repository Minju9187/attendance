import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import UserList from "@/components/UserList";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function Survey() {
  const date = useParams();
  const [data, setData] = useState([]);

  const dateToday = new Date();
  const dateTomo = new Date(dateToday.setDate(dateToday.getDate() + 1));
  const yearTomo = dateTomo.getFullYear();
  const monthTomo = String(dateTomo.getMonth() + 1).padStart(2, "0");
  const dayTomo = String(dateTomo.getDate()).padStart(2, "0");
  const tomorrow = yearTomo + "-" + monthTomo + "-" + dayTomo;

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = doc(db, "survey", date.day);
      const docSnapshot = await getDoc(collectionRef);
      setData(JSON.parse(docSnapshot.data().arr));
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <Topbar />
      <SurveyDate>{tomorrow}</SurveyDate>
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
