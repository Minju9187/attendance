import { Routes, Route } from "react-router-dom";
import MobileLayout from "../layouts/MobileLayout";
import Home from "@/pages/Home";
import Study from "@/pages/Study";
import Record from "@/pages/Record";
import Todos from "@/pages/Todos";
import MyPage from "@/pages/MyPage";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
// import Home from "@/pages/Home";
// import SignIn from "@/pages/SignIn";
// import SignUp from "@/pages/SignUp";
// import Survey from "@/pages/Survey";
// import Profile from "@/pages/Profile";
// import Calendar from "@/pages/Calendar";
// import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <>
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<Study />} />
          <Route path="/record" element={<Record />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/survey/:day"
            element={
              <ProtectedRoute>
                <Survey />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar/:uid"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:uid"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          /> */}
      </Routes>
    </>
  );
}
