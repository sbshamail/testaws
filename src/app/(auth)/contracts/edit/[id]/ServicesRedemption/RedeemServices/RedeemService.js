import React, { useContext, useState } from "react";
import { GlobalContext } from "@/app/Provider";
import { BiRefresh } from "react-icons/bi";
import { unixTimestampToDate } from "@/app/functions";
import TailwindLoading from "@/app/Components/TailwindLoading";
import toast from "react-hot-toast";
const RedeemService = ({ service, i, maturedServices }) => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);
  const fetchchangestatus = () => {
    setloading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    const formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("ContractID", service.ContractID);
    formdata.append("CouponID", service.CouponID);

    fetch(
      "https://mypcp.us/webservices/contracts/reactivateservicewithstatuschange",
      {
        method: "POST",
        body: formdata,
        headers: headers,
      }
    )
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setloading(false);
        toast.success(res.message);
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't Change Service Status err3");
        console.log(error);
      });
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
  // console.log("maturedServices", maturedServices);
  return (
    <>
      <div
        className={`bg-white py-3 px-4 text-sm flex items-center gap-2 ${
          i < maturedServices.length - 1 ? "border-b" : ""
        }`}
      >
        <div className={`w-5 h-5 rounded-full ${circlecolor}`}></div>
        {service.CouponID}
      </div>

      <div
        className={`col-span-2 bg-white py-3 px-4 text-sm flex items-center ${
          i < maturedServices.length - 1 ? "border-b" : ""
        }`}
      >
        {service.CouponTitle}
      </div>

      <div
        className={`bg-white py-3 px-4 text-sm flex items-center ${
          i < maturedServices.length - 1 ? "border-b" : ""
        }`}
      >
        {service.CouponMileage}
      </div>

      <div
        className={`bg-white py-3 px-4 text-sm flex items-center ${
          i < maturedServices.length - 1 ? "border-b" : ""
        }`}
      >
        {service.RepairOrderNo}
      </div>

      <div
        className={`bg-white py-3 px-4 text-sm flex items-center ${
          i < maturedServices.length - 1 ? "border-b" : ""
        }`}
      >
        {unixTimestampToDate(service.RecievedDate)}
      </div>

      <div
        className={`bg-white py-3 px-4 text-sm flex items-center ${
          i < maturedServices.length - 1 ? "border-b" : ""
        }`}
      >
        {service.VehicleType}
      </div>

      {loading ? (
        <div
          className={`bg-white py-3 px-4 text-sm flex items-center ${
            i < maturedServices.length - 1 ? "border-b" : ""
          }`}
        >
          <TailwindLoading />
        </div>
      ) : (
        <button
          onClick={fetchchangestatus}
          className={`bg-white py-3 px-4 text-sm flex items-center ${
            i < maturedServices.length - 1 ? "border-b" : ""
          }`}
        >
          <BiRefresh size={30} />
        </button>
      )}
    </>
  );
};

export default RedeemService;
