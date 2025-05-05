import MobileNavbar from "@/components/Navbar/MobileNavbar";
import MobileTabBar from "@/components/Navbar/MobileTabBar";
import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <MobileNavbar />
        <main className="flex-grow p-4 pb-12">
          <Outlet />
        </main>
        <MobileTabBar />
      </div>
    </>
  );
}
