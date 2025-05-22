import Input from "@/app/Components/Inputs/Input";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";

import toast from "react-hot-toast";
import { Toastify } from "@/utils/helpers";
import Select from "@/app/Components/Inputs/Select";
import TextField from "@/components/cui/textField/TextField";
import { CustomButton } from "@/components/cui/button/CustomButton";

const optionIssues = [
  { value: "Can’t Log in to site or App" },
  { value: "Lost Password" },
  { value: "Lost Username" },
  { value: "Service Question" },
  { value: "App Question" },
];
const SendEmail = ({ sendEmail, setIsLoading, toggleSendEmail }) => {
  const [invalidField, setInvalidField] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dealership, setDealership] = useState("");
  const [issue, setIssue] = useState("Select Issue");

  const [detail, setDetail] = useState("");
  const handleEmailSend = () => {
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      toast.error("Please enter a valid email address");
      setInvalidField("email");
      return;
    }
    // Name Validation
    if (!name.trim()) {
      toast.error("Name is required");
      setInvalidField("name");
      return;
    }
    if (/\d/.test(name)) {
      toast.error("Name cannot contain numbers");
      setInvalidField("name");
      return;
    }
    // Dealership Validation
    if (!dealership.trim()) {
      toast.error("Dealership name is required");
      setInvalidField("dealership");
      return;
    }
    // Issue Validation
    if (issue === "Select Issue") {
      toast.error("Please select an issue");
      setInvalidField("issue");
      return;
    }

    // Description Validation
    if (!detail.trim()) {
      toast.error("Description is required");
      setInvalidField("detail");
      return;
    }

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("dealership", dealership);
    // formdata.append("subject", subject);
    formdata.append("issue", issue);
    formdata.append("detail", detail);

    setIsLoading(true);

    fetch("https://mypcp.us/react/login/sendcontactusemail", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        Toastify("success", "Successfully Sent Email");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Can't Send Email err3");
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  return (
    <Transition
      show={sendEmail}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="w-full flex flex-col justify-center items-center pb-4 gap-4">
        <Image
          src="/images/procarma-logo-white-text.png"
          width={200}
          height={200}
          alt={`procarma logo ${new Date().getTime()}`}
        />
        <h2 className="text-xl text-siteBlue text-center mb-3">
          PREFERRED CUSTOMER PROGRAM
        </h2>
      </div>
      <div className="w-full flex flex-col gap-4 items-center justify-center">
        <div className="w-full">
          <Input
            value={name}
            setvalue={setName}
            placeholder="Name"
            width={"full"}
            className={invalidField === "name" ? "border-red-500" : ""}
            type="text"
            suffix={() => (
              <div className="p-2 rounded-full text-secondary-foreground ">
                <AiOutlineUser size={15} />
              </div>
            )}
          />
        </div>
        <div className="w-full">
          <Input
            value={email}
            setvalue={setEmail}
            placeholder="Email"
            className={invalidField === "email" ? "border-red-500" : ""}
            type="text"
            suffix={() => (
              <div className="p-2 rounded-full text-secondary-foreground ">
                <MdOutlineEmail size={15} />
              </div>
            )}
          />
        </div>
        <div className="w-full">
          <Input
            value={dealership}
            setvalue={setDealership}
            placeholder="Dealership Name"
            className={invalidField === "dealership" ? "border-red-500" : ""}
            type="text"
            suffix={() => (
              <div className="p-2 rounded-full text-secondary-foreground ">
                <AiOutlineUser size={15} />
              </div>
            )}
          />
        </div>
        <Select
          options={optionIssues}
          onlyLabel={"Select Issue"}
          keyValue={"value"}
          keyTitle={"value"}
          setvalue={setIssue}
          value={issue}
          className={"w-full"}
        />
        <div className="w-full">
          <TextField
            textarea={true}
            className={`w-full  ${
              invalidField === "detail" ? "border-red-500" : ""
            }`}
            placeholder="Type here..."
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="flex justify-between  gap-3">
          <CustomButton onClick={toggleSendEmail} variant="outline">
            Back to Login
          </CustomButton>

          <CustomButton onClick={handleEmailSend} variant="main">
            Send Email
          </CustomButton>
        </div>
      </div>
    </Transition>
  );
};

export default SendEmail;
