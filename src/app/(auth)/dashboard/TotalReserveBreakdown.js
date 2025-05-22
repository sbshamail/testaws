"use client";
import { GlobalContext } from "@/app/Provider";
import React, { useEffect, useContext, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import Tooltip from "@/app/Components/Tooltip";
import { DashboardContext } from "./DashboardContext";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const Graph2 = ({ list }) => {
  const { dealerredemption } = useContext(DashboardContext);
  const calculateTotal = () => {
    const serviceRedeem = parseInt(
      dealerredemption?.row1?.serviceredeem?.replace(/,/g, "") ?? 0
    );
    const servicePending = parseInt(
      dealerredemption?.row1?.servicepending?.replace(/,/g, "") ?? 0
    );
    const maturedContract = parseInt(
      dealerredemption?.row1?.maturedcontract?.replace(/,/g, "") ?? 0
    );

    return serviceRedeem + servicePending + maturedContract;
  };

  const [total, setTotal] = useState(calculateTotal());

  useEffect(() => {
    setTotal(calculateTotal());
  }, [dealerredemption]);

  const [series, setSeries] = useState([44, 55, 33]);

  const state = {
    chart: {
      width: 50,
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "85%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              // show: true,
              // label: "Total",
            },
          },
          style: {
            colors: ["#0080B2", "#009FDE", "#00B7FF"],
            borderRadius: "20rem",
          },
        },
      },
    },
    stroke: {
      width: 8,
      colors: ["#FFFFFF"],
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      show: false,
    },

    colors: ["#0080B2", "#009FDE", "#00B7FF"],
  };

  return (
    <div className="w-7/12 relative">
      <ReactApexChart
        options={state}
        series={[
          parseInt(dealerredemption?.row1?.serviceredeem),
          parseInt(dealerredemption?.row1?.servicepending),
          parseInt(dealerredemption?.row1?.maturedcontract),
        ]}
        type="donut"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-3">
        <div className="text-[#4C566A] text-4xl font-bold leading-5">
          {total > 0 ? total.toLocaleString() : "0"}
        </div>
        <div className="text-sm font-normal leading-5 text-[#7D8698]">
          Total
        </div>
      </div>
    </div>
  );
};

export default Graph2;
