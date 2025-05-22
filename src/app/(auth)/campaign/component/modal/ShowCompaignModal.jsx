import Input from "@/app/Components/Inputs/Input";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { formatDate, Toastify } from "@/utils/helpers";
import React, { useState } from "react";
import juice from "juice";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";

const ShowCompaignModal = ({
  open,
  close,
  campaignToEdit,
  setCampaignName,
  campaignName,
  metadata,
  loading,
  setLoading,
  emailEditorRef,
  dealerId,
  onClose,
}) => {
  const utf8ToBase64 = (str) => {
    try {
      // First encode as UTF-8
      const utf8Bytes = new TextEncoder().encode(str);
      // Convert UTF-8 bytes to Latin1 string
      let latin1String = "";
      for (let i = 0; i < utf8Bytes.length; i++) {
        latin1String += String.fromCharCode(utf8Bytes[i]);
      }
      // Now safely use btoa
      return btoa(latin1String);
    } catch (e) {
      console.error("Encoding error:", e);
      throw e;
    }
  };

  const getCampaignTypeId = (type) => {
    switch (type) {
      case "maintenance":
        return 4;
      case "vsc":
        return 2;
      case "gap":
        return 1;
      case "tire":
        return 3;
      case "guest":
        return 5;
      default:
        return 1; // Default to GAP if type is not specified
    }
  };

  const sendCampaign = async () => {
    if (!campaignName.trim()) {
      Toastify("error", "Campaign name is required");
      return;
    }
    setLoading(true);
    try {
      // Get HTML from editor with inline styles
      const htmlPromise = new Promise((resolve, reject) => {
        emailEditorRef.current?.editor?.exportHtml(
          (data) => {
            if (data.html && data.design) {
              const options = {
                removeStyleTags: true,
                preserveMediaQueries: true,
                preserveFontFaces: true,
                applyStyleTags: true,
                preserveImportant: true,
              };

              const inlinedHtml = juice(data.html, options);
              resolve({ html: inlinedHtml, design: data.design });
            } else {
              reject(new Error("Failed to get HTML from editor"));
            }
          },
          {
            inlineStyles: true,
            cleanup: true,
          }
        );
      });

      const { html, design } = await htmlPromise;

      // Convert HTML to base64 with Unicode support
      const base64Html = utf8ToBase64(html);

      // Get dates from metadata
      let startDate, endDate;
      if (metadata?.date?.start_date && metadata?.date?.end_date) {
        startDate = formatDate(metadata.date.start_date);
        endDate = formatDate(metadata.date.end_date);
      } else if (metadata?.date?.months_ahead) {
        const start = new Date();
        const end = new Date();
        end.setMonth(end.getMonth() + metadata.date.months_ahead);
        startDate = formatDate(start.toISOString());
        endDate = formatDate(end.toISOString());
      } else {
        // Default to a week from now if no dates are provided
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 7);
        startDate = formatDate(start.toISOString());
        endDate = formatDate(end.toISOString());
      }
      const params = new URLSearchParams(window.location.search);
      const userId = params.get("userid");
      let newUserId;

      if (userId) {
        newUserId = userId;
      } else {
        newUserId = "1";
      }
      // Create form data

      const formData = new FormData();
      formData.append("pcp_user_id", newUserId);
      formData.append("CampaignName", campaignName);
      formData.append("CampaignHtml", base64Html);
      formData.append("CampaignJson", JSON.stringify(design));
      formData.append(
        "CampaignType",
        getCampaignTypeId(metadata?.type).toString()
      );
      formData.append("StartDate", startDate);
      formData.append("EndDate", endDate);
      formData.append("EmailStatus", "0");
      formData.append("DealerID", dealerId || "");

      // Send campaign
      const response = await fetch(
        "https://mypcp.us/webservices/campaign/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        Toastify("success", "Campaign sent successfully!");

        onClose(); // Close the popup after successful submission
      } else {
        throw new Error(result.message || "Failed to save campaign");
      }
    } catch (error) {
      console.error("Error sending campaign:", error);
      Toastify("error", `Failed to save campaign: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateCampaign = async () => {
    if (!campaignName.trim()) {
      Toastify("error", "Campaign name is required");

      return;
    }

    setLoading(true);

    try {
      // Get HTML from editor with inline styles
      const htmlPromise = new Promise((resolve, reject) => {
        emailEditorRef.current?.editor?.exportHtml(
          (data) => {
            if (data.html && data.design) {
              const options = {
                removeStyleTags: true,
                preserveMediaQueries: true,
                preserveFontFaces: true,
                applyStyleTags: true,
                preserveImportant: true,
              };

              const inlinedHtml = juice(data.html, options);
              resolve({ html: inlinedHtml, design: data.design });
            } else {
              reject(new Error("Failed to get HTML from editor"));
            }
          },
          {
            inlineStyles: true,
            cleanup: true,
          }
        );
      });

      const { html, design } = await htmlPromise;

      // Convert HTML to base64 with Unicode support
      const base64Html = utf8ToBase64(html);

      // Create form data
      const formData = new FormData();
      formData.append("DealerID", dealerId || "");
      formData.append("CampaignName", campaignName);
      formData.append("EmailStatus", "0");
      formData.append("CampaignHtml", base64Html);
      formData.append("CampaignType", campaignToEdit?.CampaignType || "1");
      formData.append("CampaignID", campaignToEdit?.CampaignID || "");
      formData.append("CampaignJson", JSON.stringify(design));

      // Get dates from the original campaign or calculate them
      let startDate, endDate;
      if (metadata?.date?.start_date && metadata?.date?.end_date) {
        startDate = formatDate(metadata.date.start_date);
        endDate = formatDate(metadata.date.end_date);
      } else {
        // Default to the current date and a week from now
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 7);
        startDate = formatDate(start.toISOString());
        endDate = formatDate(end.toISOString());
      }

      formData.append("StartDate", startDate);
      formData.append("EndDate", endDate);

      // Update campaign
      const response = await fetch(
        "https://mypcp.us/webservices/campaign/update",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        Toastify("error", "Try again!");

        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.success === 1) {
        Toastify("Success", "Campaign updated successfully!");

        onClose(); // Close the popup after successful submission
      } else {
        Toastify("error", "Try again!");
        throw new Error(result.message || "Failed to update campaign");
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      Toastify("error", `Failed to update campaign: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SimpleModal
      open={open}
      close={close}
      title={campaignToEdit ? "Update Campaign" : "Name Your Campaign"}
      className={"w-[500px] mx-2"}
    >
      <div className="">
        <div className="py-4">
          <h4 htmlFor="campaign-name" className="mb-2 block">
            Campaign Name
          </h4>
          <Input
            id="campaign-name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Enter campaign name"
            className="w-full"
            autoFocus
          />
          {metadata?.type && (
            <div className="mt-2 text-sm text-gray-500">
              Campaign Type:{" "}
              {metadata.type.charAt(0).toUpperCase() + metadata.type.slice(1)}
            </div>
          )}
        </div>
        <div className="flex  justify-end items-center gap-4">
          <CustomButton variant="outline" onClick={close}>
            Cancel
          </CustomButton>
          <DancingLoadingButton
            loading={loading}
            onClick={campaignToEdit ? updateCampaign : sendCampaign}
            disabled={!campaignName.trim() || loading}
          >
            {campaignToEdit ? "Update Campaign" : "Create Campaign"}
          </DancingLoadingButton>
        </div>
      </div>
    </SimpleModal>
  );
};

export default ShowCompaignModal;
