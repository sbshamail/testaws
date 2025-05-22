import toast from "react-hot-toast";

export const isValidDate = (dateStr) => {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

// format date
export const formatToMMDDYYYY = (date) => {
  if (date) {
    try {
      const normalizedDate = new Date(date); // Attempt to parse the date
      if (isNaN(normalizedDate)) throw new Error("Invalid Date");

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }).format(normalizedDate);

      return formattedDate;
    } catch (error) {
      toast.error("Error formatting date");
      console.error("Error formatting date:", error.message, "Input:", date);
      return "";
    }
  }
};
function getISODateOnly(input) {
  try {
    const date = new Date(input);
    if (isNaN(date)) return "";
    return date.toISOString().split("T")[0]; // returns "YYYY-MM-DD"
  } catch {
    return "";
  }
}
export function formatDate(dateInput) {
  if (!dateInput) return "";
  const mmddyyyyRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  if (typeof dateInput === "string" && mmddyyyyRegex.test(dateInput)) {
    return dateInput;
  }
  try {
    // Step 1: Extract ISO date (ignores local time zone shifting)
    const iso = getISODateOnly(dateInput); // "YYYY-MM-DD"
    if (!iso) return "";
    // Step 2: Format that ISO into MM/DD/YYYY
    const [year, month, day] = iso.split("-");
    const formatted = `${month}/${day}/${year}`;

    return isValidDate(formatted) ? formatted : "";
  } catch (err) {
    console.error("Date format error:", err);
    return "";
  }
}

export function inputFormatDate(dateString) {
  if (!dateString) return "";

  // Step 0: Check if it's in MM/DD/YYYY format and convert
  const mmddyyyyRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
  if (typeof dateString === "string" && mmddyyyyRegex.test(dateString)) {
    const [month, day, year] = dateString.split("/");
    const value = `${year}-${month}-${day}`;
    return isValidDate(value) ? value : "";
  }

  // Step 1: Fallback to your existing ISO parsing
  const iso = getISODateOnly(dateString); // "YYYY-MM-DD"
  if (!iso) return "";

  const [year, month, day] = iso.split("-");
  const value = `${year}-${month}-${day}`;
  return isValidDate(value) ? value : "";
}

export function unixTimestampToDate(timestamp, slash) {
  if (!timestamp) return "";

  const date = new Date(Number(timestamp) * 1000);
  if (isNaN(date)) return "";

  // Convert to ISO string to ignore time zone
  const isoDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const [year, month, day] = isoDate.split("-");

  return slash ? `${month}/${day}/${year}` : `${month}-${day}-${year}`;
}

export function dateHMS(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date)) return "";

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function engFormatDate(dateString) {
  const iso = getISODateOnly(dateString); // "YYYY-MM-DD"
  if (!iso) return "";

  const [year, month, day] = iso.split("-");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = parseInt(month, 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) return "Invalid date";

  return `${monthNames[monthIndex]} ${parseInt(day)}, ${year}`;
}
