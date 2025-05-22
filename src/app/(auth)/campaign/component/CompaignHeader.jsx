import React from "react";
import Select from "@/app/Components/Inputs/Select";

import { MdAdd, MdMail } from "react-icons/md";
import { CustomButton } from "@/components/cui/button/CustomButton";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

const CompaignHeader = ({
  DealerID,
  setDealerID,
  setShowEditCampaign,
  dealerList,
}) => {
  return (
    <ShadowContainer>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="w-full min-w-52 flex-1 max-w-96 items-center gap-2">
          <Select
            options={dealerList}
            placeholder="Select Dealer"
            value={DealerID}
            setvalue={setDealerID}
            keyTitle="DealerTitle"
            keyValue="DealerID"
          />
        </div>
        <CustomButton
          Icon={() => <MdAdd className="text-lg font-bold" />}
          onClick={() => setShowEditCampaign(true)}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-[2px]">
            Campaign
            <MdMail />
          </div>
        </CustomButton>
      </div>
    </ShadowContainer>
  );
};

export default CompaignHeader;
