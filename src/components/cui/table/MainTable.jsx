import React, { useCallback, useState, useContext } from "react";
import { renderCell } from "./function/renderCell";
import { toggleRowSelection } from "./function/utils";
import Checkbox from "../textField/Checkbox";
import { twMerge } from "tailwind-merge";
import { ColumnType } from "./type";
import { GlobalContext } from "@/app/Provider";
import MouseTooltip from "../tooltip/MouseTooltip";

/**
 * @param {Array<Object>} data - The table data as an array of objects.
 * @param {Array<ColumnType>} columns - Array of column definitions.
 * @param {Array<Object>} [selectedRows] - Array of selected rows.
 * @param {Function} [setSelectedRows] - Callback function to update selected rows.
 * @param {string} [rowId="id"] - Unique identifier for rows.
 * @param {Object} [tableClasses] - Custom CSS class names for table elements.
 */

const MainTable = ({
  data,
  columns,
  rowId = "id",
  selectedRows,
  setSelectedRows = () => {},
  tableClasses,
  className,
  striped = true,
  fullScreen,
  tableWrapperClass = `${
    fullScreen ? "max-h-[calc(100vh-100px)] " : "max-h-[calc(100vh-300px)] "
  }  `,
  selectionTitleTooltip,
  selectionRowTooltip,
}) => {
  const { isSidebarOpen } = useContext(GlobalContext);
  const {
    tableClass,
    trHeadClass,
    tHeadClass,
    thHeadClass = "bg-accent",
    tableInsideClass = "border border-card-foreground/10 shadow-sm shadow-accent text-[0.9em] text-left p-3 ",
    tBodyClass,
    trBodyClass = "hover:bg-accent/70 ",
    tdBodyClass,
    stripedClass = "bg-accent",
  } = tableClasses || {};

  const [selectAll, setSelectAll] = useState(false);

  const toggle = useCallback(() => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data);
    }
    setSelectAll(!selectAll);
  }, [selectAll, setSelectedRows, data]);

  const TableHead = () => (
    <thead className={twMerge(`border-none  `, `${tHeadClass}`)}>
      <tr className={twMerge(`z-10 sticky  top-0 `, `${trHeadClass}`)}>
        {selectedRows && (
          <th className={twMerge(`${tableInsideClass} `, `${thHeadClass}`)}>
            <MouseTooltip content={selectionTitleTooltip}>
              <Checkbox onChange={toggle} checked={selectAll} />
            </MouseTooltip>
          </th>
        )}
        {columns?.map((item, index) => (
          <th
            key={index}
            className={twMerge(`px-5 ${tableInsideClass} `, `${thHeadClass}`)}
          >
            <span className="font-bold">{item?.title}</span>
          </th>
        ))}
      </tr>
    </thead>
  );

  const TableBody = () => (
    <tbody className={twMerge(` font-medium`, `${tBodyClass}`)}>
      {data?.map((item, index) => (
        <tr
          key={index}
          className={twMerge(
            `border-none  ${striped && index % 2 !== 0 && stripedClass} `,
            `${trBodyClass}`
          )}
        >
          {selectedRows && setSelectedRows && (
            <td className={twMerge(`${tableInsideClass}`, `${tdBodyClass}`)}>
              <MouseTooltip content={selectionRowTooltip}>
                {toggleRowSelection(item, rowId, selectedRows, setSelectedRows)}
              </MouseTooltip>
            </td>
          )}
          {columns?.map((column, idx) => (
            <td
              key={idx}
              className={twMerge(
                `relative p-0 m-0 px-5 overflow-hidden ${tableInsideClass} `,
                `${tdBodyClass} ${column?.className}`
              )}
            >
              {renderCell(item, column, index, data)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="relative w-full  ">
      <div
        className={twMerge(
          ` overflow-auto ${
            isSidebarOpen
              ? "sidebar:max-w-[calc(100vw-3max-w-[calc(100vw-100px)]60px)] mx-auto "
              : "max-w-[calc(100vw-60px)] mx-auto"
          } `,
          `${tableWrapperClass}`,
          className
        )}
      >
        <table
          className={twMerge(
            `m-0 p-0 table-auto relative border-spacing-0  border-separate tableContainer min-w-full `,
            `${tableClass}`
          )}
        >
          {TableHead()}
          {TableBody()}
        </table>
      </div>
    </div>
  );
};

export default MainTable;
