import React, { useState, useContext, useRef } from "react";

import CreateContactInfo from "./createContactInfo/CreateContactInfo";
import PaymentModal from "../PaymentModal";
import { GlobalContext } from "@/app/Provider";
import { CreateContractContext } from "../page";

//utils
import { fetchPost } from "@/utils/action/function";
import { objectToFormData, Toastify } from "@/utils/helpers";
import { handle_Contact_PV_Info } from "./function";
import { CustomButton } from "@/components/cui/button/CustomButton";
import dynamic from "next/dynamic";
import { validate } from "./createPVInfo/fn";

const CreatePVInfo = dynamic(() => import("./createPVInfo/CreatePVInfo"), {
  ssr: false,
});

const CreateFillContract = ({
  setTabSelect,
  setFillContractData,
  auth,
  contractCreate,
  setLoading,
}) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { dealerAutoFill, autoFillData, setAutoFillData } = useContext(
    CreateContractContext
  );

  const [contactInfoForm, setContactInfoForm] = useState({});
  const [pvInfoForm, setPvInfoForm] = useState({});
  const [errors, setErrors] = useState({});

  // Refs to call validate functions in child components
  const contactInfoRef = useRef();

  const dealerOptions = GLOBAL_DEALERS_INFO
    ? GLOBAL_DEALERS_INFO.map((dealer) => {
        return { text: dealer.DealerTitle, value: dealer.DealerID };
      })
    : [];
  const defaultDealer = dealerOptions?.find(
    (dealer) => dealer.value === GLOBAL_RESPONSE?.DefaultDealerID
  );

  // const openPaymentModal = () => {
  //   setModal(true);
  // };

  // const closePaymentModal = () => {
  //   setModal(false);
  // };

  const handleAutoFill = async () => {
    setLoading(true);
    const DealerID = dealerAutoFill ? dealerAutoFill : defaultDealer?.value;
    const formdata = objectToFormData({ ...auth, DealerID });
    await fetchPost({
      url: "https://mypcp.us/webservices/contracts/autofillvalue",
      formdata,
      token: GLOBAL_RESPONSE.Token,
      setState: setAutoFillData,
      showToast: true,
      setLoading,
      isValue: true,
    });
  };

  // Function to handle "Next" button click
  const handleNext = () => {
    const isValid = validate(pvInfoForm, setErrors);
    const isContactInfoValid = contactInfoRef?.current?.validate();
    if (!isContactInfoValid) {
      return;
    } else if (!isValid) {
      return;
    } else {
      setTabSelect("price");
      handle_Contact_PV_Info(contactInfoForm, pvInfoForm, setFillContractData);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col gap-10">
        <CreateContactInfo
          ref={contactInfoRef}
          autoFillData={autoFillData}
          auth={auth}
          contactInfoForm={contactInfoForm}
          setContactInfoForm={setContactInfoForm}
          contractCreate={contractCreate}
        />

        <div>
          <CreatePVInfo
            setErrors={setErrors}
            autoFillData={autoFillData}
            pvInfoForm={pvInfoForm}
            setPvInfoForm={setPvInfoForm}
            auth={auth}
            defaultDealer={defaultDealer?.value}
            contractCreate={contractCreate}
            setLoading={setLoading}
            errors={errors}
          />
        </div>
        <div className="flex justify-between items-center w-full mt-4">
          <CustomButton id="auto-fill" onClick={handleAutoFill}>
            Auto Fill
          </CustomButton>
          <CustomButton id="next-page-print-contract" onClick={handleNext}>
            Next
          </CustomButton>
        </div>

        {/* {modal && <PaymentModal closeModal={closePaymentModal} />} */}
      </div>
    </>
  );
};

export default CreateFillContract;
