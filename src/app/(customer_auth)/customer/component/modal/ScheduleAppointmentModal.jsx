import React, { useContext, useEffect, useState } from "react";
import { fetchPostObj } from "@/utils/action/function";
import { GlobalContext } from "@/app/Provider";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import Input from "@/app/Components/Inputs/Input";
import { SimpleFilterableSelect } from "@/components/cui/select/SimpleFilterableSelect";
import RadioInput from "@/app/Components/Inputs/RadioInput";
import Checkbox from "@/components/cui/textField/Checkbox";
import TextField from "@/components/cui/textField/TextField";
import ProfilePictureUpload from "@/components/cui/imageInput/ProfilePictureUpload";
import { CustomButton } from "@/components/cui/button/CustomButton";

const ScheduleAppointmentModal = ({ open, close }) => {
  const [data, setData] = useState(null);
  const [values, setValues] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const { auth, Token, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    customer_id: CustomerID,
    ContractID,
    IsGuest = "0",
  } = GLOBAL_RESPONSE || {};
  const optionTimeList = () => {
    const timeList = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const h = hour.toString().padStart(2, "0");
        const m = minutes.toString().padStart(2, "0");
        timeList.push(`${h}:${m}`);
      }
    }
    return timeList.map((item) => ({ text: item, value: item }));
  };
  const clock = [
    { text: "AM", value: "AM" },
    { text: "PM", value: "PM" },
  ];
  const fetchScheduleService = async () => {
    const data = { CustomerID, ContractID, IsGuest };
    const res = await fetchPostObj({
      auth,
      Token,
      data,
      api: "customer/scheduleservice",
      spinner: true,
      showToast: true,
    });
    if (res) {
      setData(res);
    }
  };
  useEffect(() => {
    fetchScheduleService();
  }, []);
  return (
    <div>
      <SimpleModal
        open={open}
        close={close}
        title={"SCHEDULE APPOINTMENT"}
        className={"max-w-[600px]"}
      >
        <div className="flex flex-col gap-4">
          <div className="">
            <label>Upload Image</label>
            <ProfilePictureUpload
              selectedFile={selectedFile}
              onFileChange={setSelectedFile}
              maxSizeInMB={1}
              className="mb-4"
              id="profile-picture"
            />
          </div>
          <Input label={"Requested Date of Service"} type={"date"} />
          <div>
            <label>Requested Time of Service</label>
            <div className="flex items-center gap-2">
              <SimpleFilterableSelect
                placeholder={"Time"}
                options={optionTimeList()}
                className="w-full"
              />
              <SimpleFilterableSelect placeholder={"Clock"} options={clock} />
            </div>
          </div>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2 border border-border bg-muted-foreground/20  rounded">
              <div className="bg-muted p-2">
                <Checkbox type="radio" />
              </div>
              <label className="pr-2 ">Contract Services</label>
            </div>
            <div className="flex items-center gap-2 border border-border bg-muted-foreground/20  rounded">
              <div className="bg-muted p-2">
                <Checkbox type="radio" />
              </div>
              <label className="pr-2 ">Non Contract Services</label>
            </div>
          </div>
          <TextField
            textarea={true}
            label={"Type of Services"}
            labelClass="text-base"
          />
          <TextField
            textarea={true}
            label={"Details about your request"}
            labelClass="text-base"
          />
          <div className="p-2 rounded bg-primary/50 flex items-center justify-center">
            You should get a response back from dealership on your app and via
            email
          </div>
          <div className="flex justify-between">
            <CustomButton>Send</CustomButton>
            <CustomButton variant="danger">Close</CustomButton>
          </div>
        </div>
      </SimpleModal>
    </div>
  );
};

export default ScheduleAppointmentModal;
