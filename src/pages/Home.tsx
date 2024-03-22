import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import styled from "styled-components";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  setDoc,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const dateToday = new Date();
  const yearToday = dateToday.getFullYear();
  const monthToday = dateToday.getMonth() + 1;
  const dayToday = dateToday.getDate();
  const today = yearToday + "-" + monthToday + "-" + dayToday;
  const hours = dateToday.getHours();
  const minutes = dateToday.getMinutes();

  const dateTomo = new Date(dateToday.setDate(dateToday.getDate() + 1));
  const yearTomo = dateTomo.getFullYear();
  const monthTomo = dateTomo.getMonth() + 1;
  const dayTomo = dateTomo.getDate();
  const tomorrow = yearTomo + "-" + monthTomo + "-" + dayTomo;

  const [data, setData] = useState([]);
  const user = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = doc(db, "survey", today);
      const docSnapshot = await getDoc(collectionRef);
      JSON.parse(docSnapshot.data().arr).forEach((v, i) => {
        if (user === v.userId) setData(v);
      });
    };
    fetchData();
  }, []);

  const handleActivateBtn = (time) => {
    if (time === "오전" && data?.오전참여 === true) return true;
    if (time === "오후" && data?.오후참여 === true) return true;
    return false;
  };

  const check = (e) => {
    let state = "";
    const time = e.target.name;
    if (time == "오전") {
      if ((hours == 8 && minutes >= 55) || (hours == 9 && minutes <= 5)) {
        state = "오전출석";
        alert("출석하였습니다");
      } else if (
        (hours == 9 && minutes > 5) ||
        (hours == 10 && minutes <= 30)
      ) {
        state = "지각";
        alert("지각하였습니다.");
      } else if ((hours == 8 && minutes < 55) || hours < 8)
        alert("출석체크시간이 아닙니다.");
      else {
        state = "결석";
        alert("결석하였습니다.");
      }
    }
    if (time == "오후") {
      if ((hours == 12 && minutes >= 55) || (hours == 13 && minutes <= 5)) {
        state = "오후출석";
        alert("출석체크되었습니다.");
      } else if (
        (hours == 13 && minutes > 5) ||
        (hours == 14 && minutes <= 30)
      ) {
        state = "지각";
        alert("지각하였습니다.");
      } else if ((hours == 12 && minutes < 55) || hours < 12)
        alert("출석체크시간이 아닙니다.");
      else {
        state = "결석";
        alert("결석하였습니다.");
      }
    }
    if (state) {
      checkData(state); // 변경된 state 값으로 checkData 함수 호출
      addMyCheck(today, time, state);
    }
  };

  const checkData = async (state) => {
    const q = query(collection(db, "users"), where("userId", "==", user));
    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
      const userRef = doc.ref;
      await updateDoc(userRef, {
        [state]: increment(1),
      });
    }
  };

  const addMyCheck = async (today, time, state) => {
    try {
      const collectionRef = doc(db, "calendar", user);
      const docSnapshot = await getDoc(collectionRef);
      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();
        const existingString = existingData[today];
        const updatedString = existingString + "," + time + ":" + state;
        if (existingString == undefined) {
          await updateDoc(collectionRef, { [today]: time + ":" + state });
        } else {
          await updateDoc(collectionRef, { [today]: updatedString });
        }
      } else {
        // 문서가 없으면 새로운 문서를 생성하여 데이터를 추가합니다.
        await setDoc(collectionRef, { [today]: time + ":" + state });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <Topbar />
      <Title>출석체크</Title>
      <Wrap>
        <CheckBox>
          <span>오전(출석)</span>
          <p>9:00 ~ 12:00</p>
          <CheckButton
            name="오전"
            disabled={!handleActivateBtn("오전")}
            onClick={check}
          >
            Check
          </CheckButton>
        </CheckBox>
        <CheckBox>
          <span>오후(출석)</span>
          <p>13:00 ~ 16:00</p>
          <CheckButton
            name="오후"
            disabled={!handleActivateBtn("오후")}
            onClick={check}
          >
            Check
          </CheckButton>
        </CheckBox>
      </Wrap>
      <button
        onClick={() => {
          navigate(`/survey/${tomorrow}`);
        }}
      >
        참석 여부 체크하러 가기
      </button>
      <Navbar />
    </>
  );
}

const Title = styled.h2`
  font-size: 30px;
  text-align: center;
  margin-top: 30px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckButton = styled.button`
  width: 180px;
  height: 80px;
  color: white;
  font-size: 25px;
  background-color: #ff4948;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border-radius: 10px;
  margin-top: 10px;
`;
