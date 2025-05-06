import { Link, useLocation } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { LuTimer } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

export default function MobileTabBar() {
  const location = useLocation();
  const uid = window.localStorage.getItem("userId");
  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="fixed bottom-0 flex w-full justify-around border-t bg-white p-3">
      <Link to="/" className={"flex flex-grow justify-center"}>
        <IoHomeSharp
          size={20}
          className={`${isActive("/") ? "text-bm-red" : "text-gray-400"}`}
        />
      </Link>
      <Link to="/study" className="flex flex-grow justify-center">
        <GrGroup
          size={20}
          className={`${isActive("/study") ? "text-bm-red" : "text-gray-400"}`}
        />
      </Link>
      <Link to="/record" className="flex flex-grow justify-center">
        <LuTimer
          size={20}
          className={`${isActive("/record") ? "text-bm-red" : "text-gray-400"}`}
        />
      </Link>
      <Link to="/todos" className="flex flex-grow justify-center">
        <FaRegCalendarCheck
          size={20}
          className={`${isActive("/todos") ? "text-bm-red" : "text-gray-400"}`}
        />
      </Link>
      <Link to={`/profile/${uid}`} className="flex flex-grow justify-center">
        <IoPerson
          size={20}
          className={`${isActive(`/profile/${uid}`) ? "text-bm-red" : "text-gray-400"}`}
        />
      </Link>
    </nav>
  );
}
