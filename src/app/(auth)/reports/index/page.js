"use client";
import PageContainer from "@/app/Components/containers/PageContainer";
import React, { useState, useEffect, useContext, useRef } from "react";
import { GlobalContext } from "@/app/Provider";

import toast from "react-hot-toast";
import { AdminLayoutContext } from "../../layout";
import AuthenticomLoyaltyRewards from "../serviceRedemption/AuthenticomLoyaltyRewards";
import AuthenticomPointsDuplicate from "../AuthenticomPointsDuplicate/AuthenticomPointsDuplicate";
import AuthenticomPointsServicePoints from "../AuthenticomPointsServicePoints";
import AuthenticomPointsSummary from "../AuthenticomPointsSummary";
import AuthenticomPointsSummaryDetails from "../AuthenticomPointsSummaryDetails";
import AuthenticomPointsUnassignedName from "../AuthenticomPointsUnassignedName";
import CancelledContracts from "../CancelledContracts";
import GoingMatureContracts from "../GoingMatureContracts";
import MaturedContracts from "../maturedContracts/MaturedContracts";
import MaturedContractsPrint from "../maturedContracts/MaturedContractsPrint";
import ServiceRedemption from "../serviceRedemption/ServiceRedemption";
//function

import { formatDate, objectToFormData } from "@/utils/helpers";

import Header from "../Header";
import { fetchPost, fetchPostObj } from "@/utils/action/function";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";

const Page = () => {
  const { admindealer } = useContext(AdminLayoutContext);

  const { GLOBAL_RESPONSE, auth, Token } = useContext(GlobalContext);
  const previousValues = useRef({ dealer: null, level: null });

  // Your hardcoded data
  const initialReports = [
    {
      ReportListId: "68",
      ReportName: "Authenticom Loyalty Rewards Program Summary",
      IsShow: "1",
    },
    {
      ReportListId: "62",
      ReportName: "Authenticom Points - Duplicate",
      IsShow: "1",
    },
    {
      ReportListId: "63",
      ReportName: "Authenticom Points - Service Points Assignment",
      IsShow: "1",
    },
    {
      ReportListId: "61",
      ReportName: "Authenticom Points - Summary",
      IsShow: "1",
    },
    {
      ReportListId: "66",
      ReportName: "Authenticom Points - Summary Details",
      IsShow: "1",
    },
    {
      ReportListId: "60",
      ReportName: "Authenticom Points - Unassigned Name",
      IsShow: "1",
    },
    {
      ReportListId: "5",
      ReportName: "Matured Contracts",
      IsShow: "1",
    },
    {
      ReportListId: "6",
      ReportName: "Going to Mature Contracts",
      IsShow: "1",
    },
    {
      ReportListId: "2",
      ReportName: "Service Redemptions",
      IsShow: "1",
    },
    {
      ReportListId: "7",
      ReportName: "Cancelled Contracts",
      IsShow: "1",
    },
  ];

  // Set up your state

  // When you fetch the data, filter and update the `IsShow` values
  const updateReports = (apiReports) => {
    const updatedReports = initialReports.map((report) => {
      const matchingApiReport = apiReports.find(
        (apiReport) => apiReport.ReportListId === report.ReportListId
      );
      return {
        ...report,
        IsShow: matchingApiReport ? matchingApiReport.IsShow : report.IsShow,
      };
    });

    setAllLevels(updatedReports);
  };
  // states
  const [loading, setloading] = useState(false);
  const [dealer, setdealer] = useState(admindealer);

  const [dealerValues, setDealerValues] = useState({});

  const [allLevels, setAllLevels] = useState(initialReports);

  const [level, setLevel] = useState("");
  const [expirationTypes, setExpirationTypes] = useState([]);
  const [expirationType, setExpirationType] = useState("-1");

  const [territoryCodes, setTerritoryCodes] = useState([]);
  const [territoryCode, setTerritoryCode] = useState("");
  const [authTerritoryCode, setAuthTerritoryCode] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expDate, setExpDate] = useState(new Date());
  const [FixedDateParameter, setFixedDateParameter] = useState("");
  const [dealerData, setDealerData] = useState([]);
  const [responseState, setResponseState] = useState([]);
  const [printContract, setPrintContract] = useState(false);
  const [createPdfLoading, setCreatePdfLoading] = useState(false);
  //service Redemption
  const [serviceRedemptionLoad, setServiceRedemptionLoad] = useState({
    plans: [],
    rptServiceList: [],
    paidOutStatusList: [],
  });

  const [rptService, setRptService] = useState("");
  const [subscriptionPaymentStatus, setSubscriptionPaymentStatus] =
    useState("");
  const [paidOutStatus, setPaidOutStatus] = useState("");
  const [RedemptionLoadData, setRedemptionLoadData] = useState(false);
  const [RedemptionFilter, setRedemptionFilter] = useState(false);

  const fetchReportsData = () => {
    setloading(true);

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);

    fetch("https://mypcp.us/webservices/reports/reportlist", {
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
          updateReports(res?.reports || []);
          setDealerData(res?.dealers);
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't get Dealer Setting err3");
      });
  };

  const dealerOptions = dealerData
    ? dealerData.map((dealer) => ({
        text: dealer.DealerTitle,
        value: dealer.DealerID,
        territoryCode: dealer.TerritoryCode,
      }))
    : [];

  useEffect(() => {
    if (GLOBAL_RESPONSE) {
      fetchReportsData();
    }
  }, [GLOBAL_RESPONSE]);
  const loadReportsData = () => {
    setloading(true);
    setExpirationTypes([{ key: "-1", value: "ALL" }]);
    setTerritoryCodes([]);
    setServiceRedemptionLoad({
      plans: [],
      rptServiceList: [],
      paidOutStatusList: [],
    });
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealer);
    formdata.append("ReportDropDown", level);

    fetch("https://mypcp.us/webservices/reports/loadreports", {
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
          if (res?.territorycodes) {
            const updatedTerritoryCodes = [
              { TerritoryCode: "-1", DealerTitle: "Selected Dealership Only" },
              ...res.territorycodes,
            ];
            setTerritoryCodes(updatedTerritoryCodes);
          }

          if (res?.ExpirationType) {
            const transformedArray = Object.entries(res?.ExpirationType).map(
              ([key, value]) => ({ key, value })
            );

            const updatedArray = [
              { key: "-1", value: "ALL" },
              ...transformedArray,
            ];

            setExpirationTypes(updatedArray);
          }

          // service redemption handle
          if (res?.servicefileter) {
            const transformedArray = Object.entries(res?.servicefileter).map(
              ([key, value]) => ({ value: key, text: value })
            );
            const updatedArray = [
              { text: "All", value: "-1" },
              ...transformedArray,
            ];
            setServiceRedemptionLoad((prev) => ({
              ...prev,
              rptServiceList: updatedArray,
            }));
          }
          if (res?.paidoutstatus) {
            const transformedArray = Object.entries(res?.paidoutstatus).map(
              ([key, value]) => ({ value: key.toString(), text: value })
            );
            setServiceRedemptionLoad((prev) => ({
              ...prev,
              paidOutStatusList: transformedArray,
            }));
          }
          if (res?.planlists) {
            setServiceRedemptionLoad((prev) => ({
              ...prev,
              plans: res?.planlists,
            }));
          }
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't get Dealer Setting err3");
      });
  };

  const handleSelectionChange = (key) => {
    const selectedDealer = dealerOptions.find(
      (dealer) => dealer?.value?.toString() === key?.toString()
    );
    setDealerValues(selectedDealer);

    if (selectedDealer) {
      if (selectedDealer?.text?.startsWith("TERRITORY")) {
        // console.log("selectedDealer", selectedDealer);
        setTerritoryCode(selectedDealer.territoryCode);
        setdealer(key);
      } else {
        setdealer(key);
        setTerritoryCode("");
      }
    }
  };

  const createPdf = async ({
    url = "https://mypcp.us/webservices/createpdf/index",
    offset = 0,
    values,
  }) => {
    let FromDate = startDate ? formatDate(startDate) : "";
    let ToDate = endDate ? formatDate(endDate) : "";
    const data = {
      FromDate,
      ToDate,
      FixedDateParameter,
      offset,
      DealerID: dealer,
      ReportDropDown: level,
      TerritoryCode: territoryCode,
      ...values,
    };
    const res = await fetchPostObj({
      auth,
      url,
      Token,
      showToast: true,
      data,
      setLoading: setCreatePdfLoading,
    });
    if (res?.url) {
      window.open(res.url, "_blank");
    }
  };

  const fetchReports = async ({
    dateParameter,
    date,
    offset = 0,
    url = "https://mypcp.us/webservices/reports/index",
  }) => {
    if (!dealer) {
      toast.error("Please select a dealer");
      return;
    }

    let FromDate = "";
    let ToDate = "";
    let fixedDateParameter = FixedDateParameter;
    if (dateParameter) {
      fixedDateParameter = dateParameter;
      setFixedDateParameter(dateParameter);
      setStartDate(null);
      setEndDate(null);
    } else {
      FromDate = startDate ? formatDate(startDate) : "";
      ToDate = endDate ? formatDate(endDate) : "";
    }
    if (date) {
      fixedDateParameter = "";
      setFixedDateParameter("");
      if (!FromDate && !ToDate) {
        return toast.error("Please select a date");
      }
    }
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    let commonFormData = {
      ...auth,
      DealerID: dealer,
      FromDate,
      ToDate,
      FixedDateParameter: fixedDateParameter,
      offset,
      ReportDropDown: level,
      TerritoryCode: territoryCode,
      AuthTerritoryCode: authTerritoryCode,
      ExpirationType: expirationType,
    };
    if (level === "2") {
      commonFormData.RptServiceFilter = rptService;
      commonFormData.ReportPlanID = subscriptionPaymentStatus
        ? Number(subscriptionPaymentStatus)
        : "";
      commonFormData.paidoutstatus = paidOutStatus;
      commonFormData.RedemptionLoadData = RedemptionLoadData ? "1" : "0";
      commonFormData.RedemptionFilter = RedemptionFilter ? "1" : "0";
    }
    const formdata = objectToFormData({
      ...commonFormData,
    });

    // Save data in an object if level is '5'
    const formdataObject = {
      role_id: user_cizacl_role_id,
      user_id: user_id,
      pcp_user_id: pcp_user_id,
      DealerID: dealer,
      FromDate: FromDate,
      ToDate: ToDate,
      FixedDateParameter: fixedDateParameter,

      offset: offset,
      ReportDropDown: level,
      AuthTerritoryCode: authTerritoryCode,
      TerritoryCode: territoryCode,
      ExpirationType: expirationType,
      expDate: formatDate(expDate),
    };
    const res = await fetchPost({
      url: url,
      token: Token,
      formdata,
      setLoading: setloading,
      showToast: "Can't get Dealer Setting err3",
    });

    if (res) {
      setResponseState((prevState) => {
        return {
          // ...prevState,
          CustomerSummay:
            offset === 0
              ? res?.CustomerSummay
              : [
                  ...(prevState?.CustomerSummay || []),
                  ...(res?.CustomerSummay || []),
                ],
          DealerSummary:
            offset === 0
              ? res?.DealerSummary
              : [
                  ...(prevState?.DealerSummary || []),
                  ...(res?.DealerSummary || []),
                ],

          res:
            offset === 0
              ? {
                  ...prevState.res,
                  ...res,
                }
              : {
                  ...prevState.res,
                  ...res,
                  ContractMaturedBalance: prevState.res.ContractMaturedBalance,
                },
          offset: res?.offset,
          formdataObject: formdataObject, // Add formdataObject if level === "5"
        };
      });
    } else {
      setResponseState([]);
    }
  };

  useEffect(() => {
    if (FixedDateParameter || (startDate && endDate)) {
      fetchReports({});
    }
  }, [RedemptionFilter, RedemptionLoadData]);

  useEffect(() => {
    if (dealer || level) {
      loadReportsData();
    }
  }, [dealer, level]);

  useEffect(() => {
    const { dealer: prevDealer, level: prevLevel } = previousValues.current;

    if (prevDealer !== dealer || prevLevel !== level) {
      setAuthTerritoryCode(""); // Reset only if dealer or level has changed
      setResponseState([]);
    }

    // Update previous values
    previousValues.current = { dealer, level };
  }, [dealer, level]);
  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />

      <div className="flex flex-col w-full mt-5">
        <Header
          dealerOptions={dealerOptions}
          dealer={dealer}
          handleSelectionChange={handleSelectionChange}
          allLevels={allLevels}
          setLevel={setLevel}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          FixedDateParameter={FixedDateParameter}
          setFixedDateParameter={setFixedDateParameter}
          fetchReports={fetchReports}
          level={level}
          expirationTypes={expirationTypes}
          expirationType={expirationType}
          setExpirationType={setExpirationType}
          expDate={expDate}
          setExpDate={setExpDate}
          territoryCodes={territoryCodes}
          setAuthTerritoryCode={setAuthTerritoryCode}
          // service Redemption
          serviceRedemptionLoad={serviceRedemptionLoad}
          setPaidOutStatus={setPaidOutStatus}
          paidOutStatus={paidOutStatus}
          subscriptionPaymentStatus={subscriptionPaymentStatus}
          setSubscriptionPaymentStatus={setSubscriptionPaymentStatus}
          setRptService={setRptService}
          rptService={rptService}
          RedemptionLoadData={RedemptionLoadData}
          setRedemptionLoadData={setRedemptionLoadData}
          RedemptionFilter={RedemptionFilter}
          setRedemptionFilter={setRedemptionFilter}
        />
      </div>

      <>
        {level === "68" && (
          <AuthenticomLoyaltyRewards
            loading={loading}
            responseState={responseState}
          />
        )}
        {level === "62" && (
          <AuthenticomPointsDuplicate
            loading={loading}
            responseState={responseState}
            fetchReports={fetchReports}
            createPdf={createPdf}
          />
        )}
        {level === "63" && (
          <AuthenticomPointsServicePoints
            loading={loading}
            responseState={responseState}
            formdataObject={responseState?.formdataObject}
          />
        )}
        {level === "61" && (
          <AuthenticomPointsSummary
            loading={loading}
            startDate={startDate}
            endDate={endDate}
            responseState={responseState}
            dealerValues={dealerValues}
            formdataObject={responseState?.formdataObject}
          />
        )}
        {level === "66" && (
          <AuthenticomPointsSummaryDetails
            dealerValues={dealerValues}
            loading={loading}
            responseState={responseState}
            formdataObject={responseState?.formdataObject}
          />
        )}
        {level === "60" && (
          <AuthenticomPointsUnassignedName
            loading={loading}
            responseState={responseState}
            formdataObject={responseState?.formdataObject}
          />
        )}

        {level === "5" && !printContract && (
          <MaturedContracts
            loading={loading}
            responseState={responseState}
            formdataObject={responseState?.formdataObject}
            setPrintContract={setPrintContract}
            fetchReports={fetchReports}
            expirationType={expirationType}
          />
        )}
        {level === "5" && printContract && (
          <MaturedContractsPrint
            loading={loading}
            responseState={responseState}
            formdataObject={responseState?.formdataObject}
            setPrintContract={setPrintContract}
            printContract={printContract}
          />
        )}

        {level === "6" && (
          <GoingMatureContracts
            loading={loading}
            responseState={responseState}
            dealerValues={dealerValues}
            formdataObject={responseState?.formdataObject}
            fetchReports={fetchReports}
          />
        )}

        {level === "2" && (
          <ServiceRedemption
            loading={loading}
            responseState={responseState}
            fetchReports={fetchReports}
            createPdf={createPdf}
            createPdfLoading={createPdfLoading}
            DealerID={dealer}
            FormDate={formatDate(startDate)}
            ToDate={formatDate(endDate)}
            FixedDateParameter={FixedDateParameter}
          />
        )}
        {level === "7" && (
          <CancelledContracts
            loading={loading}
            dealerValues={dealerValues}
            responseState={responseState}
            formdataObject={responseState?.formdataObject}
            fetchReports={fetchReports}
          />
        )}
      </>
    </PageContainer>
  );
};

export default Page;
