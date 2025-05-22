import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import React, { useContext } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
import { DashboardContext } from "../../DashboardContext";
import { GlobalContext } from "@/app/Provider";

const Drawtrendline = () => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    dealersetting,
    startdate,
    enddate,
    FixedDateParameter,
    setReservedGraphData,
    reservedGraphData,
  } = useContext(DashboardContext);

  // Function to convert month number to month name
  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber);
    return date.toLocaleString("default", { month: "short" });
  };

  // Prepare data for the chart
  const googleData = reservedGraphData?.drawtrendline?.googledata || [];

  // Ensure googleData is properly formatted
  const formattedData = googleData.filter(
    (data) => data.year && data.month !== undefined && data.total !== undefined
  );
  const categories = formattedData.map(
    (data) => `${getMonthName(data.month)} ${data.year}`
  );
  const seriesData = formattedData.map((data) => data.total);

  const options = {
    series: [
      {
        name: "Total",
        data: seriesData,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        endingShape: "rounded",
        colors: {
          ranges: [
            {
              from: 0,
              to: 100000000000000,
              color: "#8BC977",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val;
        },
      },
    },
  };

  return (
    <div>
      <ShadowContainer>
        <div id="chart">
          <ReactApexChart
            options={options}
            series={options.series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </ShadowContainer>
    </div>
  );
};

export default Drawtrendline;
