import React, { useContext } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Sidebar/Header";
import { GlobalContext } from "../Provider";
import { usePathname } from "next/navigation";
import useDivDimensions from "@/utils/hooks/useDivDimentions";
const LayoutAuth = ({ children, loading, setLoading }) => {
  const { dimension, divRef } = useDivDimensions(["resize"]);
  const fixedWidth = "256";
  const { isSidebarOpen, setIsSidebarOpen } = useContext(GlobalContext);
  const path = usePathname();
  if (path.includes("print")) {
    return <div className="w-full">{children}</div>;
  }
  const headerNotShow = ["/avinsights/index"];
  return (
    <div className="w-full flex">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        fixedWidth={`${fixedWidth}px`}
      />

      <div
        className={`w-full flex-1 Transition  ${
          isSidebarOpen ? `sidebar:ml-64 ml-0` : "ml-0"
        }`}
      >
        {!headerNotShow.includes(path) && (
          <div
            ref={divRef}
            className={`fixed top-0 right-0  bg-card shadow-lg border-b border-border/20  shadow-shadow z-[40]  ${
              isSidebarOpen ? `sidebar:w-[calc(100%-256px)] w-full` : "w-full"
            }  m-auto `}
          >
            <div>
              <Header loading={loading} setloading={setLoading} />
            </div>
          </div>
        )}
        <div
          className="bg-background min-h-screen "
          style={{
            paddingTop: !headerNotShow.includes(path)
              ? dimension?.height || 60
              : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;
