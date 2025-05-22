import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Input from "@/app/Components/Inputs/Input";
import Select from "@/app/Components/Inputs/Select";
import { GlobalContext } from "@/app/Provider";
import { CustomButton } from "@/components/cui/button/CustomButton";
import FixedDateParameterButton from "@/components/FixedDateParameterButton";
import { fetchPostObj } from "@/utils/action/function";
import { formatDate, Toastify } from "@/utils/helpers";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";

const statusData = [
  {
    text: "All",
    value: "",
  },
  {
    text: "Pending",
    value: "P",
  },
  {
    text: "Received",
    value: "R",
  },
];
const FormListBatch = ({
  dealer,
  setdealer,
  FixedDateParameter,
  setFixedDateParameter,
  setCurrentPage,
  currentPage,
  setLoading,
  setCurrentItems,
  setTotalBatch,
  offSet,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const { GLOBAL_DEALERS_INFO, auth, Token } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const reducer = setReducer("listbatch");
  const [contractNo, setContractNo] = useState("");
  const [status, setStatus] = useState("");
  const [batchNo, setBatchNo] = useState("");

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

    // if (!dealer) {
    //   Toastify("error", "Please select a dealer");
    //   setLoading(false);
    //   return;
    // }

    const data = {
      FixedDateParameter: fixedDateParameter,
      ContractNo: contractNo,
      FromDate,
      ToDate,
      BatchNo: batchNo,
      Status: status,
      offset: offSet,
      DealerID: dealer,
    };

    const res = await fetchPostObj({
      auth,
      Token,
      data,
      api: "batch/listbatches",
      setLoading,
    });

    if (res) {
      setCurrentItems(res?.ListAddedBatches);
      setTotalBatch(res?.total_batch);
      dispatch(reducer({ ...res, state: { ...data, currentPage } }));
    }
  };

  useEffect(() => {
    if (offSet) {
      fetchListOfContractsBatch({
        offSet,
      });
    }
  }, [offSet]);
  return (
    <div className="w-full flex flex-col gap-4">
      <ShadowContainer>
        <div className="w-full flex justify-between gap-6 items-center  flex-wrap ">
          <div className="flex justify-start text-center font-extrabold">
            Search By Dealer
          </div>

          <div className="min-w-60 flex-1 ">
            <Select
              value={dealer}
              placeholder={"Select Dealer"}
              setvalue={(e) => setdealer(e)}
              options={dealerOptions}
            />
          </div>
          <div className="min-w-60 flex-1 ">
            <Input
              value={contractNo}
              type="text"
              onChange={(event) => setContractNo(event.target.value)}
              placeholder="Contract No"
            />
          </div>

          <div className="min-w-60 flex-1">
            <Select
              options={statusData}
              placeholder={"Select Status"}
              setvalue={(e) => setStatus(e)}
              value={status}
            />
          </div>
          <div className="min-w-60 flex-1">
            <FixedDateParameterButton
              action={fetchListOfContractsBatch}
              FixedDateParameter={FixedDateParameter}
            />
          </div>
        </div>
      </ShadowContainer>

      <ShadowContainer>
        <div className="w-full flex justify-between gap-6 items-center  flex-wrap ">
          <div className="flex justify-start my-4 font-extrabold">
            Search By Batch Generated Date
          </div>

          <div className="min-w-60 flex-1">
            <Input
              defaultValue={startDate}
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              placeholder="Start Date"
            />
          </div>
          <div className="min-w-60 flex-1">
            <Input
              defaultValue={endDate}
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              placeholder="End Date"
            />
          </div>

          <div className="min-w-60 flex-1">
            <Input
              value={batchNo}
              type="text"
              onChange={(event) => setBatchNo(event.target.value)}
              placeholder="Batch No"
            />
          </div>
          <div className="min-w-60 flex-1">
            <CustomButton
              onClick={() => {
                fetchListOfContractsBatch({ date: true, offSet: "0" });
              }}
            >
              Search
            </CustomButton>
          </div>
        </div>
      </ShadowContainer>
    </div>
  );
};

export default FormListBatch;
