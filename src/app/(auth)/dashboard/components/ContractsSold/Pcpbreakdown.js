import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "@/app/Components/Tooltip";
import React from "react";

const Comparison = ({
  value,
  percentage,
  text,
  variant,
  image1,
  image2,
  valueDollars,
  tooltipText,
}) => {
  const getTextColor = (text) => {
    switch (text) {
      case "Complimentary":
      case "Subscriptions":
        return "text-[#38BDF8]";
      case "Express":
        return "text-[#FB923C]";
      case "Loyalty Point":
      case "Loyalty Cash":
        return "text-[#22C55E]";
      default:
        return "text-gray-700"; // default color if none of the conditions are met
    }
  };
  return (
    // <ShadowContainer>
    //   <div>
    //     <div>
    //       <div>{first}</div>
    //       <div>{second}</div>
    //     </div>
    //     <div className="font-semibold text-xl">{text}</div>
    //   </div>
    // </ShadowContainer>
    <ShadowContainer>
      <div className="flex flex-col justify-center">
        <div className="flex gap-3 items-center flex-wrap">
          {/* <div className="text-gray-600 text-xs">{first} (Last)</div>
          <div className="bg-gray-600 w-[4px] h-[4px] rounded-full"></div>
          <div className="text-gray-600 text-xs">{second} (Current)</div> */}
        </div>
        <div
          className={`flex justify-between text-2xl font-medium py-1 ${getTextColor(
            text
          )}`}
        >
          <div className="flex">
            {text}
            {variant && (
              <>
                <div
                  className={`px-2 text-white rounded-full text-xs py-1 ml-2 flex items-center ${
                    variant === "Sale" ? "bg-[#FB923C]" : "bg-[#38BDF8]"
                  }`}
                >
                  {variant}
                </div>
              </>
            )}
          </div>

          <div className="text-gray-600 text-xl">
            {value?.toLocaleString("en-US")}
          </div>
        </div>{" "}
        <div className="flex justify-between items-center">
          <div className="text-lg text-gray-600">
            ${valueDollars ? valueDollars.toLocaleString("en-US") : "0.00"}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg text-gray-600">
            {percentage === 0 ? "0.00%" : percentage ? `${percentage}%` : null}
          </div>

          {image1 && (
            <Tooltip
              text={image1}
              tooltipText={"GPS Not Connected"}
              color={"black"}
            />
          )}
          {image2 && (
            <Tooltip
              text={image2}
              tooltipText={"GPS Connected"}
              color={"black"}
            />
          )}
          <div>
            <Link
              href="/detail"
              className="text-black border border-black px-3 tracking-wide py-1 rounded text-xs inline-flex items-center transition-colors transition-transform hover:scale-105 "
            >
              <Tooltip
                text={"Details"}
                tooltipText={tooltipText}
                color={"black"}
              />
            </Link>
          </div>
        </div>
      </div>
    </ShadowContainer>
  );
};

export default Comparison;
