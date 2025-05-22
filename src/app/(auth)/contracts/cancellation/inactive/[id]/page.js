"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/app/Components/containers/PageContainer";
import { GlobalContext } from "@/app/Provider";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { unixTimestampToDate } from "@/app/functions";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import { GiSpanner } from "react-icons/gi";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { currencyFormatter } from "@/utils/helpers";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";

function Page({ params }) {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const router = useRouter();
  const decodedId = decodeURIComponent(params.id);

  const queryParams = decodedId.split("&");
  const queryObj = {};

  queryParams.forEach((param) => {
    const [key, value] = param.split("=");
    queryObj[key] = value;
  });

  const id = queryObj.id;
  const cancellationMileageParams = queryObj.mileage;

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [cancellationData, setCancellationData] = useState([]);
  const [cancellationMileage, setCancellationMileage] = useState(
    cancellationMileageParams
  );
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const reasoncodes = cancellationData?.reasoncodes?.map((code, i) => {
    return { text: code.ReasonName, value: code.ReasonCodeID };
  });

  const payeetypes = cancellationData?.cancel_payee_types?.map((type, i) => {
    return { text: type.CancelPayeeType, value: type.CancelPayeeTypeID };
  });

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
          CONTRACT - CANCELLATION (InActive)
        </h1>
      </div>
      <div className="flex flex-col max-w-full container-max-width mt-5 gap-4">
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
            <div className="p-4 mb-4 border-l-4 border-siteBlue">
              <p className="bg-gradient-to-r from-siteBlue/20 via-siteBlue to-siteBlue/20 text-white text-lg font-semibold text-center">
                {cancellationData?.cancelledmessage}
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
                MILE/KM
              </div>
            </div>
          )}

          <table className="w-full text-sm text-left flex justify-center items-center">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-right">
                  Mileage at sale:
                </td>
                <td className="px-4 py-2 text-left">
                  {currencyFormatter(
                    cancellationData?.ContractMileage ?? 0,
                    ""
                  )}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-right">
                  Full Refund Days:
                </td>
                <td className="px-4 py-2 text-left">
                  {cancellationData?.FullRefundDays || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-right">
                  Sale Date:
                </td>
                <td className="px-4 py-2 text-left">
                  {cancellationData?.SaleDate || "-"}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-right">
                  Contract Expiration Date:
                </td>
                <td className="px-4 py-2 text-left">
                  {cancellationData?.ValidityDate || "-"}
                </td>
              </tr>

              {/* <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-right">
                  Cancel Mileage:
                </td>
                <td className="px-4 py-2 text-left">3,000</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-right">
                  Cancel Percentage:
                </td>
                <td className="px-4 py-2 text-left">87.50%</td>
              </tr> */}
              {/* <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-red-500 text-right">
                  Cancel Reason:
                </td>
                <td className="px-4 py-2 text-red-500 text-left"> 
                  Cancellation After Full Refund (Mileage Based)
                </td>
              </tr> */}
              {/* <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-right">
                  Sale Date:
                </td>
                <td className="px-4 py-2 text-left">08/05/2024</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-right">
                  Contract Expiration Date:
                </td>
                <td className="px-4 py-2 text-left">08/04/2026</td>
              </tr> */}
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2 font-semibold text-right">
                  Total Plan Cost:
                </td>
                <td className="px-4 py-2 text-left">
                  $
                  {cancellationData?.txtTotalCost !== undefined &&
                  cancellationData?.txtTotalCost !== null
                    ? Number(cancellationData.txtTotalCost).toLocaleString()
                    : "0"}
                </td>
              </tr>
            </tbody>
          </table>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
}

export default Page;
