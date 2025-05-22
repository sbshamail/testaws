/**
 * Column definition type for the table.
 *
 * @typedef {Object} ColumnType
 * @property {string} title - The title of the column.
 * @property {string} accessor - The key in the data to access the value for this column.
 * @property {string} [filterId] - An optional filter ID for this column.
 * @property {"date" | "currency"} [type] - Optional type for formatting, either "date" or "currency".
 * @property {"PKR" | "SAR" | "EUR" | "JPY" | "USD" | "INR"} [currency] - The currency type for currency columns.
 * @property {"en-PK" | "en-US" | "de-DE" | "ja-JP" | "en-IN"} [format] - The format/locale for date and currency columns.
 * @property {Function} [render] - An optional custom render function for the column.
 * @property {string} [className] - An optional class name for custom styling of the column.
 */
export const ColumnType = {
  title: String,
  accessor: String,
  filterId: String,
  type: String,
  currency: String,
  format: String,
  render: Function,
  className: String,
};
