import React, { useState } from "react";
import RedeemAuthenticomLpVehicleCoverage from "./RedeemAuthenticomLpVehicleCoverage";
import AwardPointVehicleCoverage from "./AwardPointVehicleCoverage";
import SaleServicePointVehicleCoverage from "./SaleServicePointVehicleCoverage";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import toast from "react-hot-toast";

const EnableVehicleCoverageLPDiv = ({ close }) => {
  const [isActiveTab, setActiveTab] = useState("LP");
  const [selectedFile, setSelectedFile] = useState(null);
  const [
    redeemAuthenticomLpVehicleCoverageModal,
    setRedeemAuthenticomLpVehicleCoverageModal,
  ] = useState(false);
  const [awardVehicleCoverageModal, setAwardVehicleCoverageModal] =
    useState(false);
  const [saleServiceVehicleCoverageModal, setSaleServiceVehicleCoverageModal] =
    useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "text/csv")
    ) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Invalid file format. Please select a .xlsx or .csv file.");
    }
  };
  return (
    <>
      <div className="w-full">
        <div className="flex gap-2">
          <div
            className={`flex-none text-center px-5 py-5 rounded-t-lg ${
              isActiveTab === "LP"
                ? "bg-siteBlue text-white"
                : "bg-gray-100 text-gray-600"
            } cursor-pointer transition duration-200`}
            onClick={() => setActiveTab("LP")}
          >
            <h2 className="text-base font-semibold">Vehicle Coverage LP</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-b-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              <button className="px-4 py-2">History</button>
              <button
                onClick={() => setRedeemAuthenticomLpVehicleCoverageModal(true)}
                className="px-4 py-2 bg-siteBlue text-white rounded-md hover:bg-siteBlue/80"
              >
                Redemption
              </button>
              <button
                onClick={() => setAwardVehicleCoverageModal(true)}
                className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70"
              >
                + Award Point
              </button>
              <button
                onClick={() => setSaleServiceVehicleCoverageModal(true)}
                className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70"
              >
                + Add Sale/Service Point
              </button>
            </div>
            <button className="bg-[#5cb85c] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#5cb85c]/80">
              Current Points :
              <span className="bg-white text-black py-1 px-2 rounded-full ml-2">
                4545454
              </span>
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border  py-1 px-4 text-left">VIN</th>
                <th className="border  py-1 px-4 text-left">Reason</th>
                <th className="border  py-1 px-4 text-left">Date</th>
                <th className="border  py-1 px-4 text-left">Ro</th>
                <th className="border  py-1 px-4 text-left">Action</th>
                <th className="border  py-1 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border flex gap-1 items-center py-1 px-4">
                  4682364835
                  <div className="relative flex items-center">
                    <HiQuestionMarkCircle className="cursor-pointer text-siteBlue" />
                  </div>{" "}
                </td>{" "}
                <td className="border py-1 px-4">New Reason </td>
                <td className="border py-1 px-4">10/05/2024</td>
                <td className="border py-1 px-4">412641268</td>
                <td className="border py-1 px-4">+$55.20</td>
                <td className="border py-1 px-3 text-center ">
                  <FaTrashAlt className="text-red-500 w-full text-center" />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              <span className="mr-2">🖨️</span>
              Print Receipt
            </button>
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <label className="block text-gray-700">Document Type</label>
              <div className="w-full flex flex-col">
                <select className="border p-[9.5px] rounded-md w-full bg-gray-100">
                  <option value="nothing">Nothing Selected</option>
                  <option value="passport">Passport</option>
                  <option value="driver_license">Driver&apos;s License</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-3 my-2">
            <div className="w-full flex items-center bg-gray-100 rounded-md">
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 bg-siteBlue text-white font-bold px-4 py-2 rounded-md cursor-pointer shadow hover:opacity-70 transition-colors duration-300"
              >
                <GrGallery />
                Choose
              </label>
              <input
                id="file-upload"
                type="file"
                // accept=".xlsx,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedFile && (
                <span className="ml-4 text-gray-700 font-medium truncate">
                  {selectedFile.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-5">
            <button className="bg-siteOrange text-white px-8 py-2 rounded-md">
              Save
            </button>
            <button
              onClick={close}
              className="bg-red-500 text-white px-8 py-2 rounded-md"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <RedeemAuthenticomLpVehicleCoverage
        isOpen={redeemAuthenticomLpVehicleCoverageModal}
        onClose={() => setRedeemAuthenticomLpVehicleCoverageModal(false)}
      />
      <AwardPointVehicleCoverage
        isOpen={awardVehicleCoverageModal}
        onClose={() => setAwardVehicleCoverageModal(false)}
      />
      <SaleServicePointVehicleCoverage
        isOpen={saleServiceVehicleCoverageModal}
        onClose={() => setSaleServiceVehicleCoverageModal(false)}
      />
    </>
  );
};

export default EnableVehicleCoverageLPDiv;
