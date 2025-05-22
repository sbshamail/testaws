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
const Graph = ({ list, totalValueOfList1 }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { dealersetting, startdate, enddate, FixedDateParameter } =
    useContext(DashboardContext);
  const fetchCsv = (export_type, filename) => {
    // console.log(export_type);
    // setloading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealersetting?.dealer.DealerID);
    formdata.append("export_type", export_type);
    formdata.append("FromDate", startdate);
    formdata.append("ToDate", enddate);
    formdata.append("FixedDateParameter", FixedDateParameter);
    formdata.append("UUID", "ef78d0cf-300b-44ee-a914-046ae8acc6f7");

    fetch("https://mypcp.us/webservices/dashboard/dashboardexport", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        // console.log("Response status:", response); // Log the response status
        return response.blob(); // Parse the response as a Blob
      })
      .then((blob) => {
        // setloading(false);
        if (blob) {
          var fileURL = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = fileURL;
          a.download = `${filename}.xlsx`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          toast.success("File downloaded successfully");
        } else {
          toast.error("Failed to download file");
        }
      })
      .catch((error) => {
        // setloading(false);
        toast.error("Can't add Address err3");
        console.log(error);
      });
  };
  // console.log("LIST NO", list);

  const [series, setSeries] = useState([
    parseInt(list[0].value),
    parseInt(list[1].value),
    parseInt(list[2].value),
    parseInt(list[3].value),
    parseInt(list[4].value),
    parseInt(list[5].value),
  ]);

  // console.log({ series });
  // const [series, setSeries] = useState([]);
  const [colors, setColors] = useState([]);
  const [total, setTotal] = useState(0);
  React.useEffect(() => {
    const sum = list.reduce((acc, item) => acc + parseInt(item.value), 0);
    setTotal(sum);
  }, [list]);

  useEffect(() => {
    const values = list.map((item) => item.value);
    const colors = list.map((item) => item.color);

    setSeries(values);
    setColors(colors);
  }, [list]);
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
              list[0].color,
              list[1].color,
              list[2].color,
              list[3].color,
              list[4].color,
              list[5].color,
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
    // Remove or set the legend property to false to hide the legend
    legend: {
      show: false,
    },
    colors: [
      list[0].color,
      list[1].color,
      list[2].color,
      list[3].color,
      list[4].color,
      list[5].color,
    ],

    // colors: ["#FF4560", "#008FFB", "#00E396", "#FEB019"],
  };

  return (
    <div className="w-full relative">
      <ReactApexChart
        options={state}
        series={[
          parseInt(list[0].value),
          parseInt(list[1].value),
          parseInt(list[2].value),
          parseInt(list[3].value),
          parseInt(list[4].value),
          parseInt(list[5].value),
        ]}
        type="donut"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-3">
        <div className="text-siteBlue text-4xl font-bold leading-5">
          {isNaN(totalValueOfList1) ? "0" : totalValueOfList1.toLocaleString()}
        </div>
        <div className="text-sm font-normal leading-5 text-[#7D8698]">
          Total Contracts
        </div>
      </div>
    </div>
  );
};

export default Graph;
