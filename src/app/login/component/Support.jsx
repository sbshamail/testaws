import React from "react";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

const Support = ({ toggleSendEmail }) => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center mt-6">
      <p className="text-card-foreground/80 ">Questions?</p>
      <div className="flex space-x-2 items-center border  rounded-full px-3 py-2">
        <BsTelephone color={"siteLoginColor"} />
        <a
          href="tel:251-990-3131"
          className="text-sm text-card-foreground/80 whitespace-nowrap"
        >
          251-990-3131
        </a>
      </div>
      <div className="flex space-x-2 items-center border  rounded-full px-3 py-2">
        <MdOutlineEmail color={"siteLoginColor"} />
        <button
          className="text-sm text-card-foreground/80"
          onClick={toggleSendEmail}
        >
          support@procarma.com
        </button>
      </div>
    </div>
  );
};

export default Support;
