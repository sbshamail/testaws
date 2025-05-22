import React, { FC } from "react";

interface HButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  props?: React.ComponentPropsWithoutRef<"button">;
  size?: "1" | "2";
}

const HButton: FC<HButtonProps> = ({ children, className, size, ...props }) => {
  let sizeClassName = "";
  if (size === "1") {
    sizeClassName = "px-4 !p-1";
  } else if (size === "2") {
    sizeClassName = "px-4 !p-2";
  }
  return (
    <button
      className={`rounded  border px-1 py-0 primary ${sizeClassName} ${className}  `}
      {...props}
    >
      {children}
    </button>
  );
};

export default HButton;
