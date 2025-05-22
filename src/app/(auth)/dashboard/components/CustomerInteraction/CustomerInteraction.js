"use client";
import React, { useContext, useEffect } from "react";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

import { DashboardContext } from "../../DashboardContext";

import { BiDetail } from "react-icons/bi";
import Image from "next/image";
import TooltipNext from "@/components/nextui/TooltipNext";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
const CustomerInteraction = ({ className }) => {
  const { resetAll, dealer, usage, setusage, rowLoader } =
    useContext(DashboardContext);

  useEffect(() => {
    if (dealer) {
      setusage(null);
    }
  }, [resetAll]);

  const totalUsers =
    usage?.web_users +
    usage?.iPhone_users +
    usage?.Guest_users +
    usage?.android_users;

  // console.log("totalUsers", totalUsers);

  // Function to calculate percentage
  function calculatePercentage(count, total) {
    // Handle division by zero
    return total === 0 ? 0 : ((count / total) * 100).toFixed(2);
  }

  const guestUsersPercentage = calculatePercentage(
    usage?.Guest_users,
    totalUsers
  );
  const androidUsersPercentage = calculatePercentage(
    usage?.android_users,
    totalUsers
  );
  const iPhoneUsersPercentage = calculatePercentage(
    usage?.iPhone_users,
    totalUsers
  );
  const webUsersPercentage = calculatePercentage(usage?.web_users, totalUsers);

  return (
    <div className={`w-full ${className}`}>
      <ShadowContainer>
        {rowLoader ? (
          <div className="w-full h-full flex justify-center items-center">
            <SpinnerLoader />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-between">
            <div className="flex gap-3 justify-start items-center w-full">
              <div>
                <Image
                  src="/images/usage.png"
                  alt="App Usage Icon"
                  width={50}
                  height={50}
                />
              </div>
              <div className=" text-xl font-bold w-full">
                Customer App Usage
              </div>
            </div>

            <div className="flex flex-col w-full mt-4 gap-4 justify-between">
              <div className="flex items-center justify-between bg-background p-4 rounded-lg w-full">
                <div className="text-[#44aca1] font-semibold text-sm flex items-center gap-2">
                  <span> Users that have logged in</span>
                  <span className="font-bold tracking-wider text-sm">
                    {usage?.login ? usage?.login : 0}
                  </span>
                  <span>
                    <TooltipNext
                      className={"w-48"}
                      content={
                        <span>
                          This is number of users that have{" "}
                          <span className="text-green-500">logged</span> on the
                          app and web portal in the selected date period
                        </span>
                      }
                    >
                      <div>
                        <BiDetail className="cursor-pointer text-[#00C3B0] text-sm" />
                      </div>
                    </TooltipNext>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-background p-4 rounded-lg w-full">
                <div className="text-[#695737] font-semibold text-base flex items-center gap-2">
                  <span> Users that have not logged in </span>
                  <span className=" font-bold tracking-wider text-sm">
                    {usage?.notlogin ? usage?.notlogin : 0}
                  </span>
                  <span>
                    <TooltipNext
                      className={"w-48"}
                      content={
                        <span>
                          This is number of users that have{" "}
                          <span className="text-yellow-700">not logged</span> on
                          the app and web portal in the selected date period
                        </span>
                      }
                    >
                      <div className="cursor-pointer">
                        <BiDetail className="text-[#695737] text-base" />
                      </div>
                    </TooltipNext>
                  </span>
                </div>
              </div>
            </div>
            <div className=" mb-6 mt-4">
              <div className="flex flex-wrap gap-3 justify-center items-center">
                {[
                  {
                    icon: "/images/apple.png",
                    alt: "Apple Icon",
                    percentage: parseInt(iPhoneUsersPercentage) || 0,
                    count: parseInt(usage?.iPhone_users) || 0,
                  },
                  {
                    icon: "/images/android.png",
                    alt: "Android Icon",
                    percentage: parseInt(androidUsersPercentage) || 0,
                    count: parseInt(usage?.android_users) || 0,
                  },
                  {
                    icon: "/images/desktop.png",
                    alt: "Desktop Icon",
                    percentage: parseInt(webUsersPercentage) || 0,
                    count: parseInt(usage?.web_users) || 0,
                  },
                  {
                    icon: "/images/person.svg",
                    alt: "Guest Icon",
                    percentage: parseInt(guestUsersPercentage) || 0,
                    count: parseInt(usage?.Guest_users) || 0,
                  },
                ].map(({ icon, alt, percentage, count }, index) => (
                  <div
                    key={index}
                    className="flex-1 min-w-[120px] py-2  rounded-3xl bg-slate-100 relative"
                  >
                    <div className="flex items-center gap-4 px-2">
                      <Image src={icon} alt={alt} width={26} height={26} />
                      <div className="text-muted-foreground text-base font-medium">
                        {count}
                      </div>
                      <div className="px-2 absolute right-0 top-1/2 -translate-y-1/2 h-full flex items-center rounded-r-3xl text-primary-foreground text-base font-medium bg-primary">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </ShadowContainer>
    </div>
  );
};

export default CustomerInteraction;
