"use client";
import React, { useState, useContext, useEffect } from "react";
import Nav from "./Nav";
import { GlobalContext } from "@/app/Provider";
import Image from "next/image";
import Link from "next/link";

import { LuLayoutDashboard } from "react-icons/lu";

import { usePathname } from "next/navigation";

import NeedHelp from "./component/NeedHelp";
import UserSettingMenu from "./component/UserSettingMenu";

const Sidebar = ({ isOpen, setIsOpen, fixedWidth }) => {
  const pathname = usePathname();

  const { GLOBAL_RESPONSE, GLOBAL_MENUS_INFO, setGlobalLoader } =
    useContext(GlobalContext);
  // console.log("GLOBAL_MENUS_INFO", GLOBAL_MENUS_INFO);

  const [menuCheck, setMenuCheck] = useState("dashboard");
  const [logoSrc, setLogoSrc] = useState("/images/procarma-new-logo.svg");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const domain = window.location.hostname;
      if (domain.startsWith("bda.procarma")) {
        setLogoSrc("/images/BL-Logo-250.png");
      } else {
        setLogoSrc("/images/procarma-new-logo.svg");
      }
    }
  }, []);
  useEffect(() => {
    const loadTawkScript = () => {
      var Tawk_API = Tawk_API || {};
      var Tawk_LoadStart = new Date();

      (function () {
        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/64778b3f74285f0ec46ec979/1i35ib3nt";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      })();
    };

    const removeTawkScript = () => {
      const tawkScript = document.querySelector(
        'script[src^="https://embed.tawk.to"]'
      );
      if (tawkScript) {
        tawkScript.remove();
      }
    };

    loadTawkScript();

    return () => {
      removeTawkScript();
    };
  }, []);

  // main sidebar menus
  const sidebarMenus = () => (
    <div className={`w-full border-white flex flex-col gap-y-6 `}>
      {/* dashboard */}
      <Link
        href="/dashboard"
        // className="w-full flex items-center justify-center"
      >
        <div
          onClick={() => setMenuCheck("dashboard")}
          className={`w-full flex justify-start gap-2 items-center px-4  font-bold ${
            "/dashboard" === pathname
              ? "bg-primary text-primary-foreground "
              : menuCheck === "dashboard"
              ? "border  text-muted-foreground "
              : "text-muted-foreground border-none hover:bg-primary/20 hover:text-accent-foreground "
          } py-3 rounded-xl`}
        >
          <LuLayoutDashboard className=" text-2xl" />
          DASHBOARD
        </div>
      </Link>

      <Nav
        menu={GLOBAL_MENUS_INFO}
        menuCheck={menuCheck}
        setMenuCheck={setMenuCheck}
        pathname={pathname}
      />
    </div>
  );
  // main sidebar function
  const sidebarMain = () => (
    <div className="w-full h-full">
      <div className="w-full flex flex-col gap-8 px-1 lg:px-6  mx-auto">
        <div className={`flex items-center justify-center gap-2`}>
          <Link href="/">
            <Image
              src={logoSrc}
              width={150}
              height={25}
              alt={`procarma logo ${new Date().getTime()}`}
            />
          </Link>
        </div>

        <UserSettingMenu />

        <div className="w-full flex flex-col justify-center items-center gap-4 text-sm">
          {sidebarMenus()}
          <div className="mt-6 bg-card w-full h-auto rounded-xl flex items-center justify-center py-5 border border-[rgba(245,239,235,0)]">
            <NeedHelp />
          </div>
          &nbsp;
        </div>
      </div>
    </div>
  );

  const WrapperFixedSidebar = ({ isOpen, children }) => (
    <div
      style={{ width: fixedWidth }}
      className={`bg-layout shadow fixed z-50 sidebar:z-0 top-0  pt-8 min-h-screen max-h-full overflow-y-auto  transition-transform transform Transition  ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }
      `}
    >
      <div className="z-50 sidebar:z-0 ">{children}</div>
    </div>
  );
  return (
    <div className="z-sidebar">
      <div className={`relative flex  `}>
        <div className="">
          <WrapperFixedSidebar isOpen={isOpen}>
            {sidebarMain()}
          </WrapperFixedSidebar>
        </div>
        {/* Toggle Button */}
        <div
          style={
            isOpen
              ? { marginLeft: `calc(${fixedWidth} - 40px)` }
              : { marginLeft: 0 }
          }
          className={`fixed z-50 mt-1 cursor-pointer hover:text-siteBlueHover Transition top-0 left-0 `}
          onClick={() => setIsOpen(!isOpen)}
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
            // <IoMdMenu className="text-xl" />
            <Image
              src="/images/sidebar-left-closed.svg"
              alt="left close"
              width={30}
              height={30}
              className="w-6"
            />
            // <IoMdMenu className="text-xl" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
