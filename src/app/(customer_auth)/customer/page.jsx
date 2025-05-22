"use client";
import React, { useContext } from "react";
import ServiceInfo from "./component/ServiceInfo";
import ServiceStatus from "./component/ServiceStatus";
import PlanInfoAction from "./component/PlanInfoAction";
import ContractHistory from "./component/ContractHistory";
import { LiveChat } from "./component/LiveChat/LiveChat";
import { useSelection } from "@/reduxStore/function";
import { fetchCustomer } from "./component/fn";
import { GlobalContext } from "@/app/Provider";
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import AddMoreInformation from "./component/AddMoreInformation";

const Page = () => {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const customer = useSelection("customer");
  const {
    GetCustomerById,
    ListAllAdditionalInfo,
    GetCustomerContractsHistory,
    msgs_thread,
    msgs_thread_count,
    offset,
  } = customer || {};
  const { customer_id, ContractID } = GLOBAL_RESPONSE || {};
  const dispatch = useDispatch();
  const reducer = setReducer("customer");
  //this function only occur when hit this
  const fetchCustomerData = async () => {
    await fetchCustomer({
      auth,
      Token,
      ContractID,
      customer_id,
      dispatch,
      reducer,
    });
  };
  return (
    <div className="container mx-auto p-4 lg:p-6 flex flex-col gap-6">
      {/* info */}
      <ServiceInfo
        GetCustomerById={GetCustomerById}
        fetchCustomer={fetchCustomerData}
        ListAllAdditionalInfo={ListAllAdditionalInfo}
        GetCustomerContractsHistory={GetCustomerContractsHistory}
      />
      {/* Service Status */}
      <ServiceStatus customer={customer} fetchCustomer={fetchCustomerData} />
      <PlanInfoAction
        Plan={customer?.DealerPlans?.find(
          (item) => item?.PlanID === customer?.contract_result?.PlanID
        )}
        GetCustomerById={GetCustomerById}
        result={customer?.result}
        fetchCustomer={fetchCustomerData}
      />

      <LiveChat
        fetchCustomer={fetchCustomerData}
        msgs_thread={msgs_thread}
        GetCustomerById={GetCustomerById}
        total={msgs_thread_count}
        offset={offset}
      />
    </div>
  );
};

export default Page;
