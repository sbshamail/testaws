import * as XLSX from "xlsx";

export const generateExcel = (data, responseState) => {
  let totalCost = Number(responseState?.res?.ContractMaturedBalance?.totalCost);
  let takenIn = Number(responseState?.res?.ContractMaturedBalance?.takenin);
  let total_contract = Number(
    responseState?.res?.ContractMaturedBalance?.total_contract
  );
  let Retained = Number(responseState?.res?.ContractRetainedBalance?.Retained);
  const summary = {
    totalCost: totalCost.toLocaleString(),
    takenIn: takenIn.toLocaleString(),

    totalContractCount: total_contract.toLocaleString(),
    totalRetained: Retained.toLocaleString(),
  };

  const remaining = Number(totalCost ?? 0) - Number(takenIn ?? 0);

  const workbook = XLSX.utils.book_new();

  // Define the banner content
  const bannerRow = ["Matured Contract Report"];

  // Define the summary rows
  const summaryRows = [
    [
      "",
      "",
      "Amount for expired service (un-used)",
      "",
      "Total Contract",
      summary.totalCost,
    ],
    ["", "", "Amount Paid out on report", "", "Taken In", summary.takenIn],
    [
      "",
      "",
      "Expired services amount to be taken in",
      "",
      "Remaining",
      remaining.toLocaleString(),
    ],
  ];

  // Define the footer row
  const footerRow = [
    "Total Contract",
    "",
    summary.totalContractCount,
    "",
    "Total Amount",
    summary.totalCost,
    "Total Retained",
    summary.totalRetained,
  ];

  // Define the main headers
  const headers = [
    "Sr.#",
    "Date Matured",
    "Sale Date",
    "Expiration Date",
    "Contract Number",
    "Gifted Contract Number",
    "Customer Name",
    "VIN",
    "Plan Name",
    "Calculated Price",
    "Selling Price",
    "Value for Services Used",
    "Value for Unused Services",
    "Reserve",
    "Forfeit",
    "Total Services",
    "Money Takenout Date",
    "Expiry Reason",
    "Status",
    "Value for Gifted services Used",
    "Value for Gifted services Unused",
    "Check #",
  ];

  // Map data into rows
  const rows = data.map((item, index) => [
    index + 1,
    item.dateMatured,
    item.saleDate,
    item.expiration,
    item.contractNumber,
    item.giftedCoi,
    item.customer,
    item.VIN,
    item.planName,
    `$${item.ContractTotalCost}`,
    `$${item.SellingPrice}`,
    `$${item.used_coupon_amount}`,
    `$${item.unusedcoupon_amount}`,
    item.reserve,
    item.forfeit,
    item.services,
    item.MoneyTakenoutDate,
    item.expiryReason,
    item.status,
    `$${item.GiftedUsedServiceAmount}`,
    `$${item.GiftedUnusedServicesAmount}`,
    item.Check,
  ]);

  // Combine all parts into one array
  const worksheetData = [
    bannerRow,
    ...summaryRows,
    [],
    footerRow,
    [],
    headers,
    ...rows,
  ];

  // Create a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Merge cells for the banner and summary rows
  worksheet["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }, // Merge cells for the banner row
    { s: { r: 1, c: 2 }, e: { r: 1, c: 3 } }, // Merge for "Amount for expired service (un-used)"
    { s: { r: 2, c: 2 }, e: { r: 2, c: 3 } }, // Merge for "Amount Paid out on report"
    { s: { r: 3, c: 2 }, e: { r: 3, c: 3 } }, // Merge for "Expired services amount to be taken in"
  ];

  // Define styles
  const blackWhiteStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" }, size: 12 },
    fill: { fgColor: { rgb: "000000" } },
    alignment: { horizontal: "center", vertical: "center" },
  };

  const summaryStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "D9EAD3" } },
    alignment: { horizontal: "right", vertical: "center" },
  };

  const footerStyle = {
    font: { bold: true },
    fill: { fgColor: { rgb: "FCE5CD" } },
    alignment: { horizontal: "left", vertical: "center" },
  };

  // Apply styles to the banner
  worksheet["A1"].s = blackWhiteStyle;

  // Apply styles to headers
  headers.forEach((header, index) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 7, c: index });
    if (worksheet[cellAddress]) {
      worksheet[cellAddress].s = blackWhiteStyle;
    }
  });

  // Apply styles to summary and footer rows
  ["B2", "B3", "B4"].forEach((cell) => {
    if (worksheet[cell]) worksheet[cell].s = summaryStyle;
  });

  ["A6", "C6", "E6"].forEach((cell) => {
    if (worksheet[cell]) worksheet[cell].s = footerStyle;
  });

  // Append worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Matured Contracts");

  // Write the Excel file
  XLSX.writeFile(workbook, "Matured_Contracts.xlsx");
};
