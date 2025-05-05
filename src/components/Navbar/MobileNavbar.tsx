import Hamburger from "@/components/Navbar/Hamburger";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MobileNavbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleBox() {
    setIsOpen(!isOpen);
  }

  return (
    <header className="bg-bm-red flex items-center justify-between p-4 text-white shadow">
      <div className="text-lg font-bold">출석췤</div>
      <Hamburger isOpen={isOpen} handleBox={handleBox} />
      {isOpen ? (
        <div className="absolute top-15 right-0 rounded-xl border-2 bg-white text-black">
          <button className="p-1 pr-2 pl-2" onClick={() => navigate("/login")}>
            로그인/회원가입
          </button>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
