// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical, Megaphone, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/shadButton";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { NewsletterTemplatePopup } from "./NewsletterTemplatePopup";
import { AnimatePresence, motion } from "framer-motion";

interface Campaign {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
  type: string;
  dealerTitle: string;
}

interface CampaignToEdit {
  CampaignJson: string;
  CampaignID: string;
  CampaignType: string;
  CampaignStatus: string;
  EmailStatus: string;
  CampaignName?: string;
}

interface CampaignManagementProps {
  isOpen: boolean;
  onClose: () => void;
  dealerId?: string;
}

const CampaignManagement = ({
  isOpen,
  onClose,
  dealerId,
}: CampaignManagementProps) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(
    null
  );
  const [managerCode, setManagerCode] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditCampaign, setShowEditCampaign] = useState(false);
  const [campaignToEdit, setCampaignToEdit] = useState<CampaignToEdit | null>(
    null
  );
  const [isLoadingCampaignEdit, setIsLoadingCampaignEdit] = useState(false);
  const { toast } = useToast();
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [campaignToSend, setCampaignToSend] = useState<Campaign | null>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isOpen && dealerId) {
      fetchCampaigns();
    }
  }, [isOpen, dealerId]);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      // Get user ID from URL query parameters, default to 1 if not found
      const params = new URLSearchParams(window.location.search);
      const userId = params.get("userid") || "1";

      const formData = new FormData();
      formData.append("DealerID", dealerId || "");
      formData.append("pcp_user_id", userId);

      const response = await fetch(
        "https://mypcp.us/webservices/campaign/index",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      // Transform the data to match our Campaign interface
      const transformedData =
        data.campaigns?.map((campaign) => ({
          id: campaign.CampaignID,
          title: campaign.CampaignName,
          startDate: campaign.StartDate,
          endDate: campaign.EndDate,
          status: campaign.CampaignStatus,
          emailStatus: campaign.EmailStatus,
          type: campaign.CampaignType,
          dealerTitle: campaign.DealerTitle,
        })) || [];

      setCampaigns(transformedData);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toast({
        title: "Error",
        description: "Failed to load campaigns. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCampaign = async (campaign: Campaign) => {
    setIsLoadingCampaignEdit(true);

    try {
      const formData = new FormData();
      formData.append("CampaignID", campaign.id);

      const response = await fetch(
        "https://mypcp.us/webservices/campaign/edit",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      if (data.success === 1 && data.campaigninfo) {
        // Add the campaign name to the edit data since it's not included in the API response
        setCampaignToEdit({
          ...data.campaigninfo,
          CampaignName: campaign.title,
        });

        // Close the campaign management dialog only after data is received
        onClose();

        // Show the editor dialog after a small delay to ensure smooth transition
        setTimeout(() => {
          setShowEditCampaign(true);
          setIsLoadingCampaignEdit(false);
        }, 100);
      } else {
        setIsLoadingCampaignEdit(false);
        toast({
          title: "Error",
          description: data.message || "Failed to load campaign for editing",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsLoadingCampaignEdit(false);
      console.error("Error loading campaign for edit:", error);
      toast({
        title: "Error",
        description:
          "Failed to load campaign for editing. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCampaign = async () => {
    if (!campaignToDelete || !managerCode) return;

    setIsDeleting(true);

    try {
      const formData = new FormData();
      formData.append("deletepassword", managerCode);
      formData.append("CampaignID", campaignToDelete.id);

      const response = await fetch(
        "https://mypcp.us/webservices/campaign/delete",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "success" || result.success === 1) {
        toast({
          title: "Success",
          description: "Campaign deleted successfully",
        });

        // Refresh campaigns list
        fetchCampaigns();

        // Close dialog and reset state
        handleCloseDeleteDialog();
      } else {
        toast({
          title: "Error",
          description:
            result.message ||
            "Failed to delete campaign. Please check your manager code.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast({
        title: "Error",
        description: "Failed to delete campaign. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenDeleteDialog = (campaign: Campaign) => {
    setCampaignToDelete(campaign);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setCampaignToDelete(null);
    setManagerCode("");
  };

  const formatCampaignType = (typeCode) => {
    switch (typeCode) {
      case "MAINT":
        return "Maintenance";
      case "GAP":
        return "GAP";
      case "TIRE":
        return "Tire & Wheel";
      case "VSC":
        return "VSC";
      case "GPS":
        return "GPS";
      case "GUEST":
        return "GUEST";
      case "UNUSED":
        return "Unused Services";
      case "LOYALTY":
        return "Loyalty";
      default:
        return typeCode;
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "sent")
      return campaign.emailStatus.toLowerCase() === "sent";
    if (activeFilter === "pending")
      return campaign.emailStatus.toLowerCase() === "pending";
    if (activeFilter === "unfinalized")
      return campaign.emailStatus.toLowerCase() === "unfinalized";
    return true;
  });

  const handleSendCampaign = async () => {
    if (!campaignToSend) return;
    setIsSending(true);

    try {
      const formData = new FormData();
      formData.append(
        "EmailStatus",
        campaignToSend.emailStatus.toLowerCase() === "pending" ? "0" : "1"
      );
      formData.append("CampaignID", campaignToSend.id);

      const response = await fetch(
        "https://mypcp.us/webservices/campaign/emailstatus",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.success === 1) {
        toast({
          title: "Success",
          description:
            campaignToSend.emailStatus.toLowerCase() === "pending"
              ? "Campaign unfinalized successfully!"
              : "Campaign activated successfully!",
        });
        setShowSendConfirmation(false);
        fetchCampaigns(); // Refresh the campaign list
      } else {
        throw new Error(result.message || "Failed to update campaign status");
      }
    } catch (error) {
      console.error("Error updating campaign status:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: `Failed to update campaign status: ${error.message}`,
      });
    } finally {
      setIsSending(false);
      setCampaignToSend(null);
    }
  };

  const CampaignCard = ({ campaign }) => {
    // Format dates for display
    const formatDisplayDate = (dateString) => {
      if (!dateString) return "N/A";

      try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      } catch (e) {
        return dateString;
      }
    };

    return (
      <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{campaign.title}</h3>
              <p className="text-sm text-gray-500">
                {campaign.dealerTitle} · {formatDisplayDate(campaign.startDate)}{" "}
                to {formatDisplayDate(campaign.endDate)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-sm text-gray-500">Campaign Type</p>
              <p className="font-medium">{formatCampaignType(campaign.type)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  campaign.emailStatus.toLowerCase() === "sent"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {campaign.emailStatus}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEditCampaign(campaign);
                  }}
                  disabled={isLoadingCampaignEdit}
                  className="cursor-pointer"
                >
                  {isLoadingCampaignEdit ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Edit Campaign"
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCampaignToSend(campaign);
                    setShowSendConfirmation(true);
                  }}
                  disabled={campaign.emailStatus === "1"}
                  className="cursor-pointer"
                >
                  {campaign.emailStatus.toLowerCase() === "pending"
                    ? "Unfinalize Campaign"
                    : "Send Campaign"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenDeleteDialog(campaign);
                  }}
                  className="cursor-pointer text-red-600"
                >
                  Delete Campaign
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-6 pt-8">
          <DialogTitle className="sr-only">Campaign List</DialogTitle>
          <DialogDescription className="sr-only">
            List of campaigns with filtering options for all, pending, and sent
            campaigns.
          </DialogDescription>

          <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <DialogHeader className="flex flex-row items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {filteredCampaigns.length}{" "}
                {activeFilter === "all" ? "" : activeFilter} Campaigns
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={activeFilter === "all" ? "default" : "secondary"}
                onClick={() => setActiveFilter("all")}
                className={
                  activeFilter === "all"
                    ? "bg-blue-400 text-white hover:bg-blue-500"
                    : ""
                }
              >
                All Campaigns
              </Button>
              <Button
                variant={activeFilter === "pending" ? "default" : "secondary"}
                onClick={() => setActiveFilter("pending")}
                className={
                  activeFilter === "pending"
                    ? "bg-blue-400 text-white hover:bg-blue-500"
                    : ""
                }
              >
                Pending
              </Button>
              <Button
                variant={
                  activeFilter === "unfinalized" ? "default" : "secondary"
                }
                onClick={() => setActiveFilter("unfinalized")}
                className={
                  activeFilter === "unfinalized"
                    ? "bg-blue-400 text-white hover:bg-blue-500"
                    : ""
                }
              >
                Unfinalized
              </Button>
              <Button
                variant={activeFilter === "sent" ? "default" : "secondary"}
                onClick={() => setActiveFilter("sent")}
                className={
                  activeFilter === "sent"
                    ? "bg-blue-400 text-white hover:bg-blue-500"
                    : ""
                }
              >
                Sent
              </Button>
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
              </div>
            ) : filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No campaigns found
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={handleCloseDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Campaign</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              Please enter manager code to delete campaign:{" "}
              <strong>{campaignToDelete?.title}</strong>
            </p>
            <Input
              type="password"
              placeholder="Enter manager code"
              value={managerCode}
              onChange={(e) => setManagerCode(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteCampaign}
              disabled={!managerCode || isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Deleting...
                </>
              ) : (
                "Delete Campaign"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Newsletter Template Popup for Editing */}
      <AnimatePresence>
        {showEditCampaign && campaignToEdit && (
          <NewsletterTemplatePopup
            isOpen={showEditCampaign}
            onClose={() => {
              setShowEditCampaign(false);
              setCampaignToEdit(null);
              fetchCampaigns(); // Refresh list after editing
            }}
            dealerId={dealerId}
            campaignToEdit={campaignToEdit}
          />
        )}
      </AnimatePresence>

      {/* Add the Send Campaign confirmation dialog near other dialogs */}
      <Dialog
        open={showSendConfirmation}
        onOpenChange={(open) => {
          if (!open) {
            setShowSendConfirmation(false);
            setCampaignToSend(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {campaignToSend?.emailStatus.toLowerCase() === "pending"
                ? "Unfinalize Campaign"
                : "Send Campaign"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              {campaignToSend?.emailStatus.toLowerCase() === "pending"
                ? `Are you sure to unfinalize campaign "${campaignToSend?.title}"?`
                : `Are you sure to make this campaign "${campaignToSend?.title}" active?`}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowSendConfirmation(false);
                setCampaignToSend(null);
              }}
            >
              No
            </Button>
            <Button onClick={handleSendCampaign} disabled={isSending}>
              {isSending ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>
                    {campaignToSend?.emailStatus.toLowerCase() === "pending"
                      ? "Unfinalizing..."
                      : "Activating..."}
                  </span>
                </div>
              ) : (
                "Yes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CampaignManagement;
