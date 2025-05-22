export { unixTimestampToDate } from "@/utils/helpers";
// export function unixTimestampToDate(timestamp) {
//   // Check if the input is already a formatted date string (MM-DD-YYYY format)
//   const isFormattedDate =
//     /^\d{2}-\d{2}-\d{4}$/.test(timestamp) ||
//     /^\d{2}\/\d{2}\/\d{4}$/.test(timestamp);
//   if (isFormattedDate) {
//     return timestamp; // If already formatted, return the date as it is
//   }
//   // Check if timestamp is a valid number
//   if (isNaN(timestamp) || timestamp <= 0) {
//     return ""; // Return empty string if invalid
//   }

//   // Multiply by 1000 to convert from seconds to milliseconds
//   const date = new Date(timestamp * 1000);

//   // Get the various components of the date
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");

//   // Return a formatted date string
//   return `${month}-${day}-${year}`;
// }

export function generateYearsArray() {
  const currentYear = new Date().getFullYear();
  const startYear = 1924;
  const yearsArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push(year);
  }

  return yearsArray;
}
