"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { DashboardContext } from "../../DashboardContext";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import TailwindLoading from "@/app/Components/TailwindLoading";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import Chart from "react-google-charts";
const LastMonthSummary = () => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { dealersetting } = useContext(DashboardContext);
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchSummary = useCallback(() => {
    setloading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealersetting?.dealer?.DealerID);

    fetch("https://mypcp.us/webservices/dashboard/genratenewdashboard", {
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
          toast.success("Summary Found");
          setdata(res);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't get Summary err3");
        console.log(error);
      });
  }, [GLOBAL_RESPONSE, dealersetting?.dealer?.DealerID]);
  useEffect(() => {
    if (dealersetting) {
      fetchSummary();
    }
  }, [dealersetting, fetchSummary]);
  const graphdata = [["Category", "Least", "Average", "Most"]];
  if (data) {
    graphdata.push([
      "Contracts Sold",
      parseInt(data.contract_min.replace(/,/g, "")),
      parseInt(data.contract_avg.replace(/,/g, "")),
      parseInt(data.contract_max.replace(/,/g, "")),
    ]);
    graphdata.push([
      "Services Redemption",
      parseInt(data.service_min.replace(/,/g, "")),
      parseInt(data.service_avg.replace(/,/g, "")),
      parseInt(data.service_max.replace(/,/g, "")),
    ]);
  }
  const options = {
    title: "Last Month Summary",
    isStacked: true,
    bar: {
      groupWidth: "5%",
    },
    vAxis: {
      textPosition: "none",
      scaleType: "linear",
      minValue: 0,
      gridlines: {
        count: 0, // Set the count to 0 to hide vertical gridlines
      },
    },
    hAxis: {
      textStyle: {
        bold: true, // Make the labels bold
      },
    },
  };
  return (
    <div className="w-full">
      <ShadowContainer>
        {loading && (
          <div className="flex justify-center items-center">
            <SpinnerLoader />
          </div>
        )}
        {data && (
          <Chart
            chartType="ColumnChart"
            data={graphdata}
            options={options}
            width="100%"
            height="400px"
          />
        )}
      </ShadowContainer>
    </div>
  );
};

export default LastMonthSummary;
