import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { Autocomplete, AutocompleteItem, DatePicker } from "@nextui-org/react";
import Select from "@/app/Components/Inputs/Select";
import React from "react";
import { CustomButton } from "@/components/cui/button/CustomButton";
import FilterButton from "@/components/cui/button/FilterButton";
import Input from "@/app/Components/Inputs/Input";
import { inputFormatDate } from "@/utils/helpers";
import FixedDateParameterButton from "@/components/FixedDateParameterButton";
const Header = ({
  dealerOptions,
  dealer,
  handleSelectionChange,
  allLevels,
  setLevel,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  FixedDateParameter,
  fetchReports,
  level,
  expirationType,
  expirationTypes,
  setExpirationType,
  expDate,
  setExpDate,
  setSubscriptionPaymentStatus,
  territoryCodes,
  setAuthTerritoryCode,
  //service redemption
  serviceRedemptionLoad,
  paidOutStatus,
  setPaidOutStatus,
  rptService,
  setRptService,
  RedemptionLoadData,
  setRedemptionLoadData,
  RedemptionFilter,
  setRedemptionFilter,
  subscriptionPaymentStatus,
}) => {
  const { plans, rptServiceList, paidOutStatusList } = serviceRedemptionLoad;

  const levelCondition = () => (
    <div className="w-full  grid grid-cols-2 gap-2">
      {(level === "5" || level === "6") && (
        <>
          <Select
            options={expirationTypes}
            value={expirationType} // Pass current value
            setvalue={setExpirationType} // Update state
            placeholder="Select Expiration Type"
            bgcolor="bg-[#ffffff]"
            width="full"
            keyTitle="value"
            keyValue="key"
          />

          <div className=" ">
            <Input
              type={"date"}
              disable={true}
              value={inputFormatDate(new Date())}
              className={"p-[10px] m-0 rounded-xl"}
            />
          </div>
        </>
      )}

      {level === "2" && (
        <>
          <Input
            type={"date"}
            disable={true}
            value={inputFormatDate(new Date())}
          />
          <Select
            options={rptServiceList}
            value={rptService} // Pass current value
            setvalue={setRptService} // Update state
            onlyLabel="Service"
            placeholder={"Service"}
            bgcolor="bg-[#ffffff]"
            width="full"
          />
          <Select
            options={plans}
            value={subscriptionPaymentStatus} // Pass current value
            setvalue={setSubscriptionPaymentStatus} // Update state
            onlyLabel="Plan"
            placeholder={"Plan"}
            bgcolor="bg-[#ffffff]"
            width="full"
            keyTitle="PlanDescription"
            keyValue="PlanID"
          />
          <Select
            options={paidOutStatusList}
            value={paidOutStatus} // Pass current value
            setvalue={setPaidOutStatus} // Update state
            onlyLabel="Status"
            placeholder={"Status"}
            bgcolor="bg-[#ffffff]"
            width="full"
          />

          <div></div>
        </>
      )}
      {level === "68" && (
        <>
          <Autocomplete
            placeholder="Select Territory Code"
            className="flex-1 min-w-[300px] max-w-[200px] rounded-xl font-light"
            defaultItems={territoryCodes}
            onSelectionChange={(key) => {
              const selectedItem = territoryCodes.find(
                (item) => item.TerritoryCode === key
              );
              setAuthTerritoryCode(selectedItem?.TerritoryCode);
            }}
          >
            {territoryCodes.map((item) => (
              <AutocompleteItem
                key={item.TerritoryCode}
                value={item.TerritoryCode}
              >
                {item.DealerTitle}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </>
      )}
    </div>
  );

  const searchDiv = () => (
    <div className=" flex  items-end flex-col md:flex-row lg:flex-col gap-2  rounded-lg">
      <div className="flex items-center gap-2 ">
        <Input
          type={"date"}
          value={startDate}
          setvalue={(date) => setStartDate(date)}
        />

        <Input
          type={"date"}
          value={inputFormatDate(endDate)}
          setvalue={(date) => setEndDate(date)}
        />
      </div>
      <div className="mt-2 flex item-center justify-between gap-2">
        <div className="min-w-60 h-full">
          <FixedDateParameterButton
            action={fetchReports}
            FixedDateParameter={FixedDateParameter}
            className={"p-3 "}
          />
        </div>
        <CustomButton onClick={() => fetchReports({ date: true, offset: 0 })}>
          Search
        </CustomButton>
      </div>
    </div>
  );
  return (
    <ShadowContainer>
      <h1 className="font-bold text-xl my-5">Reports </h1>
      <div className="flex lg:flex-nowrap flex-wrap justify-between gap-2 gap-x-6">
        <div className="w-full flex flex-col gap-2 xl:w-[60%]">
          {/* select dealer and report */}
          <div className="w-full flex gap-x-2 ">
            <Select
              label=""
              placeholder="Select Accounts"
              value={dealer}
              setvalue={handleSelectionChange}
              options={dealerOptions}
              bgcolor="white"
              className="w-full"
            />
            <Select
              label=""
              placeholder="Select Reports"
              value={level}
              setvalue={setLevel}
              options={allLevels}
              bgcolor="white"
              className="w-full"
              keyTitle={"ReportName"}
              keyValue={"ReportListId"}
            />
          </div>
          {/* conditions */}
          {levelCondition()}
        </div>
        {/* search div */}
        <div className="xl:w-[40%]">
          <div className="">{searchDiv()}</div>
          {/* service Redemption */}
          {level === "2" && (
            <div className="mt-2 flex gap-2 justify-end">
              <FilterButton
                variant={RedemptionFilter ? "primary" : "secondary"}
                wrapperClass={`max-w-48 rounded-lg ${
                  RedemptionFilter && "flex-row-reverse"
                }`}
                onClick={() => setRedemptionFilter(!RedemptionFilter)}
              >
                {!RedemptionFilter ? " Service Date" : "Payment Date"}
              </FilterButton>
              <FilterButton
                variant={RedemptionLoadData ? "primary" : "secondary"}
                wrapperClass={`max-w-48 rounded-lg ${
                  RedemptionLoadData && "flex-row-reverse"
                }`}
                onClick={() => setRedemptionLoadData(!RedemptionLoadData)}
              >
                {!RedemptionLoadData ? " Load Partially" : "Load All Results"}
              </FilterButton>
            </div>
          )}
        </div>
      </div>
    </ShadowContainer>
  );
};

export default Header;
