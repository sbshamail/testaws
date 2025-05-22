"use client";
import React, { useContext, useState, useEffect } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/app/Provider";

import toast from "react-hot-toast";

import GenerateBatchModal from "../../dashboard/components/Modals/GenerateBatchModal";

import Form from "./component/Form";
import ContractsBatchTable from "./component/ContractsBatchTable";
import { CustomButton } from "@/components/cui/button/CustomButton";
import Footer from "./component/Footer";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { useSelection } from "@/reduxStore/function";

export const FixedDateParameteroptions = ["ITD", "YTD", "MTD"];

const Page = () => {
  const router = useRouter();
  const selection = useSelection("GenerateListOfContractsBatch");
  const { ReturnBatchContracts, total_batch, state } = selection || {};

  const [dealer, setdealer] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("-1");

  const [FixedDateParameter, setFixedDateParameter] = useState("ITD");
  const [popUpModalData, setPopUpModalData] = useState(null);

  const [batchModal, setBatchModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBatch, setTotalBatch] = useState(null);
  const [currentItems, setCurrentItems] = useState(null);

  const [offSet, setOffSet] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  function handleViewBatchRoute() {
    router.push("/batch/ListBatches");
  }

  useEffect(() => {
    if (state) {
      setdealer(state?.DealerID);
      setFixedDateParameter(state?.FixedDateParameter);
      setStartDate(state?.FromDate);
      setEndDate(state?.ToDate);
      setTotalBatch(total_batch);
      setCurrentItems(ReturnBatchContracts);
      setCurrentPage(state?.currentPage ?? 1);
    }
  }, [selection]);
  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />
      <div className="w-full flex flex-col  mt-5 gap-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-xl my-5">CONTRACT - GENERATE BATCH</h1>
          <div className="flex gap-3 items-center">
            <CustomButton onClick={handleViewBatchRoute}>
              View Batches
            </CustomButton>
          </div>
        </div>
        <Form
          dealer={dealer}
          setdealer={setdealer}
          plan={plan}
          setPlan={setPlan}
          FixedDateParameter={FixedDateParameter}
          setFixedDateParameter={setFixedDateParameter}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setLoading={setLoading}
          setCurrentItems={setCurrentItems}
          setTotalBatch={setTotalBatch}
          offSet={offSet}
          setSelectedRows={setSelectedRows}
        />
        <ContractsBatchTable
          data={currentItems}
          totalBatch={totalBatch}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          offSet={offSet}
          setOffSet={setOffSet}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          setLoading={setLoading}
        />

        <Footer
          currentItems={currentItems}
          selectedRows={selectedRows}
          setBatchModal={setBatchModal}
          offSet={offSet}
          setOffSet={setOffSet}
          dealer={dealer}
          setLoading={setLoading}
          startDate={startDate}
          endDate={endDate}
          FixedDateParameter={FixedDateParameter}
          PlanType={plan}
          setPopUpModalData={setPopUpModalData}
        />
      </div>

      <div>
        {batchModal && (
          <GenerateBatchModal
            popUpModalData={popUpModalData}
            setPopUpModalData={setPopUpModalData}
            open={batchModal}
            close={() => setBatchModal(false)}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default Page;
