import React, { useEffect, useContext, useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { fetchPost } from "@/utils/action/function";
import MainTable from "@/components/cui/table/MainTable";
import { GlobalContext } from "@/app/Provider";
import Action from "./Action";
import { CustomButton } from "@/components/cui/button/CustomButton";
import AddGlovieModal from "./AddGlovie";

import Image from "next/image";
const GlovieModal = ({ open, close, contract, noModal }) => {
  const { Token, auth } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [addGlovieModal, setAddGlovieModal] = useState(false);

  const fetchGlovie = async () => {
    const res = await fetchPost({
      api: `contracts/glovie?ContractID=${contract?.ContractID}&IsGuest=${contract?.IsGuest}`,
      method: "GET",
      Token,
    });
    setData(res?.glovie_list);
  };
  useEffect(() => {
    fetchGlovie();
  }, [open]);
  const ShowFile = ({ cell }) => {
    return cell[0] ? (
      <Image
        src={cell[0]?.glovie_img}
        alt={cell[0]?.glovie_doc_id}
        height="30"
        width="30"
      />
    ) : (
      ""
    );
  };
  const columns = [
    { title: "Sr.#", render: ({ index }) => index + 1 },
    { title: "Glovie Id", accessor: "glovie_id" },
    { title: "Title", accessor: "Title" },
    { title: "Description", accessor: "Description" },
    { title: "Image", render: ShowFile, accessor: "doc_list" },
    {
      title: "Action",
      render: ({ row }) => (
        <Action
          contract={contract}
          Token={Token}
          auth={auth}
          fetchGlovie={fetchGlovie}
          row={row}
        />
      ),
    },
  ];

  return (
    <>
      <div>
        <SimpleModal open={open} close={close} title={"Glovie List"}>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-xl">Glovie</h1>
              <CustomButton size="sm" onClick={() => setAddGlovieModal(true)}>
                Add Glovie
              </CustomButton>
            </div>
            <MainTable columns={columns} data={data} />
          </div>
        </SimpleModal>
      </div>
      {addGlovieModal && (
        <AddGlovieModal
          contract={contract}
          Token={Token}
          auth={auth}
          open={addGlovieModal}
          fetchGlovie={fetchGlovie}
          close={() => {
            setAddGlovieModal(false);
          }}
        />
      )}
    </>
  );
};

export default GlovieModal;
