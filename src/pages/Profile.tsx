import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, where, getDocs, query } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Topbar from "@/components/Topbar/Topbar";
import Navbar from "@/components/Navbar/Navbar";

export default function Profile() {
  const { uid } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
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
        });
      });
    };

    fetchData();
  }, []);
  return (
    <>
      <Topbar />
      <div>{userData?.userId}</div>
      <div>{userData?.username}</div>
      <div>{userData?.resolution}</div>
      <div>{userData?.오전출석}</div>
      <div>{userData?.오후출석}</div>
      <div>{userData?.지각}</div>
      <div>{userData?.결석}</div>
      <Navbar />
    </>
  );
}
