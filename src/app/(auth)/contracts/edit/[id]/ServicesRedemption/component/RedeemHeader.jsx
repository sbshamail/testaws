import React, { useContext } from "react";
import { EditContractContext } from "../../page";
import LeftBorderCard from "@/components/cui/card/LeftBorderCard";

const RedeemHeader = () => {
  const { recentmileage, contract, fname, lname, dailyMileage } =
    useContext(EditContractContext);

  return (
    <div className="w-full grid xl:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-4">
      <LeftBorderCard
        className=""
        title={"Last Mileage"}
        value={recentmileage}
      />
      <LeftBorderCard
        className=""
        title={"Plan"}
        value={contract?.PlanDescription}
      />
      <LeftBorderCard
        className=""
        title={"Monthly Mileage"}
        value={Math.round(dailyMileage) * 30}
      />
      <LeftBorderCard
        className=""
        title={"Customer"}
        value={
          fname.charAt(0).toUpperCase() +
          fname.slice(1) +
          " " +
          lname.charAt(0).toUpperCase() +
          lname.slice(1)
        }
      />
    </div>
  );
};

export default RedeemHeader;
