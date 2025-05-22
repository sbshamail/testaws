import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const Graph3 = ({ list2, total }) => {
  const state = {
    chart: {
      width: 60, // Decreased from 80
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "85%", // Decreased from 85%
          background: "transparent",
          labels: {
            show: false,
            total: {
              show: false,
              label: "Total",
              formatter: () => (isNaN(total) ? "0" : total.toLocaleString()),
            },
          },
        },
      },
    },
    stroke: {
      width: 6, // Decreased stroke width from 8
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
    colors: list2.map((item) => item.color),
  };

  return (
    <div className="w-full relative">
      <ReactApexChart
        options={state}
        series={list2.map((item) => parseInt(item.value, 10))}
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

export default Graph3;
