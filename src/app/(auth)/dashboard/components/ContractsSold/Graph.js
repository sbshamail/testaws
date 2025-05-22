import Chart from "react-google-charts";

const globalChartStyles = {
  backgroundColor: "transparent", // Transparent background
  chartArea: { backgroundColor: "transparent" },
  hAxis: {
    textStyle: {
      color: "#9BA7C9",
      fontSize: 10,
    }, // X-axis labels
    titleTextStyle: { color: "#9BA7C9" }, // X-axis title
    axisLine: {
      color: "#9BA7C9",
      show: true,
    },
    baselineColor: "#9BA7C9",
  },
  vAxis: {
    textStyle: { color: "#9BA7C9" }, // Y-axis labels
    titleTextStyle: { color: "#9BA7C9" }, // Y-axis title
    axisLine: {
      color: "#9BA7C9",
      show: true,
    },
    baselineColor: "#9BA7C9",
  },
  legend: {
    textStyle: { color: "#9BA7C9" }, // Legend text
  },
  titleTextStyle: {
    color: "#9BA7C9", // Chart title
  },
  tooltip: {
    textStyle: { color: "#9BA7C9" }, // Tooltip text
  },
};

const Graph = ({ data, type }) => {
  // Check if data is valid and has the expected structure
  const isDataValid = () => {
    if (!data) return false;

    switch (type) {
      case "CS":
        return (
          data.contracts &&
          data.contracts.xaxis &&
          data.contracts.Total &&
          data.contracts.New &&
          data.contracts.Used &&
          data.contracts.xaxis.length > 0
        );
      case "SD":
        return (
          data.heat_distribution &&
          Array.isArray(data.heat_distribution[0]) &&
          Array.isArray(data.heat_distribution[1]) &&
          data.heat_distribution[0].length > 0
        );
      case "SR":
        return (
          data.services &&
          data.services.data &&
          Object.keys(data.services.data).length > 0
        );
      case "CS2":
        return (
          data.contracts &&
          data.contracts.legend &&
          data.contracts.previous &&
          data.contracts.current &&
          data.contracts.legend.length > 0
        );
      case "SR2":
        return (
          data.services &&
          data.services.legend &&
          data.services.previous &&
          data.services.current &&
          data.services.legend.length > 0
        );
      default:
        return false;
    }
  };

  // Prepare data based on type
  let graphdata;
  let graphoptions;

  if (type === "CS" && isDataValid()) {
    graphdata = [["Year", "Total Cars", "Used Cars", "New Cars"]];
    const years = data.contracts.xaxis;
    const totalcars = data.contracts.Total;
    const newcars = data.contracts.New;
    const usedcars = data.contracts.Used;
    years.forEach((year, i) => {
      const totalcar = Number.parseInt(totalcars[i]) || 0;
      const newcar = Number.parseInt(newcars[i]) || 0;
      const usedcar = Number.parseInt(usedcars[i]) || 0;
      graphdata.push([year, totalcar, usedcar, newcar]);
    });
    graphoptions = {
      title: data.services.Title,
      titleTextStyle: {
        color: "#9BA7C9", // Set your desired title color here
      },
      legend: {
        position: "none",
        textStyle: { color: "#9BA7C9" },
      },

      hAxis: {
        slantedText: false,
        textStyle: {
          fontSize: 10,
          color: "#9BA7C9",
        },
        maxTextLines: 3,
        axisLine: {
          color: "#9BA7C9",
          show: true,
        },
        baselineColor: "#9BA7C9",
      },
      vAxis: {
        scaleType: "linear", // Changed to linear scale
        minValue: 0,
        textStyle: { color: "#9BA7C9" },
        titleTextStyle: { color: "#9BA7C9" },
      },
      bar: {
        groupWidth: "50%",
      },
      series: {
        0: { color: "#007AAA" },
        1: { color: "#7EDBFF" },
        2: { color: "#00ADEE" },
      },
    };
  } else if (type === "SD" && isDataValid()) {
    graphdata = [["Day", "Visits"]];
    const days = data.heat_distribution[1];
    const visits = data.heat_distribution[0];
    days.forEach((day, i) => {
      const dailyvisits = Number.parseInt(visits[i]) || 0;
      graphdata.push([day, dailyvisits]);
    });
    graphoptions = {
      ...globalChartStyles,

      legend: { position: "none" },

      vAxis: {
        scaleType: "linear", // Changed to linear scale
        minValue: 0,
        textStyle: { color: "#9BA7C9" },
        titleTextStyle: { color: "#9BA7C9" },
      },
      bar: {
        groupWidth: "50%",
      },
      series: {
        0: { color: "#00B7FF" },
      },
    };
  } else if (type === "SR" && isDataValid()) {
    graphdata = [["Year", "Visits"]];
    Object.entries(data.services.data).forEach(([key, value]) => {
      const intval = Number.parseInt(value) || 0;
      const day = key.substring(6, 8);
      if (/^\d{8}$/.test(key)) {
        const day = key.substring(6, 8); // Extract only the day
        graphdata.push([day, intval]);
      } else {
        graphdata.push([key, intval]);
      }
    });
    graphoptions = {
      ...globalChartStyles,
      title: data.services.Title,
      legend: { position: "none" },

      vAxis: {
        scaleType: "linear", // Changed to linear scale
        minValue: 0,
        textStyle: { color: "#9BA7C9" },
        titleTextStyle: { color: "#9BA7C9" },
      },

      bar: {
        groupWidth: "50%",
      },
      series: {
        0: { color: "#00B7FF" },
      },
    };
  } else if (type === "CS2" && isDataValid()) {
    graphdata = [["Month", "Previous Year", "Current Year"]];
    const months = data.contracts.legend;
    const previousyear = data.contracts.previous;
    const currentyear = data.contracts.current;
    months.forEach((month, i) => {
      const pmonth = Number.parseInt(previousyear[i]) || 0;
      const cmonth = Number.parseInt(currentyear[i]) || 0;
      graphdata.push([month, pmonth, cmonth]);
    });
    graphoptions = {
      ...globalChartStyles,
      title: data?.services?.Title,
      titleTextStyle: {
        color: "#9BA7C9", // Set your desired title color here
      },
      legend: { position: "none" },

      vAxis: {
        scaleType: "linear", // Changed to linear scale
        minValue: 0,
        textStyle: { color: "#9BA7C9" },
        titleTextStyle: { color: "#9BA7C9" },
      },
      bar: {
        groupWidth: "50%",
      },
      series: {
        0: { color: "#FF9900" },
        1: { color: "#00B7FF" },
      },
    };
  } else if (type === "SR2" && isDataValid()) {
    graphdata = [["Month", "Previous Year", "Current Year"]];

    const months = data.services.legend;
    const previousyear = data.services.previous;
    const currentyear = data.services.current;
    months.forEach((month, i) => {
      const pmonth = Number.parseInt(previousyear[i]) || 0;
      const cmonth = Number.parseInt(currentyear[i]) || 0;
      graphdata.push([month, pmonth, cmonth]);
    });
    graphoptions = {
      ...globalChartStyles,
      title: data?.services?.Title,
      titleTextStyle: {
        color: "#9BA7C9", // Set your desired title color here
      },
      legend: { position: "none" },

      vAxis: {
        scaleType: "linear", // Changed to linear scale
        minValue: 0,
        textStyle: { color: "#9BA7C9" },
        titleTextStyle: { color: "#9BA7C9" },
      },
      bar: {
        groupWidth: "50%",
      },
      series: {
        0: { color: "#FF9900" },
        1: { color: "#00B7FF" },
      },
    };
  } else {
    // Default empty data with header row only
    graphdata =
      type === "CS"
        ? [["Year", "Total Cars", "Used Cars", "New Cars"]]
        : type === "SD"
        ? [["Day", "Visits"]]
        : type === "SR"
        ? [["Year", "Visits"]]
        : type === "CS2" || type === "SR2"
        ? [["Month", "Previous Year", "Current Year"]]
        : [["", ""]];

    // Add a dummy row with zeros to prevent the error
    graphdata.push(["No Data", 0, 0, 0].slice(0, graphdata[0].length));

    graphoptions = {
      ...globalChartStyles,
      legend: { position: "none" },
      title: data?.services?.Title,
      titleTextStyle: {
        color: "#9BA7C9", // Set your desired title color here
      },
      vAxis: {
        scaleType: "linear",
        minValue: 0,
        maxValue: 1, // Set a small max value for empty chart
        textStyle: { color: "#9BA7C9" },
        titleTextStyle: { color: "#9BA7C9" },
      },
      bar: { groupWidth: "50%" },
      series: { 0: { color: "#00B7FF" } },
      annotations: {
        textStyle: { color: "#9BA7C9", fontSize: 14 },
        alwaysOutside: false,
      },
    };
  }

  return (
    <div style={{ width: "100%", height: "300px", position: "relative" }}>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="300px"
        data={graphdata}
        options={{
          ...graphoptions,
          backgroundColor: "transparent",
          chartArea: { backgroundColor: "transparent" },
        }}
      />
      {!isDataValid() && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#9BA7C9",
            fontSize: "14px",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          No data available
        </div>
      )}
    </div>
  );
};

export default Graph;
