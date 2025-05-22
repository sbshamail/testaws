import React from "react";
import TableAction from "./TableAction";
import Table from "@/components/cui/table";
import Link from "next/link";
import { format } from "date-fns";
import ExportAll from "./ExportAll";
import { useSelection } from "@/reduxStore/function";
const ListBatchTable = ({
  data,
  totalBatch,

  currentPage,
  setCurrentPage,
  setOffSet,
  setLoading,
  FixedDateParameter,
  startDate,
  endDate,
  dealer,
}) => {
  const dataLimit = 20;
  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    if (page === 1) {
      setOffSet("0");
    } else {
      setOffSet((page - 1) * dataLimit);
    }
  };
  const RenderBatchNo = ({ row }) =>
    row.Status === "r" || row.Status === "R" ? (
      <span className="text-[#4081EC]/80 cursor-not-allowed">
        {row?.BatchNo}
      </span>
    ) : (
      <Link
        className="text-[#4081EC] hover:underline cursor-pointer"
        href={`/batch/ListBatches/RemitBatch/id=${row?.Batchid}`}
      >
        {row?.BatchNo}
      </Link>
    );
  const RenderBatchDate = ({ row }) =>
    row.Createdon
      ? format(new Date(parseInt(row.Createdon) * 1000), "MM-dd-yyyy")
      : "-";
  const BatchStatus = ({ row }) =>
    row.Status === "r" || row.Status === "R"
      ? "Recieved"
      : row.Status === "p" || row.Status === "P"
      ? "Pending"
      : "";
  const RemitDate = ({ row }) =>
    row?.RemitDate
      ? new Date(row?.RemitDate)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "-")
      : "-";
  const TotalRemit = ({ row }) =>
    row.TotalRemitAmountAtCreation
      ? Number(row.TotalRemitAmountAtCreation).toLocaleString()
      : "-";

  const RowNumber = ({ index }) => {
    return index + 1 + (currentPage - 1) * dataLimit;
  };

  const columns = [
    { title: "Serial No.", render: RowNumber },
    { title: "Batch No", render: RenderBatchNo, className: "uppercase" },
    { title: "Batch Date", render: RenderBatchDate },
    { title: "Batch Status", render: BatchStatus },
    { title: "Remit Date", render: RemitDate },
    { title: "Total Remit Amount", render: TotalRemit },
    {
      title: "Action",
      render: ({ row }) => (
        <TableAction row={row} setOffSet={setOffSet} setLoading={setLoading} />
      ),
    },
  ];
  const headerAction = () => {
    return (
      <ExportAll
        dealer={dealer}
        FixedDateParameter={FixedDateParameter}
        FromDate={startDate}
        ToDate={endDate}
        setLoading={setLoading}
      />
    );
  };
  return (
    <div className="flex ">
      <div className="w-full">
        <Table
          headerAction={headerAction}
          rowId={"ContractID"}
          columns={columns}
          data={data}
          showHeader={true}
          showPagination={true}
          total={totalBatch}
          pagination={{
            currentPage,
            setCurrentPage: handlePageChange,
            dataLimit: dataLimit,
            dataLimitDisable: true,
          }}
        />
      </div>
    </div>
  );
};

export default ListBatchTable;
