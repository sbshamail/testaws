"use client";
import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import ReservedGraph from "../ReservedGraph/ReservedGraph";
import RedemptionGraph from "../RedemptionGraph/RedemptionGraph";
import ReservedTable from "../ReservedTable/ReservedTable";
import ReservedPaidOuts from "../ReservedPaidOuts/ReservedPaidOuts";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

import { DashboardContext } from "../../DashboardContext";
import Image from "next/image";

import SpinnerLoader from "@/app/Components/SpinnerLoader";
import { fetchDashboard, urls, useFetchDashboard } from "../../function";
import { useUUID } from "@/lib/hooks";

import BottomActionGeneratePdf from "./BottomActionGeneratePdf";
import { useReactToPrint } from "react-to-print";
//redux
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { useSelection } from "@/reduxStore/function";

function ReservedInfo() {
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const dispatch = useDispatch();
  const dashboardReducer = setReducer("dashboard");
  const dashboardSelection = useSelection("dashboard") ?? {};
  const reservedGraphRef = useRef(null);
  const redemptionGraphRef = useRef(null);
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    documentTitle: "Reserved Graph",
    contentRef: contentRef,
  });
  const {
    dealersetting,
    dealerredemption,
    reservedGraphData,
    setReservedGraphData,
    setRowLoader,
    engDate,
  } = useContext(DashboardContext);

  // console.log("dealersetting", dealersetting);

  const UUID = useUUID();
  const maturedContractArray = [
    dealerredemption?.row1?.maturedcontract,
    dealerredemption?.row1?.Contract_Reserve,
    dealerredemption?.row1?.maturedcontracttakenin,
  ];
  const { loading, setLoading, formData } = useFetchDashboard({
    url: urls.reservedgraph,
  });
  const fetchReservesGraphData = useCallback(async () => {
    setReservedGraphData(null);
    const res = await fetchDashboard(
      {
        ...formData,
        errorMsg: "reserved graph",
        dispatch,
        fetchSelector: dashboardReducer,
        selectionKey: "reservedgraph",
        selectionData: dashboardSelection,
      },
      {
        UUID: UUID,
      }
    );

    setRowLoader(false);
  }, [dealersetting]);

  useEffect(() => {
    if (dealersetting) {
      fetchReservesGraphData();
    }
  }, [dealersetting]);

  // console.log("dealerredemption", dealerredemption);

  useEffect(() => {
    if (toolbarVisible === false) {
      setTimeout(() => {
        setToolbarVisible(true);
      }, 12000);
    }
  }, [toolbarVisible]);

  function getNextMonthFromDate(contractDate) {
    const [month, , year] = contractDate?.split("/").map(Number);
    const nextDate = new Date(year, month, 1); // Set to the 1st day of the next month
    return nextDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  const DateFilter = dealersetting?.DateFilter;
  const [start, end] = DateFilter.split(" - ");

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <SpinnerLoader />
        </div>
      ) : (
        reservedGraphData && (
          <div className="w-full">
            <ShadowContainer>
              <div
                ref={contentRef}
                className="  w-full flex flex-col h-full gap-4 mb-6 print:px-4 print:pt-4"
              >
                <div className="border p-4 ">
                  <div className="uppercase font-semibold text-lg">
                    {dealersetting?.dealer?.DealerTitle}
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3 flex flex-col justify-center">
                      <div className="text-base">
                        Total number of contract sold
                      </div>
                      <div className="text-[#00ADEF] text-5xl font-bold">
                        {dealerredemption?.ReserveGraph?.total?.toLocaleString(
                          "en-US"
                        ) ?? 0}
                      </div>
                    </div>
                    <div className="col-span-2 flex flex-col justify-center gap-2">
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#F57215] w-3 h-3 rounded-full flex justify-center items-center"></div>
                        <div className="text-sm">Sold</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className=" bg-[#00ADEF] w-3 h-3 rounded-full flex justify-center items-center"></div>
                        <div className="text-sm">Pre Load</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#000000] w-3 h-3 rounded-full flex justify-center items-center"></div>
                        <div className="text-sm">Reserved in Accounts</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#000000] w-3 h-3 rounded-full flex justify-center items-center"></div>
                        <div className="text-sm">Pre Load Reserved</div>
                      </div>
                    </div>
                    <div className="col-span-4 flex flex-col justify-center items-center">
                      <div className="w-full text-left text-sm">
                        {`${engDate.start} - ${engDate.end}`}
                      </div>
                      <div className="w-full text-left text-lg">
                        <span className="text-[#00ADEF] font-bold">
                          {" "}
                          $
                          {dealerredemption?.ReserveGraph
                            ?.maturedcontracttotalCost ?? "0.00"}
                          :
                        </span>{" "}
                        Contract Surplus
                      </div>
                      <div className="w-full  text-lg flex">
                        <span className="text-[#40BA56]  font-bold whitespace-nowrap ">
                          {`$ ${
                            dealerredemption?.ReserveGraph
                              ?.FutureMaturedBalance ?? "0.00"
                          } : `}
                        </span>
                        &nbsp;
                        {reservedGraphData?.result?.grapharray.length > 0 && (
                          <span>
                            Contract Surplus estimated for{" "}
                            {getNextMonthFromDate(end)}
                            <div className="text-xs ">
                              (Doesn&apos;t include cancelled contracts)
                            </div>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-span-3">
                      {dealerredemption?.ReserveGraph?.AgencyLogo && (
                        <Image
                          src={dealerredemption?.ReserveGraph?.AgencyLogo}
                          width={150}
                          height={40}
                          alt="Agency Logo"
                          className="object-contain w-auto h-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>
                {reservedGraphData?.result?.googledata && (
                  <div className="border p-4">
                    <div className="w-full flex flex-wrap gap-6 items-center overflow-hidden">
                      <div
                        className="flex-1 min-w-[700px] overflow-x-auto"
                        ref={reservedGraphRef}
                      >
                        <ReservedGraph toolbarVisible={toolbarVisible} />
                      </div>
                      &nbsp;
                      <div
                        className="flex-1 min-w-[700px] overflow-x-auto"
                        ref={redemptionGraphRef}
                      >
                        <RedemptionGraph toolbarVisible={toolbarVisible} />
                      </div>
                    </div>
                  </div>
                )}
                &nbsp;
                <div className=" w-full  flex flex-wrap gap-6 print:flex">
                  <div className="flex-1 min-w-[600px]">
                    <ReservedTable UUID={UUID} />
                  </div>
                  <div className="flex-1 min-w-[400px]">
                    <ReservedPaidOuts />
                  </div>
                </div>
              </div>
              <BottomActionGeneratePdf
                reservedGraphRef={reservedGraphRef}
                redemptionGraphRef={redemptionGraphRef}
                UUID={UUID}
                reactToPrintFn={reactToPrintFn}
              />
            </ShadowContainer>
          </div>
        )
      )}
    </>
  );
}

export default ReservedInfo;
