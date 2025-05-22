"use client";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Table from "@/components/cui/table";
import ContractNo from "./TableRender/ContractNo";
import Name from "./TableRender/Name";
import Action from "./TableRender/Action";
// import { unixTimestampToDate } from "@/app/functions";

import TableHeader from "./TableRender/TableHeader";

import {
  DeleteContractCheckbox,
  DeleteTitle,
} from "./TableRender/DeleteContractFn";
import { isAllowed } from "@/action/function";
import { GlobalContext } from "@/app/Provider";
import TooltipNext from "@/components/nextui/TooltipNext";
import { unixTimestampToDate } from "@/utils/helpers";

const ShowTable = ({
  contracts,
  setOffSetData,
  currentPage,
  setCurrentPage,
  dataLimit,
  setDataLimit,
  loading,
  setMount,
}) => {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const total_rows = contracts?.total_rows || contracts?.total_users || 0;
  const [isDeleteAllowed, setDeleteAllowed] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDelRows, setSelectedDelRows] = useState([]);

  useEffect(() => {
    const isDelAllowed = async () => {
      const res = await isAllowed({
        auth,
        Token,
        controller_name: "contract",
        function_name: "deletecontracts",
      });

      if (res?.success == 1) {
        setDeleteAllowed(true);
      } else {
        setDeleteAllowed(false);
      }
    };
    isDelAllowed();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const newOffset = page === 1 ? 0 : (page - 1) * dataLimit;
    setOffSetData(newOffset);
    setMount((prev) => !prev);
  };

  const RowNumber = ({ index }) => {
    return Number(contracts?.offset ?? dataLimit) - dataLimit + index + 1;
  };
  const SaleDateRender = ({ cell, row }) => {
    return (
      <TooltipNext
        className={"bg-black text-white"}
        content={
          <div className=" flex flex-col">
            <span>Created at: {row?.PostedDate}</span>
            <span>UserName: {row?.UserName}</span>
          </div>
        }
      >
        <div>{unixTimestampToDate(cell)}</div>
      </TooltipNext>
    );
  };

  const deleteContract = () => {
    let newDataElement = {
      title: "Delete Contract",
      question: "Are you sure you want to delete the selected contract?",
      messageTitle: "Enter reason for deleting the contract",
      dangertext:
        "* Reason for deleting the contract must be at least 10 characters",
    };

    // setModalData(newDataElement);s
    // setShowModal(true);
    showDeleteAlertModal(newDataElement);
  };

  const showDeleteAlertModal = (newDataElement) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger",
        input: "form-control",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons.fire({
      title: newDataElement.title,
      text: newDataElement.question,
      icon: "warning",
      input: "text",
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#A9A9A9",
      inputPlaceholder: newDataElement.messageTitle,
      inputValidator: (value) => {
        if (!value || value.length < 10) {
          return newDataElement.dangertext;
        }
      },
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Close",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
          GLOBAL_RESPONSE;
        const headers = new Headers();
        headers.append("AUTHORIZATION", Token);

        const formData = new FormData();
        formData.append("pcp_user_id", pcp_user_id);
        formData.append("role_id", user_cizacl_role_id);
        formData.append("user_id", user_id);
        // formData.append("ContractID[]", deleteContractId?.ContractID);
        selectedDelRows.forEach((row) => {
          formData.append("ContractID[]", row.ContractID);
        });
        formData.append("DeletionReason", reason);
        return fetch("https://mypcp.us/webservices/contracts/deletecontracts", {
          method: "POST",
          body: formData,
          headers: headers,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((data) => {
            if (data.success === 1) {
              swalWithBootstrapButtons.fire({
                title: "Success!",
                text: data.message,
                icon: "success",
              });
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: data.message,
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.log(error);
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "An error occurred. Please try again.",
              icon: "error",
            });
          });
      },
    });
  };

  const columns = [
    { title: "No.", render: RowNumber },
    { title: "Contract No", render: ({ row }) => <ContractNo row={row} /> },
    { title: "Name", render: ({ row }) => <Name row={row} /> },

    { title: "Plan", accessor: "PlanDesc" },
    {
      title: "Sale Date",
      accessor: "SaleDate",
      render: SaleDateRender,
    },

    {
      title: "Validity Date",
      accessor: "ValidityDate",
      render: ({ cell }) => unixTimestampToDate(cell),
    },
    {
      title: (
        <div onClick={deleteContract}>
          <DeleteTitle
            selectedDelRows={selectedDelRows}
            auth={auth}
            Token={Token}
            isDeleteAllowed={isDeleteAllowed}
            setOffSetData={setOffSetData}
            // deleteContract={deleteContract}
          />
        </div>
      ),
      render: ({ row }) => (
        <DeleteContractCheckbox
          row={row}
          selectedRows={selectedDelRows}
          setSelectedRows={setSelectedDelRows}
          isDeleteAllowed={isDeleteAllowed}
          GLOBAL_RESPONSE={GLOBAL_RESPONSE}
        />
      ),
    },
    {
      title: "Actions",
      className: "whitespace-nowrap w-28",
      render: ({ row }) => (
        <Action
          row={row}
          setOffSetData={setOffSetData}
          isDeleteAllowed={isDeleteAllowed}
        />
      ),
    },
  ];
  return (
    <div>
      <div className=" mx-2">
        <Table
          columns={columns}
          showHeader={true}
          headerAction={() => (
            <TableHeader
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          )}
          rowId={"ContractID"}
          data={contracts?.contracts}
          total={total_rows}
          //select rows
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          //pagination
          showPagination={true}
          pagination={{
            currentPage,
            setCurrentPage: handlePageChange,
            dataLimit,
            setDataLimit,
            dataLimitDisable: false,
            removeSelection: false,
          }}
        />
      </div>
    </div>
  );
};

export default ShowTable;
