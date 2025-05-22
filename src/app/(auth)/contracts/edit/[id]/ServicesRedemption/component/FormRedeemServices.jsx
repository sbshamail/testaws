import React, { useState } from "react";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import CheckboxWithText from "@/app/Components/Inputs/CheckboxWithText";
import RadioInput from "@/app/Components/Inputs/RadioInput";
import TextAreaInput from "@/app/Components/Inputs/TextAreaInput";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import PrintServiceDetail from "@/components/printModals/PrintServiceDetail";
import { AiOutlineMail } from "react-icons/ai";
import TextField from "@/components/cui/textField/TextField";
import VinAddVehicleModal from "./VinAddVehicleModal";

const FormRedeemServices = ({
  contract,
  handleInputValue,
  values,
  loading,
  fetchredeemservice,
  usedservices,
  params,
  setVehicleData,
}) => {
  const {
    latestmileage,
    servicero,
    servicedate,
    upsell,
    contractedvehicle,
    redeememail,
    rsib,
    rsibreason,
    oos,
    oosreason,
  } = values;
  const [addVehicleModal, setAddVehicleModal] = useState(false);
  const InputFields = () => (
    <>
      <div className="w-full flex flex-wrap gap-5 ">
        <TextField
          label="Latest Mileage"
          value={latestmileage}
          onChange={(e) => handleInputValue("latestmileage", e.target.value)}
          placeholder="Latest Mileage"
          type="number"
          outerClassName="flex-1 min-w-[200px] "
        />
        <TextField
          label="RO Number"
          value={servicero}
          onChange={(e) => handleInputValue("servicero", e.target.value)}
          placeholder="RO Number"
          type="text"
          outerClassName="flex-1 min-w-[200px] "
        />
        <TextField
          label="Date of Service"
          value={servicedate}
          onChange={(e) => handleInputValue("servicedate", e.target.value)}
          placeholder="Date of Service"
          type="date"
          outerClassName="flex-1 min-w-[200px] "
        />
        <TextField
          label="Upsell Amount"
          value={upsell}
          onChange={(e) => handleInputValue("upsell", e.target.value)}
          placeholder="Upsell Amount"
          type="text"
          outerClassName="flex-1 min-w-[200px] "
        />
      </div>
    </>
  );
  const conditionsField = ({
    giftedOrNonContracted,
    redeemServiceBetween = true,
    overrideOrangeServices,
  }) => (
    <>
      <div className="w-full flex gap-4 ">
        <div>
          <RadioInput
            option={{ text: "Contracted Vehicle", value: "C" }}
            value={contractedvehicle}
            //   setvalue={setcontractedvehicle}
            setvalue={(value) => handleInputValue("contractedvehicle", value)}
          />
        </div>
        {giftedOrNonContracted && (
          <div onClick={() => setAddVehicleModal(true)}>
            <RadioInput
              option={{
                text: "Gifted or Non Contracted",
                value: "NC",
              }}
              value={contractedvehicle}
              //   setvalue={setcontractedvehicle}
              setvalue={(value) => handleInputValue("contractedvehicle", value)}
            />
          </div>
        )}
      </div>

      <CheckboxWithText
        label="Don't send Service Redeem email"
        icon={<AiOutlineMail size={20} />}
        checked={redeememail}
        // setchecked={setredeememail}
        setchecked={(value) => handleInputValue("redeememail", value)}
        bg="bg-gray-200"
        color="gray-500"
      />
      {redeemServiceBetween && (
        <CheckboxWithText
          label="Redeem Service in between"
          checked={rsib}
          setchecked={(value) => handleInputValue("rsib", value)}
          bg="bg-gray-200"
          selected="1"
          notselected="0"
        />
      )}
      {(rsib === "1" || rsib === 1 || rsib === true || rsib === "true") && (
        <TextField
          textarea={true}
          value={rsibreason}
          //   setvalue={setrsibreason}
          rows={2}
          onChange={(e) => handleInputValue("rsibreason", e.target.value)}
          placeholder="Enter Your Reason Here"
        />
      )}
      {overrideOrangeServices && (
        <CheckboxWithText
          label="Override Orange Services"
          checked={oos}
          //   setchecked={setoos}
          setchecked={(value) => handleInputValue("oos", value)}
          bg="bg-siteOrange"
          color="white"
          selected="1"
          notselected="0"
        />
      )}
      {oos == "1" && (
        <TextAreaInput
          value={oosreason}
          //   setvalue={setoosreason}
          setvalue={(value) => handleInputValue("oosreason", value)}
          placeholder="Enter Your Reason Here"
          bgcolor={"gray-200"}
        />
      )}
      <div className="w-full flex  flex-wrap gap-4 items-center justify-between">
        <div className=" w-auto whitespace-nowrap">
          <DancingLoadingButton
            loading={loading}
            onClick={fetchredeemservice}
            variant="main"
          >
            Redeem Services
          </DancingLoadingButton>
        </div>
        <div className=" w-auto whitespace-nowrap text-right">
          <PrintServiceDetail contractId={params.id} />
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className="w-full">
        {contract?.showRedeemAfterExpiredbtn == "1" &&
        (contract?.contractinfo?.Status == "M" ||
          contract?.contractinfo?.Status == "C" ||
          contract?.contractinfo?.Status == "P" ||
          contract?.contractinfo?.Status == "S") ? (
          <ShadowContainer>
            <div className="flex flex-col gap-5">
              {contract?.GetMaturedContractById?.length > 0 && (
                <div className="bg-red-700 text-white w-fit px-5 py-2 font-semibold tracking-wide rounded-xl my-1">
                  Redeem Service After Expiration
                </div>
              )}

              {InputFields()}
              {conditionsField({
                giftedOrNonContracted:
                  contract?.contractinfo?.AllowRedemptionOnNonContracted == "1",
                overrideOrangeServices: contract?.totaloranbeservices,
              })}
            </div>
          </ShadowContainer>
        ) : contract?.contractinfo?.Status === "I" ||
          contract?.contractinfo?.Status === "L" ? (
          <ShadowContainer>
            <div className="flex flex-col gap-5">
              {InputFields()}
              {conditionsField({
                giftedOrNonContracted:
                  contract?.getDealerByID?.HideRedemptionOnNonContract == "0",
                redeemServiceBetween: usedservices?.length > 1,
                overrideOrangeServices: contract?.totaloranbeservices == "1",
              })}
            </div>
          </ShadowContainer>
        ) : (
          <ShadowContainer bg={"transparent"}></ShadowContainer>
        )}
      </div>
      {addVehicleModal && (
        <VinAddVehicleModal
          open={addVehicleModal}
          close={() => setAddVehicleModal(false)}
          setVehicleData={setVehicleData}
        />
      )}
    </>
  );
};

export default FormRedeemServices;
