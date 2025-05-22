import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditGlovieModal from "./EditGlovie";
import { fetchPostObj } from "@/utils/action/function";

const Action = ({ contract, Token, auth, fetchGlovie, row }) => {
  const [editGlovieModal, setEditGlovieModal] = useState(false);
  const { CustomerID, ContractID } = contract;
  const deleteGlovie = async () => {
    const data = {
      CustomerID,
      glovie_id: row.glovie_id,
      ContractID,
    };
    const res = await fetchPostObj({
      api: "contracts/deleteglovie",
      auth,
      Token,
      data,
      showToast: true,
    });
    if (res) {
      fetchGlovie();
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <MdEdit
          onClick={() => setEditGlovieModal(true)}
          className="text-xl text-siteOrange hover:opacity-80 cursor-pointer"
        />
        <MdDelete
          onClick={deleteGlovie}
          className="text-xl text-red-500 hover:opacity-80 cursor-pointer"
        />
      </div>
      {editGlovieModal && (
        <EditGlovieModal
          contract={contract}
          Token={Token}
          auth={auth}
          open={editGlovieModal}
          fetchGlovie={fetchGlovie}
          close={() => {
            setEditGlovieModal(close);
          }}
          id={row?.glovie_id}
        />
      )}
    </>
  );
};

export default Action;
