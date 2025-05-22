"use client";
import React, { useContext, useState, useEffect } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";

import { GlobalContext } from "@/app/Provider";

import { SearchContractStatusList } from "@/app/fixedvalues";

import CancellationTable from "./component/CancellationTable/CancellationTable";
import Form from "./component/Form";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { formatDate, Toastify } from "@/utils/helpers";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { useSelection } from "@/reduxStore/function";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get("refresh");

  const cancellation = useSelection("cancellation");
  const reducer = setReducer("cancellation");
  let dealerOptions =
    GLOBAL_DEALERS_INFO?.map((dealer) => {
      return { text: dealer.DealerTitle, value: dealer.DealerID };
    }) || [];
  let statusList =
    SearchContractStatusList?.map((status) => {
      return { text: status.text, value: status.value };
    }) || [];

  const [dealer, setdealer] = useState();
  const [contractstatus, setcontractstatus] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [contractno, setcontractno] = useState("");
  const [vinno, setvinno] = useState("");
  const [customername, setcustomername] = useState("");
  const [list, setList] = useState([]);
  const [totalListData, setTotalListData] = useState(null);
  const [filterSearchValue, setFilterSearchValue] = useState(null);

  const [loading, setLoading] = useState(false);
  const [offSet, setOffSet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dataLimit = 20;
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 1) {
      setOffSet("0");
    } else {
      setOffSet((page - 1) * dataLimit);
    }
  };

  const fetchListOfCancellationData = (dataInput, offset = 0) => {
    if (offSet === 0) {
      setCurrentPage(1);
    }

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE || {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    setLoading(true);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("offset", offset);
    formdata.append("pcp_user_id", pcp_user_id);
    if (dataInput === "contract") {
      formdata.append("ContractNo", contractno);
    } else if (dataInput === "vin") {
      formdata.append("VIN", vinno);
    } else if (dataInput === "customer") {
      formdata.append("CustomerName", customername);
    } else {
      formdata.append("DealerID", dealer ? dealer : "");
      formdata.append("Status", contractstatus ? contractstatus : "");
      formdata.append("SaleDateFrom", formatDate(startDate));
      formdata.append("SaleDateTo", formatDate(endDate));
    }

    fetch("https://mypcp.us/webservices/contracts/cancellation", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          setList(res?.contracts);
          setTotalListData(Number(res?.TotalRec));
          dispatch(
            reducer({
              ...res,
              action: { dealer, contractstatus, customername },
            })
          );
          Toastify("success", res.message);
          setLoading(false);
        } else {
          setList([]);
          setTotalListData(null);
          dispatch(
            reducer({
              ...res,
              action: { dealer, contractstatus, customername },
            })
          );
          Toastify("error", res.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Toastify("error", "An error occurred while fetching data.");
      })
      .finally(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("refresh");
        router.replace(url.pathname); // Replace without refreshing page
        setLoading(false);
      });
  };
  useEffect(() => {
    if (cancellation?.action) {
      setdealer(cancellation?.action?.dealer);
      setcontractstatus(cancellation?.action?.contractstatus);
      setcustomername(cancellation?.action?.customername);
    }
  }, []);
  useEffect(() => {
    if (offSet) {
      fetchListOfCancellationData(filterSearchValue, offSet.toString());
    }
  }, [offSet]);
  useEffect(() => {
    if (param == "true") {
      if (dealer || contractstatus) {
        fetchListOfCancellationData(filterSearchValue);
      }
    }
  }, [param, dealer, contractstatus, filterSearchValue]);

  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />
      <div className="w-full flex flex-col  mt-5 gap-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold text-xl my-5">CONTRACT - CANCELLATION</h1>
        </div>
        <Form
          contractno={contractno}
          setcontractno={setcontractno}
          vinno={vinno}
          setvinno={setvinno}
          customername={customername}
          setcustomername={setcustomername}
          dealerOptions={dealerOptions}
          setdealer={setdealer}
          dealer={dealer}
          statusList={statusList}
          setcontractstatus={setcontractstatus}
          contractstatus={contractstatus}
          startDate={startDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          endDate={endDate}
          fetchListOfCancellationData={fetchListOfCancellationData}
          offSet={offSet}
          setFilterSearchValue={setFilterSearchValue}
        />
        <CancellationTable
          data={cancellation?.contracts}
          total={Number(cancellation?.TotalRec)}
          setLoading={setLoading}
          offSet={offSet}
          currentPage={currentPage}
          dataLimit={dataLimit}
          handlePageChange={handlePageChange}
        />
      </div>
    </PageContainer>
  );
};

export default Page;
