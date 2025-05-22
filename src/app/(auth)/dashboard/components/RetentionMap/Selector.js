import React from "react";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { CustomButton } from "@/components/cui/button/CustomButton";
const Selector = ({ value, setvalue, text, text2, unique }) => {
  // console.log("@@@@@@@@@", text);
  if (unique) {
    return (
      <div
        onClick={() => {
          setvalue(value == 0 ? 1 : 0);
        }}
        className={` cursor-pointer flex ${
          value ? "bg-gray-500 flex-row" : "bg-sky-500 flex-row-reverse"
        } justify-between items-start rounded-md`}
      >
        <div className="p-2 text-white">{value ? text : text2}</div>
        <div
          className={`w-4 h-10 bg-gray-100 ${
            value ? "rounded-r-md" : "rounded-l-md"
          }`}
        ></div>
      </div>
    );
  }
  return (
    <button
      onClick={() => {
        setvalue(!value);
      }}
      className={` h-8 flex ${
        value ? "bg-green-500 flex-row" : "bg-red-500 flex-row-reverse"
      } justify-between items-center rounded-md`}
    >
      <div className="flex flex-row gap-2 items-center p-2">
        <div className="text-white text-xs">{text}</div>
        {value ? <FaCheck color="white" /> : <FaTimes color="white" />}
      </div>
      <div
        className={`w-4 h-full bg-gray-100 ${
          value ? "rounded-r-md" : "rounded-l-md"
        }`}
      ></div>
    </button>
  );
};

export default Selector;
