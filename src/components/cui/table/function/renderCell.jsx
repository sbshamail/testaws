import React from "react";
import { currencyFormatter, formatDate } from "@/utils/helpers";

/**
 * @param {number|string|Object|null} item - The data item for the cell.
 * @param {Object} column - The column configuration object.
 * @param {string} [column.accessor] - The accessor for the column.
 * @param {string} [column.type] - The type of the column (e.g., "date", "currency").
 * @param {Function} [column.render] - Optional custom render function for the cell.
 * @param {number} index - The current row index.
 * @param {Array<Object>} data - The entire table data array.
 */

export const renderCell = (item, column, index, data) => {
  // Access nested properties using a function
  const accessors = column?.accessor?.split(".");
  let value = item;

  accessors?.forEach((accessor) => {
    if (value && typeof value === "object" && value.hasOwnProperty(accessor)) {
      value = value[accessor];
    } else {
      value = null;
    }
  });

  // Check if the final value is still an object, which should be handled specially
  if (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !React.isValidElement(value)
  ) {
    value = `${JSON.stringify(value)}`;
  }

  // Check if the column has a render function
  if (column?.render && typeof column.render === "function") {
    const renderResult = column?.render({
      row: item,
      index,
      data,
      cell: value,
    });

    // Ensure renderResult is a valid React node
    if (React.isValidElement(renderResult)) {
      return renderResult;
    }

    // Handle common render function return types
    if (typeof renderResult === "string" || typeof renderResult === "number") {
      return renderResult;
    }

    return <span className="text-orange-400">Invalid Render Result</span>;
  }

  if (Array.isArray(value)) {
    return null;
  }

  if (value === null || value === undefined) {
    return <span className="text-orange-400">N/A</span>;
  }

  switch (column.type) {
    case "date":
      return formatDate(value);
    case "currency":
      return currencyFormatter(value, column.currency, column.format);
    default:
      return value;
  }
};
