import React from "react";

const LeftBorderCard = ({
  title,
  value,
  borderColor = "border-siteOrange",
  className,
}) => {
  return (
    <div
      className={`w-full bg-card flex items-center justify-center px-1 gap-1 shadow-lg py-3 transition-all duration-300 hover:shadow-xl border-l-5 ${borderColor} ${className}`}
    >
      <p className="font-extrabold uppercase tracking-wide text-card-foreground ">
        {title}:&nbsp;
      </p>
      <p className="font-extrabold tracking-wide text-secondary-foreground">
        {value}
      </p>
    </div>
  );
};
export default LeftBorderCard;
