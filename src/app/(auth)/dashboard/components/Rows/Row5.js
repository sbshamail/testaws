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
import Tooltip from "@/app/Components/Tooltip";
import { GrDocumentDownload } from "react-icons/gr";
import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";
const Row5 = ({ row5data, loading }) => {
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

  // const fetchRow2data = () => {
  //     setloading(true);
  //     const { pcp_user_id, user_cizacl_role_id, user_id, Token } = GLOBAL_RESPONSE;
  //     const headers = new Headers();
  //     headers.append("AUTHORIZATION", Token);
  //     let formdata = new FormData();
  //     formdata.append("pcp_user_id", pcp_user_id);
  //     formdata.append("role_id", user_cizacl_role_id);
  //     formdata.append("user_id", user_id);
  //     formdata.append("DealerID", dealersetting?.dealer.DealerID);
  //     formdata.append("FromDate", startdate);
  //     formdata.append("ToDate", enddate);
  //     formdata.append("FixedDateParameter", FixedDateParameter);
  //     formdata.append("Total", dealersetting?.dashboardContract.total);
  //     formdata.append("Matured", dealersetting?.dashboardContract.matured);

  //     fetch("https://mypcp.us/webservices/dashboard/reservedcontract", {
  //         method: "POST",
  //         body: formdata,
  //         headers: headers,
  //     })
  //         .then((response) => {
  //             let res = response.json();
  //             return res;
  //         })
  //         .then((res) => {
  //             setloading(false);
  //             if (res.success == "1") {
  //                 toast.success("Row 2 data found");
  //                 setrow2data(res.reservedcontract);
  //             }
  //             else {
  //                 toast.error(res.message);
  //             }
  //         })
  //         .catch((error) => {
  //             setloading(false);
  //             toast.error("Can't get Row 2 data err3");
  //             console.log(error);
  //         });
  // };

  let list1 = [];

  if (row5data) {
    list1 = [
      {},
      {
        id: 14,
        heading: "Service Redeemed",
        tooltip:
          "This is the total number of services redeemed between the selected date period",
        amount: row5data.serviceredeem,
        amount2: row5data.redem_service_count,
        arrowColor: "#008000",
        value: row5data.serviceredeemamount,
      },
      {
        id: 15,
        heading: "Service Pending",
        tooltip:
          "This is the number of services pending including active and inactive contracts and doesn't include matured or cancelled contracts",
        amount: row5data.servicepending,
        amount2: row5data.pending_service_count,
        arrowColor: "#008000",
        value: row5data.servicependingamount,
      },
      {},
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
    // <>
    //   {dealerredemption && dealerredemption.row5_show !== 0 && (
    //     <div className="flex max-w-full container-max-width gap-6 mt-[27px] mb-[27px] ">
    //       {rowLoader ? (
    //         <div className="flex justify-center items-center w-full">
    //           <SpinnerLoader />
    //         </div>
    //       ) : (
    //         <ShadowContainer>
    //           <div className="w-full flex flex-wrap gap-y-10">
    //             {list1.map((data, i) => (
    //               <Data key={i} i={i} data={data} name={"row5"} />
    //             ))}
    //           </div>
    //         </ShadowContainer>
    //       )}
    //     </div>
    //   )}
    // </>

    //     {/* <div className='w-full'>
    //     <ShadowContainer>
    //         {loading ? <TailwindLoading /> :
    //             <div className='w-full flex justify-between gap-10'>
    //                 {list1.map((data, i) => (
    //                     <Data key={i} i={i} data={data} />
    //                 ))}

    //             </div>
    //         }
    //     </ShadowContainer>
    // </div> */}
    <>
      {dealerredemption?.row5_show === 1 && (
        <ShadowContainer>
          <div className=" rounded-xl p-1 w-full max-w-3xl mx-auto">
            <div className="mb-3 text-base font-semibold capitalize flex justify-start px-2">
              <span className="px-4 py-[6px] bg-black rounded-2xl text-white">
                Row 5
              </span>
            </div>
            <div className="space-y-4">
              {list1?.map(
                (item, index) =>
                  item.id && (
                    <div
                      key={index}
                      className={`bg-white rounded-lg border border-secondary p-4 shadow-sm ${
                        item.heading === "Service Redeemed" ? "bg-red-500" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-gray-600 font-semibold gap-2">
                          {item.heading}
                          <div className="cursor-pointer">
                            <Tooltip
                              iconComponent={
                                <GrDocumentDownload
                                  onClick={() => {
                                    fetchCsv(item.id, item.heading);
                                  }}
                                  className="text-gray-400"
                                />
                              }
                              isIconComponent={true}
                              iconText={item.tooltip}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 w-1/4 items-center">
                          {/* {item.tooltip && (
                      <FaExclamationCircle className="text-siteBlue text-lg" />
                    )} */}
                          <span className="text-gray-900 font-semibold text-lg">
                            {item.amount}
                          </span>
                          <span className="text-gray-400">|</span>
                          {/* <span className="text-green-500 font-semibold text-lg"> */}
                          {/* {item.amount2} */}
                          <Tooltip
                            text={`${item.amount2}`}
                            isIconComponent={false}
                            tooltipText={
                              "This is the number of services that have amount in them"
                            }
                            color={"text-green-500"}
                          />
                          {/* </span> */}
                        </div>
                        <div className="w-1/6 flex justify-center">
                          <PiArrowFatRightFill
                            className="text-lg"
                            style={{ color: item.arrowColor }}
                          />
                        </div>
                        <div className="text-gray-600 font-semibold text-lg w-1/4">
                          ${item.value}
                        </div>
                      </div>
                      {/* {item.heading === "Service Redeemed" && (
                    <div className="w-full my-1 flex justify-between items-center border-gray-300 pt-2">
                      <div className="flex gap-2 items-center w-1/4">
                        <Tooltip
                          iconComponent={
                            <FaExclamationCircle className="text-siteBlue text-lg" />
                          }
                          isIconComponent={true}
                          iconText={
                            "Includes services redeemed after the contract is matured"
                          }
                        />
                        <span className="text-black font-semibold block text-lg">
                          {item.serviceredeemMatured}
                        </span>
                      </div>
                      <div className="w-1/6 flex justify-center">
                        <PiArrowFatRightFill className="text-[#F57F1E] text-lg" />
                      </div>
                      <div className="text-gray-400 font-semibold text-lg w-1/4">
                        ${item.serviceredeemmaturedamount}
                      </div>
                    </div>
                  )} */}
                    </div>
                  )
              )}
            </div>
          </div>
        </ShadowContainer>
      )}
    </>
  );
};

export default Row5;
