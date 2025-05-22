import React, { useContext, useEffect, useState } from "react";
import { EditContractContext } from "../../page";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { FaSquarePlus } from "react-icons/fa6";
import { useTheme } from "@/utils/theme/themeProvider";
import { FaSquareMinus } from "react-icons/fa6";
import Input from "@/app/Components/Inputs/Input";
import toast from "react-hot-toast";
import Image from "next/image";
import TooltipShad from "@/components/cui/tooltip/TooltipShad";

// redeemedservices && setredeemedservices as same services and setservices that are in context
const Service = ({ service, i, redeemedservices, setredeemedservices }) => {
  let priceoptions = [];
  if (service.ServiceAmounts) {
    let temp = service.ServiceAmounts.split(",");
    priceoptions = temp.map((price, i) => {
      return { text: "$" + parseInt(price), value: parseInt(price) };
    });
  }
  const {
    setservicedetailsmodal,
    setservicedetailsservice,
    setCouponIds,

    setCouponIdswithValues,
    couponIdswithValues,
    services,
    serviceRedeemed,
  } = useContext(EditContractContext);
  // const [used, setused] = useState(parseInt(service.CouponValue));
  const { toggleMode, theme } = useTheme();

  const [used, setused] = useState(0);
  const [price, setprice] = useState(service.CouponValue);
  const [available, setavailable] = useState(parseInt(service.totalCoupon));
  const [showRedeemMessage, setShowRedeemMessage] = useState(false);

  const [messageTimeout, setMessageTimeout] = useState(null);
  const [minusClickedOnce, setMinusClickedOnce] = useState(false);
  const [usedCouponIds, setUsedCouponIds] = useState([]);
  // const [allCouponIds, setAllCouponIds] = useState([]);
  const [selectedCouponIds, setSelectedCouponIds] = useState([]);
  const availableCouponIds = service?.CouponID.split(",");

  const checkAllOrangeSelected = () => {
    return redeemedservices.every(
      (service) => service.ServiceType !== "2" || service.checked === true
    );
  };

  const resetBlueIfOrangeZero = () => {
    const allOrangeZero = redeemedservices.every(
      (service) => service.ServiceType !== "2"
    );

    if (allOrangeZero) {
      let updatedServices = redeemedservices.map((service) => {
        if (service.ServiceType === "3") {
          return { ...service, used: 0, available: service.totalCoupon };
        }
        return service;
      });
      setredeemedservices(updatedServices);
    }
  };

  const changenoofcoupons = (i, type) => {
    let tempservices = [...redeemedservices];

    if (type === "-") {
      if (service.ServiceType === "3" && !checkAllOrangeSelected()) {
        toast.error("Select all orange items first");
        return;
      }

      if (service?.AllowRedemptionMultipleTimes > 0) {
        if (available > 0 && used < service.totalCoupon) {
          const couponIdToUse = availableCouponIds[available - 1];
          const couponValue = price || service.CouponValue; // Use `price` state if set, fallback to `CouponValue`.

          setUsedCouponIds((prev) => [...prev, couponIdToUse]);
          setCouponIdswithValues((prev) => [
            ...prev,
            { id: couponIdToUse, value: couponValue },
          ]);
          setused(used + 1);
          setavailable(available - 1);
          tempservices[i].checked = true;
          setMinusClickedOnce(false);
        }
      } else if (available > 0) {
        if (!minusClickedOnce) {
          const couponIdToUse = availableCouponIds[available - 1];
          const couponValue = price || service.CouponValue; // Use `price` state if set, fallback to `CouponValue`.

          setUsedCouponIds((prev) => [...prev, couponIdToUse]);
          setCouponIdswithValues((prev) => [
            ...prev,
            { id: couponIdToUse, value: couponValue },
          ]);
          setused(used + 1);
          setavailable(available - 1);
          tempservices[i].checked = true;
          setMinusClickedOnce(true);
        } else {
          setShowRedeemMessage(true);
          if (messageTimeout) {
            clearTimeout(messageTimeout);
          }
          const timeoutId = setTimeout(() => {
            setShowRedeemMessage(false);
          }, 2000);
          setMessageTimeout(timeoutId);
        }
      }

      if (service.ServiceType === "2") {
        resetBlueIfOrangeZero();
      }
    } else if (type === "+") {
      if (used > 0) {
        const couponIdToReturn = usedCouponIds[usedCouponIds.length - 1];
        setUsedCouponIds((prev) =>
          prev.filter((id) => id !== couponIdToReturn)
        );
        setCouponIds((prev) => prev.filter((id) => id !== couponIdToReturn));
        setCouponIdswithValues((prev) =>
          prev.filter((coupon) => coupon.id !== couponIdToReturn)
        );
        setused(used - 1);
        setavailable((prevAvailable) =>
          Math.min(prevAvailable + 1, service.totalCoupon)
        );
        tempservices[i].checked = false;
        setMinusClickedOnce(false);
      }
    }

    setredeemedservices([...tempservices]);
  };

  let circlecolor = "";
  if (service.ServiceType === "1") {
    circlecolor = "bg-green-500";
  } else if (service.ServiceType === "2") {
    circlecolor = "bg-orange-500";
  } else if (service.ServiceType === "3") {
    circlecolor = "bg-blue-500";
  } else if (service.ServiceType === "4") {
    circlecolor = "bg-purple-500";
  }

  useEffect(() => {
    setCouponIds((prev) => {
      const updatedSet = new Set([...prev, ...usedCouponIds]);
      return Array.from(updatedSet);
    });
  }, [usedCouponIds]);

  // Cleanup timeout properly on unmount
  useEffect(() => {
    return () => {
      if (messageTimeout) {
        clearTimeout(messageTimeout);
      }
    };
  }, []);

  // Ensure coupon count changes when price updates
  useEffect(() => {
    changenoofcoupons();
  }, [price]);

  // Reset states when `serviceRedeemed` occurs
  useEffect(() => {
    if (serviceRedeemed) {
      setused(0);
      setUsedCouponIds([]);
      setCouponIdswithValues([]);
    }
  }, [serviceRedeemed]);

  const currentDate = new Date();
  const redeemDate = new Date(service.RedeemAfterMonths);

  const isRedeemable = currentDate >= redeemDate;
  return (
    <ShadowContainer
      bg={service.GrayOutStatus == "1" ? "bg-disable" : "bg-card"}
      cursor={service.GrayOutStatus == "1" ? "cursor-not-allowed" : ""}
    >
      <div className={`w-full grid grid-cols-5 font-sm font-semibold`}>
        <div
          className={`col-span-1 flex flex-row items-center justify-center gap-3`}
        >
          <div className={`w-1 h-1 p-2 rounded-full ${circlecolor}`}></div>

          {isRedeemable ? ( // Only render the icon if redeeming is allowed
            <FaSquareMinus
              onClick={() => {
                // eslint-disable-next-line no-empty
                if (service.GrayOutStatus === "1") {
                } else {
                  changenoofcoupons(i, "-");
                }
              }}
              className={`text-xl ${
                service.GrayOutStatus === "1"
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              color="red"
              disabled={available === 0} // Disable if available is 0
            />
          ) : (
            <div></div>
          )}
          <div className="flex gap-4 items-center">
            {/* Available Text with Tooltip */}
            <div className="relative group cursor-pointer">
              <div className="px-1 py-[2px] rounded-2xl ">{available}</div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-white bg-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Service Available
              </div>
            </div>

            {/* Icon with Tooltip */}
            {!isRedeemable && (
              <div className="relative group cursor-pointer">
                <Image
                  src="/images/serviceclock.png"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  alt=""
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 text-center mb-2 px-3 py-1 text-white bg-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Next Service Redemption on
                  <br />
                  {service?.RedeemAfterMonths}
                </div>
              </div>
            )}
          </div>

          {isRedeemable ? ( // Only render the icon if redeeming is allowed
            <FaSquarePlus
              onClick={() => {
                if (service.GrayOutStatus === "1") {
                  return;
                } else {
                  changenoofcoupons(i, "+");
                }
              }}
              color="green"
              className={`text-xl ${
                service.GrayOutStatus === "1"
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div
          className={`col-span-1 flex flex-row items-center justify-center gap-3`}
        >
          -
        </div>

        <div
          className={`col-span-1 flex flex-row items-center justify-center gap-3 w-full relative`}
        >
          {/* {service.ServiceAmounts ? (
            <Select
              disable={service.GrayOutStatus === "1"}
              value={used}
              setvalue={setused}
              options={priceoptions}
              bgcolor={"gray-200"}
            /> 
          ) : ( */}
          {/* <input
            disabled={true}
            value={used}
            onChange={(e) => setused(e.target.value)}
            className="bg-gray-200 flex justify-center items-center px-auto h-8 w-2/6 rounded-xl"
            placeholder=""
            type="number"
            width="3/4"
            defaultValue={0}
          /> */}
          <TooltipShad content={"Services Used"}>
            <div
              className={`relative bg-muted text-muted-foreground px-5 py-1 rounded-xl group `}
            >
              {used}
            </div>
          </TooltipShad>
          {/* )} */}
          {showRedeemMessage && (
            <div className="absolute -top-[70px] left-0 bg-red-500 text-white text-xs px-3 py-2 rounded shadow-2xl w-64">
              * You cannot redeem more than one service of the same type on the
              same RO number.
            </div>
          )}
        </div>

        {/* price */}
        <div
          className={`col-span-1 flex flex-row items-center justify-center gap-3 w-full`}
        >
          {/* {Number(service?.VariablePrice) > 0 ? (
            <input
              value={price}
              onChange={(e) => setprice(e.target.value)}
              className="bg-white px-3 h-8 w-2/4 border border-gray-400 rounded-xl"
              placeholder=""
              type="number"
              style={{ MozAppearance: "textfield" }}
            />
          ) : service.ServiceAmounts ? (
            <Select
              disabled={service.GrayOutStatus === "1"}
              value={price}
              setvalue={setprice}
              options={priceoptions}
              className="bg-gray-200"
              defaultDealer={priceoptions[0].value}
            />
          ) : null} */}
          <div className="flex w-20 justify-center items-center space-x-2 px-6 text-sm">
            $
            <Input
              value={price}
              onChange={(e) => setprice(e.target.value)}
              className={` text-center w-12 p-0 border-0 `}
              placeholder=""
              maxlength={"2"}
              size={"2"}
              type="number"
              style={{ MozAppearance: "textfield" }}
            />
          </div>
        </div>
        <div
          className={`col-span-1 flex flex-row items-center justify-center gap-3 w-full`}
        >
          {service.CouponDetail == "0" ? (
            ""
          ) : (
            <button
              className="shadow-inner bg-siteBlue text-sm text-white rounded-lg py-2 px-3 "
              onClick={() => {
                setservicedetailsservice(service);
                setservicedetailsmodal(true);
              }}
            >
              Details
            </button>
          )}
        </div>
      </div>
      <div className="rounded-lg mt-5 shadow-inner w-full border border-border px-3 py-2 font-semibold text-secondary-foreground/80 text-sm">
        {service.CouponTitle}
      </div>
    </ShadowContainer>
  );
};

export default Service;
