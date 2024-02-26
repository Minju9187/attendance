import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SetProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const password = location.state.password;
  console.log(email, password);
  return (
    <>
      <h1>profile</h1>
    </>
  );
}
