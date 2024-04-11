import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import MiniCalendar from "@/components/Calendar/MiniCalendar";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { DocumentSnapshot, doc, getDoc } from "firebase/firestore";

interface CalendarData {
  [key: string]: string;
}

export default function Calendar() {
  const userId: string | null = localStorage.getItem("userId");
  const [data, setData] = useState<CalendarData>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const collectionRef = doc(db, "calendar", userId);
      const docSnapshot: DocumentSnapshot = await getDoc(collectionRef);

      setData({ ...docSnapshot.data() } as CalendarData);
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
