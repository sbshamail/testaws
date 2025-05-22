import React, { useContext, useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import Input from "@/app/Components/Inputs/Input";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import TextField from "@/components/cui/textField/TextField";
import Checkbox from "@/components/cui/textField/Checkbox";
import { useTheme } from "@/utils/theme/themeProvider";
import { Toastify } from "@/utils/helpers";

function truncateToTwoDecimals(num) {
  return Math.trunc(num * 100) / 100;
}
const RewardLoyaltyModel = ({
  open,
  close,
  xpPoints,
  fetchXp,
  setLoading,
  conversionPercent,
}) => {
  const { auth, Token } = useContext(GlobalContext);
  const { theme } = useTheme();
  const [convertFrom, setConvertFrom] = useState("");
  const [convertTo, setConvertTo] = useState("");
  const [pointError, setPointError] = useState(null);

  const [values, setValues] = useState({
    comment: "",
    ServiceID: "",
    ManagerApprovalCode: "",
    RedeemType: 1,
  });

  const { RedeemType } = values;
  const handleSubmit = async () => {
    if (pointError) return;
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
      TotalAmount: xpPoints.loyaltypoint_total,
      MaxAwardAmount: Number(xpPoints.loyaltydealerpoint.MaxAwardAmount),
      IsGuest: 0,
    };
    const res = await fetchPostObj({
      api: "contracts/redeemrewardloyaltypoint",
      auth,
      data,
      Token,
      setLoading,
      showToast: true,
      isValue: true,
    });

    if (res.success === 1) {
      Toastify("success", res.message);
      close();
      fetchXp();
    } else {
      Toastify("error", res.message ?? res.msg);
    }
  };
  const handleInputChange = (name, value) => {
    let updatedValues = { ...values, [name]: value };
    if (name === "point") {
      setConvertTo(truncateToTwoDecimals(value / conversionPercent));
      setConvertFrom(value);
      updatedValues.RedeemType = 1;
      if (Number(value) > Number(xpPoints.loyaltydealerpoint.MaxAwardAmount)) {
        setPointError(
          "Maximum value is " + xpPoints.loyaltydealerpoint.MaxAwardAmount
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
        Number(xpPoints.loyaltydealerpoint.MaxAwardAmount)
      ) {
        setPointError(
          "Maximum Point is " + xpPoints.loyaltydealerpoint.MaxAwardAmount
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
        className={`w-10/12 m-auto bg-card mt-10`}
        title={"Award Point"}
      >
        <div>
          <div className="w-full h-[1px] my-6"></div>
          <form className="flex flex-col gap-4" autoComplete="off">
            <div className="w-full flex items-center rounded border overflow-hidden">
              <label className={`p-2  whitespace-nowrap`}>Service Name</label>
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
              <div className="w-full">
                <TextField
                  rows={2}
                  textarea={true}
                  wrapperClassName={"rounded-none border-none"}
                  placeholder={"Reason"}
                  value={values?.comment}
                  className="w-full"
                  onChange={(e) => handleInputChange("comment", e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex items-start">
              <div className="w-10/12  flex flex-col">
                <div
                  className={` flex items-center rounded border ${
                    pointError ? "border-red-500" : "border-border"
                  }  overflow-hidden `}
                >
                  <label className={`p-2  whitespace-nowrap`}>Value</label>
                  <div className="flex w-full items-center flex-1">
                    {/* First input field (Point or Amount) */}
                    <TextField
                      wrapperClassName={"rounded-none flex-1 min-w-96"}
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
                    {/* Second input field (Calculated Value) */}
                    {/* <label
                    className={`p-3 ${
                      theme === "light" ? "bg-gray-200" : "bg-[#061028]"
                    } whitespace-nowrap text-xs`}
                  >
                    {RedeemType === 1 ? "Cal. Amount" : "Cal. Point"}
                  </label> */}
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
                <div
                  className={`p-2 ${
                    theme === "light" ? "bg-gray-200" : "bg-[#061028]"
                  } flex gap-1`}
                >
                  <Checkbox
                    type="radio"
                    checked={RedeemType === 1}
                    onChange={() => handleTypeChange(1)}
                  />
                  <label>Point</label>
                </div>
                <div
                  className={`p-2 ${
                    theme === "light" ? "bg-gray-200" : "bg-[#061028]"
                  } flex gap-1`}
                >
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
              <label
                className={`p-2 ${
                  theme === "light" ? "bg-gray-200" : "bg-[#061028]"
                } whitespace-nowrap`}
              >
                Manager Code
              </label>
              <div className="w-full ">
                <Input
                  className={"rounded-none border-none py-3"}
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
        </div>
      </SimpleModal>
    </div>
  );
};

export default RewardLoyaltyModel;
