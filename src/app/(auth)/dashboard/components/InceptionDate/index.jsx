import React, { useContext } from "react";
import { DashboardContext } from "../../DashboardContext";
import { variantClasses } from "@/components/cui/button/CustomButton";
const InceptionDate = () => {
  const { FixedDateParameter, displayDates } = useContext(DashboardContext);

  const dateParameter =
    {
      MTD: "MONTH TO DATE",
      YTD: "YEAR TO DATE",
      ITD: "INCEPTION TO DATE",
    }[FixedDateParameter] || "";
  return (
    displayDates && (
      <div className="flex items-center space-x-6">
        <div
          className={`px-4 rounded p-1 ${variantClasses.main} shadow min-w-80`}
        >
          <span className="font-semibold text-lg">
            {dateParameter ? dateParameter : "Date Range"}{" "}
          </span>
        </div>

        <div className="border p-1 px-2 rounded">{displayDates}</div>
      </div>
    )
  );
};

export default InceptionDate;
