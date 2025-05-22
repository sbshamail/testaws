"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import { AdminLayoutContext } from "../../layout";
import Button from "@/app/Components/Button";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";
import { BatchStatusList, PlanTypesList } from "@/app/fixedvalues";
import SearchByInput from "@/app/Components/Inputs/SearchByInput";
import FixedDateSelector from "@/app/Components/FixedDateSelector";
const Page = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const [dealer, setdealer] = useState(admindealeroptions[1]?.value);
  const [plantype, setplantype] = useState("L");
  const [status, setstatus] = useState("P");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [contractno, setcontractno] = useState("");
  const [vinno, setvinno] = useState("");
  const [customername, setcustomername] = useState("");
  const [FixedDateParameter, setFixedDateParameter] = useState("ITD");
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-bold text-xl my-5">
          CONTRACT - VIEW GENERATED BATCH
        </h1>
        <ShadowContainer>
          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col gap-5">
              <h2 className="text-2xl font-semibold">Search By Dealer</h2>
              <div className="w-full flex justify-between">
                <div className="w-1/3 flex flex-col gap-5">
                  <Select
                    label="Dealer"
                    value={dealer}
                    setvalue={setdealer}
                    options={admindealeroptions}
                    bgcolor={"gray-200"}
                  />
                  <FixedDateSelector
                    value={FixedDateParameter}
                    setvalue={setFixedDateParameter}
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
                    label="Contract No"
                    placeholder="Contract No"
                    value={contractno}
                    setvalue={setcontractno}
                    type="text"
                    bgcolor={"gray-200"}
                  />
                  <Select
                    label="Status"
                    value={status}
                    setvalue={setstatus}
                    options={BatchStatusList}
                    bgcolor={"gray-200"}
                  />
                  <Button text="Search" onClick bg="amber-400" />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-5">
              <h2 className="text-2xl font-semibold">
                Search By Batch Generated Date
              </h2>
              <div className="w-full flex gap-5 items-end">
                <Input
                  label="From"
                  value={startdate}
                  setvalue={setstartdate}
                  type="date"
                  bgcolor={"gray-200"}
                />
                <Input
                  label="To"
                  value={enddate}
                  setvalue={setenddate}
                  type="date"
                  bgcolor={"gray-200"}
                />
                <Input
                  label="Batch No"
                  placeholder="Batch No"
                  value={contractno}
                  setvalue={setcontractno}
                  type="text"
                  bgcolor={"gray-200"}
                />
                <Select
                  label="Status"
                  value={status}
                  setvalue={setstatus}
                  options={BatchStatusList}
                  bgcolor={"gray-200"}
                />
                <Button text="Search" onClick bg="amber-400" />
              </div>
            </div>
            <div className="w-full text-sm">
              <div className="flex flex-row items-center  font-bold border-b  bg-gray-200 h-14 gap-2 p-2 drop-shadow-md rounded-t-lg ">
                <div className="w-1/2"></div>
                <div className="w-full">Batch Num</div>
                <div className="w-full">Batch Date</div>
                <div className="w-full">Batch Status</div>
                <div className="w-full">Remit Date</div>
                <div className="w-full">Total Net Amount</div>
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
