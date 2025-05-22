"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/app/Components/containers/PageContainer";
import { GlobalContext } from "@/app/Provider";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

import CancelledCoupanTable from "./CancelledCoupanTable";

import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { truncated } from "@/utils/helpers";
function Page({ params }) {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [formattedDate, setFormattedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancellationData, setCancellationData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id);

  const queryParams = decodedId.split("&");
  const queryObj = {};

  queryParams.forEach((param) => {
    const [key, value] = param.split("=");
    queryObj[key] = value;
  });

  const id = queryObj.id;
  const getMonthOptions = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let months = [];
    if (currentMonth === 0) {
      months = [
        { label: monthNames[11], value: "12", year: currentYear - 1 }, // December
        { label: monthNames[0], value: "01", year: currentYear }, // January
      ];
    } else {
      const previousMonth = (currentMonth - 1 + 12) % 12;
      const previousMonthYear =
        currentMonth === 0 ? currentYear - 1 : currentYear;
      months = [
        {
          label: monthNames[previousMonth],
          value: (previousMonth + 1).toString().padStart(2, "0"),
          year: previousMonthYear,
        },
        {
          label: monthNames[currentMonth],
          value: (currentMonth + 1).toString().padStart(2, "0"),
          year: currentYear,
        },
      ];
    }
    return months;
  };

  useEffect(() => {
    // Preselect current month and year when the component mounts
    setSelectedMonth((currentMonth + 1).toString().padStart(2, "0"));
    setSelectedYear(currentYear.toString());
  }, []);

  // Update formatted date when month and year are selected
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      setFormattedDate(`${selectedMonth}-${selectedYear}`);
    }
  }, [selectedMonth, selectedYear]);

  const monthOptions = getMonthOptions();

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const formattedExpiryDate = `${String(currentDate.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(currentDate.getDate()).padStart(
    2,
    "0"
  )}/${currentDate.getFullYear()}`;

  const fetchCancellationDetails = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("ContractNo", id);
    formdata.append("ExpiryDate", formattedExpiryDate);
    formdata.append("Mileage", 0);

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/cancellationdetail", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        setLoading(false);
        setCancellationData(res);
        // console.log("resres", res);
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while fetching data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (GLOBAL_RESPONSE) {
      fetchCancellationDetails();
    }
  }, [GLOBAL_RESPONSE]);

  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />
      <div className="w-full flex gap-2 items-center">
        <IoArrowBack
          className="cursor-pointer text-xl Transition text-accent-foreground hover:text-accent-foreground/90"
          onClick={() => router.back()}
        />
        <h1 className="font-bold text-xl my-5">
          CONTRACT - CANCELLATION (Cancelled)
        </h1>
      </div>
      <div className="w-full flex flex-col  mt-5 gap-4">
        <ShadowContainer>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <div className="text-lg font-semibold uppercase">Dealership:</div>
              <div className="text-lg font-extrabold">
                {/* {data?.GetDealerDetails?.DealerTitle} */}
                {cancellationData?.DealerTitle}
              </div>
            </div>
          </div>
        </ShadowContainer>
        <ShadowContainer>
          {cancellationData?.cancelledmessage && (
            <div className="p-4 mb-4 border-l-4 border-red-500">
              <p className="bg-gradient-to-r from-red-500/20 via-red-500/50 to-red-500/20 p-2 rounded-lg text-lg font-semibold text-center">
                {cancellationData?.cancelledmessage
                  ?.split(/(D\d{7})/)
                  .map((part, index) => {
                    if (/D\d{3}/.test(part)) {
                      // If this part matches the contract ID pattern (e.g., D042)
                      return (
                        <span
                          key={index}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          {part}
                        </span>
                      );
                    }
                    return part; // Return the rest of the string unchanged
                  })}
              </p>
            </div>
          )}

          {cancellationData?.PlanName && (
            <div className="bg-gradient-to-r from-muted via-muted to-secondary text-foreground text-center p-2 rounded-lg mb-6 shadow-lg ">
              <div className="text-xl font-bold tracking-wide drop-shadow-lg">
                {cancellationData?.PlanName} {cancellationData?.PlanYear}{" "}
                {cancellationData?.PlanYear === 1 ? "YEAR" : "YEARS"}{" "}
                {Number(cancellationData?.PlanMileage)
                  ? Number(cancellationData?.PlanMileage).toLocaleString()
                  : cancellationData?.PlanMileage}{" "}
                MILE/KM{" "}
              </div>
            </div>
          )}

          <table className="w-full text-sm text-left flex flex-col justify-center items-center ">
            <tbody className="w-full flex justify-center flex-col">
              <tr className="border-b border-border flex justify-center items-center ">
                <td className="px-4 font-semibold text-right">
                  Mileage at sale:
                </td>
                <td className="px-4 py-2 text-left">
                  {isNaN(Number(cancellationData?.ContractMileage))
                    ? "0"
                    : Number(
                        cancellationData?.ContractMileage
                      ).toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-border flex justify-center items-center">
                <td className="px-4 py-2 font-semibold text-right">
                  Full Refund Days:
                </td>
                <td className="px-4 py-2 text-left">
                  {cancellationData?.FullRefundDays ?? "-"}
                </td>
              </tr>
              <tr className="border-b border-border flex justify-center items-center">
                <td className="px-4 py-2 font-semibold text-right">
                  Cancel Date:
                </td>
                <td className="px-4 py-2 text-left">
                  {cancellationData?.CancelDate ?? "-"}
                </td>
              </tr>
              <tr className="border-b border-border flex justify-center items-center">
                <td className="px-4 py-2 font-semibold text-right">
                  Terminate Date:
                </td>
                <td className="px-4 py-2 text-left">
                  {cancellationData?.TerminateDate ?? "-"}
                </td>
              </tr>
              {cancellationData?.CancelMileage !== "0" && (
                <tr className="border-b border-border flex justify-center items-center">
                  <td className="px-4 py-2 font-semibold text-right">
                    Cancel Mileage:
                  </td>
                  <td className="px-4 py-2 text-left">
                    {cancellationData?.CancelMileage ?? "-"}
                  </td>
                </tr>
              )}
              <tr className="border-b border-border flex justify-center items-center">
                <td className="px-4 py-2 font-semibold text-right">
                  Cancel Percentage:
                </td>
                <td className="px-4 py-2 text-left">
                  {`${truncated(cancellationData?.CancelPercentage)}%` ?? "-"}
                </td>
              </tr>
              <div className="border-b border-border flex justify-center items-center flex gap-2">
                <span className=" py-2 font-semibold text-red-500 text-right">
                  Cancel Reason:
                </span>
                <span className=" py-2 text-red-500 text-left">
                  {cancellationData?.cReason ?? "-"}
                </span>
              </div>

              {cancellationData?.cReason?.includes("Time Based") && (
                <div className="border-b border-border flex justify-center items-center">
                  {/* <td></td> */}
                  <span className="px-4 py-2 text-red-500 font-semibold text-left">
                    Time Base
                  </span>
                </div>
              )}

              <tr className="w-full border-b border-border flex justify-center items-center">
                <td className="px-4 py-2 font-semibold text-right">
                  Sale Date:
                </td>
                <td className="px-4 py-2 text-left">
                  {cancellationData?.SaleDate ?? "-"}
                </td>
              </tr>
              <tr className="border-b border-border flex justify-center items-center">
                <td className="px-4 py-2 font-semibold text-right">
                  Contract Expiration Date:
                </td>
                <td className="px-4 py-2 text-left">
                  {cancellationData?.ValidityDate ?? "-"}
                </td>
              </tr>
              <tr className="border-b border-border flex justify-center items-center">
                <td className="px-4 py-2 font-semibold text-right">
                  Total Plan Cost:
                </td>
                <td className="px-4 py-2 text-left">
                  $
                  {isNaN(Number(cancellationData?.txtTotalCost))
                    ? "0"
                    : Number(cancellationData?.txtTotalCost).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
          {cancellationData?.length > 0 && (
            <CancelledCoupanTable cancellationData={cancellationData} />
          )}
        </ShadowContainer>
      </div>
    </PageContainer>
  );
}

export default Page;
