import React, { useEffect, useState } from "react";

function PlanDetailModal({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger animation on mount
    return () => setIsVisible(false); // Reset visibility on unmount
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center z-50 pt-10 modal-overlay ${
        isVisible ? "show" : ""
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-[43%] p-8 border-2 border-gray-400 modal-content ${
          isVisible ? "show" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-bold text-gray-600 flex gap-2 justify-center items-center">
            PLAN DETAIL
          </h2>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300); // Delay close to allow animation
            }}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            &times;
          </button>
        </div>
        <table className="w-full border-collapse text-gray-700">
          <thead>
            <tr className="text-left text-sm font-semibold">
              <th className="px-4 py-2 border-b text-base">Sr.#</th>
              <th className="px-4 py-2 border-b text-base">Service Name</th>
              <th className="px-4 py-2 border-b text-base">No of Services</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: 1,
                name: "DEALER COMP STD/SYN BLEND OIL & FILTER CHANGE",
                count: 2,
              },
              { id: 2, name: "OIL AND FILTER CHANGE", count: 2 },
              { id: 3, name: "TIRE ROTATION", count: 4 },
              { id: 4, name: "SAFETY INSPECTION", count: 1 },
              { id: 5, name: "VISUAL BRAKE INSPECTION", count: 4 },
              { id: 6, name: "MULTI POINT INSPECTION", count: 4 },
              { id: 7, name: "BATTERY PERFORMANCE EVALUATION", count: 4 },
              {
                id: 8,
                name: "LOYALTY 5% DISCOUNT ON ADDITIONAL WORK AT THE TIME OF MAINTENANCE",
                count: 1,
              },
              {
                id: 9,
                name: "$500 ADDITIONAL TRADE IN VALUE WITH THE PURCHASE OF A NEW VEHICLE",
                count: 1,
              },
            ].map((service) => (
              <tr key={service.id} className="text-sm">
                <td className="px-4 py-2 border-b text-xs tracking-wide">
                  {service.id}
                </td>
                <td className="px-4 py-2 border-b text-xs tracking-wide">
                  {service.name}
                </td>
                <td className="px-4 py-2 border-b text-xs tracking-wide font-semibold">
                  {service.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlanDetailModal;
