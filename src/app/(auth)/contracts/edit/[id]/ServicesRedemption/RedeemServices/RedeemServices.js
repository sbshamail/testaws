import React, { useContext } from "react";
import { EditContractContext } from "../../page";
import RedeemService from "./RedeemService";
const RedeemServices = () => {
  const { maturedServices } = useContext(EditContractContext);

  return (
    <div>
      {/* <h3 className="font-semibold text-2xl my-5">Redeem Services</h3> */}
      <div key={maturedServices} className="w-full grid grid-cols-8">
        <div className="bg-white text-black text-sm h-20 font-semibold flex items-end pb-3 px-4 rounded-tl-3xl border-b">
          Redeem ID/OP CODE
        </div>
        <div className="col-span-2 bg-white text-black text-sm h-20 font-semibold flex items-end pb-3 px-4 border-b">
          Service
        </div>
        <div className="bg-white text-black text-sm h-20 font-semibold flex items-end pb-3 px-4 border-b">
          Mileage
        </div>
        <div className="bg-white text-black text-sm h-20 font-semibold flex items-end pb-3 px-4 border-b">
          RO
        </div>
        <div className="bg-white text-black text-sm h-20 font-semibold flex items-end pb-3 px-4 border-b">
          Date of Service
        </div>
        <div className="bg-white text-black text-sm h-20 font-semibold flex items-end pb-3 px-4 border-b">
          Redeemed Vehicle
        </div>
        <div className="bg-white text-black text-sm h-20 font-semibold flex items-end pb-3 px-4 rounded-tr-3xl border-b">
          Change Status
        </div>
        {maturedServices?.length === 0 && (
          <div
            className={`col-span-8 text-center py-4 ${
              theme === "light" ? "bg-white" : "bg-[#061028]"
            }`}
          >
            {" "}
            No Redeemed Services Found
          </div>
        )}

        {maturedServices?.map((service, i) => (
          <RedeemService
            key={i}
            service={service}
            i={i}
            maturedServices={maturedServices}
          />
        ))}
      </div>
    </div>
  );
};

export default RedeemServices;
