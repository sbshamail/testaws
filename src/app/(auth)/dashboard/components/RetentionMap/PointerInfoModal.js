import React, { useEffect, useState } from "react";
import Image from "next/image";

import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import TextField from "@/components/cui/textField/TextField";
import { fetchPost } from "@/utils/action/function";
import { objectToFormData, Toastify } from "@/utils/helpers";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { encryptData, decryptData } from "@/utils/crypto";
const PointerInfoModal = ({ open, close, pointerInfo, data, auth, Token }) => {
  const { pcp_user_id } = auth || {};
  const { DealerTitle, mapInfo, contractStatus } = data || {};

  const [mapInfoData, setMapInfoData] = useState({});
  const [message, setMessage] = useState("");
  const {
    ContractNo,
    CustomerFName,
    CustomerLName,
    PrimaryEmail,
    PhoneHome,
    usedservices,
    unusedservices,
    CustomerAddressLine1,
  } = mapInfoData || {};
  const getFormData = () => {
    const formdata = new FormData();
    for (const key in contractStatus) {
      if (contractStatus.hasOwnProperty(key)) {
        let value = contractStatus[key];
        if (value !== "" && value !== undefined) {
          formdata.append("ContractStatus[]", value);
        }
      }
    }
    return formdata;
  };
  const getMapInfo = async () => {
    const formdata = getFormData();
    const data = {
      ...mapInfo,
      ...auth,
      ID: pointerInfo?.id,
      field_name: pointerInfo?.column_name,
      s_type: pointerInfo?.type,
    };
    const formData = objectToFormData(data, formdata);
    const res = await fetchPost({
      api: "dashboard/mapinfowindows",
      formdata: formData,
      auth,
      token: Token,
      showToast: true,
    });
    for (let key of formdata.keys()) {
      formdata.delete(key);
    }
    if (res) {
      setMapInfoData(res);
    }
  };
  useEffect(() => {
    if (open) {
      getMapInfo();
    }
  }, []);

  const handleMessage = async (send_message_type) => {
    const formdata = getFormData();
    const data = {
      ...auth,
      ID: pointerInfo?.id,
      send_message_type,
      SendMessagesOn: message,
      ...mapInfo,
    };
    if (send_message_type === 2) {
      data.PrimaryEmail = PrimaryEmail;
    }
    if (send_message_type === 1) {
      data.PhoneHome = PhoneHome;
    }
    const formData = objectToFormData(data, formdata);
    const res = await fetchPost({
      api: "dashboard/sendretmessages",
      formdata: formData,
      auth,
      token: Token,
      showToast: true,
    });
  };
  // https://trakometer.mypcp.us/notification/specific/pcp_user_id/ContractNo
  const openTrakometer = () => {
    const encryptedUserId = encryptData(pcp_user_id);
    const encryptedContractNo = encryptData(ContractNo);
    const url = `https://trakometer.mypcp.us/notification/specific/${encryptedUserId}/${ContractNo}`;
    window.open(url, "_blank");
  };
  return (
    <SimpleModal
      open={open}
      close={close}
      title={`${DealerTitle} ${ContractNo}`}
      className={"max-w-[900px]"}
    >
      <div className="grid grid-cols-12 gap-2">
        <section className="col-span-7 flex flex-col gap-4">
          <div className="flex justify-between">
            <div>
              <table>
                <tbody>
                  <tr>
                    <td className="px-2 text-siteBlue">Service Used</td>
                    <td className="px-2">{usedservices}</td>
                  </tr>
                  <tr>
                    <td className="px-2 text-siteBlue">Service Unused</td>
                    <td className="px-2">{unusedservices}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td className="px-2 text-siteBlue">Customer</td>
                    <td className="px-2">
                      {CustomerFName} {CustomerLName}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 text-siteBlue">phone</td>
                    <td className="px-2">{PhoneHome}</td>
                  </tr>
                  <tr>
                    <td className="px-2 text-siteBlue">Email</td>
                    <td className="px-2">{PrimaryEmail}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <MdOutlineSupportAgent fontSize={"1.6em"} />
            <TextField
              textarea={true}
              rows={"4"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1">
            <CustomButton size="sm" onClick={() => handleMessage(1)}>
              SMS
            </CustomButton>
            <CustomButton size="sm" onClick={() => handleMessage(2)}>
              EMAIL
            </CustomButton>
            <CustomButton size="sm" onClick={() => handleMessage(2)}>
              PUSH TO APP
            </CustomButton>
          </div>
        </section>
        <section className="col-span-5 flex items-start gap-1">
          <div className="h-full w-[1px] bg-border"></div>
          <section className="h-full w-full flex flex-col gap-2">
            <div className="h-full w-full flex gap-1">
              <div className="w-1/2 mx-auto mt-0 ">
                <figure className="flex items-center justify-center">
                  <Image
                    src="/images/customer-icon.jpg"
                    alt="customer-icon"
                    height={200}
                    width={200}
                  />
                </figure>
                <div className="flex justify-between mx-2">
                  <h4 className="font-bold">Customer</h4>
                  <FaRegMessage
                    className="mt-1 text-gray-400 cursor-pointer"
                    onClick={openTrakometer}
                  />
                </div>
              </div>
              <div className="h-full w-[1px] bg-border"></div>
              <div className="w-1/2 mx-auto mt-0">
                <figure className="flex items-center justify-center">
                  <Image
                    src="/images/customer-icon.jpg"
                    alt="customer-icon"
                    height={200}
                    width={200}
                  />
                </figure>
                <div className="flex justify-between mx-2">
                  <h4 className="font-bold text-siteBlue">Sales Rep</h4>
                </div>
              </div>
            </div>
            <p className="text-sm">
              <span className="text-siteBlue font-bold">Address: </span>
              <span>{CustomerAddressLine1}</span>
            </p>
          </section>
        </section>
      </div>
    </SimpleModal>
  );
};

export default PointerInfoModal;
