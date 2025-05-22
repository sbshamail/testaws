import { CustomButton } from "@/components/cui/button/CustomButton";
import React, { useState } from "react";
import AddMoreInformationModal from "./AddMoreInformationModal";
import { engFormatDate } from "@/utils/helpers";
import MainTable from "@/components/cui/table/MainTable";
import { Pencil } from "lucide-react";
import SimpleModal from "@/components/cui/modals/SimpleModal";

const AddMoreInformation = ({
  fetchCustomer,
  ListAllAdditionalInfo,
  open,
  close,
}) => {
  const [isAddInfoModalOpen, setIsAddInfoModalOpen] = useState(false);
  const [editInfo, setEditInfo] = useState(null);

  const handleOpenModal = (row) => {
    setIsAddInfoModalOpen(true);
    setEditInfo(row);
  };
  const columns = [
    { title: "Info Title", accessor: "InfoTitle" },
    { title: "Info Description", accessor: "InfoDescription" },
    {
      title: "Created At",
      accessor: "DateCreated",
      render: ({ cell }) => engFormatDate(cell),
    },
    {
      title: "Action",
      render: ({ row }) => (
        <CustomButton variant="ghost" onClick={() => handleOpenModal(row)}>
          <Pencil size={"1em"} />
        </CustomButton>
      ),
    },
  ];
  return (
    <>
      <SimpleModal
        title={"More Info"}
        className={"m-auto"}
        open={open}
        close={close}
      >
        <CustomButton
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => handleOpenModal(null)}
        >
          <span className="text-orange-500 font-bold">+</span>
          ADD MORE INFORMATION
        </CustomButton>
        <MainTable
          columns={columns}
          data={ListAllAdditionalInfo}
          className={"p-1 border border-border"}
          striped={false}
        />
      </SimpleModal>
      {isAddInfoModalOpen && (
        <AddMoreInformationModal
          open={isAddInfoModalOpen}
          close={() => setIsAddInfoModalOpen(false)}
          fetchCustomer={fetchCustomer}
          editInfo={editInfo}
        />
      )}
    </>
  );
};

export default AddMoreInformation;
