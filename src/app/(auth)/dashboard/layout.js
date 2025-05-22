import React from "react";
import DashboardProvider from "./DashboardContext";
const layout = ({ children }) => {
  return <DashboardProvider>{children}</DashboardProvider>;
};

export default layout;
