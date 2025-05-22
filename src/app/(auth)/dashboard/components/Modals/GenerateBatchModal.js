"use client";
import React, { useRef } from "react";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import MainTable from "@/components/cui/table/MainTable";
import { formatDate, unixTimestampToDate } from "@/utils/helpers";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

function GenerateBatchModal({ open, close, popUpModalData }) {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    documentTitle: "generate-batch",
    contentRef: contentRef,
  });

  function calculateTotalCost(batchedContractsArray) {
    const totalCost = batchedContractsArray?.reduce((total, item) => {
      // Ensure item.ContractTotalCost is a number
      const cost = Number(item.ContractRemitAmount) || 0;
      return total + cost;
    }, 0);

    return totalCost;
  }

  const total = calculateTotalCost(popUpModalData?.BatchedContractsArray);

  const columns = [
    {
      title: "SR.#",
      render: ({ index }) => index + 1,
    },
    {
      title: "CONTRACT NO",
      accessor: "ContractNo",
    },
    {
      title: "STOCK/DEAL#",
      accessor: "StockDealNo",
    },
    {
      title: "SALE DATE",
      render: ({ row }) => unixTimestampToDate(row.SaleDate),
    },
    {
      title: "LAST 8 OF VIN",
      render: ({ row }) => row.VIN.substring(0, 8),
    },
    {
      title: "PURCHASER",
      render: ({ row }) => {
        `${row.CustomerFName} ${row.CustomerLName}`;
      },
    },
    {
      title: "PLAN",
      accessor: "PlanDescription",
    },
    {
      title: "VEHICLE INFORMATION",
      accessor: "Make",
    },
    {
      title: "SELLING REP NAME",
      accessor: "FIManagerName",
    },
    {
      title: "AMOUNT",
      accessor: "ContractRemitAmount",
      type: "currency",
    },
    {
      title: "SELLING PRICE",
      accessor: "ContractTotalCost",
      type: "currency",
    },
  ];
  return (
    <SimpleModal
      open={open}
      close={close}
      className={"max-w-5xl mx-auto bg-white text-black "}
      headerClass={"bg-white"}
      title={"DEALERSHIP INFORMATION"}
    >
      {popUpModalData && (
        <div ref={contentRef} className=" p-2">
          <div className="border-red-500 border-2">
            <div className="grid grid-cols-2 justify-between items-center gap-4 p-3">
              <div className="flex items-center max-w-80 gap-3">
                <Image
                  src="/images/procarmalogo2.png"
                  alt="Logo"
                  width="80"
                  height="60"
                />
                <div>
                  <div className="font-bold">
                    {popUpModalData?.dealer_data?.CompanyAddress}
                  </div>
                </div>
              </div>
              <div className="font-bold text-2xl ">
                {popUpModalData?.dealer_data?.DealerTitle}
              </div>
            </div>
            <div className="px-2 w-full flex justify-between">
              <div>
                <h3 className="font-bold text-red-500 p-0 m-0">
                  DEALERSHIP INFORMATION
                </h3>
                <div className="text-sm px-4">
                  <div className="text-sm flex uppercase">
                    <span className=" w-24 text-red-500">Dealership</span>
                    <span>{popUpModalData?.dealer_data?.DealerTitle}</span>
                  </div>
                  <div className="text-sm flex uppercase">
                    <span className=" w-24 text-red-500">Address</span>
                    <span>{popUpModalData?.dealer_data?.DealerAddress1}</span>
                  </div>
                  <div className="text-sm flex uppercase">
                    <span className=" w-24 text-red-500">City</span>
                    <span>{popUpModalData?.dealer_data?.CityName}</span>
                  </div>
                  <div className="text-sm flex uppercase">
                    <span className=" w-24 text-red-500">State</span>
                    <span>{popUpModalData?.dealer_data?.StateTitle}</span>
                  </div>
                  <div className="text-sm flex uppercase">
                    <span className=" w-24 text-red-500">Zip</span>
                    <span>{popUpModalData?.dealer_data?.DealerZIP}</span>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <h3>&nbsp;</h3>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">
                    <span className="text-red-500 uppercase">Cutoff Date:</span>
                  </p>

                  <p className="text-sm">
                    {formatDate(popUpModalData?.GetBatchStatus?.SubmitDate)}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">
                    <span className="text-red-500 uppercase">
                      System Posted Date:
                    </span>
                    <span className="text-muted-foreground ">
                      &nbsp;&nbsp;(REMITTANCE RECIEVED DATE)
                    </span>
                  </p>
                  {popUpModalData?.GetBatchStatus?.RemitDate && (
                    <p className="text-sm">
                      {formatDate(popUpModalData?.GetBatchStatus?.RemitDate)}
                    </p>
                  )}
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">
                    <span className="text-red-500 uppercase">
                      Batch Creation Date:
                    </span>{" "}
                  </p>
                  {popUpModalData?.GetBatchStatus?.Createdon && (
                    <p className="text-sm">
                      {unixTimestampToDate(
                        popUpModalData?.GetBatchStatus?.Createdon,
                        true
                      )}
                    </p>
                  )}
                </div>

                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">
                    <span className="text-red-500 uppercase">Batch # :</span>{" "}
                  </p>
                  <p className="text-sm uppercase">
                    {popUpModalData?.GetBatchStatus?.BatchNo}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">
                    <span className="text-red-500 uppercase">
                      Seller Account No:
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <h3 className="w-full py-6 font-bold text-center text-red-500 p-0 m-0 mt-2 ps-2 ">
              BATCH INFORMATION
            </h3>

            {/* Dealership Information Section */}
            <div className=" px-2">
              <MainTable
                className="p-0 m-0"
                data={popUpModalData?.BatchedContractsArray}
                tableClasses={{
                  thHeadClass: "bg-white/90",
                  trBodyClass: "hover:none ",
                  tableInsideClass:
                    "border border-card-foreground/10 shadow-sm shadow-accent text-[0.7em] text-left p-1 m-0",
                }}
                striped={false}
                columns={columns}
              />
              <div className="w-full my-2 py-1 flex justify-end border border-l-0 border-r-0 border-b-2  border-t-2 border-red-500 ">
                <div className="flex gap-4">
                  <div className=" ">Total:</div>
                  {total && <div className="">${total?.toLocaleString()}</div>}
                </div>
              </div>
            </div>
            <p className="text-gray-800 mx-20 text-center text-lg mt-2 px-6 p-2 border-t border-b text-pretty">
              Attach Check(s), cancellations, and applications to REMITTANCE
              REGISTER. Make Checks Payable to: Dealer&#39;s Choice, Inc.
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-between space-x-2 mt-4 px-4 print:hidden p-4">
        <CustomButton variant="danger" onClick={close}>
          Close
        </CustomButton>
        <CustomButton variant="main" onClick={reactToPrintFn}>
          Print
        </CustomButton>
      </div>

      {/* Print Button */}
    </SimpleModal>
  );
}

export default GenerateBatchModal;
