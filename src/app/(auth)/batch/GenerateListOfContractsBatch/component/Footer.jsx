import React, { useContext, useState } from "react";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import { formatDate, Toastify } from "@/utils/helpers";
import { jsonToExcel } from "@/utils/generateExcel";

const Footer = ({
  currentItems,
  dealer,
  setLoading,
  startDate,
  endDate,
  offSet,
  selectedRows,
  setBatchModal,
  setOffSet,
  PlanType,
  FixedDateParameter,
  setPopUpModalData,
}) => {
  const { GLOBAL_RESPONSE, auth, Token, setBatchIdNew } =
    useContext(GlobalContext);
  const [tempBatch, setTempBatch] = useState("0");

  const handleGenerateBatch = async () => {
    setLoading(true);
    if (!dealer) {
      Toastify("error", "Please select a dealer");
      setLoading(false);
      return;
    }

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealer);
    formdata.append("IsTempBatch", tempBatch);
    selectedRows.forEach((row) => {
      formdata.append("ContractIDs[]", row.ContractID);
    });
    fetch("https://mypcp.us/webservices/batch/generatebatch", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        const data = { BatchID: res.BatchID };
        const printData = fetchPostObj({
          auth,
          Token,
          api: "batch/popprintinvoice",
          data,
        }).then((res) => {
          setPopUpModalData(res);
          setOffSet("0");
          setBatchModal(true);
          Toastify("success", res.message);
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const handleExportAllExcel = async () => {
    if (!dealer) {
      Toastify("error", "Please select a dealer");
      setLoading(false);
      return;
    }
    const data = {
      DealerID: dealer,
      FromDate: formatDate(startDate),
      ToDate: formatDate(endDate),
      offset: offSet,
      ContractNo: "",
      FixedDateParameter: FixedDateParameter,
      PlanType: PlanType,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      data,
      api: "batch/unbatchexport",
      setLoading,
    });

    if (res) {
      jsonToExcel(res.batchexport, "Batchexport");
    } else {
      Toastify("error", "Error exporting data");
    }
  };

  return (
    <div>
      {currentItems?.length > 0 ? (
        <ShadowContainer>
          <div className="w-full flex justify-between">
            <div className={`flex gap-2`}>
              <div className="w-80 rounded-xl font-light">
                <label className="font-light">Temp Batch Save</label>
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <label>Yes</label>
                    <input
                      type="radio"
                      name="tempBatchSave"
                      value="1"
                      onChange={(e) => setTempBatch(e.target.value)}
                      className="mr-2"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label>No</label>
                    <input
                      type="radio"
                      name="tempBatchSave"
                      value="0"
                      onChange={(e) => setTempBatch(e.target.value)}
                      className="mr-2"
                      checked={tempBatch === "0"} // Ensure tempBatchValue is managed accordingly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <CustomButton
                onClick={() => {
                  if (currentItems?.length > 0) {
                    handleExportAllExcel();
                  }
                }}
                className={`flex gap-4 bg-siteHighLight  items-center justify-center rounded-xl text-sm font-bold tracking-wide text-white 
                
                 hover:opacity-80 hover:bg-siteHighLight transition-opacity duration-200`}
              >
                Export As Excel
              </CustomButton>

              <CustomButton
                onClick={
                  // () => setBatchModal(true)
                  () => {
                    if (selectedRows.length > 0) {
                      handleGenerateBatch();
                    }
                  }
                }
                variant="main"
                className={`flex gap-4 opacity-${
                  selectedRows.length > 0 ? "" : 50
                } ${
                  selectedRows.length > 0
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                } justify-center  items-center rounded-xl text-sm font-bold tracking-wide text-white hover:opacity-80 transition-opacity duration-200`}
              >
                Generate Batch
              </CustomButton>
            </div>
          </div>
        </ShadowContainer>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Footer;
