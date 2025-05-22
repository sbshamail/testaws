import React, { useContext, useState } from "react";
import { EditContractContext } from "../../page";
import UsedServices from "../UsedServices/UsedServices";
import { CustomButton } from "@/components/cui/button/CustomButton";
import RedeemServices from "../RedeemServices/RedeemServices";
import GiftedServices from "../GiftedServices/GiftedServices";
import { useTheme } from "@/utils/theme/themeProvider";

const ActiveService = () => {
  const { giftedServices, maturedServices } = useContext(EditContractContext);
  const [activeTab, setActiveTab] = useState("used");
  const { toggleMode, theme } = useTheme();

  return (
    <div
      className={`w-full mx-auto p-6 ${
        theme === "light" ? "bg-white" : "bg-[#061028]"
      } shadow-md rounded-lg`}
    >
      {/* Tab Buttons */}
      <div className="flex justify-between mb-4 space-x-3 w-full">
        <div className="flex gap-3">
          <CustomButton
            onClick={() => setActiveTab("used")}
            className={`${
              activeTab === "used"
                ? "bg-siteBlue text-white hover:bg-opacity-80"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Used Services
          </CustomButton>

          {maturedServices.length > 0 && (
            <CustomButton
              onClick={() => setActiveTab("redeem")}
              className={` ${
                activeTab === "redeem"
                  ? "bg-red-700 text-white bg-opacity-80"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Redeem After Expiry
            </CustomButton>
          )}
          {giftedServices.length > 0 && (
            <CustomButton
              onClick={() => setActiveTab("gifted")}
              className={` ${
                activeTab === "gifted"
                  ? "bg-siteBlue text-white bg-opacity-80"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Gifted Services
            </CustomButton>
          )}
        </div>
      </div>

      {/* Render Component based on Active Tab */}
      <div>
        {activeTab === "used" ? (
          <div>
            {/* Used Services */}
            <div className="p-2 border rounded-lg shadow-inner">
              <UsedServices />
            </div>
          </div>
        ) : activeTab === "redeem" ? (
          <div className="p-2 border rounded-lg shadow-inner">
            <RedeemServices />
          </div>
        ) : activeTab === "gifted" ? (
          <div className="p-2 border rounded-lg shadow-inner">
            <GiftedServices />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ActiveService;
