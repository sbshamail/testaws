import React, { useEffect, useState } from "react";
import Table from "@/components/cui/table";
import { useSelection } from "@/reduxStore/function";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
const ImportExcelTable = () => {
  const { Imports, TotalRec = 0 } = useSelection("importList") ?? {};
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(20);
  const RowNumber = ({ index }) => {
    return Number(currentPage - 1) * dataLimit + index + 1;
  };
  useEffect(() => {
    if (Imports?.length) {
      const startIndex = (currentPage - 1) * dataLimit;
      const endIndex = startIndex + dataLimit;
      setData(Imports.slice(startIndex, endIndex));
    }
  }, [currentPage, dataLimit, Imports]);

  const columns = [
    {
      title: "No.",
      render: RowNumber,
    },
    {
      title: "Contract No",
      accessor: "ContractNo",
    },
    {
      title: "Customer Name",
      render: ({ row }) => row.CustomerFName + " " + row.CustomerLName,
    },
    {
      title: "Plan",
      accessor: "PlanDescription",
    },
    {
      title: "Make",
      accessor: "Make",
    },
    {
      title: "Model",
      accessor: "Model",
    },
    {
      title: "Bank",
      accessor: "BankName",
    },
    {
      title: "Dealer",
      accessor: "DealerTitle",
    },
    {
      title: "State",
      accessor: "StateTitle",
    },
    {
      title: "City",
      accessor: "CityName",
    },
    {
      title: "Date Created",
      accessor: "CreatedDate",
    },
    {
      title: "Address",
      accessor: "CustomerAddress1",
    },
  ];
  return data.length > 0 ? (
    <ShadowContainer>
      <Table
        showHeader={true}
        columns={columns}
        data={data}
        total={TotalRec}
        //pagination
        showPagination={true}
        pagination={{
          currentPage,
          setCurrentPage,
          dataLimit,
          setDataLimit,
          dataLimitDisable: false,
        }}
      />
    </ShadowContainer>
  ) : null;
};

export default ImportExcelTable;
