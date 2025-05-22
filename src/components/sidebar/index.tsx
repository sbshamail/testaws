"use client";
import React, { FC, ReactNode } from "react";
import Shadow from "../tag/Shadow";
import Sidebar from "./Sidebar";
import { SidebarContentType } from "./interface";

interface Props {
  isOpen: boolean;
  type?: "fixed" | "absolute";
  position?: "right" | "left";
  children?: ReactNode;
  data: SidebarContentType[];
  title: string;
}

const Main: FC<Props> = ({ children, isOpen, type, position, title, data }) => {
  return (
    <Shadow
      space="0"
      className={`shadow-md ${type || "absolute"} ${
        position === "right" ? "right-0" : "left-0"
      } top-0 h-full overflow-auto  transition-transform transform w-64 ${
        isOpen
          ? position === "right"
            ? "translate-x-0"
            : "translate-x-0"
          : position === "right"
          ? "translate-x-[110%]"
          : "-translate-x-[110%]"
      } `}
    >
      <h2 className="p-4 text-xl">{title}</h2>
      {children ? children : <Sidebar data={data} />}
    </Shadow>
  );
};

export default Main;
