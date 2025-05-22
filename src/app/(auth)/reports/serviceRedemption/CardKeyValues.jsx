import React from "react";
import { currencyFormatter } from "@/utils/helpers";
const CardKeyValues = ({ totalEntry }) => {
  const leftRightCard = (title, value) => (
    <div className=" flex  flex-1  items-center ">
      <div className="bg-siteBlue whitespace-nowrap text-white pl-2 pr-6 py-2 w-[60%]  print:text-xs print:px-1">
        {title}
      </div>
      <div className=" pl-2 pr-3 py-2 border  w-[40%]  print:text-xs print:px-1">
        {value}
      </div>
    </div>
  );
  return (
    <div className="w-full flex items-center flex-wrap px-4">
      {leftRightCard("Total Services", totalEntry?.tcount ?? 0)}
      {leftRightCard("Total Contract", totalEntry?.totalcontract ?? 0)}
      {leftRightCard(
        "Total Value",
        currencyFormatter(totalEntry?.CouponValue ?? 0)
      )}
      {leftRightCard(
        "Store Amount",
        currencyFormatter(totalEntry?.StoreAmount ?? 0)
      )}
      {leftRightCard(
        "Other Stores",
        currencyFormatter(totalEntry?.OtherStoreAmount ?? 0)
      )}
    </div>
  );
};

export default CardKeyValues;
