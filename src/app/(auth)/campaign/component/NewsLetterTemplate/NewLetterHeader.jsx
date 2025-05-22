import { CustomButton } from "@/components/cui/button/CustomButton";
import React, { useState } from "react";
import { MdChevronLeft, MdClose } from "react-icons/md";
import EmailModal from "../modal/EmailModal";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import ShowCompaignModal from "../modal/ShowCompaignModal";

const NewLetterHeader = ({
  showEditor,
  metadata,
  onClose,
  handleBackToTemplates,
  campaignToEdit,
  setShowSendConfirmation,
  selectedTemplate,
  emailEditorRef,
  dealerId,
}) => {
  const [showTestEmailPopup, setShowTestEmailPopup] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("");
  const [testCampaignName, setTestCampaignName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCampaignNamePopup, setShowCampaignNamePopup] = useState(false);
  const [campaignName, setCampaignName] = useState(
    campaignToEdit?.CampaignName || ""
  );
  const onSave = () => {
    // Open campaign name popup instead of saving
    setShowCampaignNamePopup(true);
  };

  const handleSendTestEmail = () => {
    // Initialize test campaign name with current campaign name or template title
    setTestCampaignName(
      campaignName || selectedTemplate?.title || "Test Campaign"
    );
    // Open test email popup
    setShowTestEmailPopup(true);
  };

  return (
    <>
      <SpinnerCenterScreen loading={loading} />
      <div className="border-b border-border">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
            {showEditor && (
              <MdChevronLeft
                className="text-2xl"
                onClick={handleBackToTemplates}
              />
            )}
            <h2 className="text-xl font-semibold">
              {showEditor
                ? campaignToEdit
                  ? "Edit Campaign"
                  : "Email Editor"
                : "Campaign Templates"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {showEditor && (
              <>
                {metadata?.date && (
                  <span className="text-sm text-muted-foreground mr-2">
                    {(() => {
                      let startDate, endDate;

                      // If we have direct start_date and end_date
                      if (metadata.date.start_date && metadata.date.end_date) {
                        startDate = new Date(metadata.date.start_date);
                        endDate = new Date(metadata.date.end_date);
                      }
                      // If we have months_ahead, calculate the date range
                      else if (metadata.date.months_ahead) {
                        startDate = new Date();
                        endDate = new Date();
                        endDate.setMonth(
                          endDate.getMonth() + metadata.date.months_ahead
                        );
                      }

                      if (startDate && endDate) {
                        const formatOptions = {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        };
                        return `${startDate.toLocaleDateString(
                          undefined,
                          formatOptions
                        )} to ${endDate.toLocaleDateString(
                          undefined,
                          formatOptions
                        )}`;
                      }

                      return "";
                    })()}
                  </span>
                )}

                <CustomButton variant="outline" onClick={handleSendTestEmail}>
                  Send test email
                </CustomButton>
                <CustomButton onClick={onSave}>
                  {campaignToEdit ? "Update Campaign" : "Save Campaign"}
                </CustomButton>
                {campaignToEdit && (
                  <CustomButton
                    className="bg-blueLogo hover:bg-blueLogoLight"
                    onClick={() => setShowSendConfirmation(true)}
                  >
                    {campaignToEdit.EmailStatus === "1"
                      ? "Unfinalize Campaign"
                      : "Send Campaign"}
                  </CustomButton>
                )}
              </>
            )}
            <CustomButton variant="ghost" size="icon">
              <MdClose
                className="text-2xl hover:text-red-500 Transition"
                onClick={onClose}
              />
            </CustomButton>
          </div>
        </div>
      </div>
      <EmailModal
        open={showTestEmailPopup}
        close={() => {
          setShowTestEmailPopup(false);
        }}
        loading={loading}
        setLoading={setLoading}
        testEmailAddress={testEmailAddress}
        setTestEmailAddress={setTestEmailAddress}
        testCampaignName={testCampaignName}
        setTestCampaignName={setTestCampaignName}
        emailEditorRef={emailEditorRef}
      />
      <ShowCompaignModal
        open={showCampaignNamePopup}
        close={() => setShowCampaignNamePopup(false)}
        campaignToEdit={campaignToEdit}
        setCampaignName={setCampaignName}
        campaignName={campaignName}
        metadata={metadata}
        loading={loading}
        setLoading={setLoading}
        emailEditorRef={emailEditorRef}
        dealerId={dealerId}
        onClose={onClose}
      />
    </>
  );
};

export default NewLetterHeader;
