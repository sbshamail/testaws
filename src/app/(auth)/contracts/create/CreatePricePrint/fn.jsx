import {
  MdLocalPrintshop,
  MdOutlineEmail,
  MdAddCircleOutline,
} from "react-icons/md";
import { CustomButton } from "@/components/cui/button/CustomButton";
import Input from "@/app/Components/Inputs/Input";
import toast from "react-hot-toast";

export const initialState = {
  contractcost: "",
  contractbank: "",
  contractemail: "",
  contractbankaddress: "",
  customerprice: "",
  planprice: "",
  // oneTimeRONumber: "",
  compPrice: "",
  isServicecontract: false,
  lpvsb: false,
  ServiceContract: "",
};

export const validateForm = (priceInfoForm) => {
  const errors = {};
  if (
    priceInfoForm.contractcost === null ||
    priceInfoForm.contractcost === undefined ||
    priceInfoForm.contractcost === ""
  ) {
    errors.contractcost = "Contract cost is required";
  }

  if (!priceInfoForm.contractbank) errors.contractbank = "Bank is required";

  if (
    priceInfoForm.customerprice === null ||
    priceInfoForm.customerprice === undefined ||
    priceInfoForm.customerprice === ""
  )
    errors.customerprice = "Customer price is required";
  if (
    priceInfoForm.planprice === null ||
    priceInfoForm.planprice === undefined ||
    priceInfoForm.planprice === ""
  )
    errors.planprice = "Plan price is required";
  // if (
  //   planCost?.PlanCostAndExpiry?.IsAutoReedem === "1" &&
  //   !priceInfoForm.oneTimeRONumber
  // ) {
  //   errors.oneTimeRONumber = "One Time RO Number is required";
  // }
  Object.values(errors).forEach((error) => toast.error(error));

  return Object.keys(errors).length === 0;
};

//jsx

// const fetchSendEmail = () => {
//   setLoading(true);
//   const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
//     GLOBAL_RESPONSE;
//   const headers = new Headers();
//   headers.append("AUTHORIZATION", Token);
//   let formdata = new FormData();
//   formdata.append("pcp_user_id", pcp_user_id);
//   formdata.append("role_id", user_cizacl_role_id);
//   formdata.append("user_id", user_id);
//   formdata.append("ContractID", params.id);
//   formdata.append("UserEmail", contractemail);

//   fetch("https://mypcp.us/webservices/contracts/emailcontract", {
//     method: "POST",
//     body: formdata,
//     headers: headers,
//   })
//     .then((response) => {
//       let res = response.json();
//       return res;
//     })
//     .then((res) => {
//       setLoading(false);
//       if (res.success === "1") {
//         toast.success(res.message);
//       } else {
//         toast.error(res.message);
//       }
//     })
//     .catch((error) => {
//       setLoading(false);
//       toast.error("Can't Send Email err3");
//       console.log(error);
//     });
// };

// const handleAddBank = () => {
//   setLoading(true);
//   const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
//     GLOBAL_RESPONSE;
//   const headers = new Headers();
//   headers.append("AUTHORIZATION", Token);
//   let formdata = new FormData();
//   formdata.append("pcp_user_id", pcp_user_id);
//   formdata.append("role_id", user_cizacl_role_id);
//   formdata.append("user_id", user_id);
//   formdata.append("AddNewBank", contractemail);
//   formdata.append("DealerID", dealerID);

//   fetch("https://mypcp.us/webservices/contracts/addbank", {
//     method: "POST",
//     body: formdata,
//     headers: headers,
//   })
//     .then((response) => {
//       let res = response.json();
//       return res;
//     })
//     .then((res) => {
//       setLoading(false);
//       if (res.success === 1) {
//         setcontractbank(res);
//       }
//     })
//     .catch((error) => {
//       setLoading(false);
//       toast.error("Can't Send Email err3");
//       console.log(error);
//     });
// };
