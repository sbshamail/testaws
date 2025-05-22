import React, { useState, useContext } from "react";
import { FaWrench } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { GlobalContext } from "@/app/Provider";

export const contractlist = [
  // { text: "ALL", value: "", color: "" },
  { text: "Classic Active", value: "L", color: "bg-green-500" },
  { text: "Express Active", value: "E", color: "bg-sky-500" },
  { text: "Pending Contract", value: "I", color: "bg-[#FDC702]" },
  {
    text: "Pending Batch Contract",
    value: "B",
    color: "bg-[#FDC702]",
    color2: "bg-gray-500",
  },
  { text: "Cancelled Contract", value: "C", color: "bg-red-500" },
  { text: "Matured Contract", value: "M", color: "bg-gray-500" },
  {
    text: "Partially  Matured",
    value: "Y",
    color: "bg-green-500",
    color2: "bg-gray-500",
  },
  { text: "Pending Matured", value: "P", color: "bg-orange-500" },
  { text: "Mark Services", value: "MS", color: "bg-purple-500" },
  { text: "Perpetual Contract", value: "PC", color: "bg-indigo-500" },
  { text: "Redeem Services", value: "R", icon: <FaWrench /> },
  {
    text: "Suspended Account",
    value: "A",
    color: "bg-pink-500",
    color2: "bg-pink-950",
  },
  { text: "Subscription Account", value: "SC", color: "bg-pink-950" },
  { text: "Gifted", value: "1", icon: <FaGift /> },
];

const Legends = ({ contract: contractValue, setcontract, setMount }) => {
  const handleClick = async (contract) => {
    setMount((prev) => !prev);
    setcontract(contract.value);
  };

  return (
    <div className="flex flex-wrap px-4 mt-6">
      {contractlist.map((contract, index) => (
        <div
          key={index}
          className="flex justify-center items-center px-2 py-4 "
        >
          <button
            onClick={() => handleClick(contract)}
            className={`w-full flex flex-row items-center gap-2 px-3 rounded-xl cursor-pointer hover:opacity-80 ${
              contractValue === contract.value && contract.value !== ""
                ? "bg-siteHighLight text-white"
                : contractValue === contract.value && contract.value === ""
                ? "bg-transparent"
                : ""
            }`}
          >
            {contract.icon ? (
              contract.icon
            ) : (
              <>
                {contract.color2 ? (
                  <div className="w-5 h-5 rounded-full flex">
                    <div
                      className={`w-1/2 ${contract.color} rounded-l-full`}
                    ></div>
                    <div
                      className={`w-1/2 ${contract.color2} rounded-r-full`}
                    ></div>
                  </div>
                ) : (
                  <div
                    className={`w-5 h-5 rounded-full ${contract.color}`}
                  ></div>
                )}
              </>
            )}
            <div className="truncate">{contract.text}</div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Legends;
