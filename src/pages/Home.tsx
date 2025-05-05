import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function Home() {
  const [text, setText] = useState("");
  const [studyArr, setStudyArr] = useState([]);
  const [weeklyTodos, setWeeklyTodos] = useState([]);
  const [todayTodos, setTodayTodos] = useState([]);

  return (
    <>
      <form
        className="flex w-full items-center justify-center gap-2 rounded-4xl border-2 p-2 pr-5 pl-5"
        onSubmit={() => console.log("제출")}
      >
        <Input
          type="text"
          value={text}
          placeholder="스터디 또는 스터디원을 입력하세요"
          variant="none"
          onChange={(e) => setText(e.target.value)}
        ></Input>
        <IoSearchSharp
          size={30}
          onClick={() => {
            console.log(text);
            setText("");
          }}
        />
      </form>
      <div className="mt-5 rounded-2xl border-2 border-gray-300 p-4">
        <h2>오늘 참여할 스터디</h2>
        <div>
          {studyArr.length ? (
            studyArr.map(() => <p>스터디</p>)
          ) : (
            <>
              <p>참여중인 스터디가 없습니다.</p>
              <Button>스터디 참여하러가기</Button>
            </>
          )}
        </div>
      </div>
      <div className="mt-5 rounded-2xl border-2 border-gray-300 p-4">
        <h2>해야할 일</h2>
        <h3>이번 주 할 일</h3>
        <div>
          {weeklyTodos.length ? (
            weeklyTodos.map(() => <p>스터디</p>)
          ) : (
            <>
              <p>이번 주 할 일이 비어있습니다.</p>
              <Button>할 일 추가하러가기</Button>
            </>
          )}
        </div>
        <h3>오늘 할 일</h3>
        <div>
          {todayTodos.length ? (
            todayTodos.map(() => <p>스터디</p>)
          ) : (
            <>
              <p>오늘 할 일이 비어있습니다.</p>
              <Button>오늘 할 일 추가하러가기</Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
