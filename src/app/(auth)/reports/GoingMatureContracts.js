import React, { useState, useEffect, useContext, useRef } from "react";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";
import { loadMoreButton, printPdfHeader, tableDataNotFound } from "./functions";
import Link from "next/link";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { jsonToExcel } from "@/utils/generateExcel";
import { useReactToPrint } from "react-to-print";
function GoingMatureContracts({
  loading,
  responseState,

  dealerValues,
  fetchReports,
  formdataObject,
}) {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);

  const [loadingReport, setLoadingReport] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null); // State to store the PDF URL
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    documentTitle: "Going Matured Contracts",
    contentRef: contentRef,
  });

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
    formdata.append("offset", 0);
    formdata.append("ReportDropDown", formdataObject?.ReportDropDown);
    formdata.append("TerritoryCode", formdataObject?.TerritoryCode);

    fetch("https://mypcp.us/webservices/createpdf/index", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoadingReport(false);

        // Log the full response to debug the URL
        // console.log("Response Data:", res);

        if (res.success === 1 && res?.url) {
          toast.success("Data loaded successfully!");
          console.log("PDF URL:", res.url); // Ensure this is the right URL for the PDF
          setPdfUrl(res.url); // Save the URL to the state

          // Open the correct URL in a new tab
          window.open(res.url, "_blank");
        } else {
          toast.error("Failed to generate the PDF.");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoadingReport(false);
        toast.error("Can't get Dealer Setting err3");
      });
  };
  useEffect(() => {
    if (pdfUrl) {
      // Add a timeout to ensure the URL has been set before opening
      setTimeout(() => {
        window.open(pdfUrl, "_blank");
      }, 2000); // 2-second delay
    }
  }, [pdfUrl]);

  const THead = () => (
    <thead>
      <tr>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Sr.#
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Contract No.
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Dealer Name
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Customer Name
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Sale Date
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Validity Date
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Status
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left  ">
          Service Used
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left  ">
          Service Unused
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left  ">
          Unused Amount
        </th>
      </tr>
    </thead>
  );

  return (
    <div className="flex flex-col max-w-full container-max-width mt-5">
      {responseState?.CustomerSummay?.length > 0 ? (
        <>
          <div className="flex flex-col max-w-full container-max-width mt-6 gap-4">
            <ShadowContainer>
              <div className=" mx-auto px-4 py-8" ref={contentRef}>
                {printPdfHeader("Going Mature Contract", dealerValues?.text)}
                <div className="flex justify-between my-3">
                  <h2 className="text-md font-bold">
                    Total :{" "}
                    {Number(
                      responseState?.res?.total?.totalcount
                    ).toLocaleString()}{" "}
                  </h2>
                  <h2 className="text-md font-bold">
                    Point : $
                    {Number(
                      responseState?.res?.total?.unusedamount
                    ).toLocaleString()}
                  </h2>
                </div>{" "}
                <div className="w-full">
                  <table className="bg-card table-auto w-full border-collapse border border-card-foreground/10 text-sm">
                    {THead()}
                    <tbody>
                      {responseState?.CustomerSummay?.map((customer, index) => (
                        <tr key={index}>
                          <td className="border border-card-foreground/10 px-1 py-1">
                            {index + 1}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1">
                            {customer?.ContractNo}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1">
                            {customer?.DealerTitle}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left">
                            {customer?.CustomerName
                              ? customer?.CustomerName
                              : "-"}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left">
                            {customer?.SaleDate}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left">
                            {customer?.ValidityDate}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left">
                            {customer?.Status === "P"
                              ? "Pending"
                              : customer?.Status === "C"
                              ? "Cancelled"
                              : customer?.Status === "M" ||
                                customer?.Status === "S"
                              ? "Mature"
                              : customer?.Status === "I"
                              ? "In-Active"
                              : customer?.Status === "L"
                              ? "Active"
                              : customer?.Status === "A"
                              ? "Suspended"
                              : "In-Active"}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left  ">
                            {customer?.usedservices}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left  ">
                            {customer?.unusedservices}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left  ">
                            ${customer?.unusedamount}
                          </td>
                        </tr>
                      ))}

                      {/* <tr className="font-bold bg-gray-100">
                        <td
                          className="border border-card-foreground/10 px-1 py-1"
                          colSpan="3"
                        >
                          TOTAL BY ACCOUNT
                        </td>
                        <td className="border border-card-foreground/10 px-1 py-1 text-left">
                          {totalPointsIssued
                            ? Number(totalPointsIssued).toLocaleString()
                            : "-"}
                        </td>
                        <td className="border border-card-foreground/10 px-1 py-1 text-left">
                          {totalPointsRedeemed
                            ? Number(totalPointsRedeemed).toLocaleString()
                            : "-"}
                        </td>
                        <td className="border border-card-foreground/10 px-1 py-1 text-left">
                          {totalPointsExpired
                            ? Number(totalPointsExpired).toLocaleString()
                            : "-"}
                        </td>
                        <td className="border border-card-foreground/10 px-1 py-1 text-left">
                          {totalBalancePoints
                            ? Number(totalBalancePoints).toLocaleString()
                            : "-"}
                        </td>
                        <td className="border border-card-foreground/10 px-1 py-1 text-left  ">
                          $190,709.48
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                  {loadMoreButton(responseState, fetchReports, loading)}
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
                    <DancingLoadingButton loading={loadingReport} />
                  ) : (
                    "Generate PDF"
                  )}
                </div>
                <div
                  onClick={reactToPrintFn}
                  className="flex gap-4 bg-siteOrange py-[10px] px-10 items-center rounded-xl text-[15px] font-bold tracking-wider text-white cursor-pointer hover:opacity-80 transition-opacity duration-200"
                >
                  Print Report
                </div>
                <div
                  onClick={() => {
                    jsonToExcel(responseState?.CustomerSummay),
                      "Authenticom Points Summary Detail";
                  }}
                  className="flex gap-4 bg-siteOrange py-[10px] px-10 items-center rounded-xl text-[15px] font-bold tracking-wider text-white cursor-pointer hover:opacity-80 transition-opacity duration-200"
                >
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

export default GoingMatureContracts;
