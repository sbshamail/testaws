import React from "react";
import { getCookie } from "@/action/cookieAction";
import { fetchPostObj } from "@/utils/action/function";
import { formatDate } from "@/utils/helpers";
import CancelIdOne from "../component/CancelIdOne";
import CancelIdTwo from "../component/CancelIdTwo";

const page = async ({ params }) => {
  const decodedId = decodeURIComponent(params.id);
  const queryParams = decodedId.split("&");
  const queryObj = {};

  queryParams.forEach((param) => {
    const [key, value] = param.split("=");
    queryObj[key] = value;
  });

  const ContractNo = queryObj.id;
  const Mileage = queryObj.mileage;
  const unlimitedMileage = queryObj.unlimitedMileage;
  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const auth = await getCookie("auth", true);
  const Token = await getCookie("Token");
  const data = { ContractNo, ExpiryDate: formatDate(currentDate), Mileage };
  const res = await fetchPostObj({
    api: "contracts/cancellationdetail",
    auth,
    Token,
    data,
  });
  console.log(res);
  if (res?.CancellID == "2") {
    return (
      <CancelIdTwo
        apiData={res}
        todayDate={formatDate(currentDate)}
        Mileage={Mileage}
        auth={auth}
        Token={Token}
        ContractNo={ContractNo}
        unlimitedMileage={unlimitedMileage}
      />
    );
  } else if (res?.CancellID == "1") {
    return (
      <CancelIdOne
        apiData={res}
        auth={auth}
        Token={Token}
        todayDate={formatDate(currentDate)}
        Mileage={Mileage}
        ContractNo={ContractNo}
        unlimitedMileage={unlimitedMileage}
      />
    );
  }
};

export default page;
