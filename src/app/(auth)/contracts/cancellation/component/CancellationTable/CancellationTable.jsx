"use client";
import { GlobalContext } from "@/app/Provider";
import Table from "@/components/cui/table";
import { fetchPostObj } from "@/utils/action/function";
import { openHtmlInNewTab, unixTimestampToDate } from "@/utils/helpers";
import Image from "next/image";

import React, { useContext } from "react";
import RenderContractNo from "./RenderContractNo";

const CancellationTable = ({
  data,
  total,
  setLoading,
  offSet,
  currentPage,
  dataLimit,
  handlePageChange,
}) => {
  const { auth, Token } = useContext(GlobalContext);

  const handlePrintCancellationData = async (dataInput) => {
    const data = {
      ContractID: dataInput,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "marketing/printcancelcontract",
      data,
      setLoading,
      showToast: true,
    });

    if (res) {
      openHtmlInNewTab(res.html);
    }
  };

  const RenderSaleDate = ({ cell }) => unixTimestampToDate(cell);
  const RenderActivity = ({ cell, row }) => {
    return cell === "C" ? (
      <Image
        className="cursor-pointer"
        onClick={() => handlePrintCancellationData(row.ContractID)}
        src="/images/remit-print.png"
        alt="Print Remit"
        width={20}
        height={20}
      />
    ) : (
      ""
    );
  };

  const RowNumber = ({ index }) => {
    return Number(offSet ? offSet : dataLimit - dataLimit) + index + 1;
  };
  const columns = [
    { title: "Serial No.", render: RowNumber },
    {
      title: "Contract No / Transaction",
      render: ({ row }) => <RenderContractNo row={row} />,
    },
    { title: "First Name", accessor: "CustomerFName" },
    { title: "Last Name", accessor: "CustomerLName" },
    { title: "Selling Rep Name", accessor: "FIManagerName" },
    { title: "Make", accessor: "Make" },
    { title: "VIN", accessor: "VIN" },
    { title: "Sale Date", accessor: "SaleDate", render: RenderSaleDate },
    { title: "Activity", accessor: "Status", render: RenderActivity },
  ];
  return (
    <div>
      <Table
        rowId={"ContractID"}
        showHeader={true}
        data={data}
        columns={columns}
        showPagination={true}
        total={total}
        pagination={{
          currentPage,
          setCurrentPage: handlePageChange,
          dataLimit,
        }}
      />
    </div>
  );
};

export default CancellationTable;
