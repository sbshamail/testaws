"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";

import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { DashboardContext } from "../../DashboardContext";

import { MdOutlineLocationOn } from "react-icons/md";
import Tooltip from "@/app/Components/Tooltip";
import { MdOutlineLocationOff } from "react-icons/md";

// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { Card, Skeleton } from "@nextui-org/react";

import Image from "next/image";
import Graph3 from "./Graph3";
import { formatDate } from "@/utils/helpers";
import { fetchPostObj } from "@/utils/action/function";
//redux
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";

import TooltipShad from "@/components/cui/tooltip/TooltipShad";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { useSelection } from "@/reduxStore/function";
import ContractsBreakdown from "./ContractsBreakdown";
const Div3_1 = ({ className, auth, Token }) => {
  const {
    dealersetting,
    pcpBreakdown,
    rowLoader,
    startdate,
    enddate,
    FixedDateParameter,
    mount,
    saleBreakdown,
    serviceBreakdown,
    displayDates,
  } = useContext(DashboardContext);

  const contracts = dealersetting?.dashboardContract;
  const dispatch = useDispatch();
  const fibreakdownReducer = setReducer("fibreakdown");
  const fiBreakdown = useSelection("fibreakdown") ?? {};

  const dateFilter = dealersetting?.DateFilter;

  const [showContractUser, setShowContractUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // if (pcpBreakdown) {

  const filteredList = useMemo(() => {
    const list3 = [
      {
        name: "Classic",
        value: pcpBreakdown?.PcpBreakDown?.classic || 0,
        percent: pcpBreakdown?.PcpBreakDown?.classic_per || 0,
        reservedAmount: pcpBreakdown?.ReservedAmountBreakDown?.classic || "",
        color: "#007AAA",
        ContractType: 1,
      },
      {
        name: "Complimentary",
        value: pcpBreakdown?.PcpBreakDown?.complimentary || 0,
        percent: pcpBreakdown?.PcpBreakDown?.complimentary_per || 0,
        reservedAmount:
          pcpBreakdown?.ReservedAmountBreakDown?.complimentary || "",
        color: "#00ADEE",
        ContractType: 3,
      },
      {
        name: "Express",
        value: pcpBreakdown?.PcpBreakDown?.express || 0,
        percent: pcpBreakdown?.PcpBreakDown?.express_per || 0,
        reservedAmount: pcpBreakdown?.ReservedAmountBreakDown?.express || "",
        color: "#7EDBFF",
        ContractType: 2,
      },
      {
        name: "GPS",
        value: pcpBreakdown?.PcpBreakDown?.total_gps || 0,
        percent: pcpBreakdown?.PcpBreakDown?.total_gps_per || 0,
        reservedAmount: "",
        color: "#c36800",
        ContractType: 4,
      },
      {
        name: "Attach GPS",
        value: pcpBreakdown?.PcpBreakDown?.gps || 0,
        percent: pcpBreakdown?.PcpBreakDown?.gps_per || 0,
        reservedAmount: "",
        color: "#00b7ff",
      },
      {
        name: "Unattach GPS",
        value: pcpBreakdown?.PcpBreakDown?.unattach_gps || 0,
        percent: pcpBreakdown?.PcpBreakDown?.unattach_gps || 0,
        reservedAmount: "",
        color: "#111010",
      },
      {
        name: "Loyalty",
        value: pcpBreakdown?.PcpBreakDown?.lp || 0,
        percent: pcpBreakdown?.PcpBreakDown?.lp_per || 0,
        reservedAmount: "",
        color: "#00C3B0",
        ContractType: 10,
      },
      {
        name: "Subscriptions",
        value: pcpBreakdown?.PcpBreakDown?.subscriptions || 0,
        percent: pcpBreakdown?.PcpBreakDown?.subscriptions_per || 0,
        reservedAmount: "",
        color: "#FA7137",
        ContractType: 6,
      },
      {
        name: "Marketplace",
        value: pcpBreakdown?.PcpBreakDown?.TotalMarketPlace || "0",
        percent: pcpBreakdown?.PcpBreakDown?.marketplace || 0,
        reservedAmount:
          pcpBreakdown?.ReservedAmountBreakDown?.TotalMarketPlaceAmount || "0",
        color: "#FFBF4F",
        ContractType: 7,
      },
      {
        name: "Loyalty Service",
        value: pcpBreakdown?.PcpBreakDown?.lps || "0",
        percent: pcpBreakdown?.PcpBreakDown?.lps_per || 0,
        reservedAmount:
          pcpBreakdown?.ReservedAmountBreakDown?.TotalMarketPlaceAmount || "0",
        color: "#000000",
        ContractType: 8,
      },
      {
        name: "Loyalty Cash",
        value: pcpBreakdown?.PcpBreakDown?.lc || "0",
        percent: pcpBreakdown?.PcpBreakDown?.lc_per || 0,
        reservedAmount:
          pcpBreakdown?.ReservedAmountBreakDown?.TotalMarketPlaceAmount || "0",
        color: "#99B2C6",
        ContractType: 9,
      },
    ];

    return list3
      .filter((item) => Number(item.value) !== 0)
      .map((item, index) => ({ ...item, index }));
  }, [pcpBreakdown]);
  // Maintain original index

  // const fetchFIBreakdown = async (ContractType, ContractName) => {
  //   if (!dealersetting) return;
  //   const data = {
  //     DealerID: dealersetting?.dealer?.DealerID,
  //     FixedDateParameter,
  //     startdate: formatDate(startdate),
  //     enddate: formatDate(enddate),
  //     ContractType,
  //   };
  //   const res = await fetchPostObj({
  //     auth,
  //     Token,
  //     api: "dashboard/fibreakdown",
  //     data,
  //     dispatch,
  //     setLoading,
  //     spinner: true,
  //     fetchSelector: fibreakdownReducer,
  //     selectionKey: ContractName,
  //   });
  // };

  // useEffect(() => {
  //   const fetchAwait = async () => {
  //     if (!filteredList?.length) {
  //       return console.log("list not found");
  //     }

  //     await Promise.all(
  //       filteredList.map((item) =>
  //         fetchFIBreakdown(item?.ContractType, item?.name)
  //       )
  //     );
  //   };

  //   fetchAwait();
  // }, [filteredList, mount]);

  // const ListUserOnClick = ({ name, color }) => {
  //   return fiBreakdown[name]?.fimanagers?.length > 0 ? (
  //     <div className="bg-background  w-[400px] max-h-[400px]  overflow-y-auto rounded-lg ">
  //       <div>
  //         <div
  //           className={`w-full flex justify-between text-white py-2 sticky top-0 left-0 right-0`}
  //           style={{ background: color }}
  //         >
  //           <h1 className="font-bold uppercase px-2 text-[0.9em]">{name}</h1>
  //         </div>
  //         <table className="w-full ">
  //           <thead>
  //             <tr className="">
  //               <td className="border-b  p-1 font-semibold">User</td>
  //               <td className="border-b p-1 font-semibold">Total</td>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {fiBreakdown[name]?.fimanagers?.map((item, index) => (
  //               <tr key={index} className="">
  //                 <td className="border-b border-gray-100 p-1">
  //                   {item?.FIManagerName ?? ""}
  //                 </td>
  //                 <td className="border-b border-gray-100 p-1">
  //                   {item?.total}
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   ) : (
  //     <span className="p-2">No Data</span>
  //   );
  // };
  return (
    <>
      <SpinnerCenterScreen loading={loading} />
      <div className={`w-full flex ${className}`}>
        <ContractsBreakdown
          saleBreakdown={saleBreakdown}
          serviceBreakdown={serviceBreakdown}
          displayDates={displayDates}
        />
        {/* {pcpBreakdown ? (
          <div className="w-full">
            <ShadowContainer>
              <div className="flex flex-col justify-between gap-6">
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Image
                      src={"/images/notes1.png"}
                      alt={"Speedo"}
                      width={40}
                      height={40}
                    />
                    <div className="font-bold text-xl ">
                      Contracts Breakdown
                    </div>
                    <div className="font-normal text-xs text-muted-foreground tracking-wider">
                      {dateFilter}
                    </div>
                  </div>
                  <div>
                    <svg
                      width="17"
                      height="4"
                      viewBox="0 0 17 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="2.01379"
                        cy="2"
                        rx="2.01379"
                        ry="2"
                        fill="#99B2C6"
                      />
                      <ellipse
                        cx="8.05517"
                        cy="2"
                        rx="2.01379"
                        ry="2"
                        fill="#99B2C6"
                      />
                      <path
                        d="M16.1103 2C16.1103 3.10457 15.2087 4 14.0966 4C12.9844 4 12.0828 3.10457 12.0828 2C12.0828 0.89543 12.9844 0 14.0966 0C15.2087 0 16.1103 0.89543 16.1103 2Z"
                        fill="#99B2C6"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="w-10/12 h-full ">
                    <Graph3
                      list2={filteredList}
                      type="donut"
                      total={pcpBreakdown?.PcpBreakDown?.Total}
                    />
                  </div>

                  <div className="w-full relative">
                    {filteredList?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className=" flex gap-5 items-center w-full"
                        >
                          <div
                            className={`w-3 h-3 p-[6px] rounded-full `}
                            style={{ background: item.color }}
                          ></div>

                          <TooltipShad
                            className={
                              "bg-card text-card-foreground p-0 m-0 shadow-lg border"
                            }
                            content={
                              <ListUserOnClick
                                name={item.name}
                                color={item.color}
                              />
                            }
                          >
                            <div className="text-muted-foreground relative cursor-pointer w-full font-semibold text-sm flex items-center ">
                              {item.name}
                              {item.name === "Attach GPS" ? (
                                <Tooltip
                                  iconComponent={
                                    <MdOutlineLocationOn className="text-lg ml-1 text-[#4C566A]" />
                                  }
                                  isIconComponent={true}
                                  iconText={"GPS Connected"}
                                />
                              ) : item.name === "Unattach GPS" ? (
                                <Tooltip
                                  iconComponent={
                                    <MdOutlineLocationOff className="text-lg ml-1 text-[#4C566A]" />
                                  }
                                  isIconComponent={true}
                                  iconText={"GPS Not Connected"}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </TooltipShad>
                          <div className="flex w-full gap-5 justify-center">
                            <div className="text-base font-medium text-left  w-full">
                              {item.percent}%
                            </div>
                            <div className="text-base font-medium  text-left w-full">
                              {item.value}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ShadowContainer>
          </div>
        ) : (
          <div className="w-full">
            <ShadowContainer>
              <div className="flex gap-4 items-center justify-between">
                <div className="flex items-center gap-5">
                  <Image
                    src={"/images/notes1.png"}
                    alt={"Speedo"}
                    width={40}
                    height={40}
                  />
                  <div className="font-bold text-xl text-[#4C566A]">
                    Contracts Breakdown
                  </div>
                  <div className="font-normal text-xs text-muted-foreground tracking-wider">
                    {dateFilter}
                  </div>
                </div>
                <div>
                  <svg
                    width="17"
                    height="4"
                    viewBox="0 0 17 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="2.01379"
                      cy="2"
                      rx="2.01379"
                      ry="2"
                      fill="#99B2C6"
                    />
                    <ellipse
                      cx="8.05517"
                      cy="2"
                      rx="2.01379"
                      ry="2"
                      fill="#99B2C6"
                    />
                    <path
                      d="M16.1103 2C16.1103 3.10457 15.2087 4 14.0966 4C12.9844 4 12.0828 3.10457 12.0828 2C12.0828 0.89543 12.9844 0 14.0966 0C15.2087 0 16.1103 0.89543 16.1103 2Z"
                      fill="#99B2C6"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-3/4 mx-auto">
                  <Graph3
                    list2={filteredList}
                    type="donut"
                    total={pcpBreakdown?.PcpBreakDown?.Total}
                  />
                </div>

                <div className="w-full">
                  {filteredList?.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex gap-5 items-center w-full">
                      <Image
                        src={
                          item.name === "Classic"
                            ? "/images/pending-remmitance.png"
                            : item.name === "Complimentary"
                            ? "/images/comp.png"
                            : item.name === "Express"
                            ? "/images/express.png"
                            : item.name === "Loyalty"
                            ? "/images/active.png"
                            : item.name === "Marketplace"
                            ? "/images/marketplace.png"
                            : item.name === "Subscriptions"
                            ? "/images/pending-matured.png"
                            : item.name === "GPS"
                            ? "/images/cancelled.png"
                            : item.name === "Attach GPS"
                            ? "/images/cancelled.png"
                            : item.name === "Unattach GPS"
                            ? "/images/cancelled.png"
                            : item.name === "Loyalty Service"
                            ? "/images/matured.png"
                            : item.name === "Loyalty Cash"
                            ? "/images/suspended.png"
                            : ""
                        }
                        alt={item.name}
                        width={10}
                        height={10}
                      />
                      <div className="text-muted-foreground w-full font-semibold text-sm flex items-center">
                        {item.name}
                        {item.name === "Attach GPS" ? (
                          <Tooltip
                            iconComponent={
                              <MdOutlineLocationOn className="text-lg ml-1 text-[#4C566A]" />
                            }
                            isIconComponent={true}
                            iconText={"GPS Connected"}
                          />
                        ) : item.name === "Unattach GPS" ? (
                          <Tooltip
                            iconComponent={
                              <MdOutlineLocationOff className="text-lg ml-1 text-[#4C566A]" />
                            }
                            isIconComponent={true}
                            iconText={"GPS Not Connected"}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex w-full gap-5 justify-center">
                        <div className="text-base font-medium text-left text-muted-foreground w-full">
                          {item.percent}%
                        </div>
                        <div className="text-base font-medium text-muted-foreground text-left w-full">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ShadowContainer>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Div3_1;
