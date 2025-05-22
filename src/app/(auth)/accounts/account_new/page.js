"use client";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Tab1 from "./Tab1";
import Button from "@/app/Components/Button";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Tab6 from "./Tab6";
import Tab7 from "./Tab7";

const Page = () => {
  const [tab, settab] = useState(0);
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-semibold text-xl my-5">Account Setup</h1>
        <ShadowContainer>
          <div className="w-full flex gap-5 justify-between">
            <Sidebar tab={tab} settab={settab} />
            <div className="w-3/4">
              {tab == 0 && <Tab1 />}
              {tab == 1 && <Tab2 />}
              {tab == 2 && <Tab3 />}
              {tab == 5 && <Tab6 />}
              {tab == 6 && <Tab7 />}
            </div>
          </div>
          <div className="w-full flex flex-col items-end gap-5 mt-5">
            <Button text="Save" bg="siteBlue" />
            <div className="w-full flex gap-5 justify-end">
              <Button text="Previous" bg="green-500" />
              <Button text="Next" bg="green-500" />
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
};

export default Page;
