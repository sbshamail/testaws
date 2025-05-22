import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import React from "react";

const ConfirmationModal = ({
  open,
  close,
  campaignToEdit,
  campaignName,
  setShowSendConfirmation,
  handleActivateCampaign,
  isSendingStatus,
}) => {
  return (
    <SimpleModal
      open={open}
      close={close}
      title={
        campaignToEdit?.EmailStatus === "1"
          ? "Unfinalize Campaign"
          : "Activate Campaign"
      }
      className={"w-[500px] mx-2"}
    >
      <div>
        <div className="py-4">
          <p>
            {campaignToEdit?.EmailStatus === "1"
              ? `Are you sure to unfinalize campaign "${campaignName}"?`
              : `Are you sure to make this campaign "${campaignName}" active?`}
          </p>
        </div>
        <div className="flex justify-end items-center">
          <CustomButton
            variant="outline"
            onClick={() => setShowSendConfirmation(false)}
          >
            No
          </CustomButton>
          <CustomButton
            onClick={handleActivateCampaign}
            disabled={isSendingStatus}
          >
            {isSendingStatus ? (
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>
                  {campaignToEdit?.EmailStatus === "1"
                    ? "Unfinalizing..."
                    : "Activating..."}
                </span>
              </div>
            ) : (
              "Yes"
            )}
          </CustomButton>
        </div>
      </div>
    </SimpleModal>
  );
};

export default ConfirmationModal;
