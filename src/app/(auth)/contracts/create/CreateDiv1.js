"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CreateContractContext } from "./page";
import { Tabs, Tab } from "@nextui-org/react";
import CreateFillContract from "./CreateFillContract/CreateFillContract";
import CreatePricePrint from "./CreatePricePrint/CreatePricePrint";
import { GlobalContext } from "@/app/Provider";
import { fetchPost } from "@/utils/action/function";

import { objectToFormData } from "@/utils/helpers";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { useRouter } from "next/navigation";
import { FaCar } from "react-icons/fa6";
import { MdPrint } from "react-icons/md";

const CreateDiv1 = () => {
  const router = useRouter();
  const { GLOBAL_RESPONSE, auth, Token } = useContext(GlobalContext);
  const { contract, autoFillData, planCost } = useContext(
    CreateContractContext
  );
  const [tabSelect, setTabSelect] = useState("contract");
  const [fillContractData, setFillContractData] = useState({});
  const [priceInfoForm, setPriceInfoForm] = useState({});
  const [contractCreate, setContractCreate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  console.log(loading, submitLoading);
  // price autofill handle
  useEffect(() => {
    if (autoFillData && Object.keys(autoFillData || {}).length > 0) {
      setPriceInfoForm((prevForm) => ({
        ...prevForm,
        contractbank: autoFillData?.BANK,
      }));
    }
  }, [autoFillData]);
  useEffect(() => {
    setPriceInfoForm((prevState) => ({
      ...prevState,
      contractcost: planCost?.PlanCostAndExpiry?.PlanCost,
      customerprice: planCost?.PlanCostAndExpiry?.customerprice,
      planprice: planCost?.PlanCostAndExpiry?.PlanCost,
      compPrice: planCost?.PlanCostAndExpiry?.OverritePrice,
    }));
  }, [planCost]);
  const fetchCustomerInfo = useCallback(async () => {
    setLoading(true);
    const formdata = objectToFormData({
      ...auth,
    });
    const res = await fetchPost({
      api: "contracts/contractcreate",
      token: Token,
      formdata,
    });
    if (res) {
      if (res?.Plans && res?.Makes) {
        setLoading(false);
      }
      setContractCreate(res);
    }
  }, [GLOBAL_RESPONSE]);
  useEffect(() => {
    fetchCustomerInfo();
  }, [GLOBAL_RESPONSE]);

  //  handle function of create
  const createNewContract = async (priceInfo) => {
    setSubmitLoading(true);
    const { contactInfo, pvInfo } = fillContractData;

    const priceInfoData = {
      BankId: priceInfo?.contractbank,
      Bank_Address: priceInfo?.contractbankaddress,
      ContractTotalCost: priceInfo?.contractcost,
      customerprice_hidden: parseInt(priceInfo?.customerprice),
      Contract_Total_Cost: parseInt(priceInfo?.contractcost),
      OneTimeRONumber: priceInfo?.oneTimeRONumber,
      isServiceContract: priceInfo?.servicecontract ? 1 : 0,
      ServiceContract: priceInfo?.ServiceContract,
      contractno: contract?.AssignNewContractNumber,
    };
    // console.log(fillContractData, priceInfo);
    const formData = objectToFormData({
      ...auth,
      ...contactInfo,
      ...pvInfo,
      ...priceInfoData,
    });

    const response = await fetchPost({
      api: "contracts/addcontract",
      token: Token,
      formdata: formData,
      showToast: true,
    });

    const contractID = response?.ContractID;
    if (contractID) {
      const location = `/contracts/edit/${contractID}`;
      router.push(location);
    } else {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="flex  flex-col justify-between  w-full">
      <h1 className="font-bold text-xl my-5">CONTRACT CREATE</h1>
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        className="my-4"
        selectedKey={tabSelect}
        onSelectionChange={setTabSelect}
      >
        <Tab
          key="contract"
          title={
            <div className="flex items-center space-x-2">
              <FaCar className="text-xl" />
              <span>Fill Contract</span>
            </div>
          }
        />
        <Tab
          key="price"
          title={
            <div className="flex items-center space-x-2">
              <MdPrint className="text-xl" />
              <span>Contract Print</span>
            </div>
          }
        />
      </Tabs>

      <SpinnerCenterScreen loading={loading || submitLoading} />
      <div className="my-4">
        <div style={{ display: tabSelect === "contract" ? "block" : "none" }}>
          <CreateFillContract
            setTabSelect={setTabSelect}
            setFillContractData={setFillContractData}
            auth={auth}
            contractCreate={contractCreate}
            setLoading={setLoading}
          />
        </div>
        {tabSelect === "price" && (
          <CreatePricePrint
            setPriceInfoForm={setPriceInfoForm}
            priceInfoForm={priceInfoForm}
            createNewContract={createNewContract}
            auth={auth}
            contractCreate={contractCreate}
            fetchCustomerInfo={fetchCustomerInfo}
            setLoading={setLoading}
            loading={loading || submitLoading}
          />
        )}
      </div>
    </div>
  );
};

export default CreateDiv1;
