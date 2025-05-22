"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import { AdminLayoutContext } from "@/app/(auth)/layout";
import Button from "@/app/Components/Button";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";

import { PlanStatusList1, HidePricePlanList } from "@/app/fixedvalues";
const Page = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const [dealer, setdealer] = useState(admindealeroptions[1]?.value);
  const [presetname, setpresetname] = useState("");
  const [status1, setstatus1] = useState("");
  const [status2, setstatus2] = useState("C");
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-bold text-xl my-5">PLAN - PRESETS</h1>
        <ShadowContainer>
          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex gap-5 items-end">
              <div className="w-1/2">
                <Input
                  label="Preset Name"
                  placeholder="Preset Name"
                  value={presetname}
                  setvalue={setpresetname}
                  bgcolor={"gray-200"}
                />
              </div>
              <Button text="Search" bg="siteBlue" />
            </div>
            <div className="w-full flex gap-5 items-end">
              <div className="w-1/2">
                <Select
                  label="Account"
                  value={dealer}
                  setvalue={setdealer}
                  options={admindealeroptions}
                  bgcolor={"gray-200"}
                />
              </div>
              <Button text="Add Preset" bg="siteBlue" />
            </div>
            <div className="w-full flex gap-5 items-end">
              <div className="w-1/2">
                <Select
                  label="Status"
                  value={status1}
                  setvalue={setstatus1}
                  bgcolor={"gray-200"}
                  options={PlanStatusList1}
                />
              </div>
              <Button text="Export" bg="siteBlue" />
            </div>
            <div className="w-full text-sm">
              <div className="flex flex-row items-center  font-bold border-b  bg-gray-200 gap-2 p-2 drop-shadow-md rounded-t-lg ">
                <div className="w-full">Preset ID</div>
                <div className="w-full">Preset</div>
                <div className="w-full">Date Created</div>
                <div className="w-full">Status</div>
                <div className="w-full">Action</div>
              </div>
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
};

export default Page;
