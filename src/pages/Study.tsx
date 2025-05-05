import Button from "@/components/Common/Button";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";

export default function Study() {
  const [myStudies, setMyStudies] = useState([{}, {}, {}, {}, {}, {}, {}]);

  return (
    <div className="relative">
      <h2 className="sr-only mb-5 text-center">참여중인 스터디</h2>
      <div className="flex flex-col gap-2">
        {myStudies.length ? (
          myStudies.map(() => (
            <div className="rounded-2xl border-2 border-gray-300 p-4">
              <div className="mb-1 flex justify-between">
                <h3 className="text-xl">이러나삼</h3>
                <IoMdSettings size={20} className="cursor-pointer" />
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-gray-500">2025/05/12 - 2025/07/21</span>
                  <span className="text-gray-500">09:00 - 12:00</span>
                </div>
                <span>공개</span>
              </div>
            </div>
          ))
        ) : (
          <>
            <p>참여중인 스터디가 없습니다.</p>
            <Button>스터디 참여하러 가기</Button>
          </>
        )}
      </div>
    </div>
  );
}
