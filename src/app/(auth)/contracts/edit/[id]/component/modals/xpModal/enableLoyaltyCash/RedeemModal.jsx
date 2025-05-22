import React, { useContext, useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";
import Image from "next/image";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
const RedeemModal = ({
  open,
  close,
  loyaltyReward,
  ServiceIDList,
  fetchXp,
}) => {
  const { loyaltycash_total, ContractID } = loyaltyReward;
  const { auth, Token } = useContext(GlobalContext);
  const [values, setValues] = useState({
    Ro_Number: "",
    ServiceID: 1,
    RedeemAmount: null,
  });

  const handleSubmit = async () => {
    const data = {
      ...values,
      TotalAmount: Number(loyaltyReward?.loyaltycash_total),
      MaxSaleRedemptionAmount: loyaltyReward?.loyalty?.MaxSaleRedemptionAmount,
      MaxServiceRedemptionAmount:
        loyaltyReward?.loyalty?.MaxServiceRedemptionAmount,
      MaxPartsRedemptionAmount:
        loyaltyReward?.loyalty?.MaxPartsRedemptionAmount,
      ContractID,
    };
    const res = await fetchPostObj({
      api: "contracts/redeemloyaltycash",
      auth,
      data: values,
      Token,
      showToast: true,
    });
    if (res) {
      fetchXp();
      close();
    }
  };
  const handleInputChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <div className="">
      <SimpleModal
        open={open}
        close={close}
        className={"w-10/12 m-auto  p-6 rounded-lg mt-10"}
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Image src="/images/loyaltycash.png" width={30} height={30} />
              <h1 className="text-2xl">Redemption Loyalty Cash</h1>
            </div>
            <div className="flex gap-2">
              <div className="text-xl">
                Available{" "}
                <span className="text-siteBlue">
                  {Number(loyaltycash_total ?? 0)}
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
          <div className="w-full h-[1px] bg-gray-200 my-6"></div>
          <form className="flex flex-col gap-4">
            <Select
              label={"Which transaction type is the redemption for"}
              options={ServiceIDList}
              value={values.ServiceID}
              setvalue={(value) => handleInputChange("ServiceID", value)}
            />
            <Input
              placeholder={"Ro"}
              value={values?.Ro_Number}
              setvalue={(value) => handleInputChange("Ro_Number", value)}
            />
            <Input
              type={"number"}
              placeholder={"Amount of loyalty cash to redeem $"}
              value={values?.RedeemAmount}
              setvalue={(value) => handleInputChange("RedeemAmount", value)}
            />
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

export default RedeemModal;
