import Navbar from "@/components/Navbar/Navbar";
import Topbar from "@/components/Topbar/Topbar";
import MiniCalendar from "@/components/MiniCalendar";

export default function Calendar() {
  return (
    <>
      <Topbar />
      <MiniCalendar />
      <Navbar />
    </>
  );
}
