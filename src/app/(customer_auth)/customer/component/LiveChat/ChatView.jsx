import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/app/Provider";
import TextField from "@/components/cui/textField/TextField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/shadButton";
import { cn } from "@/lib/utils";
import { fetchPostObj } from "@/utils/action/function";
import { Calendar, ImageIcon, Send, X } from "lucide-react";
import SimpleModal from "@/components/cui/modals/SimpleModal";

const ChatView = ({
  chatData,
  activeThreadId,
  formatDate,
  isUserMessage,
  formatTimestamp,
  fileInputRef,
  threadState,
  updateThreadState,
  setLoading,
  refreshChatData,
  setChatData,
  isOpen,
}) => {
  const [replyData, setReplyData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    const chat = chatData.find((thread, index) => index === activeThreadId);
    setReplyData(chat);
  }, [chatData]);
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    customer_id: CustomerID,
    ContractID,
    IsGuest = 0,
  } = GLOBAL_RESPONSE || {};

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [replyData?.thread_msgs]);

  const { message, selectedImage, selectedImagePreview } = threadState;
  const handleSendMessage = async () => {
    if (message.trim()) {
      const chat = chatData.find((thread, index) => index === activeThreadId);
      const threadid = chat.threadid;
      const message_reply_id = chat.id;
      const message_id =
        chat.thread_msgs[chat.thread_msgs.length - 1]?.message_id;
      const data = {
        ContractID,
        CustomerID,
        IsGuest,
        threadid,
        message_reply_id,
        message_id,
        message_reply: message,
        upload_img: selectedImage,
      };
      const response = await fetchPostObj({
        auth,
        Token,
        data,
        api: "customer/reply",
        setLoading,
      });
      if (response) {
        const res = await refreshChatData(chatData.length - 3);
        if (res) {
          setChatData(res.msgs_thread);
        }
      }
    }
  };
  const handleMessageChange = (e) =>
    updateThreadState({ message: e.target.value });

  const handleSendMessageLocal = () => {
    handleSendMessage();
    updateThreadState({
      message: "",
      selectedImage: null,
      selectedImagePreview: null,
    });
  };

  const handleImageChangeLocal = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      updateThreadState({ selectedImage: file, selectedImagePreview: preview });
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Find the active thread */}
        {replyData && (
          <div className="space-y-4">
            {/* Date Header */}
            <div className="sticky top-0 z-10 flex justify-center py-2 bg-background/80 backdrop-blur-sm">
              <div className="px-3 py-1 rounded-full bg-muted text-xs font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {replyData?.message_date && formatDate(replyData?.message_date)}
              </div>
            </div>

            {/* Messages for this date */}
            {replyData?.thread_msgs?.map((msg, msgIndex) => {
              const isUser = isUserMessage(msg);
              const senderName = isUser ? msg.user1Name : msg.user1Name;
              const senderImage = isUser ? msg.User1Image : msg.User1Image;

              // Handle special case for scheduled appointments
              const hasSchedule = msg.ScheduleDate && msg.ScheduleService;

              return (
                <div
                  key={`msg-${msg.message_id}-${msgIndex}`}
                  className={cn(
                    "flex w-full",
                    isUser ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "flex max-w-[80%] gap-2",
                      isUser ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    {/* Avatar - only show for agent messages */}

                    <Avatar className="h-8 w-8 mt-1 flex-shrink-0 border">
                      <AvatarImage src={senderImage} alt={senderName} />
                      <AvatarFallback>
                        {senderName?.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      {/* Sender Name */}
                      <span
                        className={cn(
                          "text-xs font-medium mb-1",
                          isUser
                            ? "text-right text-primary"
                            : "text-left text-primary"
                        )}
                      >
                        {senderName}
                      </span>

                      {/* Message Bubble */}
                      <div
                        className={cn(
                          "rounded-lg p-3 text-sm",
                          isUser
                            ? "bg-secondary text-secondary-foreground border border-border rounded-tr-none"
                            : "bg-muted text-foreground border border-border rounded-tl-none"
                        )}
                      >
                        {/* Title if present */}
                        {msg.title && (
                          <div className="font-medium mb-1">{msg.title}</div>
                        )}

                        {/* Message content */}
                        <div>{msg.message}</div>

                        {/* Image if present */}
                        {msg.upload_img && (
                          <div className="mt-2">
                            <div className="rounded-md overflow-hidden border bg-background/50 p-1">
                              <img
                                src={msg.upload_img}
                                alt="Attached"
                                className="rounded max-w-full h-auto cursor-pointer"
                                onClick={() => setPreviewImage(msg.upload_img)}
                              />
                            </div>
                          </div>
                        )}

                        {/* Schedule information if present */}
                        {hasSchedule && (
                          <div className="mt-2 p-2 bg-background/50 rounded border text-xs">
                            <div className="font-medium">
                              Scheduled Appointment
                            </div>
                            <div>
                              {new Date(msg.ScheduleDate).toLocaleString()}
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: msg.ScheduleService,
                              }}
                            />
                          </div>
                        )}

                        {/* Timestamp */}
                        <div
                          className={cn(
                            "text-xs mt-1",
                            isUser
                              ? "text-right text-primary-foreground/80"
                              : "text-left text-muted-foreground"
                          )}
                        >
                          {formatTimestamp(msg.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Chat Input */}
      <div className="border-t p-4 bg-background/90 backdrop-blur-sm rounded-b-lg">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <TextField
              textarea={true}
              value={message}
              onChange={handleMessageChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessageLocal();
                }
              }}
              placeholder="Type your message..."
              className="min-h-[44px] max-h-40 w-full resize-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              type="button"
            >
              <ImageIcon className="h-5 w-5" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChangeLocal}
                className="hidden"
              />
            </Button>
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="rounded-full h-10 w-10"
              disabled={!message && !selectedImage}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Image Preview */}
        {selectedImagePreview && (
          <div className="mt-2 relative">
            <div className="rounded-md overflow-hidden border bg-background/50 p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  {selectedImage?.name}
                </span>
                <Button
                  onClick={() => {
                    updateThreadState({
                      selectedImage: null,
                      selectedImagePreview: null,
                    });
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

      {previewImage && (
        <SimpleModal
          className="m-auto bg-transparent h-max w-max max-w-[600px] flex justify-center items-center "
          open={previewImage}
          close={() => setPreviewImage(false)}
          closeOutside={true}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent close on image click
          />
          <div className="flex items-center justify-center text-muted-foreground">
            <Button variant={"ghost"} onClick={() => setPreviewImage(false)}>
              X Close
            </Button>
          </div>
        </SimpleModal>
      )}
    </>
  );
};

export default ChatView;
