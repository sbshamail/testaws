"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

const InputPhone = ({
  label,
  value,
  setvalue,
  placeholder,
  type,
  disable,
  autoFillValue,
  min,
  max,
  editable,
  width,
  labelInside,
}) => {
  const handleInputChange = (event) => {
    let inputValue = event.target.value;

    // Remove all non-numeric characters
    inputValue = inputValue.replace(/\D/g, "");

    // Limit input to 10 digits
    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }

    // Add dashes after 3rd and 6th digits
    if (inputValue.length > 6) {
      inputValue = `${inputValue.slice(0, 3)}-${inputValue.slice(
        3,
        6
      )}-${inputValue.slice(6)}`;
    } else if (inputValue.length > 3) {
      inputValue = `${inputValue.slice(0, 3)}-${inputValue.slice(3)}`;
    }

    setvalue(inputValue);
  };

  return (
    <div className=" w-full">
      <div className={`relative ${width ? `w-${width}` : ""}`}>
        {labelInside && label ? (
          <label
            className={twMerge(
              `absolute  pt-1  text-[0.6em] text-muted-foreground top-0 left-1 transform  Transition`
            )}
          >
            {label}
          </label>
        ) : (
          label && <label>{label}</label>
        )}
        <input
          value={value || autoFillValue}
          disabled={disable ? true : false}
          aria-label={!label ? placeholder || "input field" : undefined}
          type={type}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full p-3 border-transparent focus:outline-none rounded-lg bg-secondary text-secondary-foreground text-sm      
            ${labelInside && "pt-4"}`}
          min={min}
          max={max}
          readOnly={editable}
        />
      </div>
    </div>
  );
};

export default InputPhone;
