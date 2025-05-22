import React, { useState } from "react";
import MainTable from "@/components/cui/table/MainTable";
import Checkbox from "@/components/cui/textField/Checkbox";
import Table from "@/components/cui/table";

const ReportTable = ({ data, redem, setRedem }) => {
  const handleService = (cell, value) => {
    setRedem({ ...redem, [cell]: value });
  };
  const handleSelectAllService = (value) => {
    setRedem((prevRedem) => {
      const updatedRedem = {};
      data.forEach((item) => {
        updatedRedem[item.CouponID] = value;
      });
      return updatedRedem;
    });
  };

  const IsCheckboxPayout = ({ row }) => {
    return (
      <Checkbox
        checked={redem[row.CouponID] ?? row.IsPaidOut === "1"}
        onChange={(value) => handleService(row.CouponID, value)}
      />
    );
  };
  const PayoutTitle = () => (
    <span className="flex flex-col">
      <p>Payout</p>
      <Checkbox
        checked={
          data.length ===
          Object.values(redem).filter((item) => item === true).length
        }
        onChange={handleSelectAllService}
      />
    </span>
  );
  const StatusCondition = ({ cell }) => {
    const status = {
      I: "Inactive",
      L: "Active",
      C: "Cancelled",
      M: "Matured",
      E: "Active Express",
      P: "Pending Matured",
      S: "Perpetual Contract",
    };
    return (
      <span>
        {status[cell]} <br />
        <span className="text-siteBlue">PPM Policy</span>
      </span>
    );
  };

  const CreatedDate = ({ cell }) => {
    const match = cell.match(/\d{4}\/\d{2}\/\d{2}/);
    return match ? match[0] : "No date found";
  };
  const VehicleTypeRender = ({ cell }) =>
    cell === "c" || cell === "C" ? "No" : "Yes";
  const columns = [
    { title: "#", render: ({ index }) => index + 1 },
    {
      title: "Last 6 of Vin #",
      render: ({ row }) => row?.VIN && row.VIN.substring(row.VIN.length - 6),
    },
    { title: "Contract #", accessor: "ContractNo" },
    { title: "First Name", accessor: "CustomerFName" },

    { title: "Contract Status", accessor: "Status", render: StatusCondition }, //condition

    { title: "Last Name", accessor: "CustomerLName" },
    { title: "Service Title", accessor: "CouponTitle" },
    {
      title: "Service Redemption Date",
      accessor: "RecievedDate",
      type: "date",
    },
    { title: "Amount", accessor: "CouponValue", type: "currency" },
    { title: "Upsell Amount", accessor: "UpsellAmount", type: "currency" },
    { title: "RO #", accessor: "RepairOrderNo" },

    { title: "Paid Out Date", accessor: "PaidOutDate", type: "date" },
    {
      title: <PayoutTitle />,
      render: IsCheckboxPayout,
      className: "text-center",
    },
    // vehicle type if yes else no, label: Gifted / Non Contract Vehicle
    {
      title: "Gifted / Non Contract Vehicle",
      accessor: "VehicleType",
      render: VehicleTypeRender,
    },
    { title: "Created Date", accessor: "CheckNo", render: CreatedDate }, //only date
    // { title: "Email", accessor: "PrimaryEmail" },
    // { title: "Phone", accessor: "PhoneHome" },
  ];

  return (
    <div className=" ">
      {data ? (
        <Table
          wrapperClassName={"max-w-full mx-auto  rounded-none m-0 p-0"}
          columns={columns}
          data={data}
        />
      ) : null}
    </div>
  );
};

export default ReportTable;
