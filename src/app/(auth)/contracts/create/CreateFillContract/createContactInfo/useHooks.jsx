// autofill handle

import { formatDate } from "@/utils/helpers";
import { useEffect } from "react";

export const useAutoFillData = ({
  autoFillData,
  defaultDealer,
  setdealer,
  setvin,
  setPvInfoForm,
  pvInfoForm,
  setSelectYear,
  setSelectModelID,
  setSelectMakeID,
}) => {
  // autofill data handle
  useEffect(() => {
    if (autoFillData && Object.keys(autoFillData || {}).length > 0) {
      setdealer(defaultDealer);
      setvin(autoFillData?.VIN);
      setPvInfoForm((prev) => ({
        ...prev,
        make: autoFillData.MAKE || "",
        mileage: autoFillData.MILEAGE || "",
        model: autoFillData.MODEL || "",
        oneTimeRONumber: autoFillData.RO || "",
        vin: autoFillData.VIN || "",
        salesperson: autoFillData.SALESREP || "",
        dealer: defaultDealer,
        vehicletype: autoFillData.NEWORUSED || "",
        year: autoFillData.YEAR || "",
      }));
      setSelectYear(new Set([autoFillData?.YEAR]));
      setSelectModelID(new Set([autoFillData?.MODEL]));
      setSelectMakeID(new Set([autoFillData?.MAKE]));
    }
  }, [autoFillData]);
};
export const useAutoFillSaleDate = ({
  autoFillData,
  pvInfoForm,
  setPvInfoForm,
}) => {
  useEffect(() => {
    if (
      pvInfoForm.dealer &&
      autoFillData &&
      pvInfoForm.plan &&
      !pvInfoForm.expNew
    ) {
      const saledate = formatDate(autoFillData?.Sold_Date);
      setPvInfoForm((prev) => ({
        ...prev,
        saledate,
      }));
    }
  }, [autoFillData, pvInfoForm.plan]);
};
export const useHandleLoyaltySelection = ({
  filteredLoyalty,
  pvInfoForm,
  setSelectLoyaltyID,
  handleInputChange,
}) => {
  useEffect(() => {
    if (filteredLoyalty?.LoyaltyID) {
      const loyaltyIDSet = new Set([filteredLoyalty?.LoyaltyID]);
      setSelectLoyaltyID(loyaltyIDSet);
      handleInputChange("smlcPointsSelect", loyaltyIDSet);
    }
  }, [pvInfoForm.plan]);
};
