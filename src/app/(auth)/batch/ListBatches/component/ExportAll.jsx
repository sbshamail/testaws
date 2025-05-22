import React, { useContext } from "react";
import { jsonToExcel } from "@/utils/generateExcel";
import { GlobalContext } from "@/app/Provider";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
const ExportAll = ({
  dealer,

  FixedDateParameter,
  FromDate,
  ToDate,
  setLoading,
}) => {
  const { auth, Token } = useContext(GlobalContext);
  const exportListOfContractsBatch = async () => {
    const data = {
      DealerID: dealer,
      FixedDateParameter,
      FromDate,
      ToDate,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      data,
      api: "batch/batchreservedamount",
      setLoading,
    });
    if (res) {
      const data = res.dashboardContract.map((item) => ({
        "Dealership Name": item.DealerTitle,
        "COMMISSIONS MONTH(CUT OFF DATE)": item.RemitDate,
        "BATCH NUMBER": item.BatchNo,
        "CHECK NUMBER": item.CheckNo,
        "CUSTOMER NAME": item.CustomerName,
        "CONTRACT NUMBER": item.ContractNo,
        "SALES DATE(SOLD DATE)": item.SaleDate,
        "PLAN(PLAN NAME)": item.PlanDescription,
        VIN: item.VIN,
        "REMIT AMOUNT(AMOUNT)": `$${item.RemitAmount}`,
        RESERVE: `$${item.ReservedAmount}`,
        "Loyalty Point": item.LoyaltyPoint,
      }));
      jsonToExcel(data, "Batch-ExportAll");
    }
  };
  return (
    <CustomButton
      onClick={exportListOfContractsBatch}
      variant="main"
      className="  rounded-lg flex justify-center items-center text-sm font-bold tracking-wide"
    >
      Export All
    </CustomButton>
  );
};

export default ExportAll;
