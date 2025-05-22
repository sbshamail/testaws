import React, { useState } from "react";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import TextField from "@/components/cui/textField/TextField";
import { fetchPostObj } from "@/utils/action/function";

const RevokeServiceRedeem = ({
  open,
  close,
  auth,
  Token,
  ContractID,
  row,
  setOffSetData,
}) => {
  const [Reason, setReason] = useState("");
  let ActivityPaused = row?.ActivityPaused;
  const fetchRevokeService = async () => {
    if (row?.RevokeServiceRedeem == 0) {
      ActivityPaused = 1;
    } else if (row?.RevokeServiceRedeem == 1) {
      ActivityPaused = 2;
    } else if (row?.Status == "A") {
      ActivityPaused = 3;
    } else if (row?.ActivityPaused == 0) {
      ActivityPaused = 4;
    } else if (row?.ActivityPaused == 1) {
      ActivityPaused = 5;
    }

    const data = { ContractID, Reason, ActivityPaused };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "contracts/revokeserviceredeem",
      data,
      showToast: true,
    });
    setOffSetData((prev) => (prev ? prev : "0"));
    close();
  };
  return (
    <SimpleModal close={close} open={open} title={"Activity Pause"}>
      <div className="flex flex-col gap-4">
        <p className="bg-red-300 p-2 rounded">
          Are you sure you want to Pause selected Contracts?
        </p>
        <div>
          <TextField
            value={Reason}
            onChange={(e) => setReason(e.target.value)}
            textarea={true}
            label={"Enter Reason for pause Contract"}
          />
        </div>
        <div className="flex gap-2 items-center justify-center ">
          <CustomButton onClick={fetchRevokeService}>Confirm</CustomButton>
          <CustomButton variant="danger" onClick={close}>
            Cancel
          </CustomButton>
        </div>
      </div>
    </SimpleModal>
  );
};

export default RevokeServiceRedeem;
