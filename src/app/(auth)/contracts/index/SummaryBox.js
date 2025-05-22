import React from "react";

const SummaryBox = ({ value, percent, text }) => {
  return (
    <div className="bg-card text-card-foreground w-40 flex flex-col gap-2 items-center justify-center shadow-lg p-3 transition-all duration-300 hover:shadow-xl border-l-3 border-siteBlue">
      <div className="text-base font-bold text-center ">
        {percent ? `${percent}` : "0"}
      </div>
      <div className="text-sm text-center text-card-foreground/90 font-medium">
        {value?.toLocaleString()}
      </div>

      <div className="text-base text-center text-card-foreground/80 italic">
        {text}
      </div>
    </div>
  );
};

export default SummaryBox;
