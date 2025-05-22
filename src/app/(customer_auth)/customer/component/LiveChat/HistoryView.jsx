import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/shadButton";

const HistoryView = ({
  chatData,
  openThread,
  formatDate,
  formatTimestamp,
  isUserMessage,
  setChatData,
  total,
  refreshChatData,
}) => {
  const handleViewMore = async () => {
    const res = await refreshChatData();
    if (res) {
      setChatData([...chatData, ...res.msgs_thread]);
    }
  };
  // Helper to get the last message from a thread
  const getLastMessage = (thread) => {
    if (!thread.thread_msgs || thread.thread_msgs.length === 0) {
      return null;
    }
    return thread.thread_msgs[thread.thread_msgs.length - 1];
  };
  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Render threads in reverse chronological order */}
      {chatData &&
        chatData?.map((thread, index) => {
          const lastMessage = getLastMessage(thread);
          if (!lastMessage) return null;
          const isUser = isUserMessage(lastMessage);
          const senderName = isUser
            ? lastMessage.user1Name
            : lastMessage.user1Name;

          return (
            // <div
            //   key={index}
            //   className={cn(
            //     "flex w-full",
            //     isUser ? "justify-end" : "justify-start"
            //   )}
            // >
            //   <div
            //     className={cn(
            //       "flex max-w-[80%] gap-2",
            //       isUser ? "flex-row-reverse" : "flex-row"
            //     )}
            //   >
            //     <div className="flex flex-col">
            //       {/* Sender Name */}
            //       <span
            //         className={cn(
            //           "text-xs font-medium mb-1",
            //           isUser
            //             ? "text-right text-primary"
            //             : "text-left text-primary"
            //         )}
            //       >
            //         {senderName}
            //       </span>

            //       {/* Message Bubble */}
            //       <div
            //         className={cn(
            //           "rounded-lg p-3 text-sm",
            //           isUser
            //             ? "bg-primary text-primary-foreground rounded-tr-none"
            //             : "bg-muted text-foreground rounded-tl-none"
            //         )}
            //       >
            //         {/* Title if present */}
            //         {lastMessage.title && (
            //           <div className="font-medium mb-1">
            //             {lastMessage.title}
            //           </div>
            //         )}

            //         {/* Message content */}
            //         <div>{lastMessage.message}</div>

            //         {/* Timestamp */}
            //         <div
            //           className={cn(
            //             "text-xs mt-1",
            //             isUser
            //               ? "text-right text-primary-foreground/80"
            //               : "text-left text-muted-foreground"
            //           )}
            //         >
            //           {formatTimestamp(lastMessage.timestamp)}
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            <Card
              key={index}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => openThread(index)}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                  {/* <CardTitle className="text-sm font-medium">
                    {lastMessage.message}
                  </CardTitle> */}
                  <CardDescription className="text-xs flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(thread.message_date)}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage
                      src={lastMessage.User1Image}
                      alt={
                        isUserMessage(lastMessage)
                          ? lastMessage.user1Name
                          : lastMessage.user1Name
                      }
                    />
                    <AvatarFallback>
                      {(isUserMessage(lastMessage)
                        ? lastMessage.user1Name
                        : lastMessage.user1Name
                      )?.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-xs font-medium mb-1">
                      {isUserMessage(lastMessage)
                        ? lastMessage.user1Name
                        : lastMessage.user1Name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {truncateText(lastMessage.message, 80)}
                    </div>
                    {lastMessage.upload_img && (
                      <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        Image attached
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-end">
                <div className="text-xs text-muted-foreground">
                  {formatTimestamp(lastMessage.timestamp)}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      {chatData?.length < total && (
        <div className="flex justify-center items-center">
          <Button variant="outline" onClick={handleViewMore}>
            View More
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
