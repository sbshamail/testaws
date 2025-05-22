"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NeedHelp from "@/app/(auth)/Sidebar/component/NeedHelp";
import {
  DashboardSidebar,
  DashboardSidebarContent,
  DashboardSidebarTitle,
} from "@/components/cui/sidebar/DashboardSidebar";
import Header from "./Header";
import SidebarList from "@/components/cui/sidebar/SidebarContent";
import { sidebarContents } from "./sidebarList";
import { GlobalContext } from "@/app/Provider";
import NotFound from "@/app/not-found";
import { fetchCustomer } from "../fn";
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import CustomerUserSettingMenu from "./CustomerUserSetting";
import { useSelection } from "@/reduxStore/function";

const Layout = ({ children }) => {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { customer_id, ContractID } = GLOBAL_RESPONSE || {};
  const dispatch = useDispatch();
  const reducer = setReducer("customer");
  const customer = useSelection("customer");
  const { result } = customer || {};
  useEffect(() => {
    const getCustomerData = async () => {
      await fetchCustomer({
        auth,
        Token,
        ContractID,
        customer_id,
        dispatch,
        reducer,
      });
    };
    if (auth?.pcp_user_id) {
      return <NotFound />;
    } else {
      getCustomerData();
    }
  }, [customer_id, ContractID]);

  const handleEFORM = () => {
    if (result?.EnableDigitalSignature == "1") {
      window.open("", "_blank");
    }
  };
  const handleXpModel = () => {
    if (result?.xp_enable) {
      window.open("https://mypcp.us/customer/xpreward", "_blank");
    }
  };
  return (
    <div>
      <DashboardSidebar>
        <DashboardSidebarTitle>
          <div className={`mt-6 flex items-center justify-center gap-2`}>
            <Link href="/">
              <Image
                src={"/images/procarma-new-logo.svg"}
                width={150}
                height={25}
                alt={`procarma logo ${new Date().getTime()}`}
              />
            </Link>
          </div>
        </DashboardSidebarTitle>
        <DashboardSidebarContent>
          <div className="mt-6 w-full h-full flex items-center justify-center flex-col gap-6">
            <CustomerUserSettingMenu />
            <SidebarList
              data={sidebarContents({
                handleEFORM,
                handleXpModel,
                xp_enable: result?.xp_enable,
              })}
            />

            <div className="w-full flex flex-col justify-center items-center gap-4 text-sm">
              {/* {sidebarMenus()} */}
              <div className="mt-6 bg-card w-full h-auto rounded-xl flex items-center justify-center py-5 border border-[rgba(245,239,235,0)]">
                <NeedHelp />
              </div>
              &nbsp;
            </div>
          </div>
        </DashboardSidebarContent>
        <Header />
        {children}
      </DashboardSidebar>
    </div>
  );
};

export default Layout;
