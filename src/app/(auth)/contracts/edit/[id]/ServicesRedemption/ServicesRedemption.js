import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "@/app/Provider";
import { EditContractContext } from "../page";

import Swal from "sweetalert2";
import Services from "./Services/Services";

import { unixTimestampToDate } from "@/app/functions";
import ResellContractModal from "../ResellContractModal";

import ServicesRedemptionModal from "./Services/ServicesRedemptionModal";

import ActiveService from "./component/ActiveService";
import RedeemHeader from "./component/RedeemHeader";
import DeviceIcons from "./component/DeviceIcons";
import CrewAction from "./component/CrewAction";
import ContactVia from "./component/ContactVia";
import FormRedeemServices from "./component/FormRedeemServices";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
const ServicesRedemption = ({}) => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    params,
    contract,
    services,
    usedservices,
    couponIds,
    setRedemptionData,
    serviceRedeemed,
  } = useContext(EditContractContext);

  const [loading, setloading] = useState(false);
  const [redeemedservices, setredeemedservices] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const [responseSave, setResponseSave] = useState("");
  const [resellContractModal, setResellContractModal] = useState(true);
  const [vehicleData, setVehicleData] = useState({});
  const [formValues, setFormValues] = useState({
    latestmileage: "",
    servicero: "",
    servicedate: "",
    upsell: "",
    contractedvehicle: "C",
    redeememail: "0",
    rsib: "0",
    rsibreason: "",
    oos: "0",
    oosreason: "",
  });
  const {
    latestmileage,
    servicero,
    servicedate,
    upsell,
    contractedvehicle,
    redeememail,
    oos,
  } = formValues;
  const handleInputValue = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (serviceRedeemed) {
      setFormValues((prev) => ({
        ...prev,
        latestmileage: "",
        servicero: "",
        servicedate: "",
        upsell: "",
      }));
    }
  }, [serviceRedeemed]);

  const closeServiceModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (services) {
      const tempservices = services.map((service) => {
        return { ...service, checked: false };
      });
      setredeemedservices(tempservices);
    }
  }, [services, serviceRedeemed]);
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const totalCouponSum = services?.reduce((sum, service) => {
    if (service.ServiceType !== "4") {
      return sum + parseInt(service.totalCoupon, 10);
    }
    return sum;
  }, 0);

  function convertToSecondsTimestamp(servicedate) {
    const date = new Date(servicedate);

    if (isNaN(date)) {
      toast.error("Invalid date format");
    }

    return Math.floor(date.getTime() / 1000);
  }

  const fetchredeemservice = () => {
    // Check if any condition is met to show the confirmation modal, excluding ServiceType "4"
    const hasServiceType4 = contract?.GetContractCouponById?.some(
      (coupon) => coupon.ServiceType === "4"
    );
    // console.log(
    //   "!!!!!!!!!!!!!!!!",
    //   !hasServiceType4,
    //   couponIds.length,
    //   parseInt(totalCouponSum),
    //   convertToSecondsTimestamp(servicedate),
    //   parseInt(contract?.contractinfo?.ValidityDate),
    //   contract?.contractinfo?.UnlimitedTerm,
    //   parseInt(latestmileage),
    //   parseInt(contract?.contractinfo?.ValidityMileage),
    //   contract?.contractinfo?.UnlimitedMileage
    // );
    if (
      (!hasServiceType4 && couponIds.length === parseInt(totalCouponSum)) ||
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
          proceedWithFetch(); // Call the function to continue with the fetch logic
        } else {
          return; // Do nothing if the user cancels
        }
      });
    } else {
      proceedWithFetch(); // Proceed without confirmation if none of the conditions are met
    }
  };

  const proceedWithFetch = () => {
    toast.dismiss();

    const saleDate = formatDate(
      unixTimestampToDate(contract?.contractinfo?.SaleDate)
    );
    const currentDate = new Date();
    const servicedateFormatted = formatDate(servicedate);

    // convert string date into Date format for conditions
    const serviceDate = new Date(servicedateFormatted);
    const saleDateObj = new Date(saleDate);

    // Check if the service date is before the sale date
    if (serviceDate < saleDateObj) {
      toast.error("Please enter a correct Date of Service!!!.");
      return;
    }

    // Check if the service date is a future date
    if (serviceDate > currentDate) {
      toast.error("Please enter a correct Date of Service.");
      return;
    }

    setloading(true);

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();

    // Append all required data
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);

    formdata.append("VehicleType", contractedvehicle);
    formdata.append("LatestMileage", latestmileage);
    formdata.append("RONumber", servicero);
    formdata.append("DateOfService", servicedateFormatted);
    formdata.append("UpsellAmount", upsell);

    // Filter couponIds to avoid undefined, null, or empty values
    (couponIds ?? [])
      .filter(
        (couponId) =>
          couponId !== undefined && couponId !== null && couponId !== ""
      )
      .forEach((couponId) =>
        formdata.append(`RedeemCouponID[${couponId}]`, couponId)
      );

    formdata.append("ContractID", contract.contractinfo?.ContractID);
    formdata.append("hidden_service", couponIds.length); // number of tokens
    formdata.append("EnableSkipOrangeService", oos);
    formdata.append("emailnotsent", redeememail);

    fetch("https://mypcp.us/webservices/contracts/validatereedemservices", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setloading(false);
        if (res.success === 1) {
          setRedemptionData({
            VehicleType: contractedvehicle,
            LatestMileage: latestmileage,
            RONumber: servicero,
            DateOfService: servicedateFormatted,
            UpsellAmount: upsell,
            hidden_service: couponIds.length,
            EnableSkipOrangeService: oos,
            emailnotsent: redeememail,
            response: res,
          });

          setResponseSave(res);
          setModalOpen(true);
        }
        if (res.success === 0) {
          const errorMessages = res.message.split("\n");
          errorMessages.forEach((message) => {
            if (message.trim() !== "") {
              toast.error(message.trim());
            }
          });
        }
      })
      .catch((error) => {
        setloading(false);
        console.error("Error fetching redeem service:", error);
        toast.error("Failed to redeem service. Please try again.");
      });
  };

  useEffect(() => {
    toast.dismiss();

    if (
      parseInt(services.UnlimitedMileage) === 0 ||
      contractedvehicle !== "NC"
    ) {
      if (
        parseInt(latestmileage) >
        parseInt(contract?.contractinfo?.ValidityMileage)
      ) {
        toast.error("Mileage Exceeded 1");
      }
    }
  }, [latestmileage]);

  // Function to convert a date string in MM-DD-YYYY format to a Date object
  const parseDate = (dateString) => {
    const [month, day, year] = dateString.split("-");
    return new Date(year, month - 1, day); // Months are 0-indexed in JavaScript Date
  };

  // Convert and compare dates
  const validityDate = parseDate(
    unixTimestampToDate(contract?.contractinfo?.ValidityDate)
  );
  const serviceDate = parseDate(formatDate(servicedate));
  if (services?.UnlimitedTerm == "0") {
    if (serviceDate > validityDate) {
      toast.error("Date Exceeded");
    }
  }
  const expiryDate = new Date(contract?.contractinfo?.ExpirayDate);
  const formattedDate = expiryDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const CancelDate = new Date(
    unixTimestampToDate(contract?.contractinfo?.CancelDate)
  );
  const formattedDate1 = CancelDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const dayWithSuffix = (day) => {
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    return `${day}${suffix}`;
  };

  const day = dayWithSuffix(expiryDate.getDate());
  const day1 = dayWithSuffix(CancelDate.getDate());
  const closeModal = () => setResellContractModal(false);
  // console.log("********", CancelDate, formattedDate1, day1);

  // main

  return (
    <>
      <SpinnerCenterScreen loading={loading} />
      <div className="w-full flex flex-col gap-6">
        <RedeemHeader />
        <div className="flex justify-between gap-4 flex-wrap">
          <div className="">
            <DeviceIcons contract={contract} />
          </div>
          {(contract?.contractinfo.Status === "P" ||
            contract?.contractinfo.Status === "M" ||
            contract?.contractinfo.Status === "S") && (
            <div className="bg-card text-card-foreground  border border-primary/50 justify-center cursor-default  p-4 rounded-lg sm:min-w-[450px] w-full flex-1 flex items-center gap-1 text-base shadow-md">
              {!contract?.contractinfo?.ExpiryReason && (
                <span className="font-semibold">Your Contract is Matured</span>
              )}
              {contract?.contractinfo?.ExpiryReason && (
                <span className="font-semibold">
                  Your Contract is Matured Due to
                </span>
              )}
              <span>{contract?.contractinfo?.ExpiryReason}</span>
              <span className="text-muted-foreground">
                Date: {day} {formattedDate.split(" ")[1]}{" "}
                {formattedDate.split(" ")[2]}
              </span>
            </div>
          )}
          {contract?.contractinfo.Status === "C" && (
            <div className="bg-card border text-card-foreground border-primary/50 justify-center cursor-default  p-4 rounded-lg sm:min-w-[450px] w-full flex-1 flex items-center gap-1 text-base shadow-md">
              {!contract?.contractinfo?.CancellationReason && (
                <span className="font-semibold">
                  Your Contract is Cancelled
                </span>
              )}
              {contract?.contractinfo?.CancellationReason && (
                <span className="font-semibold">
                  Your Contract is Cancelled Due to
                </span>
              )}
              <span>{contract?.contractinfo?.CancellationReason} </span>
              <span className="text-muted-foreground">
                Date:{day1} {formattedDate1.split(" ")[1]}{" "}
                {formattedDate1.split(" ")[2]}
              </span>
            </div>
          )}
          {/* CREW */}
          <div>
            <CrewAction contract={contract} /> {/* Crew Button */}
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-10">
          <div className="flex-1 flex flex-col gap-5 min-w-[500px]">
            <Services
              redeemedservices={redeemedservices}
              setredeemedservices={setredeemedservices}
            />
          </div>

          <div className="flex-1">
            <FormRedeemServices
              contract={contract}
              handleInputValue={handleInputValue}
              values={formValues}
              loading={loading}
              fetchredeemservice={fetchredeemservice}
              usedservices={usedservices}
              params={params}
              setVehicleData={setVehicleData}
            />

            <ContactVia />
          </div>
        </div>
        <ActiveService /> {/* Used Services,  Gifted Services */}
        {/* <div className="w-full flex flex-row justify-between gap-5">
     
        <button
          onClick={handleSubmit}
          className="py-3 px-10 rounded-2xl mt-4 bg-siteBlue text-white"
        >
          Save
        </button>
      </div> */}
        {contract?.contractinfo?.Status === "M" && resellContractModal && (
          <ResellContractModal
            onClose={closeModal}
            resellContractModal={resellContractModal}
            contractId={contract.contractinfo?.ContractID}
          />
        )}
        <ServicesRedemptionModal
          isOpen={responseSave ? isModalOpen : false}
          closeServiceModal={closeServiceModal}
          content={responseSave}
          setModalOpen={setModalOpen}
          VinNumber={vehicleData.VinNumber}
        />
      </div>
    </>
  );
};

export default ServicesRedemption;
