"use client";
import React, { useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

import { DashboardContext } from "../../DashboardContext";
import { GlobalContext } from "@/app/Provider";
import { BiRefresh } from "react-icons/bi";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import Input from "@/app/Components/Inputs/Input";
import { urls } from "../../function";
import { formatDate, Toastify } from "@/utils/helpers";
const Div2 = () => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    dealersetting,
    startdate,
    enddate,
    FixedDateParameter,
    resetAll,
    dealer,
  } = useContext(DashboardContext);
  const [duplicateContracts, setduplicateContracts] = useState([]);
  const [unpaidContracts, setunpaidContracts] = useState([]);
  const [days, setdays] = useState(15);
  const [loading, setloading] = useState(false);
  const [loading2, setloading2] = useState(false);

  const fetchDuplicateContracts = useCallback(() => {
    setloading(true);
    setduplicateContracts([]);

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealersetting?.dealer?.DealerID);
    formdata.append("FromDate", formatDate(startdate));
    formdata.append("ToDate", formatDate(enddate));
    formdata.append("FixedDateParameter", FixedDateParameter);

    fetch(urls.duplicatecontract, {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setloading(false);
        if (res.success == "1") {
          setduplicateContracts(res.dup_contracts);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setloading(false);

        console.log(error);
      });
  }, [GLOBAL_RESPONSE, dealersetting?.dealer?.DealerID]);
  const fetchUnpaidContracts = useCallback(() => {
    setloading2(true);
    setunpaidContracts([]);

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealersetting?.dealer?.DealerID);
    formdata.append("FromDate", formatDate(startdate));
    formdata.append("ToDate", formatDate(enddate));
    formdata.append("FixedDateParameter", FixedDateParameter);
    formdata.append("noofDays", days);

    fetch(urls.unpaidbatchcontract, {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setloading2(false);
        if (res.success == "1") {
          setunpaidContracts(res.batch_contracts);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setloading2(false);
        toast.error("Can't get Unpaid Contracts err3");
        console.log(error);
      });
  }, [GLOBAL_RESPONSE, dealersetting?.dealer?.DealerID, days]);
  const fetchDuplicateUnpaid = () => {
    fetchDuplicateContracts();
    fetchUnpaidContracts();
  };
  useEffect(() => {
    if (dealersetting) {
      fetchDuplicateUnpaid();
    }
  }, [dealersetting]);

  useEffect(() => {
    if (dealer) {
      setduplicateContracts(null);
      setunpaidContracts(null);
    }
  }, [resetAll]);

  return (
    <div className={`flex `}>
      <div className="flex flex-row flex-wrap justify-between items-center w-full gap-5">
        {/* div 1 */}
        <div className="min-w-[450px] flex-1 h-20 flex items-center gap-5 p-4 bg-gradient-to-r from-siteBlue/50 to-blue-100 rounded-lg shadow-md">
          {loading ? (
            <SpinnerLoader />
          ) : (
            <button
              onClick={fetchDuplicateContracts}
              className="flex items-center justify-center bg-white rounded-full p-2 shadow hover:bg-gray-200"
            >
              <BiRefresh size={24} color="black" />
            </button>
          )}
          <h3 className="text-white text-lg font-semibold">
            Possible Duplicate Contracts:{" "}
            <span className="ml-2 text-xl font-bold text-siteBlue drop-shadow-lg bg-white px-2 py-1 rounded-md">
              {duplicateContracts?.toLocaleString()
                ? duplicateContracts?.toLocaleString()
                : 0}
            </span>
          </h3>
        </div>

        {/* div 2 */}
        <div className="min-w-[450px] flex-1 h-20 flex items-center gap-5 p-4 bg-gradient-to-r from-siteBlue/50 to-blue-100 rounded-lg shadow-md">
          {loading2 ? (
            <SpinnerLoader />
          ) : (
            <div
              onClick={fetchDuplicateUnpaid}
              className="flex items-center justify-center bg-white rounded-full p-2 shadow hover:bg-gray-200 cursor-pointer"
            >
              <BiRefresh size={24} color="black" />
            </div>
          )}
          <div className="border flex justify-center items-center rounded-lg bg-white shadow-inner">
            <Input
              value={days}
              setvalue={setdays}
              placeholder="days"
              type="number"
              className="text-center bg-white text-black"
            />
          </div>
          <h3 className="text-white text-lg font-semibold">
            Unpaid Contracts:{" "}
          </h3>
          <div className="ml-2 flex flex-col">
            <span className=" text-xl font-bold text-siteBlue drop-shadow-lg bg-white px-2 py-1 rounded-md">
              {unpaidContracts?.toLocaleString()
                ? unpaidContracts?.toLocaleString()
                : 0}
            </span>
            {/* <span className="underline mt-1 text-sm text-foreground/50 hover:text-foreground cursor-pointer">
              Detail
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Div2;
