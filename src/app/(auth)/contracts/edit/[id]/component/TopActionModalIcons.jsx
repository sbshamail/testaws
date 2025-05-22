import Image from "next/image";
import React, { useState } from "react";
import RatingModal from "./modals/RatingModal";
import Carfax from "./modals/Carfax";
import CallLogModal from "./modals/CallLogModal";
import { RiStarSFill } from "react-icons/ri";

import TooltipShad from "@/components/cui/tooltip/TooltipShad";
import XpModalOld from "./modals/XpModalOld";
import XpModal from "./modals/xpModal/XpModal";
import GlovieModal from "./modals/glovieModal/GlovieModal";
import CoveragesModal from "./modals/coverages/Coverages";
import VehicleHistory from "./modals/vehicleHistory/VehicleHistory";
const TopActionModalIcons = ({ contract }) => {
  const [carfaxModal, setCarfaxModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [callLogModal, setCallLogModal] = useState(false);
  const [glovieModal, setGlovieModal] = useState(false);
  const [xpModal, setXpModal] = useState(false);
  const [coverage, setCoverageModal] = useState(false);
  const [vehicleHistoryModal, setVehicleHistoryModal] = useState(false);

  const { getDealerByID } = contract || {};
  const isXpPoints =
    getDealerByID?.EnableLoyaltyCashPoint == "1" ||
    getDealerByID?.EnableKaminskyLoyaltyProgram == "1" ||
    getDealerByID?.EnableVehicleCoverageLP == "1" ||
    getDealerByID?.xp_enable == "1";
  const toggleCarfaxModal = () => {
    setCarfaxModal(!carfaxModal);
  };
  const toggleRatingModal = () => {
    setRatingModal(!ratingModal);
  };
  const toggleCallLogModal = () => {
    setCallLogModal(!callLogModal);
  };

  const dealersettinglist = [
    {
      src: "glovie_dashboard-new.png",
      tooltip: "Glovie",
      available: true,
      onClick: () => setGlovieModal(!glovieModal),
      className: "bg-black dark:bg-none",
    },
    {
      src: "stone-eagle.png",
      tooltip: "Coverages",
      available: true,
      onClick: () => setCoverageModal(true),
    },
    {
      src: "xp_points_status.png",
      tooltip: "Xp Points",
      available: isXpPoints,
      onClick: () => setXpModal(true),
    },
    {
      src: "customer-support.png",
      tooltip: "Customer Support",
      available: true,
      onClick: toggleCallLogModal,
      className: "dark:bg-white",
    },
    {
      src: "newImage.png",
      tooltip: "Customer Profile",
      available: true,
      onClick: () => {
        window.open(
          `https://customer-profile.mypcp.us/?contractno=${contract?.contractinfo?.ContractNo}`,
          "_blank"
        );
      },
    },
    {
      src: "make-vin-change-history.png",
      tooltip: "Make Vin Change History",
      available: true,
      onClick: () => setVehicleHistoryModal(true),
    },

    {
      src: "wallet-bucks-icon.png",
      tooltip: "Wallet Bucks",
      available: contract?.dealersetting?.EnableWalletBucks,
    },
    {
      src: "loyalty_cash_status.png",
      tooltip: "Loyalty Cash Status",
      available: true,
      // available: contract?.dealersetting.EnableLoyaltyCash,
    },
    // {
    //   src: "customer-call-log-button.png",
    //   available: true,
    //   className: "dark:bg-white",
    // },

    {
      src: "renew-contract-button.png",
      tooltip: "Renew Contract",
      available: true,
    },
  ];

  return (
    <>
      <div className="flex flex-row gap-3 items-center">
        <Image
          src="/images/carfax-icon.png"
          width={170}
          height={100}
          alt="carfax icon"
          className={`object-contain cursor-pointer dark:bg-white `}
          onClick={toggleCarfaxModal}
        />
        <TooltipShad content={"Rating History"}>
          <RiStarSFill
            className="w-[30px] h-[30px] text-[#F57F1E] cursor-pointer"
            onClick={toggleRatingModal} // Open modal on button click
          />
        </TooltipShad>

        {dealersettinglist.map(
          (item, i) =>
            item.available && (
              <TooltipShad key={i} content={item?.tooltip}>
                <Image
                  src={`/images/${item.src}`}
                  width={30}
                  height={30}
                  alt={item?.tooltip ?? "alt"}
                  className={`object-contain cursor-pointer ${item.className}`}
                  onClick={item.onClick}
                />
              </TooltipShad>
            )
        )}
      </div>
      <XpModal
        contract={contract?.contractinfo}
        open={xpModal}
        close={() => setXpModal(false)}
      />
      {glovieModal && contract && (
        <GlovieModal
          open={glovieModal}
          close={() => setGlovieModal(false)}
          contract={contract?.contractinfo}
        />
      )}
      {carfaxModal && contract && (
        <Carfax
          isOpen={carfaxModal}
          onClose={toggleCarfaxModal}
          contractDetails={contract?.contractinfo}
        />
      )}
      <RatingModal
        ratingModal={ratingModal}
        toggleRatingModal={toggleRatingModal}
        contractDetails={contract?.contractinfo}
      />
      <CallLogModal
        callLogModal={callLogModal}
        toggleCallLogModal={toggleCallLogModal}
        contractDetails={contract?.contractinfo}
      />
      {coverage && contract && (
        <CoveragesModal
          close={() => setCoverageModal(false)}
          open={coverage}
          contract={contract}
        />
      )}
      {vehicleHistoryModal && contract && (
        <VehicleHistory
          open={vehicleHistoryModal}
          close={() => setVehicleHistoryModal(false)}
          ContractID={contract?.contractinfo?.ContractID}
        />
      )}
      {/* <XpModalOld
        isOpen={openXpModal}
        onClose={closeXpModal}
        contractDetails={contract?.contractinfo}
      /> */}
    </>
  );
};

export default TopActionModalIcons;
