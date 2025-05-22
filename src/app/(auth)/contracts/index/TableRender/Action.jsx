import { GlobalContext } from "@/app/Provider";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BiSolidEditAlt, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import RevokeServiceRedeem from "./RevokeServiceRedeem";
import { isAllowed } from "@/action/function";

const Action = ({ row, setOffSetData, isDeleteAllowed }) => {
  const { GLOBAL_RESPONSE, auth, Token } = useContext(GlobalContext);

  const [revokeServiceModal, setRevokeServiceModal] = useState(false);

  const showDeleteAlertModal = (newDataElement, deleteContractId) => {
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
        formData.append("ContractID[]", [deleteContractId?.ContractID]);
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
  const deleteContract = (deleteContractId) => {
    let newDataElement = {
      title: "Delete Contract",
      question: "Are you sure you want to delete the selected contract?",
      messageTitle: "Enter reason for deleting the contract",
      dangertext:
        "* Reason for deleting the contract must be at least 10 characters",
    };

    showDeleteAlertModal(newDataElement, deleteContractId);
  };

  return (
    <>
      <div className="w-full flex flex-row items-center gap-1">
        {GLOBAL_RESPONSE?.IsModifyContractInfo === "0" && (
          <Link href={`/contracts/edit/${row.ContractID}`}>
            <BiSolidEditAlt size={20} />
          </Link>
        )}
        {GLOBAL_RESPONSE?.IsDeleteContract === "0" &&
          row.IsSubscription == "0" &&
          row.MobileAppUsed == "0" &&
          row.MaintananceProductContract == "0" && (
            <BiTrash
              onClick={() => deleteContract(row)}
              color="red"
              size={20}
              className="cursor-pointer text-xl"
            />
          )}
        {/* )} */}
        {row?.ContractSigned ? (
          <Image
            src="/images/doc-signed.png"
            width={20}
            height={20}
            alt="doc"
            className="cursor-pointer"
            onClick={() => {
              window.open(
                `https://mypcp.us/ContractSigned/${row?.ContractNo}.pdf`,
                "_blank"
              );
            }}
          />
        ) : null}

        {row.Status != "A" &&
          row.isPerpetualPlan == 1 &&
          row.ActivityPaused == 0 &&
          row.RevokeServiceRedeem == 0 && (
            <div
              className="cursor-pointer"
              onClick={() => setRevokeServiceModal(true)}
            >
              {" "}
              <Image
                src="/images/player_stop.png"
                width={20}
                height={20}
                alt="play"
              />
            </div>
          )}

        {row.Status != "A" &&
          row.isPerpetualPlan == 1 &&
          row.ActivityPaused == 1 && (
            <div
              className="cursor-pointer"
              onClick={() => setRevokeServiceModal(true)}
            >
              <Image
                src="/images/contractslist/suspend.png"
                width={30}
                height={30}
                alt="suspended"
              />
            </div>
          )}

        {/* {row.Status != "A" &&
          row.isPerpetualPlan == 1 &&
          row.RevokeServiceRedeem == 1 && (
            <div onClick={() => setRevokeServiceModal(true)}>
              {" "}
              <Image
                src="/images/contractslist/suspend.png"
                width={30}
                height={30}
                alt="suspended"
              />
            </div>
          )} */}

        {row.Status != "A" &&
          row.isPerpetualPlan != 1 &&
          row.RevokeServiceRedeem == 0 && (
            <div
              className="cursor-pointer"
              onClick={() => setRevokeServiceModal(true)}
            >
              {" "}
              <Image
                src="/images/player_stop.png"
                width={20}
                height={20}
                alt="play"
              />
            </div>
          )}

        {row.Status != "A" &&
          row.isPerpetualPlan != 1 &&
          row.RevokeServiceRedeem == 1 && (
            <div
              className="cursor-pointer"
              onClick={() => setRevokeServiceModal(true)}
            >
              <Image
                src="/images/contractslist/suspend.png"
                width={30}
                height={30}
                alt="suspended"
              />
            </div>
          )}
      </div>
      <RevokeServiceRedeem
        open={revokeServiceModal}
        close={() => setRevokeServiceModal(false)}
        auth={auth}
        Token={Token}
        ContractID={row.ContractID}
        row={row}
        setOffSetData={setOffSetData}
      />
    </>
  );
};

export default Action;
