import React, { useState } from "react";
import FileUpload from "@/app/Components/FileUpload";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";
import Button from "@/app/Components/Button";
import TextAreaInput from "@/app/Components/Inputs/TextAreaInput";
import DualRadioInput from "@/app/Components/Inputs/DualRadioInput";

const Tab2 = () => {
  const [image, setimage] = useState(null);
  const [subtractfromrefunded, setsubtractfromrefunded] = useState(0);
  const [deletiondialogue, setdeletiondialogue] = useState(0);
  const [cancellationvariable, setcancellationvariable] = useState("");
  const [contractbottomtext, setcontractbottomtext] = useState("");

  const list = [
    {
      label: "Contract Entry Welcome SMS",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Hide Service Page on Print Contract",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label:
        "Allowing selling contract for less than the selling price of contract",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Auto Fill contract form",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Expired Contract can redeem service",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Block service redemption for inactive contracts",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Bank Address Mandatory",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "In-Active Contract Gifting",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Customer e-signature",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
  ];
  const options = [
    { text: "Yes", value: 1 },
    { text: "No", value: 0 },
  ];
  const cancellationvariableoptions = [
    { text: "All", value: "" },
    { text: "Time Based", value: "t" },
    { text: "Mileage Based", value: "m" },
  ];
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex gap-5">
        <div className="flex flex-col gap-5 w-full">
          <div className="font-semibold">Contract Card Image</div>
          <FileUpload uploadedfile={image} setuploadedfile={setimage} />
          <DualRadioInput
            label="Services used, subtract from refunded price"
            options={options}
            value={subtractfromrefunded}
            setvalue={setsubtractfromrefunded}
          />
          <DualRadioInput
            label="Contract deletion reason dialogue"
            options={options}
            value={deletiondialogue}
            setvalue={setdeletiondialogue}
          />
          <Select
            label="Cancellation Variable"
            value={cancellationvariable}
            setvalue={setcancellationvariable}
            options={cancellationvariableoptions}
            bgcolor={"gray-200"}
          />
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="font-semibold">Contract Settings</div>
          {list.map((item, i) => (
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
          <div className="w-full flex flex-col gap-2">
            <div>Sending Hours (CDT/CST)</div>
            <div className="w-full flex gap-5">
              <Input type="time" bgcolor={"gray-200"} />
              <Input type="time" bgcolor={"gray-200"} />
            </div>
          </div>
          <TextAreaInput
            value={contractbottomtext}
            setvalue={setcontractbottomtext}
            placeholder="Type SMS Msg Here..."
            bgcolor={"gray-200"}
          />
          <Button text="Save" bg="siteBlue" />
          <DualRadioInput
            label="Include OPT SMS Msg"
            options={options}
            value={subtractfromrefunded}
            setvalue={setsubtractfromrefunded}
          />
        </div>
      </div>
      <div className="w-2/3">
        <TextAreaInput
          label="Contract Bottom Text"
          value={contractbottomtext}
          setvalue={setcontractbottomtext}
          placeholder="Ex. If Cancellation occurs within the first..."
          bgcolor={"gray-200"}
        />
      </div>
    </div>
  );
};

export default Tab2;
