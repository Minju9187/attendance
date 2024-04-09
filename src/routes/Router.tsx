import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect } from "react";
import Splash from "@/pages/Splash";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Survey from "@/pages/Survey";
import Profile from "@/pages/Profile";
import Calendar from "@/pages/Calendar";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/signin" element={<SignIn />} />
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
        />
      </Routes>
    </>
  );
}
