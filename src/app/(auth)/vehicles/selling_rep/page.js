"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import { AdminLayoutContext } from "../../layout";
import Button from "@/app/Components/Button";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";
import { BatchStatusList } from "@/app/fixedvalues";
import RadioWithTextBox from "@/app/Components/Inputs/RadioWithTextBox";
import ImageUploadField from "@/app/Components/Inputs/ImageUploadField";
const Page = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const [dealer, setdealer] = useState(admindealeroptions[1]?.value);
  const [status, setstatus] = useState("P");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [sellingrep, setsellingrep] = useState("");
  const [sellingrep2, setsellingrep2] = useState("");
  const [dname, setdname] = useState("");
  const [person, setperson] = useState("PSR");
  const [signature, setsignature] = useState(null);
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-bold text-xl my-5">SELLING - REP</h1>
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
                <RadioWithTextBox
                  option={{ value: "PSR", text: "Product Selling Rep" }}
                  value={person}
                  setvalue={setperson}
                  bg="bg-gray-200"
                />
                <RadioWithTextBox
                  option={{ value: "SP", text: "Sales Person" }}
                  value={person}
                  setvalue={setperson}
                  bg="bg-gray-200"
                />
                <Input
                  placeholder="Selling Rep"
                  value={sellingrep}
                  setvalue={setsellingrep}
                  type="text"
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
                  label="Selling Rep"
                  placeholder="Selling Rep"
                  value={sellingrep2}
                  setvalue={setsellingrep2}
                  type="text"
                  bgcolor={"gray-200"}
                />
                <Input
                  label="Display Name"
                  placeholder="Display Name"
                  value={dname}
                  setvalue={setdname}
                  type="text"
                  bgcolor={"gray-200"}
                />
                <ImageUploadField
                  label="Signature"
                  uploadedimage={signature}
                  setuploadedimage={setsignature}
                />
                <Button text="Add" onClick bg="siteBlue" />
              </div>
            </div>
            <div className="w-full text-sm">
              <div className="flex flex-row items-center  font-bold border-b  bg-gray-200 h-14 gap-2 p-2 drop-shadow-md rounded-t-lg ">
                <div className="w-1/2"></div>
                <div className="w-full">Selling Rep</div>
                <div className="w-full">Dealership</div>
                <div className="w-full">Signature</div>
                <div className="w-full">Status</div>
                <div className="w-full">Total Contracts</div>
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
