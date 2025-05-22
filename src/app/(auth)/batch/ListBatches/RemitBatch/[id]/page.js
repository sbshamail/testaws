"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/app/Components/containers/PageContainer";
import { GlobalContext } from "@/app/Provider";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

import { unixTimestampToDate } from "@/app/functions";

import { GiSpanner } from "react-icons/gi";

import Input from "@/app/Components/Inputs/Input";
import Table from "@/components/cui/table";
import { IoMdArrowBack } from "react-icons/io";
import TableAction from "../component/TableAction";
import {
  RenderActivity,
  TitleRenderActivity,
} from "../component/ActivitySelect";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { Toastify } from "@/utils/helpers";
import { fetchPostObj } from "@/utils/action/function";
import { useSelection } from "@/reduxStore/function";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { useDispatch } from "react-redux";

function Page({ params }) {
  // const params = useParams();
  const router = useRouter();
  const { GLOBAL_RESPONSE, auth, Token } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);

  const [currentItems, setCurrentItems] = useState(null);
  const [data, setData] = useState(null);

  const [totalAmount, setTotalAmount] = useState(null);

  const [remitAmount, setRemitAmount] = useState(0);

  const [cutoffDate, setCutoffDate] = useState("");
  const [checkNo, setCheckNo] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [isSaveRemitBatch, setIsSaveRemitBatch] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activityRows, setActivityRows] = useState([]);

  const selection = useSelection("listbatch");
  const dispatch = useDispatch();
  const reducer = setReducer("listbatch");
  const { state } = selection || {};

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  console.log(activityRows.length, selectedRows.length);
  useEffect(() => {
    if (selectedRows.length > 0 && activityRows.length > 0) {
      // Decide which one takes priority
      if (activityRows.length >= selectedRows.length) {
        setSelectedRows([]);
        Toastify("error", "Cannot select both. Keeping Activity Rows.");
      }
    }
  }, [selectedRows]);
  useEffect(() => {
    if (selectedRows.length > 0 && activityRows.length > 0) {
      // Decide which one takes priority
      if (activityRows.length >= selectedRows.length) {
        setActivityRows([]);
        Toastify("error", "Cannot select both. Keeping Selected Rows.");
      }
    }
  }, [activityRows]);

  const getMonthOptions = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let months = [];
    if (currentMonth === 0) {
      // Handle the case where the current month is January (index 0)
      months = [
        { label: monthNames[11], value: "12", year: currentYear - 1 }, // December
        { label: monthNames[0], value: "01", year: currentYear }, // January
      ];
    } else {
      // Show the current month and the previous month
      const previousMonth = (currentMonth - 1 + 12) % 12;
      const previousMonthYear =
        currentMonth === 0 ? currentYear - 1 : currentYear;
      months = [
        {
          label: monthNames[previousMonth],
          value: (previousMonth + 1).toString().padStart(2, "0"),
          year: previousMonthYear,
        },
        {
          label: monthNames[currentMonth],
          value: (currentMonth + 1).toString().padStart(2, "0"),
          year: currentYear,
        },
      ];
    }
    return months;
  };

  // Update formatted date when month and year are selected
  useEffect(() => {
    // Preselect current month and year when the component mounts
    setSelectedMonth((currentMonth + 1).toString().padStart(2, "0"));
    setSelectedYear(currentYear.toString());
  }, []);

  // Update formatted date when month and year are selected
  useEffect(() => {
    if (selectedMonth && selectedYear) {
      setFormattedDate(`${selectedMonth}-${selectedYear}`);
    }
  }, [selectedMonth, selectedYear]);

  const monthOptions = getMonthOptions();

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const decodedId = decodeURIComponent(params.id);

  // Split the decoded ID string at '=' and get the last part
  const idValue = decodedId.split("=").pop();

  const fetchListBatch = async () => {
    const res = await fetchPostObj({
      auth,
      Token,
      data: state,
      api: "batch/listbatches",
      setLoading,
      dispatch: dispatch,
    });
    dispatch(reducer({ ...res, state }));
  };

  const fetchListOfContractsUnderBatch = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("BatchID", idValue);
    activityRows.forEach((id) => {
      formdata.append("BatchedContractsIDs[]", id);
    });

    setLoading(true);

    fetch("https://mypcp.us/webservices/batch/remitbatch", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success === 1) {
          setCurrentItems(res?.BatchedContractsArray);
          setData(res);

          // Calculate total ContractRemitAmount
          const totalContractRemitAmount = res?.BatchedContractsArray?.reduce(
            (acc, contract) =>
              acc + parseFloat(contract.ContractRemitAmount || 0),
            0
          );
          setTotalAmount(totalContractRemitAmount);
        } else {
          Toastify("error", "Error Found");
        }
      })
      .catch((error) => {
        console.log({ error });
        Toastify("error", "An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSaveRemitBatchChanges = () => {
    if (!checkNo) {
      Toastify("error", "Check no Required");
      return;
    }
    if (activityRows <= 0) {
      Toastify("error", "Please Select at least one Batch ");
      return;
    }

    setIsSaveRemitBatch(true); // Start showing the loader

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("BatchID", idValue);
    formdata.append("RemitAmountCheckNo", checkNo);
    formdata.append("RemitAmount", remitAmount);
    formdata.append("RemitAmountReceivingDate", formattedDate);

    activityRows.forEach((row) => {
      formdata.append("BatchedContractsIDs[]", row.BatchContractid);
    });
    // activityRows.forEach((id) => {
    //   formdata.append("DeleteUnselected[]", id);
    // });

    // Fetch the API
    fetch("https://mypcp.us/webservices/batch/saveremitbatchchanges", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success === 1) {
          Toastify("success", res.message);
          setActivityRows([]);
          fetchListBatch();
          router.back();
        } else {
          Toastify("error", res?.message ?? "Unexpected Error");
        }
      })
      .catch((error) => {
        console.log({ error });
        Toastify("error", "An error occurred while fetching data.");
      })
      .finally(() => {
        setIsSaveRemitBatch(false); // Stop showing the loader after the request completes
        setLoading(false); // Ensure loading state is reset
      });
  };

  useEffect(() => {
    if (GLOBAL_RESPONSE) {
      fetchListOfContractsUnderBatch();
    }
  }, [GLOBAL_RESPONSE, totalAmount]);

  const handleInputChange = (name, value) => {
    if (name === "cutoffDate") setCutoffDate(value);
    if (name === "checkNo") setCheckNo(value);
    if (name === "remitAmount") setRemitAmount(value);
  };
  const BackToPage = () => {
    router.back();
  };
  const RenderContractNo = ({ row }) => (
    <div className="flex gap-2">
      {row?.ContractNo}{" "}
      {parseInt(row?.TotalUsedServices) > 0 ? <GiSpanner /> : ""}
    </div>
  );
  const RenderCustomerName = ({ row }) => (
    <span>
      {row?.CustomerFName} {row?.CustomerLName}
    </span>
  );
  const RenderSaleDate = ({ row }) => unixTimestampToDate(row?.SaleDate);
  const RenderContractStatus = ({ cell }) => (
    <div>
      {cell === "P" || cell === "p"
        ? "Pending"
        : cell === "R" || cell === "r"
        ? "Received"
        : ""}
    </div>
  );

  useEffect(() => {
    const total =
      activityRows?.reduce(
        (accum, item) => accum + (Number(item.ContractRemitAmount) || 0),
        0
      ) || 0;
    setRemitAmount(total);
  }, [activityRows]);

  const activitySelectAll = () => {
    setActivityRows((prev) => (prev.length > 0 ? [] : currentItems));
  };

  const activitySelect = (row) => {
    setActivityRows((prev) => {
      const isSelected = prev.some(
        (item) => item.BatchContractid === row.BatchContractid
      );
      return isSelected
        ? prev.filter((item) => item.BatchContractid !== row.BatchContractid)
        : [...prev, row];
    });
  };

  const columns = [
    { title: "#", render: ({ index }) => index + 1 },
    { title: "Contract No", render: RenderContractNo },
    { title: "Customer Name", render: RenderCustomerName },
    { title: "Plan", accessor: "PlanDescription" },
    { title: "Selling Rep Name", accessor: "FIManagerName" },
    { title: "VIN", accessor: "VIN" },
    { title: "Sale Date", render: RenderSaleDate },
    { title: "Make", accessor: "Make" },
    {
      title: "Contract Status",
      accessor: "ContractStatus",
      render: RenderContractStatus,
    },
    { title: "Amount", accessor: "ContractRemitAmount", type: "currency" },
    {
      title: (
        <TitleRenderActivity
          activitySelectAll={activitySelectAll}
          activityRows={activityRows}
          currentItems={currentItems}
        />
      ),
      render: ({ row }) => (
        <RenderActivity
          activitySelect={activitySelect}
          activityRows={activityRows}
          row={row}
        />
      ),
    },
  ];

  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />
      <div className="w-full flex flex-col mt-5 gap-4">
        <div className="w-full flex items-center py-4 gap-2">
          <IoMdArrowBack
            onClick={BackToPage}
            className="hover:text-primary/70  text-2xl cursor-pointer Transition"
          />
          <h1 className="font-bold text-xl">
            LIST OF CONTRACTS UNDER BATCH (REMIT)
          </h1>
        </div>
        <ShadowContainer>
          <div className="w-full flex justify-between">
            <div className="flex gap-3 items-center">
              <div className="text-lg font-extrabold">
                {data?.GetDealerDetails?.DealerTitle}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-lg font-semibold">Batch No:</div>
              <div className="text-lg font-extrabold uppercase">
                {data?.GetBatchStatus?.BatchNo}
              </div>
            </div>
          </div>
        </ShadowContainer>
        <Table
          wrapperClassName="w-full"
          data={currentItems}
          columns={columns}
          headerAction={() => (
            <TableAction
              selectedRows={selectedRows}
              idValue={idValue}
              fetchListOfContractsUnderBatch={fetchListOfContractsUnderBatch}
              fetchListBatch={fetchListBatch}
            />
          )}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          rowId={"BatchContractid"}
        />

        <ShadowContainer>
          <div className="w-full flex flex-col">
            <div>
              <div className="flex gap-3 items-center">
                <div className="text-lg font-semibold">Total Amount:</div>
                <div className="text-lg font-extrabold">
                  $
                  {totalAmount?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center gap-4">
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="min-w-32 flex-1 border-transparent focus:outline-none px-2 rounded-lg p-2 text-sm bg-secondary "
              >
                <option value="">Select Month</option>
                {monthOptions.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>

              {/* Year Dropdown */}

              <select
                value={selectedYear}
                className="min-w-32 flex-1 border-transparent focus:outline-none px-2 rounded-lg p-2 text-sm bg-secondary"
                disabled // Disable as the year is set automatically
              >
                <option value={selectedYear}>{selectedYear}</option>
              </select>

              <div className="min-w-44 flex-1 flex gap-3 items-center">
                <label>Check No </label>
                <Input
                  type="text"
                  placeholder="Check No "
                  value={checkNo} // Controlled input
                  setvalue={(value) => handleInputChange("checkNo", value)} // Handle input changes
                  bgcolor={"gray-100"}
                />
              </div>
              <div className="min-w-44 flex-1 flex gap-3 items-center">
                <label>Remit Amount</label>
                <Input
                  type="text"
                  placeholder="Enter Remit Amount :"
                  value={remitAmount} // Controlled input
                  setvalue={(value) => handleInputChange("remitAmount", value)} // Handle input changes
                  required
                  defaultValue1={remitAmount}
                />
              </div>
              <div>
                <DancingLoadingButton
                  onClick={handleSaveRemitBatchChanges}
                  loading={isSaveRemitBatch}
                >
                  Submit
                </DancingLoadingButton>
              </div>
            </div>
          </div>
        </ShadowContainer>
      </div>
    </PageContainer>
  );
}

export default Page;
