import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import {
  currencyFormatter,
  formatDate,
  unixTimestampToDate,
} from "@/utils/helpers";
import Image from "next/image";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintInvoice = ({ res, open, close, user_name }) => {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    documentTitle: "Invoice",
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
  function calculateTotalCost2(batchedContractsArray) {
    const totalCost = batchedContractsArray?.reduce((total, item) => {
      // Ensure item.ContractTotalCost is a number
      const cost = Number(item.DealerReserved) || 0;
      return total + cost;
    }, 0);

    return totalCost;
  }
  function calculateTotalCost3(batchedContractsArray) {
    const totalCost = batchedContractsArray?.reduce((total, item) => {
      // Ensure item.ContractTotalCost is a number
      const cost = Number(item.ContractTotalCost) || 0;
      return total + cost;
    }, 0);

    return totalCost;
  }

  return (
    <SimpleModal
      open={open}
      close={close}
      title="&nbsp;"
      className={"max-w-5xl mx-auto"}
    >
      <div
        ref={contentRef}
        className=" bg-white text-black max-w-5xl border-red-500 border-2"
        title="DEALERSHIP INFORMATION"
      >
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
                {res?.dealer_data?.CompanyAddress}
              </div>
            </div>
          </div>
          <div className="font-bold text-2xl ">
            {res?.dealer_data?.DealerTitle}
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
                <span>{res?.dealer_data?.DealerTitle}</span>
              </div>
              <div className="text-sm flex uppercase">
                <span className=" w-24 text-red-500">Address</span>
                <span>{res?.dealer_data?.DealerAddress1}</span>
              </div>
              <div className="text-sm flex uppercase">
                <span className=" w-24 text-red-500">City</span>
                <span>{res?.dealer_data?.CityName}</span>
              </div>
              <div className="text-sm flex uppercase">
                <span className=" w-24 text-red-500">State</span>
                <span>{res?.dealer_data?.StateTitle}</span>
              </div>
              <div className="text-sm flex uppercase">
                <span className=" w-24 text-red-500">Zip</span>
                <span>{res?.dealer_data?.DealerZIP}</span>
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
                {formatDate(res?.GetBatchStatus?.SubmitDate)}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-sm">
                <span className="text-red-500 uppercase">
                  System Posted Date:
                </span>
                <span className="text-muted">
                  &nbsp;&nbsp;(REMITTANCE RECIEVED DATE)
                </span>
              </p>
              <p className="text-sm">
                {formatDate(res?.GetBatchStatus?.RemitDate)}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-sm">
                <span className="text-red-500 uppercase">
                  Batch Creation Date:
                </span>{" "}
              </p>
              <p className="text-sm">
                {unixTimestampToDate(res?.GetBatchStatus?.ModifiedDate, true)}
              </p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-sm">
                <span className="text-red-500 uppercase">Prepared By:</span>
              </p>
              <p className="text-sm  uppercase font-bold text-red-500">
                {user_name}
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-sm">
                <span className="text-red-500 uppercase">Batch # :</span>{" "}
              </p>
              <p className="text-sm uppercase">
                {res?.GetBatchStatus?.BatchNo}
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
        <h3 className="font-bold text-red-500 p-0 m-0 mt-2 ps-2 ">
          BATCH INFORMATION
        </h3>

        <div className="overflow-x-auto  p-2">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-[0.7em] uppercase">SR.#</th>
                <th className="border text-[0.7em] uppercase">Contract No</th>
                <th className="border text-[0.7em] uppercase">Stock/Deal#</th>
                <th className="border text-[0.7em] uppercase">Customer Name</th>
                <th className="border text-[0.7em] uppercase">PLAN</th>
                <th className="border text-[0.7em] uppercase">
                  Selling Rep Name
                </th>
                <th className="border text-[0.7em] uppercase">Vin</th>
                <th className="border text-[0.7em] uppercase">Sale Date</th>
                <th className="border text-[0.7em] uppercase">Amount</th>

                <th className="border text-[0.7em] uppercase">Selling Price</th>
              </tr>
            </thead>
            <tbody>
              {res?.BatchedContractsArray?.map((users, index) => (
                <tr key={index} className="border">
                  <td className="border text-[0.7em]">{index + 1}</td>
                  <td className="border text-[0.7em]">{users?.ContractNo}</td>
                  <td className="border text-[0.7em]">{users?.StockDealNo}</td>
                  <td className="border text-[0.7em]">{`${users.CustomerFName} ${users.CustomerLName}`}</td>
                  <td className="border text-[0.7em]">
                    {users.PlanDescription}
                  </td>
                  <td className="border text-[0.7em]">{users.FIManagerName}</td>
                  <td className="border text-[0.7em]">{users?.VIN}</td>

                  <td className="border text-[0.7em]">
                    {unixTimestampToDate(users.SaleDate)}
                  </td>

                  <td className="border text-[0.7em]">
                    {users?.ContractRemitAmount}
                  </td>
                  <td className="border text-[0.7em]">
                    {parseInt(users.ContractTotalCost)}
                  </td>
                </tr>
              ))}

              <tr className="border border-l-0 border-r-0 border-b-2  border-t-2 border-red-500">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="text-[0.9em] font-bold  text-right">Total</td>
                <td></td>
                <td></td>
                <td></td>

                <td className=" text-[0.7em]  ">
                  {currencyFormatter(res?.totalAmount)}
                  .00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-800 mx-20 text-center text-lg mt-2 px-6 p-2 border-t border-b text-pretty">
          Attach Check(s), cancellations, and applications to REMITTANCE
          REGISTER. Make Checks Payable to: Dealer&#39;s Choice, Inc.
        </p>
      </div>
      <div className="flex space-x-2 mt-4 px-4 print:hidden p-4">
        <CustomButton variant="main" onClick={reactToPrintFn}>
          Print
        </CustomButton>
        <CustomButton variant="secondary" onClick={close}>
          Back
        </CustomButton>
      </div>
    </SimpleModal>
  );
};

export default PrintInvoice;
