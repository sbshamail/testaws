import React from "react";
import Tab from "./Tab";
const tabslist = [
  "Account Setup",
  "Contract Settings",
  "DSS & Report Settings",
  "Email Defaults",
  "Customer Letter",
  "App Settings",
  "Guest Settings",
];
const Sidebar = ({ tab, settab }) => {
  return (
    <div className="w-1/5 flex flex-col gap-2">
      {tabslist.map((data, i) => (
        <Tab key={i} tab={tab} i={i} settab={settab} text={data} />
      ))}
    </div>
  );
};

export default Sidebar;
