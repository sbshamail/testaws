import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { DashboardContext } from "../../DashboardContext";
import { useTheme } from "@/utils/theme/themeProvider";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RedemptionGraph = (props) => {
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
        name: "Claim Amount",
        data: reservedGraphData?.ServicePaidouttostore?.googledata?.map(
          (item) => item[2]
        ),
      },

      {
        name: "Claims Paid",
        data: reservedGraphData?.ServicePaidouttostore?.googledata?.map(
          (item) => item[5]
        ),
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
    colors: ["#F57215", "#000000"],
    legend: {
      labels: {
        colors: "hsla(var(--card-foreground))",
      },
    },
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
      text: "Redemption Graph",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "black",
      },
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: reservedGraphData?.ServicePaidouttostore?.googledata.map(
        (item) => item[0]
      ),
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return `$${value}`;
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
    <div className="flex justify-center items-center w-full overflow-hidden">
      {reservedGraphData?.result?.googledata ? (
        <div id="chart" className="relative w-full max-w-full overflow-x-auto">
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
};

export default RedemptionGraph;
