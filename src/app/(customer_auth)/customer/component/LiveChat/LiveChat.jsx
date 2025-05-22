"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/shadButton";

import { cn } from "@/lib/utils";

import { GlobalContext } from "@/app/Provider";

import SendNewMessage from "./SendNewMessage";
import HistoryView from "./HistoryView";
import ChatHeader from "./ChatHeader";
import ChatView from "./ChatView";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { fetchPostObj } from "@/utils/action/function";

// Helper function to format timestamp
const formatTimestamp = (timestamp) => {
  const date = new Date(Number.parseInt(timestamp) * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Helper to check if a message is from the current user

export function LiveChat({ msgs_thread, GetCustomerById, total }) {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    customer_id: CustomerID,
    ContractID,
    IsGuest = 0,
  } = GLOBAL_RESPONSE || {};
  const { DealerTitle } = GetCustomerById || {};
  const [isOpen, setIsOpen] = useState(false);
  const [threadStates, setThreadStates] = useState({});
  const [chatData, setChatData] = useState(msgs_thread);

  const [view, setView] = useState("history"); //"history" | "chat" | "new"
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setChatData(msgs_thread);
  }, [msgs_thread]);

  const isUserMessage = (message) => {
    return message.user1 === auth?.user_id;
  };

  const refreshChatData = async (offset = chatData.length) => {
    const data = { CustomerID, ContractID, IsGuest, offset };
    const res = await fetchPostObj({
      api: "customer/loadthread",
      auth,
      Token,
      data,
      spinner: true,
    });
    return res;
  };

  const updateThreadState = (threadId, newState) => {
    setThreadStates((prev) => ({
      ...prev,
      [threadId]: {
        ...prev[threadId],
        ...newState,
      },
    }));
  };

  const getThreadState = (threadId) => {
    return (
      threadStates[threadId] || {
        message: "",
        selectedImage: null,
        selectedImagePreview: null,
      }
    );
  };

  const openThread = (threadId) => {
    setActiveThreadId(threadId);
    setView("chat");
  };

  const startNewMessage = () => {
    setActiveThreadId(null);
    setView("new");
  };
  return (
    <>
      {/* Chat Icon Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full p-0"
        size="icon"
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
      {/* <SpinnerCenterScreen loading={true} /> */}
      {/* Chat Window */}
      <div
        className={cn(
          `fixed right-6 bottom-24 z-50 ${
            view === "new" ? "max-h-[600px]" : "top-0 max-h-[1000px]"
          } flex w-[380px] flex-col rounded-lg border bg-background shadow-xl transition-all duration-300`,
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <SpinnerCenterScreen loading={loading} center={true} />

        {/* Chat Header */}
        <ChatHeader
          view={view}
          setView={setView}
          startNewMessage={startNewMessage}
          setIsOpen={setIsOpen}
          DealerTitle={DealerTitle}
        />

        {/* History View */}
        {view === "history" && (
          <HistoryView
            chatData={chatData}
            openThread={openThread}
            formatDate={formatDate}
            formatTimestamp={formatTimestamp}
            isUserMessage={isUserMessage}
            setChatData={setChatData}
            total={total}
            refreshChatData={refreshChatData}
          />
        )}

        {/* Chat Messages */}
        {view === "chat" && (
          <ChatView
            chatData={chatData}
            setChatData={setChatData}
            activeThreadId={activeThreadId}
            formatDate={formatDate}
            isUserMessage={isUserMessage}
            formatTimestamp={formatTimestamp}
            isOpen={isOpen}
            fileInputRef={fileInputRef}
            threadState={getThreadState(activeThreadId)}
            updateThreadState={(newState) =>
              updateThreadState(activeThreadId, newState)
            }
            setLoading={setLoading}
            refreshChatData={refreshChatData}
          />
        )}

        {/* New Message View */}
        {view === "new" && (
          <SendNewMessage
            refreshChatData={refreshChatData}
            setView={setView}
            setActiveThreadId={setActiveThreadId}
            setLoading={setLoading}
          />
        )}
      </div>
    </>
  );
}
