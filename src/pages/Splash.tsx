import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 3000);

    return () => clearTimeout(timer);
  });

  return <div>Splash</div>;
}
