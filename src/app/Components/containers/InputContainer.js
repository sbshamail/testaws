import React from "react";

const InputContainer = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 w-full md:justify-center items-center">
      {children}
    </div>
  );
};

export default InputContainer;
