import Table from "@/components/cui/table";
import { unixTimestampToDate } from "@/utils/helpers";
import React from "react";

const ContractsBatchTable = ({
  data,
  totalBatch,
  currentPage,
  setCurrentPage,
  setOffSet,
  selectedRows,
  setSelectedRows,
  setLoading,
}) => {
  const dataLimit = 100;
  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    if (page === 1) {
      setOffSet("0");
    } else {
      setOffSet((page - 1) * dataLimit);
    }
  };

  const RowNumber = ({ index }) => {
    return index + 1 + (currentPage - 1) * dataLimit;
  };

  const columns = [
    { title: "Serial No.", render: RowNumber },

    { title: "Contract No / Transaction", accessor: "ContractNo" },
    { title: "Stock/Deal #", accessor: "StockDealNo" },
    { title: "First Name", accessor: "CustomerFName" },
    { title: "Last Name", accessor: "CustomerLName" },
    { title: "Selling Rep Name", accessor: "FIManagerName" },
    { title: "Make", accessor: "Make" },
    { title: "VIN", accessor: "VIN" },
    {
      title: "Sale Date / Transaction Date",
      accessor: "",
      render: ({ row }) => unixTimestampToDate(row.SaleDate),
    },
    {
      title: "Amount",
      render: ({ row }) => (
        <div>
          {" "}
          $
          {(
            parseInt(row.RemitAmount) + parseInt(row.ClipAmount)
          ).toLocaleString()}
        </div>
      ),
    },
    {
      title: "Selling Price",
      render: ({ row }) => (
        <div> ${row?.ContractTotalCost && parseInt(row.ContractTotalCost)}</div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Table
        rowId={"ContractID"}
        columns={columns}
        data={data}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        labelSelected={true}
        showHeader={true}
        showPagination={true}
        total={totalBatch}
        selectionTitleTooltip={"select all generate batch"}
        selectionRowTooltip={"generate batch"}
        pagination={{
          currentPage,
          setCurrentPage: handlePageChange,
          dataLimit: dataLimit,
          dataLimitDisable: true,
          removeSelection: false,
        }}
      />
    </div>
  );
};

export default ContractsBatchTable;
