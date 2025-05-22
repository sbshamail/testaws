import React, { useState } from "react";
import CrewModal from "../../CrewModal";
import Image from "next/image";
import { CustomButton } from "@/components/cui/button/CustomButton";

const CrewAction = ({ contract }) => {
  const [crewModal, setCrewModal] = useState(false);
  const handleCrewModal = () => {
    setCrewModal(!crewModal);
  };
  return (
    <>
      <CrewModal
        isOpen={crewModal}
        contractDetails={contract?.contractinfo}
        onClose={() => setCrewModal(false)}
        onSave={handleCrewModal}
      />
      <CustomButton
        titleClass={"pr-4"}
        onClick={handleCrewModal}
        Icon={() => (
          <div>
            <Image
              src={"/images/pit-crew.png"}
              height={28}
              width={28}
              alt="pitcre"
            />
          </div>
        )}
      >
        CREW
      </CustomButton>
      {/* <div
        onClick={handleCrewModal}
        className="bg-siteBlue flex text-base justify-center items-center gap-2 px-14 py-3 text-white font-semibold rounded-xl cursor-pointer"
      >
        CREW
        <Image
          src={"/images/pit-crew.png"}
          height={28}
          width={28}
          alt="pitcre"
        />
      </div> */}
    </>
  );
};

export default CrewAction;
