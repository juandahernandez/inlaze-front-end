"use client";
import { useSelector } from "react-redux";
import HomePage from "../components/Home/Home";
import { RootState } from "./store";

export default function Home() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);
  return (
    <div
      style={{
        background: darkMode ? "black" : "grey",
      }}
    >
      <HomePage />
    </div>
  );
}
