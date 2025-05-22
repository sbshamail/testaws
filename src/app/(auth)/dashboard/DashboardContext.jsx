"use client";
import React, { createContext, useState, useEffect } from "react";
//redux
import { useSelection } from "@/reduxStore/function";
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { engFormatDate, getReduxSelectorData } from "./function";

export const DashboardContext = createContext(null);
const DashboardProvider = ({ children }) => {
  const dispatch = useDispatch();
  const dashboardSelection = useSelection("dashboard") ?? {};

  const dashboardReducer = setReducer("dashboard");
  const [mount, setMount] = useState(false);
  const [searchby, setsearchby] = useState("VIN");
  const [search, setsearch] = useState("");
  const [dealersetting, setdealersetting] = useState(null);
  const [usage, setusage] = useState(null); // customer interaction for diff devices usuage
  const [reservedGraphData, setReservedGraphData] = useState(null);
  const [saleBreakdown, setSaleBreakdown] = useState(null);
  const [serviceBreakdown, setServiceBreakdown] = useState(null);
  const [dealerredemption, setdealerredemption] = useState(null);
  const [dealer, setdealer] = useState(null);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [engDate, setengDate] = useState({ start: null, end: null });
  const [FixedDateParameterDefault, setFixedDateParameterDefault] =
    useState("");
  const [contractChart, setContractChart] = useState("");
  const [drawtrendline, setDrawtrendline] = useState("");
  const [pcpBreakdown, setPcpBreakdown] = useState("");

  const [resetAll, setResetAll] = useState(false);
  const [FixedDateParameter, setFixedDateParameter] = useState("ITD");
  const [offSet, setOffSet] = useState(0);
  const [pdfCheck, setPdfCheck] = useState("");
  const [rowShow, setRowShow] = useState(null);
  const [displayDates, setDisplayDates] = useState(null);
  const [rowLoader, setRowLoader] = useState(null);
  const [pdfLoader1, setPdfLoader1] = useState(null);
  const [pdfLoader2, setPdfLoader2] = useState(null);
  const [pdfLoader3, setPdfLoader3] = useState(null);
  const [breakdownLoader, setBreakdownLoader] = useState(false);

  const getInitiateRedux = () => {
    getReduxSelectorData({
      dashboardSelection,
      setdealersetting,
      setDisplayDates,
      setengDate,
      setPcpBreakdown,

      setusage,
      setdealerredemption,
      setRowShow,
      setReservedGraphData,
      setSaleBreakdown,
      setServiceBreakdown,
    });
  };
  useEffect(() => {
    getInitiateRedux();
  }, [
    dashboardSelection.dealerSetting,
    dashboardSelection.pcpbreakdown,
    dashboardSelection.fibreakdown,
    dashboardSelection.customerinteraction,
    dashboardSelection.dealerredemption,
    dashboardSelection?.reservedgraph,
    dashboardSelection.salebreakdown,
    dashboardSelection.servicebreakdown,
  ]);

  useEffect(() => {
    const data = localStorage.getItem("dealerSettings");
    if (data) {
      const parsedData = JSON.parse(data);
      setFixedDateParameterDefault(parsedData);
      setdealer(parsedData?.dealer);
      setFixedDateParameter(parsedData?.FixedDateParameter);
      setstartdate(parsedData?.startdate);
      setenddate(parsedData?.enddate);
    }
    getInitiateRedux();
  }, []);

  useEffect(() => {
    if (FixedDateParameterDefault) {
      setFixedDateParameter(FixedDateParameterDefault?.FixedDateParameter);
    }
  }, [FixedDateParameterDefault]);

  // let list = [
  //   {
  //     name: "Contract Reserve",
  //     value:
  //       dealerredemption?.row1_show === 1
  //         ? dealerredemption?.row1?.Reserved
  //         : dealerredemption?.row3?.Reserved,
  //     amount:
  //       dealerredemption?.row1_show === 1
  //         ? dealerredemption?.row1?.ReservedAmount
  //         : dealerredemption?.row3?.ReservedAmount,
  //     color: "",
  //   },
  //   {
  //     name: "Service Redeemed",
  //     value:
  //       dealerredemption?.row1_show === 1
  //         ? dealerredemption?.row1?.serviceredeem
  //         : dealerredemption?.row3?.serviceredeem,
  //     amount:
  //       dealerredemption?.row1_show === 1
  //         ? dealerredemption?.row1?.serviceredeemamount
  //         : dealerredemption?.row3?.serviceredeemamount,
  //     color: "#0080B2",
  //   },
  //   {
  //     name: "Service Pending",
  //     value:
  //       dealerredemption?.row1_show === 1
  //         ? dealerredemption?.row1?.servicepending
  //         : dealerredemption?.row3?.servicepending,
  //     amount:
  //       dealerredemption?.row1_show === 1
  //         ? dealerredemption?.row1?.servicependingamount
  //         : dealerredemption?.row3?.servicependingamount,
  //     color: "#009FDE",
  //   },
  //   {
  //     name: "Matured Contracts",
  //     value:
  //       dealerredemption?.row1_show === 1
  //         ? dealerredemption?.row1?.maturedcontract
  //         : dealerredemption?.row3?.maturedcontract,
  //     amount:
  //       dealerredemption?.row1_show === 1
  //         ? dealerredemption?.row1?.maturedcontracttotalCost
  //         : dealerredemption?.row3?.maturedcontracttotalCost,
  //     color: "#00B7FF",
  //   },
  // ];

  useEffect(() => {
    if (resetAll === true) {
      setPcpBreakdown(null);
      setReservedGraphData(null);
      setdealerredemption(null);
      setDrawtrendline(null);
      setdealersetting(null);
      setRowLoader(null);
      setSaleBreakdown(null);
      setServiceBreakdown(null);
    }
    return () => {
      setPcpBreakdown(null);
      setReservedGraphData(null);
      setdealerredemption(null);
      setDrawtrendline(null);
      setdealersetting(null);
      setRowLoader(null);
      setSaleBreakdown(null);
      setServiceBreakdown(null);
      setResetAll(false);
    };
  }, [resetAll]);
  return (
    <DashboardContext.Provider
      value={{
        setMount,
        mount,
        searchby,
        setsearchby,
        search,
        setPcpBreakdown,
        pcpBreakdown,

        usage,
        setusage,
        setReservedGraphData,
        reservedGraphData,
        setsearch,
        engDate,
        setengDate,
        dealersetting,
        setdealersetting,
        dealer,
        setdealer,
        dealerredemption,
        setdealerredemption,
        saleBreakdown,
        serviceBreakdown,
        startdate,
        setstartdate,
        enddate,
        setenddate,
        FixedDateParameter,
        setFixedDateParameter,
        contractChart,
        setContractChart,
        setDrawtrendline,
        drawtrendline,
        setRowLoader,
        rowLoader,
        offSet,
        setOffSet,
        setPdfCheck,
        pdfCheck,
        pdfLoader1,
        setPdfLoader1,
        pdfLoader2,
        setPdfLoader2,
        pdfLoader3,
        setPdfLoader3,
        setBreakdownLoader,
        breakdownLoader,
        setResetAll,
        resetAll,
        setRowShow,
        rowShow,
        displayDates,
        setDisplayDates,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
