import React, { useContext, useState } from "react";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { MdDelete, MdEmail, MdLocalPrintshop } from "react-icons/md";
import { FaFileExport } from "react-icons/fa";
import { fetchPost } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import { objectToFormData } from "@/utils/helpers";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { jsonToExcel } from "@/utils/generateExcel";
import SendEmailModal from "./SendEmailModal";
const TableHeader = ({ selectedRows, setSelectedRows }) => {
  const { auth, Token } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const formdata = new FormData();
  const getContractIDs = () => {
    return selectedRows.forEach((row) => {
      formdata.append("ContractIDs[]", row?.ContractID); // Appends each ID under the same key
    });
  };
  const handleReportPrint = async (api) => {
    getContractIDs();
    objectToFormData({ ...auth }, formdata);
    const res = await fetchPost({
      api,
      setLoading,
      formdata,
      token: Token,
    });
    const blob = new Blob([res], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    // Open the URL in a new tab
    window.open(url, "_blank");
    setSelectedRows([]);
  };
  const exportExcel = async () => {
    getContractIDs();
    objectToFormData({ ...auth, SearchGhostContract: "0" }, formdata);
    const res = await fetchPost({
      api: "contracts/ExportContracts",
      setLoading,
      formdata,
      token: Token,
    });
    if (res) {
      jsonToExcel(res?.contracts, "ContractsExport");
      setSelectedRows([]);
    }
  };

  return (
    <>
      <SpinnerCenterScreen loading={loading} />
      {selectedRows && selectedRows.length > 0 && (
        <div className="flex items-center gap-2">
          <CustomButton
            variant="main"
            Icon={() => <MdEmail />}
            onClick={() => setEmailModal(true)}
          >
            Email Report
          </CustomButton>
          <CustomButton
            variant="main"
            Icon={() => <MdLocalPrintshop />}
            onClick={() => handleReportPrint("contracts/printcontract")}
          >
            Print Report
          </CustomButton>
          <CustomButton
            variant="main"
            Icon={() => <FaFileExport />}
            onClick={exportExcel}
          >
            Export
          </CustomButton>
        </div>
      )}
      {emailModal && (
        <SendEmailModal
          open={emailModal}
          close={() => setEmailModal(close)}
          contractIds={getContractIDs}
          formdata={formdata}
          auth={auth}
          Token={Token}
          setLoading={setLoading}
          setSelectedRows={setSelectedRows}
        />
      )}
    </>
  );
};

export default TableHeader;
