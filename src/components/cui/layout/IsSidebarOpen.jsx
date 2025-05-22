"use client";
import React, { useContext } from "react";
import { GlobalContext } from "@/app/Provider";

const IsSidebarOpen = ({ children, className }) => {
  const { isSidebarOpen } = useContext(GlobalContext);
  return (
    <div
      className={` ${
        isSidebarOpen ? "max-w-[calc(100vw-290px)]" : "w-full"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default IsSidebarOpen;
