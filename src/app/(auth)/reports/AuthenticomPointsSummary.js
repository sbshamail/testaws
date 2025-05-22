import React, { useState, useEffect, useContext, useRef } from "react";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";
import { printPdfHeader, tableDataNotFound } from "./functions";
import Link from "next/link";
import DancingDotLoading from "@/components/cui/loader/DancingDotLoading";
import { useReactToPrint } from "react-to-print";
import { formatToMMDDYYYY } from "@/utils/helpers";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { jsonToExcel } from "@/utils/generateExcel";
function AuthenticomPointsSummary({
  loading,
  responseState,
  formdataObject,
  dealerValues,
  startDate,
  endDate,
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

  const totalAmount = responseState?.CustomerSummay?.reduce(
    (sum, dealer) => sum + Number(dealer?.Balance * 0.02 || 0),
    0
  );

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
          Dealership
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Contract No.
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Customer Name
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          VIN
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Total Points Earned
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Balance
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left ">
          Total Amount
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left ">
          Customer Added
        </th>
      </tr>
    </thead>
  );

  return (
    <div className="mt-6 w-full">
      <ShadowContainer>
        {responseState?.CustomerSummay?.length > 0 ? (
          <div className="shadow  rounded-2xl p-4">
            <div className="">
              <div ref={contentRef} className=" p-4 ">
                <>
                  {printPdfHeader(
                    "Authenticom Points - Summary",
                    dealerValues?.text
                  )}

                  <div className="">
                    <div className="flex justify-between my-3">
                      <h2 className="text-md font-bold">
                        Total :{responseState?.CustomerSummay?.length}
                        {responseState?.TotalCancelled?.totalcount?.toLocaleString()}{" "}
                      </h2>
                      <h2 className="text-md font-bold">
                        Point : {totalPoints?.toLocaleString()}
                      </h2>
                      <h2 className="text-md font-bold">
                        Total Amount : {totalAmount?.toLocaleString()}
                      </h2>
                    </div>
                    {startDate && (
                      <div className="flex justify-between my-3">
                        <h2 className="text-lg font-bold"></h2>
                        <h2 className="text-md font-bold">
                          Statement: {formatToMMDDYYYY(startDate)} -{" "}
                          {formatToMMDDYYYY(endDate)}
                        </h2>
                      </div>
                    )}
                    <div className="overflow-x-auto tableContainer">
                      <table className="bg-card table-auto w-full border-collapse border border-card-foreground/10 text-sm">
                        {THead()}
                        <tbody>
                          {responseState?.CustomerSummay?.map(
                            (dealer, index) => (
                              <tr key={index}>
                                <td className="border border-card-foreground/10 px-4 py-2">
                                  {index + 1}
                                </td>
                                <td className="border border-card-foreground/10 px-4 py-2">
                                  {dealer?.DealerTitle}
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

                                <td className="border border-card-foreground/10 px-4 py-2 text-left">
                                  {dealer?.CustomerFName}{" "}
                                  {dealer?.CustomerLName}
                                </td>

                                <td className="border border-card-foreground/10 px-4 py-2 text-left">
                                  {dealer?.VIN}
                                </td>
                                <td className="border border-card-foreground/10 px-4 py-2 text-left">
                                  {dealer?.Point}
                                </td>
                                <td className="border border-card-foreground/10 px-4 py-2 text-left">
                                  {dealer?.Balance}
                                </td>
                                <td className="border border-card-foreground/10 px-4 py-2 text-left ">
                                  ${" "}
                                  {dealer?.Balance
                                    ? Number(
                                        dealer?.Balance * 0.02
                                      ).toLocaleString()
                                    : "-"}
                                </td>
                                <td className="border border-card-foreground/10 px-4 py-2 text-left ">
                                  {dealer?.PostedDate &&
                                    new Date(
                                      dealer.PostedDate
                                    ).toLocaleDateString("en-US")}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              </div>
            </div>
            <div className="w-full flex justify-end gap-3">
              <CustomButton
                variant="main"
                onClick={!loadingReport ? handlePdf : undefined} // Disable click when loading
                className={` ${
                  loadingReport
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-80 transition-opacity duration-200"
                }`}
              >
                {loadingReport ? <DancingDotLoading /> : "Generate PDF"}
              </CustomButton>
              <CustomButton variant="main" onClick={reactToPrintFn}>
                Print Report
              </CustomButton>
              <CustomButton
                variant="main"
                onClick={() => {
                  jsonToExcel(responseState?.CustomerSummay),
                    "Authenticom Points Summary";
                }}
              >
                Export Report
              </CustomButton>
            </div>
          </div>
        ) : (
          !loading && tableDataNotFound(THead)
        )}
      </ShadowContainer>
    </div>
  );
}

export default AuthenticomPointsSummary;
