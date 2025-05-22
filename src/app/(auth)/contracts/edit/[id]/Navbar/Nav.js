import React, { useContext } from "react";
import { EditContractContext } from "../page";
const Nav = ({ text, i }) => {
  const { tab, settab } = useContext(EditContractContext);
  return (
    <button
      onClick={() => {
        settab(i);
      }}
      className={`${
        tab == i && "bg-siteBlue text-white"
      } p-2 rounded-lg font-semibold`}
    >
      {text}
    </button>
  );
};

export default Nav;
