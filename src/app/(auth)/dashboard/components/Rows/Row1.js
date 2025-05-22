"use client";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import React, { useContext } from "react";
import { GlobalContext } from "@/app/Provider";
import { DashboardContext } from "../../DashboardContext";
import toast from "react-hot-toast";
import { PiArrowFatRightFill } from "react-icons/pi";
import { GrDocumentDownload } from "react-icons/gr";
import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";

import Tooltip from "@/app/Components/Tooltip";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { currencyFormatter } from "@/utils/helpers";
import TooltipShad from "@/components/cui/tooltip/TooltipShad";
const Row1 = ({ row1data, loading }) => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    dealersetting,
    startdate,
    enddate,
    FixedDateParameter,
    dealerredemption,
  } = useContext(DashboardContext);

  const fetchCsv = (export_type, filename) => {
    // console.log(export_type);
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
        toast.error("Can't add Address err3");
        console.log(error);
      });
  };

  let list1 = [];
  const convertNumber = (value) => {
    return Number(value.replace(/,/g, ""));
  };
  if (row1data) {
    list1 = [
      {
        id: 2,
        heading: "Contract Reserve",
        tooltip:
          "This is the number of contracts issued in the selected date period.\nThis number include reserve of Matured and cancelled contracts.\nCancelled Amount: $21,904.00.\nMatured Amount: $306,761.00.\nSubscription Amount: $1,185.96",
        amount: row1data.Reserved?.toLocaleString("en-US"),
        value: convertNumber(row1data.ReservedAmount?.toLocaleString("en-US")),
        arrowColor: "#00B7FF",
      },
      {
        id: 4,
        heading: "Service Redeemed",
        tooltip:
          "This is the number of services redeemed From contracts issued in the selected date period.\nThis includes Active, Inactive, Matured and Cancelled contracts",
        amount: row1data.serviceredeem,
        amount2: row1data.redem_service_count,
        value: convertNumber(row1data.serviceredeemamount),
        amount2Tooltip:
          "This is the number of services that have amount in them",
        arrowColor: "#00B7FF",
      },
      {
        id: 5,
        heading: "Service Pending",
        tooltip:
          "This is the number of services pending From contracts issued in the selected date period exclude Cancelled, Matured contracts and Magenta Services or Factory Oil Changes",
        amount: row1data.servicepending,
        amount2: row1data.pending_service_count,
        value: convertNumber(row1data.servicependingamount),
        amount2Tooltip:
          "This is the number of services that have amount in them",
        arrowColor: "#00B7FF",
      },
      {
        id: 3,

        heading: "Matured Contracts",
        tooltip:
          "This is the number of contracts matured in the selected date period",
        amount: row1data.maturedcontract,
        value:
          convertNumber(row1data.maturedcontracttotalCost ?? 0) +
          convertNumber(row1data.maturedcontracttakenin ?? 0),

        green: row1data.maturedcontracttakenin,
        brown: row1data.maturedcontracttotalCost,
        orange: row1data.serviceredeemmaturedamount,
        arrowColor: "#008000",
      },
    ];
  }
  return (
    <>
      {loading ? (
        <SpinnerLoader />
      ) : (
        dealerredemption?.row1_show === 1 && (
          <ShadowContainer className="relative">
            <div className="rounded-xl p-1 w-full max-w-3xl mx-auto h-full">
              <div className="mb-3 text-base font-semibold capitalize flex justify-start px-2">
                <span className="px-4 py-[6px] bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl text-white">
                  Row 1
                </span>
              </div>
              <div className="space-y-4">
                {list1?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-muted rounded-lg border border-secondary p-4 text-muted-forground"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-card-foreground/80  font-semibold gap-2">
                        {item.heading}
                        <Tooltip
                          iconComponent={
                            <GrDocumentDownload
                              onClick={() => {
                                fetchCsv(item.id, item.heading);
                              }}
                              className=" cursor-pointer"
                            />
                          }
                          isIconComponent={true}
                          iconText={item.tooltip}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 w-1/4">
                        <span className=" font-semibold text-lg">
                          {item.amount}
                        </span>
                        {item.amount2 && (
                          <span className="text-secondary-foreground">|</span>
                        )}
                        {item.amount2 && (
                          <span className="text-green-500 font-semibold text-lg">
                            <Tooltip
                              text={`${item.amount2}`}
                              isIconComponent={false}
                              tooltipText={item?.amount2Tooltip}
                              color={"text-green-500"}
                            />
                          </span>
                        )}
                      </div>
                      <div className="flex w-1/6 justify-end items-center">
                        <PiArrowFatRightFill
                          className="text-lg"
                          style={{ color: item.arrowColor }}
                        />
                      </div>

                      <div className="text-card-foreground/80 font-semibold text-lg w-1/4 text-right">
                        {currencyFormatter(item.value)}
                      </div>
                    </div>
                  </div>
                ))}
                {list1.length > 0 && (
                  <div className="flex w-full justify-end items-center mt-4 gap-2">
                    <TooltipShad
                      content={
                        "Includes services redeemed after contract is matured"
                      }
                    >
                      <FaExclamationCircle className="text-siteBlue text-xl" />
                    </TooltipShad>

                    <span className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg shadow-md font-bold">
                      <TooltipShad
                        content={
                          "Pending amount of Gifted Matured Contracts unused services"
                        }
                      >
                        ${list1[3]?.green ? list1[3].green : "0.00"}
                      </TooltipShad>
                    </span>
                    <span className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg shadow-md font-bold">
                      <TooltipShad
                        content={"Forfeit Amount of Matured Contracts."}
                      >
                        ${list1[3]?.brown ? list1[3].brown : "0.00"}
                      </TooltipShad>
                    </span>
                    <span className="bg-orange-600 text-white text-sm px-4 py-2 rounded-lg shadow-md font-bold">
                      <TooltipShad
                        content={
                          <span>
                            This is the total number of services redeemed after
                            expire only between the selected date period.
                            <br />
                            This includes Matured contracts.
                          </span>
                        }
                      >
                        ${list1[3]?.orange ? list1[3].orange : "0.00"}
                      </TooltipShad>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </ShadowContainer>
        )
      )}
    </>
  );
};

export default Row1;
