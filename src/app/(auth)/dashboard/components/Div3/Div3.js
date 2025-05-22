"use client";
import React, { useContext } from "react";

import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { DashboardContext } from "../../DashboardContext";
import { GlobalContext } from "@/app/Provider";

// import Chart from "react-apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { Card, Skeleton } from "@nextui-org/react";
import Graph from "./Graph";
import Graph2 from "./Graph2";
import Image from "next/image";
// import Graph3 from "../Div3_1/Graph3";

const Div3 = () => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { dealersetting, pcpBreakdown, rowLoader } =
    useContext(DashboardContext);

  const contracts = dealersetting?.dashboardContract;
  const displayDates = dealersetting?.DateFilter;
  const today = new Date().toLocaleDateString("en-US"); // Get today's date in MM/DD/YYYY format

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  // Check if startdate and enddate are present

  // console.log("DATES:", displayedDates);

  // useEffect(() => {
  //   if (startdate || enddate) {
  //     setdealersetting(null);
  //     setPcpBreakdown(null);
  //   }
  // }, [startdate, enddate]);

  let list2 = [];
  let list3 = [];

  let list = [
    { name: "Active", value: 0, percent: 0 },
    { name: "Pending Remittance", value: 0, percent: 0 },
    { name: "Cancelled", value: 0, percent: 0 },
    { name: "Matured", value: 0, percent: 0 },
    { name: "Pending Matured", value: 0, percent: 0 },
    { name: "Suspended", value: 0, percent: 0 },
  ];
  let list1 = [
    { name: "Active", value: 0, percent: 0 },
    { name: "Pending Remittance", value: 0, percent: 0 },
    { name: "Cancelled", value: 0, percent: 0 },
    { name: "Matured", value: 0, percent: 0 },
    { name: "Pending Matured", value: 0, percent: 0 },
    { name: "Suspended", value: 0, percent: 0 },
  ];

  // simple <Graph />
  if (dealersetting) {
    list = [
      {
        color: "#00C3B0",
        dotImage: "/images/active.png",
        id: 30,
        name: "Active",
        value: contracts?.active,
        percent: contracts?.active_per,
        tooltipText:
          "This is the number of active contract issued in the selected date period",
      },
      {
        id: 7,
        color: "#0080B2",
        name: "Pending Remittance",
        value: contracts?.inactive,
        percent: contracts?.inactive_per,
        tooltipText:
          "This is the number of pending contract issued in the selected date period",
      },
      {
        id: "c1",
        color: "#C3002F",
        name: "Cancelled",
        value: contracts?.salecancelled,
        percent: contracts?.cancelled_per,
        tooltipText:
          "This is the number of cancelled contract issued in the selected date period",
      },
      {
        name: "Matured",
        color: "#000000",
        value: contracts?.salematured,
        percent: contracts?.matured_per,
      },
      {
        id: 16,
        color: "#FA7137",
        name: "Pending Matured",
        value: contracts?.salependingmatured,
        percent: contracts?.pending_matured_per,
      },
      {
        name: "Suspended",
        color: "#99B2C6",
        value: contracts?.Suspended,
        percent: contracts?.suspended_per,
      },
    ];
  }

  // simple <Graph2 />

  if (dealersetting) {
    list1 = [
      {
        color: "#00C3B0",
        dotImage: "/images/active.png",
        id: 30,
        name: "Active",
        value: contracts.active,
        percent: contracts.active_per,
        tooltipText:
          "This is the number of active contract issued in the selected date period",
      },
      {
        id: 7,
        color: "#0080B2",
        name: "Pending Remittance",
        value: contracts.inactive,
        percent: contracts.inactive_per,
        tooltipText:
          "This is the number of pending contract issued in the selected date period",
      },
      {
        id: "c1",
        color: "#C3002F",
        name: "Cancelled",
        value: contracts.cancelled,
        percent: contracts.cancelled_per,
        tooltipText:
          "This is the number of cancelled contract issued in the selected date period",
      },
      {
        name: "Matured",
        color: "#000000",
        value: contracts.matured,
        percent: contracts.matured_per,
      },
      {
        id: 16,
        color: "#FA7137",
        name: "Pending Matured",
        value: contracts.pendingmatured,
        percent: contracts.pending_matured_per,
      },
      {
        name: "Suspended",
        color: "#99B2C6",
        value: contracts.Suspended,
        percent: contracts.suspended_per,
      },
    ];
  }
  const totalValueOfList1 = list1.reduce((acc, item) => {
    return acc + (Number(item.value) || 0); // Convert value to a number
  }, 0);

  // console.log("totalValue", totalValueOfList1);

  return (
    <>
      <div className={`w-full flex  gap-4`}>
        <div className="w-full grid grid-cols-1 xlg:grid-cols-2 gap-6 ">
          {pcpBreakdown ? (
            <div className="w-full ">
              <ShadowContainer>
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Image
                      src={"/images/notes1.png"}
                      alt={"Speedo"}
                      width={40}
                      height={40}
                    />
                    <div className="font-bold text-xl ">Contracts Sold</div>
                    <div className="font-normal text-xs text-muted-foreground tracking-wider">
                      {displayDates}
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
                  <div className="w-full">
                    <Graph2
                      // options={chartOptions}
                      // series={series}
                      list2={list}
                      type="donut"
                      total={contracts?.total}
                    />
                  </div>
                  <div className="w-full">
                    {list?.map((item, i) => (
                      <div className="flex gap-5 items-center w-full" key={i}>
                        <Image
                          src={
                            item.name === "Active"
                              ? "/images/active.png"
                              : item.name === "Pending Remittance"
                              ? "/images/pending-remmitance.png"
                              : item.name === "Cancelled"
                              ? "/images/cancelled.png"
                              : item.name === "Matured"
                              ? "/images/matured.png"
                              : item.name === "Pending Matured"
                              ? "/images/pending-matured.png"
                              : item.name === "Suspended"
                              ? "/images/suspended.png"
                              : ""
                          }
                          alt={item.name}
                          width={10}
                          height={10}
                        />
                        <div className="text-muted-foreground w-full font-semibold text-sm">
                          {item.name}
                        </div>{" "}
                        <div className="flex w-full gap-5 justify-center">
                          <div className="text-base font-medium text-left w-full">
                            {item.percent}%
                          </div>
                          <div className="text-base font-medium  text-left w-full">
                            {Number(item.value).toLocaleString("en-US")}{" "}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ShadowContainer>
            </div>
          ) : rowLoader ? (
            <div className="w-full ">
              <ShadowContainer>
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-5">
                    {/* Skeleton for Image */}
                    <Skeleton className="w-10 h-10 rounded-full" />
                    {/* Skeleton for Title */}
                    <Skeleton className="h-6 w-48 rounded-lg" />
                    {/* Skeleton for Date */}
                    <Skeleton className="h-4 w-32 rounded-lg" />
                  </div>
                  <div>
                    {/* Skeleton for SVG */}
                    <Skeleton className="w-5 h-5 rounded-full" />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-8 mt-5">
                  <div className="w-full">
                    {/* Skeleton for Graph */}
                    <Skeleton className="h-48 w-full rounded-lg" />
                  </div>
                  <div className="w-full space-y-4">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="flex gap-5 items-center w-full">
                          {/* Skeleton for List Icons */}
                          <Skeleton className="w-5 h-5 rounded-full" />
                          {/* Skeleton for List Item Text */}
                          <div className="w-full flex justify-between items-center">
                            <Skeleton className="h-4 w-2/5 rounded-lg" />
                            <Skeleton className="h-4 w-1/5 rounded-lg" />
                            <Skeleton className="h-4 w-1/5 rounded-lg" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </ShadowContainer>
            </div>
          ) : null}
          {dealersetting ? (
            <div className=" w-full">
              <ShadowContainer>
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-5">
                    <Image
                      src={"/images/speedometer.png"}
                      alt={"Speedo"}
                      width={40}
                      height={40}
                    />
                    <div className="font-bold text-xl ">Overall Status</div>
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
                  <div className="w-full">
                    <Graph
                      // options={chartOptions}
                      // series={series}
                      list={list1}
                      type="donut"
                      totalValueOfList1={totalValueOfList1}
                    />
                  </div>
                  <div className="w-full">
                    {list1?.map((item, i) => (
                      <div key={i} className="flex gap-5 items-center w-full">
                        <Image
                          src={
                            item.name === "Active"
                              ? "/images/active.png"
                              : item.name === "Pending Remittance"
                              ? "/images/pending-remmitance.png"
                              : item.name === "Cancelled"
                              ? "/images/cancelled.png"
                              : item.name === "Matured"
                              ? "/images/matured.png"
                              : item.name === "Pending Matured"
                              ? "/images/pending-matured.png"
                              : item.name === "Suspended"
                              ? "/images/suspended.png"
                              : ""
                          }
                          alt={item.name}
                          width={10}
                          height={10}
                        />
                        <div className="text-muted-foreground w-full font-semibold text-sm">
                          {item.name}
                        </div>{" "}
                        <div className="flex w-full gap-5 justify-center">
                          {/* <div className="text-base font-medium text-left text-[#7D8698] w-full">
                          {item.percent}%
                        </div> */}
                          <div className="text-base font-medium  text-left w-full">
                            {Number(item.value).toLocaleString("en-US")}{" "}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ShadowContainer>
            </div>
          ) : rowLoader ? (
            <div className="w-full">
              <ShadowContainer>
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-5">
                    {/* Skeleton for Image */}
                    <Skeleton className="w-10 h-10 rounded-full" />
                    {/* Skeleton for Title */}
                    <Skeleton className="h-6 w-48 rounded-lg" />
                    {/* Skeleton for Date */}
                    <Skeleton className="h-4 w-32 rounded-lg" />
                  </div>
                  <div>
                    {/* Skeleton for SVG */}
                    <Skeleton className="w-5 h-5 rounded-full" />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-8 mt-5">
                  <div className="w-full">
                    {/* Skeleton for Graph */}
                    <Skeleton className="h-48 w-full rounded-lg" />
                  </div>
                  <div className="w-full space-y-4">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="flex gap-5 items-center w-full">
                          {/* Skeleton for List Icons */}
                          <Skeleton className="w-5 h-5 rounded-full" />
                          {/* Skeleton for List Item Text */}
                          <div className="w-full flex justify-between items-center">
                            <Skeleton className="h-4 w-2/5 rounded-lg" />
                            <Skeleton className="h-4 w-1/5 rounded-lg" />
                            <Skeleton className="h-4 w-1/5 rounded-lg" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </ShadowContainer>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Div3;
