import React, { useContext, useState, useEffect } from "react";
import { unixTimestampToDate } from "@/app/functions";
import { ResellContractContext } from "./page";

import "./fontbebas.css";
import ResellFillContract from "./FillContract/ResellFillContract";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";

const ResellDiv1 = () => {
  const {
    contract,
    dataRecieved,
    resellContractPopup,
    oldContractID,
    setDataRecieved,
    dataRecievedCount,
    addNewModel,
    addNewBank,
  } = useContext(ResellContractContext);
  const { GLOBAL_RESPONSE, tab } = useContext(GlobalContext);
  const router = useRouter();

  const [tabSelect, setTabSelect] = useState("contract");
  const [fillContractData, setFillContractData] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const countryID = fillContractData?.contactInfo?.country;
  const StateID = fillContractData?.contactInfo?.state;
  const bankID = priceInfo?.contractbank;
  const loyaltyID = fillContractData?.pvInfo?.smlcPointsSelect;
  const make = fillContractData?.pvInfo?.make;

  const createNewContract = () => {
    setLoading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("CustomerFName", fillContractData?.contactInfo?.fname);
    formdata.append("CustomerLName", fillContractData?.contactInfo?.lname);
    formdata.append(
      "CustomerAddressLine1",
      fillContractData?.contactInfo?.streetaddress
    );
    formdata.append(
      "CustomerAddressLine2",
      fillContractData?.contactInfo?.streetaddress
    );
    formdata.append("Email", fillContractData?.contactInfo?.email);
    formdata.append("PhoneHome", fillContractData?.contactInfo?.phone);
    formdata.append("CityName", fillContractData?.contactInfo?.city);
    formdata.append(
      "StateID",
      StateID instanceof Set ? [...StateID][0] : StateID
    );
    formdata.append(
      "CountryID",
      countryID instanceof Set ? [...countryID][0] : countryID
    );
    formdata.append("CustomerZIP", fillContractData?.contactInfo?.zip);
    formdata.append(
      "SendEmail",
      fillContractData?.contactInfo?.sendemail ? 1 : 0
    );
    formdata.append("SendSms", fillContractData?.contactInfo?.sendsms ? 1 : 0);
    formdata.append("VIN", fillContractData?.pvInfo?.vin);
    formdata.append("DealerID", fillContractData?.pvInfo?.dealer);
    formdata.append("PlanID", fillContractData?.pvInfo?.plan);
    formdata.append("MakeID", make instanceof Set ? [...make][0] : make);
    formdata.append("ModelID", fillContractData?.pvInfo?.model);
    formdata.append("VehYear", fillContractData?.pvInfo?.year);
    formdata.append("VehicleType", fillContractData?.pvInfo?.vehicletype);
    formdata.append("SaleDate", fillContractData?.pvInfo?.saledate);
    formdata.append(
      "BankId",
      fillContractData?.pvInfo?.contractbank instanceof Set
        ? [...fillContractData?.pvInfo?.contractbank][0]
        : fillContractData?.pvInfo?.contractbank
    );
    formdata.append("Mileage", fillContractData?.pvInfo?.mileage);
    formdata.append("SellingRep", fillContractData?.pvInfo?.productsellingrep);
    formdata.append(
      "ContractTotalCost",
      fillContractData?.pvInfo?.contractcost
    );
    formdata.append("ValidityDate", fillContractData?.pvInfo?.expNew);

    formdata.append(
      "contractno",
      contract?.contractinfo?.AssignNewContractNumber
    );

    formdata.append(
      "new_Contract_Number",
      fillContractData?.pvInfo?.contractno
    );
    formdata.append("OldContractID", oldContractID);

    formdata.append("AddVehicleModel", addNewModel);
    formdata.append("AddNewbank", addNewBank);
    formdata.append("Bank_Address", contract?.contractinfo?.LienholderAddress);
    formdata.append("CustomerID", contract?.customereinfo?.CustomerID);
    formdata.append("DealNo", fillContractData?.pvInfo?.deal);
    formdata.append("StockDealNo", fillContractData?.pvInfo?.stock);
    formdata.append(
      "Loyalty_Map",
      fillContractData?.pvInfo?.loyaltyCash ? 1 : 0
    );
    formdata.append(
      "LoyaltyCashEnable",
      fillContractData?.pvInfo?.loyaltyPoints ? 1 : 0
    );
    formdata.append(
      "LoyaltyID",
      loyaltyID instanceof Set ? [...loyaltyID][0] : loyaltyID
    );
    formdata.append(
      "EnableWelcomeSms",
      fillContractData?.pvInfo?.welcomeSms ? 1 : 0
    );
    formdata.append(
      "Contract_Total_Cost",
      parseInt(fillContractData?.pvInfo?.newContractTotalCost)
    );
    formdata.append(
      "isServiceContract",
      fillContractData?.pvInfo?.isServiceContract
    );
    formdata.append("OneTimeRONumber", contract?.contractinfo?.RO);
    formdata.append(
      "allowoverride",
      contract?.contractinfo?.SellingpriceOverride ? 1 : 0
    );
    formdata.append(
      "customerprice_hidden",
      contract?.contractinfo?.CustomerPrice
    );
    formdata.append(
      "HideTestContract",
      contract?.contractinfo?.HideTestContract ? 1 : 0
    );
    formdata.append("ResellContractPopup", resellContractPopup ? 1 : 0);

    fetch("https://mypcp.us/webservices/contracts/addcontract", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          router.push(`/contracts/edit/${res?.ContractID}`);

          toast.success(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (dataRecievedCount > 0) {
      createNewContract();
    }
  }, [dataRecievedCount]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex w-full flex-col justify-between">
        <div className="flex justify-between items-center mr-3"></div>
        <div className="my-4">
          <div style={{ display: tabSelect === "contract" ? "block" : "none" }}>
            <ResellFillContract
              setTabSelect={setTabSelect}
              setFillContractData={setFillContractData}
              fillContractData={fillContractData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResellDiv1;
