import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/app/Provider";
import Image from "next/image";
import { useSelection } from "@/reduxStore/function";
import Input from "@/app/Components/Inputs/Input";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import Link from "next/link";
import { AiOutlineFilePdf } from "react-icons/ai";
import { Toastify } from "@/utils/helpers";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";

export default function CoverageModal({ open, close }) {
  const contract = useSelection("contract") || {};
  const { ContractID } = contract;

  // const [open, setIsOpen] = useState(true);
  const [vin, setVin] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverages, setCoverages] = useState([]);

  useEffect(() => {
    if (open) {
      setVin(contract?.contractinfo?.VIN);
      setLastName(contract?.customereinfo?.CustomerLName);
      if (
        contract?.contractinfo?.VIN &&
        contract?.customereinfo?.CustomerLName
      ) {
        handleCoverages(
          contract?.contractinfo?.VIN,
          contract?.customereinfo?.CustomerLName
        );
      }
    }
  }, [ContractID, open]);

  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  // WMZ83BR08N3N98384
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        close();
        setLastName("");
        setVin("");
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [close]);

  const handleCoverages = (vin, lastName) => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE || {};
    if (!lastName || !vin) {
      return Toastify("error", "Fields are Empty");
    }
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("IsGuest", 0);
    formdata.append("isVcsUser", 0);
    formdata.append("VIN", vin);
    formdata.append("LastName", lastName);

    setLoading(true);

    fetch("https://mypcp.us/webservices/contracts/coveragedata", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success === 1) {
          // console.log("COVERAGES", res);
          setCoverages(res?.stoneeagle);
        }
      })
      .catch((error) => {
        console.log({ error });
        Toastify("error", "An error occurred while fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  const handleModalClose = () => {
    setVin("");
    setLastName("");
    setCoverages([]);
    close();
  };
  useEffect(() => {
    if (!open) {
      setVin("");
      setLastName("");
      setCoverages([]);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div onClick={handleBackdropClick}>
      <SimpleModal
        title={"Coverages"}
        open={open}
        close={close}
        className={"mt-auto max-w-[1100px] mx-2"}
      >
        <SpinnerCenterScreen loading={loading} center={true} />
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  id="vin"
                  type="text"
                  label={"VIN #"}
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  id="lastName"
                  label={"Last Name"}
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <DancingLoadingButton
                  loading={loading}
                  onClick={() => handleCoverages(vin, lastName)}
                  className={"w-full whitespace-nowrap p-2 px-3"}
                >
                  Search
                </DancingLoadingButton>
              </div>
            </div>
            <div className="w-full mt-4 flex flex-wrap gap-6">
              {coverages?.map((item, index) => (
                <div
                  key={index}
                  className="w-[490px] flex gap-4 shadow p-3 rounded"
                >
                  <Image
                    className="w-max"
                    src={item.ProductImage}
                    alt={item?.PlanDescription}
                    height={100}
                    width={100}
                  />
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl">{item?.PlanDescription} </h1>
                      {item?.PdfURL && (
                        <Link href={item.PdfURL} target="_blank">
                          <AiOutlineFilePdf fontSize={"1.5em"} />
                        </Link>
                      )}
                    </div>
                    <h3>{item?.DealNumber} </h3>
                    <div className="w-full flex justify-between items-center">
                      <p>
                        <span className="font-bold">Expires in</span>{" "}
                        {item.ExpirationDate}
                      </p>
                      <p>
                        <span className="font-bold">Mileage</span>{" "}
                        {item.ExpirationOdometer}
                      </p>
                    </div>
                    <div className="w-full flex justify-between bg-green-400 rounded p-2">
                      <p>Active</p>
                      <p>P# {item.ContractNumber}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex">
            <button
              onClick={handleModalClose}
              className="px-7 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </SimpleModal>
    </div>
  );
}
