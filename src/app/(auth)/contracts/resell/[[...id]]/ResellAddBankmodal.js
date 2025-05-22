import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "@/app/Provider";
import ModalContainer from "@/app/Components/containers/ModalContainer";
import Input from "@/app/Components/Inputs/Input";
import Button from "@/app/Components/Button";
import TailwindLoading from "@/app/Components/TailwindLoading";
import { ResellContractContext } from "./page";
const ResellAddBankmodal = ({ setmodal }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { dealer, setbanks, setcontractbank, setAddNewBank } = useContext(
    ResellContractContext
  );
  const [modalloading, setmodalloading] = useState("");
  const [newbank, setnewbank] = useState("");
  const fetchAddBank = () => {
    setmodalloading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealer);
    formdata.append("AddNewbank", newbank);

    fetch("https://mypcp.us/webservices/contracts/addbank", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setmodalloading(false);
        if (res.success == "1") {
          toast.success("Bank Added");
          setbanks(res.Banks);
          setcontractbank(res.BankID);
          setAddNewBank(res?.BankID);
          setmodal(false);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setmodalloading(false);
        toast.error("Can't add Bank err3");
        console.log(error);
      });
  };
  return (
    <ModalContainer width="w-1/3" height="h-80">
      <h3 className="w-full border-b p-5 font-semibold text-xl">
        Add New Bank
      </h3>
      <div className="w-full p-5">
        <Input
          label="Bank Name"
          value={newbank}
          setvalue={setnewbank}
          placeholder="Bank Name"
          type="text"
          width={"full"}
          bgcolor={"gray-100"}
        />
      </div>
      <div className="w-full flex flex-row justify-between items-center border-t p-5">
        <Button
          text="Close"
          onClick={() => {
            setmodal(false);
          }}
          bg="red-500"
        />
        {modalloading ? (
          <TailwindLoading />
        ) : (
          <Button text="Save" onClick={fetchAddBank} bg="siteBlue" />
        )}
      </div>
    </ModalContainer>
  );
};

export default ResellAddBankmodal;
