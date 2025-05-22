import { Button as NU_BUTTON } from "@nextui-org/react";
import React from "react";

const Button = ({ text, onClick, bg, width, className, disabled }) => {
  return (
    <NU_BUTTON
      aria-label={text || "nuButton"}
      onPress={onClick}
      className={`w-${width} drop-shadow-md bg-${bg} py-2 px-3 flex flex-row justify-center items-center text-white font-semibold rounded-lg ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled}
    >
      {text}
    </NU_BUTTON>
  );
};

export default Button;
