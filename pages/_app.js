import "../styles/global.css";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [isDarkMode, setDarkMode] = useState(null);
  const handleSwitch = (value) => {
    localStorage.setItem("darkTheme", value);
    setDarkMode(value);
  };
  useEffect(() => {
    const userPref = localStorage.getItem("darkTheme");
    const systemPref =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (userPref === null) {
      setDarkMode(systemPref);
    } else {
      setDarkMode(userPref);
    }
  }, []);
  return (
    <div data-theme={isDarkMode ? "dark" : null}>
      <div className="switcher" onClick={() => handleSwitch(!isDarkMode)}>
        {isDarkMode ? "🌝" : "🌚"}
      </div>
      <Component {...pageProps} />
    </div>
  );
}
