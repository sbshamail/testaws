import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Comparison = ({ value, text }) => {
  return (
    <ShadowContainer>
      <div className="flex flex-col justify-center my-5">
        <div className="flex gap-3 items-center flex-wrap"></div>
        <div className={"flex justify-between text-3xl font-medium py-1"}>
          <div className="flex text-gray-600">{text}</div>
          <div className="text-[#29aae1] text-3xl">
            {value?.toLocaleString("en-US")}
          </div>
        </div>{" "}
        <div className="flex justify-between items-center"></div>
      </div>
    </ShadowContainer>
  );
};

export default Comparison;
