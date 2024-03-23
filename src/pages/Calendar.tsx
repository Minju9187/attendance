import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import MiniCalendar from "@/components/MiniCalendar";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Calendar() {
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = doc(db, "calendar", userId);
      const docSnapshot = await getDoc(collectionRef);

      console.log(docSnapshot.data());
    };
    fetchData();
  }, []);
  return (
    <>
      <Topbar />
      <MiniCalendar />
      <Navbar />
    </>
  );
}
