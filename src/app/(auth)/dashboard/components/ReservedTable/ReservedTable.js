"use client";
import React, { useContext } from "react";

import { DashboardContext } from "../../DashboardContext";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { GlobalContext } from "@/app/Provider";
import { fetchPostObj } from "@/utils/action/function";
import { jsonToExcel } from "@/utils/generateExcel";
import TooltipNext from "@/components/nextui/TooltipNext";
import MainTable from "@/components/cui/table/MainTable";

const App = ({ UUID }) => {
  const { auth, Token } = useContext(GlobalContext);

  const {
    dealerredemption,
    reservedGraphData,
    startdate,
    enddate,
    FixedDateParameter,
    dealersetting,
  } = useContext(DashboardContext);
  const createExcel = async (export_type = "nc1") => {
    const data = {
      UUID,
      DealerID: dealersetting?.dealer?.DealerID,
      FomDate: startdate,
      ToDate: enddate,
      FixedDateParameter,
      export_type,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "dashboard/subscriptionexport",
      spinner: true,
      data,
    });
    if (res) {
      jsonToExcel(res.dashboardContract, dealersetting?.dealer?.DealerTitle);
    }
  };

  const BelowTable = (bodyClass = "  ") => {
    return (
      <table className="m-0 p-0 table-auto relative border-spacing-0  border-separate tableContainer min-w-full">
        <tbody>
          <tr>
            <td className={`${bodyClass}`}></td>
            <td className="font-semibold ">
              {" "}
              {reservedGraphData?.result?.Total_Contracts &&
                reservedGraphData?.result?.Total_Contracts?.toLocaleString(
                  "en-US"
                )}
            </td>
            <td className="font-semibold ">
              {reservedGraphData?.result?.ContractReserveAmount &&
                "$" +
                  reservedGraphData?.result?.ContractReserveAmount?.toLocaleString(
                    "en-US"
                  )}
            </td>
            <td className="font-semibold ">
              {" "}
              {reservedGraphData?.result?.ReserveReceivedAmount &&
                "$" +
                  reservedGraphData?.result?.ReserveReceivedAmount?.toLocaleString(
                    "en-US"
                  )}
            </td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td className="font-semibold ">
              Variance
              <span className="text-red-500">
                &nbsp;
                {reservedGraphData?.result?.Variance &&
                  "$" +
                    reservedGraphData?.result?.Variance?.toLocaleString(
                      "en-US"
                    )}
              </span>
            </td>
            <td></td>
          </tr>

          <tr>
            <td className="text-red-500 font-semibold text-xs ">
              Cancellations
            </td>
            <td
              className="text-red-500 underline cursor-pointer "
              onClick={() => createExcel()}
            >
              {reservedGraphData?.cancelledreservedgraph?.TotalContracts !==
                "0" && (
                <TooltipNext
                  className={"w-40 bg-foreground text-background"}
                  content={
                    "This is the number of cancelled contract cancelled in the selected date period (Processing Date) (Export with new cancellation logic)"
                  }
                >
                  {reservedGraphData?.cancelledreservedgraph?.TotalContracts}
                </TooltipNext>
              )}
            </td>
            <td
              className="text-red-500 underline cursor-pointer"
              onClick={() => createExcel("nc1-1")}
            >
              {reservedGraphData?.cancelledreservedgraph?.ContractsTotal !==
                "0" && (
                <TooltipNext
                  className={"w-40 bg-foreground text-background"}
                  content={
                    "This is the number of cancelled contract cancelled in the selected date period (Processing Date) (Export with new cancellation logic)"
                  }
                >
                  {reservedGraphData?.cancelledreservedgraph?.ContractsTotal}
                </TooltipNext>
              )}
            </td>
            <td></td>
          </tr>

          <tr>
            <td className="text-red-500 font-semibold text-xs">Matured</td>
            <td className="text-red-500 ">
              {dealerredemption?.row1?.maturedcontract != "0" &&
                dealerredemption?.row1?.maturedcontract}
            </td>
            <td className="text-red-500 ">
              ${dealerredemption?.row1?.Contract_Reserve}
            </td>
            <td className="text-red-500 ">
              ${dealerredemption?.row1?.maturedcontracttakenin}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const ContractsReserved = ({ data }) => (
    <div>
      <span style={{ color: "#38C5DD" }}>({data?.total})</span>
      &nbsp;
      <span>${(data?.redeem + data?.pending)?.toLocaleString("en-US")}</span>
      &nbsp;
      <span style={{ color: "orange" }}>({data?.comp_total})</span>
      &nbsp;
      <span>
        ${(data?.comp_redeem + data?.comp_pending)?.toLocaleString("en-US")}
      </span>
    </div>
  );
  const ReservesRecieved = ({ data }) => (
    <div>
      <span style={{ color: "#38C5DD" }}>({data?.total_batch})</span>
      &nbsp;
      <span>
        ${(data?.redeem_batch + data?.pending_batch)?.toLocaleString("en-US")}
      </span>
      &nbsp;
      <span style={{ color: "orange" }}>({data?.comp_total_batch})</span>
      &nbsp;
      <span>
        $
        {(data?.comp_redeem_batch + data?.comp_pending_batch)?.toLocaleString(
          "en-US"
        )}
      </span>
    </div>
  );
  const columns = [
    { title: "Date", accessor: "contractdate" },
    { title: "CONTRACTS", accessor: "TotalContracts" },
    {
      title: "CONTRACTS RESERVED",
      render: ({ row }) => row && <ContractsReserved data={row} />,
    },
    {
      title: "RESERVES RECEIVED",
      render: ({ row }) => <ReservesRecieved data={row} />,
    },
  ];

  return (
    <div className={`w-full h-full`}>
      <h4 className="pb-4 font-bold text-lg ">Reserved Tables</h4>

      {!reservedGraphData ? (
        <div className="flex justify-center items-center">
          <SpinnerLoader />
        </div>
      ) : (
        <div className="p-2 shadow-2xl shadow-border border border-border rounded-[20px] space-y-2">
          <MainTable
            tableWrapperClass="h-full"
            columns={columns}
            data={reservedGraphData?.result?.grapharray}
          />
          {BelowTable()}
        </div>
      )}
    </div>
  );
};

export default App;
