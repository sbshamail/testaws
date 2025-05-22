import React from "react";
import { twMerge } from "tailwind-merge";

const Shadow = ({ children, className, space, style, ...props }) => {
  let spacing = "p-3";
  if (space === "0") {
    spacing = "!p-0 !py-0 !m-0";
  } else if (space === "1") {
    spacing = "p-4 py-10";
  } else if (space === "2") {
    spacing = "p-6 py-12";
  }
  const mergedClassName = twMerge(
    `backdrop-blur-md bg-accent/90 text-card-foreground shadow shadow-border overflow-hidden ${spacing}`,
    className
  );
  return (
    <div className={`${mergedClassName} `} style={style} {...props}>
      {children}
    </div>
  );
};

export default Shadow;
