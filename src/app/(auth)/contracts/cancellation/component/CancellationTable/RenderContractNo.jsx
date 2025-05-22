import MouseTooltip from "@/components/cui/tooltip/MouseTooltip";
import Link from "next/link";
import React from "react";
import { FaDotCircle } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";

const RenderContractNo = ({ row }) => {
  let link = "";
  let tooltipMsg = "";
  let icon = null;
  let iconColor = "";

  // Condition : Matured contracts that cannot be cancelled
  if (row.Status === "M" && row.PartiallyMature === "N") {
    link = "#"; // No valid cancellation link
    tooltipMsg = "Matured Contract Cannot be Cancelled";
    icon = <ImBlocked />;
    iconColor = "text-red-500";
  }

  // Condition : Active contract that can be cancelled
  else if (
    row.Status === "L" &&
    (row.ContractStatus === "C" || row.ContractStatus === "E") &&
    row.IsSubscription == "0" &&
    (row?.UnlimitedTerm !== "1" || row?.UnlimitedMileage !== "1")
  ) {
    link = `/contracts/cancellation/active/id=${row?.ContractNo}&mileage=${row?.CurrentMileage}&unlimitedMileage=${row?.UnlimitedMileage}`;
    tooltipMsg = "This contract can be cancelled";
    icon = <FaDotCircle />;
    iconColor = "text-green-500";
  } else if (row.Status === "E") {
    link = "#";
    icon = <FaDotCircle />;
    iconColor = "text-red-500";
  }
  // Condition : Inactive contracts that cannot be cancelled
  else if (row.Status === "I") {
    link = `/contracts/cancellation/inactive/id=${row?.ContractNo}`;
    tooltipMsg = "This contract cannot be cancelled because it is Inactive";
    icon = <ImBlocked />;
    iconColor = "text-red-500";
  }
  // Condition 2: Already cancelled contract
  else if (row.Status === "C") {
    link = `/contracts/cancellation/cancelled/id=${row?.ContractNo}`;
    tooltipMsg = "Already Cancelled";
    icon = <FaDotCircle />;
    iconColor = "text-red-500";
  }

  // Condition : Perpetual contracts
  if (row.Status === "S") {
    link = `/contracts/cancellation/inactive/id=${row?.ContractNo}`;
    tooltipMsg =
      "This contract cannot be cancelled because it is a Perpetual Contract";
    icon = <ImBlocked />;
    iconColor = "text-red-500";
  }
  // Condition : Pending Matured contracts
  else if (row.Status === "P") {
    link = `/contracts/cancellation/inactive/id=${row?.ContractNo}`;
    tooltipMsg =
      "This contract cannot be cancelled because it is Pending Matured";
    icon = <ImBlocked />;
    iconColor = "text-red-500";
  }
  // Condition : Contracts with missing Make & Model
  else if (row.MakeID <= 0 && row.ModelID <= 0) {
    link = "#";
    tooltipMsg = "Make and Model of this Contract is Missing";
    icon = <ImBlocked />;
    iconColor = "text-red-500";
  }

  // === Additional conditions applied after the above sequence ===
  // Condition: Perpetual contracts
  if (row.isPerpetualPlan == "1") {
    link = `/contracts/cancellation/inactive/id=${row?.ContractNo}`;
    tooltipMsg =
      "This contract cannot be cancelled because it is a Perpetual Contract";
    icon = <ImBlocked />;
    iconColor = "text-red-500";
  }
  // Condition : Complimentary contracts
  if (row.Complementry === "1") {
    link = `/contracts/cancellation/inactive/id=${row?.ContractNo}`;
    tooltipMsg =
      "This contract cannot be cancelled because it's a Complimentary Contract";
    icon = <ImBlocked />;
    iconColor = "text-red-500";
  }

  // Condition: Subscription product contracts
  if (row.IsSubscription >= 1) {
    link = `/contracts/cancellation/inactive/id=${row?.ContractNo}`;
    tooltipMsg =
      "This contract cannot be cancelled because it is a Subscription Product Contract";
    icon = <ImBlocked />;
    iconColor = "text-red-500";
  }
  // Condition: Contracts with unlimited mileage & term
  if (row.UnlimitedMileage == "1" && row.UnlimitedTerm == "1") {
    // link = `/contracts/cancellation/inactive/id=${row?.ContractNo}`;
    tooltipMsg =
      "This contract cannot be cancelled because it has Infinity Mileage & Term Contract";
    icon = <ImBlocked />;
    iconColor = "text-red-500";
  }
  return (
    <Link href={link}>
      <MouseTooltip content={tooltipMsg} className="w-40">
        <div className="flex gap-1 items-center cursor-pointer hover:underline">
          <span className={`${iconColor} w-3 h-3`}>{icon}</span>
          <div>{row?.ContractNo}</div>
        </div>
      </MouseTooltip>
    </Link>
  );
};

export default RenderContractNo;
