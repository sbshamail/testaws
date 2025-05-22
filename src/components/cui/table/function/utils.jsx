import { getNestedProperty } from "@/utils/helpers";
import Checkbox from "../../textField/Checkbox";

/**
 * Toggles the selection of a single row in a table.
 * @param {Object} row - The current row object.
 * @param {string} idProperty - The property used as a unique identifier.
 * @param {Array<Object>} selectedRows - The array of currently selected rows.
 * @param {Function} setSelectedRows - Function to update the selected rows array.
 * @returns {JSX.Element} - A Checkbox component with appropriate toggle logic.
 */
export const toggleRowSelection = (
  row,
  idProperty,
  selectedRows,
  setSelectedRows
) => {
  const id = getNestedProperty(row, idProperty);

  const toggle = () => {
    if (selectedRows?.some((s) => getNestedProperty(s, idProperty) === id)) {
      setSelectedRows(
        selectedRows?.filter(
          (item) => getNestedProperty(item, idProperty) !== id
        )
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  return (
    <Checkbox
      onChange={toggle}
      checked={selectedRows.some(
        (s) => getNestedProperty(s, idProperty) === id
      )}
    />
  );
};
