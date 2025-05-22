import Input from "@/app/Components/Inputs/Input";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { fetchPostObj } from "@/utils/action/function";
import React, { useState } from "react";
import { MdWarningAmber } from "react-icons/md";

const DelLoyaltyPointModal = ({
  open,
  close,
  auth,
  Token,
  xpPoints,
  id,
  fetchXp,
  setLoading,
}) => {
  const [PendingSetupCode, setPendingSetupCode] = useState("");
  const handleDelete = async () => {
    const data = { PendingSetupCode, ContractID: xpPoints.ContractID, id };
    const res = await fetchPostObj({
      api: "contracts/deleteloyaltypoints",
      auth,
      Token,
      data,
      setLoading,
      showToast: true,
    });
    if (res) {
      close();
      fetchXp();
    }
  };
  return (
    <SimpleModal
      open={open}
      close={close}
      className={"w-10/12 m-auto  p-6 rounded-lg mt-10"}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <MdWarningAmber className="text-xl" />
            <h1 className="text-2xl ">Delete Authenticom LP</h1>
          </div>
          <div
            className="font-bold w-6  h-6 p-3 flex items-center justify-center border rounded-full hover:text-red-500 hover:border-red-500 Transition cursor-pointer "
            onClick={close}
          >
            X
          </div>
        </div>
        <p className={`bg-red-100 p-3 text-red-500 rounded`}>
          Are you sure you want to deleted this point?
        </p>
        <div className="mt-4">
          <Input
            type={"password"}
            placeholder={"code"}
            value={PendingSetupCode}
            onChange={(e) => setPendingSetupCode(e.target.value)}
            label="Enter Manage Code to Delete"
          />
        </div>
        <div className="flex gap-2 justify-center mt-4 items-center">
          <CustomButton variant="danger" onClick={close}>
            Cancel
          </CustomButton>
          <CustomButton variant="success" onClick={handleDelete}>
            Confirm
          </CustomButton>
        </div>
      </div>
    </SimpleModal>
  );
};

export default DelLoyaltyPointModal;
