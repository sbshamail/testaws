import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import EditGlovieModal from "./EditGlovie";
import { fetchPostObj } from "@/utils/action/function";

const Action = ({
  CustomerID,
  ContractID,
  Token,
  auth,
  IsGuest,
  fetchGlovie,
  row,
}) => {
  const [editGlovieModal, setEditGlovieModal] = useState(false);

  const deleteGlovie = async () => {
    const data = {
      CustomerID,
      glovie_id: row.glovie_id,
      ContractID,
      IsGuest,
    };
    const res = await fetchPostObj({
      api: "customer/deleteglovie",
      auth,
      Token,
      data,
      showToast: true,
      spinner: true,
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
          CustomerID={CustomerID}
          ContractID={ContractID}
          Token={Token}
          auth={auth}
          open={editGlovieModal}
          IsGuest={IsGuest}
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
