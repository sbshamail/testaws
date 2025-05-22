import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaWrench } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import SelectorButton from "./SelectorButton";
export const contractlist = [
  { text: "ALL", value: "all", color: "" },

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
    text: "Partially Matured",
    value: "Y",
    color: "bg-green-500",
    color2: " bg-gray-500",
  },
  { text: "Pending Matured", value: "P", color: "bg-orange-500" },
  { text: "Mark Services", value: "MS", color: "bg-purple-500" },
  { text: "Perpetual Contract", value: "PC", color: "bg-indigo-500" },
  { text: "Redeem Services", value: "R", icon: <FaWrench /> },
  {
    text: "Suspended Account",
    value: "A",
    color: "bg-pink-500",
    color2: " bg-pink-950",
  },
  { text: "Subscription Contract", value: "1", color: "bg-pink-950" },
  { text: "Gifted", value: "G", icon: <FaGift /> },
];
const ShowbySelector = ({ value, setvalue, width }) => {
  const [open, setopen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setopen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className={`relative w-${width ? width : "full"} flex flex-col`}>
      <div
        className="w-full p-[4px] flex items-center flex-col gap-2 rounded-lg shadow-sm shadow-border z-10 relative bg-accent"
        ref={dropdownRef}
      >
        <div className="absolute right-0 mr-2 top-1/2 -translate-y-1/2">
          <div className="flex items-center gap-1">
            {value !== "" && (
              <span
                className="Transition hover:text-red-500 cursor-pointer"
                onClick={() => setvalue("")}
              >
                x
              </span>
            )}
            <IoIosArrowDown />
          </div>
        </div>
        {value !== "" && (
          <div className="absolute left-0 ms-2 text-xs top-0 mt-1">
            Select Contract
          </div>
        )}
        <div
          onClick={() => setopen(!open)}
          className="cursor-pointer  w-full flex justify-between mt-[10px] items-center text-sm"
        >
          <div>
            {value === "" ? (
              <div className=" p-4 ">
                <div className="absolute left-0 ms-2 top-1/2 -translate-y-1/2">
                  {" "}
                  Select Contract
                </div>
              </div>
            ) : (
              <SelectorButton
                selected
                contract={contractlist.find(
                  (contract) => contract.value == value
                )}
                setvalue={setvalue}
                setopen={setopen}
              />
            )}
          </div>
        </div>
        {open && (
          <div className="absolute z-[10000] mt-12 left-0 w-full border border-t-0 border-border rounded-bl-md rounded-br-md max-h-72 overflow-y-auto bg-secondary text-secondary-foreground shadow-lg">
            {contractlist.map((contract, i) => (
              <SelectorButton
                key={i}
                contract={contract}
                setvalue={setvalue}
                setopen={setopen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowbySelector;
