import React, { useState, useEffect, useContext, useRef } from "react";

import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { useReactToPrint } from "react-to-print";
import { tableDataNotFound } from "../functions";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import DancingDotLoading from "@/components/cui/loader/DancingDotLoading";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
function MaturedContracts({
  responseState,
  formdataObject,
  printContract,
  setPrintContract,
}) {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [customerSummary, setCustomerSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const contentRef = useRef();

  const reactToPrintFn = useReactToPrint({
    documentTitle: "Print",
    contentRef: contentRef,
  });
  useEffect(() => {
    setCustomerSummary(responseState?.CustomerSummay);
  }, [formdataObject]);

  const handleLoadMore = () => {
    setLoading(true);
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

    formdata.append(
      "HideMaturedContractFromReport",
      responseState?.res?.HideMaturedContractFromReport
    );
    formdata.append(
      "RedeemServicesNoofDays",
      responseState?.res?.RedeemServicesNoofDays
    );

    fetch("https://mypcp.us/webservices/reports/newreport", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success == "1") {
          const newSummary = res?.CustomerSummay || [];
          setCustomerSummary((prev) => [...prev, ...newSummary]); // Append new data to existing array
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        toast.error("Can't get Dealer Setting err3");
        setLoading(false);
      });
  };
  useEffect(() => {
    if (
      responseState?.res?.ContractMaturedBalance?.total_contract >
      responseState?.CustomerSummay?.length
    ) {
      const interval = setInterval(() => {
        // Call handleLoadMore with the current offset if it exists
        handleLoadMore(responseState?.res?.offset);
      }, 5000); // Call every 5 seconds

      // Stop the interval if success is 0
      if (responseState?.res?.success == "0") {
        clearInterval(interval);
        toast.error("Stopping due to failure status.");
      }

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [responseState?.res?.offset]);

  const maturedContractHeader = () => (
    <div className="w-full mx-auto  p-4">
      <div className="grid grid-cols-12 gap-1">
        <div className="py-4 col-span-5">
          <h3 className="font-bold text-lg ">Note:</h3>
          <p className="text-sm">
            The amount taken out and remaining is based on the selections made
            by the accounting department.
          </p>
        </div>

        <div className="md:flex-1 h-40 w-full flex items-center justify-center col-span-1">
          <div className="w-px bg-gray-300 h-full"></div>
        </div>
        <div className="w-full flex justify-between col-span-6 space-x-2">
          <div className="text-left flex flex-col justify-between">
            <p>Amount for expired service (un-used)</p>
            <p>Amount Paid out on report</p>
            <p>Expired services amount to be taken in</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <div
              className={
                "bg-siteBlue text-white rounded-2xl flex items-center justify-center p-2  font-bold"
              }
            >
              Total:{" "}
              {Number(
                responseState?.res?.ContractMaturedBalance?.totalCost
              ).toLocaleString()}
            </div>

            <div className="bg-[#66CC00] text-white rounded-2xl flex items-center justify-center p-2  font-bold">
              Taken In:{" "}
              {Number(
                responseState?.res?.ContractMaturedBalance?.takenin
              ).toLocaleString()}
            </div>
            <div className="bg-siteOrange text-white rounded-2xl flex items-center justify-center p-2  font-bold">
              Remaining:{" "}
              {(
                Number(
                  responseState?.res?.ContractMaturedBalance?.totalCost || 0
                ) -
                Number(responseState?.res?.ContractMaturedBalance?.takenin || 0)
              ).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-4 pt-4 flex justify-around">
        <p>
          <strong>Total Contract :</strong>{" "}
          {Number(
            responseState?.res?.ContractMaturedBalance?.totalCost
          ).toLocaleString()}
        </p>
        <p>
          <strong>Total Amount :</strong>{" "}
          {Number(
            responseState?.res?.ContractMaturedBalance?.totalCost
          ).toLocaleString()}
        </p>
        <p>
          <strong>Total Retained :</strong>{" "}
          {Number(
            responseState?.res?.ContractRetainedBalance?.Retained
          ).toLocaleString()}
        </p>
      </div>
    </div>
  );
  const THead = () => (
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
          Balance
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Reason
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Sale Date
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Validity Date
        </th>
        <th className="border px-4 py-2 text-right bg-yellow-100 text-black">
          Money taken out
        </th>
      </tr>
    </thead>
  );
  const MaturedContent = () => (
    <div className="w-full flex flex-col ">
      <div className="mt-4">
        <ShadowContainer className={"bg-background/40"}>
          {maturedContractHeader()}
        </ShadowContainer>
      </div>
      {customerSummary.length > 0 ? (
        <div className="w-full flex flex-col  mt-6 gap-4">
          <div className="w-full ">
            <table className="bg-card table-auto w-full border-collapse border border-card-foreground/10 text-sm">
              {THead()}
              <tbody>
                {customerSummary.map((dealer, index) => (
                  <tr key={index}>
                    <td className="border border-card-foreground/10 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-card-foreground/10 px-4 py-2">
                      {dealer.ContractNo}
                    </td>
                    <td className="border border-card-foreground/10 px-4 py-2">
                      {dealer.CustomerFName} {dealer.CustomerLName}
                    </td>
                    <td className="border border-card-foreground/10 px-4 py-2 text-right">
                      ${dealer.ContractTotalCost}
                    </td>
                    <td className="border border-card-foreground/10 px-4 py-2 text-right">
                      {dealer.ExpiryReason}
                    </td>
                    <td className="border border-card-foreground/10 px-4 py-2 text-right">
                      {new Date(dealer.SaleDate * 1000).toLocaleDateString()}
                    </td>
                    <td className="border border-card-foreground/10 px-4 py-2 text-right">
                      {new Date(
                        dealer.ValidityDate * 1000
                      ).toLocaleDateString()}
                    </td>
                    <td className="border  px-4 py-2 text-right bg-yellow-100 text-black">
                      {dealer.MoneyTakenoutDate
                        ? new Date(
                            dealer.MoneyTakenoutDate * 1000
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !loading && responseState?.CustomerSummay && tableDataNotFound(THead)
      )}
    </div>
  );
  return (
    <SimpleModal
      open={printContract}
      close={() => setPrintContract(false)}
      title={
        <span className="flex gap-1">
          Total Matured Contracts is{" "}
          {responseState?.res?.ContractMaturedBalance?.total_contract}{" "}
          {loading && (
            <span>
              <DancingDotLoading color="black" />
            </span>
          )}
        </span>
      }
    >
      <div>
        <div className="flex space-x-2 mt-4 px-4">
          <CustomButton
            onClick={
              // () => openPdfInNewTab("print")
              reactToPrintFn
            }
          >
            Print
          </CustomButton>
          <CustomButton onClick={() => setPrintContract(false)}>
            Back
          </CustomButton>
        </div>
        <div id="print" ref={contentRef} className="pt-0  p-4">
          {MaturedContent()}
        </div>
      </div>
    </SimpleModal>
  );
}

export default MaturedContracts;
