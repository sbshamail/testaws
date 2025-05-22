"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import { AdminLayoutContext } from "../../layout";
import Button from "@/app/Components/Button";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";
const Page = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const [dealer, setdealer] = useState(admindealeroptions[0].value);
  const [bankname, setbankname] = useState("");
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-bold text-xl my-5">BANK - LIST</h1>
        <ShadowContainer>
          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex justify-between">
              <div className="w-1/3 flex flex-col gap-5">
                <Select
                  label="Dealer"
                  value={dealer}
                  setvalue={setdealer}
                  options={admindealeroptions}
                  bgcolor={"gray-200"}
                />
                <Button text="Search" onClick bg="amber-400" />
              </div>
              <div className="w-1/3 flex flex-col gap-5">
                <Select
                  label="Dealer"
                  value={dealer}
                  setvalue={setdealer}
                  options={admindealeroptions}
                  bgcolor={"gray-200"}
                />
                <Input
                  label="Bank Name"
                  placeholder="Bank Name"
                  value={bankname}
                  setvalue={setbankname}
                  type="text"
                  bgcolor={"gray-200"}
                />
                <Button text="Add" onClick bg="siteBlue" />
              </div>
            </div>
            <div className="w-full text-sm">
              <div className="flex flex-row items-center  font-bold border-b  bg-gray-200 h-14 gap-2 p-2 drop-shadow-md rounded-t-lg ">
                <div className="w-1/2"></div>
                <div className="w-full">Bank ID</div>
                <div className="w-full">Account</div>
                <div className="w-full">Bank Name</div>
                <div className="w-full">Activity</div>
              </div>
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
};

export default Page;
