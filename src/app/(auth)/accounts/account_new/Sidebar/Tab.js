import React from "react";

const Tab = ({ tab, i, settab, text }) => {
  return (
    <button
      onClick={() => {
        settab(i);
      }}
      className={`${
        tab == i ? "bg-siteBlue text-white" : "bg-gray-100"
      } w-full p-2 rounded-lg 
            flex items-center`}
    >
      {i + 1}
      {".  "}
      {text}
    </button>
  );
};

export default Tab;
