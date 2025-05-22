import Checkbox from "@/components/cui/textField/Checkbox";
import React from "react";

export const TitleRenderActivity = ({
  activitySelectAll,
  activityRows,
  currentItems,
}) => {
  return (
    <div className="flex flex-col">
      <span>Activity</span>
      <Checkbox
        onChange={activitySelectAll}
        checked={activityRows.length === currentItems.length}
      />
    </div>
  );
};
export const RenderActivity = ({ row, activitySelect, activityRows }) => {
  return (
    <Checkbox
      onChange={() => activitySelect(row)}
      checked={activityRows.find(
        (item) => item?.BatchContractid === row.BatchContractid
      )}
    />
  );
};
