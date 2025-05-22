import toast from "react-hot-toast";
import * as XLSX from "xlsx";
/**
 * Generates and downloads an Excel file from an array of objects.
 * @param {Array<Object>} data - The array of objects to convert to Excel.
 * @param {string} fileName - The name of the Excel file to be downloaded.
 */
export const jsonToExcel = (data, fileName = "data") => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    toast.error("Invalid data");

    return;
  }
  const processedData = data.map((item) => {
    const newItem = {};
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === "string" && value.length > 32767) {
        // Split large text into chunks of 32767 characters
        const chunks = value.match(/.{1,32767}/g);
        chunks.forEach((chunk, index) => {
          newItem[`${key}_part${index + 1}`] = chunk;
        });
      } else {
        newItem[key] = value;
      }
    }
    return newItem;
  });

  //   Convert the array of objects to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(processedData);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook and trigger a download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
