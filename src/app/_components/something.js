import React from "react";
import "./something.css";

const Something = () => {
  const handleReload = () => {
    window.location.reload(); // Reloads the current tab
  };

  return (
    <div className="something-container">
      <div>
        <img
          src="/Icon.png"
          alt="spotify"
          className="something-container-img"
        />
        <p>Something Went Wrong Please Try Again</p>
        <button onClick={handleReload}>Try Again</button>
      </div>
    </div>
  );
};

export default Something;
