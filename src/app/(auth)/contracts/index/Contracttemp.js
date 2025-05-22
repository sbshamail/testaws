import React, { useContext, useEffect, useState } from "react";
import { unixTimestampToDate } from "@/app/functions";
import { BiSolidEditAlt, BiTrash } from "react-icons/bi";

import Link from "next/link";
import Swal from "sweetalert2";
import { GlobalContext } from "@/app/Provider";
import { LuWrench } from "react-icons/lu";
import { MdLocationOn } from "react-icons/md";
import { LiaGhostSolid } from "react-icons/lia";
import { FaGift } from "react-icons/fa";
import { TbClockExclamation } from "react-icons/tb";
import { TbClockHour5 } from "react-icons/tb";

import Image from "next/image";
import { AdminLayoutContext } from "../../layout";
import RedeemAfterExpiredModal from "./RedeemAfterExpiredModal";
import TooltipNext from "@/components/nextui/TooltipNext";
import XpModal from "../edit/[id]/component/modals/xpModal/XpModal";
import CoveragesModal from "../edit/[id]/component/modals/coverages/Coverages";
const Contract = ({ contract, offSet, index, displayNumber }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE, legendValue, legend } =
    useContext(GlobalContext);

  const [statusContract, setStatusContract] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [pauseId, setPauseId] = useState(0);
  const [modalData, setModalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redeemAfterExpire, setRedeemAfterExpire] = useState(false);
  const [modalContractId, setModalContractId] = useState(null);
  const [actualStatus, setActualStatus] = useState(null);
  const [isRedeemAfterExpired, setIsRedeemAfterExpired] = useState(
    contract.IsRedeemAfterExpired
  ); // store current status

  const toggleRedeemAfterExpire = (contractId, status) => {
    setRedeemAfterExpire(!redeemAfterExpire);
    setModalContractId(contractId);
    setActualStatus(status);
  };
  const updateRedeemAfterExpireStatus = (newStatus) => {
    setIsRedeemAfterExpired(newStatus); // Update the status when child updates
  };
  useEffect(() => {}, [contract, offSet]);

  const [xpModal, setXpModal] = useState(false);
  const [coverage, setCoverageModal] = useState(false);

  // const circle = contractlist.find((item) => {
  //   return item.value == contract.Status;
  // });
  // let actionimg;
  // if (contract.isPerpetualPlan == 1) {
  //   if (
  //     contract.ActivityPaused == 0 &&
  //     contract.RevokeServiceRedeem == 0 &&
  //     contract.Status != "A"
  //   ) {
  //     actionimg = "suspend";
  //   } else if (
  //     (contract.ActivityPaused == 1 || contract.RevokeServiceRedeem == 1) &&
  //     contract.Status != "A"
  //   ) {
  //     actionimg = "player_play";
  //   }
  // } else {
  //   if (contract.RevokeServiceRedeem == 0 && contract.Status != "A") {
  //     actionimg = "suspend";
  //   } else if (contract.RevokeServiceRedeem == 1 && contract.Status != "A") {
  //     actionimg = "player_play";
  //   }
  // }
  // console.log("circlecircle", contract);

  /*if (role_id == 1) {
    if (contract.Status == "A") {
      actionimg = "player_play"; 
        
    }
  }*/
  const deleteContract = (deleteContractId) => {
    let newDataElement = {
      title: "Delete Contract",
      question: "Are you sure you want to delete the selected contract?",
      messageTitle: "Enter reason for deleting the contract",
      dangertext:
        "* Reason for deleting the contract must be at least 10 characters",
    };

    setModalData(newDataElement);
    setShowModal(true);
    showDeleteAlertModal(newDataElement, deleteContractId);
  };

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
        formData.append("ContractID[]", deleteContractId?.ContractID);
        formData.append("DeletionReason", reason);
        return fetch("https://mypcp.us/webservices/contracts/deletecontracts", {
          method: "POST",
          body: formData,
          headers: headers,
          s,
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

  const pauseContract = (contract) => {
    let newDataElement = "";
    setPauseId(contract.ContractID);

    if (contract.RevokeServiceRedeem == 0) {
      setStatusContract(1);
    } else if (contract.RevokeServiceRedeem == 1) {
      setStatusContract(2);
    } else if (contract.Status == "A") {
      setStatusContract(3);
    } else if (contract.ActivityPaused == 0) {
      setStatusContract(4);
    } else if (contract.ActivityPaused == 1) {
      setStatusContract(5);
    }

    if (contract.ActivityPaused == "0") {
      setStatusContract(4);
      newDataElement = {
        title: "Pause Contract",
        question: "Are you sure you want to Pause selected Contracts?",
        messageTitle: "Enter reason for Pause contract(s)",
        dangertext: "* Reason for Active contract Minimum 10 character",
      };
    } else if (contract.ActivityPaused == "1") {
      newDataElement = {
        title: "Active Contract",
        question: "Are you sure you want to Active selected Contracts?",
        messageTitle: "Enter reason for Active contract",
        dangertext: "* Reason for Active contract Minimum 10 character",
      };
    }
    setModalData(newDataElement);
    setShowModal(true);
    showSweetAlertModal(newDataElement, contract);
  };

  const showSweetAlertModal = (newDataElement, contract) => {
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
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "No!",
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
        formData.append("ContractID", contract?.ContractID);
        formData.append("ActivityPaused", +statusContract);
        formData.append("Reason", reason);

        return fetch(
          "https://mypcp.us/webservices/contracts/revokeserviceredeem",
          {
            method: "POST",
            body: formData,
            headers: headers,
          }
        )
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
  useEffect(() => {}, [statusContract]);

  const statusColor = (contract) => {
    if (contract.PartiallyMature === "Y") {
      return "bg-greenblack";
    }

    switch (contract.Status) {
      case "M":
        return contract.PartiallyMature === "N" ? "bg-black" : "bg-green-500"; // If PartiallyMature is 'N', it's black; otherwise green.
      case "L":
        return contract.ContractStatus === "C"
          ? "bg-green-500"
          : contract.ContractStatus === "E"
          ? "bg-blue-500"
          : "bg-green-500"; // Default to green if none match
      case "E":
        return "bg-blue-500";
      case "I":
        return contract.PaymentStatus === "B"
          ? "bg-blackorange" // Customize this color class as needed
          : "bg-yellow-500";
      case "C":
        return "bg-red-500";
      case "A":
        return "bg-pinkbrown"; // Assuming for subscription_canceled
      case "S":
        return "bg-indigo-500";
      case "P":
        return "bg-orange-500"; // Assuming for pending_mature
      default:
        return "bg-green-500"; // Default color
    }
  };

  const customStyles = {
    blackorange: {
      background: "linear-gradient(to right, black 50%, orange 50%)",
    },
    pinkbrown: {
      background: "linear-gradient(to right, #ec4899 50%, #500724 50%)",
    },
  };

  // Logic for purple ball
  const purpleBall = contract.PurpleBall == 1 ? "bg-purple-500" : null;

  // Logic for indigo ball
  const indigoBall = contract.isPerpetualPlan == 1 ? "bg-[#3F48CC]" : null;

  // Logic for maintenance product
  const maintananceProduct =
    contract.MaintananceProductContract == 1 || contract.IsSubscription > 0
      ? "bg-[#880015]"
      : null;
  return (
    <>
      <div className="flex flex-row items-center border-b  mt-1">
        {/* No */}
        <div className="w-1/12 text-center">{displayNumber}</div>
        {/* contract No */}

        <div className="w-1/6 flex flex-row gap-1 items-center">
          &nbsp;
          {/* circles */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                statusColor(contract) === "bg-blackorange"
                  ? ""
                  : statusColor(contract)
              }`}
              style={
                statusColor(contract) === "bg-blackorange"
                  ? customStyles.blackorange
                  : statusColor(contract) === "bg-pinkbrown"
                  ? customStyles.pinkbrown
                  : statusColor(contract) === "bg-greenblack"
                  ? {
                      background:
                        "linear-gradient(to right, green 50%, black 50%)",
                    }
                  : {}
              }
            />
            {purpleBall && (
              <div className={`w-3 h-3 rounded-full ${purpleBall}`} />
            )}
            {indigoBall && (
              <div className={`w-3 h-3 rounded-full ${indigoBall}`} />
            )}
            {maintananceProduct && (
              <div className={`w-3 h-3 rounded-full ${maintananceProduct}`} />
            )}
          </div>
          {/* location gps */}
          <div className="flex gap-1 items-center">
            <div className="relative group">
              {contract?.ProductCategory == 2 ||
              contract?.ProductCategory == 4 ? (
                contract?.IsGpsContract == 1 ? (
                  <TooltipNext content="GPS Connected">
                    <MdLocationOn className="cursor-pointer w-5 h-5" />
                  </TooltipNext>
                ) : (
                  <>
                    <TooltipNext content="GPS Not-Connected">
                      <Image
                        src={"/images/gps-notconnected.svg"}
                        alt="gps not connected"
                        width={20}
                        height={20}
                      />
                    </TooltipNext>
                  </>
                )
              ) : null}
            </div>
            {/* coverage */}
            <Image
              onClick={() => setCoverageModal(true)}
              src={`${
                parseInt(contract?.TotalCoverage) > 0
                  ? "/images/stone-eagle-blue.svg"
                  : "/images/stone-eagle.svg"
              }`}
              alt="coverages"
              width={20}
              height={20}
              className="cursor-pointer"
            />{" "}
            {/* Contract ID */}
            <div className="relative group">
              <Link
                className="hover:underline"
                href={`/contracts/edit/${contract.ContractID}`}
              >
                {contract.ContractNo}
              </Link>

              {contract?.CancellationReason && (
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-max bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {contract.CancellationReason}
                </span>
              )}
            </div>
            {contract?.TotalGifted > 0 ? <FaGift /> : ""}
            {contract.TotalUsedServices > 0 ? <LuWrench /> : ""}
            {contract.HideTestContract == 1 ? (
              <LiaGhostSolid className="w-5 h-5" />
            ) : (
              ""
            )}
          </div>
        </div>
        {/* name */}
        <div className="w-1/6 flex gap-2 items-center">
          {contract.CustomerName}
          {GLOBAL_RESPONSE?.user_cizacl_role_id == 1 &&
          ["M", "S"].includes(contract?.Status) ? (
            <div
            // onClick={() => {
            //   document.getElementById("ContractEditId").value =
            //     contract.ContractID;
            //   load_model_by_url(
            //     `${siteUrl(
            //       "contracts/allredeemafterexpired/" +
            //         contract.ContractID +
            //         "/" +
            //         contract.IsRedeemAfterExpired
            //     )}`,
            //     "Redeem After Expired",
            //     "large"
            //   );
            // }}
            // href="#"
            // className="btn btn-xs pull-right poshytip_input"
            // title={`Redeem After Expire ${
            //   contract.IsRedeemAfterExpired === 0 ? "Disabled" : "Enabled"
            // }`}
            // alt={`Redeem After Expire ${
            //   contract.IsRedeemAfterExpired === 0 ? "Disabled" : "Enabled"
            // }`}
            >
              <div className="relative group">
                {contract.IsRedeemAfterExpired == 1 &&
                isRedeemAfterExpired == 1 ? (
                  <>
                    <TbClockHour5
                      onClick={() =>
                        toggleRedeemAfterExpire(contract?.ContractID, 1)
                      }
                      className="cursor-pointer text-green-500 w-5 h-5"
                    />
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-max bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Click to Enable Redeem After Expire
                    </span>
                  </>
                ) : (
                  <>
                    <TbClockExclamation
                      onClick={() =>
                        toggleRedeemAfterExpire(contract?.ContractID, 0)
                      }
                      className="cursor-pointer text-red-500 w-5 h-5"
                    />
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-max bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Click to Disable Redeem After Expire
                    </span>
                  </>
                )}
              </div>
            </div>
          ) : null}

          <div>
            {contract?.loyaltycash > 0 &&
              (contract?.EnableLoyaltyCash == 1 &&
              contract?.EnableLoyaltyCashPoint == 1 ? (
                <div
                  className="bg-green-400 select-none cursor-pointer px-2 py-1 rounded-3xl text-white shadow-lg"
                  onClick={() => setXpModal(true)}
                >
                  ${contract?.loyaltycash.toFixed(2)}
                </div>
              ) : contract?.EnableLoyaltyCash == 1 &&
                (contract?.EnableKaminskyLoyaltyProgram == 1 ||
                  contract?.EnableVehicleCoverageLP == 1) ? (
                <div
                  className="bg-green-400 select-none cursor-pointer px-2 py-1 rounded-3xl text-white shadow-lg"
                  onClick={() => setXpModal(true)}
                >
                  ${contract?.loyaltycash.toFixed(2)}
                </div>
              ) : null)}
          </div>
        </div>
        <div className="w-1/6">{contract.PlanDesc}</div>
        <div className="w-1/6">{unixTimestampToDate(contract.SaleDate)}</div>
        <div className="w-1/6">
          {unixTimestampToDate(contract.ValidityDate)}
        </div>
        {/* Action */}
        <div className="w-1/6 flex flex-row items-center gap-1">
          <Link href={`/contracts/edit/${contract.ContractID}`}>
            <BiSolidEditAlt size={20} />
          </Link>

          <BiTrash
            onClick={() => deleteContract(contract)}
            color="red"
            size={20}
            className="cursor-pointer"
          />

          {contract.ContractSigned && (
            <Image
              src="/images/doc-signed.png"
              width={20}
              height={20}
              alt="doc"
              className="cursor-pointer"
              onClick={() => {
                window.open(
                  `https://mypcp.us/ContractSigned/${contract?.ContractNo}.pdf`,
                  "_blank"
                );
              }}
            />
          )}

          {contract.Status != "A" &&
            contract.isPerpetualPlan == 1 &&
            contract.ActivityPaused == 0 &&
            contract.RevokeServiceRedeem == 0 && (
              <button onClick={() => pauseContract(contract)}>
                {" "}
                <Image
                  src="/images/player_stop.png"
                  width={20}
                  height={20}
                  alt="play"
                />
              </button>
            )}

          {contract.Status != "A" &&
            contract.isPerpetualPlan == 1 &&
            contract.ActivityPaused == 1 && (
              <button onClick={() => pauseContract(contract)}>
                <Image
                  src="/images/contractslist/suspend.png"
                  width={30}
                  height={30}
                  alt="suspended"
                />
              </button>
            )}

          {/* {contract.Status != "A" &&
          contract.isPerpetualPlan == 1 &&
          contract.RevokeServiceRedeem == 1 && (
            <button onClick={() => pauseContract(contract)}>
              {" "}
              <Image
                src="/images/contractslist/suspend.png"
                width={30}
                height={30}
                alt="suspended"
              />
            </button>
          )} */}

          {contract.Status != "A" &&
            contract.isPerpetualPlan != 1 &&
            contract.RevokeServiceRedeem == 0 && (
              <button onClick={() => pauseContract(contract)}>
                {" "}
                <Image
                  src="/images/player_stop.png"
                  width={20}
                  height={20}
                  alt="play"
                />
              </button>
            )}

          {contract.Status != "A" &&
            contract.isPerpetualPlan != 1 &&
            contract.RevokeServiceRedeem == 1 && (
              <button onClick={() => pauseContract(contract)}>
                <Image
                  src="/images/contractslist/suspend.png"
                  width={30}
                  height={30}
                  alt="suspended"
                />
              </button>
            )}
          {redeemAfterExpire && (
            <RedeemAfterExpiredModal
              isOpen={redeemAfterExpire}
              onClose={toggleRedeemAfterExpire}
              contractId={modalContractId}
              actualStatus={actualStatus}
              updateRedeemStatus={updateRedeemAfterExpireStatus} // Pass the callback
            />
          )}
          {/* {role_id == 1 && contract.Status == "A" && (
  <Image
    src="/images/contractslist/player_play.png"
    width={20}
    height={20} 
    alt="play"
  />
)} */}
        </div>
      </div>
      {xpModal && (
        <XpModal
          contract={contract}
          open={xpModal}
          close={() => setXpModal(false)}
        />
      )}
      {coverage && (
        <CoveragesModal
          ContractID={contract?.ContractID}
          close={() => setCoverageModal(false)}
          open={coverage}
        />
      )}
    </>
  );
};

export default Contract;
