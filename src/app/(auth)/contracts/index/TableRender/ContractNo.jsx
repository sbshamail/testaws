import Image from "next/image";
import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import CoveragesModal from "../../edit/[id]/component/modals/coverages/Coverages";
import { LiaGhostSolid } from "react-icons/lia";
import Link from "next/link";
import { LuWrench } from "react-icons/lu";
import { FaGift } from "react-icons/fa";
import TooltipShad from "@/components/cui/tooltip/TooltipShad";

const ContractNo = ({ row }) => {
  const [coverage, setCoverageModal] = useState(false);
  const statusColor = (row) => {
    if (row.PartiallyMature === "Y") {
      return "bg-greenblack";
    }

    switch (row.Status) {
      case "M":
        return row.PartiallyMature === "N" ? "bg-black" : "bg-green-500"; // If PartiallyMature is 'N', it's black; otherwise green.
      case "L":
        return row.ContractStatus === "C"
          ? "bg-green-500"
          : row.ContractStatus === "E"
          ? "bg-blue-500"
          : "bg-green-500"; // Default to green if none match
      case "E":
        return "bg-blue-500";
      case "I":
        return row.PaymentStatus === "B"
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

  // Logic for purple ball
  const purpleBall = row.PurpleBall == 1 ? "bg-purple-500" : null;

  // Logic for indigo ball
  const indigoBall = row.isPerpetualPlan == 1 ? "bg-[#3F48CC]" : null;

  // Logic for maintenance product
  const maintananceProduct =
    row.MaintananceProductContract == 1 || row.IsSubscription > 0
      ? "bg-[#880015]"
      : null;
  const customStyles = {
    blackorange: {
      background: "linear-gradient(to right, black 50%, orange 50%)",
    },
    pinkbrown: {
      background: "linear-gradient(to right, #ec4899 50%, #500724 50%)",
    },
  };
  return (
    <>
      <div className=" flex flex-row gap-1 items-center">
        &nbsp;
        {/* circles */}
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              statusColor(row) === "bg-blackorange" ? "" : statusColor(row)
            }`}
            style={
              statusColor(row) === "bg-blackorange"
                ? customStyles?.blackorange
                : statusColor(row) === "bg-pinkbrown"
                ? customStyles?.pinkbrown
                : statusColor(row) === "bg-greenblack"
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
            {row?.ProductCategory == 2 || row?.ProductCategory == 4 ? (
              row?.IsGpsContract == 1 ? (
                <TooltipShad content="GPS Connected">
                  <div>
                    <MdLocationOn className=" text-xl text-siteBlue" />
                  </div>
                </TooltipShad>
              ) : (
                <>
                  <TooltipShad content="GPS Not-Connected">
                    <div>
                      <MdLocationOn className=" text-xl text-black" />
                      {/* <Image
                      src={"/images/gps-notconnected.svg"}
                      alt="gps not connected"
                      width={20}
                      height={20}
                    /> */}
                    </div>
                  </TooltipShad>
                </>
              )
            ) : null}
          </div>
          {/* coverage */}
          <Image
            onClick={() => setCoverageModal(true)}
            src={`${
              parseInt(row?.TotalCoverage) > 0
                ? "/images/stone-eagle-blue.svg"
                : "/images/stone-eagle.svg"
            }`}
            alt="coverages"
            width={20}
            height={20}
            className="cursor-pointer"
          />{" "}
          {/* Contract ID */}
          <div className=" group">
            <TooltipShad content={row.CancellationReason}>
              <Link
                className="hover:underline"
                href={`/contracts/edit/${row.ContractID}`}
              >
                {row.ContractNo}
              </Link>
            </TooltipShad>
          </div>
          {row?.TotalGifted > 0 ? <FaGift /> : ""}
          {row.TotalUsedServices > 0 ? <LuWrench /> : ""}
          {row.HideTestContract == 1 ? (
            <LiaGhostSolid className="w-5 h-5" />
          ) : (
            ""
          )}
        </div>
      </div>
      {coverage && (
        <CoveragesModal
          ContractID={row?.ContractID}
          close={() => setCoverageModal(false)}
          open={coverage}
        />
      )}
    </>
  );
};

export default ContractNo;
