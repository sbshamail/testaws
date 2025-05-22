import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import PVInfo from "./PVInfo";
import ContactInfo from "./ContactInfo";
// import PaymentModal from "../PaymentModal";
import { GlobalContext } from "@/app/Provider";
import { EditContractContext } from "../page";

//components
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { CustomButton } from "@/components/cui/button/CustomButton";

const FillContract = ({
  setTabSelect,
  setFillContractData,
  setFormUpdateOnly,
}) => {
  const [modal, setModal] = useState(false);
  const [autoFillData, setAutoFillData] = useState();

  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { setDealerAutoFill, dealerAutoFill, setDataRecieved, contract } =
    useContext(EditContractContext);
  const [isLoading, setIsLoading] = useState(!contract); // Initialize based on the initial `contract` value

  useEffect(() => {
    setIsLoading(!contract); // Update `isLoading` whenever `contract` changes
  }, [contract]);

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

  const openPaymentModal = () => {
    setModal(true);
  };

  const closePaymentModal = () => {
    setModal(false);
  };

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
    const isContactInfoValid = contactInfoRef?.current?.validate();
    const isPvInfoValid = pvInfoRef?.current?.validate();
    // console.log("Check isContactInfoValid", isContactInfoValid);
    // console.log("Check isPvInfoValid", isPvInfoValid);
    if (isContactInfoValid && isPvInfoValid) {
      setTabSelect("price");
      setFillContractData(combinedData);
      // Proceed to the next step or save data
    } else {
      // toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div>
      {/* Main Content */}
      {isLoading && <SpinnerCenterScreen />}
      <div className=" relative">
        <div className="w-full flex flex-col gap-10">
          <ContactInfo
            ref={contactInfoRef}
            autoFillData={autoFillData}
            setFormUpdateOnly={setFormUpdateOnly}
            updateData={(data) => updateCombinedData("contactInfo", data)}
          />
          <PVInfo
            ref={pvInfoRef}
            autoFillData={autoFillData}
            setFormUpdateOnly={setFormUpdateOnly}
            updateData={(data) => updateCombinedData("pvInfo", data)}
          />
        </div>
        <div className="flex justify-end items-center w-full mt-4 mb-[calc(1.5rem+4px)]">
          <CustomButton onClick={handleNext}>Next</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default FillContract;
