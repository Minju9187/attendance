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
import { today, tomorrow } from "@/components/Common/date";

interface UserData {
  userId: string;
  username: string;
  오전참여: boolean;
  오후참여: boolean;
}

export default function Home() {
  const navigate = useNavigate();
  const dateToday = new Date();
  const hours = dateToday.getHours();
  const minutes = dateToday.getMinutes();

  const [data, setData] = useState<UserData | null>(null);
  const user = localStorage.getItem("userId");

  const [isMorningChecked, setIsMorningChecked] = useState(
    localStorage.getItem(today + "Morning") === "true"
  );
  const [isAfternoonChecked, setIsAfternoonChecked] = useState(
    localStorage.getItem(today + "Afternoon") === "true"
  );

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = doc(db, "survey", today);
      const docSnapshot = await getDoc(collectionRef);
      if (docSnapshot.exists()) {
        JSON.parse(docSnapshot.data().arr).forEach((v: UserData) => {
          if (user === v.userId) setData(v);
        });
      } else {
        console.error("문서가 존재하지 않습니다.");
      }
    };
    fetchData();
  }, []);

  const handleActivateBtn = (time: "오전" | "오후") => {
    if (data && (time === "오전" ? data.오전참여 : data.오후참여)) return true;
    return false;
  };

  const handleCheck = (time: "오전" | "오후") => {
    let state = "";
    if (time == "오전") {
      if ((hours == 8 && minutes >= 55) || (hours == 9 && minutes <= 5)) {
        state = "출석";
        alert("출석하였습니다");
        setIsMorningChecked(true);
        localStorage.setItem(today + "Morning", "true");
      } else if (
        (hours == 9 && minutes > 5) ||
        (hours == 10 && minutes <= 30)
      ) {
        state = "지각";
        alert("지각하였습니다.");
        localStorage.setItem(today + "Morning", "true");
        setIsMorningChecked(true);
      } else if ((hours == 8 && minutes < 55) || hours < 8)
        alert("출석체크시간이 아닙니다.");
      else {
        state = "결석";
        alert("결석하였습니다.");
        localStorage.setItem(today + "Morning", "true");
        setIsMorningChecked(true);
      }
    }
    if (time == "오후") {
      if ((hours == 12 && minutes >= 55) || (hours == 13 && minutes <= 5)) {
        state = "출석";
        alert("출석체크되었습니다.");
        localStorage.setItem(today + "Afternoon", "true");
        setIsAfternoonChecked(true);
      } else if (
        (hours == 13 && minutes > 5) ||
        (hours == 14 && minutes <= 30)
      ) {
        state = "지각";
        alert("지각하였습니다.");
        localStorage.setItem(today + "Afternoon", "true");
        setIsAfternoonChecked(true);
      } else if ((hours == 12 && minutes < 55) || hours < 12)
        alert("출석체크시간이 아닙니다.");
      else {
        state = "결석";
        alert("결석하였습니다.");
        localStorage.setItem(today + "Afternoon", "true");
        setIsAfternoonChecked(true);
      }
    }
    if (state) {
      checkData(state); // 변경된 state 값으로 checkData 함수 호출
      addMyCheck(today, time, state);
    }
  };

  const checkData = async (state: string): Promise<void> => {
    const q = query(collection(db, "users"), where("userId", "==", user));
    const querySnapshot = await getDocs(q);
    for (const doc of querySnapshot.docs) {
      const userRef = doc.ref;
      await updateDoc(userRef, {
        [state]: increment(1),
      });
    }
  };

  const addMyCheck = async (
    today: string,
    time: string,
    state: string
  ): Promise<void> => {
    try {
      if (!user) return;
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
          <Span>오전(출석)</Span>
          <p>9:00 ~ 12:00</p>
          <CheckButton
            name="오전"
            disabled={!handleActivateBtn("오전") || isMorningChecked}
            onClick={() => handleCheck("오전")}
          >
            Check
          </CheckButton>
        </CheckBox>
        <CheckBox>
          <Span>오후(출석)</Span>
          <p>13:00 ~ 16:00</p>
          <CheckButton
            name="오후"
            disabled={!handleActivateBtn("오후") || isAfternoonChecked}
            onClick={() => handleCheck("오후")}
          >
            Check
          </CheckButton>
        </CheckBox>
      </Wrap>
      <Button
        onClick={() => {
          navigate(`/survey/${tomorrow}`);
        }}
      >
        참석 여부 체크하러 가기
      </Button>
      <Navbar />
    </>
  );
}

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-top: 30px;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  font-size: 14px;
`;

const CheckButton = styled.button`
  width: 156px;
  height: 60px;
  color: white;
  font-size: 25px;
  background-color: #ff4948;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  border-radius: 20px;
  margin-top: 10px;
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
  margin: 10px auto;
`;
