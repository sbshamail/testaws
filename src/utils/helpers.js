import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
export {
  dateHMS,
  engFormatDate,
  formatDate,
  formatToMMDDYYYY,
  inputFormatDate,
  isValidDate,
  unixTimestampToDate,
} from "./pcpDates";

//->start Function to convert object to FormData

//   example use of objectToFormData
// const formData = objectToFormData(data);

// // Log the FormData to console
// for (let [key, value] of formData.entries()) {
//   console.log(`${key}:`, value);
// }
export const formDatatoObject = (formData) => {
  const obj = {};
  for (let [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return obj;
};

export function objectToFormData(obj, formdata) {
  const formData = formdata ? formdata : new FormData();

  // Loop through the object and append each key-value pair to FormData
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];

      // Convert undefined, "undefined", "null", and null to an empty string
      if (
        value === undefined ||
        value === "undefined" ||
        value === "null" ||
        value === null
      ) {
        value = "";
      }

      formData.append(key, value);
    }
  }

  return formData;
}

//<-end Function to convert object to FormData

export const openPdfInNewTab = (elementID) => {
  const modalElement = document.getElementById(elementID); // Target the modal content

  if (modalElement) {
    html2canvas(modalElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Handle cross-origin images
      allowTaint: false,
      logging: true, // Debug any issues
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // PDF and canvas dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const scaleRatio = pdfWidth / canvasWidth;
        const scaledHeight = canvasHeight * scaleRatio;

        let position = 0;
        const topPadding = 10; // Padding for new pages in mm
        const bottomPadding = 10; // Padding at the bottom of each page in mm
        const availablePdfHeight = pdfHeight - bottomPadding; // Usable height on the page

        while (position < canvasHeight) {
          const croppedCanvas = document.createElement("canvas");
          const croppedContext = croppedCanvas.getContext("2d");

          croppedCanvas.width = canvasWidth;
          croppedCanvas.height = availablePdfHeight / scaleRatio;

          croppedContext.drawImage(
            canvas,
            0,
            position,
            canvasWidth,
            croppedCanvas.height,
            0,
            0,
            canvasWidth,
            croppedCanvas.height
          );

          const croppedImgData = croppedCanvas.toDataURL("image/png");

          if (position === 0) {
            // Add the first page
            pdf.addImage(
              croppedImgData,
              "PNG",
              0,
              0,
              pdfWidth,
              availablePdfHeight
            );
          } else {
            // Add subsequent pages with top padding
            pdf.addPage();
            pdf.addImage(
              croppedImgData,
              "PNG",
              0,
              topPadding,
              pdfWidth,
              availablePdfHeight - topPadding
            );
          }

          position += croppedCanvas.height;

          // Avoid infinite loop
          if (position >= canvasHeight) break;
        }

        // Open the PDF in a new tab
        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, "_blank");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  }
};

export function truncated(value) {
  const num = Number(value) || 0;
  const truncated = Math.trunc(num * 100) / 100;
  return truncated.toFixed(2); // returns a string like "10.00"
}

/**
 * @param {number} value - The numeric value to format.
 * @param {"PKR"|"SAR"|"EUR"|"JPY"|"USD"|"INR"|null} [currency=null] - The currency code.
 * @param {"en-PK"|"en-US"|"de-DE"|"ja-JP"|"en-IN"} [format="en-US"] - The locale format string.
 * @returns {string} - The formatted currency string.
 */
export const currencyFormatter = (
  value,
  currency = "USD",
  format = "en-US"
) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (currency) {
    options.style = "currency";
    options.currency = currency;
  }

  const numberFormatter = new Intl.NumberFormat(format, options);
  const absTruncated = truncated(Math.abs(value));
  // We format the absolute value of the provided number to handle both positive and negative values.
  const num = Number(absTruncated); // Convert string back to number for formatting

  let formattedValue = numberFormatter.format(num);

  // If the value is negative, adjust the formatting
  if (value < 0) {
    if (currency) {
      formattedValue = formattedValue.replace(/^(\D+)/, "$1-");
    } else {
      formattedValue = `-${formattedValue}`;
    }
  }

  return formattedValue;
};

export const openHtmlInNewTab = (htmlString) => {
  if (htmlString) {
    const blob = new Blob([htmlString], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }
};

export const Toastify = (type, msg, position) => {
  toast[type](msg, {
    position: position,
    style: {
      background: type === "success" ? "white" : "black",
      color: type === "success" ? "black" : "white",
    },
  });
};

export const getNestedProperty = (
  obj, // Record<string, any>,
  propertyKey // string
) => {
  return propertyKey.split(".").reduce((acc, part) => acc && acc[part], obj);
};
