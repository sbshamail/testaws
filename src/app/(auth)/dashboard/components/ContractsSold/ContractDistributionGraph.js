import React from "react";
import { Chart } from "react-google-charts";

function ContractDistributionGraph({ pcpBreakdownGraph }) {
  const rawData = {
    Classic: pcpBreakdownGraph?.Classic,
    Complimentary: pcpBreakdownGraph?.Complimentary,
    Express: pcpBreakdownGraph?.Express,
    Gps: pcpBreakdownGraph?.GPS,
    LoyaltyCash: pcpBreakdownGraph?.["Loyalty Cash"],
    LoyaltyPoints: pcpBreakdownGraph?.["Loyalty Points"],
    Subscriptions: pcpBreakdownGraph?.Subscriptions,
    // LoyaltyServices: pcpBreakdownGraph?.pcpbreakdowngraph?.LoyaltyServices,
    // Marketplace: pcpBreakdownGraph?.pcpbreakdowngraph?.Marketplace,
  };
  const colors = [
    "#07719F",
    "#0BA8EB",
    "#78DCF9",
    "#C2042E",
    "#01C3AF",
    "#108D84",
    "#FFBF4F",
  ];
  const options = {
    backgroundColor: "transparent",
    bar: {
      groupWidth: "60%",
    },
    hAxis: {
      slantedText: false,
      textStyle: {
        fontSize: 10,
        color: "#9BA7C9",
      },
      maxTextLines: 2,
    },
    vAxis: {
      scaleType: "log",
      minValue: 1,
      ticks: [1, 10, 100, 1000, 10000], // Custom tick positions
      textStyle: { color: "#9ba7c9" },
      titleTextStyle: { color: "#9ba7c9" },
      gridlines: {
        color: "#e0e0e03e",
        count: -1, // Keeps all ticks defined above
      },
    },

    chartArea: { width: "100%" },

    legend: { position: "none" },
  };

  const chartData = [
    ["Category", "Value", { role: "style" }],
    ...Object.entries(rawData).map(([key, value], index) => [
      key,
      value,
      colors[index] || "#000000",
    ]),
  ];

  return chartData ? (
    <div className="m-auto w-full md:max-w-[700px]  lg:max-w-[900px] xl:max-w-[900px] 2xl:max-w-[1200px] 3xl:w-full">
      <Chart
        className="bg-card text-card-foreground"
        chartType="ColumnChart"
        width={`100%`}
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  ) : (
    <p className="">Data Not Found.</p>
  );
}

export default ContractDistributionGraph;
