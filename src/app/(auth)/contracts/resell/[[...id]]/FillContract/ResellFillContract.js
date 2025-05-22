import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import ResellContactInfo from "./ResellContactInfo";
// import PaymentModal from "../PaymentModal";
import { GlobalContext } from "@/app/Provider";
import { ResellContractContext } from "../page";
import toast from "react-hot-toast";
import ResellPVInfo from "./ResellPVInfo";
import { useRouter } from "next/navigation";

const ResellFillContract = ({
  setTabSelect,
  setFillContractData,
  fillContractData,
}) => {
  const router = useRouter();

  // console.log("#######Plan ID:", plan);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [autoFillData, setAutoFillData] = useState();
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    setDealerAutoFill,
    dealerAutoFill,
    setDataRecieved,
    setDataRecievedCount,
  } = useContext(ResellContractContext);

  // Combined state for both forms
  const [combinedData, setCombinedData] = useState({
    contactInfo: {},
    pvInfo: {},
  });

  // Refs to call validate functions in child components
  const contactInfoRef = useRef();
  const pvInfoRef = useRef();

  const dealerOptions = GLOBAL_DEALERS_INFO
    ? GLOBAL_DEALERS_INFO.map((dealer) => {
        return { text: dealer.DealerTitle, value: dealer.DealerID };
      })
    : [];

  const defaultDealer = dealerOptions?.find(
    (dealer) => dealer.value === GLOBAL_RESPONSE?.DefaultDealerID
  );

  // Function to update combined data
  const updateCombinedData = (section, data) => {
    setCombinedData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  // Function to handle "Next" button click
  const handleNext = () => {
    setDataRecieved(true);
    setDataRecievedCount((prevCount) => prevCount + 1);

    const isContactInfoValid = contactInfoRef?.current?.validate();
    const isPvInfoValid = pvInfoRef?.current?.validate();
    // console.log("Check isContactInfoValid", isContactInfoValid);
    // console.log("Check isPvInfoValid", isPvInfoValid);
    if (isContactInfoValid && isPvInfoValid) {
      console.log("Check", combinedData);
      setFillContractData((prevData) => ({ ...prevData, ...combinedData }));
      // Proceed to the next step or save data
    } else {
      // toast.error("Please fix the errors in the form.");
    }
  };
  useEffect(() => {
    setFillContractData(combinedData);
  }, [combinedData, fillContractData, setFillContractData]);

  return (
    <>
      <div className="w-full flex flex-col gap-10">
        <ResellContactInfo
          ref={contactInfoRef}
          autoFillData={autoFillData}
          updateData={(data) => updateCombinedData("contactInfo", data)}
        />
        <ResellPVInfo
          ref={pvInfoRef}
          autoFillData={autoFillData}
          updateData={(data) => updateCombinedData("pvInfo", data)}
        />
      </div>
      <div className="flex justify-end items-center w-full gap-4 mt-4 mb-3">
        <button
          // onClick={handleAutoFill}
          className="py-3 px-10 rounded-xl bg-white text-gray-400 border-2 border-gray-300 font-semibold"
        >
          Go Back
        </button>{" "}
        <button
          // onClick={handleNext}
          className="py-3 px-10 rounded-xl bg-siteBlue text-white"
        >
          Quick Save
        </button>
        <button
          onClick={handleNext}
          className="py-3 px-10 rounded-xl bg-siteBlue text-white"
        >
          Save Contract
        </button>
      </div>
    </>
  );
};

export default ResellFillContract;
