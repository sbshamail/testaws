"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCookie, setCookie } from "../action/function";

export const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: "light",
      toggleMode: () => {},
    };
  }
  return context;
};

const ThemeProvider = ({
  children,
  defaultTheme = "system",
  themeName = "mytheme",
}) => {
  const [theme, setTheme] = useState("light");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const themeClass = useCallback(
    (property) => {
      if (isClient) {
        const root = document.documentElement;
        root.classList.remove("dark", "light");
        root.classList.add(property);
        setTheme(property);
      }
    },
    [isClient]
  );

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await getCookie(themeName);
        if (response) {
          themeClass(response);
        } else if (defaultTheme !== "system") {
          themeClass(defaultTheme);
        } else {
          const prefersDarkScheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
          );
          themeClass(prefersDarkScheme.matches ? "dark" : "light");
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };

    fetchTheme();
  }, [themeClass, defaultTheme, themeName]);

  const toggleMode = useCallback(async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    themeClass(newTheme);

    try {
      await setCookie(themeName, newTheme);
    } catch (error) {
      console("Error setting theme:", error);
    }
  }, [theme, themeClass]);

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      <div
        style={{
          minHeight: "100vh",
          transition: "background 0.3s, color 0.3s",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
