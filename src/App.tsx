import { useEffect } from "react";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Auth from "./components/Auth";
import Todo from "./components/Todo";
import FileUpload from "./components/FileUpload";

const App = () => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);

  return (
    <div className="App">
      <Auth />
      <Todo />
      <FileUpload />
    </div>
  );
};

export default App;
