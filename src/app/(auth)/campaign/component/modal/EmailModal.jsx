import Input from "@/app/Components/Inputs/Input";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { Toastify } from "@/utils/helpers";
import React from "react";
import juice from "juice";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { fetchPostObj } from "@/utils/action/function";
const EmailModal = ({
  open,
  close,
  loading,
  setLoading,

  testEmailAddress,
  setTestEmailAddress,
  testCampaignName,
  setTestCampaignName,
  emailEditorRef,
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

  //   const basicTemplates = [
  //     {
  //       id: "0",
  //       title: "Blank",
  //       description:
  //         "Start with blank template if you like to design your email from scratch.",
  //       image: "/images/newsletters/0/sample.png",
  //       htmlPath: "/images/newsletters/0/design.json",
  //     },
  //     {
  //       id: "1",
  //       title: "Welcome",
  //       description:
  //         "Send an email to your new customers to welcome them to your product.",
  //       image: "/images/newsletters/1/sample.png",
  //       htmlPath: "/images/newsletters/1/design.json",
  //     },
  //     {
  //       id: "2",
  //       title: "Simple",
  //       description:
  //         "Start with a simple template if you like to have or to begin with minimal formatting in your emails.",
  //       image: "/images/newsletters/2/sample.png",
  //       htmlPath: "/images/newsletters/2/design.json",
  //     },
  //     {
  //       id: "3",
  //       title: "Promotion",
  //       description:
  //         "Sell your products and services and promote your latest deals.",
  //       image: "/images/newsletters/3/sample.png",
  //       htmlPath: "/images/newsletters/3/design.json",
  //     },
  //     {
  //       id: "4",
  //       title: "Plain email",
  //       description:
  //         "Create an email with little formatting that will look and feel like a personal email to your readers.",
  //       image: "/images/newsletters/4/sample.png",
  //       htmlPath: "/images/newsletters/4/design.json",
  //     },
  //     {
  //       id: "5",
  //       title: "Newsletter",
  //       description:
  //         "Keep your contacts engaged with your brand by sharing content that you both care about.",
  //       image: "/images/newsletters/5/sample.png",
  //       htmlPath: "/images/newsletters/5/design.json",
  //     },
  //   ];

  //   const moreTemplates = [
  //     {
  //       id: "6",
  //       title: "News Update",
  //       description: "Share your latest news and updates.",
  //       image: "/images/newsletters/6/sample.png",
  //       htmlPath: "/images/newsletters/6/design.json",
  //     },
  //     {
  //       id: "7",
  //       title: "Invitation",
  //       description: "Invite your customers to events or special promotions.",
  //       image: "/images/newsletters/7/sample.png",
  //       htmlPath: "/images/newsletters/7/design.json",
  //     },
  //     {
  //       id: "8",
  //       title: "The Valley",
  //       description: "A modern, clean design for professional communications.",
  //       image: "/images/newsletters/8/sample.png",
  //       htmlPath: "/images/newsletters/8/design.json",
  //     },
  //     {
  //       id: "9",
  //       title: "Experience Wonders - Summer Travel Deal",
  //       description: "A travel newsletter featuring a 30% summer discount, showcasing an aerial forest road view, trip packages, and a global landmarks footer sketch. Clean design with clear CTAs and social links.",
  //       image: "/images/newsletters/9/sample.png",
  //       htmlPath: "/images/newsletters/9/design.json",
  //     },
  //     {
  //       id: "10",
  //       title: "Boosting Business Success",
  //       description: "A corporate newsletter template with teal accents, featuring business imagery, professional quotes, and service highlights. Includes handshake photography and organized content sections with social media integration.",
  //       image: "/images/newsletters/10/sample.png",
  //       htmlPath: "/images/newsletters/10/design.json",
  //     },
  //   ];
  const sendTestEmail = async () => {
    if (!testEmailAddress.trim()) {
      Toastify("Error", "Email address is required");
      return;
    }
    try {
      // Get HTML from editor with inline styles
      const htmlPromise = new Promise((resolve, reject) => {
        emailEditorRef?.current?.editor?.exportHtml(
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

      const data = {
        Email: testEmailAddress,
        Base64Html: base64Html,
        CampaignJson: JSON.stringify(design),
        Subject: testCampaignName,
      };
      const res = await fetchPostObj({
        data,
        api: "campaign/sendtestcampaign",
        setLoading,
      });
      if (res) {
        close();
      }
    } catch (error) {
      console.error("Error sending test email:", error);
    }
  };
  return (
    <SimpleModal
      open={open}
      close={close}
      title={"Send Test Email"}
      className={"w-[500px] mx-2"}
    >
      <div>
        <div className="py-4">
          <h4 htmlFor="email-address" className="mb-2 block">
            Email Address
          </h4>
          <Input
            id="email-address"
            value={testEmailAddress}
            onChange={(e) => setTestEmailAddress(e.target.value)}
            placeholder="Enter email address"
            type="email"
            className="w-full"
            autoFocus
          />
          <h4 htmlFor="test-campaign-name" className="mt-4 mb-2 block">
            Campaign Name
          </h4>
          <Input
            id="test-campaign-name"
            value={testCampaignName}
            onChange={(e) => setTestCampaignName(e.target.value)}
            placeholder="Enter campaign name"
            className="w-full"
          />
        </div>
        <div className="flex justify-end items-center gap-2">
          <CustomButton variant="outline" onClick={close}>
            Cancel
          </CustomButton>

          <DancingLoadingButton
            onClick={sendTestEmail}
            disabled={!testEmailAddress.trim() || loading}
            loading={loading}
          >
            Send Test
          </DancingLoadingButton>
        </div>
      </div>
    </SimpleModal>
  );
};

export default EmailModal;
