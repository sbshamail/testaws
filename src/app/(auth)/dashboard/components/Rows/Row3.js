"use client";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/app/Provider";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { DashboardContext } from "../../DashboardContext";
import TailwindLoading from "@/app/Components/TailwindLoading";
import toast from "react-hot-toast";
import Data from "./Data";
import { PiArrowFatRightFill } from "react-icons/pi";
import { GrDocumentDownload } from "react-icons/gr";
import Tooltip from "@/app/Components/Tooltip";
import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";
const Row3 = ({ row3data, loading }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    dealersetting,
    startdate,
    enddate,
    FixedDateParameter,
    dealerredemption,
    setdealerredemption,
    rowLoader,
  } = useContext(DashboardContext);

  let list1 = [];

  if (row3data) {
    list1 = [
      {
        id: "p2",
        heading: "Contract Reserve",
        tooltip:
          "This is the number of contracts issued in the selected date period.\nThis number include reserve of Matured and cancelled contracts.\nCancelled Amount: $0.00.\nMatured Amount: $0.00.",
        amount: row3data.Reserved?.toLocaleString("en-US"),
        value: row3data.ReservedAmount?.toLocaleString("en-US"),
        arrowColor: "#00B7FF",
      },
      {
        id: "p4",
        heading: "Service Redeemed",
        tooltip:
          "This is the number of services redeemed From contracts issued in the selected date period",
        amount: row3data.serviceredeem,
        // amount2: row3data.redem_service_count,
        value: row3data.serviceredeemamount,
        arrowColor: "#00B7FF",
      },
      {
        id: "p5",
        heading: "Reserve Pending",
        tooltip:
          "This is the number of services pending From contracts issued in the selected date period exclude cancelled and matured contracts",
        amount: row3data.servicepending,
        // amount2: row3data.pending_service_count,
        value: row3data.servicependingamount,
        arrowColor: "#00B7FF",
      },
      {
        id: "p3",

        heading: "Matured Contracts",
        tooltip:
          "This is the number of contracts matured in the selected date period",
        amount: row3data.maturedcontract,
        value: row3data.maturedcontracttotalCost,
        green: row3data.maturedcontracttakenin,
        brown: row3data.maturedcontracttotalCost,
        orange: row3data.serviceredeemmaturedamount,
        arrowColor: "#008000",
      },
    ];
  }

  const fetchCsv = (export_type, filename) => {
    // console.log(export_type);
    // setloading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealersetting?.dealer.DealerID);
    formdata.append("export_type", export_type);
    formdata.append("FromDate", startdate);
    formdata.append("ToDate", enddate);
    formdata.append("FixedDateParameter", FixedDateParameter);
    formdata.append("UUID", "ef78d0cf-300b-44ee-a914-046ae8acc6f7");

    fetch("https://mypcp.us/webservices/dashboard/dashboardexport", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        // console.log("Response status:", response); // Log the response status
        return response.blob(); // Parse the response as a Blob
      })
      .then((blob) => {
        // setloading(false);
        if (blob) {
          var fileURL = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = fileURL;
          a.download = `${filename}.xlsx`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          toast.success("File downloaded successfully");
        } else {
          toast.error("Failed to download file");
        }
      })
      .catch((error) => {
        // setloading(false);
        toast.error("Can't add Address err3");
        console.log(error);
      });
  };

  return (
    <>
      {dealerredemption?.row3_show === 1 && (
        <ShadowContainer className="relative">
          <div className="rounded-xl p-1 w-full max-w-3xl mx-auto">
            <div className="mb-3 text-base font-semibold capitalize flex justify-start px-2">
              <span className="px-4 py-[6px] bg-black rounded-2xl text-white">
                Override Reserve Plans
              </span>
            </div>
            <div className="space-y-4">
              {list1?.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg border  border-secondary p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-card-foreground font-semibold gap-2">
                      {item.heading}
                      <Tooltip
                        iconComponent={
                          <GrDocumentDownload
                            onClick={() => {
                              fetchCsv(item.id, item.heading);
                            }}
                            className="text-gray-400 cursor-pointer"
                          />
                        }
                        isIconComponent={true}
                        iconText={item.tooltip}
                      />{" "}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 w-1/3">
                      <span className="text-card-foreground font-semibold text-lg">
                        {item.amount}
                      </span>
                      {item.amount2 > 0 && (
                        <span className="text-card-foreground/80">|</span>
                      )}
                      {item.amount2 > 0 && (
                        <span className="text-green-500 font-semibold text-lg">
                          {item.amount2}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center items-center">
                      <PiArrowFatRightFill
                        className="text-lg"
                        style={{ color: item.arrowColor }}
                      />
                    </div>
                    <div className="text-gray-600 font-semibold text-lg">
                      ${item.value}
                    </div>
                  </div>
                </div>
              ))}

              {list1.length > 0 && (
                <div className="flex w-full justify-end items-center mt-4 gap-2">
                  <Tooltip
                    iconComponent={
                      <FaExclamationCircle className="text-siteBlue text-xl" />
                    }
                    isIconComponent={true}
                    iconText={
                      "Pending amount of Gifted Matured Contracts unused services."
                    }
                  />{" "}
                  <span className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg shadow-md font-bold">
                    {/* {list1[3]?.green} */}
                    <Tooltip
                      text={`$${list1[3]?.green ? list1[3].green : "0.00"}`}
                      isIconComponent={false}
                      tooltipText={
                        "Pending amount of Gifted Matured Contracts unused services."
                      }
                      color={"white"}
                    />
                  </span>
                  <span className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg shadow-md font-bold">
                    {/* {list1[3]?.brown} */}
                    <Tooltip
                      text={`$${list1[3]?.brown ? list1[3].brown : "0.00"}`}
                      isIconComponent={false}
                      tooltipText={"Forfeit Amount of Matured Contracts."}
                      color={"white"}
                    />
                  </span>
                  <span className="bg-orange-600 text-white text-sm px-4 py-2 rounded-lg shadow-md font-bold">
                    {/* {list1[3]?.orange} */}
                    <Tooltip
                      text={`$${list1[3]?.orange ? list1[3].orange : "0.00"}`}
                      isIconComponent={false}
                      tooltipText={
                        "This is the total number of services redeemed after expire only between the selected date period<br>This includes Matured contracts"
                      }
                      color={"white"}
                    />
                  </span>
                </div>
              )}
            </div>
          </div>
        </ShadowContainer>
      )}
    </>
  );
};

export default Row3;
