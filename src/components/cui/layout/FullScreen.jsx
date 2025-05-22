import React, { useContext, useEffect, useState } from "react";
import { MdOutlineZoomInMap } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { GlobalContext } from "@/app/Provider";
const FullScreen = ({ offScreenClass, onScreenClass, children, className }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(GlobalContext);
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    if (fullScreen) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [fullScreen]);

  return (
    <div
      className={twMerge(
        `${
          fullScreen &&
          "fixed top-0 left-0 h-screen w-full overflow-auto z-50 bg-background text-foreground"
        }  `,
        `${className}`
      )}
    >
      <div className="printNone">
        {!fullScreen ? (
          <div
            className={`flex text-sm p-2 justify-end items-center  ${offScreenClass} `}
          >
            <div
              className="flex items-center hover:text-siteBlue Transition cursor-pointer gap-2 "
              onClick={() => setFullScreen(!fullScreen)}
            >
              <MdOutlineZoomInMap className="cursor-pointer" /> Full screen
            </div>
          </div>
        ) : (
          <div
            className={twMerge(
              `z-50 absolute left-0 top-0  text-xs cursor-pointer  text-red-400 hover:text-red-500  border-red-400twMerge`,
              `${onScreenClass}`
            )}
            onClick={() => setFullScreen(!fullScreen)}
          >
            <div className="flex item-center">
              <RxCrossCircled className="text-2xl" />
              <p> Close Screen</p>
            </div>
          </div>
        )}
      </div>
      <div className={clsx({ "mt-10": fullScreen })}></div>
      {children}
    </div>
  );
};

export default FullScreen;
