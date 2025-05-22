"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import SearchSelect from "@/app/Components/Inputs/SearchSelect";
import { BsCardImage } from "react-icons/bs";
import Button from "@/app/Components/Button";
import RadioInput from "@/app/Components/Inputs/RadioInput";
import { AdminLayoutContext } from "../../layout";
const Page = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const [dealer, setdealer] = useState(admindealeroptions[1]?.value);
  const [searchby, setsearchby] = useState("");
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-bold text-xl my-5">IMPORT</h1>
        <ShadowContainer>
          <div className="w-full flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">
              Welcome to PCP Services redemption Import Utility!
            </h2>
            <div>
              <span className="font-semibold mr-2">Step 1:</span>
              Please download the format file in order to upload the List of
              Services redemption Contracts. After saving the file( Services
              redemption) in your system and providing the required data you can
              upload the file through Step 2 below Download Excel format
            </div>
            <div>
              <span className="font-semibold mr-2">Step 2:</span>
              Please browse your system and provide the file (Excel) in which
              you have provided Contract information and then press the button
              Import Contracts. Note: Please provide the valid
              dealership,Plan,Selling Rep Name,Make and Model name and state
              code in excelsheet. Mandatory Columns:
              contract_num,dealership,plan,sold_date,first_name,last_nam
            </div>
            <div className="w-full flex flex-col gap-1">
              <div className="w-full flex bg-gray-200 rounded">
                <button className="flex items-center gap-2 bg-siteBlue font-bold text-white p-2 rounded-tl rounded-bl shadow-inner">
                  <BsCardImage color="white" />
                  Load File
                </button>
              </div>
              <div className="self-end text-sm text-red-600">
                *Only Excel or csv file allowed
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="font-semibold">Select Dealership</div>
              <div className="w-full border rounded-md">
                <SearchSelect
                  value={dealer}
                  setvalue={setdealer}
                  list={admindealeroptions}
                  // bgcolor="white"
                  placeholder="Search Dealer"
                  property="text"
                />
              </div>
            </div>

            <div className="w-full flex justify-between bg-gray-200 rounded p-2">
              <div>Search By</div>
              <div className="w-1/4 flex flex-row gap-5">
                <RadioInput
                  option={{ text: "Contract No", value: "C" }}
                  value={searchby}
                  setvalue={setsearchby}
                />
                <RadioInput
                  option={{ text: "VIN No", value: "V" }}
                  value={searchby}
                  setvalue={setsearchby}
                />
              </div>
            </div>

            <div className="flex items-center gap-5 self-end">
              <Button text="Reset" bg="siteBlue" />
              <Button text="Import" bg="amber-400" />
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
};

export default Page;
