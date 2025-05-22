import React, { useState } from "react";
import { Toastify } from "@/utils/helpers";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import Input from "@/app/Components/Inputs/Input";
const ChangePasswordModal = ({
  close,
  open,
  auth,
  Token,
  username,
  CustomerID,
  ContractID,
  IsGuest,
}) => {
  const [values, setValues] = useState({
    oldpassword: "",
    newpassword: "",
    retypepassword: "",
    ContractID,
    CustomerID,
    IsGuest,
  });

  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (values.newpassword !== values.retypepassword) {
      Toastify("error", "Passwords do not match");
      return;
    }
    const res = await fetchPostObj({
      auth,
      Token,
      api: "customer/updatepassword",
      data: values,
      showToast: true,
    });
    close();
  };
  return (
    <SimpleModal
      close={close}
      open={open}
      title={
        <span>
          {username} <span className="font-light">Update Password</span>
        </span>
      }
      className={"max-w-2xl"}
    >
      <form className="flex flex-col gap-6">
        <Input
          value={values.oldpassword}
          name={"oldpassword"}
          label="Old Password"
          type="password"
          onChange={handleChange}
        />
        <Input
          name={"newpassword"}
          value={values.newpassword}
          label="New Password"
          type="password"
          onChange={handleChange}
        />
        <Input
          name={"retypepassword"}
          value={values.retypepassword}
          label="Re Password"
          type="password"
          onChange={handleChange}
        />

        <div className="flex gap-2 items-center justify-center">
          <CustomButton type="submit" onClick={handleSubmit}>
            Submit
          </CustomButton>
          <CustomButton variant="main" onClick={close}>
            Cancel
          </CustomButton>
        </div>
      </form>
    </SimpleModal>
  );
};

export default ChangePasswordModal;
