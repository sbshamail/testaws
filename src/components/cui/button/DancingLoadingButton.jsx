import React, { useRef, useEffect, useState } from "react";
import { variantClasses, sizeClass } from "./CustomButton";
import { twMerge } from "tailwind-merge";
import DancingDotLoading from "../loader/DancingDotLoading";

const DancingLoadingButton = ({
  variant = "primary",
  size = "md",
  loading,
  children,
  onClick,
  className,
  disabled = false,
  ...props
}) => {
  const [buttonWidth, setButtonWidth] = useState("auto");

  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      setButtonWidth(`${textRef.current.offsetWidth}px`);
    }
  }, [children]);
  const classStyle = twMerge(
    ` rounded-lg font-semibold transition-all duration-300 ${sizeClass[size]} ${
      variantClasses[variant]
    } ${
      disabled || loading
        ? "cursor-not-allowed opacity-80"
        : "cursor-pointer opacity-100"
    }`,
    `${className} `
  );
  return (
    <div
      className={`${classStyle} `}
      onClick={loading ? null : onClick}
      {...props}
    >
      <div className="flex items-center space-x-2 justify-center">
        {loading ? (
          <span
            style={{ width: buttonWidth }}
            className=" flex items-center justify-center"
          >
            <DancingDotLoading />
          </span>
        ) : (
          <span
            // style={{ width: buttonWidth }}
            ref={textRef}
            className="px-2 w-max"
          >
            {children}
          </span>
        )}
      </div>
    </div>
  );
};

export default DancingLoadingButton;
