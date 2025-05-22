import React, { useState } from "react";
import Input from "@/app/Components/Inputs/Input";
import DualRadioInput from "@/app/Components/Inputs/DualRadioInput";
import Toggle from "@/app/Components/Inputs/Toggle";

const Tab6 = () => {
  const [subtractfromrefunded, setsubtractfromrefunded] = useState(0);
  const [bct, setbct] = useState("");
  const [urltitle, seturltitle] = useState("");
  const [url, seturl] = useState("");
  const [papp, setpapp] = useState(false);
  const [capp, setcapp] = useState(false);
  const [appid, setappid] = useState("");

  const list1 = [
    {
      label: "First Time Video Playback on Log In",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Enable Google Feedback",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Secondary Dashboard",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Dashboard Slider",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
  ];
  const list2 = [
    {
      label: "Mileage in apps and customer portal",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
    {
      label: "Variable Dashboard",
      value: subtractfromrefunded,
      setvalue: setsubtractfromrefunded,
    },
  ];
  const options = [
    { text: "Enable", value: 1 },
    { text: "Disable", value: 0 },
  ];
  const options2 = [
    { text: "Show", value: 1 },
    { text: "Hide", value: 0 },
  ];
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full flex items-center gap-10">
        <div className="w-full flex gap-2 items-center">
          <div className="font-semibold">PROCARMA APP</div>
          <Toggle
            value={papp}
            setvalue={setpapp}
            truetext="ON"
            falsetext="OFF"
          />
        </div>
        <div className="w-full flex gap-2 items-center">
          <div className="font-semibold">CUSTOM APP</div>
          <Toggle
            value={capp}
            setvalue={setcapp}
            truetext="ON"
            falsetext="OFF"
          />
        </div>
        <Input
          label="App ID"
          value={appid}
          setvalue={setappid}
          placeholder="App ID"
          type="text"
          bgcolor={"gray-200"}
        />
      </div>

      <div className="w-full flex flex-col gap-5">
        <div className="font-semibold text-lg">App Settings</div>
        {list1.map((item, i) => (
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
        {list2.map((item, i) => (
          <DualRadioInput
            key={i}
            label={item.label}
            options={options2}
            value={item.value}
            setvalue={item.setvalue}
          />
        ))}
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="w-1/2">
          <Input
            label="Bottom Copyright Text"
            value={bct}
            setvalue={setbct}
            placeholder="Bottom Copyright Text"
            type="text"
            bgcolor={"gray-200"}
          />
        </div>

        <div className="w-full flex gap-5">
          <Input
            label="External URL Title"
            value={urltitle}
            setvalue={seturltitle}
            placeholder="External URL Title"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="URL"
            value={url}
            setvalue={seturl}
            placeholder="URL"
            type="text"
            bgcolor={"gray-200"}
          />
        </div>
      </div>
    </div>
  );
};

export default Tab6;
