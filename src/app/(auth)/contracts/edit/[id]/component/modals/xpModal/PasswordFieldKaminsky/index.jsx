import React, { useState } from "react";
import RedeemAuthenticomLp from "./RedeemAuthenticomLp";
import AwardPoint from "./AwardPoint";
import SaleServicePoint from "./SaleServicePoint";

const PasswordFieldKaminsky = ({}) => {
  const [isActiveTab, setActiveTab] = useState("LP");
  const [redeemAuthenticomLpModal, setRedeemAuthenticomLpModal] =
    useState(false);
  const [awardCashModal, setAwardCashModal] = useState(false);
  const [saleServiceModal, setSaleServiceModal] = useState(false);
  return (
    <>
      <div className="">
        <div className="flex gap-2">
          <div
            className={`flex-none text-center px-5 py-5 rounded-t-lg ${
              isActiveTab === "LP"
                ? "bg-siteBlue text-white"
                : "bg-gray-100 text-gray-600"
            } cursor-pointer transition duration-200`}
            onClick={() => setActiveTab("LP")}
          >
            <h2 className="text-base font-semibold">Authenticom LP</h2>
          </div>
          <div
            className={`flex-none text-center px-5 py-5 rounded-t-lg ${
              isActiveTab === "XP"
                ? "bg-siteBlue text-white"
                : "bg-gray-100 text-gray-600"
            } cursor-pointer transition duration-200`}
            onClick={() => setActiveTab("XP")}
          >
            <h2 className="text-base font-semibold">Authenticom XP</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-b-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              <button className="px-4 py-2">History</button>
              <button
                onClick={() => setRedeemAuthenticomLpModal(true)}
                className="px-4 py-2 bg-siteBlue text-white rounded-md hover:bg-siteBlue/80"
              >
                Redemption
              </button>
              <button
                onClick={() => setAwardCashModal(true)}
                className="px-4 py-2 bg-[#5cb85c] text-white rounded-md hover:bg-[#5cb85c]/70"
              >
                + Award Point
              </button>
              <button
                onClick={() => setSaleServiceModal(true)}
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
                <th className="border  py-1 px-4 text-left">Deal #</th>
                <th className="border  py-1 px-4 text-left">Reason</th>
                <th className="border  py-1 px-4 text-left">Date</th>
                <th className="border  py-1 px-4 text-left">Ro</th>
                <th className="border  py-1 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border py-1 px-4">4682364835</td>
                <td className="border py-1 px-4"></td>
                <td className="border py-1 px-4">Pts Sales</td>
                <td className="border py-1 px-4">10/05/2024</td>
                <td className="border py-1 px-4">572349543</td>
                <td className="border py-1 px-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value="2,000.00"
                      className="w-24 bg-white border rounded px-2 py-1"
                      readOnly
                    />
                    <select className="border rounded px-2 py-1 w-full">
                      <option value="pts-service">
                        PTS SERVICE - SERVICE (250.00)
                      </option>
                    </select>
                    <button className="px-4 bg-siteBlue text-white rounded hover:bg-siteBlue/80">
                      ✓
                    </button>
                    <button className="px-4 bg-red-500 text-white rounded hover:bg-red-600">
                      ✕
                    </button>
                  </div>
                  <div className="relative mt-2">
                    <input
                      type="password"
                      placeholder="Password"
                      className="pl-8 w-full border rounded px-2 py-1"
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔒
                    </span>
                  </div>
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
        </div>
      </div>

      <RedeemAuthenticomLp
        isOpen={redeemAuthenticomLpModal}
        onClose={() => setRedeemAuthenticomLpModal(false)}
      />
      <AwardPoint
        isOpen={awardCashModal}
        onClose={() => setAwardCashModal(false)}
      />
      <SaleServicePoint
        isOpen={saleServiceModal}
        onClose={() => setSaleServiceModal(false)}
      />
    </>
  );
};

export default PasswordFieldKaminsky;
