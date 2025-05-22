import React from "react";

const page = () => {
  return <div></div>;
};

export default page;

// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import SpinnerLoader from "@/app/Components/SpinnerLoader";
// import ShadowContainer from "@/app/Components/containers/ShadowContainer";

// import { BsFillQuestionSquareFill } from "react-icons/bs";
// import { GlobalContext } from "@/app/Provider";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";
// import { unixTimestampToDate } from "@/app/functions";
// import Link from "next/link";
// const page = () => {
//   const [customerSummary, setCustomerSummary] = useState([]);
//   const { GLOBAL_RESPONSE, globalState } = useContext(GlobalContext);
//   console.log("globalState", globalState);
//   const handleLoadMore = () => {
//     const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
//       GLOBAL_RESPONSE;

//     if (!Token || !pcp_user_id || !user_cizacl_role_id || !user_id) {
//       toast.error("Missing required authentication information.");
//       return;
//     }

//     const headers = new Headers();
//     headers.append("AUTHORIZATION", Token);

//     let formdata = new FormData();

//     formdata.append("role_id", formdataObject?.role_id);
//     formdata.append("user_id", formdataObject?.user_id);
//     formdata.append("pcp_user_id", formdataObject?.pcp_user_id);
//     formdata.append("DealerID", formdataObject?.DealerID);
//     formdata.append("FromDate", formdataObject?.FromDate);
//     formdata.append("ToDate", formdataObject?.ToDate);
//     formdata.append("FixedDateParameter", formdataObject?.FixedDateParameter);
//     formdata.append("offset", formdataObject?.offset);
//     formdata.append("ReportDropDown", formdataObject?.ReportDropDown);
//     formdata.append("TerritoryCode", formdataObject?.TerritoryCode);

//     formdata.append(
//       "HideMaturedContractFromReport",
//       responseState?.res?.HideMaturedContractFromReport
//     );
//     formdata.append(
//       "RedeemServicesNoofDays",
//       responseState?.res?.RedeemServicesNoofDays
//     );

//     fetch("https://mypcp.us/webservices/reports/newreport", {
//       method: "POST",
//       body: formdata,
//       headers: headers,
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.success === "1") {
//           const newSummary = res?.CustomerSummary || [];
//           setCustomerSummary((prev) => [...prev, ...newSummary]); // Append new data to existing array
//           toast.success("Data loaded successfully!");
//         } else {
//           toast.error("Failed to fetch data.");
//         }
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//         toast.error("Can't get Dealer Setting err3");
//       });
//   };

//   return (
//     <div>
//       <MatureContractsPrint />{" "}
//     </div>
//   );
// };

// export default page;
