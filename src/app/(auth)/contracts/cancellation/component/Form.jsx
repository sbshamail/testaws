import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Input from "@/app/Components/Inputs/Input";
import SearchByInput from "@/app/Components/Inputs/SearchByInput";
import Select from "@/app/Components/Inputs/Select";
import { CustomButton } from "@/components/cui/button/CustomButton";
import React from "react";

const Form = ({
  contractno,
  setcontractno,
  vinno,
  setvinno,
  customername,
  setcustomername,
  dealerOptions,
  setdealer,
  dealer,
  statusList,
  setcontractstatus,
  contractstatus,
  startDate,
  setStartDate,
  setEndDate,
  endDate,
  fetchListOfCancellationData,
  setFilterSearchValue,
}) => {
  return (
    <>
      <ShadowContainer>
        <div className="w-full flex justify-between items-center flex-wrap gap-8">
          <div className="w-full min-w-60 flex-1">
            <SearchByInput
              value={contractno}
              setvalue={setcontractno}
              placeholder="Search By Contract No"
              onClick={() => {
                fetchListOfCancellationData("contract", 0);
                setFilterSearchValue("contract");
              }}
            />
          </div>

          <div className="w-full min-w-60 flex-1">
            <SearchByInput
              value={vinno}
              setvalue={setvinno}
              placeholder="Search By VIN No"
              onClick={() => {
                fetchListOfCancellationData("vin", 0);
                setFilterSearchValue("vin");
              }}
            />
          </div>

          <div className="w-full min-w-60 flex-1">
            <SearchByInput
              value={customername}
              setvalue={setcustomername}
              placeholder="Search By Customer Name"
              onClick={() => {
                fetchListOfCancellationData("customer", 0);
                setFilterSearchValue("customer");
              }}
            />
          </div>
        </div>
      </ShadowContainer>

      <ShadowContainer>
        <div className="w-full flex flex-wrap items-end gap-4 md:gap-6 lg:gap-8">
          <Select
            label="Select Dealer"
            placeholder="Select Dealer"
            options={dealerOptions}
            setvalue={setdealer}
            value={dealer}
            className="min-w-[200px] flex-1"
          />

          <Select
            label="Select Status"
            placeholder="Select Status"
            options={statusList}
            setvalue={setcontractstatus}
            value={contractstatus}
            className="min-w-[200px] flex-1"
          />

          <Input
            type="date"
            label="Start Date"
            value={startDate}
            setvalue={(date) => setStartDate(date)}
            className="min-w-[180px] flex-1"
          />

          <Input
            type="date"
            label="End Date"
            value={endDate}
            setvalue={(date) => setEndDate(date)}
            className="min-w-[180px] flex-1"
          />

          {/* Button wrapped in a div with invisible label for alignment */}
          <div className="min-w-[120px] flex-1 flex flex-col">
            <label className="text-transparent">Search</label>
            <CustomButton
              onClick={() => {
                fetchListOfCancellationData(null, 0);
                setFilterSearchValue(null);
              }}
              className="px-4 py-2 w-full"
            >
              Search
            </CustomButton>
          </div>
        </div>
      </ShadowContainer>
    </>
  );
};

export default Form;
