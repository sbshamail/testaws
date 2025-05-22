"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import Button from "@/app/Components/Button";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";

const Page = () => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "text/csv")
    ) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      toast.error("Invalid file format. Please select a .xlsx or .csv file.");
    }
  };

  const handleImportFile = () => {
    if (!selectedFile) {
      toast.error("Please select a valid file to upload.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("EmailAddress", email);
    formdata.append("file_browse", selectedFile);

    setLoading(true);

    fetch("https://mypcp.us/webservices/importexcel/createexcel", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success === 1) {
          toast.success("File Imported Successfully");
          // Clear the selected file and email after successful upload
          setSelectedFile(null);
          setEmail("");
        } else {
          toast.error("File Import Failed");
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.error("An error occurred during file import.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <PageContainer>
      <div className="w-full mt-7">
        <ShadowContainer>
          <div className="w-full flex flex-col gap-5 p-5">
            <div className="text-3xl font-bold text-[#4C566A] my-4">
              Import Contracts
            </div>
            <h2 className="text-2xl font-semibold text-[#4C566A]">
              Welcome to PCP Data Extraction Utility!
            </h2>
            <p className="text-[#4C566A]">
              <span className="font-semibold mr-2">Step 1:</span>
              Download the format file, enter the required data, and save it on
              your system. You can then upload the file using Step 2 below.
            </p>
            <p className="text-[#4C566A]">
              <span className="font-semibold mr-2">Step 2:</span>
              Browse your system to select the Excel file containing contract
              information and press the &quot;Import&ldquo; button. Ensure the
              file includes the required columns: contract_num, dealership,
              plan, sold_date, first_name, last_name, etc.
            </p>
            <div className="w-full flex items-center gap-4 p-4 rounded-lg shadow-xl bg-gray-100">
              {/* File Upload Section */}
              <div className="w-full flex items-center">
                <label
                  htmlFor="file-upload"
                  className="flex items-center space-x-2 bg-siteBlue text-white font-bold px-4 py-2 rounded-full cursor-pointer shadow hover:opacity-70 transition-colors duration-300 whitespace-nowrap"
                >
                  <SiMicrosoftexcel />
                  <span>Browse File</span>
                </label>

                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {selectedFile && (
                  <span className="ml-4 text-gray-700 font-medium truncate">
                    {selectedFile.name}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="h-10 border-l border-gray-300"></div>

              {/* Email Input Section */}
              <div className="flex items-center w-full">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-l-full font-bold"
                >
                  <MdEmail />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow bg-gray-200 outline-none px-4 py-2 rounded-r-full text-gray-800 shadow-inner"
                />
              </div>
            </div>

            <div className="self-end">
              {loading ? (
                <SpinnerLoader />
              ) : (
                <Button
                  onClick={handleImportFile}
                  text="Import"
                  bg="amber-400"
                  disabled={!selectedFile || !isValidEmail(email)}
                  width={32}
                />
              )}
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
};

export default Page;
