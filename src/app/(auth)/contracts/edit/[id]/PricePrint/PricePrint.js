import React, { useState, useContext, useEffect, useCallback } from "react";

import toast from "react-hot-toast";
import { GlobalContext } from "@/app/Provider";
import { EditContractContext } from "../page";
import Input from "@/app/Components/Inputs/Input";
import Select from "@/app/Components/Inputs/Select";

//form
import { handleFieldValue } from "@/components/forms/functions";
import { PrintContractEmail, validateForm } from "./fn";
import { CustomButton } from "@/components/cui/button/CustomButton";
import AddBankmodal from "../../../../../../components/forms/contract/AddBankmodal";
import { serviceContractCondition } from "@/components/forms/contract/commonfn";
import PrintLetterModal from "@/components/printModals/PrintLetterModal";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { Toastify } from "@/utils/helpers";
const PricePrint = ({
  handleEditContract,
  setTabSelect,
  setFormUpdateOnly,
  contract,
}) => {
  const [key, setkey] = useState(false);
  const [loading, setLoading] = useState(false);

  const [addbankmodal, setaddbankmodal] = useState(false);
  const { GLOBAL_RESPONSE, auth, Token } = useContext(GlobalContext);

  const {
    email,
    setaddaddressmodal,
    setbanks,
    addaddressmodal,
    setemail,
    params,
    banks,
    contractbank,
    setcontractbank,
    contractcost,
    setcontractcost,
    contractemail,
    setcontractemail,
    contractbankaddress,
    setcontractbankaddress,
    customerprice,
    setcustomerprice,
    planprice,
    setplanprice,
    // setOneTimeRONumber,
    oneTimeRONumber,
    compPrice,
    setCompPrice,
    isServicecontract,
    ServiceContract,
    lpvsb,
    setlpvsb,
    planCost,
    planID,
    dealerID,
    country,
  } = useContext(EditContractContext);
  const [formErrors, setFormErrors] = useState({});
  const [bankAddress, setBankAddress] = useState("");
  const [priceInfo, setPriceInfoState] = useState({});

  // use for Print Letter Button Rich Text
  const [printLetter, setPrintLetter] = useState(null);
  const [showPrintLetter, setShowPrintLetter] = useState(false);
  const defaultValues = {
    contractcost,
    contractbank: contractbank,
    contractemail,
    contractbankaddress,
    customerprice,
    planprice,
    oneTimeRONumber,
    compPrice,
    isServicecontract,
    ServiceContract,
    lpvsb: false,
  };
  useEffect(() => {
    setPriceInfoState((prev) => ({
      ...prev,
      ...defaultValues,
      isServicecontract: isServicecontract === "YES" ? true : false,
    }));
  }, [
    contractbank,
    contractemail,
    contractbankaddress,
    isServicecontract,
    ServiceContract,
    contractcost,
    customerprice,
    planprice,
    oneTimeRONumber,
    compPrice,
  ]);

  const fetchSendEmail = () => {
    setLoading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("ContractID", params.id);
    formdata.append("UserEmail", contractemail);

    fetch("https://mypcp.us/webservices/contracts/emailcontract", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setLoading(false);
        if (res.success === "1") {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Can't Send Email err3");
        console.log(error);
      });
  };

  const fetchBankAddress = () => {
    setLoading(true);
    const {
      pcp_user_id = null,
      user_cizacl_role_id = null,
      user_id = null,
      Token = null,
    } = GLOBAL_RESPONSE || {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append(
      "BankID",
      priceInfo?.contractbank instanceof Set
        ? [...priceInfo?.contractbank][0]
        : priceInfo?.contractbank
    );
    formdata.append("DealerID", dealerID);

    fetch("https://mypcp.us/webservices/contracts/showbanklienholderaddress", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          setBankAddress(res?.BankAddress);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBankAddress();
  }, [priceInfo?.contractbank]);

  const matchingPlan = contract?.Plans?.find(
    (contract) => planID?.toString() == contract?.PlanID
  );

  const bankOptions = banks
    ? banks.map((bank) => ({
        text: bank?.BankName,
        value: bank.BankID,
      }))
    : [];

  const currentPrice = parseInt(planCost?.PlanCostAndExpiry?.PlanCost) || 0;

  const minLimit =
    matchingPlan?.CustomerPriceAdjustment === "+" ? currentPrice : undefined;

  const maxLimit =
    matchingPlan?.CustomerPriceAdjustment === "-"
      ? Math.max(currentPrice - matchingPlan?.OverriteAmount, 0)
      : undefined;

  // handle Input Change
  const handleInputChange = (field, value) => {
    if (defaultValues[field] !== value) {
      setFormUpdateOnly((prev) => ({ ...prev, pvInfo: true }));
    } else {
      setFormUpdateOnly((prev) => ({ ...prev, pvInfo: false }));
    }
    if (field === "isServicecontract") {
      if (value === false) {
        setPriceInfoState({ ...priceInfo, ServiceContract: "" });
      }
    }
    handleFieldValue(field, value, setPriceInfoState, setFormErrors);
  };

  useEffect(() => {
    setPriceInfoState((prevState) => ({
      ...prevState,
      contractcost: planCost?.PrintedonContract,
      customerprice: planCost?.CustomerPrice,
      planprice: planCost?.PlanPrice,
      compPrice: planCost?.CompPrice,
      contractbank: contractbank || "",
      contractemail: contractemail || "",
    }));
  }, [planCost]);

  // format data according to backend field (update request)
  const formattedPriceInfo = {
    ContractTotalCost: priceInfo?.contractcost,
    customerprice_hidden: priceInfo?.customerprice,
    Contract_Total_Cost: priceInfo?.contractcost,
    OneTimeRONumber: priceInfo?.oneTimeRONumber,
    isServiceContract: priceInfo?.isServicecontract ? 1 : 0,
    ServiceContract: priceInfo?.ServiceContract,
    Email: priceInfo?.contractemail,
    BankId: priceInfo?.contractbank,
    Bank_Address: priceInfo?.contractbankaddress,
  };
  const handleNext = () => {
    console.log("console");
    const errors = validateForm(priceInfo);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      Toastify("error", "Please fix the errors in the form.");
      // setTabSelect("serviceRedemption");
    } else {
      handleEditContract(formattedPriceInfo);
      // Proceed with form submission or save the data
    }
  };

  const matchedDealer = contract?.dealers?.find(
    (dealer) =>
      dealer.SellingpriceOverride === "1" && dealer.DealerID === dealerID
  );

  const BankModal = () => (
    <AddBankmodal
      setmodal={setaddbankmodal}
      setbanks={setbanks}
      DealerID={dealerID}
      setcontractbank={setcontractbank}
    />
  );
  const ShowPrintLetterModal = () => (
    <PrintLetterModal
      value={printLetter}
      close={() => setShowPrintLetter(false)}
      setmodal={setShowPrintLetter}
      modal={showPrintLetter}
    />
  );

  return (
    <div>
      {addbankmodal && <BankModal />}
      {showPrintLetter && <ShowPrintLetterModal />}
      <ShadowContainer>
        <div className={`w-full grid grid-cols-12 gap-6  `}>
          <div className="xl:col-span-9 col-span-6 flex flex-col space-y-4 pl-6 py-8">
            <h2 className="text-2xl font-bold text-left mb-4">
              Contract Price Info
            </h2>
            <div className="w-full flex space-x-2 ">
              <Select
                options={bankOptions}
                value={priceInfo?.contractbank}
                setvalue={(value) => handleInputChange("contractbank", value)}
                onlyLabel="Bank List"
                bgcolor="bg-[#ffffff]"
                className={"w-1/2"}
              />

              <div className="flex items-center space-x-2">
                <CustomButton
                  onClick={() => {
                    setaddbankmodal(true);
                  }}
                >
                  Add Bank
                </CustomButton>

                <CustomButton
                  onClick={() => {
                    setaddaddressmodal(true);
                  }}
                >
                  Add Address
                </CustomButton>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-1">
              <Input
                type="number"
                label="Price On Printed Contract"
                value={priceInfo?.contractcost}
                setvalue={(value) => handleInputChange("contractcost", value)}
                placeholder="Price On Printed Contract"
                min={minLimit}
                max={maxLimit}
                defaultValue1={planCost?.PrintedonContract}
                error={formErrors.contractcost}
                // editable={
                //   matchedDealer?.SellingpriceOverride === "1" ? false : true
                // }
                width={"full"}
                prefix={"$"}
              />
              <Input
                type="number"
                label="Customer Price"
                value={priceInfo?.customerprice}
                setvalue={(value) => handleInputChange("customerprice", value)}
                placeholder="Customer Price"
                min={minLimit}
                max={maxLimit}
                error={formErrors.customerprice}
                defaultValue1={planCost?.CustomerPrice}
                editable={true}
                disable={true}
                width={"full"}
                prefix={"$"}
                autoFillValue={""}
              />
              <Input
                type="number"
                label="Plan Price"
                value={priceInfo?.planprice}
                setvalue={(value) => handleInputChange("planprice", value)}
                placeholder="Plan Price"
                min={minLimit}
                max={maxLimit}
                defaultValue1={planCost?.PlanPrice}
                error={formErrors.planprice}
                dollarSign={"$"}
                disable={true}
                width={"full"}
                prefix={"$"}
                autoFillValue={""}
              />
              <Input
                label="Comp Price"
                value={priceInfo?.compPrice}
                setvalue={(value) => handleInputChange("compPrice", value)}
                placeholder="Comp Price"
                type="text"
                defaultValue1={planCost?.CompPrice}
                prefix={"$"}
                error={formErrors.compPrice}
                disable={true}
                width={"full"}
                autoFillValue={""}
              />

              {priceInfo?.contractbankaddress && (
                <Input
                  key={key}
                  disable
                  label="Address"
                  value={priceInfo?.contractbankaddress}
                  setvalue={(value) =>
                    handleInputChange("contractbankaddress", value)
                  }
                  placeholder="Address"
                  type="text"
                  width={"full"}
                  defaultValue1={bankAddress}
                />
              )}
            </div>

            {serviceContractCondition(handleInputChange, priceInfo)}
          </div>
          <div className="xl:col-span-3 col-span-6 ">
            <PrintContractEmail
              auth={auth}
              Token={Token}
              id={params.id}
              email={email}
              setemail={setemail}
              setPrintLetter={setPrintLetter}
              setShowPrintLetter={setShowPrintLetter}
            />
          </div>
        </div>
      </ShadowContainer>
      <div className="w-full flex flex-row justify-between gap-5 mt-4">
        <button
          onClick={() => setTabSelect("contract")}
          className="py-3 px-10 rounded-2xl mt-4 bg-siteBlue text-white"
        >
          Back
        </button>
        {/* <Button onClick={handleSubmit} text="Submit" bg="siteBlue" /> */}
        <button
          onClick={handleNext}
          className="py-3 px-10 rounded-2xl mt-4 bg-siteBlue text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PricePrint;
