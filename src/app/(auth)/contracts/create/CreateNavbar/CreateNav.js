import React, { useContext } from "react";
import { CreateContractContext } from "../page";
const CreateNav = ({ text, i }) => {
  const { tab, settab } = useContext(CreateContractContext);
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

export default CreateNav;
