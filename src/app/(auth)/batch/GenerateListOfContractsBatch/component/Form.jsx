import React, { useContext, useEffect } from "react";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { CustomButton } from "@/components/cui/button/CustomButton";

import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";
import { formatDate, Toastify } from "@/utils/helpers";
import { fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import FixedDateParameterButton from "@/components/FixedDateParameterButton";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { useDispatch } from "react-redux";

const planData = [
  {
    name: "All",
    value: -1,
  },
  {
    name: "Maintenance",
    value: 1,
  },
  {
    name: "Loyalty",
    value: 2,
  },
];
const tempBatchData = [
  {
    name: "Yes",
    value: 1,
  },
  {
    name: "No",
    value: 0,
  },
];

const Form = ({
  dealer,
  setdealer,
  plan,
  setPlan,
  FixedDateParameter,
  setFixedDateParameter,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  currentPage,
  setCurrentPage,
  setLoading,
  setCurrentItems,
  setTotalBatch,
  offSet,
  setSelectedRows,
}) => {
  const { GLOBAL_DEALERS_INFO, auth, Token } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const reducer = setReducer("GenerateListOfContractsBatch");
  let dealerOptions =
    GLOBAL_DEALERS_INFO?.map((dealer) => {
      return { text: dealer.DealerTitle, value: dealer.DealerID };
    }) || [];

  const fetchListOfContractsBatch = async ({
    dateParameter,
    date,
    offSet = "0",
  }) => {
    if (offSet === "0") {
      setCurrentPage(1);
    }
    let FromDate = "";
    let ToDate = "";

    let fixedDateParameter = FixedDateParameter;
    if (dateParameter) {
      fixedDateParameter = dateParameter;
      setFixedDateParameter(dateParameter);
      setStartDate(null);
      setEndDate(null);
    } else {
      FromDate = startDate ? formatDate(startDate) : "";
      ToDate = endDate ? formatDate(endDate) : "";
    }
    if (date) {
      fixedDateParameter = "";
      setFixedDateParameter("");
      // if (!FromDate && !ToDate) {
      //   return Toastify("error", "Please select a date");
      // }
    }

    if (!dealer) {
      Toastify("error", "Please select a dealer");
      setLoading(false);
      return;
    }
    const data = {
      DealerID: dealer,
      PlanType: plan,
      FixedDateParameter: fixedDateParameter,
      FromDate,
      ToDate,
      offset: offSet,
    };
    const res = await fetchPostObj({
      api: "batch/GenerateListOfContractsBatch",
      auth,
      Token,
      data,
      setLoading,
      showToast: true,
    });
    if (res) {
      setCurrentItems(res?.ReturnBatchContracts);
      setTotalBatch(res?.total_batch);
      dispatch(reducer({ ...res, state: { ...data, currentPage } }));
    }
  };

  useEffect(() => {
    if (offSet) {
      fetchListOfContractsBatch({
        offSet,
      });
      setSelectedRows([]);
    }
  }, [offSet]);
  return (
    <div className="w-full flex flex-col gap-4">
      <ShadowContainer>
        <div className="w-full flex justify-between items-center gap-6">
          <div className="flex justify-center items-center font-extrabold ">
            Search By Dealer
          </div>
          <div className=" flex-1 gap-2">
            <Select
              options={dealerOptions}
              placeholder={"Select Dealer"}
              value={dealer}
              setvalue={(e) => setdealer(e)}
            />
          </div>
          <div className=" flex-1 ">
            <FixedDateParameterButton
              action={fetchListOfContractsBatch}
              FixedDateParameter={FixedDateParameter}
            />
          </div>
        </div>
      </ShadowContainer>
      <ShadowContainer>
        <div className="flex justify-between flex-wrap gap-4 w-fit sm:w-full">
          <div className="flex justify-center items-center font-extrabold">
            Search By Contract Sale Date
          </div>
          <div className="min-w-80 flex-1">
            <Input
              value={startDate}
              type="date"
              onChange={(event) => setStartDate(event.target.value)}
              placeholder="Start Date"
              className={`min-w-80 flex-1`}
            />
          </div>
          <div className="min-w-80 flex-1">
            <Input
              value={endDate}
              type="date"
              onChange={(event) => setEndDate(event.target.value)}
              placeholder="End Date"
              className={`min-w-80 flex-1 `}
            />
          </div>
          <div className="min-w-80 flex-1">
            <Select
              placeholder={"Select Plan"}
              className="rounded-xl font-light"
              options={planData}
              value={plan}
              setvalue={(e) => setPlan(e)}
              keyTitle={"name"}
            />
          </div>
          <CustomButton
            onClick={() => {
              fetchListOfContractsBatch({ date: true, offSet: "0" });
            }}
          >
            Search
          </CustomButton>
        </div>
      </ShadowContainer>
    </div>
  );
};

export default Form;
