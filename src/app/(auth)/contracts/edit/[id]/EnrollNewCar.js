import Input from "@/app/Components/Inputs/Input";
import { GlobalContext } from "@/app/Provider";
import Image from "next/image";
import React, { useState, useEffect, useRef, useContext } from "react";
import toast from "react-hot-toast";
import {
  Select as NextuiSelect,
  SelectSection,
  SelectItem,
  SelectedItems,
} from "@nextui-org/react";

const EnrollNewCar = ({ isOpen, onClose, contractDetails }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [vin, setVin] = useState("");
  const [carfaxData, setCarfaxData] = useState("");

  // State to manage displayed history entries
  const [page, setPage] = useState(0);
  const historyRef = useRef(null);
  const [page2, setPage2] = useState(0);
  const historyRef2 = useRef(null);

  const [year, setyear] = useState([]);

  const [makes, setmakes] = useState([]);
  const [plans, setplans] = useState([]);
  const [models, setmodels] = useState([]);

  // Load initial entries

  // Scroll event handler
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = historyRef.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Load initial entries

  // Scroll event handler
  const handleScroll2 = () => {
    const { scrollTop, scrollHeight, clientHeight } = historyRef2.current;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage2((prevPage) => prevPage + 1);
    }
  };

  const fetchCarfaxData = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("VIN", vin);
    formdata.append("ContractID", contractDetails?.ContractID);
    formdata.append("ContractNo", contractDetails?.ContractNo);

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/carfaxvindetail", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        // console.log("Raw response:", response);
        return response.text(); // Log the raw text response to check if it's valid JSON
      })
      .then((text) => {
        try {
          const json = JSON.parse(text);
          if (json.success === 1) {
            setCarfaxData(json?.serviceHistory);
          } else if (json.success === 0) {
            toast.error(json?.message);
          }
        } catch (error) {
          console.error("JSON parsing error:", error);
          toast.error("Failed to parse server response.");
        }
      })
      .catch((error) => {
        console.log({ error });
        toast.error("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="px-4 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Enroll New Car</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <div className="flex justify-between gap-4">
              <span onClick={onClose} className="text-2xl">
                &times;
              </span>
            </div>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="col-span-1">
              <Input
                placeholder="VIN"
                type="text"
                bgcolor="gray-100"
                value={vin}
                setvalue={setVin}
                image="/images/bluecar.png"
                onImageClick={fetchCarfaxData}
                loading={loading}
                width="full"
                className="w-full rounded-md shadow-sm"
              />
            </div>

            <div className="col-span-1">
              <NextuiSelect
                label="Make"
                className="w-full rounded-md shadow-sm"
              >
                {makes?.map((make) => (
                  <SelectItem key={make.value} value={make.value}>
                    {make.text}
                  </SelectItem>
                ))}
              </NextuiSelect>
            </div>

            <div className="col-span-1">
              <NextuiSelect
                label="Model"
                className="w-full rounded-md shadow-sm"
              >
                {models?.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.text}
                  </SelectItem>
                ))}
              </NextuiSelect>
            </div>

            <div className="col-span-1">
              <NextuiSelect
                label="Year"
                className="w-full rounded-md shadow-sm"
              >
                {year?.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.text}
                  </SelectItem>
                ))}
              </NextuiSelect>
            </div>
          </div>
          <div className="w-full flex justify-center space-x-4 mt-5">
            <button
              onClick={onClose}
              className="bg-siteOrange text-white px-8 py-2 rounded-md"
            >
              Close
            </button>
            <button className="bg-siteBlue text-white px-8 py-2 rounded-md">
              Save
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default EnrollNewCar;
