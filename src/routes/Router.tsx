import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import Splash from "@/pages/Splash";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Survey from "@/pages/Survey";
import Profile from "@/pages/Profile";
import Calendar from "@/pages/Calendar";

export default function Router() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/survey/:day"
          element={user ? <Survey /> : <Navigate to="/signin" />}
        />
        <Route
          path="/calendar/:uid"
          element={user ? <Calendar /> : <Navigate to="/signin" />}
        />
        <Route
          path="/profile/:uid"
          element={user ? <Profile /> : <Navigate to="/signin" />}
        />
      </Routes>
    </>
  );
}
