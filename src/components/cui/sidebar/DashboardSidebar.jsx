"use client";
import Shadow from "../wrapper/Shadow";

import useScreenState from "@/utils/hooks/useScreenState";
import { extractChildComponents } from "@/utils/hooks/extractChildComponents";
import { MdClose, MdMenu } from "react-icons/md";
import Image from "next/image";

export const DashboardSidebar = ({
  children,
  open = true,
  type = "fixed",
  position = "left",
  title = "Sidebar Title",
  showOn = 976,
  sidebarSize = "256px",
  className,
  wrapperClass,
  //   data,
}) => {
  const { isOpen, toggleSidebar } = useScreenState({
    open,
    defaultWidth: showOn,
  });

  const { matches, rest: bodyChildren } = extractChildComponents(children, [
    "__TITLE_CONTENT",
    "__SIDEBAR_CONTENT",
  ]);
  const titleChildren = matches[0] || null;
  const sidebarChildren = matches[1] || null;
  const Icon =
    isOpen && position === "left"
      ? MdMenu
      : isOpen && position !== "left"
      ? MdClose
      : position === "left"
      ? MdClose
      : MdMenu;

  return (
    <div className={wrapperClass}>
      <div className={`max-h-screen relative  ${className}`}>
        <Shadow
          space="0"
          style={{ width: sidebarSize }}
          className={`shadow-md ${type} ${
            position === "right" ? "right-0" : "left-0"
          }  top-0 h-full  overflow-auto  transition-transform transform ${
            isOpen
              ? position === "right"
                ? "translate-x-0"
                : "translate-x-0"
              : position === "right"
              ? "translate-x-[110%]"
              : "-translate-x-[110%]"
          } `}
        >
          {titleChildren ? (
            titleChildren
          ) : (
            <h2 className="p-4 text-xl text-center">{title}</h2>
          )}
          <div className="mx-2">{sidebarChildren}</div>
        </Shadow>
      </div>

      {/* Show Hide button */}
      <div
        style={{
          marginLeft:
            isOpen && position === "left"
              ? `calc(${sidebarSize} - 35px)`
              : undefined,
          marginRight:
            isOpen && position !== "left"
              ? `calc(${sidebarSize} - 25px)`
              : undefined,
        }}
        className={`fixed z-50 mt-1 cursor-pointer hover:text-siteBlueHover Transition top-0 left-0 `}
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <Image
            src="/images/sidebar-left-open.svg"
            alt="left open"
            width={30}
            height={30}
            className="w-6"
          />
        ) : (
          <Image
            src="/images/sidebar-left-closed.svg"
            alt="left close"
            width={30}
            height={30}
            className="w-6"
          />
        )}
      </div>

      <div
        style={{
          marginLeft: isOpen && position === "left" ? sidebarSize : "",
          marginRight: isOpen && position !== "left" ? sidebarSize : "",
        }}
        className={` transition-all duration-300`}
      >
        {bodyChildren}
      </div>
    </div>
  );
};

export const DashboardSidebarTitle = ({
  children,
  className = "p-4 text-center text-xl font-bold",
}) => {
  return <div className={className}>{children}</div>;
};
DashboardSidebarTitle.__TITLE_CONTENT = true;

export const DashboardSidebarContent = ({
  children,
  className = "flex items-center justify-center",
}) => {
  return <div className={className}>{children}</div>;
};
DashboardSidebarContent.__SIDEBAR_CONTENT = true;
