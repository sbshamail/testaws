import React, { useContext, useState, useEffect } from "react";
import Row1 from "../Rows/Row1";
import Row2 from "../Rows/Row2";
import { DashboardContext } from "../../DashboardContext";
import Row3 from "../Rows/Row3";
import Row4 from "../Rows/Row4";
import Row5 from "../Rows/Row5";
import { fetchDashboard, urls, useFetchDashboard } from "../../function";
//redux
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { useSelection } from "@/reduxStore/function";

const DealerRedemptionRows = () => {
  const {
    dealerredemption,
    setdealerredemption,
    setRowLoader,
    mount,
    dealersetting,
  } = useContext(DashboardContext);

  const dispatch = useDispatch();
  const dashboardReducer = setReducer("dashboard");
  const dashboardSelection = useSelection("dashboard") ?? {};

  const [row1data, setrow1data] = useState(null);
  const [row2data, setrow2data] = useState(null);
  const [row3data, setrow3data] = useState(null);
  const [row4data, setrow4data] = useState(null);
  const [row5data, setrow5data] = useState(null);

  useEffect(() => {
    saveData(dashboardSelection?.dealerredemption);
  }, []);
  const saveData = (response) => {
    setrow1data(response?.row1);
    setrow2data(response?.row2);
    setrow3data(response?.row3);
    setrow4data(response?.row4);
    setrow5data(response?.row5);
  };
  // hook fetch set and get parameter
  const { loading, formData } = useFetchDashboard({
    url: urls.dealerredemption,
  });

  const fetchDealerRedemption = async () => {
    setRowLoader(true);
    setrow1data(null);
    setdealerredemption(null);
    const res = await fetchDashboard({
      ...formData,
      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "dealerredemption",
      selectionData: dashboardSelection,
    });
    setRowLoader(false);
    if (res) {
      saveData(res);
    }
  };
  useEffect(() => {
    if (dealersetting) {
      fetchDealerRedemption();
    }
  }, [mount]);

  return (
    <div>
      <div className={`w-full  grid grid-cols-1 lg:grid-cols-2 gap-6`}>
        <Row1 row1data={row1data} loading={loading} />
        <Row2 row2data={row2data} loading={loading} />
        {(dealerredemption?.row3_show === 1 ||
          dealerredemption?.row4_show === 1 ||
          dealerredemption?.row5_show === 1) && (
          <div
            className={`max-w-full  flex gap-4 ${
              dealerredemption ? "mb-[27px]" : ""
            }`}
          >
            {" "}
            <Row3 row3data={row3data} loading={loading} />
            <Row4 row4data={row4data} loading={loading} />
            <Row5 row5data={row5data} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DealerRedemptionRows;
