import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "@/app/Provider";
import ModalContainer from "@/app/Components/containers/ModalContainer";
import Input from "@/app/Components/Inputs/Input";
import Button from "@/app/Components/Button";
import { objectToFormData } from "@/utils/helpers";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPost } from "@/utils/action/function";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";

const Addmodelmodal = ({
  setmodal,
  MakeID,
  setLoading,
  DealerID,
  setmodels,
  makeText,
}) => {
  const { auth, Token } = useContext(GlobalContext);
  const [modalloading, setmodalloading] = useState("");
  const [newVehicleModel, setNewVehicleodel] = useState("");
  console.log("Modal");
  const fetchAddModel = async () => {
    setmodalloading(true);

    const formdata = objectToFormData({
      ...auth,
      DealerID,
      MakeID,
      AddVehicleModel: newVehicleModel,
    });
    const res = await fetchPost({
      url: "https://mypcp.us/webservices/contracts/addmodel",
      token: Token,
      formdata,
      setLoading,
    });
    if (res) {
      setmodalloading(false);
      if (res) {
        toast.success("Model Added");
        setmodels(res.SpecifixModels);
        setmodal(false);
      } else {
        toast.error(res.message);
      }
    } else {
      setmodalloading(false);
      toast.error("Can't add Model err3");
    }
  };
  return (
    <ModalContainer width="w-1/3" height="h-80">
      <h3 className="w-full border-b p-5 font-semibold text-xl">
        Add New Model for {makeText}
      </h3>
      <div className="w-full p-5">
        <Input
          label="Model Name"
          value={newVehicleModel}
          setvalue={setNewVehicleodel}
          placeholder="Model Name"
          type="text"
          bgcolor={"gray-200"}
          width={"full"}
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
          <SpinnerCenterScreen loading={modalloading} />
        ) : (
          <CustomButton onClick={fetchAddModel}>Save</CustomButton>
        )}
      </div>
    </ModalContainer>
  );
};

export default Addmodelmodal;
