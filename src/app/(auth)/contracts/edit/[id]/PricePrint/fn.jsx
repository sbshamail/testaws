import { MdLocalPrintshop, MdOutlineEmail } from "react-icons/md";

import { CustomButton } from "@/components/cui/button/CustomButton";
import Input from "@/app/Components/Inputs/Input";
import toast from "react-hot-toast";
import { fetchPost } from "@/utils/action/function";
import { objectToFormData } from "@/utils/helpers";

//  validate handle form
export const validateForm = (priceInfo) => {
  const errors = {};
  if (
    priceInfo.contractcost === null ||
    priceInfo.contractcost === undefined ||
    priceInfo.contractcost === ""
  )
    errors.contractcost = "Contract cost is required";
  if (!priceInfo.contractbank) errors.contractbank = "Bank is required";
  // if (!priceInfo.contractemail) errors.contractemail = "Email is required";
  if (
    priceInfo.customerprice === null ||
    priceInfo.customerprice === undefined ||
    priceInfo.customerprice === ""
  )
    errors.customerprice = "Customer price is required";
  if (
    priceInfo.planprice === null ||
    priceInfo.planprice === undefined ||
    priceInfo.planprice === ""
  )
    errors.planprice = "Plan price is required";
  // if (
  //   planCost?.PlanCostAndExpiry?.IsAutoReedem === "1" &&
  //   !priceInfo.oneTimeRONumber
  // ) {
  //   errors.oneTimeRONumber = "One Time RO Number is required";
  // }
  Object.values(errors).forEach((error) => toast.error(error));

  return errors;
};

const handleEmailInfo = async (auth, Token, id, email) => {
  const url = `https://mypcp.us/pens/api/dealer/sendemail`;
  const formdata = objectToFormData({
    ...auth,
    selected_contract: id,
    email: email,
  });
  const res = await fetchPost({
    url,
    token: Token,
    formdata,
  });
  console.log(res);
};
const handlePrintLetter = async (
  Token,
  id,
  setPrintLetter,
  setShowPrintLetter
) => {
  const url = `https://mypcp.us/webservices/contracts/PrintCustomerLetter?Contract_Id=${id}`;

  const res = await fetchPost({
    method: "GET",
    url,
    token: Token,
  });
  setShowPrintLetter(true);
  setPrintLetter(res.html);
};
const handlePrintContract = (id) => {
  const url = `https://mypcp.us/webservices/contracts/getSingleContract?Contract_Id=${id}&mergeletter=1`;
  window.open(url, "_blank");
};
export const PrintContractEmail = ({
  auth,
  Token,
  id,
  email,
  setemail,
  setPrintLetter,
  setShowPrintLetter,
}) => {
  return (
    <div className="h-full w-full flex justify-center item-center ">
      <div className="h-[80%]  w-[1px] m-auto bg-gray-200 "></div>
      <div className="space-y-6 px-8  mt-[10%] ">
        {/* first div */}
        <div className="w-full  flex flex-col items-center justify-center space-y-4">
          <MdLocalPrintshop size={20} />
          <CustomButton
            className={"w-full"}
            size="sm"
            Icon={MdLocalPrintshop}
            onClick={() => handlePrintContract(id)}
          >
            Print Contract
          </CustomButton>
          {/* <CustomButton
            className={"w-full"}
            size="sm"
            Icon={MdOutlineEmail}
            onClick={() =>
              handlePrintLetter(Token, id, setPrintLetter, setShowPrintLetter)
            }
          >
            Print Letter
          </CustomButton> */}
        </div>
        {/* 2nd div */}
        <div className="w-full flex flex-col items-center justify-center space-y-4 ">
          <MdOutlineEmail size={20} />
          <p className="m-0 p-0 text-sm text-center">
            Email customer their contract information
          </p>
          <div>
            <Input
              value={email}
              setvalue={setemail}
              type="email"
              placeholder="Email Address"
            />
          </div>
        </div>
        {/* others */}
        <CustomButton
          onClick={() => handleEmailInfo(auth, Token, id, email)}
          size="sm"
          className={"w-full bg-orange-500 hover:bg-orange-600"}
          Icon={MdOutlineEmail}
        >
          Email Info
        </CustomButton>
      </div>
    </div>
  );
};

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
