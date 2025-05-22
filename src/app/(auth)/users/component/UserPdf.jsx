import { CustomButton } from "@/components/cui/button/CustomButton";
import React, { useContext } from "react";
import { fetchPostObj } from "@/utils/action/function";
import { UserContext } from "../UserProvider";
import { FaRegFilePdf } from "react-icons/fa";
import { Toastify } from "@/utils/helpers";
const CreateUserPdf = ({ auth, Token }) => {
  const { values, setLoading } = useContext(UserContext);
  const handleUserPdf = async () => {
    if (typeof values.DealerID === "undefined" || values.DealerID === "-1") {
      return Toastify("error", "Please Select Dealer");
    }
    const res = await fetchPostObj({
      api: "users/userpdf",
      auth,
      Token,
      data: { ...values },
      setLoading,
      showToast: true,
    });

    if (res) {
      window.open(res?.url, "_blank");
    }
  };
  return (
    <div className="flex justify-start w-full">
      <CustomButton
        size="sm"
        variant="main"
        Icon={FaRegFilePdf}
        onClick={handleUserPdf}
      >
        Active User PDF
      </CustomButton>
    </div>
  );
};

export default CreateUserPdf;
