import React from "react";
import { Tooltip as NextTooltip } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

const TooltipNext = ({ content, children, className }) => {
  return (
    <>
      <NextTooltip
        content={content}
        delay={0}
        closeDelay={0} // Ensure tooltip hides immediately
        showArrow={true} // Optional: to show/hide arrow
        shouldCloseOnInteractOutside={true} // Close on any outside interaction
        keepMounted={false}
        className={twMerge(
          `text-popover bg-popover-foreground max-w-52`,
          className
        )}
      >
        {children}
      </NextTooltip>
    </>
  );
};

export default TooltipNext;
