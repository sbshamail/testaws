import React from "react";
import { FiFileText } from "react-icons/fi";
import MainTable from "@/components/cui/table/MainTable";
import SimpleModal from "@/components/cui/modals/SimpleModal";

const ContractHistory = ({ historyData, open, close }) => {
  const RenderContractNo = ({ cell }) => {
    return <span>{cell}</span>;
  };
  const columns = [
    { title: "Contract #", accessor: "ContractNo", render: RenderContractNo },
  ];
  return (
    <SimpleModal
      open={open}
      close={close}
      title={
        <span className="flex items-center gap-1">
          <FiFileText className="h-5 w-5" />
          CONTRACTS HISTORY
        </span>
      }
      className={"m-auto max-w-[400px]"}
    >
      <MainTable
        columns={columns}
        data={historyData}
        className={"p-1 border border-border"}
        striped={false}
      />
    </SimpleModal>
  );
};

export default ContractHistory;
