import React, { useEffect, useContext, useState } from "react";
import toast from "react-hot-toast";
import ModalContainer from "@/app/Components/containers/ModalContainer";
import { EditContractContext } from "../../page";
import { GlobalContext } from "@/app/Provider";
import TailwindLoading from "@/app/Components/TailwindLoading";
import { RxCross2 } from "react-icons/rx";
function extractSentences(input) {
  // Remove HTML tags
  let textWithoutTags = input.replace(/<[^>]+>/g, "");

  // Split the text into sentences starting with "-"
  let sentences = textWithoutTags.split(/\s*-\s*/).filter(Boolean);

  return sentences;
}
const ServiceDetails = () => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { servicedetailsservice, setservicedetailsmodal } =
    useContext(EditContractContext);
  const [details, setdetails] = useState(null);
  const [loading, setloading] = useState(true);
  const fetchservicedetails = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    const formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("ContractID", servicedetailsservice.ContractID);
    formdata.append("CouponID", servicedetailsservice.CouponID);
    formdata.append("ServiceID", servicedetailsservice.ServiceID);

    fetch("https://mypcp.us/webservices/contracts/popupservices", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setloading(false);
        if (res.success == "1") {
          toast.success("Service Details Found");
          setdetails(res.allcoupons);
        } else {
          toast.error("Can't get Service Details err2");
          console.log(error);
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't get Service Details err3");
        console.log(error);
      });
  };
  useEffect(() => {
    fetchservicedetails();
  });
  return (
    <ModalContainer>
      <div className="w-full h-full flex flex-col items-center gap-5 p-5">
        <h2 className="w-full border-b p-5 font-semibold text-xl flex justify-between items-center">
          <div>Service Details</div>
          <button
            onClick={() => {
              setservicedetailsmodal(false);
            }}
          >
            <RxCross2 />
          </button>
        </h2>
        {loading && <TailwindLoading />}
        {!loading && details && (
          <div className="flex flex-col gap-5 bg-amber-400 text-white rounded-xl p-5 h-full overflow-auto">
            {details.map((detail, i) => (
              <div key={detail.CouponDetailID}>
                {extractSentences(detail.ServiceName).map((sentence, i) => (
                  <div key={i}>-{sentence}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default ServiceDetails;
