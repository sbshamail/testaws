import React from "react";

const RedeemCashAward = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Redeem Loyalty Cash</h2>
          <div className="flex gap-3">
            <h2 className="text-xl font-semibold">
              Available : <span className="text-siteBlue">2,000.00</span>
            </h2>
            <button onClick={onClose} className="text-xl">
              &times;
            </button>
          </div>
        </div>
        <div className="text-base font-bold">
          Which transaction type is the redemption for
        </div>
        <div className="flex gap-3 my-2">
          <div className="w-full flex flex-col">
            <select
              className="border p-[9.5px] rounded-md w-full"
              defaultValue="service"
            >
              <option value="service">Service (Repair Order)</option>
              <option value="sale">Sale</option>
              <option value="part">Part</option>
            </select>
          </div>
        </div>

        {/* Available Point Dropdown */}
        <div className="flex gap-3 my-4">
          <div className="w-full">
            <div className="mb-4 w-full">
              <label className="block text-gray-700">Ro</label>
              <input
                type="text"
                className="border p-2 w-full rounded-md"
                placeholder="Ro"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="">Available Amount $</label>
            <div className="w-full flex flex-col">
              <input
                type="text"
                className="border p-2 rounded-md w-full"
                value="40.00"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-5">
          <button
            onClick={onClose}
            className="bg-siteOrange text-white px-8 py-2 rounded-md"
          >
            Close
          </button>
          <button className="bg-siteBlue text-white px-8 py-2 rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedeemCashAward;
