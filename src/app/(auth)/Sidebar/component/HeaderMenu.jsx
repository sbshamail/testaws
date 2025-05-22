"use client";
import React, { useContext, useState } from "react";
import Select from "@/app/Components/Inputs/Select";

import Link from "next/link";
import Image from "next/image";
import CoverageModal from "../CoverageModal";
import { GlobalContext } from "@/app/Provider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AdminLayoutContext } from "../../layout";
import SearchInput from "@/app/Components/Inputs/SearchInput";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { Toastify } from "@/utils/helpers";
import SelectDropdown from "@/components/cui/select/SelectDropdown";
import { SimpleFilterableSelect } from "@/components/cui/select/SimpleFilterableSelect";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";

const searchbyOptions = [
  {
    text: "Search by - CONTRACT#",
    value: "ContractNo",
  },
  {
    text: "Search by - VIN#",
    value: "VIN",
  },
  {
    text: "Search by - Customer Name",
    value: "CustomerName",
  },
  {
    text: "Search by - EMAIL ADDRESS",
    value: "PrimaryEmail",
  },
  {
    text: "Search by - CUSTOMER PHONE",
    value: "PhoneHome",
  },
  {
    text: "Search by - RO #",
    value: "RO",
  },
  {
    text: "Search by Loyalty Cash - VIN#",
    value: "LOYALTYVIN",
  },
];
const HeaderMenu = ({ loading, setloading, close }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { GLOBAL_RESPONSE, GLOBAL_DEALERS_INFO } = useContext(GlobalContext);
  let dealerOptions =
    GLOBAL_DEALERS_INFO?.map((dealer) => ({
      text: dealer.DealerTitle,
      value: dealer.DealerID,
    })) || [];

  dealerOptions = [{ text: "ALL DEALERSHIP", value: "-1" }, ...dealerOptions];
  const router = useRouter();
  const {
    admindealer,
    setadmindealer,
    adminsearchby,
    setadminsearchby,
    adminsearch,
    setadminsearch,
    setadmincontracts,
  } = useContext(AdminLayoutContext);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchContracts = () => {
    setloading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", admindealer);
    formdata.append("search_by", adminsearchby);
    formdata.append("top_search_field", adminsearch);
    formdata.append("offset", 0);

    fetch("https://mypcp.us/webservices/contracts/contractsearching", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        // console.log("111111111111111", res);
        return res;
      })
      .then((res) => {
        setloading(false);
        if (res.TotalRec !== "0") {
          Toastify("success", "Contracts Found");
          setadmincontracts(res);
          router.push("/contracts/index");
          if (close) {
            close();
          }
        } else {
          Toastify("error", "Contracts Not Found");
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't get Contracts err3");
        console.log(error);
      });
  };

  return (
    <>
      <SpinnerCenterScreen loading={loading} />
      <div className="flex items-center gap-2 w-full ">
        <div className="flex-1">
          <SimpleFilterableSelect
            value={admindealer}
            setvalue={setadmindealer}
            options={dealerOptions}
            placeholder="Select Account"
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <SimpleFilterableSelect
            value={adminsearchby}
            setvalue={setadminsearchby}
            options={searchbyOptions}
            placeholder="Select Search by"
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <SearchInput
            value={adminsearch}
            setvalue={setadminsearch}
            placeholder="Type ...  "
            className={"w-full p-[10px]"}
            fetchContracts={fetchContracts}
          />
        </div>
        <div className="pl-4 ml-auto whitespace-nowrap">
          <div className="flex w-full select-none">
            <div className="flex items-center justify-center">
              <div className="cursor-pointer w-max" onClick={openModal}>
                <Image
                  src="/images/coverages.png"
                  width={40}
                  height={40}
                  alt="carfax icon"
                  className="mr-[3px]"
                />
              </div>
              {isModalOpen && (
                <CoverageModal open={isModalOpen} close={closeModal} />
              )}
            </div>
            <Link href="/contracts/create" shallow>
              <div className="w-max cursor-pointer flex bg-siteOrange  p-2 px-4 lg:px-5 items-center rounded-xl text-sm font-bold tracking-wide text-white hover:opacity-80 transition-opacity duration-200">
                + Add Contract
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* <div>
        <DancingLoadingButton
          loading={loading}
          onClick={fetchContracts}
          className={"w-full whitespace-nowrap p-2 px-3"}
        >
          Search Contract
        </DancingLoadingButton>
      </div> */}

      {/* Add New Contract */}
    </>
  );
};

export default HeaderMenu;
