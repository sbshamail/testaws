import Input from "@/app/Components/Inputs/Input";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { fetchPost } from "@/utils/action/function";
import { objectToFormData } from "@/utils/helpers";
import React, { useState } from "react";

const SendEmailModal = ({
  contractIds,
  open,
  close,
  auth,
  Token,
  formdata,
  setLoading,
  setSelectedRows,
}) => {
  const [email, setEmail] = useState("");
  const handleEmailSend = async () => {
    contractIds();
    objectToFormData({ ...auth, UserEmail: email }, formdata);
    const res = await fetchPost({
      api: "contracts/emailcontractreport",
      setLoading,
      formdata,
      token: Token,
      showToast: true,
    });
    if (res) {
      close();
      setSelectedRows([]);
    }
  };
  return (
    <SimpleModal
      open={open}
      close={close}
      className={"mt-10"}
      title={"Email Contract"}
    >
      <form className="grid gap-4">
        <Input setvalue={setEmail} value={email} placeholder={"Email"} />

        <div className="flex space-x-2">
          <CustomButton onClick={handleEmailSend}>Submit</CustomButton>
          <CustomButton variant="main" onClick={close}>
            Close
          </CustomButton>
        </div>
      </form>
    </SimpleModal>
  );
};

export default SendEmailModal;
