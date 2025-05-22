"use client";
import React, { useContext, useState } from "react";
import { useSelection } from "@/reduxStore/function";
import { fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { unixTimestampToDate } from "@/utils/helpers";

const Page = () => {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    customer_id: CustomerID,
    ContractID,
    IsGuest = 0,
  } = GLOBAL_RESPONSE || {};
  const [data, setData] = useState([]);
  const customer = useSelection("customer");
  const { contract_result } = customer || {};
  const { ValidityMileage, ValidityDate } = contract_result || {};
  const fetchList = async () => {
    const data = { IsGuest, CustomerID, ContractID };
    const res = await fetchPostObj({
      api: "customer/orderlist",
      auth,
      Token,
      data,
      spinner: true,
      showToast: true,
    });
    if (res) {
      setData(res);
    }
  };
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3 text-muted-foreground">
        <h2 className="font-light text-xl ">YOUR PLAN</h2>
        <div className="w-[1px] h-5 bg-secondary-foreground"></div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">Valid up to Date</span>
          <span> {unixTimestampToDate(ValidityDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">Valid up to Mileage</span>
          <span> {ValidityMileage}</span>
        </div>
      </div>
      <ShadowContainer className={"space-y-4"}>
        <div>
          <span className="font-bold text-xl">ORDERS - </span>
          <span className="text-muted-foreground text-xl font-bold">
            PRODUCT LIST
          </span>
        </div>
        <div>
          {data?.length === 0 ? (
            <div className="rounded p-2 bg-red-300 text-red-600">
              No Order Found
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </ShadowContainer>
    </div>
  );
};

export default Page;
