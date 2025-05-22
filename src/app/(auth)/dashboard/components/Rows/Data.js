import Tooltip from "@/app/Components/Tooltip";
import React, { useState, useContext } from "react";
import { GlobalContext } from "@/app/Provider";
import { BiSolidRightArrow } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { DashboardContext } from "../../DashboardContext";

const Data = ({ data, i, name }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { dealersetting, startdate, enddate, FixedDateParameter } =
    useContext(DashboardContext);
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

  const isEmpty =
    data && Object.keys(data).length === 0 && data.constructor === Object;
  // color for arrow
  let color = "#29AAE1";
  if (name === "row2" || name === "row5" || i === 3) {
    color = "#2fed62";
  }

  return (
    <>
      {isEmpty ? (
        <div className={`w-1/4 px-4 flex flex-col gap-2`}></div>
      ) : (
        <div
          className={`w-1/4 px-4 flex flex-col gap-1 ${
            name !== "row2" && i != 3
              ? "border-r-2"
              : name === "row2" && i == 1
              ? "border-r-2"
              : ""
          }`}
        >
          <h6 className="text-lg font-semibold text-center">{data.heading}</h6>

          <div
            onClick={() => {
              fetchCsv(data.id, data.heading);
            }}
            className="w-full font-medium text-base text-right"
          >
            <Tooltip
              text={"Detail"}
              tooltipText={data.tooltip}
              color={"black"}
            />
          </div>

          <div className="w-full flex items-start justify-evenly font-semibold">
            <div className="flex flex-col gap-5">
              <div>{data.amount}</div>
              {data.amount2 && (
                <div className="text-green-500">{data.amount2}</div>
              )}
            </div>
            <BiSolidRightArrow color={color} size={20} />

            <div className="flex flex-col gap-2 text-gray-500">
              <div
                className={`${
                  (name === "row3" && i === 3) || (name === "row4" && i === 3)
                    ? "bg-green-400 text-white px-2 rounded"
                    : ""
                }`}
              >
                ${data.value ? data.value : 0}
              </div>
              {data.green && (
                <div className="bg-green-400 text-white px-2 rounded">
                  <Tooltip
                    text={`$${data.green}`}
                    isIconComponent={false}
                    tooltipText={
                      "Pending Amount of Gifted Matureed Contracts unused Services"
                    }
                    color={"white"}
                  />{" "}
                </div>
              )}

              {data.brown && (
                <div className="bg-[#F0AD4E] text-white px-2 rounded">
                  <Tooltip
                    text={`$${data.brown}`}
                    isIconComponent={false}
                    tooltipText={"Forfeit Amount of Matured Contracts"}
                    color={"white"}
                  />
                </div>
              )}

              {data.orange && (
                <div className="relative flex items-center gap-2">
                  <div className="bg-orange-400 text-white px-2 rounded">
                    <Tooltip
                      text={`$${data.orange}`}
                      isIconComponent={false}
                      tooltipText={
                        "This is the Total Numbers of services reedemed after expire only between the selected date Period. This includes matured contracts"
                      }
                      color={"white"}
                    />
                    {/* ${data.brown} */}
                  </div>

                  <Tooltip
                    iconComponent={
                      <BsInfoCircleFill color={"#29AAE1"} size={15} />
                    }
                    isIconComponent={true}
                    iconText={
                      "Includes services redeemed after contract is matured"
                    }
                  />
                  {/* <BsInfoCircleFill color={color} size={15} /> */}
                </div>
              )}
            </div>
            {/* <i class="fa-olid fa-circle-info" style="color: #00adef;"></i> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Data;
