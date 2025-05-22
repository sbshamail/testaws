import React from "react";
import SummaryBox from "./SummaryBox";
const Summary = ({ contracts }) => {
  let summarylist = [
    { text: "Active", value: 0, percent: "0 %" },
    { text: "Pending", value: 0, percent: "0 %" },
    { text: "Matured", value: 0, percent: "0 %" },
    { text: "Pending Matured", value: 0, percent: "0 %" },
    { text: "Cancelled", value: 0, percent: "0 %" },
    { text: "Suspended", value: 0, percent: "0 %" },
  ];
  if (contracts) {
    summarylist = [
      {
        text: "Active",
        value: contracts?.contracts_all?.active,
        percent: contracts.contracts_all?.active_per + " %",
      },
      {
        text: "Pending",
        value: contracts.contracts_all?.inactive,
        percent: contracts.contracts_all?.inactive_per + " %",
      },
      {
        text: "Matured",
        value: contracts.contracts_all?.matured,
        percent: contracts.contracts_all?.matured_per + " %",
      },
      {
        text: "Pending Matured",
        value: contracts.contracts_all?.pendingpatured,
        percent: contracts.contracts_all?.pending_matured_per + " %",
      },
      {
        text: "Cancelled",
        value: contracts.contracts_all?.cancelled,
        percent: contracts.contracts_all?.cancelled_per + " %",
      },
      {
        text: "Suspended",
        value: contracts.contracts_all?.Suspended,
        percent: contracts.contracts_all?.suspended_per + " %",
      },
    ];
  }
  return (
    <div className="w-full flex flex-wrap justify-center  items-center gap-2 ">
      {contracts?.contracts_all?.total > 0 &&
        summarylist.map((item, i) => (
          <SummaryBox
            key={i}
            value={item.value}
            percent={item.percent}
            text={item.text}
          />
        ))}
    </div>
  );
};

export default Summary;
