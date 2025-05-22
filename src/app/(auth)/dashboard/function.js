import { GlobalContext } from "@/app/Provider";
import { fetchPost } from "@/utils/action/function";
import { formatDate, objectToFormData } from "@/utils/helpers";
import { useContext, useState } from "react";
import { DashboardContext } from "./DashboardContext";

export const engFormatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(",", "");
};

export const urls = {
  // div1
  dealerSetting: "https://mypcp.us/webservices/dashboard/dealersetting",
  //ContractsSold
  pcpbreakdown: "https://mypcp.us/webservices/dashboard/pcpbreakdown",
  fiBreakdown: "https://mypcp.us/webservices/dashboard/fibreakdown",
  //CustomerInteraction
  customerinteraction:
    "https://mypcp.us/webservices/dashboard/customerinteraction",
  // rows data
  dealerredemption: "https://mypcp.us/webservices/dashboard/dealerredemption",
  //reserved info ,redemption graph, reserved, reserved paid outs table
  reservedgraph: "https://mypcp.us/webservices/dashboard/reservedgraph",
  //contracts sold,
  contractSoldGraph: "https://mypcp.us/webservices/dashboard/contractSoldGraph",
  dashboardcomparegraph:
    "https://mypcp.us/webservices/dashboard/dashboardcomparegraph",
  comparasion30day: "https://mypcp.us/webservices/dashboard/comparasion30day",
  pcpbreakdowngraph: "https://mypcp.us/webservices/dashboard/pcpbreakdowngraph",
  // retention map
  retentionmap: "https://mypcp.us/webservices/dashboard/retentionmap",
  // div2
  duplicatecontract: "https://mypcp.us/webservices/dashboard/duplicatecontract",
  // div2
  unpaidbatchcontract:
    "https://mypcp.us/webservices/dashboard/unpaidbatchcontract",
};

export const fetchDashboard = async (
  {
    auth,
    url,
    Token,
    DealerID,
    FromDate,
    ToDate,
    FixedDateParameter,
    setLoading,
    showToast,
    toastMsg,
    errorMsg,
    dispatch,
    fetchSelector,
    selectionKey,
    selectionData,
    selectionDataKey,
  },
  otherProps = {}
) => {
  const formdata = objectToFormData({
    ...auth,
    DealerID,
    FromDate,
    ToDate,
    FixedDateParameter,
    ...otherProps,
  });
  const res = await fetchPost({
    url,
    token: Token,
    formdata,
    setLoading,
    showToast,
    toastMsg,
    errorMsg,
    dispatch,
    spinner: true,
    fetchSelector,
    selectionKey,
    selectionData,
    selectionDataKey,
  });
  return res;
};

export const useFetchDashboard = ({ url, toastMsg }) => {
  const { auth, Token } = useContext(GlobalContext);

  const { dealer, startdate, enddate, FixedDateParameter } =
    useContext(DashboardContext);
  const [loading, setLoading] = useState(false);
  const formData = {
    auth,
    url,
    Token,
    FromDate: formatDate(startdate),
    ToDate: formatDate(enddate),
    DealerID: dealer,
    FixedDateParameter,
    setLoading,
    showToast: toastMsg ? true : false,
    toastMsg,
  };
  if (dealer) {
  }
  return { loading, setLoading, formData };
};

export const getReduxSelectorData = ({
  dashboardSelection,
  setdealersetting,
  setDisplayDates,
  setengDate,
  setPcpBreakdown,
  setFIBreakdown,
  setusage,
  setdealerredemption,
  setRowShow,
  setReservedGraphData,
  setSaleBreakdown,
  setServiceBreakdown,
}) => {
  if (dashboardSelection.dealerSetting) {
    setdealersetting(dashboardSelection.dealerSetting);
    const DateFilter = dashboardSelection.dealerSetting.DateFilter;
    setDisplayDates(DateFilter);
    const [start, end] = DateFilter.split(" - ");
    setengDate({
      start: engFormatDate(start),
      end: engFormatDate(end),
    });
  }
  if (dashboardSelection.pcpbreakdown) {
    setPcpBreakdown(dashboardSelection.pcpbreakdown);
  }

  if (dashboardSelection.customerinteraction) {
    setusage(dashboardSelection.customerinteraction?.Mobileussage);
  }
  if (dashboardSelection.dealerredemption) {
    setdealerredemption(dashboardSelection.dealerredemption);
    setRowShow({
      row1: dashboardSelection.dealerredemption?.row1_show,
      row2: dashboardSelection.dealerredemption?.row2_show,
      row3: dashboardSelection.dealerredemption?.row3_show,
      row4: dashboardSelection.dealerredemption?.row4_show,
      row5: dashboardSelection.dealerredemption?.row5_show,
    });
  }
  if (dashboardSelection?.reservedgraph) {
    setReservedGraphData(dashboardSelection.reservedgraph);
  }
  if (dashboardSelection?.salebreakdown) {
    setSaleBreakdown(dashboardSelection.salebreakdown);
  }
  if (dashboardSelection?.servicebreakdown) {
    setServiceBreakdown(dashboardSelection.servicebreakdown);
  }
};
