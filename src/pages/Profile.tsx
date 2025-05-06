import Spinner from "@/components/Common/Spinner";
import { db } from "@/firebase";
import { UserData } from "@/types/types";
import {
  extractHoursFromMinutes,
  extractTimeFromMinutes,
} from "@/utils/extractTime";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { uid } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uid) fetchUserData();
  }, [uid]);

  async function fetchUserData() {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("사용자를 찾을 수 없습니다.");
        setUserData(null);
        return;
      }

      const docData = querySnapshot.docs[0].data() as UserData;

      setUserData(docData);
    } catch (error) {
      console.error("사용자 데이터를 가져오는 중 오류 발생", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  if (!userData) {
    return <div>사용자 데이터를 찾을 수 없습니다.</div>;
  }

  const weekHours = extractTimeFromMinutes(userData?.totalWeekStudyTime).hours;
  const weekMinutes = extractTimeFromMinutes(
    userData?.totalWeekStudyTime,
  ).minutes;
  const monthHours = extractTimeFromMinutes(
    userData?.totalMonthStudyTime,
  ).hours;
  const monthMinutes = extractTimeFromMinutes(
    userData?.totalMonthStudyTime,
  ).minutes;

  return (
    <div>
      <div className="flex gap-5">
        <h3 className="sr-only">프로필</h3>
        <div className="h-20 w-20 overflow-hidden rounded-full border">
          <img
            src={userData?.image || "/default/default-profile.png"}
            className="h-full w-full scale-150 object-cover"
            alt={`${userData?.username} 이미지`}
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-2xl font-bold">{userData?.username}</div>
          <div className="text-sm text-gray-500">{userData?.email}</div>
          <div className="flex gap-3 text-sm">
            <div className="flex gap-1">
              <div>팔로잉</div>
              <span>{userData?.following.length}</span>
            </div>
            <div className="flex gap-1">
              <div>팔로워</div>
              <span>{userData?.follower.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="mb-1 font-bold">공부 현황</h3>
        <div className="flex justify-between rounded-xl p-2 text-center shadow-2xl">
          <div className="flex-1">
            <span>{extractHoursFromMinutes(userData?.totalStudyTime)}</span>
            <div className="text-xs font-bold text-gray-400">누적</div>
          </div>
          <div className="mx-2 w-px bg-gray-300" />
          <div className="flex-1">
            <span>{monthHours}</span>:<span>{monthMinutes}</span>
            <div className="text-xs font-bold text-gray-400">이번 달</div>
          </div>
          <div className="mx-2 w-px bg-gray-300" />
          <div className="flex-1">
            <span>{weekHours}</span>:<span>{weekMinutes}</span>
            <div className="text-xs font-bold text-gray-400">이번 주</div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mt-5 mb-1 font-bold">스터디 현황</h3>
        <div className="flex justify-between rounded-xl p-2 text-center shadow-2xl">
          <div className="flex-1">
            <span>{userData?.activeStudy}</span>
            <div className="text-xs font-bold text-gray-400">참여 중</div>
          </div>
          <div className="mx-2 w-px bg-gray-300" />
          <div className="flex-1">
            <span>{userData?.completedStudy}</span>
            <div className="text-xs font-bold text-gray-400">완료</div>
          </div>
        </div>
      </div>
    </div>
  );
}
