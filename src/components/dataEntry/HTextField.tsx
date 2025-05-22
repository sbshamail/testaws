import React, { ChangeEvent, KeyboardEvent, FC } from "react";

interface Props {
  label?: string;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  textarea?: boolean;
  className?: string;
  maxlength?: string | any;
  max?: number;
  min?: number;
  minLength?: number;
  size?: string | any;
  inputSize?: "0" | "1" | "2" | "3";
  rows?: number;
  id?: string;
}
const HTextField: FC<Props> = ({
  id,
  label,
  required,
  type = "text",
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  textarea = false,
  className = "",
  maxlength,
  max,
  min,
  minLength,
  size,
  inputSize,
  rows = 4,
}) => {
  let InputSize = "py-2";
  if (inputSize === "0") {
    InputSize = "!py-0";
  } else if (inputSize === "1") {
    InputSize = "!py-1";
  } else if (inputSize === "2") {
    InputSize = "py-2";
  } else if (inputSize === "3") {
    InputSize = "py-3";
  }
  return (
    <div className="flex items-start flex-col">
      {label && (
        <label>
          {label} &nbsp;
          {required && <span>*</span>}
        </label>
      )}
      <>
        {textarea ? (
          <textarea
            className={`${InputSize} ${className} outline-none`}
            placeholder={placeholder || `Enter a ${name ?? "Text"}`}
            onChange={onChange}
            rows={rows}
            maxLength={maxlength}
          />
        ) : (
          <input
            id={id}
            maxLength={maxlength}
            max={max}
            min={min}
            size={size}
            minLength={minLength}
            type={type}
            onKeyDown={onKeyDown}
            value={value}
            defaultValue={defaultValue}
            className={`py-2 ${inputSize} ${className}  outline-none`}
            placeholder={placeholder || `Enter a ${name ?? "Text"}`}
            onChange={onChange}
          />
        )}
      </>
    </div>
  );
};

export default HTextField;
