import { GlobalContext } from "@/app/Provider";
import React, { useContext, useState } from "react";
import { TbClockExclamation, TbClockHour5 } from "react-icons/tb";
import RedeemAfterExpiredModal from "../RedeemAfterExpiredModal";
import XpModal from "../../edit/[id]/component/modals/xpModal/XpModal";
import TooltipNext from "@/components/nextui/TooltipNext";

const Name = ({ row }) => {
  const { auth } = useContext(GlobalContext);
  const [xpModal, setXpModal] = useState(false);
  const [redeemAfterExpire, setRedeemAfterExpire] = useState(false);
  const [modalContractId, setModalContractId] = useState(null);
  const [actualStatus, setActualStatus] = useState(null);
  const [isRedeemAfterExpired, setIsRedeemAfterExpired] = useState(
    row.IsRedeemAfterExpired
  );
  const toggleRedeemAfterExpire = (contractId, status) => {
    setRedeemAfterExpire(!redeemAfterExpire);
    setModalContractId(contractId);
    setActualStatus(status);
  };
  const updateRedeemAfterExpireStatus = (newStatus) => {
    setIsRedeemAfterExpired(newStatus); // Update the status when child updates
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        {row.CustomerName}
        {auth?.role_id == 1 && ["M", "S"].includes(row?.Status) ? (
          <div
          // onClick={() => {
          //   document.getElementById("ContractEditId").value =
          //     row.ContractID;
          //   load_model_by_url(
          //     `${siteUrl(
          //       "contracts/allredeemafterexpired/" +
          //         row.ContractID +
          //         "/" +
          //         row.IsRedeemAfterExpired
          //     )}`,
          //     "Redeem After Expired",
          //     "large"
          //   );
          // }}
          // href="#"
          // className="btn btn-xs pull-right poshytip_input"
          // title={`Redeem After Expire ${
          //   row.IsRedeemAfterExpired === 0 ? "Disabled" : "Enabled"
          // }`}
          // alt={`Redeem After Expire ${
          //   row.IsRedeemAfterExpired === 0 ? "Disabled" : "Enabled"
          // }`}
          >
            <div className="relative group">
              {row.IsRedeemAfterExpired == 1 && isRedeemAfterExpired == 1 ? (
                <>
                  <TooltipNext content={"Click to Enable Redeem After Expire"}>
                    <div>
                      <TbClockHour5
                        onClick={() =>
                          toggleRedeemAfterExpire(row?.ContractID, 1)
                        }
                        className="cursor-pointer text-green-500 w-5 h-5"
                      />
                    </div>
                  </TooltipNext>
                </>
              ) : (
                <>
                  <TooltipNext content={"Click to Disable Redeem After Expire"}>
                    <div>
                      <TbClockExclamation
                        onClick={() =>
                          toggleRedeemAfterExpire(row?.ContractID, 0)
                        }
                        className="cursor-pointer text-red-500 w-5 h-5"
                      />
                    </div>
                  </TooltipNext>
                </>
              )}
            </div>
          </div>
        ) : null}

        <div>
          {row?.loyaltycash > 0 &&
            ((row?.EnableLoyaltyCash == 1 &&
              row?.EnableLoyaltyCashPoint == 1) ||
            row?.EnableLoyaltyCash == 1 ||
            row?.EnableKaminskyLoyaltyProgram == 1 ||
            row?.EnableVehicleCoverageLP == 1 ? (
              <div
                className="bg-green-400 select-none cursor-pointer px-2 py-1 rounded-3xl text-white shadow-lg"
                onClick={() => setXpModal(true)}
              >
                {row?.loyaltycash?.toFixed(2)}
              </div>
            ) : row?.EnableLoyaltyCash == 1 &&
              (row?.EnableKaminskyLoyaltyProgram == 1 ||
                row?.EnableVehicleCoverageLP == 1) ? (
              <div
                className="bg-green-400 select-none cursor-pointer px-2 py-1 rounded-3xl text-white shadow-lg"
                onClick={() => setXpModal(true)}
              >
                {row?.loyaltycash?.toFixed(2)}
              </div>
            ) : null)}
        </div>
      </div>
      {redeemAfterExpire && (
        <RedeemAfterExpiredModal
          isOpen={redeemAfterExpire}
          onClose={toggleRedeemAfterExpire}
          contractId={modalContractId}
          actualStatus={actualStatus}
          updateRedeemStatus={updateRedeemAfterExpireStatus} // Pass the callback
        />
      )}
      {xpModal && (
        <XpModal
          contract={row}
          open={xpModal}
          close={() => setXpModal(false)}
        />
      )}
    </>
  );
};

export default Name;
