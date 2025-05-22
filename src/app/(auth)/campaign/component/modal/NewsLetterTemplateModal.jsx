"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { Toastify } from "@/utils/helpers";
import NewLetterHeader from "../NewsLetterTemplate/NewLetterHeader";
import ReactEmailEditor from "../NewsLetterTemplate/EmailEditor";
import MoreTemplate from "../NewsLetterTemplate/MoreTemplate";
import TemplateCard from "../NewsLetterTemplate/TemplateCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { basicTemplates } from "../NewsLetterTemplate/data";

const NewsLetterTemplateModal = ({
  isOpen,
  onClose,
  metadata,
  dealerId,
  campaignToEdit = null,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showEditor, setShowEditor] = useState(campaignToEdit !== null);

  const [isTemplateLoading, setIsTemplateLoading] = useState(false);

  const [campaignLoaded, setCampaignLoaded] = useState(false);

  const [showSendConfirmation, setShowSendConfirmation] = useState(false);

  const basicSliderRef = useRef(null);
  const moreSliderRef = useRef(null);
  const emailEditorRef = useRef(null);

  const handleTemplateSelect = async (template) => {
    if (!template) return;

    setSelectedTemplate(template);
    setShowEditor(true);
    setIsTemplateLoading(true);
    const url = `${window?.location?.origin ?? "portal.mypcp.us"}${
      template.htmlPath
    }`;
    try {
      const response = await fetch(url);

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
          Toastify("error", "Failed to load template");
        } finally {
          setIsTemplateLoading(false);
        }
      }, 500);
    } catch (error) {
      console.error("Error loading template:", error);
      setIsTemplateLoading(false);
      Toastify("error", "Failed to load template");
    }
  };

  const handleBackToTemplates = () => {
    setShowEditor(false);
    setSelectedTemplate(null);
  };

  const onReady = () => {
    const unlayer = emailEditorRef.current?.editor;

    if (!unlayer) return;

    unlayer.addEventListener("image", (file, done) => {
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
            Toastify("error", "Failed to upload image");

            done({ error: error.message });
          });
      } catch (error) {
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
        const designData = JSON.parse(campaignToEdit.CampaignJson);

        // Load the design into the editor
        setTimeout(() => {
          unlayer.loadDesign(designData);
          setCampaignLoaded(true);
        }, 500);
      } catch (error) {
        console.error("Error loading campaign design:", error);
        Toastify("error", "Failed to load campaign design");
      }
    }
  };

  const scroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
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
          className="bg-card rounded-lg w-[90vw] h-[90vh] overflow-hidden relative"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <NewLetterHeader
              showEditor={showEditor}
              metadata={metadata}
              onClose={onClose}
              handleBackToTemplates={handleBackToTemplates}
              campaignToEdit={campaignToEdit}
              selectedTemplate={selectedTemplate}
              setShowSendConfirmation={setShowSendConfirmation}
              emailEditorRef={emailEditorRef}
              dealerId={dealerId}
            />

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {showEditor ? (
                <>
                  <ReactEmailEditor
                    emailEditorRef={emailEditorRef}
                    onReady={onReady}
                  />
                </>
              ) : (
                <div className="p-6 space-y-8 overflow-y-auto h-full">
                  {/* Basic Templates */}
                  <div>
                    <div className="flex justify-between items-center mb-4 ">
                      <h3 className="text-lg font-medium">Basic</h3>
                      <div className="flex gap-2">
                        <MdChevronLeft
                          className="text-2xl cursor-pointer"
                          onClick={() => scroll("left", basicSliderRef)}
                        />
                        <MdChevronRight
                          onClick={() => scroll("right", basicSliderRef)}
                          className="text-2xl cursor-pointer"
                        />
                      </div>
                    </div>
                    <div
                      ref={basicSliderRef}
                      className="flex overflow-x-auto hide-scrollbar gap-4 flex-nowrap max-w-full"
                    >
                      {basicTemplates.map((template, index) => (
                        <div key={index} className="w-64 flex-shrink-0">
                          <TemplateCard
                            template={template}
                            size="large"
                            handleTemplateSelect={handleTemplateSelect}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* More Templates */}
                  <MoreTemplate
                    moreSliderRef={moreSliderRef}
                    handleTemplateSelect={handleTemplateSelect}
                    scroll={scroll}
                  />
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
    </>
  );
};

export default NewsLetterTemplateModal;
