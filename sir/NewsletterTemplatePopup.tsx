// @ts-nocheck
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/shadButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import EmailEditor, { EditorRef } from "react-email-editor";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import juice from "juice";

// Define interfaces for component props
interface CampaignData {
  CampaignID?: string;
  CampaignName?: string;
  CampaignType?: string;
  CampaignJson?: string;
  EmailStatus?: string;
}

interface Metadata {
  type?: string;
  date?: {
    start_date?: string;
    end_date?: string;
    months_ahead?: number;
  };
}

interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  htmlPath: string;
}

interface NewsletterTemplatePopupProps {
  isOpen: boolean;
  onClose: () => void;
  metadata?: Metadata;
  dealerId?: string;
  campaignToEdit?: CampaignData | null;
}

export const NewsletterTemplatePopup = ({
  isOpen,
  onClose,
  metadata,
  dealerId,
  campaignToEdit = null,
}: NewsletterTemplatePopupProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [showEditor, setShowEditor] = useState(campaignToEdit !== null);
  const basicSliderRef = useRef<HTMLDivElement>(null);
  const moreSliderRef = useRef<HTMLDivElement>(null);
  const emailEditorRef = useRef<EditorRef>(null);
  const [isTemplateLoading, setIsTemplateLoading] = useState(false);
  const [showCampaignNamePopup, setShowCampaignNamePopup] = useState(false);
  const [campaignName, setCampaignName] = useState(
    campaignToEdit?.CampaignName || ""
  );
  const [isSendingCampaign, setIsSendingCampaign] = useState(false);
  const [showTestEmailPopup, setShowTestEmailPopup] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("");
  const [testCampaignName, setTestCampaignName] = useState("");
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false);
  const [campaignLoaded, setCampaignLoaded] = useState(false);
  const { toast } = useToast();
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [isSendingStatus, setIsSendingStatus] = useState(false);
  const [campaignImageUrl, setCampaignImageUrl] = useState("");

  // Utility function to safely encode HTML to base64, handling Unicode characters
  const utf8ToBase64 = (str: string): string => {
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

  const basicTemplates = [
    {
      id: "0",
      title: "Blank",
      description:
        "Start with blank template if you like to design your email from scratch.",
      image: "/images/newsletters/0/sample.png",
      htmlPath: "/images/newsletters/0/design.json",
    },
    {
      id: "1",
      title: "Welcome",
      description:
        "Send an email to your new customers to welcome them to your product.",
      image: "/images/newsletters/1/sample.png",
      htmlPath: "/images/newsletters/1/design.json",
    },
    {
      id: "2",
      title: "Simple",
      description:
        "Start with a simple template if you like to have or to begin with minimal formatting in your emails.",
      image: "/images/newsletters/2/sample.png",
      htmlPath: "/images/newsletters/2/design.json",
    },
    {
      id: "3",
      title: "Promotion",
      description:
        "Sell your products and services and promote your latest deals.",
      image: "/images/newsletters/3/sample.png",
      htmlPath: "/images/newsletters/3/design.json",
    },
    {
      id: "4",
      title: "Plain email",
      description:
        "Create an email with little formatting that will look and feel like a personal email to your readers.",
      image: "/images/newsletters/4/sample.png",
      htmlPath: "/images/newsletters/4/design.json",
    },
    {
      id: "5",
      title: "Newsletter",
      description:
        "Keep your contacts engaged with your brand by sharing content that you both care about.",
      image: "/images/newsletters/5/sample.png",
      htmlPath: "/images/newsletters/5/design.json",
    },
  ];

  const moreTemplates = [
    {
      id: "6",
      title: "News Update",
      description: "Share your latest news and updates.",
      image: "/images/newsletters/6/sample.png",
      htmlPath: "/images/newsletters/6/design.json",
    },
    {
      id: "7",
      title: "Invitation",
      description: "Invite your customers to events or special promotions.",
      image: "/images/newsletters/7/sample.png",
      htmlPath: "/images/newsletters/7/design.json",
    },
    {
      id: "8",
      title: "The Valley",
      description: "A modern, clean design for professional communications.",
      image: "/images/newsletters/8/sample.png",
      htmlPath: "/images/newsletters/8/design.json",
    },
    {
      id: "9",
      title: "Experience Wonders - Summer Travel Deal",
      description:
        "A travel newsletter featuring a 30% summer discount, showcasing an aerial forest road view, trip packages, and a global landmarks footer sketch. Clean design with clear CTAs and social links.",
      image: "/images/newsletters/9/sample.png",
      htmlPath: "/images/newsletters/9/design.json",
    },
    {
      id: "10",
      title: "Boosting Business Success",
      description:
        "A corporate newsletter template with teal accents, featuring business imagery, professional quotes, and service highlights. Includes handshake photography and organized content sections with social media integration.",
      image: "/images/newsletters/10/sample.png",
      htmlPath: "/images/newsletters/10/design.json",
    },
  ];

  const scroll = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement>
  ) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const onReady = () => {
    const unlayer = emailEditorRef.current?.editor;

    if (!unlayer) return;

    unlayer.addEventListener("image", (file: any, done: any) => {
      try {
        console.log("Image event triggered", file);

        if (!file.attachments || !file.attachments.length) {
          console.error("No attachments found in file object");
          return done({ error: "No attachments found" });
        }

        const formData = new FormData();
        formData.append("file", file.attachments[0]);

        fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) throw new Error("Upload failed");
            return response.json();
          })
          .then((data) => {
            if (data.success && data.url) {
              const baseUrl = window.location.origin;
              const fullUrl = data.url.startsWith("http")
                ? data.url
                : `${baseUrl}${data.url}`;
              console.log("Upload successful, returning URL:", fullUrl);
              return done({
                progress: 100,
                url: fullUrl,
                skipValidation: true,
              });
            } else {
              throw new Error(data.error || "Upload failed");
            }
          })
          .catch((error) => {
            console.error("Upload error:", error);
            toast({
              title: "Error",
              variant: "destructive",
              description: "Failed to upload image",
            });
            done({ error: error.message });
          });
      } catch (error: any) {
        console.error("Error in image upload handler:", error);
        done({ error: error.message });
      }
    });
    // Log the Unlayer version
    if (unlayer.version) {
      console.log("Unlayer editor version:", unlayer.version);
    } else {
      // Alternative way to check version
      console.log("Unlayer editor:", unlayer);
    }
    // Load campaign JSON if it's an edit operation and not already loaded
    if (campaignToEdit && !campaignLoaded) {
      try {
        // Parse the JSON string into an object
        const designData = JSON.parse(campaignToEdit.CampaignJson || "{}");

        // Load the design into the editor
        setTimeout(() => {
          unlayer.loadDesign(designData);
          setCampaignLoaded(true);
        }, 500);
      } catch (error) {
        console.error("Error loading campaign design:", error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to load campaign design",
        });
      }
    }
  };

  const getCampaignTypeId = (type?: string): number => {
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
        return 7;
      case "gps":
        return 5;
      case "loyalty":
        return 6;
      case "unused":
        return 8;
      case "fourmonthsunused":
        return 8;
      default:
        return 1; // Default to GAP if type is not specified
    }
  };

  const formatDateForCampaign = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const updateCampaign = async () => {
    if (!campaignName.trim()) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Campaign name is required",
      });
      return;
    }

    setIsSendingCampaign(true);

    try {
      // Export campaign image first
      const imageUrl = ""; //await exportCampaignImage();
      setCampaignImageUrl(imageUrl);

      // Get HTML from editor with inline styles
      let html, design;
      try {
        const htmlPromise = new Promise<{ html: string; design: any }>(
          (resolve, reject) => {
            emailEditorRef.current?.editor?.exportHtml(
              (data) => {
                if (data.html && data.design) {
                  const options = {
                    removeStyleTags: true,
                    preserveMediaQueries: true,
                    preserveFontFaces: true,
                    applyStyleTags: true,
                    preserveImportant: true,
                    resolveCSSVariables: false,
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
          }
        );

        const result = await htmlPromise;
        html = result.html;
        design = result.design;
      } catch (error) {
        console.error("Error exporting HTML:", error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again",
        });
        setIsSendingCampaign(false);
        return;
      }

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
      formData.append("CampaignImageURL", imageUrl);

      // Get dates from the original campaign or calculate them
      let startDate, endDate;
      if (metadata?.date?.start_date && metadata?.date?.end_date) {
        startDate = formatDateForCampaign(metadata.date.start_date);
        endDate = formatDateForCampaign(metadata.date.end_date);
      } else {
        // Default to the current date and a week from now
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 7);
        startDate = formatDateForCampaign(start.toISOString());
        endDate = formatDateForCampaign(end.toISOString());
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
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again!",
        });
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.success === 1) {
        toast({
          title: "Success",
          description: "Campaign updated successfully!",
        });
        setShowCampaignNamePopup(false);
        onClose(); // Close the popup after successful submission
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again!",
        });
        throw new Error(result.message || "Failed to update campaign");
      }
    } catch (error: any) {
      console.error("Error updating campaign:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: `Failed to update campaign: ${error.message}`,
      });
    } finally {
      setIsSendingCampaign(false);
    }
  };

  const exportCampaignImage = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!emailEditorRef.current?.editor) {
        reject(new Error("Editor not initialized"));
        return;
      }

      emailEditorRef.current.editor.exportImage(
        (data: any) => {
          if (data.url) {
            resolve(data.url);
          } else {
            reject(new Error("Failed to export image"));
          }
        },
        {
          fullPage: true,
        }
      );
    });
  };

  const sendCampaign = async () => {
    if (!campaignName.trim()) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Campaign name is required",
      });
      return;
    }

    setIsSendingCampaign(true);

    try {
      // Export campaign image first
      const imageUrl = ""; //await exportCampaignImage();
      setCampaignImageUrl(imageUrl);

      // Get HTML from editor with inline styles
      let html, design;
      try {
        const htmlPromise = new Promise<{ html: string; design: any }>(
          (resolve, reject) => {
            emailEditorRef.current?.editor?.exportHtml(
              (data) => {
                if (data.html && data.design) {
                  const options = {
                    removeStyleTags: true,
                    preserveMediaQueries: true,
                    preserveFontFaces: true,
                    applyStyleTags: true,
                    preserveImportant: true,
                    resolveCSSVariables: false,
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
          }
        );

        const result = await htmlPromise;
        html = result.html;
        design = result.design;
      } catch (error) {
        console.error("Error exporting HTML:", error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again",
        });
        setIsSendingCampaign(false);
        return;
      }

      // Convert HTML to base64 with Unicode support
      const base64Html = utf8ToBase64(html);
      console.log("meta:", metadata);
      // Get dates from metadata
      let startDate, endDate;
      if (
        metadata?.date?.start_date === null ||
        metadata?.date?.end_date === null
      ) {
        startDate = "";
        endDate = "";
      } else {
        if (metadata?.date?.start_date && metadata?.date?.end_date) {
          startDate = formatDateForCampaign(metadata.date.start_date);
          endDate = formatDateForCampaign(metadata.date.end_date);
        } else if (metadata?.date?.months_ahead) {
          const start = new Date();
          const end = new Date();
          end.setMonth(end.getMonth() + metadata.date.months_ahead);
          startDate = formatDateForCampaign(start.toISOString());
          endDate = formatDateForCampaign(end.toISOString());
        } else {
          // Default to a week from now if no dates are provided
          const start = new Date();
          const end = new Date();
          end.setDate(end.getDate() + 7);
          startDate = formatDateForCampaign(start.toISOString());
          endDate = formatDateForCampaign(end.toISOString());
        }
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
      formData.append("CampaignImageURL", imageUrl);
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
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again!",
        });
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Campaign saved successfully!",
        });
        setShowCampaignNamePopup(false);
        onClose(); // Close the popup after successful submission
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again!",
        });
        throw new Error(result.message || "Failed to save campaign");
      }
    } catch (error: any) {
      console.error("Error sending campaign:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: `Failed to save campaign: ${error.message}`,
      });
    } finally {
      setIsSendingCampaign(false);
    }
  };

  const onSave = () => {
    // Open campaign name popup instead of saving
    setShowCampaignNamePopup(true);
  };

  const handleTemplateSelect = async (template: Template) => {
    if (!template) return;

    setSelectedTemplate(template);
    setShowEditor(true);
    setIsTemplateLoading(true);

    try {
      const response = await fetch(template.htmlPath);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const designData = await response.json();

      // Wait for editor to be ready
      setTimeout(() => {
        try {
          const unlayer = emailEditorRef.current?.editor;
          if (unlayer) {
            unlayer.loadDesign(designData);
          }
        } catch (editorError) {
          console.error("Error loading design:", editorError);
          toast({
            title: "Error",
            variant: "destructive",
            description: "Failed to load template",
          });
        } finally {
          setIsTemplateLoading(false);
        }
      }, 500);
    } catch (error) {
      console.error("Error loading template:", error);
      setIsTemplateLoading(false);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to load template",
      });
    }
  };

  const handleSendTestEmail = () => {
    // Initialize test campaign name with current campaign name or template title
    setTestCampaignName(
      campaignName || selectedTemplate?.title || "Test Campaign"
    );
    // Open test email popup
    setShowTestEmailPopup(true);
  };

  const sendTestEmail = async () => {
    if (!testEmailAddress.trim()) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Email address is required",
      });
      return;
    }

    setIsSendingTestEmail(true);

    try {
      // Get HTML from editor with inline styles
      let html, design;
      try {
        const htmlPromise = new Promise<{ html: string; design: any }>(
          (resolve, reject) => {
            emailEditorRef.current?.editor?.exportHtml(
              (data) => {
                if (data.html && data.design) {
                  const options = {
                    removeStyleTags: true,
                    preserveMediaQueries: true,
                    preserveFontFaces: true,
                    applyStyleTags: true,
                    preserveImportant: true,
                    resolveCSSVariables: false,
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
          }
        );

        const result = await htmlPromise;
        html = result.html;
        design = result.design;
      } catch (error) {
        console.error("Error exporting HTML:", error);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again",
        });
        setIsSendingTestEmail(false);
        return;
      }

      // Convert HTML to base64 with Unicode support
      const base64Html = utf8ToBase64(html);

      // Create form data
      const formData = new FormData();
      formData.append("Email", testEmailAddress);
      formData.append("Base64Html", base64Html);
      formData.append("CampaignJson", JSON.stringify(design));
      formData.append("Subject", testCampaignName);

      // Send test email
      const response = await fetch(
        "https://mypcp.us/webservices/campaign/sendtestcampaign",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again!",
        });
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "Test email sent successfully!",
        });
        setShowTestEmailPopup(false);
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again!",
        });
        throw new Error(result.message || "Failed to send test email");
      }
    } catch (error: any) {
      console.error("Error sending test email:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: `Failed to send test email: ${error.message}`,
      });
    } finally {
      setIsSendingTestEmail(false);
    }
  };

  const handleBackToTemplates = () => {
    setShowEditor(false);
    setSelectedTemplate(null);
  };

  const handleActivateCampaign = async () => {
    if (!campaignToEdit) return;

    setIsSendingStatus(true);
    try {
      const formData = new FormData();
      formData.append(
        "EmailStatus",
        campaignToEdit.EmailStatus === "1" ? "0" : "1"
      );
      formData.append("CampaignID", campaignToEdit.CampaignID || "");

      const response = await fetch(
        "https://mypcp.us/webservices/campaign/emailstatus",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again!",
        });
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description:
            campaignToEdit.EmailStatus === "0"
              ? "Campaign unfinalized successfully!"
              : "Campaign activated successfully!",
        });
        setShowSendConfirmation(false);
        onClose(); // Close the popup after successful action
      } else {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Try again!",
        });
        throw new Error(result.message || "Failed to update campaign status");
      }
    } catch (error: any) {
      console.error("Error updating campaign status:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: `Failed to update campaign status: ${error.message}`,
      });
    } finally {
      setIsSendingStatus(false);
    }
  };

  const TemplateCard = ({
    template,
    size = "large",
  }: {
    template: Template;
    size?: "large" | "small";
  }) => (
    <div
      className={`flex-shrink-0 p-4 cursor-pointer transition-all duration-200 hover:scale-105`}
      onClick={() => handleTemplateSelect(template)}
    >
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
        <div
          className={`${
            size === "large" ? "h-48" : "h-40"
          } relative overflow-hidden rounded-t-lg`}
        >
          <Image
            src={template.image}
            alt={template.title}
            fill
            className="object-cover"
            sizes={size === "large" ? "384px" : "320px"}
            priority
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900">{template.title}</h3>
          {size === "large" && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {template.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
  // console.log('meta passed: ',metadata)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white rounded-lg w-[90vw] h-[90vh] overflow-hidden relative"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200">
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                  {showEditor && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBackToTemplates}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
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
                        <span className="text-sm text-gray-500 mr-2">
                          {(() => {
                            let startDate, endDate;

                            // If we have direct start_date and end_date
                            if (
                              metadata.date.start_date &&
                              metadata.date.end_date
                            ) {
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
                              const formatOptions: Intl.DateTimeFormatOptions =
                                {
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

                            // If no dates are provided, show "All GPS contracts" or "All Guest contracts" based on type
                            if (metadata.type) {
                              return metadata.type === "guest"
                                ? "All Guest contracts"
                                : "All GPS contracts";
                            }

                            return "";
                          })()}
                        </span>
                      )}
                      <Button variant="outline" onClick={handleSendTestEmail}>
                        Send test email
                      </Button>
                      <Button onClick={onSave}>
                        {campaignToEdit ? "Update Campaign" : "Save Campaign"}
                      </Button>
                      {campaignToEdit && (
                        <Button
                          variant="default"
                          className="bg-blueLogo hover:bg-blueLogoLight"
                          onClick={() => setShowSendConfirmation(true)}
                        >
                          {campaignToEdit.EmailStatus === "1"
                            ? "Unfinalize Campaign"
                            : "Send Campaign"}
                        </Button>
                      )}
                    </>
                  )}
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {showEditor ? (
                <EmailEditor
                  ref={emailEditorRef}
                  onReady={onReady}
                  minHeight="calc(100vh - 200px)"
                  options={
                    {
                      projectId: 271828, // Replace with your project ID if you have one
                      appearance: {
                        theme: "classic_light",
                        panels: {
                          tools: {
                            dock: "right",
                          },
                        },
                      },
                      displayMode: "web",
                      fileStorage: {
                        provider: "custom", // This is critical - tells Unlayer to use your custom provider
                      },
                      features: {
                        stockImages: true,
                        imageEditor: true,
                        undoRedo: true,
                        sendTestEmail: true,
                        textEditor: {
                          spellChecker: true,
                          tables: true,
                          cleanPaste: true,
                          emojis: true,
                        },
                      },
                      designTags: {
                        business_name: "Tesla Inc",
                        current_user_name: "Elon Musk",
                      },
                      tools: {
                        image: {
                          enabled: true,
                          position: 1,
                          properties: {
                            // Force custom upload handling
                            upload: {
                              enabled: true,
                            },
                          },
                        },
                        button: {
                          enabled: true,
                          position: 2,
                        },
                        divider: {
                          enabled: true,
                          position: 3,
                        },
                        form: {
                          enabled: true,
                          position: 4,
                        },
                        html: {
                          enabled: true,
                          position: 5,
                        },
                        menu: {
                          enabled: true,
                          position: 6,
                        },
                        social: {
                          enabled: true,
                          position: 7,
                        },
                        text: {
                          enabled: true,
                          position: 8,
                        },
                        video: {
                          enabled: true,
                          position: 9,
                        },
                      },
                      customCSS: [
                        `
                      .unlayer-overlay { background-color: rgba(0,0,0,0.8) !important; }
                      .unlayer-contextmenu-overlay { background-color: rgba(0,0,0,0.8) !important; }
                    `,
                      ],
                      mergeTags: {
                        name: {
                          name: "Dealership Title",
                          value: "{{dealertitle}}",
                        },
                        logo: {
                          name: "Dealership Logo",
                          value: "{{dealerlogo}}",
                        },
                        firstname: {
                          name: "Customer First Name",
                          value: "{{customerfirstname}}",
                        },
                        lastname: {
                          name: "Customer Last Name",
                          value: "{{customerlastname}}",
                        },
                        email: {
                          name: "Customer Email",
                          value: "{{customeremail}}",
                        },
                        contractno: {
                          name: "Contract No",
                          value: "{{contractno}}",
                        },
                        dealerphone: {
                          name: "Dealer Phone",
                          value: "{{dealerphone}}",
                        },
                        dealeremail: {
                          name: "Dealer Email",
                          value: "{{dealeremail}}",
                        },
                        expirydate: {
                          name: "Expiry Date",
                          value: "{{expirydate}}",
                        },
                      },
                    } as any
                  }
                />
              ) : (
                <div className="p-6 space-y-8 overflow-y-auto h-full">
                  {/* Basic Templates */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Basic</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => scroll("left", basicSliderRef)}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => scroll("right", basicSliderRef)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div
                      ref={basicSliderRef}
                      className="flex overflow-x-auto hide-scrollbar gap-4"
                    >
                      {basicTemplates.map((template, index) => (
                        <div key={index} className="w-64 flex-shrink-0">
                          <TemplateCard template={template} size="large" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* More Templates */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">More</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => scroll("left", moreSliderRef)}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => scroll("right", moreSliderRef)}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div
                      ref={moreSliderRef}
                      className="flex overflow-x-auto hide-scrollbar gap-4"
                    >
                      {moreTemplates.map((template, index) => (
                        <div key={index} className="w-48 flex-shrink-0">
                          <TemplateCard template={template} size="small" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </motion.div>

      {/* Campaign Name Popup */}
      <Dialog
        open={showCampaignNamePopup}
        onOpenChange={setShowCampaignNamePopup}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {campaignToEdit ? "Update Campaign" : "Name Your Campaign"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="campaign-name" className="mb-2 block">
              Campaign Name
            </Label>
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
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCampaignNamePopup(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={campaignToEdit ? updateCampaign : sendCampaign}
              disabled={!campaignName.trim() || isSendingCampaign}
            >
              {isSendingCampaign ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>{campaignToEdit ? "Updating..." : "Creating..."}</span>
                </div>
              ) : campaignToEdit ? (
                "Update Campaign"
              ) : (
                "Create Campaign"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Email Popup */}
      <Dialog
        open={showTestEmailPopup}
        onOpenChange={(open) => {
          setShowTestEmailPopup(open);
          if (!open) setIsSendingTestEmail(false);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Test Email</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="email-address" className="mb-2 block">
              Email Address
            </Label>
            <Input
              id="email-address"
              value={testEmailAddress}
              onChange={(e) => setTestEmailAddress(e.target.value)}
              placeholder="Enter email address"
              type="email"
              className="w-full"
              autoFocus
            />
            <Label htmlFor="test-campaign-name" className="mt-4 mb-2 block">
              Campaign Name
            </Label>
            <Input
              id="test-campaign-name"
              value={testCampaignName}
              onChange={(e) => setTestCampaignName(e.target.value)}
              placeholder="Enter campaign name"
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowTestEmailPopup(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={sendTestEmail}
              disabled={!testEmailAddress.trim() || isSendingTestEmail}
            >
              {isSendingTestEmail ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Test"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Confirmation Popup */}
      <Dialog
        open={showSendConfirmation}
        onOpenChange={setShowSendConfirmation}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {campaignToEdit?.EmailStatus === "1"
                ? "Unfinalize Campaign"
                : "Activate Campaign"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              {campaignToEdit?.EmailStatus === "1"
                ? `Are you sure to unfinalize campaign "${campaignName}"?`
                : `Are you sure to make this campaign "${campaignName}" active?`}
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSendConfirmation(false)}
            >
              No
            </Button>
            <Button onClick={handleActivateCampaign} disabled={isSendingStatus}>
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
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewsletterTemplatePopup;
