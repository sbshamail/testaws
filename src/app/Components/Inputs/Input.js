"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

const Input = ({
  label,
  required,
  name,
  value,
  setvalue,
  placeholder,
  type,
  bgcolor,
  className,
  disable,
  defaultValue1,
  image,
  onImageClick,
  onChange,
  autoFillValue,
  min,
  max,
  editable,
  width,
  maxlength,
  size,
  loading,
  onSelect,
  disableFutureDate,
  prefix,
  suffix,
  errors,
  autoComplete,
  onKeyDown,
  labelInside,
  ...props
}) => {
  const [toggleVisible, setToggleVisible] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const minDate = isValidDate(min)
    ? new Date(min).toISOString().split("T")[0]
    : undefined;
  const maxDate = isValidDate(max)
    ? new Date(max).toISOString().split("T")[0]
    : today;

  // Use a state for value to manage placeholder
  let inputValue = value ?? defaultValue1 ?? autoFillValue ?? "";
  if (inputValue === "null" || inputValue === "undefined") {
    inputValue = "";
  }
  const InputImage = () =>
    image && (
      <Image
        src={loading ? "/images/bouncing-circles.svg" : image}
        alt="icon"
        onClick={onImageClick}
        className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 h-6"
        width="70"
        height="40"
      />
    );
  const InputPrefix = () =>
    prefix && (
      <div
        className={`cursor-pointer absolute left-0 ${
          typeof prefix === "function" ? "" : "ps-2"
        } top-1/2 transform -translate-y-1/2  font-bold`}
      >
        {typeof prefix === "function" ? prefix() : prefix}
      </div>
    );
  const InputSuffix = () =>
    suffix && (
      <div className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 z-10 bg-secondary">
        {typeof suffix === "function" ? suffix() : suffix}
      </div>
    );
  const EyeButton = () =>
    type === "password" && (
      <div className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 font-bold ">
        {toggleVisible ? (
          <FaEyeSlash onClick={() => setToggleVisible(false)} />
        ) : (
          <FaEye onClick={() => setToggleVisible(true)} />
        )}
      </div>
    );
  const Type = () => {
    if (toggleVisible && type === "password") {
      return "text";
    } else if (type === "password" && !toggleVisible) {
      return "password";
    } else {
      return type;
    }
  };

  let inputProps = {
    name,
    required,
    value: inputValue, // Ensure the value stays consistent
    disabled: disable,
    type: Type(),
    maxLength: maxlength,
    size,
    onChange: onChange
      ? onChange
      : (event) => {
          setvalue(event.target.value);
          if (onSelect) {
            onSelect(event);
          }
        },
    placeholder: placeholder ? placeholder : label,

    min: minDate,
    max: disableFutureDate ? today : maxDate,
    readOnly: editable,
    onKeyDown,
    ...props,
  };

  return (
    <div className="relative">
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
      <div className={`relative ${width && `w-${width}`}  `}>
        {InputImage()}
        {InputPrefix()}
        {InputSuffix()}
        {EyeButton()}

        <input
          {...inputProps}
          autoComplete={autoComplete ?? "off"}
          aria-label={!label ? placeholder || "input field" : undefined}
          className={twMerge(
            `p-3  w-full border-transparent focus:outline-none rounded-lg bg-secondary text-secondary-foreground ${
              prefix && "pl-6"
            }  ${suffix && "pr-16"} 
            ${labelInside && "pt-4"}
            ${disable && "cursor-not-allowed text-muted-foreground"}
            text-sm
          
            `,
            className
          )}
        />
      </div>
      {errors && name && errors[name] !== "" ? (
        <span className="text-red-500">{errors[name]}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
