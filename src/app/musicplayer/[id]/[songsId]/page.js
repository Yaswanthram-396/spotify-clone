"use client";

import React from "react";
import Sidebar from "@/app/_components/sidebar";
import "./index.css";
import MusicPlayer from "@/app/_components/musicplayer";
const Homepage = () => {
  return (
    <div className="home-container">
      {/* // style={{ display: "flex", gap: "2%", backgroundColor: "#181818" }}. */}

      <Sidebar />
      <MusicPlayer />
    </div>
  );
};

export default Homepage;
