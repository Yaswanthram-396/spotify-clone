"use client";
import React from "react";

const Loading_screen = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  gap: "24px",
};
const Loading_screen_p = {
  fontSize: "24px",
  fontWeight: "600",
};

const Loading = () => {
  return (
    <div style={Loading_screen}>
      <img src="/music.png" alt="Loading..." width={150} height={100} />
      <p style={Loading_screen_p}>Loading...</p>
    </div>
  );
};

export default Loading;
