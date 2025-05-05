import { useState } from "react";

export default function Hamburger({ isOpen, handleBox }) {
  return (
    <button
      className="menu-trigger relative flex h-7 w-8 flex-col items-center justify-between space-y-2"
      onClick={handleBox}
    >
      <span
        className={`block h-1 w-full rounded bg-white transition-all duration-300 ${
          isOpen ? "absolute top-3 rotate-45" : ""
        }`}
      ></span>
      <span
        className={`block h-1 w-full rounded bg-white transition-opacity duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      ></span>
      <span
        className={`block h-1 w-full rounded bg-white transition-all duration-300 ${
          isOpen ? "absolute top-3 -rotate-45" : ""
        }`}
      ></span>
    </button>
  );
}
