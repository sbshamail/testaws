import React, { useContext, useEffect, useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import TextField from "@/components/cui/textField/TextField";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { GlobalContext } from "@/app/Provider";
import { fetchPostObj } from "@/utils/action/function";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";

const AddMoreInformationModal = ({ open, close, fetchCustomer, editInfo }) => {
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { customer_id: CustomerID, ContractID } = GLOBAL_RESPONSE || {};
  const [InfoTitle, setInfoTitle] = useState("");
  const [InfoDescription, setInfoDescription] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (editInfo) {
      setInfoTitle(editInfo.InfoTitle);
      setInfoDescription(editInfo.InfoDescription);
    }
  }, [editInfo]);
  const handleAdd = async () => {
    const data = {
      CustomerID,
      ContractID,
      IsGuest: 0,
      InfoTitle,
      InfoDescription,
      HiddenInfoID: editInfo?.InfoID ?? "",
    };
    setLoading(true);
    const res = await fetchPostObj({
      auth,
      Token,
      data,
      showToast: true,
      api: "customer/CustomerAdditionalInfo",
    });
    if (res) {
      await fetchCustomer();
      setLoading(false);
      close();
    }
  };
  return (
    <SimpleModal
      open={open}
      close={close}
      title={"Add More Information"}
      className={"m-auto max-w-md border-2 border-[#f0c000]"}
    >
      <SpinnerCenterScreen loading={loading} center={true} />
      <form className="space-y-4" autoComplete="off">
        <div>
          <label
            htmlFor="info-title"
            className="mb-1 block text-sm font-medium"
          >
            Title
          </label>
          <TextField
            id="info-title"
            value={InfoTitle}
            onChange={(e) => setInfoTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="info-notes"
            className="mb-1 block text-sm font-medium"
          >
            Notes
          </label>
          <TextField
            value={InfoDescription}
            textarea="true"
            id="info-notes"
            rows={4}
            onChange={(e) => setInfoDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <CustomButton
            className="px-8 bg-amber-400 hover:bg-amber-500 text-black"
            onClick={(e) => {
              e.preventDefault();

              handleAdd();
            }}
          >
            SAVE
          </CustomButton>
        </div>
      </form>
    </SimpleModal>
  );
};

export default AddMoreInformationModal;
