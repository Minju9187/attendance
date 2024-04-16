import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import MiniCalendar from "@/components/Calendar/MiniCalendar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { DocumentSnapshot, doc, getDoc } from "firebase/firestore";

interface CalendarData {
  [key: string]: string;
}

export default function Calendar() {
  const { uid }: { uid?: string } = useParams();
  const [data, setData] = useState<CalendarData>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return;
      const collectionRef = doc(db, "calendar", uid);
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
