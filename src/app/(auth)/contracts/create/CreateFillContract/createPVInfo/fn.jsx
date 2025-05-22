import { fetchPost } from "@/utils/action/function";
import { objectToFormData, Toastify } from "@/utils/helpers";

import toast from "react-hot-toast";

export const initialState = {
  dealer: "",
  vin: "",
  contractno: "",
  make: "",
  plan: "",
  model: "",
  productsellingrep: "",
  year: "",
  password: "",
  vehicletype: "",
  salesperson: "",
  stock: "",
  deal: "",
  mileage: "",
  ro: "",
  saledate: "",
  customerNumber: "",
  expNew: "",
  welcomeSms: "",
  loyaltyCash: "",
  loyaltyPoints: "",
  // LoyaltyID: "",
  oneTimeRONumber: "",
  smlcPointsSelect: "",
  isPlanDefault: "0",
};

export const validate = (pvInfoForm, setErrors) => {
  const newErrors = {};
  // if (!pvInfoForm.saledate) newErrors.saledate = "Sale Date is required";
  if (!pvInfoForm.vin) newErrors.vin = "Vin is required";
  if (!pvInfoForm.model) newErrors.model = "Model is required";
  if (!pvInfoForm.year) newErrors.year = "Year is required";
  if (!pvInfoForm.saledate) newErrors.saledate = "Sale Date is required";
  // if (!pvInfoForm.salesperson) newErrors.salesperson = "Sales Rep is required";
  if (!pvInfoForm.mileage) newErrors.mileage = "Mileage is required";
  if (!pvInfoForm.vehicletype)
    newErrors.vehicletype = "Vehicle Type is required";
  if (!pvInfoForm.plan) newErrors.plan = "Plan is required";
  if (!pvInfoForm.dealer) newErrors.dealer = "Dealer is required";
  if (!pvInfoForm.expNew) newErrors.expNew = "Expiration Date is required";
  if (!pvInfoForm.make) newErrors.make = "Make is required";

  setErrors(newErrors);
  Object.values(newErrors).forEach((error) => Toastify("error", error));

  return Object.keys(newErrors).length === 0;
};

// checkbox save plan default
export const makeDefaultPlan = async (
  user,
  checked,
  planId,
  dealer,
  setLoading
) => {
  const isDefault = checked ? "1" : "0";
  const { auth, Token } = user;
  const formdata = objectToFormData({
    ...auth,
    PlanID: planId,
    DealerID: dealer,
    isDefault: isDefault,
  });
  const res = await fetchPost({
    url: "https://mypcp.us/webservices/contracts/SetDefaultPlanForUser",
    token: Token,
    formdata,
    setLoading,
  });
  if (res) {
    const expiryDate = res?.contractexpirydate?.MakePlanExpiryDate;
  }
};

// checkbox product selling rep default
export const makeDefaultProductSellingRep = async (
  user,
  checked,
  FIManagerID,
  DealerID,
  setLoading
) => {
  const isDefault = checked ? "1" : "0";
  setLoading(true);
  const { auth, Token } = user;
  const formdata = objectToFormData({
    ...auth,
    FIManagerID,
    DealerID,
    isDefault: isDefault,
  });
  const res = await fetchPost({
    url: "https://mypcp.us/webservices/contracts/setdefaultsalerepforuser",
    token: Token,
    formdata,
    setLoading,
  });
  if (res) {
    const expiryDate = res?.contractexpirydate?.MakePlanExpiryDate;
  }
};

// expiry date automatic

export const getPlanExpiry = async ({
  auth,
  Token,
  SaleDate,
  PlanID,
  DealerID,
  setLoading,
}) => {
  setLoading(true);
  if (!PlanID) {
    toast.error("Plan is Required");
  }
  const formdata = objectToFormData({
    ...auth,
    SaleDate,
    PlanID,
    DealerID,
  });
  const res = await fetchPost({
    url: "https://mypcp.us/webservices/contracts/getplanexpirydate",
    token: Token,
    formdata,
    setLoading,
  });
  return res;
};
