"use client";
import React, { useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { FiClock, FiBell, FiBellOff } from "react-icons/fi";
import { BiCar } from "react-icons/bi";
import RemainingCountdown from "../RemainingCountdown";
import { useSelection } from "@/reduxStore/function";

const Header = ({}) => {
  const [bellTrigger, setBellTrigger] = useState(false);
  const customer = useSelection("customer");

  const { ValidityDate, ValidityMileage } = customer?.GetCustomerById || {};
  const targetDate = new Date(ValidityDate * 1000);
  const getTotalDays = (ValidityDate) => {
    const timestamp = ValidityDate; // Unix timestamp (in seconds)
    const futureDate = new Date(timestamp * 1000); // Convert to ms
    const today = new Date();

    // Calculate the difference in milliseconds
    const diffInMs = futureDate - today;

    // Convert milliseconds to days
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return days;
  };
  return (
    <header className="bg-card sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border  px-4 lg:px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <FiClock className="h-5 w-5 text-amber-500" />
          <span className="text-sm font-medium">
            Valid:{" "}
            <span className="text-amber-500">{getTotalDays(ValidityDate)}</span>
          </span>
        </div>
        {/* <Separator orientation="vertical" className="h-6" /> */}
        <div className="flex items-center gap-1">
          <BiCar className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">
            Mileage: <span className="text-blue-500">{ValidityMileage}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 ">
          <div className="flex items-center justify-center bg-yellow-500 p-4 h-6 w-6 rounded-xl">
            <div>
              <FiClock className=" text-xl text-black z-10" />
            </div>
          </div>

          <RemainingCountdown targetDate={targetDate} />
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative cursor-pointer px-2 py-1 border border-border rounded-lg">
                {bellTrigger ? (
                  <FiBell
                    className="text-2xl text-yellow-500 Transition"
                    onClick={() => setBellTrigger(false)}
                  />
                ) : (
                  <FiBellOff
                    className="text-2xl text-red-500 Transition"
                    onClick={() => setBellTrigger(true)}
                  />
                )}
                {/* <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  2
                </span> */}
              </div>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default Header;
