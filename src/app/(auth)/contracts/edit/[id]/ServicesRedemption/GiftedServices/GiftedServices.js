import React, { useContext, useState } from "react";
import { EditContractContext } from "../../page";
import GiftedService from "./GiftedService";

const GiftedServices = () => {
  const { giftedServices } = useContext(EditContractContext);
  const [giftedServiceCheck, setGiftedServiceCheck] = useState(false);
  function formatGiftedDate(date) {
    const d = new Date(date);
    const month = d.getMonth() + 1; // Months are zero-based
    const day = d.getDate();
    const year = d.getFullYear();

    // Pad month and day with leading zeros if needed
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedMonth}/${formattedDay}/${year}`;
  }
  return (
    <div>
      {giftedServices.map((giftedContract, index) => (
        <div key={index} className="">
          {/* Heading */}
          <div className="w-full rounded-lg overflow-hidden">
            <div className="grid grid-cols-2  text-sm font-semibold">
              <div className="p-4 flex justify-center items-center text-card-foreground text-base bg-secondary rounded-tl-3xl tracking-wide">
                {giftedContract.GiftedTo_Email}
              </div>
              {!giftedServiceCheck ? (
                <div className="flex gap-4 justify-center items-center bg-secondary rounded-tr-3xl">
                  <div className="text-sm py-2 rounded-xl text-primary cursor-pointer font-semibold tracking-wide underline hover:text-primary/70">
                    Other Email
                  </div>
                  <div className="text-sm py-2 rounded-xl text-primary cursor-pointer font-semibold tracking-wide underline hover:text-primary/70">
                    Re-Send Email
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 justify-center items-center bg-card rounded-tr-3xl tracking-wider">
                  <div className="bg-primary px-3 py-2 rounded-lg">
                    {giftedContract.GiftedTo_ContractNo}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mapping Services */}
          {giftedContract.Services.map((service, index) => (
            <div key={index} className="grid grid-cols-2 py-4 rounded-lg ">
              {/* First Column with Coupon Title */}
              <div className="flex justify-center items-center text-muted-foreground gap-2 text-sm">
                <span className="border border-primary rounded-full h-6 w-6 flex items-center justify-center text-xs tracking-wider">
                  {service?.Gifted_CouponCount}
                </span>{" "}
                {service.Gifted_CouponTitle}
              </div>
              {/* Second Column with Date */}
              <div className="flex justify-center items-center text-muted-foreground text-sm">
                {formatGiftedDate(service.GiftedDate)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GiftedServices;
