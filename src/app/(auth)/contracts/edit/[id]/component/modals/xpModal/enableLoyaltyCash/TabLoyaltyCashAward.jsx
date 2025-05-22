import React, { useState } from "react";
import { CustomButton } from "@/components/cui/button/CustomButton";
import MainTable from "@/components/cui/table/MainTable";
import RedeemModal from "./RedeemModal";
import AwardModal from "./AwardModal";
import { currencyFormatter, openHtmlInNewTab } from "@/utils/helpers";
import { IoIosPrint } from "react-icons/io";
import { fetchPostObj } from "@/utils/action/function";

const TabLoyaltyCashAward = ({
  xpPoints,
  loyaltyReward,
  auth,
  Token,
  fetchXp,
  contract,
  AllowAddLoyaltyCash,
}) => {
  const { loyaltycash, loyaltycash_total } = xpPoints || {};
  const [redeemModal, setRedeemModal] = useState(false);
  const [awardModal, setAwardModal] = useState(false);

  const PrintLP = async () => {
    const data = { ContractID: loyaltyReward.ContractID };
    const res = await fetchPostObj({
      api: "contracts/loyaltycashprint",
      auth,
      Token,
      data,
    });
    openHtmlInNewTab(res?.html);
  };
  const ShowAmount = ({ cell }) => {
    const amount = Math.abs(Number(cell || 0));
    if (Number(cell || 0) < 0) {
      return <span className="text-red-500"> ${amount.toFixed(2)}</span>;
    }
    return <span>${cell}</span>;
  };
  const columns = [
    { title: "VIN", accessor: "VIN" },
    { title: "Reason", accessor: "Action" },
    { title: "Date", accessor: "AddedDate", type: "date" },
    { title: "Ro", accessor: "RoNo" },
    {
      title: "Action",
      accessor: "amount",
      type: "currency",
      render: ShowAmount,
    },
  ];
  const ServiceIDList = loyaltyReward?.ServiceID?.map((item) => ({
    text: item,
    value: item,
  }));
  return (
    <>
      <div className="ms-2 mt-2 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p>History</p>
            {(xpPoints?.contract?.EnableRedeemedAwardedLoyaltyPointShow ===
              "0" ||
              (xpPoints?.contract?.EnableRedeemedAwardedLoyaltyPointShow ===
                "1" &&
                contract?.Status === "L")) && (
              <CustomButton
                size={
                  xpPoints?.contract?.EnableRedeemedAwardedLoyaltyPointShow ===
                  "0"
                    ? "sm"
                    : "xs"
                }
                onClick={() => setRedeemModal(true)}
              >
                Redemption
              </CustomButton>
            )}

            {xpPoints?.dealerinfo?.EnableLoyaltyCash == "1" &&
              AllowAddLoyaltyCash == "1" && (
                <CustomButton
                  size="xs"
                  variant="success"
                  Icon={() => "+ "}
                  onClick={() => setAwardModal(true)}
                >
                  &nbsp;Award Cash
                </CustomButton>
              )}
          </div>
          <div className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg ">
            Current Balance :
            <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
              {currencyFormatter(loyaltycash_total ?? 0)}
            </span>
          </div>
        </div>
        <MainTable columns={columns} data={loyaltycash} />
        <div className="flex mt-2 justify-end">
          <CustomButton variant="white" Icon={IoIosPrint} onClick={PrintLP}>
            Print
          </CustomButton>
        </div>
      </div>
      {redeemModal && (
        <RedeemModal
          xpPoints={xpPoints}
          loyaltyReward={loyaltyReward}
          open={redeemModal}
          close={() => setRedeemModal(false)}
          ServiceIDList={ServiceIDList}
          fetchXp={fetchXp}
        />
      )}
      {awardModal && (
        <AwardModal
          xpPoints={xpPoints}
          loyaltyReward={loyaltyReward}
          ServiceIDList={ServiceIDList}
          auth={auth}
          Token={Token}
          open={awardModal}
          close={() => setAwardModal(false)}
          fetchXp={fetchXp}
        />
      )}
    </>
  );
};

export default TabLoyaltyCashAward;
