import React, { useState, useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "@/app/Provider";
import { CreateContractContext } from "../page";
import Input from "@/app/Components/Inputs/Input";
import Select from "@/app/Components/Inputs/Select";
import AddBankmodal from "../../../../../components/forms/contract/AddBankmodal";

import { handleFieldValue } from "@/components/forms/functions";
import { initialState, validateForm } from "./fn";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { serviceContractCondition } from "@/components/forms/contract/commonfn";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import CreateAddAddressmodal from "../CreateAddAddressmodal";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";

const CreatePricePrint = ({
  createNewContract,
  priceInfoForm,
  setPriceInfoForm,
  contractCreate,
  fetchCustomerInfo,
  setLoading,
  loading,
}) => {
  const [key, setkey] = useState(false);

  const [sellingpriceOverride, setSellingpriceOverride] = useState(false);
  const [banksList, setBanksList] = useState([]);
  //state to open bank modal
  const [addbankmodal, setaddbankmodal] = useState(false);
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    setbanks,
    banks,
    contractbank,
    setcontractbank,
    setcontractbankaddress,
    // setOneTimeRONumber,
    // oneTimeRONumber,
    planCost,
    planID,
    dealerID,
    autoFillData,
  } = useContext(CreateContractContext);

  const [formErrors, setFormErrors] = useState({});
  const [bankAddress, setBankAddress] = useState("");
  const [addaddressmodal, setaddaddressmodal] = useState(false);
  const bankslist = banks?.map((bank, i) => {
    return { text: bank?.BankName, value: bank.BankID };
  });
  const hasRendered = useRef(false); // Track the first render

  useEffect(() => {
    setPriceInfoForm((prevForm) => ({
      ...initialState,
      ...prevForm,
    }));
  }, []);

  const fetchBankAddress = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append(
      "BankID",
      priceInfoForm?.contractbank instanceof Set
        ? [...priceInfoForm?.contractbank][0]
        : priceInfoForm?.contractbank
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
  }, [priceInfoForm?.contractbank]);

  const matchingPlan = contractCreate?.Plans?.find(
    (contract) => planID?.toString() == contract?.PlanID
  );

  // console.log("contractCreate", matchingPlan?.CustomerPriceAdjustment);

  useEffect(() => {
    setBanksList(contractCreate?.Banks);
    setbanks(contractCreate?.Banks);
    setSellingpriceOverride(
      contractCreate?.dealersetting?.SellingpriceOverride
    );
  }, [contractCreate]);
  useEffect(() => {
    const bank = banks?.find((bank) => contractbank === bank.BankID);
    if (bank) {
      setcontractbankaddress(bank.CityName);
    }
    setkey((prevKey) => !prevKey);
  }, [contractbank, banks, setcontractbankaddress, setkey]);

  const currentPrice = parseInt(planCost?.PlanCostAndExpiry?.PlanCost) || 0;

  const minLimit =
    matchingPlan?.CustomerPriceAdjustment === "+" ? currentPrice : undefined;

  const maxLimit =
    matchingPlan?.CustomerPriceAdjustment === "-"
      ? Math.max(currentPrice - matchingPlan?.OverriteAmount, 0)
      : undefined;

  const handleInputChange = (field, value) => {
    handleFieldValue(field, value, setPriceInfoForm, setFormErrors);
  };

  const handleSubmit = () => {
    const errors = validateForm(priceInfoForm);
    if (Object.keys(errors).length > 0 || !errors) {
      setFormErrors(errors);
      toast.error("Please fix the errors in the form.");
      return;
    } else {
      // console.log("Form Data:", priceInfoForm);
      createNewContract(priceInfoForm);
      // Proceed with form submission or save the data
    }
  };

  const matchedDealer = contractCreate?.dealers?.find(
    (dealer) =>
      dealer.SellingpriceOverride === "1" && dealer.DealerID === dealerID
  );

  const bankOptions = banksList
    ? banksList.map((bank) => ({
        text: bank?.BankName,
        value: bank.BankID,
      }))
    : [];
  useEffect(() => {
    setcontractbank(
      priceInfoForm.contractbank instanceof Set
        ? [...priceInfoForm.contractbank][0]
        : priceInfoForm.contractbank
    );
  }, [contractbank, priceInfoForm.contractbank]);

  const BankModal = () => (
    <AddBankmodal
      open={addbankmodal}
      close={() => setaddbankmodal(false)}
      setBanksList={setBanksList}
      DealerID={dealerID}
      setbanks={setbanks}
      setcontractbank={setcontractbank}
      fn={(result) => {
        result && fetchCustomerInfo();
      }}
    />
  );
  return (
    <>
      <div className="">
        {addbankmodal && <BankModal />}
        {addaddressmodal && (
          <CreateAddAddressmodal
            open={addaddressmodal}
            close={() => setaddaddressmodal(false)}
          />
        )}
        <ShadowContainer>
          <div className="w-full grid grid-cols-12 gap-6">
            <div className="xl:col-span-12 col-span-6 flex flex-col space-y-4 px-6 py-6">
              <h2 className="text-2xl font-bold text-left mb-4 ">
                Contract Price Info
              </h2>

              <div className="w-full flex space-x-2 ">
                <Select
                  onlyLabel="Bank List"
                  options={bankOptions}
                  value={priceInfoForm.contractbank}
                  setvalue={(value) => handleInputChange("contractbank", value)}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-1">
                <Input
                  type="number"
                  label="Price On Printed Contract"
                  value={priceInfoForm.contractcost}
                  setvalue={(value) => handleInputChange("contractcost", value)}
                  placeholder="Price On Printed Contract"
                  min={minLimit}
                  max={maxLimit}
                  defaultValue1={planCost?.PlanCostAndExpiry?.PlanCost}
                  error={formErrors.contractcost}
                  // editable={
                  //   matchedDealer?.SellingpriceOverride === "1" ? false : true
                  // }
                  prefix={"$"}
                  width={"full"}
                />
                <Input
                  type="number"
                  label="Customer Price"
                  value={priceInfoForm.customerprice}
                  setvalue={(value) =>
                    handleInputChange("customerprice", value)
                  }
                  placeholder="Customer Price"
                  min={minLimit}
                  max={maxLimit}
                  error={formErrors.customerprice}
                  defaultValue1={planCost?.PlanCostAndExpiry?.customerprice}
                  disable={true}
                  prefix={"$"}
                  width={"full"}
                />
                <Input
                  type="number"
                  label="Plan Price"
                  value={priceInfoForm.planprice}
                  setvalue={(value) => handleInputChange("planprice", value)}
                  placeholder="Plan Price"
                  min={minLimit}
                  max={maxLimit}
                  defaultValue1={planCost?.PlanCostAndExpiry?.PlanCost}
                  error={formErrors.planprice}
                  disable={true}
                  prefix={"$"}
                  width={"full"}
                />
                <Input
                  label="Comp Price"
                  value={priceInfoForm.compPrice}
                  setvalue={(value) => handleInputChange("compPrice", value)}
                  placeholder="Comp Price"
                  type="text"
                  defaultValue1={planCost?.PlanCostAndExpiry?.OverritePrice}
                  error={formErrors.compPrice}
                  disable={true}
                  prefix={"$"}
                  width={"full"}
                />

                {priceInfoForm.contractbankaddress && (
                  <Input
                    key={key}
                    disable
                    label="Address"
                    value={priceInfoForm.contractbankaddress}
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

              {serviceContractCondition(handleInputChange, priceInfoForm)}
              {/* <div className="flex flex-row gap-4 my-4">
            <CheckboxWithText
              label="Service Contract"
              checked={priceInfoForm.servicecontract}
              setchecked={(checked) =>
                handleInputChange("servicecontract", checked)
              }
              bg="bg-gray-100"
              width={"full"}
              text="Service Contract"
            />
            <CheckboxWithText
              label="Loyalty Points Vehicle Sale Bonus"
              checked={priceInfoForm.lpvsb}
              setchecked={(checked) => handleInputChange("lpvsb", checked)}
              text="Limited Pay Value Service Benefit"
              width={"full"}
              bg="bg-gray-100"
            />
          </div> */}
            </div>
            {/* <div className="xl:col-span-3 col-span-6 border ">
            <PrintContractEmail />
          </div> */}
          </div>
        </ShadowContainer>
        <div className="w-full flex flex-row justify-end gap-5 mt-4">
          <DancingLoadingButton loading={loading} onClick={handleSubmit}>
            Submit
          </DancingLoadingButton>
        </div>
      </div>
    </>
  );
};

export default CreatePricePrint;
