import React, { useState } from "react";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { tableDataNotFound } from "../../functions";
import { currencyFormatter } from "@/utils/helpers";
import SelectedDealerModal from "./SelectedDealerModal";
function AuthenticomLoyaltyRewards({ loading, responseState }) {
  const [selectedDealer, setSelectedDealer] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTdClick = (dealer) => {
    // Find the dealer from responseState.DealerSummary based on DealerID
    const dealerData = responseState?.DealerSummary?.find(
      (item) => item.DealerID === dealer
    );

    // If a matching dealer is found, set the selected dealer
    if (dealerData) {
      setSelectedDealer(dealerData);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDealer(null);
  };

  const totalSalePoints = (responseState?.DealerSummary || []).reduce(
    (sum, dealer) => sum + Number(dealer?.PointsIssued || 0),
    0
  );

  const totalRedeemPoints = (responseState?.DealerSummary || []).reduce(
    (sum, dealer) => sum + Number(dealer?.PointsRedeemed || 0),
    0
  );

  const totalExpiredPoints = (responseState?.DealerSummary || []).reduce(
    (sum, dealer) => sum + Number(dealer?.PointsExpired || 0),
    0
  );

  const totalPointsBalance = (responseState?.DealerSummary || []).reduce(
    (sum, dealer) => sum + Number(dealer?.PointsBalance || 0),
    0
  );

  const totalAmount = (responseState?.DealerSummary || []).reduce(
    (sum, dealer) => {
      const amount = Number(dealer?.TotalAmount?.replace(/,/g, "") || 0);
      if (isNaN(amount)) {
        console.error("Invalid TotalAmount:", dealer?.TotalAmount);
      }
      return sum + (isNaN(amount) ? 0 : amount);
    },
    0
  );

  // ----------------------------------------------------------------
  const totalPointsIssued = (responseState?.CustomerSummay || []).reduce(
    (sum, dealer) => {
      return sum + Number(dealer?.PointsIssued || 0);
    },
    0
  );

  const totalPointsRedeemed = (responseState?.CustomerSummay || []).reduce(
    (sum, dealer) => sum + Number(dealer?.PointsRedeemed || 0),
    0
  );

  const totalPointsExpired = (responseState?.CustomerSummay || []).reduce(
    (sum, dealer) => sum + Number(dealer?.PointsExpired || 0),
    0
  );

  const totalBalancePoints = (responseState?.CustomerSummay || []).reduce(
    (sum, dealer) => sum + Number(dealer?.PointsBalance || 0),
    0
  );

  const THead = () => (
    <thead>
      <tr>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Sr.#
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Dealer ID
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Dealership (%/Total/Active)
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Points Issued
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Points Redeemed
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Points Expired
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Points Balance
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right bg-yellow-100 text-black">
          Amount
        </th>
      </tr>
    </thead>
  );

  return (
    <div className="flex flex-col  mt-5">
      {responseState?.CustomerSummay?.length > 0 ? (
        <>
          <div className="flex flex-col max-w-full  mt-6 gap-4">
            <ShadowContainer>
              <div className=" py-8">
                <div className="flex justify-between my-3">
                  <h2 className="text-md font-bold">
                    Total :{" "}
                    {Number(responseState?.res?.TotalCancelled?.totalcount)}
                  </h2>
                  <h2 className="text-md font-bold">
                    Point :{" "}
                    {Number(
                      responseState?.res?.TotalCancelled?.Point
                    ).toLocaleString()}
                  </h2>
                </div>
                <div className="flex justify-between my-3">
                  <h2 className="text-lg font-bold">SUMMARY BY DEALERSHIP</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="bg-card table-auto w-full border-collapse border border-card-foreground/10 text-sm">
                    {THead()}
                    <tbody>
                      {responseState?.DealerSummary?.map((dealer, index) => (
                        <tr key={dealer?.DealerID}>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {dealer?.DealerID}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {dealer?.DealerTitle}
                          </td>
                          <td
                            onClick={() => handleTdClick(dealer?.DealerID)}
                            className="border border-card-foreground/10 px-4 py-2 text-right text-blue-400 hover:underline cursor-pointer"
                          >
                            {currencyFormatter(dealer?.PointsIssued)}
                          </td>

                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {dealer?.PointsRedeemed ? (
                              Number(dealer?.PointsRedeemed) !== 0 ? (
                                <span>
                                  {Number(
                                    dealer?.PointsRedeemed
                                  ).toLocaleString()}
                                </span>
                              ) : (
                                "-"
                              )
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {dealer?.PointsExpired &&
                            Number(dealer?.PointsExpired) !== 0
                              ? Number(dealer?.PointsExpired).toLocaleString()
                              : "-"}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {dealer?.PointsBalance
                              ? Number(dealer?.PointsBalance).toLocaleString()
                              : "-"}
                          </td>
                          <td className="border  px-4 py-2 text-right bg-yellow-100 text-black">
                            ${dealer?.TotalAmount?.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="font-bold ">
                        <td
                          className="border border-card-foreground/10 px-4 py-2"
                          colSpan="3"
                        >
                          TOTAL BY DEALERSHIP
                        </td>
                        <td className="border border-card-foreground/10 px-4 py-2 text-right">
                          {totalSalePoints?.toLocaleString()}
                        </td>
                        <td className="border border-card-foreground/10 px-4 py-2 text-right">
                          {Number(
                            responseState?.res?.TotalCancelled?.PointsRedeemed
                          ).toLocaleString()}
                        </td>
                        <td className="border border-card-foreground/10 px-4 py-2 text-right">
                          {totalExpiredPoints?.toLocaleString()}
                        </td>
                        <td className="border border-card-foreground/10 px-4 py-2 text-right">
                          {totalPointsBalance?.toLocaleString()}
                        </td>
                        <td className="border  px-4 py-2 text-right bg-yellow-100 text-black">
                          ${totalAmount?.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ShadowContainer>
          </div>
          <div className="flex flex-col max-w-full container-max-width mt-6 gap-4">
            <ShadowContainer>
              <div className="container mx-auto  py-8">
                <h2 className="text-lg font-bold mb-4">SUMMARY BY ACCOUNT</h2>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border-collapse border border-card-foreground/10 text-sm">
                    <thead className="">
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
                          Points Issued
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right">
                          Points Redeemed
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right">
                          Points Expired
                        </th>
                        <th className="border border-card-foreground/10 px-4 py-2 text-right">
                          Points Balance
                        </th>
                        <th className="border  px-4 py-2 text-right bg-yellow-100 text-black">
                          2% Liability Payable
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {responseState?.CustomerSummay?.map((customer, index) => (
                        <tr key={index}>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {customer?.ContractNo}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {customer?.CustomerFName} &nbsp;
                            {customer?.CustomerLName}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {customer?.PointsIssued
                              ? Number(customer?.PointsIssued).toLocaleString()
                              : "-"}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {customer?.PointsRedeemed ? (
                              Number(customer?.PointsRedeemed) !== 0 ? (
                                <span>
                                  {Number(
                                    customer?.PointsRedeemed
                                  ).toLocaleString()}
                                </span>
                              ) : (
                                "-"
                              )
                            ) : (
                              "-"
                            )}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {customer?.PointsExpired &&
                            Number(customer?.PointsExpired) !== 0
                              ? Number(customer?.PointsExpired).toLocaleString()
                              : "-"}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {customer?.PointsBalance
                              ? Number(customer?.PointsBalance).toLocaleString()
                              : "-"}
                          </td>
                          <td className="border  px-4 py-2 text-right bg-yellow-100 text-black">
                            $
                            {customer?.PointsBalance
                              ? Number(
                                  customer?.PointsBalance * 0.02
                                ).toLocaleString()
                              : "-"}
                          </td>
                        </tr>
                      ))}

                      <tr className="font-bold ">
                        <td
                          className="border border-card-foreground/10 px-4 py-2"
                          colSpan="3"
                        >
                          TOTAL BY ACCOUNT
                        </td>
                        <td className="border border-card-foreground/10 px-4 py-2 text-right">
                          {totalPointsIssued
                            ? Number(totalPointsIssued).toLocaleString()
                            : "-"}
                        </td>
                        <td className="border border-card-foreground/10 px-4 py-2 text-right">
                          {totalPointsRedeemed
                            ? Number(totalPointsRedeemed).toLocaleString()
                            : "-"}
                        </td>
                        <td className="border border-card-foreground/10 px-4 py-2 text-right">
                          {totalPointsExpired
                            ? Number(totalPointsExpired).toLocaleString()
                            : "-"}
                        </td>
                        <td className="border border-card-foreground/10 px-4 py-2 text-right">
                          {totalBalancePoints
                            ? Number(totalBalancePoints).toLocaleString()
                            : "-"}
                        </td>
                        <td className="border  px-4 py-2 text-right bg-yellow-100 text-black">
                          {currencyFormatter(totalBalancePoints * 0.02)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ShadowContainer>
          </div>
          {isModalOpen && selectedDealer && (
            <SelectedDealerModal
              selectedDealer={selectedDealer}
              open={isModalOpen}
              close={() => setIsModalOpen(false)}
            />
          )}
        </>
      ) : (
        !loading && tableDataNotFound(THead)
      )}
    </div>
  );
}

export default AuthenticomLoyaltyRewards;
