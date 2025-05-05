export default function MyPage() {
  return (
    <div>
      <div className="flex gap-5">
        <h3 className="sr-only">프로필</h3>
        <div className="h-16 w-16 rounded-full bg-blue-400"></div>
        <div className="flex flex-col justify-center">
          <div className="text-2xl font-bold">강민주</div>
          <div className="flex gap-3">
            <div className="flex gap-1">
              <div>팔로잉</div>
              <span>25</span>
            </div>
            <div className="flex gap-1">
              <div>팔로워</div>
              <span>10</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-bold">공부 현황</h3>
        <div className="flex justify-between rounded-xl p-2 text-center shadow-2xl">
          <div className="flex-1">
            <span>10000</span>
            <div className="text-xs font-bold text-gray-400">누적</div>
          </div>
          <div className="mx-2 w-px bg-gray-300" />
          <div className="flex-1">
            <span>10</span>:<span>20</span>
            <div className="text-xs font-bold text-gray-400">이번 주</div>
          </div>
          <div className="mx-2 w-px bg-gray-300" />
          <div className="flex-1">
            <span>10</span>:<span>20</span>
            <div className="text-xs font-bold text-gray-400">이번 달</div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mt-5 font-bold">스터디 현황</h3>
        <div className="flex justify-between rounded-xl p-2 text-center shadow-2xl">
          <div className="flex-1">
            <span>2</span>
            <div className="text-xs font-bold text-gray-400">참여 중</div>
          </div>
          <div className="mx-2 w-px bg-gray-300" />
          <div className="flex-1">
            <span>5</span>
            <div className="text-xs font-bold text-gray-400">완료</div>
          </div>
        </div>
      </div>
    </div>
  );
}
