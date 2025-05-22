import React, { useState } from "react";
import Input from "@/app/Components/Inputs/Input";
import { CustomButton } from "@/components/cui/button/CustomButton";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { fetchPostObj } from "@/utils/action/function";

const DeleteModal = ({
  open,
  close,
  campaign,
  setCampaign,
  fetchCampaigns,
}) => {
  const [managerCode, setManagerCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteCampaign = async () => {
    if (!campaign || !managerCode) return;
    const data = {
      deletepassword: managerCode,
      CampaignID: campaign.CampaignID,
    };
    const res = await fetchPostObj({
      api: "campaign/delete",
      data,
      setLoading,
      spinner: true,
      showToast: true,
    });
    if (res) {
      setCampaign(null);
      fetchCampaigns();
      close();
    }
  };
  return (
    <div>
      <SimpleModal
        open={open}
        close={close}
        title={"Delete Campaign"}
        className={"m-auto"}
      >
        <div>
          <p className={`bg-red-100 p-3 text-red-500 rounded`}>
            Are you sure you want to Delete?
          </p>
          <div className="mt-4">
            <Input
              type={"password"}
              placeholder={"code"}
              value={managerCode}
              onChange={(e) => setManagerCode(e.target.value)}
              label="Enter Manage Code to Delete"
            />
          </div>
          <div className="flex gap-2 justify-center mt-4 items-center">
            <CustomButton variant="danger" onClick={close}>
              Cancel
            </CustomButton>
            <DancingLoadingButton
              variant="success"
              onClick={handleDeleteCampaign}
              disabled={!managerCode}
              loading={loading}
            >
              Confirm
            </DancingLoadingButton>
          </div>
        </div>
      </SimpleModal>
    </div>
  );
};

export default DeleteModal;
