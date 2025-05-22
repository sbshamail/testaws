import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/app/Provider";
import clsx from "clsx";
import { Bars } from "react-loader-spinner";
import { useControllerFetch } from "@/utils/action/useControllerFetch";
import { DancingText } from "../animation/DancingText";
const SpinnerCenterScreen = ({
  className,
  loading,
  setLoading,
  center,
  msg,
}) => {
  const { handleAbort } = useControllerFetch();
  const [showMessage, setShowMessage] = useState(false);
  const { isSidebarOpen } = useContext(GlobalContext) || {};

  useEffect(() => {
    let timeout;

    if (loading) {
      timeout = setTimeout(() => setShowMessage(true), 15000); // 30s
    } else {
      setShowMessage(false); // Reset when loading ends
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    loading && (
      <div
        className={clsx(
          "select-none fixed inset-0 z-[100] bg-black bg-opacity-20",
          className
        )}
      >
        <div
          className={clsx(
            "flex items-center flex-col justify-center h-full w-full",
            {
              "lg:ml-32 ml-0 ": !center && isSidebarOpen,
            }
          )}
        >
          <Bars
            height="80"
            width="80"
            radius="9"
            color="#0097cc"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
          {showMessage && (
            <div className="flex items-center gap-2">
              <DancingText />
              <span
                className="text-red-500 underline cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click bubbling
                  handleAbort("Fetch Aborted by User");
                  if (setLoading) {
                    setLoading(false);
                  }
                }}
              >
                Abort
              </span>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default SpinnerCenterScreen;
