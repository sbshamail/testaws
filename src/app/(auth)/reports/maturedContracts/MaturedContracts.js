import React, { useState, useEffect, useContext } from "react";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { loadMoreButton, tableDataNotFound } from "../functions";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { unixTimestampToDate } from "@/app/functions";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { generateExcel } from "./functions";
import { currencyFormatter, formatDate } from "@/utils/helpers";
import Checkbox from "@/components/cui/textField/Checkbox";
import { fetchPostObj } from "@/utils/action/function";
import { useControllerFetch } from "@/utils/action/useControllerFetch";
import { showSpinner } from "@/components/cui/loader/SpinnerPortal";
import { useTheme } from "@/utils/theme/themeProvider";
import Input from "@/app/Components/Inputs/Input";

function MaturedContracts({
  loading,
  responseState,
  formdataObject,
  setPrintContract,
  fetchReports,
  expirationType,
}) {
  const { GLOBAL_RESPONSE, auth, Token } = useContext(GlobalContext);

  const [allContractsSelected, setAllContractsSelected] = useState(false);
  const [customerSummary, setCustomerSummary] = useState([]);
  const { toggleMode, theme } = useTheme();

  useEffect(() => {
    setCustomerSummary(responseState?.CustomerSummay);
  }, [formdataObject]);
  const formatToMMDDYYYY = (date) => {
    try {
      const normalizedDate = new Date(date); // Attempt to parse the date
      if (isNaN(normalizedDate)) throw new Error("Invalid Date");

      // Extract date parts
      const month = String(normalizedDate.getMonth() + 1).padStart(2, "0");
      const day = String(normalizedDate.getDate()).padStart(2, "0");
      const year = normalizedDate.getFullYear();

      // Combine with custom separator
      return `${month}-${day}-${year}`;
    } catch (error) {
      console.error("Error formatting date:", error.message, "Input:", date);
      return "";
    }
  };

  const [redem, setRedem] = useState([]);

  const [all, setAll] = useState("0");
  const [checkNo, setCheckNo] = useState("1");

  const [loadingReport, setLoadingReport] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);

  const handleCheckboxChange = (cell, value) => {
    setRedem({ ...redem, [cell]: value });
  };
  const handleSelectAllService = (value) => {
    setRedem((prevRedem) => {
      const updatedRedem = {};
      responseState?.CustomerSummay.forEach((item) => {
        updatedRedem[item.ContractID] = value;
      });
      return updatedRedem;
    });
  };

  const handlePaidOutDate = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;

    // Ensure required variables are defined
    if (!Token || !pcp_user_id || !user_cizacl_role_id || !user_id) {
      toast.error("Missing required authentication information.");
      return;
    }

    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();

    formdata.append("role_id", formdataObject?.role_id);
    formdata.append("user_id", formdataObject?.user_id);
    formdata.append("pcp_user_id", formdataObject?.pcp_user_id);
    formdata.append("DealerID", formdataObject?.DealerID);
    formdata.append("FromDate", formdataObject?.FromDate);
    formdata.append("ToDate", formdataObject?.ToDate);
    formdata.append("FixedDateParameter", formdataObject?.FixedDateParameter);
    formdata.append("offset", formdataObject?.offset);
    formdata.append("ReportDropDown", formdataObject?.ReportDropDown);
    formdata.append("TerritoryCode", formdataObject?.TerritoryCode);
    formdata.append("MoneyTakenoutDate", formatDate(new Date()));
    formdata.append("TotalContracts", Object.keys(redem)?.length);
    formdata.append("AllContractCheckNo", all);
    formdata.append("TakenoutCheckNo", checkNo ? checkNo : "");

    Object.keys(redem).forEach((coupanId) => {
      if (redem[coupanId] === true) {
        formdata.append(`redem[${coupanId}]`, coupanId);
      } else if (redem[coupanId] === false) {
        formdata.append(`uncheckredem[${coupanId}]`, coupanId);
      }
    });

    // API call
    fetch("https://mypcp.us/webservices/reports/takenout", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        fetchReports({});
        // if (res.success === "1") {
        //   toast.success("Data submitted successfully!");
        // } else {
        //   toast.error(res?.message);
        // }
      })
      .catch((error) => {
        console.error("API Error:", error);
        toast.error("Can't get Dealer Setting err3");
      });
  };
  const handlePaidOutAll = () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;

    if (!Token || !pcp_user_id || !user_cizacl_role_id || !user_id) {
      toast.error("Missing required authentication information.");
      return;
    }

    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();

    formdata.append("role_id", formdataObject?.role_id);
    formdata.append("user_id", formdataObject?.user_id);
    formdata.append("pcp_user_id", formdataObject?.pcp_user_id);
    formdata.append("DealerID", formdataObject?.DealerID);
    formdata.append("FromDate", formdataObject?.FromDate);
    formdata.append("ToDate", formdataObject?.ToDate);
    formdata.append("FixedDateParameter", formdataObject?.FixedDateParameter);
    formdata.append("offset", formdataObject?.offset);
    formdata.append("ReportDropDown", formdataObject?.ReportDropDown);
    formdata.append("TerritoryCode", formdataObject?.TerritoryCode);
    formdata.append("MoneyTakenoutDate", formdataObject?.expDate);
    formdata.append("TakenoutCheckNo", checkNo || "");
    formdata.append("TotalContracts", Object.keys(redem)?.length);

    (responseState?.CustomerSummay ?? []).forEach((contract) => {
      formdata.append(`redem[${contract?.ContractID}]`, contract?.ContractID);
    });

    fetch("https://mypcp.us/webservices/reports/takenout", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        fetchReports({});
        if (res.success === "1") {
          console.log("Response", res);
          toast.success("Data submitted successfully!");
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        toast.error("Can't get Dealer Setting err3");
      });
  };

  const handleCheckboxChange1 = (event) => {
    const isChecked = event.target.checked;
    setAllContractsSelected(isChecked);

    if (isChecked) {
      Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to apply this Check No. to all ${responseState?.CustomerSummay.length} contracts?.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton:
            "bg-siteBlue text-white px-4 py-2 rounded-md focus:outline-none",
          cancelButton:
            "bg-gray-300 text-black px-4 py-2 rounded-md focus:outline-none",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handlePaidOutAll();
        } else {
          setAllContractsSelected(false);
        }
      });
    }
  };

  const handlePdf = () => {
    setLoadingReport(true);

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;

    if (!Token || !pcp_user_id || !user_cizacl_role_id || !user_id) {
      toast.error("Missing required authentication information.");
      return;
    }

    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();

    formdata.append("role_id", formdataObject?.role_id);
    formdata.append("user_id", formdataObject?.user_id);
    formdata.append("pcp_user_id", formdataObject?.pcp_user_id);
    formdata.append("DealerID", formdataObject?.DealerID);
    formdata.append("FromDate", formdataObject?.FromDate);
    formdata.append("ToDate", formdataObject?.ToDate);
    formdata.append("FixedDateParameter", formdataObject?.FixedDateParameter);
    formdata.append("offset", 0);
    formdata.append("ReportDropDown", formdataObject?.ReportDropDown);
    formdata.append("TerritoryCode", formdataObject?.TerritoryCode);
    formdata.append("ExpirationType", expirationType);

    fetch("https://mypcp.us/webservices/createpdf/index", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success == 1) {
          setLoadingReport(false);
          if (res?.url) {
            // Open the URL in a new tab
            window.open(res.url, "_blank");
          }
        } else {
          toast.error("Failed to generate the PDF.");
          setLoadingReport(false);
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoadingReport(false);

        toast.error(error?.message);
      });
  };
  const { handleAbort, createController } = useControllerFetch(30000);
  const handleExcel = async () => {
    const controller = createController();
    showSpinner(
      true,
      <div className="flex items-center gap-2">
        <span>Loading... this may take a moment.</span>
        <span
          className="text-red-500 underline cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent click bubbling
            handleAbort("Fetch Aborted by User");
          }}
        >
          Abort
        </span>
      </div>
    );

    const {
      TerritoryCode,
      DealerID,
      FromDate,
      ToDate,
      FixedDateParameter,
      offset,
      ReportDropDown,
    } = formdataObject || {};
    const data = {
      TerritoryCode: TerritoryCode ? TerritoryCode : -1,
      FromDate,
      ToDate,
      FixedDateParameter,
      ExpirationType: expirationType,
      offset,
      ReportDropDown,
      DealerID,
    };

    const res = await fetchPostObj({
      auth,
      Token,
      api: "importexcel/exportexcel",
      setLoading: setLoadingExport,
      controller: controller,
      data,
    });
    showSpinner(false);

    if (res?.CustomerSummay) {
      // Map API response to match required fields
      const data = res.CustomerSummay.map((item, index) => ({
        index: index + 1,
        dateMatured: item.ExpirayDate,
        saleDate: item.SaleDate,
        expiration: item.ExpirayDate,
        contractNumber: item.ContractNo,
        giftedCoi: item.GiftedContractNo,
        customer: item.CustomerName,
        VIN: item.VIN,
        planName: item.PlanDescription,
        ContractTotalCost: item.ContractTotalCost,

        SellingPrice: item.SellingPrice,
        used_coupon_amount: item.usedcoupon_amount,
        unusedcoupon_amount: item.unusedcoupon_amount,
        reserve: item.Contract_Reserve,
        forfeit: item.Forfeited,
        services: item.totalcoupon,
        MoneyTakenoutDate: item.MoneyTakenoutDate,
        expiryReason: item.ExpiryReason,
        status: item.StatusContract,
        GiftedUsedServiceAmount: item.GiftedUsedServiceAmount,
        GiftedUnusedServicesAmount: item.GiftedUnusedServicesAmount,
        Check: item.TakenoutCheckNo,
      }));
      generateExcel(data, responseState);
    } else {
      toast.error(
        "Response Data is larger than 1500 rows, Please Generate Pdf"
      );
    }
  };

  const THead = () => (
    <thead className={``}>
      <tr>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Sr.#
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Contract No.
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Customer Name
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-left">
          Email
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Balance
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Reason
        </th>
        <th className="border border-card-foreground/10 px-4 py-2 text-right">
          Sale Date
        </th>
        <th className="border border-card-foreground/10 bg-yellow-100 text-black px-4 py-2 text-right">
          Validity Date
        </th>
        <th
          className={`border  px-4 py-2 text-right  bg-yellow-100 text-black "
          `}
        >
          Money taken out Date
        </th>
        <th
          className={`border  px-4 py-2 text-right bg-yellow-100 text-black `}
        >
          Money taken out
          <Checkbox
            checked={
              responseState?.CustomerSummay?.length ===
              Object.values(redem).filter((item) => item === true).length
            }
            onChange={handleSelectAllService}
          />
        </th>
      </tr>
    </thead>
  );

  return (
    <div className="flex flex-col w-full mt-5">
      {customerSummary?.length > 0 ? (
        <>
          <div className="flex w-full mt-5">
            <ShadowContainer>
              <div className=" mx-auto  py-6">
                <div className=" mx-auto  py-6">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="p-4 w-full">
                      <h3 className="font-bold text-lg mb-2">Note:</h3>
                      <p className="text-sm">
                        The amount taken out and remaining is based on the
                        selections made by the accounting department at the
                        dealership. It is going to be as accurate as the
                        selections made. Please export the excel for batch entry
                        for record keeping.
                      </p>
                    </div>

                    <div className="md:flex-1 h-40 w-full flex items-center justify-center">
                      <div className=" bg-gray-300 w-px h-full"></div>
                    </div>

                    <div className="p-4 w-full md:w-4/4 flex flex-col items-center justify-center ">
                      <div className="w-full grid grid-cols-3 gap-2 text-center">
                        <div className="col-span-2 text-left flex flex-col justify-between">
                          <p>Amount for expired service (un-used)</p>
                          <p>Amount Paid out on report</p>
                          <p>Expired services amount to be taken in</p>
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                          <div className="bg-siteBlue text-white p-2 px-2 rounded-2xl text-sm font-extrabold">
                            Total :{" "}
                            {Number(
                              responseState?.res?.ContractMaturedBalance
                                ?.totalCost
                            ).toLocaleString()}
                          </div>
                          <div className="bg-[#66CC00] text-white p-2 px-2 rounded-2xl text-sm font-extrabold">
                            Taken In :{" "}
                            {Number(
                              responseState?.res?.ContractMaturedBalance
                                ?.takenin
                            ).toLocaleString()}
                          </div>
                          <div className="bg-siteOrange text-white p-2 px-2 rounded-2xl text-sm font-extrabold">
                            Remaining :{" "}
                            {(
                              Number(
                                responseState?.res?.ContractMaturedBalance
                                  ?.totalCost || 0
                              ) -
                              Number(
                                responseState?.res?.ContractMaturedBalance
                                  ?.takenin || 0
                              )
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-card-foreground/10 mt-4 pt-4 flex justify-around">
                    <p>
                      <strong>Total Contract :</strong>{" "}
                      {Number(
                        responseState?.res?.ContractMaturedBalance
                          ?.total_contract
                      ).toLocaleString()}
                    </p>
                    <p>
                      <strong>Total Amount :</strong>
                      {currencyFormatter(
                        Number(
                          responseState?.res?.ContractMaturedBalance
                            ?.totalCost ?? 0
                        )
                      )}
                      .00
                    </p>
                    <p>
                      <strong>Total Retained :</strong>{" "}
                      {currencyFormatter(
                        Number(
                          responseState?.res?.ContractRetainedBalance
                            ?.Retained ?? 0
                        )
                      )}
                      .00
                    </p>
                  </div>
                </div>
              </div>
            </ShadowContainer>
          </div>

          <div className="flex flex-col w-full mt-6 gap-4">
            <ShadowContainer>
              <div className=" mx-auto px-4 py-8">
                <div className="overflow-x-auto tableContainer">
                  <table className="bg-card table-auto w-full border-collapse border border-card-foreground/10 text-sm">
                    {THead()}
                    <tbody>
                      {customerSummary?.map((dealer, index) => (
                        <tr key={index}>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {index + 1}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {dealer?.GiftedContractNo ? (
                              <div className="flex flex-col items-center justify-center gap-1">
                                <span>{dealer?.GiftedContractNo}</span>
                                <span className="bg-green-500 p-1 rounded text-xs">
                                  {dealer?.ContractNo}
                                </span>
                              </div>
                            ) : (
                              dealer?.ContractNo
                            )}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2">
                            {dealer?.CustomerFName} {dealer?.CustomerLName}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {dealer?.PrimaryEmail}
                          </td>

                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            ${dealer?.ContractTotalCost}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {dealer?.ExpiryReason}
                          </td>
                          <td className="border border-card-foreground/10 px-4 py-2 text-right">
                            {unixTimestampToDate(dealer?.SaleDate)}
                          </td>
                          <td
                            className={`border  px-4 py-2 text-right bg-yellow-100 text-black`}
                          >
                            {unixTimestampToDate(dealer?.ValidityDate)}
                          </td>
                          <td
                            className={`border  px-4 py-2 text-right bg-yellow-100 text-black`}
                          >
                            {" "}
                            {dealer?.MoneyTakenoutDate
                              ? formatToMMDDYYYY(dealer?.MoneyTakenoutDate)
                              : "-"}
                          </td>
                          <td
                            className={`border  px-4 py-2 text-right bg-yellow-100 text-black`}
                          >
                            {" "}
                            {/* {unixTimestampToDate(dealer)} */}
                            {/* {dealer?.ContractID} */}
                            <Checkbox
                              checked={
                                redem[dealer.ContractID] ??
                                dealer?.isMoneytakenout === "1"
                              }
                              onChange={(value) =>
                                handleCheckboxChange(dealer.ContractID, value)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                      {/* {customerSummary?.length <= */}
                      {/* // responseState?.res?.TotalRec && ( */}

                      {/* )} */}
                    </tbody>
                  </table>
                  {responseState?.res?.ContractMaturedBalance?.total_contract >
                    responseState?.CustomerSummay?.length &&
                    loadMoreButton(responseState, fetchReports, loading)}
                  <div
                    className={`bg-background/80 rounded-lg flex justify-center items-center my-3 py-3 gap-2`}
                  >
                    <div>Please Enter Check No:</div>
                    <Input
                      // defaultValue={startDate}
                      type="text"
                      onChange={(event) => setCheckNo(event.target.value)}
                      placeholder="Check No"
                      width={"80"}
                    />
                  </div>
                  <div
                    className={`bg-background/80 rounded-lg flex justify-center items-center my-3 py-3 gap-2`}
                  >
                    <BsFillQuestionSquareFill className="h-7 w-7" />
                    <div>Apply This Check No. To All: </div>

                    <input
                      type="checkbox"
                      onChange={handleCheckboxChange1}
                      checked={allContractsSelected}
                      placeholder="Check No"
                      className="cursor-pointer h-5 w-5 border-transparent focus:outline-none px-4 rounded-md bg-white text-sm"
                    />
                  </div>
                </div>
              </div>
              {/* i do not need below these buttons in new page  */}
              <div className="w-full flex justify-end gap-3">
                <DancingLoadingButton
                  variant="main"
                  loading={loadingReport}
                  onClick={!loadingReport ? handlePdf : undefined}
                >
                  Generate PDF
                </DancingLoadingButton>

                <div
                  className="flex gap-4 bg-siteOrange py-[10px] px-10 items-center rounded-xl text-[15px] font-bold tracking-wider text-white cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  onClick={() => setPrintContract(true)}
                >
                  Print Report
                </div>

                <DancingLoadingButton
                  onClick={!loadingExport ? handleExcel : undefined}
                  variant="main"
                  loading={loadingExport}
                >
                  Export Report
                </DancingLoadingButton>

                <div
                  onClick={handlePaidOutDate}
                  className="flex gap-4 bg-siteOrange py-[10px] px-10 items-center rounded-xl text-[15px] font-bold tracking-wider text-white cursor-pointer hover:opacity-80 transition-opacity duration-200"
                >
                  Save Selection
                </div>
              </div>
            </ShadowContainer>
          </div>
        </>
      ) : (
        !loading && tableDataNotFound(THead)
      )}
    </div>
  );
}

export default MaturedContracts;
