"use client";
import React, { useContext, useState, useEffect } from "react";
import Input from "@/app/Components/Inputs/Input";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { GlobalContext } from "@/app/Provider";
import { DashboardContext } from "../../DashboardContext";

import { TbZoomReset } from "react-icons/tb";
import { formatDate, inputFormatDate, Toastify } from "@/utils/helpers";
import { fetchDashboard, urls } from "../../function";
import toast from "react-hot-toast";

import FixedDateParameterButton from "@/components/FixedDateParameterButton";
//redux
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { useSelection } from "@/reduxStore/function";

import TooltipShad from "@/components/cui/tooltip/TooltipShad";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import { ls } from "@/utils/localstorage";
import { SimpleFilterableSelect } from "@/components/cui/select/SimpleFilterableSelect";
import { fetchPostObj } from "@/utils/action/function";

const statuslist = [
  { src: "xp_points_status.png", text: "XP Points & Rewards" },
  { src: "claim_status.png", text: "Claims" },
  { src: "loyalty_cash_status.png", text: "Loyalty Cash" },
  { src: "n_gauge_status.png", text: "N-Gauge" },
  { src: "value_my_trade_status.png", text: "Value My Trade" },
  { src: "referral_status.png", text: "Digital Referrals" },
  { src: "marketplace_status.png", text: "Marketplace" },
  { src: "integration_status.png", text: "Intergration" },
  { src: "autofill.png", text: "Autofill Contracts" },
  { src: "gifting.png", text: "Gifting Services" },
  { src: "guest.png", text: "Guest Interface" },
];

const Div1 = ({ auth, Token }) => {
  const { GLOBAL_DEALERS_INFO } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const dashboardReducer = setReducer("dashboard");
  const dashboardSelection = useSelection("dashboard") ?? {};

  const {
    dealersetting,
    setdealersetting,
    setRowLoader,
    setBreakdownLoader,
    dealer,
    setdealer,
    startdate,
    setstartdate,
    enddate,
    setenddate,
    FixedDateParameter,
    setFixedDateParameter,
    setResetAll,
    setMount,
  } = useContext(DashboardContext);

  let dealerOptions =
    GLOBAL_DEALERS_INFO?.map((dealer) => {
      return { text: dealer.DealerTitle, value: dealer.DealerID };
    }) || [];
  dealerOptions = [{ text: "ALL", value: "-1" }, ...dealerOptions];

  const [loading, setloading] = useState(false);

  const resetValues = () => {
    ls.delete("dashboard");
    setResetAll(true);
    setdealer("");
    setstartdate("");
    setenddate("");
  };
  // console.log("pathname", pathname);
  // console.log("dealerrrrrrrr", FixedDateParameter);
  const fetchDealerSetting = async (formData) => {
    const res = await fetchDashboard({
      ...formData,
      url: urls.dealerSetting,
      showToast: true,
      toastMsg: "Dealer Data Found",
      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "dealerSetting",
    });

    if (res) {
      const dealerSettings = {
        dealer: dealer,
        startdate: inputFormatDate(formData?.startdate),
        enddate: inputFormatDate(formData?.enddate),
        FixedDateParameter: formData?.FixedDateParameter,
      };
      setMount((prev) => !prev);
      if (dealer) {
        localStorage.setItem("dealerSettings", JSON.stringify(dealerSettings));
      }
    }
  };
  const fetchPCPBreakdown = async (formData) => {
    const res = await fetchDashboard({
      ...formData,
      url: urls.pcpbreakdown,
      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "pcpbreakdown",
    });
  };

  const fetchCustomerInteraction = async (formData) => {
    const res = await fetchDashboard({
      ...formData,
      url: urls.customerinteraction,

      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "customerinteraction",
    });
  };
  const fetchSaleBreakdown = async (data) => {
    const res = await fetchPostObj({
      api: "dashboard/salesbreakdown",
      auth,
      Token,

      data: { ...data, ContractType: 1 },
      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "salebreakdown",
    });
  };

  const fetchServiceBreakdown = async (data) => {
    const res = await fetchPostObj({
      api: "dashboard/servicesbreakdown",
      auth,
      Token,

      data: { ...data, ContractType: 1 },
      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "servicebreakdown",
    });
  };

  const fetchReport = async ({ showDate, dateParameter }) => {
    ls.delete("dashboard");
    dispatch(dashboardReducer({}));
    if (!dealer || dealer === "-1") {
      return toast.error("Please select Dealer");
    }
    let FromDate = "";
    let ToDate = "";
    let fixedDateParameter = dateParameter ? dateParameter : "";

    if (showDate) {
      FromDate = formatDate(startdate);
      ToDate = formatDate(enddate);
      if (!FromDate) {
        return Toastify("error", "Please select From Date");
      }
      if (!ToDate) {
        return Toastify("error", "Please select To Date");
      }
    }

    // setResetAll(false);
    setRowLoader(true);
    setBreakdownLoader(true);
    setloading(true);
    setdealersetting(null);
    setFixedDateParameter(dateParameter ? dateParameter : "");
    setstartdate(inputFormatDate(FromDate));
    setenddate(inputFormatDate(ToDate));
    const data = {
      FromDate,
      ToDate,
      DealerID: dealer,
      FixedDateParameter: fixedDateParameter,
    };
    const formData = {
      auth,
      Token,
      ...data,
      setLoading: setloading,
    };
    await fetchDealerSetting(formData);
    await fetchPCPBreakdown(formData);

    await fetchCustomerInteraction(formData);
    setBreakdownLoader(true);
    await fetchSaleBreakdown(data);
    await fetchServiceBreakdown(data);
    setBreakdownLoader(false);
    setRowLoader(false);
  };

  useEffect(() => {
    const loadTawkScript = () => {
      var Tawk_API = Tawk_API || {};
      var Tawk_LoadStart = new Date();

      (function () {
        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/64778b3f74285f0ec46ec979/1i35ib3nt";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      })();
    };

    const removeTawkScript = () => {
      const tawkScript = document.querySelector(
        'script[src^="https://embed.tawk.to"]'
      );
      if (tawkScript) {
        tawkScript.remove();
      }
    };

    loadTawkScript();

    return () => {
      removeTawkScript();
    };
  }, []);

  return (
    <>
      <div className="w-full ">
        <ShadowContainer>
          <div className="w-full flex justify-between flex-wrap gap-4">
            <div className="min-w-48 flex-1 ">
              <SimpleFilterableSelect
                value={dealer}
                setvalue={setdealer}
                list={dealerOptions}
                options={dealerOptions}
                className="w-full"
                // bgcolor="white"
                placeholder="Select Account"
                // defaultValue1={dealersetting?.dealer}
              />
            </div>
            <div className="min-w-48 flex-1 ">
              <Input
                label=""
                value={startdate}
                setvalue={setstartdate}
                type="date"
                className={"p-2 w-full"}
              />
            </div>
            <div className="min-w-48 flex-1 ">
              <Input
                label=""
                value={enddate}
                setvalue={setenddate}
                type="date"
                className={"p-2 w-full"}
              />
            </div>
            <div className="min-w-48 flex-1 ">
              <FixedDateParameterButton
                action={fetchReport}
                FixedDateParameter={FixedDateParameter}
              />
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-max">
                <DancingLoadingButton
                  loading={loading}
                  onClick={() => {
                    fetchReport({ showDate: true });
                  }}
                >
                  Search
                </DancingLoadingButton>
              </div>
              <div className="flex items-center">
                <TooltipShad content="reset ">
                  <button onClick={resetValues}>
                    <TbZoomReset size={24} color="gray" />
                  </button>
                </TooltipShad>
              </div>
            </div>
          </div>
        </ShadowContainer>
      </div>
      {/* div 2 available policies*/}
    </>
  );
};

export default Div1;
