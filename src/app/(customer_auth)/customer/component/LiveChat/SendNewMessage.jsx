import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "@/app/Provider";
import Input from "@/app/Components/Inputs/Input";
import TextField from "@/components/cui/textField/TextField";
import { Button } from "@/components/ui/shadButton";
import { fetchPostObj } from "@/utils/action/function";
import { ImageIcon, Send, X } from "lucide-react";

const SendNewMessage = ({
  refreshChatData,
  setView,
  setActiveThreadId,
  setLoading,
}) => {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    customer_id: CustomerID,
    ContractID,
    IsGuest = 0,
  } = GLOBAL_RESPONSE || {};
  const [messageTitle, setMessageTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const handleSendMessage = async () => {
    const data = {
      CustomerID,
      ContractID,
      IsGuest,
      title: messageTitle,
      message,
      upload_img: selectedImage,
    };
    const response = await fetchPostObj({
      api: "customer/send_message",
      auth,
      Token,
      data,
      setLoading,
    });
    if (response) {
      const res = await refreshChatData(0);
      if (res) {
        setView("chat");
        setActiveThreadId(0);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="p-4 border-b border-border">
        <Input
          placeholder="Message Title"
          value={messageTitle}
          onChange={(e) => setMessageTitle(e.target.value)}
          className="mb-2"
        />
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <TextField
              textarea={true}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[100px] max-h-40 w-full resize-none"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              className="gap-1"
              type="button"
            >
              <ImageIcon className="h-4 w-4" />
              Attach Image
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </Button>
            <span className="text-xs text-muted-foreground">
              {selectedImage ? selectedImage.name : "No image selected"}
            </span>
          </div>

          {/* Image Preview */}
          {selectedImagePreview && (
            <div className="relative">
              <div className="rounded-md overflow-hidden border bg-background/50 p-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">Preview</span>
                  <Button
                    onClick={() => {
                      setSelectedImage(null);
                      setSelectedImagePreview(null);
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <img
                  src={selectedImagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="rounded max-w-full h-auto max-h-32 object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="p-4 border-t">
        <Button
          onClick={handleSendMessage}
          className="w-full"
          disabled={!message.trim() && !selectedImage}
        >
          <Send className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default SendNewMessage;
