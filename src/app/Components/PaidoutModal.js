import SimpleModal from "@/components/cui/modals/SimpleModal";
import { fetchPostObj } from "@/utils/action/function";
import React, { useState } from "react";
import Input from "@/app/Components/Inputs/Input";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { Toastify } from "@/utils/helpers";
const PaidoutModal = ({ open, close, batchId, auth, Token, setOffSet }) => {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClear = () => setDate("");
  const handleSaveBatchPaymentRecieved = async () => {
    if (!date) {
      Toastify("error", "Please select a date");
      return;
    }
    const data = {
      BatchID: batchId,
      ReceivedDate: date,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "batch/savebatchpaymentreceived",
      data,
      setLoading,
    });

    if (res) {
      close();
      setDate(null);
      setOffSet("0");
    }
  };

  return (
    <SimpleModal
      open={open}
      close={close}
      title={"Select Date"}
      className={"max-w-4xl m-auto"}
    >
      <SpinnerCenterScreen loading={loading} />
      <div className=" flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div
            onClick={handleClear}
            className=" text-muted-foreground tracking-wide cursor-pointer hover:text-primary hover:underline"
          >
            Clear
          </div>
        </div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            onClick={handleSaveBatchPaymentRecieved}
            className="bg-siteBlue text-white py-3 px-8 rounded-xl hover:bg-siteBlue/80 shadow-md"
          >
            Save
          </button>
          <button
            onClick={close}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-8 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};
export default PaidoutModal;
// mustajab ud dawaat
