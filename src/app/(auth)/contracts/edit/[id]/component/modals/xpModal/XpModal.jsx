import React, { useState, useContext, useEffect } from "react";
import { fetchPostObj } from "@/utils/action/function";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import EnableLoyaltyCashDiv from "./enableLoyaltyCash";
import { GlobalContext } from "@/app/Provider";
import XPEnableAwardPoint from "./xpEnableAwardPoint";
import AuthenticomLp from "./AuthenticomLp";
import EnableVehicleCoverageLPDiv from "./EnableVehicleCoverageLP";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
const XpModal = ({ contract, open, close }) => {
  const [loading, setLoading] = useState(false);
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [xpPoints, setXpPoints] = useState({});

  const { AllowAddLoyaltyCash } = GLOBAL_RESPONSE || {};
  const fetchXp = async () => {
    const data = {
      ...auth,
      ContractID: contract?.ContractID,
    };
    const res = await fetchPostObj({
      api: "contracts/customer_xppoints",
      data,
      Token,
      setLoading,
    });
    setXpPoints(res);
  };

  useEffect(() => {
    if (open) {
      fetchXp();
    }
  }, [open, contract]);
  const {
    xp_enable,
    EnableLoyaltyCashPoint,
    EnableLoyaltyCash,
    EnableKaminskyLoyaltyProgram,
    EnableLoyaltyPointStatement,
    EnableVehicleCoverageLP,
  } = contract || {};
  // console.log({
  //   xp_enable,
  //   EnableLoyaltyCashPoint,
  //   EnableLoyaltyCash,
  //   EnableKaminskyLoyaltyProgram,
  //   EnableLoyaltyPointStatement,
  //   EnableVehicleCoverageLP,
  // });

  return xp_enable === "0" &&
    EnableLoyaltyCashPoint === "0" &&
    EnableLoyaltyCash === "0" &&
    EnableKaminskyLoyaltyProgram === "0" &&
    EnableLoyaltyPointStatement === "0" &&
    EnableVehicleCoverageLP === "0" ? (
    <div></div>
  ) : (
    <>
      <div>
        {open && (
          <SimpleModal
            open={open}
            close={close}
            title={"Redemption Service (XP Points)"}
            className={"m-auto"}
            // className={"w-10/12 m-auto bg-white p-6 rounded-lg mt-10"}
          >
            <SpinnerCenterScreen loading={loading} center={true} />
            <div className="flex flex-col gap-6">
              {EnableLoyaltyCashPoint === "1" && (
                <EnableLoyaltyCashDiv
                  xpPoints={xpPoints}
                  auth={auth}
                  Token={Token}
                  setLoading={setLoading}
                  fetchXp={fetchXp}
                  setXpPoints={setXpPoints}
                  contract={contract}
                  AllowAddLoyaltyCash={AllowAddLoyaltyCash}
                /> //Award Cash
              )}

              {xp_enable === "1" && (
                <XPEnableAwardPoint //Award Points
                  servicelist={xpPoints?.servicelist}
                  servicelistredeem={xpPoints?.servicelistredeem}
                  setXpPoints={setXpPoints}
                  xp_count={xpPoints?.xp_count}
                  contract={contract}
                  setLoading={setLoading}
                />
              )}

              {
                EnableKaminskyLoyaltyProgram == "1" && (
                  <AuthenticomLp
                    xpPoints={xpPoints}
                    auth={auth}
                    Token={Token}
                    contract={contract}
                    fetchXp={fetchXp}
                    EnableStatement={EnableLoyaltyPointStatement}
                    setLoading={setLoading}
                    AllowAddLoyaltyCash={AllowAddLoyaltyCash}
                  />
                ) //Authenticom Lp
              }

              {EnableVehicleCoverageLP == "1" && (
                <EnableVehicleCoverageLPDiv close={close} /> // Enable Vehicle Coverage LP
              )}
            </div>
          </SimpleModal>
        )}
      </div>
    </>
  );
};

export default XpModal;
