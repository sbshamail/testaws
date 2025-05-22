"use client";
import useScreenState from "@/@core/customHooks/useScreenState";
import Sidebar from "../sidebar";
import HIconify from "../icon/HIconify";
import { sidebarData, SidebarContentType } from "../sidebar/interface";
interface Props {
  children: React.ReactNode;
  type?: "fixed" | "absolute";
  position?: "right" | "left";
  open?: boolean;
  sidebarContents?: SidebarContentType[];
  sidebarChildren?: React.ReactNode;
  sidebarTitle?: string;
}
const Layout: React.FC<Props> = ({
  children,
  type,
  position = "left",
  open = true,
  sidebarContents = sidebarData,
  sidebarChildren,
  sidebarTitle = "Sidebar",
}) => {
  const { isOpen, toggleSidebar } = useScreenState({ open });
  return (
    <div className={`w-full flex ${type === "fixed" ? "relative" : ""}`}>
      <div className="max-h-screen">
        <Sidebar
          data={sidebarContents}
          type={type}
          position={position}
          title={sidebarTitle}
          isOpen={isOpen}
        >
          {sidebarChildren}
        </Sidebar>
      </div>
      <HIconify
        icon={`${
          isOpen
            ? position === "left"
              ? "mdi:hamburger-open"
              : "mdi:hamburger-close"
            : position === "left"
            ? "mdi:hamburger-close"
            : "mdi:hamburger-open"
        }`}
        fontSize={"1.5em"}
        onClick={toggleSidebar}
        className={`${type || "absolute"} top-0   ${
          isOpen ? (position === "left" ? "ml-64 " : "me-64 ") : ""
        } ${position === "left" ? "left-0" : "right-0"} iconPrimary `}
      >
        {isOpen ? "Hide Sidebar" : "Show Sidebar"}
      </HIconify>
      <div
        className={`flex-1 transition-all duration-300  ${
          isOpen ? (position === "left" ? "ms-72" : "me-72") : ""
        }
       
        `}
      >
        <main className="w-full h-full ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
