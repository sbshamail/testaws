import React from "react";
import EmailEditor, { EditorRef } from "react-email-editor";
const ReactEmailEditor = ({ emailEditorRef, onReady }) => {
  return (
    <EmailEditor
      ref={emailEditorRef}
      onReady={onReady}
      minHeight="calc(100vh - 200px)"
      options={{
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
      }}
    />
  );
};

export default ReactEmailEditor;
