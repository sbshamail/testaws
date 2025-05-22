import React from "react";
import { FixedDateParameteroptions } from "../fixedvalues";
const FixedDateSelector = ({ value, setvalue }) => {
  return (
    <div className="flex gap-2 items-center">
      {FixedDateParameteroptions.map((item, i) => (
        <button
          onClick={() => {
            setvalue(item);
          }}
          key={i}
          className={`w-10 h-10 rounded-lg text-white bg-${
            value == item ? "siteBlue" : "gray-200"
          } `}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default FixedDateSelector;
