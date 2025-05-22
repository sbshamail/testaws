import React from "react";

const RadioInput = ({ option, value, setvalue }) => {
  return (
    <div className="w-full flex gap-1 items-center text-sm ">
      <input
        type="radio"
        value={option.value}
        checked={value == option.value}
        onChange={(event) => setvalue(event.target.value)}
        className="cursor-pointer"
      />
      <label className="whitespace-nowrap">{option.text}</label>
    </div>
  );
};

export default RadioInput;
