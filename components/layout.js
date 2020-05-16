import React, { useState, useEffect } from "react";

import styles from "./layout.module.css";

function Layout({ children }) {
  const [isDarkMode, setDarkMode] = useState(true);
  useEffect(() => {
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(userPrefersDark);
  }, []);
  return (
    <div className={styles.wrapper} data-theme={isDarkMode ? "dark" : null}>
      <div className={styles.switcher} onClick={() => setDarkMode(!isDarkMode)}>
        {isDarkMode ? "🌝" : "🌚"}
      </div>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default Layout;
