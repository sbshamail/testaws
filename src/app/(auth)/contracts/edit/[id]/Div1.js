"use client";
import React, { useContext, useState, useEffect, Suspense } from "react";

import { unixTimestampToDate } from "@/app/functions";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";

import { EditContractContext } from "./page";
import {
  FaHashtag,
  FaCalendarAlt,
  FaCar,
  FaTachometerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { Tabs, Tab } from "@nextui-org/react";
import { IoCopyOutline } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";
import "./fontbebas.css";

import FillContract from "./FillContract/FillContract";
import ServicesRedemption from "./ServicesRedemption/ServicesRedemption";
import PricePrint from "./PricePrint/PricePrint";
import { GrServices } from "react-icons/gr";

import { GlobalContext } from "@/app/Provider";

// utils -helper
import { objectToFormData } from "@/utils/helpers";
//action

import { fetchPost } from "@/utils/action/function";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { useQuery } from "@/lib/hooks";
import TopActionModalIcons from "./component/TopActionModalIcons";
import { MdPrint } from "react-icons/md";

const Div1 = () => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { contract, password } = useContext(EditContractContext);
  const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
    GLOBAL_RESPONSE ?? {};
  const [copyStatus, setCopyStatus] = useState("idle");
  const [tabSelect, setTabSelect] = useState("contract");
  const [fillContractData, setFillContractData] = useState({});

  const [loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  // update form only that has true condition
  const [formUpdateOnly, setFormUpdateOnly] = useState({
    pvInfo: false,
    contactInfo: false,
  });

  const { addQuery, deleteQueryAll, getQuery } = useQuery();
  const handleTabSelect = (tabSelect) => {
    deleteQueryAll();
    addQuery("tab", tabSelect);
    setTabSelect(tabSelect);
  };

  useEffect(() => {
    setTabSelect(getQuery("tab"));
  }, []);
  // handle Form Submit button Function
  const auth = { role_id: user_cizacl_role_id, user_id, pcp_user_id };
  const handleEditContract = async (priceInfo) => {
    const { contactInfo, pvInfo } = fillContractData;
    // reset form condition when submit
    const reset = (value) => {
      setFormUpdateOnly({ ...formUpdateOnly, [value]: false });
    };
    if (formUpdateOnly.contactInfo === true) {
      // convert data to form data
      const contactInfoFormData = objectToFormData({
        ...auth,
        ...contactInfo,

        DealerID: pvInfo.DealerID,
      });

      // update request function for contact info
      await fetchPost({
        api: "contracts/updatecustomer",
        token: Token,
        formdata: contactInfoFormData,
        setLoading,
        showToast: true,
        reset: reset("contactInfo"),
      });
    }

    if (formUpdateOnly.pvInfo === true || priceInfo) {
      // convert data to form data
      const pvInfoFormData = objectToFormData({
        ...auth,
        ...pvInfo,
        ...priceInfo,
        HideTestContract: contactInfo?.HideTestContract,
      });
      // update request function for pv info
      await fetchPost({
        api: "contracts/updatecontract",
        token: Token,
        formdata: pvInfoFormData,
        setLoading,
        showToast: true,
        reset: reset("pvInfo"),
      });
    }
    handleTabSelect("contract");
  };

  const copyToClipboard = (text) => {
    setCopyStatus("copying");
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus("copied");
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000); // Revert back to the original icon after 2 seconds
    });
  };

  // main function
  const Header = () => (
    <div className="w-full flex flex-col lg:justify-between lg:items-center flex-wrap gap-10 rounded-xl p-8 shadow-xl bg-gradient-to-r from-siteBlue to-cyan-600 text-white md:gap-10 lg:flex-row lg:text-sm xl:text-lg">
      <div className="flex flex-col items-start gap-5 ">
        <div className="flex items-center">
          <div className="flex flex-row items-center ">
            <div>
              <span className="text-base font-medium flex items-center ">
                Contract #: {contract?.getuserbyid?.user_username}{" "}
                {copyStatus === "idle" && (
                  <>
                    <IoCopyOutline
                      className="ml-2 cursor-pointer"
                      onClick={() =>
                        copyToClipboard(contract?.getuserbyid?.user_username)
                      }
                    />
                  </>
                )}
                {copyStatus === "copying" && (
                  <ImSpinner8 className="ml-2 w-4 animate-spin" />
                )}
                {copyStatus === "copied" && (
                  <FaCheckCircle className="ml-2 w-4" />
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <FaKey className="mr-2 text-2xl lg:text-xl xl:text-2xl" />
          <div className="flex items-center space-x-2">
            <span>Password:</span>
            <span>
              {passwordVisible ? password : "•".repeat(password.length)}
            </span>
            <div className="cursor-pointer">
              {passwordVisible ? (
                <FaEyeSlash onClick={() => setPasswordVisible(false)} />
              ) : (
                <FaEye onClick={() => setPasswordVisible(true)} />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <FaCar className="mr-2 text-2xl lg:text-xl xl:text-2xl" />
          <div className="flex flex-row items-center">
            <span className="text-base font-medium flex items-center">
              Dealership: {contract?.DealerTitle}
            </span>
            {/* <span className="font-bold text-xl ml-2">
              
            </span> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:items-center justify-between gap-5">
        <div className="flex items-center">
          <FaHashtag className="mr-2 text-2xl lg:text-xl xl:text-2xl" />
          <div className="flex flex-row items-center">
            <span className="text-base font-medium flex items-center lg:text-sm xl:text-lg">
              Batch No: {!contract?.BatchNo ? "N/A" : contract?.BatchNo}
            </span>
            {/* <span className="font-bold text-xl ml-2"> */}

            {/* </span> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-5">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2 text-2xl lg:text-xl xl:text-2xl" />
          <div className="flex flex-row items-center">
            <span className="text-base font-medium flex items-center ">
              Expiration Date:{" "}
              {unixTimestampToDate(contract?.contractinfo?.ValidityDate)}
            </span>
            {/* <span className="font-bold text-xl ml-2"> */}

            {/* </span> */}
          </div>
        </div>
        <div className="flex items-center">
          <FaTachometerAlt className="mr-2 text-2xl lg:text-xl xl:text-2xl" />
          <div className="flex flex-row items-center">
            <span className="text-base font-medium flex items-center ">
              Expiration Mileage:{" "}
              {Number(contract?.contractinfo?.ValidityMileage).toLocaleString()}
            </span>
            {/* <span className="font-bold text-xl ml-2"> */}

            {/* </span> */}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<SpinnerCenterScreen loading={loading} />}>
      <SpinnerCenterScreen loading={loading} />
      <div className="flex flex-col gap-1 w-full">
        {Header()}
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-wrap justify-between items-center mr-3">
            {/* tabs left side*/}
            <div>
              <Tabs
                aria-label="Options"
                color="primary"
                variant="bordered"
                className="my-4"
                selectedKey={tabSelect}
                onSelectionChange={handleTabSelect}
                // disabledKeys={disabledKeys}
              >
                <Tab
                  key="contract"
                  title={
                    <div className="flex items-center space-x-2">
                      <FaCar className="text-xl" />
                      <span>Contract Info</span>
                    </div>
                  }
                />
                <Tab
                  key="price"
                  title={
                    <div className="flex items-center space-x-2">
                      <MdPrint className="text-xl" />

                      <span>Print Contract</span>
                    </div>
                  }
                />

                <Tab
                  key="serviceRedemption"
                  title={
                    <div className="flex items-center space-x-2">
                      <GrServices className="w-4 h-4" />
                      <span>Service Redemption</span>
                    </div>
                  }
                />
                {/* )} */}
              </Tabs>
            </div>
            {/* action icons right side */}
            <TopActionModalIcons contract={contract} />
          </div>
          <div className="my-4">
            <div
              style={{ display: tabSelect === "contract" ? "block" : "none" }}
            >
              {/* Tab Edit Contact Info Form */}
              <FillContract
                setTabSelect={handleTabSelect}
                setFillContractData={setFillContractData}
                setFormUpdateOnly={setFormUpdateOnly}
                contract={contract}
              />
            </div>

            <div style={{ display: tabSelect === "price" ? "block" : "none" }}>
              {/* Tab Edit Print Contract Form */}
              <PricePrint
                setTabSelect={handleTabSelect}
                // setPriceInfo={setPriceInfo}
                handleEditContract={handleEditContract}
                setFormUpdateOnly={setFormUpdateOnly}
                contract={contract}
              />
            </div>

            <div
              style={{
                display: tabSelect === "serviceRedemption" ? "block" : "none",
              }}
            >
              {/* Tab Edit Service Redemption */}
              <ServicesRedemption setTabSelect={handleTabSelect} />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Div1;
