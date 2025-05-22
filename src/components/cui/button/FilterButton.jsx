import React from "react";
import { variantClasses, sizeClass } from "./CustomButton";
import { twMerge } from "tailwind-merge";
const FilterButton = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className,
  wrapperClass,
}) => {
  return (
    <div
      className={`flex cursor-pointer border border-black ${wrapperClass} overflow-hidden`}
      onClick={onClick}
    >
      <div className="w-4 bg-gray-200 hover:bg-gray-300  "></div>
      <div
        className={twMerge(
          `w-full font-semibold transition-all duration-300 
           ${sizeClass[size]} 
        ${variantClasses[variant]}`,
          `${className}`
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FilterButton;
