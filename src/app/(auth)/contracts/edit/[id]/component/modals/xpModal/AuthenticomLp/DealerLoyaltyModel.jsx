import React, { useContext, useState } from "react";

import SimpleModal from "@/components/cui/modals/SimpleModal";

import Input from "@/app/Components/Inputs/Input";

import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import TextField from "@/components/cui/textField/TextField";
import Checkbox from "@/components/cui/textField/Checkbox";

function truncateToTwoDecimals(num) {
  return Math.trunc(num * 100) / 100;
}
const DealerLoyaltyModel = ({
  open,
  close,
  loyaltyPoint,
  xpPoints,
  fetchXp,
  setLoading,
  conversionPercent,
}) => {
  const { auth, Token } = useContext(GlobalContext);
  const [convertFrom, setConvertFrom] = useState("");
  const [convertTo, setConvertTo] = useState("");
  const [pointError, setPointError] = useState(null);
  const [values, setValues] = useState({
    Ro_Number: "",
    ServiceID: "",
    ManagerApprovalCode: "",
    RedeemType: 1,
  });
  const { RedeemType } = values;

  const handleSubmit = async () => {
    let RedeemAmount = "";
    let RedeemPoint = "";
    if (RedeemType === 1) {
      RedeemAmount = Number(convertFrom ?? 0);
      RedeemPoint = truncateToTwoDecimals(
        Number(convertFrom ?? 0) / conversionPercent
      );
    } else if (RedeemType === 2) {
      RedeemPoint = Number(convertFrom ?? 0) * 50;
      RedeemAmount = Number(convertFrom ?? 0);
    }
    const data = {
      ...values,
      RedeemAmount: RedeemAmount,
      RedeemPoint: RedeemPoint,
      RedeemType,
      ContractID: xpPoints.ContractID,
      TotalAmount: Number(xpPoints.loyaltypoint_total),
      IsGuest: 0,
      MaxSaleRedemptionAmount:
        xpPoints?.loyaltydealerpoint?.MaxSaleRedemptionAmount,
      MaxServiceRedemptionAmount:
        xpPoints?.loyaltydealerpoint?.MaxServiceRedemptionAmount,
    };
    const res = await fetchPostObj({
      api: "contracts/redeemloyaltypoint",
      auth,
      data,
      Token,
      setLoading,
      showToast: true,
    });
    if (res) {
      close();
      fetchXp();
    }
  };
  const handleInputChange = (name, value) => {
    let updatedValues = { ...values, [name]: value };
    if (name === "point") {
      setConvertTo(truncateToTwoDecimals(value / conversionPercent));
      setConvertFrom(value);

      updatedValues.RedeemType = 1;
      if (
        Number(value) >
        Number(xpPoints.loyaltydealerpoint.MaxServiceRedemptionAmount)
      ) {
        setPointError(
          "Maximum value is " +
            xpPoints.loyaltydealerpoint.MaxServiceRedemptionAmount
        );
      } else {
        setPointError(null);
      }
    } else if (name === "amount") {
      setConvertFrom(value);
      setConvertTo(truncateToTwoDecimals(value * 50));
      updatedValues.RedeemType = 2;
      if (
        Number(value) * 50 >
        Number(xpPoints.loyaltydealerpoint.MaxServiceRedemptionAmount)
      ) {
        setPointError(
          "Authenticom Points Redeem Amount less than or equal to Current Amount: " +
            xpPoints.loyaltydealerpoint.MaxServiceRedemptionAmount / 50
        );
      } else {
        setPointError(null);
      }
    }
    setValues(updatedValues);
  };
  // Handle radio button change
  const handleTypeChange = (type) => {
    let updatedValues = { ...values, RedeemType: type };
    if (type === 1) {
      setConvertTo(truncateToTwoDecimals(convertFrom / conversionPercent));
    } else {
      setConvertTo(truncateToTwoDecimals(convertFrom * 50));
    }

    setValues(updatedValues);
  };

  return (
    <div>
      <SimpleModal
        open={open}
        close={close}
        className={"w-10/12 m-auto  p-6 rounded-lg mt-10"}
      >
        <form autoComplete="off">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl">Redeem Authenticom LP</h1>
            </div>
            <div className="flex gap-2">
              <div className="text-xl">
                Available{" "}
                <span className="text-siteBlue">
                  {loyaltyPoint ?? 0} ( $
                  {truncateToTwoDecimals(
                    Number(loyaltyPoint) / conversionPercent
                  )}
                  )
                </span>
              </div>
              <div
                className="font-bold w-6 h-6 p-3 -mt-4 flex items-center justify-center border rounded-full hover:text-red-500 hover:border-red-500 Transition cursor-pointer "
                onClick={close}
              >
                X
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-muted text-muted-forground border border-none border-l border-border my-6"></div>
          <form className="flex flex-col gap-4">
            <div className="w-full flex items-center rounded border overflow-hidden">
              <label className="p-2 bg-muted text-muted-forground border border-none border-l border-border whitespace-nowrap">
                Service Name
              </label>
              <div className="w-full">
                <TextField
                  wrapperClassName={"rounded-none border-none"}
                  placeholder={"Service Name"}
                  value={values?.ServiceID}
                  onChange={(e) =>
                    handleInputChange("ServiceID", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-full flex items-center rounded border overflow-hidden">
              <label className="p-2 bg-muted text-muted-forground border border-none border-l border-border whitespace-nowrap">
                Ro
              </label>
              <div className="w-full">
                <TextField
                  wrapperClassName={"rounded-none border-none"}
                  placeholder={"Ro"}
                  value={values?.Ro_Number}
                  onChange={(e) =>
                    handleInputChange("Ro_Number", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="w-full flex items-start">
              <div className="w-10/12  flex flex-col">
                <div className="flex items-center rounded border overflow-hidden ">
                  <label className={`p-2  whitespace-nowrap`}>
                    Value
                    {/* {RedeemType === 1 ? "Point" : "Amount"} */}
                  </label>
                  <div className="flex w-full items-center flex-1 relative">
                    {/* First input field (Point or Amount) */}
                    <TextField
                      wrapperClassName={"rounded-none flex-1 min-w-96 "}
                      type={"number"}
                      placeholder={"Enter value"}
                      value={convertFrom}
                      onChange={(e) => {
                        handleInputChange(
                          RedeemType === 1 ? "point" : "amount",
                          e.target.value
                        );
                      }}
                    />

                    <TextField
                      wrapperClassName={`rounded-none flex-1 min-w-96`}
                      type={"number"}
                      value={convertTo}
                      disabled // Prevent manual edit
                    />
                  </div>
                </div>
                {pointError && (
                  <span className=" text-red-500 ">{pointError}</span>
                )}
              </div>
              {/* Radio buttons for selection */}
              <div className=" flex items-center ">
                <div className={`p-2  flex gap-1`}>
                  <Checkbox
                    type="radio"
                    checked={RedeemType === 1}
                    onChange={() => handleTypeChange(1)}
                  />
                  <label>Point</label>
                </div>
                <div className={`p-2  flex gap-1`}>
                  <Checkbox
                    type="radio"
                    checked={RedeemType === 2}
                    onChange={() => handleTypeChange(2)}
                  />
                  <label>Amount</label>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center   overflow-hidden">
              <label className="p-2 bg-muted text-muted-forground border border-none border-l border-border whitespace-nowrap ">
                Manager Code
              </label>
              <div className="w-full ">
                <Input
                  className={"rounded-none border-none py-3"}
                  autoComplete="new-password"
                  name="manager_code"
                  type="password"
                  placeholder={"Manager Code"}
                  value={values?.ManagerApprovalCode}
                  onChange={(e) =>
                    handleInputChange("ManagerApprovalCode", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <CustomButton variant="main" onClick={close}>
                Close
              </CustomButton>
              <CustomButton onClick={() => handleSubmit()}>Submit</CustomButton>
            </div>
          </form>
        </form>
      </SimpleModal>
    </div>
  );
};

export default DealerLoyaltyModel;
