import { GlobalContext } from "@/app/Provider";
import { CustomButton } from "@/components/cui/button/CustomButton";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { SimpleFilterableSelect } from "@/components/cui/select/SimpleFilterableSelect";
import Table from "@/components/cui/table";
import TextField from "@/components/cui/textField/TextField";
import { fetchPostObj } from "@/utils/action/function";

import React, { useContext, useEffect, useState } from "react";

const ServiceRemainingModal = ({ open, close, fetchCustomer }) => {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { customer_id: CustomerID, ContractID } = GLOBAL_RESPONSE || {};
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [GiftedPersonEmail, setGiftedPersonEmail] = useState("");
  const [GiftedNote, setGiftedNote] = useState("");
  const [AllowedMakeID, setAllowedMakeID] = useState("");

  const [selectedGifts, setSelectedGifts] = useState({});
  const fetchServicesGifted = async () => {
    const data = { ContractID, CustomerID, IsGuest: 0 };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "customer/shareservices",
      setLoading,
      data,
    });
    setData(res);
  };
  useEffect(() => {
    fetchServicesGifted();
  }, []);

  const giftedMakes = data?.allowedmakes?.map((item) => ({
    text: item?.Make,
    value: item?.MakeID,
  }));
  const handleSendGift = async () => {
    const giftData = {};

    // Flatten selectedGifts into the required format
    Object.entries(selectedGifts).forEach(([couponID, gift]) => {
      giftData[`GiftedCouponTitle[${couponID}]`] = gift.GiftedCouponTitle;
      giftData[`GiftedCouponMileage[${couponID}]`] = gift.GiftedCouponMileage;
      giftData[`GiftedCouponValue[${couponID}]`] = gift.GiftedCouponValue;
      giftData[`GiftedServiceID[${couponID}]`] = gift.GiftedServiceID;
      giftData[`NumberOfGiftedServices[${couponID}]`] =
        gift.NumberOfGiftedServices;
      giftData[`GiftedTotalServices[${couponID}]`] = gift.GiftedTotalServices;
      giftData[`GiftedContractID[${couponID}]`] = gift.GiftedContractID;
    });
    const data = {
      ContractID,
      CustomerID,
      ...giftData,
      GiftedPersonEmail,
      GiftedNote,
      AllowedMakeID,
      IsGuest: 0,
    };
    setLoading(true);
    const res = await fetchPostObj({
      auth,
      Token,
      api: "customer/giftservices",
      isValue: true,
      data,
    });

    if (
      res.msgtype === "Success" ||
      res.success === 1 ||
      res.response === "success"
    ) {
      fetchCustomer();
      setLoading(false);
      close();
    }
  };

  const handleRowChange = (row, value) => {
    setSelectedGifts((prev) => {
      const updated = { ...prev };

      if (Number(value) === 0) {
        // Remove the gift entry for this CouponID
        delete updated[row.CouponID];
      } else {
        // Add or update the gift entry
        updated[row.CouponID] = {
          NumberOfGiftedServices: value,
          GiftedCouponTitle: row.CouponTitle,
          GiftedCouponMileage: row.CouponMileage,
          GiftedCouponValue: row.CouponValue,
          GiftedServiceID: row.ServiceID,
          GiftedTotalServices: row.total,
          GiftedContractID: ContractID,
        };
      }

      return updated;
    });
  };

  const RenderGift = ({ row }) => (
    <div className="  text-center">
      <select
        name="cars"
        id="cars"
        className="rounded p-2 cursor-pointer w-full bg-muted-foreground  text-muted border-none focus:outline-none"
        onChange={(e) => handleRowChange(row, e.target.value)}
        value={selectedGifts?.[row.CouponID]?.NumberOfGiftedServices || 0}
      >
        <option value={0}>0</option>
        {Array.from({ length: row.total }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
  const columns = [
    { title: "#", accessor: "total" },
    { title: "SERVICES TITLE", accessor: "CouponTitle" },
    { title: "GIFT SERVICE", render: RenderGift },
  ];
  const notDisabled = data
    ? (data.result.EnableGifted == 1 &&
        ((data.result.RevokeGiftedServiceOnInActive == 0 &&
          data.contract_result.Status === "L") ||
          data.contract_result.Status === "I")) ||
      (data.result.RevokeGiftedServiceOnInActive == 1 &&
        data.contract_result.Status === "L")
    : false;

  return (
    <div>
      <SimpleModal
        open={open}
        close={close}
        title={"VIEW REMAINING SERVICES"}
        className={"min-h-56"}
      >
        {!data?.GetContractCouponCount?.length > 0 ? (
          <div className="p-2 rounded bg-yellow-600">No Service Remaining</div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <div className="w-full">
              <Table
                data={data?.GetContractCouponCount}
                columns={columns}
                striped={false}
              />
            </div>
            <div className="w-full mt-6">
              <form className="flex flex-col gap-4">
                <SimpleFilterableSelect
                  label={"SELECT FROM ALLOWED GIFTING MAKES"}
                  options={giftedMakes}
                  setvalue={setAllowedMakeID}
                  value={AllowedMakeID}
                  className="w-full"
                  listClass={"w-full"}
                />

                <TextField
                  label={"Email"}
                  value={GiftedPersonEmail}
                  onChange={(e) => setGiftedPersonEmail(e.target.value)}
                />
                <TextField
                  label={"Note"}
                  textarea={true}
                  value={GiftedNote}
                  onChange={(e) => setGiftedNote(e.target.value)}
                />
                <SpinnerCenterScreen loading={loading} center={true} />
                <div className="flex justify-center">
                  <DancingLoadingButton
                    loading={loading}
                    onClick={handleSendGift}
                    disabled={notDisabled ? false : true}
                  >
                    Gift Service To Friend
                  </DancingLoadingButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </SimpleModal>
    </div>
  );
};

export default ServiceRemainingModal;
