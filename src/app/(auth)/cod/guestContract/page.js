"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import { AdminLayoutContext } from "../../layout";
import Button from "@/app/Components/Button";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";
import { FixedDateParameteroptions } from "@/app/fixedvalues";
const Page = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const [dealer, setdealer] = useState(admindealeroptions[1]?.value);
  const [FixedDateParameter, setFixedDateParameter] = useState("ITD");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-bold text-xl my-5"></h1>
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
            </div>
            <div className="flex gap-5 items-end">
              <div className="flex gap-2 items-center">
                {FixedDateParameteroptions.map((item, i) => (
                  <button
                    onClick={() => {
                      setFixedDateParameter(item);
                    }}
                    key={i}
                    className={`w-10 h-10 rounded-lg text-white bg-${
                      FixedDateParameter == item ? "siteBlue" : "gray-200"
                    } `}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <Input
                placeholder="Contract No"
                value={startdate}
                setvalue={setstartdate}
                type="text"
                bgcolor={"gray-200"}
              />
              <Input
                placeholder="Email"
                value={enddate}
                setvalue={setenddate}
                type="email"
                bgcolor={"gray-200"}
              />
              <Button text="Search" bg="siteBlue" />
              <Button text="Reset" bg="siteBlue" />
            </div>
            <div className="w-full text-sm">
              <div className="flex flex-row items-center  font-bold border-b  bg-gray-200 h-14 gap-2 p-2 drop-shadow-md rounded-t-lg ">
                <div className="w-1/2"></div>
                <div className="w-full">CONTRACT NUM</div>
                <div className="w-full">CUSTOMER NAME</div>
                <div className="w-full">CREATED DATE</div>
                <div className="w-1/2">ACTION</div>
              </div>
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
};

export default Page;
