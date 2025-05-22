import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "@/app/Provider";

import Input from "@/app/Components/Inputs/Input";
import Button from "@/app/Components/Button";
import TailwindLoading from "@/app/Components/TailwindLoading";
import { objectToFormData } from "@/utils/helpers";
import { fetchPost } from "@/utils/action/function";
import SimpleModal from "@/components/cui/modals/SimpleModal";
const AddBankmodal = ({
  open,
  close,
  fn,
  DealerID,
  setbanks,
  setcontractbank,
}) => {
  const { auth, Token } = useContext(GlobalContext);

  const [modalloading, setmodalloading] = useState("");
  const [newbank, setnewbank] = useState("");
  const fetchAddBank = async () => {
    setmodalloading(true);

    const formdata = objectToFormData({
      ...auth,
      DealerID,
      AddNewbank: newbank,
    });

    const res = await fetchPost({
      url: "https://mypcp.us/webservices/contracts/addbank",
      token: Token,
      formdata,
      setLoading: setmodalloading,
      showToast: true,
    });

    if (res) {
      if (res) {
        toast.success("Bank Added");
        setbanks(res.Banks);
        setcontractbank(res.BankID);
        if (fn) {
          fn(true);
        }
        close();
      } else {
        toast.error(res.message);
      }
    }
  };
  return (
    <SimpleModal
      title={"Add New Bank"}
      className={"max-w-2xl"}
      open={open}
      close={close}
    >
      <h3 className="w-full border-b p-5 font-semibold text-xl"></h3>
      <div className="w-full p-5">
        <Input
          label="Bank Name"
          value={newbank}
          setvalue={setnewbank}
          placeholder="Bank Name"
          type="text"
          width={"full"}
        />
      </div>
      <div className="w-full flex flex-row justify-between items-center border-t p-5">
        <Button text="Close" onClick={close} bg="red-500" />
        {modalloading ? (
          <TailwindLoading />
        ) : (
          <Button text="Save" onClick={fetchAddBank} bg="siteBlue" />
        )}
      </div>
    </SimpleModal>
  );
};

export default AddBankmodal;
