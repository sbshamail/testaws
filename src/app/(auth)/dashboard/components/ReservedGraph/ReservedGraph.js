import React, { useContext, forwardRef } from "react";
import dynamic from "next/dynamic";
import { DashboardContext } from "../../DashboardContext";
import { useTheme } from "@/utils/theme/themeProvider";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ReservedGraph = forwardRef((props, ref) => {
  const theme = useTheme();
  const { toolbarVisible } = props;

  const { reservedGraphData } = useContext(DashboardContext);

  let seriesData = [];
  if (
    reservedGraphData &&
    reservedGraphData.result &&
    reservedGraphData.result.googledata
  ) {
    seriesData = [
      {
        name: "Sold",
        data: reservedGraphData?.result?.googledata?.map((item) => item[2]),
      },
      {
        name: "Pre-load",
        data: reservedGraphData?.result?.googledata?.map((item) => item[8]),
      },
      {
        name: "Reserved in Accounts",
        data: reservedGraphData?.result?.googledata?.map((item) => item[5]),
      },
      {
        name: "Pre Load Reserved",
        data: reservedGraphData?.result?.googledata?.map((item) => item[11]),
      },
    ];
  }

  const options = {
    breakpoint: 768,
    chart: {
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: toolbarVisible,
      },
    },
    legend: {
      labels: {
        colors: "hsla(var(--card-foreground))",
      },
    },
    colors: ["#F57215", "#0a5d77", "#000000", "#000000"],

    dataLabels: {
      enabled: true,
      style: {
        colors: ["#00b7ff"], // Blue color for data labels
      },
      formatter: function (value) {
        return value > 0 ? `$${value?.toLocaleString("en-US")}` : ""; // Hide if value is 0 or null
      },
    },
    stroke: {
      curve: "straight",
      width: 4,
    },

    title: {
      text: "Reserved Graph",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
      },
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: reservedGraphData?.result?.googledata?.map((item) => item[0]),
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return `$${value}`;
        },
        style: {
          fontSize: "12px",
        },
      },
      title: {
        text: "Amount in USD",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },

    tooltip: {
      style: {
        fontSize: "14px",
      },
      theme: theme === "dark" ? "light" : "dark",
      y: {
        formatter: function (value) {
          return value > 0 ? `$${value?.toLocaleString("en-US")}` : "";
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center w-full overflow-hidden ">
      {reservedGraphData?.result?.googledata ? (
        <div
          id="chart"
          className="relative w-full max-w-full overflow-x-auto  "
        >
          <ReactApexChart
            options={options}
            series={seriesData}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      ) : (
        <div />
      )}
      <div id="html-dist"></div>
    </div>
  );
});

ReservedGraph.displayName = "ReservedGraph";
export default ReservedGraph;
