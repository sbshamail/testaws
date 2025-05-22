"use client";
import { useTheme } from "@/utils/useContext/themeChange/themeChangeContext";
import React from "react";
import HButton from "../button/HButton";

const SwitchThemeButton = () => {
  const { toggleMode } = useTheme();

  return (
    <div>
      <HButton onClick={toggleMode}>Theme Change</HButton>
    </div>
  );
};

export default SwitchThemeButton;
