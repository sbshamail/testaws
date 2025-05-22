import React from "react";
import { twMerge } from "tailwind-merge";
export const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 ",
  white: "bg-white/80 shadow text-black border hover:bg-white hover:shadow-md",
  outline:
    "bg-transparent shadow border border-border hover:bg-accent hover:shadow-md",
  main: "bg-siteOrange text-white hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  danger: "bg-red-500 text-white hover:bg-red-600",
  warning: "bg-yellow-500 text-black hover:bg-yellow-600",
  success: "bg-green-500 text-white hover:bg-green-600",
  accent: "bg-background hover:bg-accent border border-border",
  disabled: "bg-gray-500 text-white cursor-not-allowed opacity-50 ",
  ghost: "bg-transparent ",
};
export const sizeClass = {
  xs: "px-2 py-1 text-xs",
  sm: "px-4 py-1 text-sm",
  md: "px-6 py-2",
  lg: "px-8 py-3",
  xl: "px-10 py-4",
};
export const CustomButton = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className,
  Icon,
  IconClass,
  titleClass,
  disabled = false,
  ...props
}) => {
  const classStyle = twMerge(
    ` rounded-lg font-semibold transition-all duration-300  ${
      sizeClass[size]
    } ${variantClasses[disabled ? "disabled" : variant]} `,
    `${className} `
  );
  const handleOnClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    onClick && onClick(event);
  };
  return Icon ? (
    <div
      className={`${classStyle} cursor-pointer`}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center justify-center cursor-pointer h-full w-full">
        <Icon className={twMerge(`text-lg `, IconClass)} />
        {children && <p className={`${titleClass} ml-2`}>{children}</p>}
      </div>
    </div>
  ) : (
    <button
      className={`${classStyle}`}
      onClick={handleOnClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
