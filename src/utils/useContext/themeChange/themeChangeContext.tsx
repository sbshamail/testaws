"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TypeThemeContextProps } from "./interface";
export const ThemeContext = createContext<TypeThemeContextProps | undefined>(
  undefined
);
// theme to mode, color to theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      labelTheme: "",
      toggleMode: () => {},
      toggleTheme: (colorName: string) => {},
    };
  }
  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [labelTheme, setLabelTheme] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const setTheme = useCallback(
    (property: any) => {
      if (isClient) {
        const root = document.documentElement;
        const theme = root?.classList;
        theme.remove("dark", "light");
        theme.add(property);
      }
    },
    [isClient]
  );

  // Fetch System Theme
  useEffect(() => {
    if (isClient && typeof window !== undefined) {
      const prefersDarkScheme = window?.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      if (prefersDarkScheme.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, [isClient, setTheme]);

  // mode dark and light
  const toggleMode = () => {
    if (isClient) {
      const root = document.documentElement;
      const theme = root?.classList;
      if (theme.contains("dark")) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }
  };

  //theme set
  const toggleTheme = (colorName: string) => {
    if (isClient) {
      const root = document.documentElement;
      const theme = root?.classList;
      theme.remove("blue", "green", "orange");
      theme.add(colorName);
      if (theme.contains(colorName)) {
        setLabelTheme(colorName);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ labelTheme, toggleMode, toggleTheme }}>
      <div
        style={{
          padding: "1rem",
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
