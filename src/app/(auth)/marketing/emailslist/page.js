"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import { AdminLayoutContext } from "../../layout";
import Button from "@/app/Components/Button";
import Select from "@/app/Components/Inputs/Select";
import Input from "@/app/Components/Inputs/Input";
import TextAreaInput from "@/app/Components/Inputs/TextAreaInput";
import { EmailTypesList } from "@/app/fixedvalues";
const Page = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const [dealer, setdealer] = useState(admindealeroptions[0].value);
  const [emailtype, setemailtype] = useState("");
  const [subject, setsubject] = useState("");
  const [to, setto] = useState("");
  const [cc, setcc] = useState("");
  const [bcc, setbcc] = useState("");
  return (
    <PageContainer>
      <div className="w-full">
        <h1 className="font-bold text-xl my-5">EMAIL - LIST</h1>
        <ShadowContainer>
          <div className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col gap-5">
              <Select
                label="Email Type"
                value={emailtype}
                setvalue={setemailtype}
                options={EmailTypesList}
                bgcolor={"gray-200"}
              />
              <Input
                label="Email Subject"
                value={subject}
                setvalue={setsubject}
                placeholder="Email Subject"
                type="text"
                bgcolor={"gray-200"}
              />
              <TextAreaInput
                label="Email Address To"
                value={to}
                setvalue={setto}
                placeholder="Email Address To"
                type="text"
                bgcolor={"gray-200"}
              />
              <TextAreaInput
                label="Email Address CC"
                value={cc}
                setvalue={setcc}
                placeholder="Email Address CC"
                type="text"
                bgcolor={"gray-200"}
              />
              <TextAreaInput
                label="Email Address Bcc"
                value={bcc}
                setvalue={setbcc}
                placeholder="Email Address Bcc"
                type="text"
                bgcolor={"gray-200"}
              />
              <div className="w-full flex justify-center gap-10">
                <Button text="Save" onClick bg="amber-400" />
                <Button text="Clear" onClick bg="siteBlue" />
              </div>
            </div>
            <div className="w-full text-sm">
              <div className="flex flex-row items-center  font-bold border-b  bg-gray-200 h-14 gap-2 p-2 drop-shadow-md rounded-t-lg ">
                <div className="w-1/2">Sr.#</div>
                <div className="w-full">Email Subject</div>
                <div className="w-full">Email Type</div>
                <div className="w-full">Email To</div>
                <div className="w-full">Email CC</div>
                <div className="w-full">Email Bcc</div>
                <div className="w-full">Action</div>
              </div>
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
};

export default Page;
