import React, { useState } from "react";
import FileUpload from "@/app/Components/FileUpload";
import Input from "@/app/Components/Inputs/Input";
import DualRadioInput from "@/app/Components/Inputs/DualRadioInput";
import Toggle from "@/app/Components/Inputs/Toggle";

const Tab7 = () => {
  const [image, setimage] = useState(null);
  const [subtractfromrefunded, setsubtractfromrefunded] = useState(0);
  const [salesperson, setsalesperson] = useState("");
  const [sellingrep, setsellingrep] = useState("");
  const [url, seturl] = useState("");
  const [gi, setgi] = useState(false);

  const list1 = [
    {
      label: "Guest Can Use All Features",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label:
        "Only Use Core: services, schedule appointments, and view Quick Specials(if applicable)",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Can Use Core, plus all that apply",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Guest RoadMap",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
  ];
  const options = [
    { text: "Enable", value: 1 },
    { text: "Disable", value: 0 },
  ];
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex gap-2 items-center">
        <div className="font-semibold">Guest Interface</div>
        <Toggle value={gi} setvalue={setgi} truetext="ON" falsetext="OFF" />
      </div>

      <div className="w-1/2 flex flex-col gap-5">
        <div className="font-semibold text-lg">Guest Product Selling</div>
        <div className="w-full flex gap-5">
          <Input
            label="Selling Rep"
            value={sellingrep}
            setvalue={setsellingrep}
            placeholder="Selling Rep"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="Sales Person"
            value={salesperson}
            setvalue={setsalesperson}
            placeholder="Sales Person"
            type="text"
            bgcolor={"gray-200"}
          />
        </div>
        {list1.map((item, i) => (
          <DualRadioInput
            key={i}
            label={item.label}
            options={options}
            value={item.value}
            setvalue={item.setvalue}
          />
        ))}

        <div className="w-1/2 self-end flex flex-col gap-5">
          <Input
            value={url}
            setvalue={seturl}
            placeholder="Paste URL here"
            type="text"
            bgcolor={"gray-200"}
          />
          <FileUpload uploadedfile={image} setuploadedfile={setimage} />
        </div>
      </div>
    </div>
  );
};

export default Tab7;
