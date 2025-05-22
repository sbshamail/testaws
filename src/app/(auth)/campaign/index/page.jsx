"use client";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelection } from "@/reduxStore/function";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { GlobalContext } from "@/app/Provider";

import NewsLetterTemplateModal from "../component/modal/NewsLetterTemplateModal";
import CompaignHeader from "../component/CompaignHeader";
import ShowList from "../component/ShowList";
import { fetchPostObj } from "@/utils/action/function";
const Page = () => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE, auth, Token } =
    useContext(GlobalContext);

  const { DefaultDealerID } = GLOBAL_RESPONSE || {};
  const [showEditCampaign, setShowEditCampaign] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState(null);
  const [DealerID, setDealerID] = useState(DefaultDealerID);

  const reducer = setReducer("campaign");
  const dispatch = useDispatch();
  const campaign = useSelection("campaign");

  const { TotalRec, campaigns } = campaign || {};
  const fetchCampaigns = async () => {
    const res = await fetchPostObj({
      api: "campaign/index",
      data: { DealerID },
      auth,
      spinner: true,
      Token,
    });
    if (res) {
      dispatch(reducer(res));
    }
  };
  useEffect(() => {
    const fetching = async () => {
      await fetchCampaigns();
    };
    fetching();
  }, [DealerID]);

  const handleEditCampaign = async (campaign) => {
    const { CampaignID, CampaignName } = campaign || {};
    const res = await fetchPostObj({
      data: { CampaignID },
      auth,
      Token,
      api: "campaign/edit",
    });

    if (res) {
      // Add the campaign name to the edit data since it's not included in the API response
      setCampaignToEdit({
        ...res.campaigninfo,
        CampaignName: CampaignName,
      });
      setShowEditCampaign(true);
    }
  };

  return (
    <>
      <div className="mx-4 mt-6 flex flex-col gap-6">
        <CompaignHeader
          setShowEditCampaign={setShowEditCampaign}
          DealerID={DealerID}
          setDealerID={setDealerID}
          dealerList={GLOBAL_DEALERS_INFO}
        />
        <ShowList
          campaigns={campaigns}
          TotalRec={TotalRec}
          handleEditCampaign={handleEditCampaign}
          fetchCampaigns={fetchCampaigns}
          DealerID={DealerID}
        />
      </div>
      {/* modals */}
      {showEditCampaign && (
        <div className="overflow-hidden">
          <NewsLetterTemplateModal
            isOpen={showEditCampaign}
            onClose={() => {
              setShowEditCampaign(false);
              setCampaignToEdit(null);
              fetchCampaigns(); // Refresh list after editing
            }}
            dealerId={DealerID}
            campaignToEdit={campaignToEdit}
          />
        </div>
      )}
    </>
  );
};

export default Page;
