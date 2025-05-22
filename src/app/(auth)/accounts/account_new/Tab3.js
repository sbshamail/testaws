import React, { useState } from "react";
import Input from "@/app/Components/Inputs/Input";
import DualRadioInput from "@/app/Components/Inputs/DualRadioInput";

const Tab3 = () => {
  const [subtractfromrefunded, setsubtractfromrefunded] = useState(0);
  const [sitrepperson, setsitrepperson] = useState("");
  const [sitreppersonphone, setsitreppersonphone] = useState("");
  const [sitreppersonemail, setsitreppersonemail] = useState("");

  const ddslist = [
    {
      label: "Middle Column in Performance Report",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Hide Customer Info on Retention Map",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Contract Reserve Optional Details",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Admin Fee & Retained Columns in Matured Report Export",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
  ];
  const sslist = [
    {
      label: "Suspended Subscription on Dashboard",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Service Cancelled on normal Dashboard",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Plan Services Reserved Amount Override on Dashboard",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
  ];
  const sitreplist = [
    {
      label: "Sitrep Person",
      value: sitrepperson,
      setvalue: setsitrepperson,
      type: "text",
    },
    {
      label: "Phone #",
      value: sitreppersonphone,
      setvalue: setsitreppersonphone,
      type: "text",
    },
    {
      label: "Email Address",
      value: sitreppersonemail,
      setvalue: setsitreppersonemail,
      type: "email",
    },
  ];
  const options = [
    { text: "Hide", value: 0 },
    { text: "Show", value: 1 },
  ];
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex justify-between gap-5">
        <div className="w-2/3 flex flex-col gap-10">
          <div className="w-full flex flex-col gap-5">
            <div className="font-semibold text-lg">
              Dashboard Display Settings
            </div>
            {ddslist.map((item, i) => (
              <DualRadioInput
                key={i}
                label={item.label}
                options={options}
                value={item.value}
                setvalue={item.setvalue}
              />
            ))}
          </div>
          <div className="w-full flex flex-col gap-5">
            <div className="font-semibold text-lg">Suspended Subscription</div>
            {sslist.map((item, i) => (
              <DualRadioInput
                key={i}
                label={item.label}
                options={options}
                value={item.value}
                setvalue={item.setvalue}
              />
            ))}
          </div>
        </div>

        <div className="w-1/3 flex flex-col gap-5">
          <div className="font-semibold text-lg">Sitrep Account</div>
          {sitreplist.map((item, i) => (
            <Input
              key={i}
              label={item.label}
              value={item.value}
              setvalue={item.setvalue}
              placeholder={item.label}
              type={item.type}
              bgcolor={"gray-200"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tab3;
