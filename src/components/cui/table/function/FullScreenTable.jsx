import React, { useContext, useEffect, useState } from "react";
import { MdOutlineZoomInMap } from "react-icons/md";

import { twMerge } from "tailwind-merge";

import { GlobalContext } from "@/app/Provider";
const FullScreenTable = ({ setFullScreen, fullScreen }) => {
  const { setIsSidebarOpen } = useContext(GlobalContext);

  useEffect(() => {
    if (fullScreen) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [fullScreen]);

  return (
    <div className="printNone">
      <div className={`flex text-sm p-2 justify-end items-center `}>
        <div
          className="flex items-center hover:text-siteBlue Transition cursor-pointer gap-2 "
          onClick={() => setFullScreen(!fullScreen)}
        >
          <MdOutlineZoomInMap className="cursor-pointer text-xl" />
        </div>
      </div>
    </div>
  );
};

export default FullScreenTable;
