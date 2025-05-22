import SimpleModal from "@/components/cui/modals/SimpleModal";
import React from "react";

const SelectedDealerModal = ({ selectedDealer, open, close }) => {
  return (
    <SimpleModal
      open={open}
      close={close}
      className={"bg-card text-card-foreground"}
    >
      <div>
        <div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-400">
              {selectedDealer.DealerID}
            </h2>
          </div>
          <table className="w-full border-collapse border mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">
                  Customers who are on a Sales plan w/maintenance
                </th>
                <th className="border px-4 py-2">
                  Customers who are on a Service plan
                </th>
                <th className="border px-4 py-2">
                  Customers who are on a Parts plan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 text-center">
                  {Number(selectedDealer.totalcount).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  {Number(selectedDealer.ServicesContracts).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  {Number(selectedDealer.PartsContracts).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-center">
                  Total:{" "}
                  {Number(selectedDealer.TotalSalePoints).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  Total:{" "}
                  {Number(selectedDealer.TotalServicePoints).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  Total: {Number(selectedDealer.PartsPoints).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-center">
                  From sales:{" "}
                  {Number(selectedDealer.SalePoints).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  From Sales:{" "}
                  {Number(selectedDealer.ServicePoints).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  From Sales:{" "}
                  {Number(selectedDealer.PartsPoints).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-center">
                  From Covereages:{" "}
                  {Number(selectedDealer.SaleCoverage).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  From Covereages:{" "}
                  {Number(selectedDealer.ServiceCoverage).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  From Covereages:{" "}
                  {Number(selectedDealer.PartsCoverage).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2 text-center">
                  From service Authenticom:{" "}
                  {Number(selectedDealer.SaleAuth).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  From service Authenticom:{" "}
                  {Number(selectedDealer.ServiceAuth).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  From service Authenticom:{" "}
                  {Number(selectedDealer.PartsAuth).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={close}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </SimpleModal>
  );
};

export default SelectedDealerModal;
