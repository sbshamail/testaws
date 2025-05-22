import toast from "react-hot-toast";
import { GlobalContext } from "@/app/Provider";
import React, { useEffect, useContext, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import Tooltip from "@/app/Components/Tooltip";
import { DashboardContext } from "../../DashboardContext";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const Graph2 = ({ list2, total }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { pcpBreakdown } = useContext(DashboardContext);

  const [series, setSeries] = useState([44, 55, 13, 33]);
  // const [total, setTotal] = useState(0);

  // React.useEffect(() => {
  //   const sum = list2.reduce((acc, item) => {
  //     const value = parseInt(item.value, 10);
  //     return acc + (isNaN(value) ? 0 : value);
  //   }, 0);
  //   setTotal(sum);
  // }, [list2]);

  const state = {
    chart: {
      width: 80,
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
              // formatter: function (w) {
              //   return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              // },
            },
          },
          style: {
            colors: [
              list2[0]?.color,
              list2[1]?.color,
              list2[2]?.color,
              list2[3]?.color,
              list2[4]?.color,
              list2[5]?.color,
            ],
            borderRadius: "20rem",
          },
        },
      },
    },
    stroke: {
      width: 8,
      colors: ["transparent"],
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
    tooltip: {
      enabled: true,
    },
    colors: [
      list2[0]?.color,
      list2[1]?.color,
      list2[2]?.color,
      list2[3]?.color,
      list2[4]?.color,
      list2[5]?.color,
    ],
  };

  return (
    <div className="w-full relative">
      <ReactApexChart
        options={state}
        series={[
          parseInt(list2[0]?.value),
          parseInt(list2[1]?.value),
          parseInt(list2[2]?.value),
          parseInt(list2[3]?.value),
          parseInt(list2[4]?.value),
          parseInt(list2[5]?.value),
        ]}
        type="donut"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-3">
        <div className="text-siteBlue text-4xl font-bold leading-5">
          {isNaN(total) ? "0" : total.toLocaleString()}
          {/* just added from the API to get the same result */}
        </div>
        <div className="text-sm font-normal leading-5 text-[#7D8698]">
          Total Contracts
        </div>
      </div>
    </div>
  );
};

export default Graph2;
