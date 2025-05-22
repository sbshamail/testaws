import React from "react";

const SaleServicePoint = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Add Sale/Service Point</h2>
          <div className="flex gap-3">
            <button onClick={onClose} className="text-xl">
              &times;
            </button>
          </div>
        </div>

        <div className="w-full">
          <label className="block text-gray-700">Service Name</label>
          <div className="w-full flex flex-col">
            <select className="border p-[9.5px] rounded-md w-full">
              <option value="D0432825">PTS SALES - SALE (2,000.00)</option>
              <option value="D0432825">PTS SERVICE - SERVICE (250.00) </option>
            </select>
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

export default SaleServicePoint;
