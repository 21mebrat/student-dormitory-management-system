import React, { useState, useEffect } from "react";
import './theme.css';

const ThemeChanger = () => {
  const [theme, setTheme] = useState("light");

  // Load theme from local storage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme; // Apply theme to the body element
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme; 
  };

  return (
    <div className={`theme-changer ${theme}`}>
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeChanger;
