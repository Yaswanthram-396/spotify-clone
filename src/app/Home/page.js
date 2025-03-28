"use client";

import React from "react";
import Sidebar from "../_components/sidebar";
import SideContent from "../_components/sideContent";
import "./index.css";
const Homepage = () => {
  return (
    <div className="home-container">
      {/* // style={{ display: "flex", gap: "2%", backgroundColor: "#181818" }}. */}

      <Sidebar />
      <SideContent />
    </div>
  );
};

export default Homepage;
