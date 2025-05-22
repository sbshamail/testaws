import React, { useContext, useState } from "react";
import { GlobalContext } from "@/app/Provider";
import { unixTimestampToDate } from "@/app/functions";
import toast from "react-hot-toast";

const GiftedService = ({ service, isLastItem }) => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);

  return (
    <div
      className={`grid grid-cols-2 ${!isLastItem ? "border-b" : ""} bg-white`}
    >
      <div className="flex items-center justify-center gap-2 text-sm py-3">
        <span className="border border-siteBlue rounded-full h-6 w-6 flex items-center justify-center text-xs">
          1
        </span>
        INITIAL 1K SERVICE WITH INSPECTIONS {service.CouponID}
      </div>
      <div className="flex justify-center items-center text-sm py-3">
        <div>Hamza</div>
      </div>
    </div>
  );
};

export default GiftedService;
