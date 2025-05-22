"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/app/Components/containers/PageContainer";
import { GlobalContext } from "@/app/Provider";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

import { unixTimestampToDate } from "@/app/functions";

import { FaRegTrashAlt } from "react-icons/fa";

import { GiSpanner } from "react-icons/gi";
import toast from "react-hot-toast";
import Table from "@/components/cui/table";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { fetchPost } from "@/utils/action/function";
import { objectToFormData } from "@/utils/helpers";
import { IoMdArrowBack } from "react-icons/io";

function Page({ params }) {
  // const params = useParams();
  const router = useRouter();
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE, auth, Token } =
    useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [data, setData] = useState(null);

  const decodedId = decodeURIComponent(params.id);

  // Split the decoded ID string at '=' and get the last part
  const idValue = decodedId.split("=").pop();

  const fetchListOfContractsUnderBatch = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    setLoading(true);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("BatchID", idValue);
    selectedRows.forEach((row) => {
      formdata.append("BatchedContractsIDs[]", row?.BatchContractid);
    });

    fetch("https://mypcp.us/webservices/batch/remitbatch", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success === 1) {
          setCurrentItems(res?.BatchedContractsArray);
          setData(res);
          setLoading(false);
          // console.log(res);
        } else {
          toast.error("Error Found");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.error("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (GLOBAL_RESPONSE) {
      fetchListOfContractsUnderBatch();
    }
  }, [GLOBAL_RESPONSE]);

  const handleDeleteBatch = async () => {
    let formdata = new FormData();
    selectedRows.forEach((row) => {
      formdata.append("selected_ids[]", row?.BatchContractid);
    });
    const data = {
      ...auth,
      BatchID: idValue,
    };
    const formData = await objectToFormData(data, formdata);
    const res = await fetchPost({
      formdata: formData,
      api: "batch/deletecontracts",

      token: Token,
    });
    fetchListOfContractsUnderBatch();
  };
  const headerAction = () => {
    return (
      <CustomButton
        onClick={handleDeleteBatch}
        Icon={FaRegTrashAlt}
        variant="danger"
        disabled={selectedRows.length === 0}
      >
        Delete
      </CustomButton>
    );
  };
  const BackToPage = () => {
    router.back();
  };
  const RenderContractNo = ({ row }) => (
    <div className="flex gap-2">
      {row?.ContractNo}{" "}
      {parseInt(row?.TotalUsedServices) > 0 ? <GiSpanner /> : ""}
    </div>
  );
  const RenderCustomerName = ({ row }) => (
    <span>
      {row?.CustomerFName} {row?.CustomerLName}
    </span>
  );
  const RenderSaleDate = ({ row }) => unixTimestampToDate(row?.SaleDate);
  const RenderContractStatus = ({ cell }) => (
    <div>
      {cell === "P" || cell === "p"
        ? "Pending"
        : cell === "R" || cell === "r"
        ? "Received"
        : ""}
    </div>
  );

  const columns = [
    { title: "#", render: ({ index }) => index + 1 },
    { title: "Contract No", render: RenderContractNo },
    { title: "Customer Name", render: RenderCustomerName },
    { title: "Plan", accessor: "PlanDescription" },
    { title: "Selling Rep Name", accessor: "FIManagerName" },
    { title: "Make", accessor: "Make" },
    { title: "VIN", accessor: "VIN" },
    { title: "Sale Date", render: RenderSaleDate },
    {
      title: "Contract Status",
      accessor: "ContractStatus",
      render: RenderContractStatus,
    },
    { title: "Amount", accessor: "ContractRemitAmount", type: "currency" },
  ];

  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />

      <div className="w-full flex flex-col ">
        <div className=" flex items-center py-4 gap-2">
          <IoMdArrowBack
            onClick={BackToPage}
            className="hover:text-primary/70  text-2xl cursor-pointer Transition"
          />
          <h1 className="font-bold text-xl ">LIST OF CONTRACTS UNDER BATCH</h1>
        </div>
        {currentItems?.length && (
          <ShadowContainer
            className={
              "w-max rounded-br-none border border-border border-b-0 mb-2"
            }
          >
            <div className="flex flex-col gap-1 ">
              <div className="flex items-center">
                <div className="text-lg ">
                  Account: {data?.GetDealerDetails?.DealerTitle}
                </div>
              </div>
              <div className="flex ">
                <div className="text-lg ">
                  Batch No: {data?.GetBatchStatus?.BatchNo}
                </div>
              </div>
              <div>Total: {data?.GetBatchStatus?.TotalContractsAtCreation}</div>
            </div>
          </ShadowContainer>
        )}
        {data?.GetBatchStatus?.Status === "R" && (
          <p className="p-2 text-center bg-green-300/80 text-green-900 rounded-lg my-2">
            Payment Recieved
          </p>
        )}
        <Table
          rowId={"ContractID"}
          data={currentItems}
          columns={columns}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          showHeader={true}
          headerAction={headerAction}
          wrapperClassName={"w-full"}
        />
      </div>
    </PageContainer>
  );
}

export default Page;
