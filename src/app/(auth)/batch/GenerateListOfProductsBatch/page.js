"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

import { AdminLayoutContext } from "../../layout";
import Button from "@/app/Components/Button";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";
import { ProductsBatchTypeList, PlanTypesList } from "@/app/fixedvalues";
import SearchByInput from "@/app/Components/Inputs/SearchByInput";
import FixedDateSelector from "@/app/Components/FixedDateSelector";
const Page = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const [dealer, setdealer] = useState(admindealeroptions[1]?.value);
  const [productbatchtype, setproductbatchtype] = useState("L");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [invoiceno, setinvoiceno] = useState("");
  const [transactionno, settransactionno] = useState("");
  const [FixedDateParameter, setFixedDateParameter] = useState("ITD");
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-bold text-xl my-5">CONTRACT - GENERATE BATCH</h1>
        <ShadowContainer>
          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Search By Dealer</h2>
              <div className="w-full flex gap-5 items-end">
                <Select
                  label="Dealer"
                  value={dealer}
                  setvalue={setdealer}
                  options={admindealeroptions}
                  bgcolor={"gray-200"}
                />
                <Select
                  label="Type"
                  value={productbatchtype}
                  setvalue={setproductbatchtype}
                  options={ProductsBatchTypeList}
                  bgcolor={"gray-200"}
                />
                <FixedDateSelector
                  value={FixedDateParameter}
                  setvalue={setFixedDateParameter}
                />
                <Button text="Search" onClick bg="amber-400" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">
                Search By Contract Sale Date
              </h2>
              <div className="flex gap-5 items-end">
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
                <Button text="Search" onClick bg="amber-400" />
              </div>
            </div>
            <div className="w-full flex gap-5 items-end">
              <Input
                label="Invoice #"
                value={invoiceno}
                setvalue={setinvoiceno}
                type="text"
                bgcolor={"gray-200"}
              />
              <Input
                label="Transaction ID"
                value={transactionno}
                setvalue={settransactionno}
                type="text"
                bgcolor={"gray-200"}
              />
              <Button text="Search" onClick bg="amber-400" />
            </div>
            <div className="w-full text-sm">
              <div className="flex flex-row items-center  font-bold border-b  bg-gray-200 h-14 gap-2 p-2 drop-shadow-md rounded-t-lg ">
                <div className="w-full">CONTRACT NO/TRANSACTION</div>
                <div className="w-full">STOCK/DEAL #</div>
                <div className="w-full">FIRST NAME</div>
                <div className="w-full">LAST NAME</div>
                <div className="w-full">SELLING REP NAME</div>
                <div className="w-full">VIN</div>
                <div className="w-full">SALE DATE/ TRANSACTION DATE</div>
                <div className="w-full">PRODUCT PRICE</div>
                <div className="w-full">TRANSACTION</div>
                <div className="w-full">AMOUNT</div>
                <div className="w-full">PRODUCT NET</div>
                <div className="w-full">ACTIVITY</div>
              </div>
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
};

export default Page;
