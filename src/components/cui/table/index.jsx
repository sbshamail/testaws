import React, { useContext, useState } from "react";
import Pagination from "./function/Pagination";
import MainTable from "./MainTable";
import TableHeader from "./function/TableHeader";
import { GlobalContext } from "@/app/Provider";
import { twMerge } from "tailwind-merge";
const Table = ({
  data,
  total,
  columns,
  selectedRows,
  setSelectedRows,
  labelSelected,
  rowId,
  pagination,
  showPagination = false,
  tableClasses,
  className,
  wrapperClassName,
  showOnlyColumns,
  setShowOnlyColumns,
  headerAction,
  headerClassName,
  showHeader = false,
  selectionTitleTooltip,
  selectionRowTooltip,
  striped,
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { isSidebarOpen } = useContext(GlobalContext);
  return (
    data && (
      <div
        className={twMerge(
          ` p-4 bg-card shadow-md shadow-border border border-border rounded-[20px] gap-2 
          ${
            fullScreen
              ? "fixed top-0 left-0 h-screen w-full overflow-auto z-50 bg-card border-none rounded-none"
              : isSidebarOpen
              ? "sidebar:max-w-[calc(100vw-290px)] mx-auto  "
              : "max-w-[calc(100vw-60px)] mx-auto"
          }`,
          `  ${wrapperClassName}`
        )}
      >
        {labelSelected && selectedRows.length > 0 && (
          <div className="bg-primary/50 text-white text-xl font-bold p-2 rounded flex items-center justify-between gap-3">
            <span>{selectedRows.length} Rows Selected</span>
            <button
              onClick={() => setSelectedRows([])}
              className="text-red-400 hover:text-red-500 transition"
            >
              ✖
            </button>
          </div>
        )}
        <div>
          {(headerAction || showHeader) && (
            <TableHeader
              columns={columns}
              showOnlyColumns={showOnlyColumns}
              setShowOnlyColumns={setShowOnlyColumns}
              headerAction={headerAction}
              fullScreen={fullScreen}
              setFullScreen={setFullScreen}
              headerClassName={headerClassName}
            />
          )}
        </div>

        <MainTable
          data={data}
          rowId={rowId}
          columns={columns}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          tableClasses={tableClasses}
          className={className}
          fullScreen={fullScreen}
          selectionTitleTooltip={selectionTitleTooltip}
          selectionRowTooltip={selectionRowTooltip}
          striped={striped}
        />
        {showPagination && pagination && (
          <Pagination
            dataLimitDisable={pagination?.dataLimitDisable}
            currentPage={pagination?.currentPage}
            setCurrentPage={pagination?.setCurrentPage}
            setSelectedRows={setSelectedRows}
            removeSelection={pagination?.removeSelection}
            dataLimit={pagination?.dataLimit}
            setDataLimit={pagination?.setDataLimit}
            total={total}
          />
        )}
      </div>
    )
  );
};

export default Table;
