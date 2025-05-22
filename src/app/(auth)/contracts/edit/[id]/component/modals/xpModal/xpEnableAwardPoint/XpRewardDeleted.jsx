import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import TextField from "@/components/cui/textField/TextField";
import React, { useState } from "react";
import { MdWarningAmber } from "react-icons/md";
import { fetchPostObj } from "@/utils/action/function";

const XpRewardDeleted = ({
  open,
  close,
  auth,
  Token,
  ContractID,
  ContractServiceID,
  setRewardList,
  setXpPoints,
  deleteXpCount,
  api,
}) => {
  const [reason, setReason] = useState("");
  const handleDeleteXp = async () => {
    const data = {
      ContractID,
      ContractServiceID: Number(ContractServiceID),
      DeletionReason: reason,
    };
    const res = await fetchPostObj({
      api: api,
      auth,
      Token,
      showToast: true,
      toastMsg: "delete successfully",
      data,
    });
    if (res) {
      console.log(res);

      setRewardList(res?.rewardlist);

      setXpPoints((prev) => ({
        ...prev,
        servicelistredeem: res.servicelistredeem,
        xp_count: Number(prev.xp_count) - Number(deleteXpCount),
      }));

      close();
    }
  };
  return (
    <SimpleModal
      open={open}
      close={close}
      className={"w-10/12 m-auto bg-white p-6 rounded-lg mt-10"}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <MdWarningAmber className="text-xl" />
            <h1 className="text-2xl ">XP Reward Deletion</h1>
          </div>
          <div
            className="font-bold w-6  h-6 p-3 flex items-center justify-center border rounded-full hover:text-red-500 hover:border-red-500 Transition cursor-pointer "
            onClick={close}
          >
            X
          </div>
        </div>
        <p className={`bg-red-100 p-3 text-red-500 rounded`}>
          Are you sure you want to Delete selected Xp Reward?
        </p>
        <div className="mt-4">
          <TextField
            textarea={true}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            label="Enter reason for deleting XP Reward(s)"
            className={`${
              reason.length < 20 ? "border-red-500" : "border-none"
            }`}
          />
          {reason.length < 20 && (
            <span className="text-red-500 font-medium">
              * Reason for deleting XP Rewards(s). Minimum 20 character
            </span>
          )}
        </div>
        <div className="flex gap-2 justify-center mt-4 items-center">
          <CustomButton variant="danger" onClick={close}>
            Cancel
          </CustomButton>
          <CustomButton variant="success" onClick={handleDeleteXp}>
            Confirm
          </CustomButton>
        </div>
      </div>
    </SimpleModal>
  );
};

export default XpRewardDeleted;
