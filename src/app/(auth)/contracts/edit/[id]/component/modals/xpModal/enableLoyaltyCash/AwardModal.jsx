import React, { useContext, useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";

import Input from "@/app/Components/Inputs/Input";

import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import Select from "@/app/Components/Inputs/Select";
const AwardModal = ({ open, close, loyaltyReward, ServiceIDList, fetchXp }) => {
  const { auth, Token } = useContext(GlobalContext);
  const [values, setValues] = useState({
    comment: "",
    RedeemAmount: null,
    RewardName: "",
  });
  const handleInputChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async () => {
    const data = {
      ...values,
      ContractID: loyaltyReward?.ContractID,
      TotalAmount: Number(loyaltyReward?.loyaltycash_total),
      MaxSaleRedemptionAmount: loyaltyReward?.loyalty?.MaxSaleRedemptionAmount,
      MaxServiceRedemptionAmount:
        loyaltyReward?.loyalty?.MaxServiceRedemptionAmount,
      MaxPartsRedemptionAmount:
        loyaltyReward?.loyalty?.MaxPartsRedemptionAmount,
    };
    const res = await fetchPostObj({
      api: "contracts/redeemrewardloyaltycash",
      auth,
      data,
      Token,
      showToast: true,
    });
    if (res) {
      fetchXp();
      close();
    }
  };
  return (
    <div>
      <SimpleModal
        open={open}
        close={close}
        className={"w-10/12 m-auto  p-6 rounded-lg mt-10"}
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl">Award Cash</h1>
            </div>
            <div className="flex gap-2">
              <div
                className="font-bold w-6 h-6 p-3 -mt-4 flex items-center justify-center border rounded-full hover:text-red-500 hover:border-red-500 Transition cursor-pointer "
                onClick={close}
              >
                X
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200 my-6"></div>
          <form className="flex flex-col gap-4">
            <Select
              label={"Service Name"}
              options={ServiceIDList}
              value={values.RewardName}
              setvalue={(value) => handleInputChange("RewardName", value)}
            />
            <Input
              placeholder={"Reason"}
              label={"Reason"}
              value={values?.comment}
              setvalue={(value) => handleInputChange("comment", value)}
            />
            <Input
              type={"number"}
              placeholder={"Amount of loyalty cash to award $"}
              label={"Amount"}
              value={values?.RedeemAmount}
              setvalue={(value) => handleInputChange("RedeemAmount", value)}
            />
            <div className="flex justify-center gap-2">
              <CustomButton className={""} variant="main" onClick={close}>
                Close
              </CustomButton>
              <CustomButton type="button" onClick={handleSubmit}>
                Submit
              </CustomButton>
            </div>
          </form>
        </div>
      </SimpleModal>
    </div>
  );
};

export default AwardModal;
