import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import PrefixAndSuffix from "./function/PrefixAndSuffix";
import useDivDimensions from "@/utils/hooks/useDivDimentions";

const TextField = ({
  id,
  label,
  labelInside,
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
  outerClassName = "",
  style,
  wrapperClassName,
  prefixClassName,
  suffixClassName,
  prefix,
  suffix,
  maxlength,
  max,
  min,
  minLength,
  size,
  labelClass = "text-sm",
  inputSize = "2",
  rows = 4,
  register,
  errors,
  ...props
}) => {
  const prefixDimension = useDivDimensions();
  const suffixDimension = useDivDimensions();
  const [prefixWidth, setPrefixWidth] = useState("");
  const [suffixWidth, setSuffixWidth] = useState("");
  const [demoValue, setDemoValue] = useState(value);
  const [passwordVisible, setPasswordVisible] = useState(false);
  let InputSize = "py-2";
  if (inputSize === "0") {
    InputSize = "py-0";
  } else if (inputSize === "1") {
    InputSize = "py-1";
  } else if (inputSize === "2") {
    InputSize = "py-2";
  } else if (inputSize === "3") {
    InputSize = "py-3";
  }

  const inputValue = value
    ? value
    : type === "file"
    ? undefined
    : onChange
    ? ""
    : demoValue;
  const Type = () => {
    if (passwordVisible && type === "password") {
      // suffixPasswordRender();
      return "text";
    } else if (type === "password" && !passwordVisible) {
      // suffixPasswordRender();
      return "password";
    } else if (type === "tel") {
      return "number";
    } else {
      return type;
    }
  };
  let inputProps = {
    id,
    name,
    placeholder:
      labelInside && label ? label : placeholder ? placeholder : label,
    "aria-label": label,
    onKeyDown,
    className,
    type: Type(),
    maxLength: maxlength,
    max,
    min,
    minLength,
    size,
    rows,
    ...props,
  };

  if (register) {
    inputProps = { ...inputProps, ...register(name) };
  } else {
    inputProps = {
      ...inputProps,
      value: inputValue,
      defaultValue,
      onChange: onChange ? onChange : (e) => setDemoValue(e.target.value),
    };
  }
  const mergedClassName = twMerge(
    ` relative overflow-hidden bordering group focus-within:border-primary select-none   ${
      errors && name && errors[name] && "border !border-red-500"
    } ${type === "tel" ? "input-textfield" : ""}`,
    wrapperClassName
  );

  const InputFieldClass = twMerge(
    `outline-none !border-none active:border-none focus:border-none font-light ${
      labelInside ? (inputValue ? " pt-[12px] text-[0.9em]" : "py-[6px]") : ""
    }`,
    className
  );

  const InputStype = {
    paddingLeft: `${prefixWidth}px`,
    paddingRight: `${suffixWidth}px`,
    ...style,
  };

  return (
    <div className={`${outerClassName} `}>
      {!labelInside && label && (
        <label className={`mb-1 ${labelClass}`}>
          {label} &nbsp;
          {required && <span>*</span>}
        </label>
      )}

      <div
        className={twMerge(
          `${mergedClassName} ${InputSize} bg-secondary text-secondary-foreground w-full `
        )}
      >
        {textarea ? (
          <textarea
            style={InputStype}
            {...inputProps}
            className={InputFieldClass}
          />
        ) : (
          <input
            style={InputStype}
            {...inputProps}
            className={InputFieldClass}
          />
        )}
        {labelInside && inputValue && (
          <label
            htmlFor={id}
            className={twMerge(
              `absolute  pt-1  text-[0.6em] text-muted-foreground top-0 left-1 transform  Transition`,
              labelClass
            )}
          >
            {label}
          </label>
        )}

        {(prefix || suffix) && (
          <PrefixAndSuffix
            prefix={prefix}
            suffix={suffix}
            textarea={textarea}
            suffixClassName={suffixClassName}
            prefixClassName={prefixClassName}
            setPrefixWidth={setPrefixWidth}
            setSuffixWidth={setSuffixWidth}
            prefixDimension={prefixDimension}
            suffixDimension={suffixDimension}
          />
        )}
      </div>
      {errors && name && errors[name] && (
        <p className="text-red-500 m-0 p-0 text-xs">{`${errors[name].message}`}</p>
      )}
    </div>
  );
};

export default TextField;
