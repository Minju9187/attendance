import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import MiniCalendar from "@/components/Calendar/MiniCalendar";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Calendar() {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = doc(db, "calendar", userId);
      const docSnapshot = await getDoc(collectionRef);

      setData({ ...docSnapshot.data() });
    };
    fetchData();
  }, []);

  return (
    <>
      <Topbar />
      <MiniCalendar data={data} />
      <Navbar />
    </>
  );
}
