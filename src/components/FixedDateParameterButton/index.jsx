import React from "react";
import { CustomButton } from "../cui/button/CustomButton";

const FixedDateParameterButton = ({
  action,
  FixedDateParameter,
  className,
}) => {
  return (
    <div className="rounded-full bg-accent max-w-80 ">
      {["ITD", "YTD", "MTD"].map((item, i) => (
        <CustomButton
          size="xs"
          onClick={() => {
            action({
              dateParameter: item,
              offSet: "0",
            });
          }}
          key={i}
          className={` w-1/3 p-2 rounded-full text-sm font-extrabold tracking-wider ${
            FixedDateParameter == item
              ? "bg-primary text-primary-foreground"
              : "bg-accent text-accent-foreground"
          } ${className} `}
        >
          {item}
        </CustomButton>
      ))}
    </div>
  );
};

export default FixedDateParameterButton;
