"use client";
import React, { useContext, useEffect, useState } from "react";
import { CustomButton } from "@/components/cui/button/CustomButton";
import Action from "@/app/(auth)/contracts/edit/[id]/component/modals/glovieModal/Action";
import { fetchPost, fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import Image from "next/image";
import { useSelection } from "@/reduxStore/function";
import Table from "@/components/cui/table";
import AddGlovieCustomer from "./component/AddGlovieCustomer";

const Page = () => {
  const { Token, auth, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    customer_id: CustomerID,
    ContractID,
    IsGuest = 0,
  } = GLOBAL_RESPONSE || {};

  const [data, setData] = useState([]);
  const [addGlovieModal, setAddGlovieModal] = useState(false);

  const fetchGlovie = async () => {
    const data = { CustomerID, ContractID, IsGuest };
    const res = await fetchPostObj({
      api: `customer/glovie`,
      auth,
      data,
      Token,
      spinner: true,
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
          CustomerID={CustomerID}
          ContractID={ContractID}
          Token={Token}
          auth={auth}
          IsGuest={IsGuest}
          fetchGlovie={fetchGlovie}
          row={row}
        />
      ),
    },
  ];

  return (
    <>
      <div className="m-4 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h1 className={"text-2xl font-bold"}>Glovie</h1>
          <CustomButton size="sm" onClick={() => setAddGlovieModal(true)}>
            Add Glovie
          </CustomButton>
        </div>
        <Table columns={columns} data={data} />
      </div>

      {addGlovieModal && (
        <AddGlovieCustomer
          Token={Token}
          IsGuest={IsGuest}
          auth={auth}
          open={addGlovieModal}
          fetchGlovie={fetchGlovie}
          CustomerID={CustomerID}
          ContractID={ContractID}
          close={() => {
            setAddGlovieModal(false);
          }}
        />
      )}
    </>
  );
};

export default Page;
