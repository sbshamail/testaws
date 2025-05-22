import { GlobalContext } from "@/app/Provider";
import React, { useContext, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { EditContractContext } from "../../page";
import toast from "react-hot-toast";
import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";

const ServicesRedemptionModal = ({
  isOpen,
  closeServiceModal,
  content,
  setModalOpen,
  VinNumber,
}) => {
  const [code, setCode] = useState("");
  const [loading, setloading] = useState(false);
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    contract,
    couponIds,
    redemptionData,
    couponIdswithValues,
    services,
    setServiceRedeemed,
  } = useContext(EditContractContext);

  const handleCodeChange = (e) => {
    const input = e.target.value;

    // Allow only digits and limit to 6 characters
    if (/^[a-zA-Z0-9]{0,6}$/.test(input)) {
      setCode(input);

      // Show error if less than 6 characters
    }
  };

  const fetchredeemservice = () => {
    // if (code.length < 6) {
    //   toast.error("Manager approval code must be 6 digits!");
    //   return;
    // }
    setloading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();

    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("VehicleType", redemptionData?.VehicleType);
    formdata.append("LatestMileage", redemptionData?.LatestMileage);
    formdata.append("RONumber", redemptionData?.RONumber);
    formdata.append("DateOfService", redemptionData?.DateOfService);
    formdata.append("UpsellAmount", redemptionData?.UpsellAmount);
    if (redemptionData?.VehicleType === "NC") {
      formdata.append("VinNumber", VinNumber);
    }

    (couponIds ?? [])
      .filter(
        (couponId) =>
          couponId !== undefined && couponId !== null && couponId !== ""
      )
      .forEach((couponId) =>
        formdata.append(`RedeemCouponID[${couponId}]`, couponId)
      );

    formdata.append("ContractID", contract?.contractinfo?.ContractID);
    formdata.append("hidden_service", couponIds?.length);

    formdata.append(
      "EnableSkipOrangeService",
      redemptionData?.EnableSkipOrangeService
    );
    formdata.append("emailnotsent", redemptionData?.emailnotsent);
    formdata.append(
      "isRequireManagerCode",
      redemptionData?.response?.rdata?.passcode
    );
    formdata.append("ManagerApproval", code);

    const variablePriceCouponIds = couponIdswithValues;

    const variablePriceIdsArray = Array.isArray(variablePriceCouponIds)
      ? variablePriceCouponIds
      : typeof variablePriceCouponIds === "object" &&
        variablePriceCouponIds !== null
      ? Object.values(variablePriceCouponIds)
      : variablePriceCouponIds
      ? [variablePriceCouponIds]
      : [];
    // console.log("variablePriceIdsArray", variablePriceIdsArray);

    variablePriceIdsArray
      .filter(
        (couponId) =>
          couponId !== undefined && couponId !== null && couponId !== ""
      )
      .forEach((couponId) =>
        formdata.append(`VariablePrice[${couponId.id}]`, couponId.value)
      );
    // ----------------------------------------------------------------
    const grayCouponIds = redemptionData?.response?.rdata?.grayout_servicelist;

    const grayIdsArray = Array.isArray(grayCouponIds)
      ? grayCouponIds
      : typeof grayCouponIds === "object" && grayCouponIds !== null
      ? Object.values(grayCouponIds)
      : grayCouponIds
      ? [grayCouponIds]
      : [];

    grayIdsArray
      .filter(
        (couponId) =>
          couponId !== undefined && couponId !== null && couponId !== ""
      )
      .forEach((couponId) =>
        formdata.append(`grayoutservicelist[${couponId}]`, couponId)
      );
    formdata.append(
      "RedeemAfterExpired",
      contract?.contractinfo?.Status === "P" ||
        contract?.contractinfo?.Status === "M" ||
        contract?.contractinfo?.Status === "S"
        ? "1"
        : "0"
    );

    // ----------------------------------------------------------------
    const blueCouponIds = redemptionData?.response?.rdata?.BlueReedemCouponID;
    const blueIdsArray = Array.isArray(blueCouponIds)
      ? blueCouponIds
      : typeof blueCouponIds === "object" && blueCouponIds !== null
      ? Object.values(blueCouponIds)
      : blueCouponIds
      ? [blueCouponIds]
      : [];

    blueIdsArray
      .filter(
        (couponId) =>
          couponId !== undefined && couponId !== null && couponId !== ""
      )
      .forEach((couponId) =>
        formdata.append(`BlueReedemCouponID[${couponId}]`, couponId)
      );
    // ----------------------------------------------------------------

    const purpleCouponIds =
      redemptionData?.response?.rdata?.PurpleReedemCouponID;

    const purpleIdsArray = Array.isArray(purpleCouponIds)
      ? purpleCouponIds
      : typeof purpleCouponIds === "object" && purpleCouponIds !== null
      ? Object.values(purpleCouponIds)
      : purpleCouponIds
      ? [purpleCouponIds]
      : [];

    purpleIdsArray
      .filter(
        (couponId) =>
          couponId !== undefined && couponId !== null && couponId !== ""
      )
      .forEach((couponId) =>
        formdata.append(`PurpleReedemCouponID[${couponId}]`, couponId)
      );
    // ----------------------------------------------------------------

    const reedemCouponIds = redemptionData?.response?.rdata?.ReedemCouponID;

    // Extract values if reedemCouponIds is an object; ensure it is an array
    const reedemIdsArray = Array.isArray(reedemCouponIds)
      ? reedemCouponIds
      : typeof reedemCouponIds === "object" && reedemCouponIds !== null
      ? Object.values(reedemCouponIds)
      : reedemCouponIds
      ? [reedemCouponIds]
      : [];

    reedemIdsArray
      .filter(
        (couponId) =>
          couponId !== undefined && couponId !== null && couponId !== ""
      )
      .forEach((couponId) =>
        formdata.append(`ReedemCouponID[${couponId}]`, couponId)
      );

    fetch(
      "https://mypcp.us/webservices/contractservices/contractservicesreedem",
      {
        method: "POST",
        body: formdata,
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setloading(false);
        if (res.success === 1) {
          setModalOpen(false);
          setServiceRedeemed(res.success);
        }

        if (res.success === 0) {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setloading(false);
        console.error("Error fetching redeem service:", error);
        toast.error(error);
      });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="absolute inset-0 z-10 bg-transparent" />
        {content.success === 1 && (
          <div className="bg-white p-6 rounded-lg z-20 w-2/5 relative">
            <div className="flex justify-between">
              <div className="text-gray-600 text-xl font-bold flex items-center gap-2">
                <FaExclamationCircle className="text-base" />
                Service Redemption Code
              </div>
              <div
                onClick={closeServiceModal}
                className="text-gray-500 text-2xl cursor-pointer"
              >
                &times;
              </div>
            </div>
            <div className="my-5">
              <ul className="max-h-60 overflow-y-auto">
                {content?.rdata?.error?.map((item, index) => {
                  let icon, textColor, additionalMessage;
                  switch (item.class) {
                    case "text_green":
                      icon = (
                        <i className="fa fa-check-circle text-green-500"></i>
                      );
                      textColor = "text-green-500";
                      break;
                    case "text_gray":
                      icon = (
                        <i className="fa fa-exclamation-triangle text-gray-500"></i>
                      );
                      textColor = "text-gray-500";
                      break;
                    case "text_purple":
                      icon = (
                        <i className="fa fa-info-circle text-purple-500"></i>
                      );
                      textColor = "text-purple-500";
                      break;
                    case "text_red":
                      icon = (
                        <i className="fa fa-times-circle text-red-500"></i>
                      );
                      textColor = "text-red-500";
                      break;
                    default:
                      icon = null;
                      textColor = "text-gray-700";
                  }

                  // Determine background color
                  const bgColor =
                    item.ServiceType === 1
                      ? "bg-green-500/20"
                      : item.ServiceType === 2
                      ? "bg-orange-500/20"
                      : item.ServiceType === 3
                      ? "bg-blue-500/20"
                      : item.ServiceType === 4
                      ? "bg-purple-500/20"
                      : "bg-gray-200/20";

                  // Add "Forfeit all factory services" for ServiceType 2 and 4
                  if (
                    item.class === "text_gray" &&
                    (item.ServiceType == "2" || item.ServiceType == "4")
                  ) {
                    additionalMessage = (
                      <span className="text-red-500">
                        {" "}
                        (Forfeit all factory services)
                      </span>
                    );
                  }

                  return (
                    <li
                      key={index}
                      className={`p-2 ${textColor} ${bgColor} flex items-center rounded-md my-1 font-semibold tracking-wide gap-1`}
                    >
                      {icon} {item.msg} {additionalMessage}
                    </li>
                  );
                })}
                {content?.rdata?.grayout_servicelist?.map((item, index) => {
                  let icon, textColor;
                  switch (item.class) {
                    case "text_green":
                      icon = (
                        <i className="fa fa-check-circle text-green-500"></i>
                      );
                      textColor = "text-green-500";
                      break;
                    case "text_gray":
                      icon = (
                        <i className="fa fa-exclamation-triangle text-gray-500"></i>
                      );
                      textColor = "text-gray-500";
                      break;
                    case "text_purple":
                      icon = (
                        <i className="fa fa-info-circle text-purple-500"></i>
                      );
                      textColor = "text-purple-500";
                      break;
                    case "text_red":
                      icon = (
                        <i className="fa fa-times-circle text-red-500"></i>
                      );
                      textColor = "text-red-500";
                      break;
                    default:
                      icon = null;
                      textColor = "text-gray-700";
                  }

                  // Add "Forfeit all factory services" for grayout ServiceType 2 and 4
                  const additionalMessage =
                    item.ServiceType == "2" || item.ServiceType == "4" ? (
                      <span className="text-red-500">
                        {" "}
                        (Forfeit all factory services)
                      </span>
                    ) : (
                      <span className="text-red-500">(Gray Out)</span>
                    );

                  return (
                    <li
                      key={index}
                      className={`p-2 ${textColor} bg-gray-200 flex items-center rounded-md my-1 font-semibold tracking-wide gap-2`}
                    >
                      {
                        <FaExclamationTriangle className="text-base text-red-500" />
                      }{" "}
                      {item.CouponTitle} {additionalMessage}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <div className="flex flex-col w-full gap-3 items-end">
                {content.passcode === 1 && (
                  <div className="w-full">
                    <label className="block mb-2 font-semibold text-gray-600">
                      Please Enter Code to Redeem Service
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={handleCodeChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter code"
                    />
                  </div>
                )}
                <div className="flex w-full item justify-end">
                  <div
                    onClick={!loading ? fetchredeemservice : null} // Disable onClick if loading is true
                    className={`px-6 bg-siteOrange text-white py-2 rounded-lg w-1/4 font-semibold flex justify-center items-center ${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={{ minHeight: "40px", height: "auto" }} // Ensure the button has a consistent height
                  >
                    {loading ? (
                      <div className="w-full flex justify-center items-center h-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 200"
                          width={30}
                          height={30}
                        >
                          <circle
                            fill="white"
                            stroke="white"
                            strokeWidth="2"
                            r="15"
                            cx="40"
                            cy="65"
                          >
                            <animate
                              attributeName="cy"
                              calcMode="spline"
                              dur="2"
                              values="65;135;65;"
                              keySplines=".5 0 .5 1;.5 0 .5 1"
                              repeatCount="indefinite"
                              begin="-.4"
                            ></animate>
                          </circle>
                          <circle
                            fill="white"
                            stroke="white"
                            strokeWidth="2"
                            r="15"
                            cx="100"
                            cy="65"
                          >
                            <animate
                              attributeName="cy"
                              calcMode="spline"
                              dur="2"
                              values="65;135;65;"
                              keySplines=".5 0 .5 1;.5 0 .5 1"
                              repeatCount="indefinite"
                              begin="-.2"
                            ></animate>
                          </circle>
                          <circle
                            fill="white"
                            stroke="white"
                            strokeWidth="2"
                            r="15"
                            cx="160"
                            cy="65"
                          >
                            <animate
                              attributeName="cy"
                              calcMode="spline"
                              dur="2"
                              values="65;135;65;"
                              keySplines=".5 0 .5 1;.5 0 .5 1"
                              repeatCount="indefinite"
                              begin="0"
                            ></animate>
                          </circle>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-full flex justify-center items-center h-6">
                        Confirm
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {content.passcode === 1 && (
                <div className="w-full font-semibold text-base px-4 py-[6px] capitalize text-gray-100 bg-siteBlue flex flex-row gap-2 items-center mt-3 rounded-lg shining-text">
                  <RiLockPasswordLine />
                  <p className="text-shadow-black">
                    For the code, please contact the manager.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {content.success !== 1 && (
          <div className="bg-white p-6 rounded-lg z-20 w-1/3 relative flex flex-col justify-center items-center">
            <div className="text-lg font-semibold text-gray-700 my-3">
              {content.message || "No Message"}
            </div>
            <button
              onClick={closeServiceModal}
              className="w-1/3 bg-siteOrange text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ServicesRedemptionModal;
