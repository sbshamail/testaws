import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import React from "react";

const TooltipShad = ({ children, className, content }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{children}</span>
        </TooltipTrigger>
        {content && (
          <TooltipContent className={className}>{content}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipShad;
