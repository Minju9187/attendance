import React from "react";
import { Routes, Route } from "react-router-dom";
import Splash from "@/pages/Splash";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import SetProfile from "@/pages/SetProfile";
import Survey from "@/pages/Survey";
import Profile from "@/pages/Profile";
import Calendar from "@/pages/Calendar";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/setprofile" element={<SetProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/survey/:day" element={<Survey />} />
        <Route path="/calendar/:uid" element={<Calendar />} />
        <Route path="/profile/:uid" element={<Profile />} />
      </Routes>
    </>
  );
}
