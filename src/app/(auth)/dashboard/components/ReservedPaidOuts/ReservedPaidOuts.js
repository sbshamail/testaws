"use client";
import React, { useContext } from "react";

import { DashboardContext } from "../../DashboardContext";

import SpinnerLoader from "@/app/Components/SpinnerLoader";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import MainTable from "@/components/cui/table/MainTable";
import { currencyFormatter } from "@/utils/helpers";

const App = ({}) => {
  const { reservedGraphData } = useContext(DashboardContext);

  const BelowContent = () => {
    return (
      <div>
        <table className="m-0  p-0 table-auto relative border border-border border-spacing-0  border-separate tableContainer min-w-full">
          <tr key="extra-1">
            <td className="w-40">&nbsp;</td>
            <td className="font-semibold ">
              {reservedGraphData?.ServicePaidouttostore?.TotalServices?.toLocaleString(
                "en-US"
              )}
            </td>
            <td className="font-semibold ">
              {reservedGraphData?.ServicePaidouttostore?.TotalClaimAmount &&
                currencyFormatter(
                  reservedGraphData?.ServicePaidouttostore?.TotalClaimAmount
                )}
            </td>
            <td className="font-semibold ">
              {reservedGraphData?.ServicePaidouttostore
                ?.TotalClaimPaidOutAmount &&
                currencyFormatter(
                  reservedGraphData?.ServicePaidouttostore
                    ?.TotalClaimPaidOutAmount
                )}
            </td>
          </tr>

          <tr key="extra-2">
            <td></td>
          </tr>
        </table>
        <div className="font-semibold text-center ">
          Variance{" "}
          <span className="text-red-500">
            {reservedGraphData?.ServicePaidouttostore?.Variance &&
              currencyFormatter(
                reservedGraphData?.ServicePaidouttostore?.Variance
              )}
          </span>
        </div>
      </div>
    );
  };
  const ClaimsAmount = ({ row, data }) => {
    return (
      <div>
        $ &nbsp;
        {row ? currencyFormatter(Number(row.ClaimedAmount)) : "-"}
      </div>
    );
  };
  const RenderClaimsPaid = ({ row }) => {
    return (
      <div className="flex items-center gap-2">
        <span>{currencyFormatter(Number(row?.ClaimPayOutAmount ?? 0))}</span>
        <span>({row?.ClaimPaidServices ?? 0})</span>
      </div>
    );
  };

  const columns = [
    { title: "DATE", accessor: "yy", className: "w-32" },
    { title: "SERVICES", accessor: "TotalContracts" },
    {
      title: "CLAIMS AMOUNT",
      render: ({ row, data }) => row && <ClaimsAmount row={row} data={data} />,
    },
    { title: "CLAIMS PAID", render: RenderClaimsPaid },
  ];

  return (
    <div className={`w-full h-full`}>
      <h4 className="pb-4 font-bold text-lg">Reserved Paid Outs</h4>
      {!reservedGraphData ? (
        <div className="flex justify-center items-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="p-2 shadow-2xl shadow-border border border-border rounded-[20px] ">
          <MainTable
            tableWrapperClass="h-full"
            data={reservedGraphData?.ServicePaidouttostore?.grapharray}
            columns={columns}
          />
          {BelowContent()}
        </div>
      )}
    </div>
  );
};

export default App;
