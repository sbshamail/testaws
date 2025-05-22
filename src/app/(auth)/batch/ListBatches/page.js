"use client";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";

import { useRouter } from "next/navigation";

import ListBatchTable from "./component/ListBatchTable";
import FormListBatch from "./component/FormListBatch";
import { useSelection } from "@/reduxStore/function";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";

const Page = () => {
  const router = useRouter();
  const [dealer, setdealer] = useState("");
  const [loading, setLoading] = useState(false);
  const [FixedDateParameter, setFixedDateParameter] = useState("ITD");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBatch, setTotalBatch] = useState(null);
  const [currentItems, setCurrentItems] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [offSet, setOffSet] = useState(null);

  function handleGenerateBatchRoute() {
    router.push("/batch/GenerateListOfContractsBatch");
  }
  const selection = useSelection("listbatch");
  const { ListAddedBatches, total_batch, state } = selection || {};
  useEffect(() => {
    if (state) {
      setdealer(state?.DealerID);
      setFixedDateParameter(state?.FixedDateParameter);
      setStartDate(state?.FromDate);
      setEndDate(state?.ToDate);
      setTotalBatch(total_batch);
      setCurrentItems(ListAddedBatches);
      setCurrentPage(state?.currentPage ?? 1);
    }
  }, [selection]);
  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />
      <div className="flex flex-col w-full  mt-5 gap-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-xl my-5">CONTRACT - VIEW BATCHES</h1>
          <div className="flex gap-3 items-center">
            <CustomButton onClick={handleGenerateBatchRoute}>
              Generate Batches
            </CustomButton>
          </div>
        </div>

        <FormListBatch
          dealer={dealer}
          setdealer={setdealer}
          FixedDateParameter={FixedDateParameter}
          setFixedDateParameter={setFixedDateParameter}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setLoading={setLoading}
          setCurrentItems={setCurrentItems}
          setTotalBatch={setTotalBatch}
          offSet={offSet}
        />

        <ListBatchTable
          data={currentItems}
          totalBatch={totalBatch}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setOffSet={setOffSet}
          setLoading={setLoading}
          FixedDateParameter={FixedDateParameter}
          dealer={dealer}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </PageContainer>
  );
};

export default Page;
