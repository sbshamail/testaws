import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/shadButton";
import { ArrowLeft, Plus, X } from "lucide-react";
import React from "react";

const ChatHeader = ({
  view,
  setView,
  startNewMessage,
  setIsOpen,
  DealerTitle,
}) => {
  return (
    <div className="flex items-center justify-between border-b bg-primary p-4 text-primary-foreground rounded-t-lg">
      <div className="flex items-center gap-3">
        {view !== "history" && (
          <Button
            onClick={() => setView("history")}
            variant="ghost"
            size="icon"
            className="mr-1 h-8 w-8 rounded-full text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {/* <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="Support"
          />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar> */}
        <div className="flex flex-col">
          <span className="font-semibold">{DealerTitle}</span>
          <span className="text-xs opacity-90">
            {view === "history"
              ? "Message History"
              : view === "new"
              ? "New Message"
              : "Chat"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {view === "history" && (
          <Button
            onClick={startNewMessage}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
