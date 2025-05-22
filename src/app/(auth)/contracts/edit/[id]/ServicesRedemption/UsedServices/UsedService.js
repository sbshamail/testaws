import React, { useContext, useState } from "react";
import { GlobalContext } from "@/app/Provider";
import { EditContractContext } from "../../page";
import { BiRefresh } from "react-icons/bi";
import { unixTimestampToDate } from "@/app/functions";
import TailwindLoading from "@/app/Components/TailwindLoading";
import toast from "react-hot-toast";
import { TbEdit } from "react-icons/tb";
import ServiceEditModal from "./ServiceEditModal";
import Table from "@/components/cui/table";
import TooltipNext from "@/components/nextui/TooltipNext";
import { IoIosSpeedometer } from "react-icons/io";
import { FaCalendarAlt, FaCar } from "react-icons/fa";
import { Toastify } from "@/utils/helpers";
const UsedService = ({
  service,
  i,
  usedservices,
  services,
  selectedRows,
  setSelectedRows,
}) => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [loading, setloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { contract } = useContext(EditContractContext);

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
    formdata.append("ContractID", service?.ContractID);
    formdata.append("CouponID", service?.CouponID);

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
        Toastify("success", res.message);
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't Change Service Status err3");
        console.log(error);
      });
  };

  const getCircleColor = (ServiceType) => {
    if (ServiceType === "1") {
      return "bg-green-500";
    } else if (ServiceType === "2") {
      return "bg-orange-500";
    } else if (ServiceType === "3") {
      return "bg-blue-500";
    } else if (ServiceType === "4") {
      return "bg-purple-500";
    }
  };

  const changeStatusColumn = contract?.AllowRedemptionRevert && {
    title: contract?.AllowRedemptionRevert == "1" &&
      services.GrayOutStatus == "0" && <div>Change Status</div>,
    render: ({ row }) =>
      contract?.AllowRedemptionRevert == "1" &&
      service.GrayOutStatus == "0" && (
        <>
          {loading ? (
            <div
              className={`bg-white py-3 px-4 text-sm flex items-center ${
                i < usedservices.length - 1 ? "border-b" : ""
              }`}
            >
              <TailwindLoading />
            </div>
          ) : (
            <button
              onClick={fetchchangestatus}
              className={`bg-white py-3 px-4 text-sm flex items-center ${
                i < usedservices.length - 1 ? "border-b" : ""
              }`}
            >
              <BiRefresh size={50} />
            </button>
          )}
        </>
      ),
  };

  const columns = [
    {
      title: (
        <span>
          {" "}
          ID/<span className="text-siteBlue">OP CODE</span>
        </span>
      ),
      render: ({ row }) => (
        <div className="flex gap-1 items-center">
          <div
            className={`w-5 h-5 rounded-full ${getCircleColor(
              row?.ServiceType
            )}`}
          ></div>
          {row.CouponID}
        </div>
      ),
    },
    { title: "Service", accessor: "CouponTitle" },
    {
      title: (
        <TooltipNext content={"MILEAGE"}>
          <div className="w-max">
            <IoIosSpeedometer className="text-2xl" />
          </div>
        </TooltipNext>
      ),
      accessor: "CouponMileage",
    },
    { title: "RO", accessor: "RepairOrderNo" },
    {
      title: (
        <TooltipNext content={"Date"}>
          <div className="w-max">
            <FaCalendarAlt className="text-2xl" />
          </div>
        </TooltipNext>
      ),
      accessor: "RecievedDate",
      render: ({ cell }) => unixTimestampToDate(cell),
    },
    {
      title: (
        <TooltipNext content={"CONTRACT OR NON CONTRACT VEHICLE"}>
          <div className="w-max">
            <FaCar className="text-2xl" />
          </div>
        </TooltipNext>
      ),
      accessor: "VehicleType",
    },
    changeStatusColumn,
    {
      title: "Edit",
      render: () => (
        <TbEdit
          onClick={() => setIsModalOpen(true)}
          size={20}
          className="cursor-pointer"
        />
      ),
    },
  ].filter(Boolean);
  return (
    <>
      <Table
        rowId={"CouponID"}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        columns={columns}
        data={usedservices}
      />

      {isModalOpen && (
        <ServiceEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          couponID={service?.CouponID}
          CouponTitle={service?.CouponTitle}
          opCode={service?.OpCode}
          ContractID={service?.ContractID}
          VehicleType={service?.VehicleType}
          service={service}
        />
      )}
    </>
  );
};

export default UsedService;
