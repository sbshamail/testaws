import React, { useState, useContext, useEffect } from "react";
import Input from "@/app/Components/Inputs/Input";
import RadioInput from "@/app/Components/Inputs/RadioInput";
import { GlobalContext } from "@/app/Provider";
import { EditContractContext } from "../../page";
import { unixTimestampToDate } from "@/app/functions";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { CustomButton } from "@/components/cui/button/CustomButton";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { inputFormatDate, formatDate, objectToFormData } from "@/utils/helpers";
import { fetchPost } from "@/utils/action/function";
import { DataF } from "@react-google-maps/api";
import SimpleModal from "@/components/cui/modals/SimpleModal";
const ServiceEditModal = ({
  isOpen,
  onClose,
  couponID,
  opCode,
  VehicleType,
  CouponTitle,
  ContractID,
  service,
}) => {
  const { contract, usedservices, setusedservices } =
    useContext(EditContractContext);
  const { auth, Token } = useContext(GlobalContext);
  // console.log(usedservices, service);
  const [latestmileage, setlatestmileage] = useState(service?.CouponMileage);
  const [servicero, setservicero] = useState(service?.RepairOrderNo);
  const [servicedate, setservicedate] = useState(
    inputFormatDate(unixTimestampToDate(service?.RecievedDate))
  );

  const [loading, setloading] = useState(false);
  const [upsell, setupsell] = useState(service?.UpsellAmount);
  const [contractedvehicle, setcontractedvehicle] = useState(
    service?.VehicleType
  );
  const [responseSave, setResponseSave] = useState(null);

  function convertToSecondsTimestamp(servicedate) {
    const date = new Date(servicedate);

    if (isNaN(date)) {
      toast.error("Invalid date format");
    }

    return Math.floor(date.getTime() / 1000);
  }

  const fetchredeemservice = () => {
    const hasServiceType4 = contract?.GetContractCouponById?.some(
      (coupon) => coupon.ServiceType === "4"
    );
    // console.log(
    //   "!!!!!!!!!!!!!!!!",
    //   !hasServiceType4,

    //   convertToSecondsTimestamp(servicedate),
    //   parseInt(contract?.contractinfo?.ValidityDate),
    //   contract?.contractinfo?.UnlimitedTerm,
    //   parseInt(latestmileage),
    //   parseInt(contract?.contractinfo?.ValidityMileage),
    //   contract?.contractinfo?.UnlimitedMileage
    // );
    if (
      (convertToSecondsTimestamp(servicedate) >
        parseInt(contract?.contractinfo?.ValidityDate) &&
        contract?.contractinfo?.UnlimitedTerm == "0") ||
      (parseInt(latestmileage) >
        parseInt(contract?.contractinfo?.ValidityMileage) &&
        contract?.contractinfo?.UnlimitedMileage == "0")
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "This is going to mature your contract. Are you sure you want to continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          proceedWithFetch();
        } else {
          return;
        }
      });
    } else {
      proceedWithFetch();
    }
  };

  const proceedWithFetch = async () => {
    toast.dismiss();

    const saleDate = unixTimestampToDate(contract?.contractinfo?.SaleDate);
    const currentDate = new Date();
    const servicedateFormatted = formatDate(servicedate);

    // Check if the service date is before the sale date
    if (servicedateFormatted < saleDate) {
      toast.error("Please enter a correct Date of Service.");
      return;
    }

    // Check if the service date is a future date
    if (servicedateFormatted > formatDate(currentDate)) {
      toast.error("Please enter a correct Date of Service.");
      return;
    }

    setloading(true);

    const data = {
      VehicleType: contractedvehicle,
      LatestMileage: latestmileage,
      RONumber: servicero,
      DateOfService: servicedateFormatted,
      UpsellAmount: upsell,
      NewCouponID: couponID,
      CouponID: couponID,
      ContractID: ContractID,
      OldVehicleType: service.VehicleType,
    };
    const formdata = objectToFormData({
      ...auth,
      ...data,
    });
    const res = await fetchPost({
      url: "https://mypcp.us/webservices/contracts/validatenormalcoupon",
      token: Token,
      formdata,
      showToast: true,
      setLoading: setloading,
    });
    if (res) {
      const updatedServices = usedservices?.map((item) =>
        item.CouponID === couponID
          ? {
              ...item,
              VehicleType: contractedvehicle,
              CouponMileage: latestmileage,
              RepairOrderNo: servicero,
              RecievedDate: servicedateFormatted,
              UpsellAmount: upsell,
            }
          : item
      );
      // console.log("updatedServices", updatedServices);
      setusedservices(updatedServices);
      setResponseSave(res);
    }
  };

  if (!isOpen) return null;

  return (
    <SimpleModal
      close={onClose}
      open={isOpen}
      className={"w-7/12 mx-auto"}
      title={`Edit Service - ${CouponTitle} (${couponID})`}
    >
      <div className={` px-8  `}>
        {!responseSave?.message && !responseSave?.success == "1" ? (
          <div className="">
            <div className="font-bold text-2xl">
              {opCode && (
                <>
                  {" "}
                  / <span className="text-siteBlue px-2 rounded">{opCode}</span>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Latest Mileage"
                placeholder="Latest Mileage"
                type="number"
                bgcolor={"gray-100"}
                width={"full"}
                value={latestmileage}
                setvalue={setlatestmileage}
              />

              {/* Input for RO Number */}
              <Input
                label="RO Number"
                placeholder="RO Number"
                type="text"
                bgcolor={"gray-100"}
                width={"full"}
                value={servicero}
                setvalue={setservicero}
              />
              <Input
                label="Date of Service"
                value={servicedate}
                setvalue={setservicedate}
                type="date"
                width={"full"}
                bgcolor={"gray-100"}
                defaultValue1={servicedate}
              />

              <Input
                label="Upsell Amount"
                placeholder="Upsell Amount"
                type="text"
                bgcolor={"gray-100"}
                width={"full"}
                value={upsell}
                setvalue={setupsell}
              />
            </div>

            <div className="w-full flex flex-row gap-5 mt-5">
              <div>
                <RadioInput
                  option={{ text: "Contracted Vehicle", value: "C" }}
                  value={contractedvehicle}
                  setvalue={setcontractedvehicle}
                />
              </div>

              {/* {contract?.contractinfo?.AllowRedemptionOnNonContracted == "1" && ( */}
              <div>
                <RadioInput
                  option={{ text: "Gifted or Non Contracted", value: "NC" }}
                  value={contractedvehicle}
                  setvalue={setcontractedvehicle}
                />
              </div>
              {/* )} */}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <CustomButton variant="danger" onClick={onClose}>
                Cancel
              </CustomButton>
              <DancingLoadingButton
                onClick={fetchredeemservice}
                loading={loading}
              >
                Confirm
              </DancingLoadingButton>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="text-black text-2xl font-bold text-center">
              {responseSave?.message?.replace(/<br>/gi, "")}
            </div>
            <div className="flex justify-center gap-3 mt-6">
              <button
                className="bg-white text-black border border-black font-bold py-2 px-8 rounded-md hover:bg-gray-100"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </SimpleModal>
  );
};

export default ServiceEditModal;
