import React, { useContext, useState } from "react";

import MainTable from "@/components/cui/table/MainTable";
import { MdDelete } from "react-icons/md";
import DealerLoyaltyModel from "./DealerLoyaltyModel";
import RewardLoyaltyModel from "./RewardLoyaltyModel";
import AddSaleServiceModal from "./AddSaleServiceModal";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import DelLoyaltyPointModal from "./DelLoyaltyPointModal";
import {
  currencyFormatter,
  openHtmlInNewTab,
  truncated,
} from "@/utils/helpers";

import PointPasswordField from "./PointPasswordField";
import { GlobalContext } from "@/app/Provider";
import { FaQuestionCircle } from "react-icons/fa";
import TooltipNext from "@/components/nextui/TooltipNext";
import MouseTooltip from "@/components/cui/tooltip/MouseTooltip";
const AuthenticomLp = ({
  xpPoints,
  auth,
  Token,
  contract,
  fetchXp,
  setLoading,
  AllowAddLoyaltyCash,
}) => {
  const conversionPercent = truncated(
    100 / Number(xpPoints?.loyaltydealerpoint?.PointToAmountPercentage)
  );

  const { loyaltypoint, loyaltypoint_total } = xpPoints || {};
  const [dealerLoyaltyModel, setDealerLoyaltyModel] = useState(false);
  const [rewardLoyalty, setRewardLoyaltyModal] = useState(false);
  const [addSaleModal, setAddSaleModal] = useState(false);
  const [delLoyaltyModal, setDelLoyaltyModal] = useState(false);
  const [id, setId] = useState("");

  const smlcpoints = xpPoints?.smlcpoints?.map((item) => ({
    value: item.LoyaltyID,
    text: `${item.LoyaltyTitle} - (${currencyFormatter(
      item.LoyaltyPoints,
      ""
    )})`,
  }));
  const LoyaltyPointAction = ({ row }) => {
    return (
      <div className="flex justify-center hover:text-red-500 Transition cursor-pointer">
        <MdDelete
          className="text-xl"
          onClick={() => {
            setDelLoyaltyModal(true);
            setId(row.ID);
          }}
        />
      </div>
    );
  };
  const VinRender = ({ cell }) => (
    <div className="flex items-center">
      <span>{cell}</span>
      <TooltipNext content={"Contract Creation Awarded Point"}>
        <div>
          <FaQuestionCircle className="text-primary cursor-pointer" />
        </div>
      </TooltipNext>
    </div>
  );
  const columns = [
    { title: "VIN", accessor: "VIN", render: VinRender },
    { title: "Deal #", accessor: "StockDealNo" },
    { title: "Reason", accessor: "Action" },
    { title: "Date", accessor: "AddedDate", type: "date" },
    { title: "Ro", accessor: "RoNo" },
    {
      title: "Point",
      accessor: "Point",
      render: ({ row, cell }) => (
        <PointPasswordField
          row={row}
          cell={cell}
          smlcpoints={smlcpoints}
          auth={auth}
          Token={Token}
          xpPoints={xpPoints}
        />
      ),
    },
    { title: "Action", render: LoyaltyPointAction },
  ];
  const PrintLP = async () => {
    const data = { ContractID: contract.ContractID };
    const res = await fetchPostObj({
      api: "contracts/loyaltypointprint",
      auth,
      Token,
      data,
    });
    openHtmlInNewTab(res?.html);
  };
  const ProgramStatementPrint = async () => {
    const data = { ContractID: xpPoints.ContractID };
    const res = await fetchPostObj({
      api: "contracts/loyaltypointstatement",
      auth,
      Token,
      data,
      setLoading,
    });
    if (res) {
      openHtmlInNewTab(res?.html);
    }
  };

  const isStatusL = contract?.Status === "L";
  const enableShow = xpPoints?.contract?.EnableRedeemedAwardedLoyaltyPointShow;
  const showLoyaltyControls =
    (isStatusL && enableShow == "1") || enableShow == "0";

  return (
    <>
      <div className="">
        <div className="flex gap-2 justify-between">
          <div className="flex">
            <div
              className={`flex-none text-center px-2 py-3 rounded-t-lg bg-siteBlue text-white`}
            >
              <h2 className="text-base font-semibold">Authenticom LP</h2>
            </div>
          </div>
        </div>

        <div className="border border-foreground/10 rounded-b-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <p>History</p>
              {/* {xpPoints?.contract?.EnableRedeemedAwardedLoyaltyPointShow ==
                "0" && (
                <CustomButton
                  size="sm"
                  onClick={() => setDealerLoyaltyModel(true)}
                >
                  Redemption
                </CustomButton>
              )} */}
              {showLoyaltyControls && (
                <>
                  <CustomButton
                    size="sm"
                    onClick={() => setDealerLoyaltyModel(true)}
                  >
                    Redemption
                  </CustomButton>

                  {xpPoints?.dealerinfo?.EnableLoyaltyCash == "1" &&
                    AllowAddLoyaltyCash == "1" && (
                      <>
                        <CustomButton
                          size="sm"
                          variant="success"
                          Icon={() => "+ "}
                          onClick={() => setRewardLoyaltyModal(true)}
                        >
                          &nbsp;Award Point
                        </CustomButton>
                        <CustomButton
                          size="sm"
                          variant="success"
                          Icon={() => "+ "}
                          onClick={() => setAddSaleModal(true)}
                        >
                          &nbsp;Add Sale/Service Point
                        </CustomButton>
                      </>
                    )}
                </>
              )}
            </div>

            <div className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg ">
              Current Point :
              <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
                {loyaltypoint_total ?? 0} (
                {currencyFormatter(loyaltypoint_total / conversionPercent)})
              </span>
            </div>
          </div>

          <MainTable
            columns={columns}
            data={loyaltypoint}
            tableWrapperClass={"h-full"}
          />

          <div className="mt-4 flex justify-end gap-2">
            <CustomButton Icon={() => "🖨️"} variant="white" onClick={PrintLP}>
              Print Receipt
            </CustomButton>
            {xpPoints?.dealerinfo?.EnableLoyaltyPointStatement == "1" && (
              <CustomButton onClick={ProgramStatementPrint}>
                Program Statement
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      {/* modals */}
      {dealerLoyaltyModel && (
        <DealerLoyaltyModel
          fetchXp={fetchXp}
          loyaltyPoint={loyaltypoint_total}
          xpPoints={xpPoints}
          conversionPercent={conversionPercent}
          open={dealerLoyaltyModel}
          setLoading={setLoading}
          close={() => setDealerLoyaltyModel(false)}
        />
      )}
      {rewardLoyalty && (
        <RewardLoyaltyModel
          open={rewardLoyalty}
          close={() => setRewardLoyaltyModal(false)}
          xpPoints={xpPoints}
          conversionPercent={conversionPercent}
          setLoading={setLoading}
          fetchXp={fetchXp}
        />
      )}
      {addSaleModal && (
        <AddSaleServiceModal
          open={addSaleModal}
          xpPoints={xpPoints}
          fetchXp={fetchXp}
          setLoading={setLoading}
          close={() => setAddSaleModal(false)}
          smlcpoints={smlcpoints}
        />
      )}
      {delLoyaltyModal && (
        <DelLoyaltyPointModal
          id={id}
          open={delLoyaltyModal}
          xpPoints={xpPoints}
          auth={auth}
          Token={Token}
          setLoading={setLoading}
          close={() => setDelLoyaltyModal(false)}
          fetchXp={fetchXp}
        />
      )}
    </>
  );
};

export default AuthenticomLp;
