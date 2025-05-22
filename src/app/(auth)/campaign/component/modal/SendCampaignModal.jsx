import React, { useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { CustomButton } from "@/components/cui/button/CustomButton";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { fetchPostObj } from "@/utils/action/function";
import { Toastify } from "@/utils/helpers";
const SendCampaignModal = ({
  open,
  close,
  campaign,
  fetchCampaigns,
  setCampaign,
}) => {
  const handleSendCampaign = async () => {
    if (!campaign) return;
    const data = {
      EmailStatus: campaign.EmailStatus.toLowerCase() === "pending" ? "0" : "1",
      CampaignID: campaign.CampaignID,
    };
    const res = await fetchPostObj({
      api: "campaign/emailstatus",
      data,
      setLoading,
      spinner: true,
      showToast: true,
    });
    if (res) {
      Toastify(
        "success",
        campaign.EmailStatus.toLowerCase() === "pending"
          ? "Campaign unfinalized successfully!"
          : "Campaign activated successfully!"
      );
      fetchCampaigns();
      setCampaign(null);
      close();
    }
  };
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <SimpleModal
        open={open}
        close={close}
        title={
          campaign?.EmailStatus?.toLowerCase() === "pending"
            ? "Unfinalize Campaign"
            : "Send Campaign"
        }
        className={"m-auto"}
      >
        <div>
          <p>
            {campaign?.EmailStatus?.toLowerCase() === "pending"
              ? `Are you sure to unfinalize campaign "${campaign?.CampaignName}"?`
              : `Are you sure to make this campaign "${campaign?.CampaignName}" active?`}
          </p>

          <div className="flex gap-2 justify-center mt-4 items-center">
            <CustomButton variant="outline" onClick={close}>
              Cancel
            </CustomButton>
            <DancingLoadingButton
              variant="success"
              onClick={handleSendCampaign}
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

export default SendCampaignModal;
