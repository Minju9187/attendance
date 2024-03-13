import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import UserList from "@/components/UserList";
import React, { useState, useEffect } from "react";

export default function Survey() {
  const date = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = doc(db, "survey", date.day);
      const docSnapshot = await getDoc(collectionRef);
      setData(JSON.parse(docSnapshot.data().arr));
    };
    fetchData();
  }, []);

  return (
    <>
      <Topbar />
      {data.length !== 0 ? (
        data.map((userData, i) => {
          return <UserList allData={data} data={userData} idx={i} key={i} />;
        })
      ) : (
        <p>참여 여부 조사 페이지가 아직 생성되지 않았습니다.</p>
      )}
      <Navbar />
    </>
  );
}
