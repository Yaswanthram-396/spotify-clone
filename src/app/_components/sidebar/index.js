import React, { useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";

const Sidebar = () => {
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="sidebar-container">
      <div>
        <img className="sidebar-logo" src="/music.png" alt="spotify" />
      </div>
      <div className="logout-container">
        <img src="./log-out-04.svg" className="logout-icon" alt="spotify" />
        <div>Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
