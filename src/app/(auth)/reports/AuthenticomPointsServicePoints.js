import SpinnerLoader from "@/app/Components/SpinnerLoader";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { tableDataNotFound } from "./functions";
import { generateYearsArray, unixTimestampToDate } from "@/app/functions";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";

function AuthenticomPointsServicePoints({
  loading,
  responseState,
  formdataObject,
}) {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);

  const [loadingReport, setLoadingReport] = useState(false);
  const handlePdf = () => {
    setLoadingReport(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;

    if (!Token || !pcp_user_id || !user_cizacl_role_id || !user_id) {
      toast.error("Missing required authentication information.");
      return;
    }

    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();

    formdata.append("role_id", formdataObject?.role_id);
    formdata.append("user_id", formdataObject?.user_id);
    formdata.append("pcp_user_id", formdataObject?.pcp_user_id);
    formdata.append("DealerID", formdataObject?.DealerID);
    formdata.append("FromDate", formdataObject?.FromDate);
    formdata.append("ToDate", formdataObject?.ToDate);
    formdata.append("FixedDateParameter", formdataObject?.FixedDateParameter);
    formdata.append("offset", responseState?.res?.offset);
    formdata.append("ReportDropDown", formdataObject?.ReportDropDown);
    formdata.append("TerritoryCode", formdataObject?.TerritoryCode);

    fetch("https://mypcp.us/webservices/createpdf/index", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success == "1") {
          toast.success("Data loaded successfully!");
          console.log("resresres", res?.url);
          setLoadingReport(false);

          if (res?.url) {
            // Open the URL in a new tab
            window.open(res.url, "_blank");
          }
        } else {
          toast.error("Failed to generate the PDF.");
          setLoadingReport(false);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoadingReport(false);

        toast.error("Can't get Dealer Setting err3");
      });
  };
  const THead = () => (
    <thead>
      <tr>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Sr.#
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          a Contract No.
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Customer Name
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Repair order
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Date
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Comment
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Phone
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right   ">
          Address 1 / Address 2
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right   ">
          Point
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right   ">
          Vin
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right   ">
          Assign Date
        </th>
      </tr>
    </thead>
  );
  return (
    <div className="flex flex-col w-full mt-5">
      {responseState?.CustomerSummay?.length > 0 ? (
        <>
          <div className="flex flex-col w-full mt-6 gap-4">
            <ShadowContainer>
              <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between my-3">
                  <h2 className="text-md font-bold">
                    Total :{" "}
                    {Number(
                      responseState?.totalCancelled?.totalcount?.toLocaleString()
                    )}{" "}
                  </h2>
                  <h2 className="text-md font-bold">
                    Point :{" "}
                    {Number(
                      responseState?.totalCancelled?.Point?.toLocaleString()
                    )}
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="bg-card table-auto w-full border-collapse border border-card-foreground/10 text-sm">
                    <thead>
                      <tr>
                        <th className="border border-card-foreground/10 px-4 py-2 text-left">
                          Sr.#
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-left">
                          Contract No.
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-left">
                          Customer Name
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right">
                          Repair order
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right">
                          Date
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right">
                          Comment
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right">
                          Phone
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right   ">
                          Address 1 / Address 2
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right   ">
                          Point
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right   ">
                          Vin
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right   ">
                          Assign Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {responseState?.CustomerSummay?.map((dealer, index) => (
                        <tr key={dealer?.DealerID}>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            <Link
                              href={`/contracts/edit/${dealer.ContractID}`}
                              passHref
                              className="text-blue-400 hover:underline"
                            >
                              {dealer?.ContractNo}
                            </Link>
                          </td>

                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            <span>
                              {dealer?.CustomerFName} {dealer?.CustomerLName}{" "}
                              <br />
                              <span className="text-red-500">
                                {dealer?.FirstName} {dealer?.LastName}
                              </span>
                            </span>
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {dealer?.RoNo}
                          </td>

                          <td className="border border-card-foreground/10 px-4 py-2 text-right   ">
                            {new Date(dealer?.AddedDate).toLocaleDateString(
                              "en-US"
                            )}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {dealer?.comment}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            <span>
                              {dealer?.PhoneHome} <br />
                              <span className="text-red-500">
                                {dealer?.Phone}
                              </span>
                            </span>
                          </td>

                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            <span>
                              {dealer?.CustomerAddress1} <br />
                              <span className="text-red-500">
                                {dealer?.CustomerAddressLine1}
                              </span>
                            </span>
                          </td>

                          <td className="border border-card-foreground/10 px-4 py-2 text-right   ">
                            {dealer?.Point?.toLocaleString()}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right   ">
                            {dealer?.VIN}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right   ">
                            {new Date(dealer?.AssignDate).toLocaleDateString(
                              "en-US"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-full flex justify-end gap-3">
                <div
                  onClick={!loadingReport ? handlePdf : undefined} // Disable click when loading
                  className={`flex gap-4 bg-siteOrange py-[10px] px-10 items-center rounded-xl text-[15px] font-bold tracking-wider text-white cursor-pointer ${
                    loadingReport
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-80 transition-opacity duration-200"
                  }`}
                >
                  {loadingReport ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 200 200"
                      width={30}
                      height={30}
                    >
                      <circle
                        fill="white"
                        stroke="white"
                        strokeWidth="2"
                        r="15"
                        cx="40"
                        cy="65"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          dur="2s"
                          values="65;135;65;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="-.4s"
                        ></animate>
                      </circle>
                      <circle
                        fill="white"
                        stroke="white"
                        strokeWidth="2"
                        r="15"
                        cx="100"
                        cy="65"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          dur="2s"
                          values="65;135;65;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="-.2s"
                        ></animate>
                      </circle>
                      <circle
                        fill="white"
                        stroke="white"
                        strokeWidth="2"
                        r="15"
                        cx="160"
                        cy="65"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          dur="2s"
                          values="65;135;65;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="0s"
                        ></animate>
                      </circle>
                    </svg>
                  ) : (
                    "Generate PDF"
                  )}
                </div>
                <div className="flex gap-4 bg-siteOrange py-[10px] px-10 items-center rounded-xl text-[15px] font-bold tracking-wider text-white cursor-pointer hover:opacity-80 transition-opacity duration-200">
                  Print Report
                </div>
                <div className="flex gap-4 bg-siteOrange py-[10px] px-10 items-center rounded-xl text-[15px] font-bold tracking-wider text-white cursor-pointer hover:opacity-80 transition-opacity duration-200">
                  Export Report
                </div>
              </div>
            </ShadowContainer>
          </div>
        </>
      ) : (
        !loading && tableDataNotFound(THead)
      )}
    </div>
  );
}

export default AuthenticomPointsServicePoints;
