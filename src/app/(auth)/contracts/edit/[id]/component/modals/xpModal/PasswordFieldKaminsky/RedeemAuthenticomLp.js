import React from "react";

const RedeemAuthenticomLp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Redeem Authenticom LP</h2>
          <div className="flex gap-3">
            <h2 className="text-xl font-semibold">
              Available :{" "}
              <span className="text-siteBlue">2,000.00 ($40.00)</span>
            </h2>
            <button onClick={onClose} className="text-xl">
              &times;
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mb-4 w-full">
            <label className="block text-gray-700">Service Name</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md"
              placeholder="Name"
            />
          </div>

          <div className="mb-4 w-full">
            <label className="block text-gray-700">Ro</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md"
              placeholder="Ro"
            />
          </div>
        </div>
        <div className="">
          <label className="block text-gray-700 w-full">Point</label>
          <div className="mb-4 w-full flex">
            <input
              type="text"
              className="border p-2 w-1/2 rounded-md"
              placeholder="Authenticom LP to reward"
            />
            <div className="flex justify-center items-center ml-10">
              <input type="radio" name="pointAmount" id="point" />
              <label htmlFor="point" className="ml-2">
                Point
              </label>
              <input
                type="radio"
                name="pointAmount"
                id="amount"
                className="ml-4"
              />
              <label htmlFor="amount" className="ml-2">
                Amount
              </label>
            </div>
          </div>
        </div>

        {/* Available Point Dropdown */}
        <div className="flex gap-3">
          <div className="w-full">
            <label className="block text-gray-700">Available Point</label>
            <div className="w-full flex flex-col">
              <select className="border p-[9.5px] rounded-md w-full">
                <option value="D0432825">
                  D0432825: JOHN TRIPLETT (POINTS: 2,000.00)
                </option>
              </select>
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

        <div className="mt-4">
          <label className="block text-gray-700">Manager Code</label>
          <input
            type="text"
            className="border p-2 w-full rounded-md"
            placeholder="Manager Code"
          />
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

export default RedeemAuthenticomLp;
