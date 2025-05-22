import React, { useContext } from "react";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPost } from "@/utils/action/function";
import { objectToFormData } from "@/utils/helpers";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { GlobalContext } from "@/app/Provider";

const TableAction = ({
  selectedRows,
  idValue,
  fetchListOfContractsUnderBatch,
  fetchListBatch,
}) => {
  const { auth, Token } = useContext(GlobalContext);
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
    fetchListBatch();
  };
  return (
    <div className="flex items-center gap-2">
      <CustomButton
        onClick={handleDeleteBatch}
        Icon={FaRegTrashAlt}
        variant="danger"
        disabled={selectedRows.length === 0}
      >
        Delete
      </CustomButton>
    </div>
  );
};

export default TableAction;
