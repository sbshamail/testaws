import React, { useContext, useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { currencyFormatter } from "@/utils/helpers";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import Select from "@/app/Components/Inputs/Select";
const AddSaleServiceModal = ({
  open,
  close,
  xpPoints,
  fetchXp,
  smlcpoints,
  setLoading,
}) => {
  const { auth, Token } = useContext(GlobalContext);
  const [LoyaltyID, setLoyaltyID] = useState("");

  const handleSubmit = async () => {
    const data = {
      ContractID: xpPoints.ContractID,
      EnableKaminskyLoyaltyProgram:
        xpPoints?.dealerinfo?.EnableKaminskyLoyaltyProgram,
      EnableVehicleCoverageLP: xpPoints?.dealerinfo?.EnableVehicleCoverageLP,
      IsGuest: 0,
      LoyaltyID,
    };
    const res = await fetchPostObj({
      api: "contracts/saveaddsalesservicepoint",
      auth,
      data,
      Token,
      setLoading,
      showToast: true,
    });
    if (res) {
      fetchXp();
      close();
    }
  };
  return (
    <div>
      <SimpleModal
        open={open}
        close={close}
        className={"w-10/12 m-auto bg-card p-6 rounded-lg mt-10"}
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl">Add Sale/Service Point</h1>
            </div>
            <div className="flex gap-2">
              <div
                className="font-bold w-6 h-6 p-3 -mt-4 flex items-center justify-center border rounded-full hover:text-red-500 hover:border-red-500 Transition cursor-pointer "
                onClick={close}
              >
                X
              </div>
            </div>
          </div>
          <div className="w-full h-[1px]  my-6"></div>
          <form className="flex flex-col gap-4">
            <Select
              label="Service Name"
              placeholder="LoyaltyID"
              setvalue={setLoyaltyID}
              value={LoyaltyID}
              options={smlcpoints}
            />
            <div className="flex justify-center gap-2">
              <CustomButton className={""} variant="main" onClick={close}>
                Close
              </CustomButton>
              <CustomButton type="button" onClick={handleSubmit}>
                Submit
              </CustomButton>
            </div>
          </form>
        </div>
      </SimpleModal>
    </div>
  );
};

export default AddSaleServiceModal;
