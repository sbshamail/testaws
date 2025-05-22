import React from "react";
import SwitchThemeButton from "../switchThemeButton.tsx/SwitchThemeButton";
import ToggleMode from "../switchThemeButton.tsx/ToggleMode";
const Navbar = () => {
  return (
    <div className={`w-full p-2`}>
      <div className="flex flex-wrap space-y-2 justify-between">
        <h1 className={` text-3xl font-bold`}>LOGO</h1>
        <div className="flex flex-wrap space-x-2">
          <ToggleMode />
          <SwitchThemeButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
