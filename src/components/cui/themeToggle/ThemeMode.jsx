"use client";

import { useTheme } from "@/utils/theme/themeProvider";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
const ToggleMode = ({ className }) => {
  const { toggleMode, theme } = useTheme();
  const Icon = theme === "light" ? MdSunny : FaMoon;
  return (
    <div className="">
      <div className={`${className} select-none`}>
        <Icon
          className="text-primary/80 shadow-2xl shadow-primary/30 text-xl cursor-pointer hover:rotate-[360deg] transition-transform duration-500"
          onClick={toggleMode}
        />
      </div>
    </div>
  );
};

export default ToggleMode;
