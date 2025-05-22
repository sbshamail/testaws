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
  const [dealer, setdealer] = useState(admindealeroptions[1]?.value);
  const [vehiclemake, setvehiclemake] = useState("");
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-bold text-xl my-5">GIFTING - MAKE</h1>
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
              <Input
                label="Vehicle Make"
                placeholder="Vehicle Make"
                value={vehiclemake}
                setvalue={setvehiclemake}
                bgcolor={"gray-200"}
              />
              <Button text="Search" bg="siteBlue" />
            </div>
            <div className="w-full text-sm">
              <div className="flex flex-row items-center  font-bold border-b  bg-gray-200 gap-2 p-2 drop-shadow-md rounded-t-lg ">
                <div className="w-full">Dealership</div>
                <div className="w-full">Vehicle (ID) Make</div>
                <div className="w-full">Total Contract</div>
                <div className="w-1/2"></div>
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
