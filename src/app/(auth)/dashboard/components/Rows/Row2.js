"use client";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import React, { useContext } from "react";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { DashboardContext } from "../../DashboardContext";
import { PiArrowFatRightFill } from "react-icons/pi";
import { GrDocumentDownload } from "react-icons/gr";
import { FaExclamationCircle } from "react-icons/fa";
import Tooltip from "@/app/Components/Tooltip";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";

const Row2 = ({ row2data, loading }) => {
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

  let list2 = [];
  if (row2data) {
    list2 = [
      {},
      {
        id: 14,
        heading: "Service Redeemed",
        tooltip:
          "This is the total number of services redeemed between the selected date period.\nThis includes Active, Inactive, Matured and Cancelled contracts",
        amount: row2data.serviceredeem,
        amount2: row2data.servicecountwithamount,
        value: row2data.serviceredeemamount,
        arrowColor: "#008000",
        serviceredeemMatured: row2data.serviceredeemmatured,
        serviceredeemmaturedamount: row2data.serviceredeemmaturedamount,
      },
      {
        id: 15,
        heading: "Service Pending",
        tooltip:
          "This is the number of services pending including active and inactive contracts and doesn't include Cancelled, Matured contracts and Magenta Services or Factory Oil Changes",
        amount: row2data.servicepending,
        amount2: row2data.pending_service_count,
        value: row2data.servicependingamount,
        arrowColor: "#008000",
      },
      {
        // heading: "Matured Contracts",
        // amount: row2data.maturedcontract,
        // value: row2data.maturedcontracttotalCost,
        // green: row2data.maturedcontracttakenin,
        // brown: row2data.maturedcontracttotalCost,
      },
    ];
  }

  return (
    // <>
    //   {dealerredemption && dealerredemption.row2_show !== 0 && (
    //     <div className="max-w-full container-max-width">
    //       {rowLoader ? (
    //         <div className="flex justify-center items-center">
    //           <SpinnerLoader />
    //         </div>
    //       ) : (
    //         <ShadowContainer>
    //           <div className="w-full flex flex-wrap gap-y-10">
    //             {list2.map((data, i) => (
    //               <Data key={i} i={i} data={data} name={"row2"} />
    //             ))}
    //           </div>
    //         </ShadowContainer>
    //       )}
    //     </div>
    //   )}
    // </>
    <>
      {loading ? (
        <SpinnerLoader />
      ) : (
        dealerredemption?.row2_show === 1 && (
          <ShadowContainer>
            <div className=" rounded-xl p-1 w-full max-w-3xl mx-auto">
              <div className="mb-3 text-base font-semibold capitalize flex justify-start px-2">
                <span className="px-4 py-[6px] bg-black rounded-2xl text-white">
                  Row 2
                </span>
              </div>
              <div className="space-y-4">
                {list2?.map(
                  (item, index) =>
                    item.id && (
                      <div
                        key={index}
                        className={`bg-muted rounded-lg border border-secondary p-4 shadow-sm ${
                          item.heading === "Service Redeemed" ? "" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center text-card-foreground/90 font-semibold gap-2">
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
                            <span className="text-muted-foreground font-semibold text-lg">
                              {item.amount}
                            </span>
                            <span className="text-secondary-foreground">|</span>
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
                          <div className="text-card-foreground font-semibold text-lg w-1/4">
                            ${item.value}
                          </div>
                        </div>
                        {item.heading === "Service Redeemed" && (
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
                              <span className="font-semibold block text-lg">
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
                        )}
                      </div>
                    )
                )}
              </div>
            </div>
          </ShadowContainer>
        )
      )}
    </>
  );
};

export default Row2;
