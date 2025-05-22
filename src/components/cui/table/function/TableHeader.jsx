import React from "react";

// import ColumnHideShow from "../component/ColumnHideShow";
import FullScreenTable from "./FullScreenTable";
import { twMerge } from "tailwind-merge";
const TableHeader = ({
  columns,
  showOnlyColumns,
  setShowOnlyColumns,
  headerAction,
  setFullScreen,
  fullScreen,
  headerClassName,
}) => {
  return (
    <div
      className={twMerge(
        `flex items-center justify-between my-2`,
        `${headerClassName}`
      )}
    >
      <div>{headerAction && headerAction()}</div>
      <div className="flex items-center ">
        <FullScreenTable
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
        {/* {setShowOnlyColumns && (
            <ColumnHideShow
              allColumns={columns}
              showOnlyColumns={showOnlyColumns}
              setShowOnlyColumns={setShowOnlyColumns}
            />
          )} */}
      </div>
    </div>
  );
};

export default TableHeader;
