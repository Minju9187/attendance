import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Splash from "@/pages/Splash";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import SetProfile from "@/pages/SetProfile";
import Check from "@/pages/Check";
import Survey from "@/pages/Survey";
import Profile from "@/pages/Profile";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/setprofile" element={<SetProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/survey/:postId" element={<Survey />} />
        <Route path="/check/:id" element={<Check />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </>
  );
}
