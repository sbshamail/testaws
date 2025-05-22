"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import { AdminLayoutContext } from "@/app/(auth)/layout";
import Button from "@/app/Components/Button";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";

import { PlanStatusList1, PurpleBallPlanList } from "@/app/fixedvalues";
const Page = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const [dealer, setdealer] = useState(admindealeroptions[1]?.value);
  const [planname, setplanname] = useState("");
  const [status1, setstatus1] = useState("");
  const [status2, setstatus2] = useState("");
  return (
    <PageContainer>
      <div className="w-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-xl my-5">
            PLAN - PURPLE BALL PLAN LIST
          </h1>
          <Button text="Marked Services" bg="siteBlue" />
        </div>
        <ShadowContainer>
          <div className="w-full flex flex-col gap-10">
            <div className="flex gap-5 items-end">
              <Select
                label="Account"
                value={dealer}
                setvalue={setdealer}
                options={admindealeroptions}
                bgcolor={"gray-200"}
              />
              <Select
                label="Status"
                value={status1}
                setvalue={setstatus1}
                bgcolor={"gray-200"}
                options={PlanStatusList1}
              />
              <Select
                label="Plan"
                value={status2}
                setvalue={setstatus2}
                bgcolor={"gray-200"}
                options={PurpleBallPlanList}
              />
              <Input
                label="Plan Name"
                placeholder="Plan Name"
                value={planname}
                setvalue={setplanname}
                bgcolor={"gray-200"}
              />

              <Button text="Search" bg="siteBlue" />
            </div>
            <div className="w-full text-sm">
              <div className="flex flex-row items-center  font-bold border-b  bg-gray-200 gap-2 p-2 drop-shadow-md rounded-t-lg ">
                <div className="w-full">Plan ID</div>
                <div className="w-full">Plan Title</div>
                <div className="w-full">Date Created</div>
                <div className="w-full">Plan Price</div>
                <div className="w-full">Status</div>
                <div className="w-full">Count</div>
                <div className="w-1/2"></div>
              </div>
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
};

export default Page;
