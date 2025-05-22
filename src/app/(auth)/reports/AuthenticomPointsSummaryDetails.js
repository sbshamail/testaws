import React, { useState, useContext, useRef } from "react";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { printPdfHeader, tableDataNotFound } from "./functions";

import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";

import Link from "next/link";

import { useReactToPrint } from "react-to-print";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { jsonToExcel } from "@/utils/generateExcel";
function AuthenticomPointsSummaryDetails({
  loading,
  responseState,
  formdataObject,
  dealerValues,
}) {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    documentTitle: "Print",
    contentRef: contentRef,
  });
  const [loadingReport, setLoadingReport] = useState(false);

  const totalPoints = responseState?.CustomerSummay?.reduce(
    (sum, dealer) => sum + Number(dealer?.Point || 0),
    0
  );

  // const totalAmount = responseState?.CustomerSummay?.reduce(
  //   (sum, dealer) => sum + Number(dealer?.Balance * 0.02 || 0),
  //   0
  // );
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
  // console.log("responseState", responseState);
  const THead = () => (
    <thead>
      <tr>
        <th className="border border-card-foreground/10 px-2 py-1 text-left">
          Sr.#
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 text-left">
          Contract No.
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 text-right">
          Customer Name
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 text-right">
          VIN
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 text-left">
          Stock/Dealer #
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 text-right">
          Yr / Make / Model
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 text-right">
          App Installed
        </th>
        <th className="border  px-2 py-1 text-right bg-yellow-100 text-black">
          Comment
        </th>
        <th className="border  px-2 py-1 text-right bg-yellow-100 text-black">
          Date
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 text-right bg-yellow-100 text-black">
          Points
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
              <div className=" mx-auto px-2 py-8" ref={contentRef}>
                {printPdfHeader(
                  "Authenticom Points - Summary Details",
                  dealerValues?.text
                )}

                <div className="flex justify-between my-3">
                  <h2 className="text-md font-bold">
                    Total :{" "}
                    {responseState?.res?.TotalCancelled?.totalcount?.toLocaleString()}{" "}
                  </h2>
                  <h2 className="text-md font-bold">
                    Point : {totalPoints?.toLocaleString()}
                  </h2>
                </div>

                <div className="w-full ">
                  <table className="bg-card table-auto w-full border-collapse border border-card-foreground/10 text-sm">
                    {THead()}
                    <tbody>
                      {responseState?.CustomerSummay?.map((dealer, index) => (
                        <tr key={dealer?.DealerID}>
                          <td className="border border-card-foreground/10 px-2 py-1">
                            {index + 1}
                          </td>
                          <td className="border border-card-foreground/10 px-2 py-1">
                            <Link
                              href={`/contracts/edit/${dealer.ContractID}`}
                              passHref
                              className="text-blue-400 hover:underline"
                            >
                              {dealer?.ContractNo}
                            </Link>
                          </td>
                          <td className="border border-card-foreground/10 px-2 py-1">
                            {dealer?.CustomerFName} {dealer?.CustomerLName}
                          </td>
                          <td className="border border-card-foreground/10 px-2 py-1 text-right">
                            {dealer?.VIN}
                          </td>

                          <td className="border border-card-foreground/10 px-2 py-1 text-right">
                            {dealer?.StockDealNo}
                          </td>
                          <td className="border border-card-foreground/10 px-2 py-1 text-right">
                            {dealer?.VehYear}/{dealer?.Make}/{dealer?.Model}
                          </td>
                          <td className="border border-card-foreground/10 px-2 py-1 text-right">
                            {dealer?.AppInstalled === "1" ? "Yes" : "No"}
                          </td>
                          <td className="border  px-2 py-1 text-right bg-yellow-100 text-black">
                            {dealer?.comment} {dealer?.Action}
                          </td>
                          <td className="border  px-2 py-1 text-right bg-yellow-100 text-black">
                            {dealer?.created &&
                              new Date(dealer.created).toLocaleDateString(
                                "en-US"
                              )}
                          </td>
                          <td className="border  px-2 py-1 text-right bg-yellow-100 text-black">
                            {dealer?.Point &&
                              Number(dealer.Point).toLocaleString()}
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

export default AuthenticomPointsSummaryDetails;
