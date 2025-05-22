"use client";
import { GlobalContext } from "@/app/Provider";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { formatDate, dateHMS } from "@/utils/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const History = () => {
  const [logs, setLogs] = useState([]);
  const { auth } = useContext(GlobalContext);
  const router = useRouter();
  // Load logs from localStorage when the component mounts
  useEffect(() => {
    const now = new Date();
    const savedLogs = JSON.parse(localStorage.getItem("eventLogs")) || [];
    // Filter out expired logs
    const validLogs = savedLogs.filter((log) => new Date(log.expiry) > now);

    // Optional: Clean up localStorage by removing expired logs
    localStorage.setItem("eventLogs", JSON.stringify(validLogs));
    setLogs(validLogs);
  }, []);
  const clearLogs = () => {
    localStorage.removeItem("eventLogs"); // Remove logs from localStorage
    setLogs([]); // Clear the state logs
  };
  if (auth?.role_id !== "1") {
    router.push("/not-found");
  }
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-center text-card-foreground mb-6">
          History
        </h1>
        <CustomButton onClick={clearLogs} variant="danger" size="sm">
          Clear History
        </CustomButton>
      </div>

      {/* Logs List */}
      <div className="space-y-4 ">
        {logs?.length === 0 ? (
          <p className="text-center text-foreground">No logs available.</p>
        ) : (
          [...logs].reverse().map((log, index) => (
            <div key={index} className="bg-card shadow-lg rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-card-foreground">
                  {log.type}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-foreground">
                    {formatDate(log.timestamp)}
                  </span>
                  <span className="text-sm text-foreground">
                    {dateHMS(log.timestamp)}
                  </span>
                </div>
              </div>
              <div className="text-card-foreground space-y-1">
                {Object.entries(log.details).map(([key, value], i) => (
                  <p
                    key={i}
                    className="text-sm break-words whitespace-pre-wrap overflow-hidden"
                  >
                    <span className="font-semibold">{key}: </span>
                    {key === "link" ? (
                      <Link
                        className="text-primary hover:underline break-all"
                        href={value}
                      >
                        {value}
                      </Link>
                    ) : (
                      <span className="break-words break-all">
                        {JSON.stringify(value)}
                      </span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
