import { CustomButton } from "@/components/cui/button/CustomButton";
import React, { useEffect, useState } from "react";
import TabLoyaltyCashAward from "./TabLoyaltyCashAward";
import MyCarTab from "./MyCarTab";
import { fetchPostObj } from "@/utils/action/function";

const EnableLoyaltyCashDiv = ({
  xpPoints,
  auth,
  Token,
  setLoading,
  fetchXp,
  setXpPoints,
  AllowAddLoyaltyCash,
  contract,
}) => {
  const defineTab = { 0: "loyalty_cash_award", 1: "my_car" };
  const [tab, setTab] = useState(defineTab[0]);
  const [loyaltyReward, setLoyaltyReward] = useState({});
  useEffect(() => {
    const fetchLoyaltyReward = async () => {
      const data = {
        ...auth,
        ContractID: xpPoints?.ContractID,
      };
      const res = await fetchPostObj({
        api: "contracts/dealer_loyaltyreward",
        data,
        Token,
        setLoading,
      });
      setLoyaltyReward(res);
    };
    fetchLoyaltyReward();
  }, [xpPoints]);
  return (
    <div>
      <div className="flex">
        <CustomButton
          size="xs"
          variant={`${tab === defineTab[0] ? "primary" : "secondary"}`}
          className={"rounded-none"}
          onClick={() => setTab(defineTab[0])}
        >
          Loyalty Cash Award
        </CustomButton>
        <CustomButton
          size="xs"
          variant={`${tab === defineTab[1] ? "primary" : "secondary"}`}
          className={"rounded-none"}
          onClick={() => setTab(defineTab[1])}
        >
          My Car
        </CustomButton>
      </div>
      {tab === defineTab[0] && (
        <TabLoyaltyCashAward
          xpPoints={xpPoints}
          loyaltyReward={loyaltyReward}
          auth={auth}
          Token={Token}
          fetchXp={fetchXp}
          contract={contract}
          AllowAddLoyaltyCash={AllowAddLoyaltyCash}
        />
      )}
      {tab === defineTab[1] && (
        <MyCarTab
          xpPoints={xpPoints}
          contractvins={xpPoints?.contractvins}
          loyaltyReward={loyaltyReward}
          fetchXp={fetchXp}
          setXpPoints={setXpPoints}
        />
      )}
    </div>
  );
};

export default EnableLoyaltyCashDiv;
