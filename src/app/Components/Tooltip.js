import React from "react";
import { Tooltip, Button } from "@nextui-org/react";

export default function App({
  text,
  tooltipText,
  color,
  iconComponent,
  isIconComponent,
  iconText,
}) {
  // Determine button text color based on the 'color' prop
  const buttonTextClass = color === "white" ? "text-white" : color;

  return (
    <Tooltip
      showArrow={true}
      position="right"
      content={isIconComponent ? iconText : tooltipText}
      classNames={{
        base: [
          // arrow color
          "before:bg-gray-500",
        ],
        content: [
          "py-3 px-4 shadow-xl",
          "text-gray-100 bg-gray-500 w-full max-w-72",
        ],
      }}
    >
      {isIconComponent ? (
        <div style={{ display: "inline-block", cursor: "pointer" }}>
          {iconComponent}
        </div>
      ) : (
        <button
          className={`tracking-wider bg-transparent font-semibold cursor-pointer w- ${buttonTextClass}`}
        >
          {text}
        </button>
      )}
    </Tooltip>
  );
}
