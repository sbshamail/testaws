import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Comparison = ({ last30, current30, text }) => {
  const last = parseInt(last30, 10);
  const current = parseInt(current30, 10);
  const difference = current - last;

  // Determine the image and message to display
  let imageSrc = "";
  let message = "";

  if (current < last) {
    imageSrc = "/images/down-red.png";
    message = `-${last - current}`;
  } else if (current > last) {
    imageSrc = "/images/up-green.png";
    message = `+${current - last}`;
  } else {
    imageSrc = "";
    message = "";
  }

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
        return "text-muted-foreground"; // default color if none of the conditions are met
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
          {/* <div className="text-muted-foreground text-xs">{first} (Last)</div>
          <div className="bg-gray-600 w-[4px] h-[4px] rounded-full"></div>
          <div className="text-muted-foreground text-xs">{second} (Current)</div> */}
        </div>
        <div
          className={`flex justify-between text-2xl font-medium py-1 ${getTextColor(
            text
          )}`}
        >
          <div className="flex text-xl">{text}</div>
          {imageSrc && <Image src={imageSrc} alt="" width={30} height={0} />}
          {message && <div className="text-base">{message}</div>}
        </div>{" "}
        <div className="flex justify-between items-center">
          <div className="text-sm text-card-foreground">Last 30 Days</div>

          <div className="text-sm text-card-foreground">
            {!last30 ? 0 : last30}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-card-foreground">Current 30 Days</div>

          <div className="text-sm text-card-foreground">
            {!current30 ? 0 : current30}
          </div>
        </div>
      </div>
    </ShadowContainer>
  );
};

export default Comparison;
