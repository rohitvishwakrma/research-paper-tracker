import React, { useEffect, useRef } from "react";
import "../App.css";


const Settings = ({ isLoggedIn, onLogin, onLogout, onGoLibrary }) => {
  const logoutBtnRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn && logoutBtnRef.current) {
      logoutBtnRef.current.focus();
    }
  }, [isLoggedIn]);

  return (
    <div className="settings centered-header">
      <h2>Settings</h2>
      <div style={{ margin: "2rem auto", display: "flex", flexDirection: "row", gap: "1.5rem", alignItems: "center" }}>
        <button className="btn btn-secondary" style={{ minWidth: 180 }} onClick={onLogout} ref={logoutBtnRef}>
          Logout
        </button>
        <button className="btn btn-primary" style={{ minWidth: 180 }} onClick={onGoLibrary}>
          Go to Paper Library
        </button>
      </div>
    </div>
  );
};

export default Settings;
