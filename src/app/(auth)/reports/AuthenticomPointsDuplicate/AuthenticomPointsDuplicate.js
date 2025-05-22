import React from "react";

import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { loadMoreButton, tableDataNotFound } from "../functions";
import { CustomButton } from "@/components/cui/button/CustomButton";

import { jsonToExcel } from "@/utils/generateExcel";
function AuthenticomPointsDuplicate({
  loading,
  responseState,
  createPdf,
  fetchReports,
}) {
  const totalAmount = responseState?.CustomerSummay?.reduce(
    (sum, dealer) => sum + Number(dealer?.Point * 0.02 || 0),
    0
  );

  const totalPoints = responseState?.CustomerSummay?.reduce(
    (sum, dealer) => sum + Number(dealer?.Point || 0),
    0
  );

  const dataCorrected = responseState?.CustomerSummay;
  const total = responseState?.res?.TotalCancelled?.totalcount;
  let groupedContractsFinalArray;
  if (Array.isArray(dataCorrected) && dataCorrected.length > 0) {
    // Group by DealerTitle
    groupedContractsFinalArray = dataCorrected.map((item, index) => {
      if (item?.ContractNo) {
        return item.ContractNo.split("<br>").map((entry) => {
          const [contractNo, plan, saleDate, checkbox1, checkbox2] = entry
            .split("|")
            .map((item) => item.trim());

          return {
            contractNo,
            plan,
            saleDate,
            checkbox1: parseInt(checkbox1, 10),
            checkbox2: parseInt(checkbox2, 10),
          };
        });
      } else {
        return []; // Handle missing ContractNo
      }
    });

    // console.log("Grouped Contracts by Dealer:", groupedContractsFinalArray);
  } else {
    console.error("CustomerSummary is not an array or is empty.");
  }
  const THead = () => (
    <thead>
      <tr>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
          Sr.#
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
          Dealership
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
          Contract #
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
          Plan
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
          Sale Date
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left"></th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
          Customer Name
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
          VIN
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left ">
          Total Points Earned
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left ">
          Total Amount
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left ">
          Email Address
        </th>
        <th className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left ">
          Total Records
        </th>
      </tr>
    </thead>
  );
  return (
    <div className="flex flex-col  mt-5 ">
      {responseState?.CustomerSummay?.length > 0 ? (
        <>
          <div className="flex flex-col  mt-6 gap-4">
            <ShadowContainer className={"p-0"}>
              <div className="  py-8">
                <div className="flex justify-between my-3 px-5">
                  <h2 className="text-md font-bold">Total : {total}</h2>
                  <h2 className="text-md font-bold">
                    Point : {Number(totalPoints).toLocaleString()}
                  </h2>
                </div>
                <div className=" px-4">
                  <div className=" max-h-[600px] overflow-y-auto tableContainer ">
                    <table className="bg-card table-auto w-full border-collapse border border-card-foreground/10 text-sm shadow">
                      {THead()}
                      <tbody>
                        {responseState?.CustomerSummay?.map(
                          (customer, index) => (
                            <React.Fragment key={index}>
                              {groupedContractsFinalArray[index]?.map(
                                (contract, contractIndex) => (
                                  <tr key={contractIndex}>
                                    {contractIndex === 0 && (
                                      <>
                                        <td
                                          className="border border-card-foreground/10 px-2 py-1 whitespace-normal"
                                          rowSpan={
                                            groupedContractsFinalArray[index]
                                              ?.length || 1
                                          }
                                        >
                                          {index + 1}
                                        </td>
                                        <td
                                          className="border border-card-foreground/10 px-2 py-1 whitespace-normal"
                                          rowSpan={
                                            groupedContractsFinalArray[index]
                                              ?.length || 1
                                          }
                                        >
                                          {customer?.DealerTitle}
                                        </td>
                                      </>
                                    )}
                                    <td className="border border-card-foreground/10 px-2 py-1 whitespace-normal">
                                      {contract.contractNo}
                                    </td>
                                    <td className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
                                      {contract.plan}
                                    </td>
                                    <td className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
                                      {contract.saleDate}
                                    </td>
                                    <td className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left">
                                      {contract.checkbox1 === 1 ? (
                                        <input
                                          type="checkbox"
                                          checked={contract.checkbox2 !== 0}
                                          readOnly
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </td>

                                    {contractIndex === 0 && (
                                      <>
                                        <td
                                          className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left "
                                          rowSpan={
                                            groupedContractsFinalArray[index]
                                              ?.length || 1
                                          }
                                        >
                                          {customer?.CustomerName?.split("<br>") // Split the string by <br>
                                            .map((name, idx) => (
                                              <div key={idx}>{name}</div> // Display each email in a new div
                                            ))}
                                        </td>
                                        <td
                                          className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left"
                                          rowSpan={
                                            groupedContractsFinalArray[index]
                                              ?.length || 1
                                          }
                                        >
                                          {customer?.VIN}
                                        </td>
                                        <td
                                          className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left "
                                          rowSpan={
                                            groupedContractsFinalArray[index]
                                              ?.length || 1
                                          }
                                        >
                                          {Number(customer?.Point)}
                                        </td>

                                        <td
                                          className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left "
                                          rowSpan={
                                            groupedContractsFinalArray[index]
                                              ?.length || 1
                                          }
                                        >
                                          $
                                          {customer?.Point
                                            ? Number(
                                                customer?.Point * 0.02
                                              ).toLocaleString() + ".00"
                                            : "-"}
                                        </td>
                                        <td
                                          className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left "
                                          rowSpan={
                                            groupedContractsFinalArray[index]
                                              ?.length || 1
                                          }
                                        >
                                          {customer?.PrimaryEmail?.split("<br>") // Split the string by <br>
                                            .map((email, idx) => (
                                              <div key={idx}>{email}</div> // Display each email in a new div
                                            ))}
                                        </td>

                                        <td
                                          className="border border-card-foreground/10 px-2 py-1 whitespace-normal text-left "
                                          rowSpan={
                                            groupedContractsFinalArray[index]
                                              ?.length || 1
                                          }
                                        >
                                          {customer?.totrecord}
                                        </td>
                                      </>
                                    )}
                                  </tr>
                                )
                              )}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  {dataCorrected.length < total &&
                    loadMoreButton(responseState, fetchReports, loading)}
                  <div className="w-full flex items-end justify-end gap-4 mt-4">
                    <CustomButton variant="main" onClick={createPdf}>
                      Generate PDF
                    </CustomButton>
                    <CustomButton variant="main" onClick={() => {}}>
                      Print Report
                    </CustomButton>
                    <CustomButton
                      variant="main"
                      onClick={() => {
                        jsonToExcel(responseState?.CustomerSummay),
                          "Authenticom Points Duplicate";
                      }}
                    >
                      Export Report
                    </CustomButton>
                  </div>
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

export default AuthenticomPointsDuplicate;
