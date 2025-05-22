import { unixTimestampToDate } from "@/app/functions";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { loadMoreButton, printPdfHeader, tableDataNotFound } from "./functions";
import React, { useState, useContext, useRef } from "react";

import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { useReactToPrint } from "react-to-print";
import { jsonToExcel } from "@/utils/generateExcel";

function CancelledContracts({
  loading,
  dealerValues,
  responseState,
  formdataObject,
  fetchReports,
}) {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    documentTitle: "Cancelled Contract",
    contentRef: contentRef,
  });
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
  const handlePrintCancellationData = (dataInput) => {
    // console.log("CONTRACT ID", dataInput);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();

    formdata.append("ContractID", dataInput);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);

    // setLoading(true);

    fetch("https://mypcp.us/webservices/marketing/printcancelcontract", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        // setLoading(false);
        if (res.success === 1) {
          // Create a new Blob with the HTML content
          const blob = new Blob([res.html], { type: "text/html" });
          const url = URL.createObjectURL(blob);

          // Open the URL in a new tab
          window.open(url, "_blank");

          toast.success(res.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while fetching data.");
      })
      .finally(() => {
        // setLoading(false);
        // setHasSearched(true); // Set hasSearched to true after the search is complete
      });
  };
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
          Customer Name
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Sale Date
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Cancel Date
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Contract Cost
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left">
          Refund Amount
          <br />
          DCI | Dealer
        </th>
        <th className="border border-card-foreground/10 px-1 py-1 text-left bg-yellow-100">
          Action
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
                {printPdfHeader("Cancelled Contract", dealerValues?.text)}
                <div className="flex justify-between my-3">
                  <h2 className="text-md font-bold">
                    Total : {responseState?.res?.TotalCancelled}
                  </h2>
                </div>
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
                            {customer?.CustomerName}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left">
                            {unixTimestampToDate(customer?.SaleDate)}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left">
                            {unixTimestampToDate(customer?.CancelDate)}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left">
                            ${customer?.ContractTotalCost}
                          </td>
                          <td className="border border-card-foreground/10 px-1 py-1 text-left">
                            {customer?.ReturnCommTotal}
                            <br />
                            {customer?.DCIReturn &&
                              customer?.DealerShipReturn && (
                                <>
                                  <span className="text-blue-500">
                                    {customer?.DCIReturn}
                                  </span>
                                  <span className="text-black"> | </span>
                                  <span className="text-blue-500">
                                    {customer?.DealerShipReturn}
                                  </span>
                                </>
                              )}
                          </td>

                          <td
                            onClick={() =>
                              handlePrintCancellationData(customer?.ContractID)
                            }
                            className="border border-card-foreground/10 px-1 py-1 text-left text-blue-500 cursor-pointer hover:underline"
                          >
                            Print Form
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {Number(responseState?.res?.TotalCancelled) >
                    responseState?.CustomerSummay?.length &&
                    loadMoreButton(responseState, fetchReports, loading)}
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

export default CancelledContracts;
