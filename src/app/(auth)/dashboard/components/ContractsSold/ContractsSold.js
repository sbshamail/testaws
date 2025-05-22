"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { DashboardContext } from "../../DashboardContext";

import Image from "next/image";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Comparison from "./Comparison";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import Graph from "./Graph";
import html2canvas from "html2canvas";
import Drawtrendline from "../Drawtrendline/Drawtrendline";
import ContractDistributionGraph from "./ContractDistributionGraph";
import { fetchDashboard, urls, useFetchDashboard } from "../../function";
import ServiceDistributionTimeline from "./ServiceDistributionTimeline";
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { useSelection } from "@/reduxStore/function";
import { CustomButton } from "@/components/cui/button/CustomButton";

const ContractsSold = () => {
  const contractChartRef = useRef(null);
  const trendLineRef = useRef(null);
  const {
    mount,
    dealersetting,
    setContractChart,
    setDrawtrendline,
    drawtrendline,
    reservedGraphData,
    dealerredemption,
    pcpBreakdown,
    rowLoader,
    resetAll,
    dealer,
    displayDates,
  } = useContext(DashboardContext);
  const dispatch = useDispatch();
  const dashboardReducer = setReducer("dashboard");
  const dashboardSelection = useSelection("dashboard") ?? {};
  // console.log("++++++++++++++", reservedGraphData, drawtrendline);
  const [data, setdata] = useState(null);
  const [comparedata, setcomparedata] = useState(null);
  const [data30days, setdata30days] = useState(null);
  // const [loading, setloading] = useState(false);

  const [graphselector, setgraphselector] = useState(0);
  const [pcpBreakdownGraph, setPcpBreakdownGraph] = useState(null);
  const [activeTab, setActiveTab] = useState("SR"); // Default to 'SD'
  const [servicesCompare, setServicesCompare] = useState({
    current: 0,
    previous: 0,
  });
  const [contractCompare, setContractCompare] = useState({
    current: 0,
    previous: 0,
  });
  const { pcpbreakdowngraph } = pcpBreakdownGraph || {};
  const isPcpBreakdownGraph = pcpbreakdowngraph?.Total ? true : false;

  // console.log("dealer", dealer, dealersetting);

  const { loading, formData } = useFetchDashboard({});
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  useEffect(() => {
    setServicesCompare({
      current: (
        dashboardSelection?.dashboardcomparegraph?.services?.current ?? []
      ).reduce((acc, num) => acc + (Number(num) || 0), 0),
      previous: (
        dashboardSelection?.dashboardcomparegraph?.services?.previous ?? []
      ).reduce((acc, num) => acc + (Number(num) || 0), 0),
    });

    setContractCompare({
      current: (
        dashboardSelection?.dashboardcomparegraph?.contracts?.current ?? []
      ).reduce((acc, num) => acc + (Number(num) || 0), 0),
      previous: (
        dashboardSelection?.dashboardcomparegraph?.contracts?.previous ?? []
      ).reduce((acc, num) => acc + (Number(num) || 0), 0),
    });
  }, [dashboardSelection?.dashboardcomparegraph]);

  useEffect(() => {
    setdata(dashboardSelection?.contractSoldGraph);
    setcomparedata(dashboardSelection?.dashboardcomparegraph);
    setdata30days(dashboardSelection?.comparasion30day);
    setPcpBreakdownGraph(dashboardSelection?.pcpbreakdowngraph);
  }, []);
  const fetchContractsSold = useCallback(async () => {
    const res = await fetchDashboard({
      ...formData,
      url: urls.contractSoldGraph,
      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "contractSoldGraph",
    });

    if (res) {
      setdata(res);
    }
  }, [mount]);

  const fetchCompare = useCallback(async () => {
    setcomparedata(null);
    const res = await fetchDashboard({
      ...formData,
      url: urls.dashboardcomparegraph,
      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "dashboardcomparegraph",
    });

    if (res) {
      setcomparedata(res);
    }
  }, [dealer?.DealerID]);

  const fetchData30days = useCallback(async () => {
    setdata30days(null);
    const res = await fetchDashboard({
      ...formData,
      url: urls.comparasion30day,
      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "comparasion30day",
    });

    if (res) {
      setdata30days(res);
    }
  }, [mount]);

  const fetchPcpBreakdownGraph = async () => {
    setPcpBreakdownGraph(null);
    const res = await fetchDashboard({
      ...formData,
      url: urls.pcpbreakdowngraph,
      dispatch,
      fetchSelector: dashboardReducer,
      selectionKey: "pcpbreakdowngraph",
    });

    if (res) {
      setPcpBreakdownGraph(res);
      // console.log("pcpbreakdowngraph", res);
    }
  };
  useEffect(() => {
    setdata(null);
    setcomparedata(null);
    setdata30days(null);
    setPcpBreakdownGraph(null);
    setServicesCompare(null);
    setContractCompare(null);
    if (dealersetting) {
      fetchContractsSold(); // Service Distribution Timeline
      fetchPcpBreakdownGraph(); //ContractDistributionGraph
      fetchData30days(); //30 Days Comparison
      fetchCompare();
    }
  }, [mount]);

  const contractChartBase64 = useCallback(async () => {
    const generateBase64Images = async () => {
      // Ensure the chart is fully rendered
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Increased timeout to ensure rendering

      // console.log("Starting to generate base64 images");
      const contractChartRefCanvas = await html2canvas(
        contractChartRef.current
      );

      const contractChartRefBase64 =
        contractChartRefCanvas.toDataURL("image/png");

      return { contractChartRefBase64 };
    };

    const { contractChartRefBase64 } = await generateBase64Images();
    setContractChart(contractChartRefBase64);

    if (reservedGraphData) {
      const trendLineRefCanvas = await html2canvas(trendLineRef.current);
      const trendLineRefBase64 = trendLineRefCanvas.toDataURL("image/png");
      setDrawtrendline(trendLineRefBase64);
    }
  }, [reservedGraphData, setContractChart, setDrawtrendline]);

  useEffect(() => {
    if (data && contractChartRef.current && trendLineRef.current) {
      contractChartBase64();
    }
  }, [data, reservedGraphData, contractChartBase64]);

  useEffect(() => {
    if (dealer) {
      setdata(null);
      setcomparedata(null);
      setdata30days(null);
      setPcpBreakdownGraph(null);
    }
  }, [resetAll]);
  const contractService = ({ title, value, loading }) => {
    return (
      <div className="w-full flex items-center justify-between drop-shadow-lg bg-card rounded-full ">
        <h2 className="text-base text-card-foreground font-semibold pl-4">
          {title}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center w-10 h-10">
            <SpinnerLoader />
          </div>
        ) : (
          <div className="w-max h-max p-4 bg-[#0384C9] rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">{value}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="">
      <div className="w-full flex flex-col  mt-0 ">
        {graphselector == 0 && (
          <>
            <div className="flex justify-center items-center">
              {loading && (
                <div className="flex justify-center items-center">
                  <SpinnerLoader />
                </div>
              )}
            </div>
            {data && (
              <div className="w-full  flex flex-wrap  gap-6 ">
                <div className="flex-1 min-w-[450px]" ref={contractChartRef}>
                  <ShadowContainer>
                    <div className="w-full flex justify-between items-center gap-5">
                      <div className="flex justify-center items-center gap-3">
                        <Image
                          src={"/images/graph.png"}
                          alt={"Speedo"}
                          width={40}
                          height={40}
                        />
                        <div className="font-bold text-xl text-muted-foreground">
                          Sales Distribution
                        </div>
                        <div
                          onClick={() => {
                            setgraphselector(1);
                          }}
                          className="flex item-center bg-muted  font-semibold text-muted-foreground p-2 gap-2 rounded-xl cursor-pointer text-sm"
                        >
                          <Image
                            src="/images/Filter_big.png"
                            alt=""
                            width={6}
                            height={6}
                            className="w-6 h-6 "
                          />{" "}
                          <p>Previous Years Comparison</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-row justify-around mt-3">
                      <div className="flex gap-4 items-center">
                        <div className="w-[8px] h-[8px] p-[3px] rounded-full bg-[#007AAA] "></div>
                        <div className="w-full text-muted-foreground text-sm font-medium">
                          Total
                        </div>

                        <div className="w-full text-base text-secondary-foreground">
                          {data?.contracts?.Total?.length
                            ? data?.contracts?.Total?.reduce(
                                (acc, item) => acc + Number(item),
                                0
                              )
                            : 0}
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="w-[8px] h-[8px] p-[3px] rounded-full bg-[#00ADEE] "></div>
                        <div className="w-full text-muted-foreground text-sm font-medium">
                          Used
                        </div>

                        <div className="w-full text-base text-secondary-foreground">
                          {data?.contracts?.Used?.length
                            ? data?.contracts?.Used?.reduce(
                                (acc, item) => acc + Number(item),
                                0
                              )
                            : 0}
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="w-[8px] h-[8px] p-[3px] rounded-full bg-[#7EDBFF] "></div>
                        <div className="w-full text-muted-foreground text-sm font-medium">
                          New
                        </div>
                        <div className="w-full text-base text-secondary-foreground">
                          {data?.contracts?.New?.length
                            ? data?.contracts?.New?.reduce(
                                (acc, item) => acc + Number(item),
                                0
                              )
                            : 0}
                        </div>
                      </div>
                    </div>
                    <Graph key={1} data={data} type="CS" />
                  </ShadowContainer>
                </div>
                <div className="flex-1 min-w-[450px]" ref={contractChartRef}>
                  <ShadowContainer>
                    <div className="flex justify-center space-x-4 mt-4">
                      <CustomButton
                        onClick={() => setActiveTab("SR")}
                        className={` ${
                          activeTab === "SR"
                            ? "bg-siteBlue text-white"
                            : "bg-gray-200 text-gray-600"
                        } text-[15px] rounded-lg flex justify-center items-center p-1 px-2`}
                      >
                        Service Redemption
                      </CustomButton>
                      <CustomButton
                        onClick={() => setActiveTab("SD")}
                        className={` ${
                          activeTab === "SD"
                            ? "bg-siteBlue text-white "
                            : "bg-gray-200 text-gray-600 "
                        } text-[15px] rounded-lg flex justify-center items-center p-1`}
                      >
                        Service Distribution
                      </CustomButton>
                    </div>
                    <div className="flex flex-col">
                      {activeTab === "SD" && (
                        <Graph key={2} data={data} type="SD" />
                      )}
                      {activeTab === "SR" && (
                        <Graph key={3} data={data} type="SR" />
                      )}
                    </div>
                  </ShadowContainer>
                </div>
              </div>
            )}
          </>
        )}
        {graphselector == 1 && (
          <>
            {comparedata && (
              <div className="w-full  grid grid-cols-2 gap-6">
                <div className="w-full" ref={contractChartRef}>
                  <ShadowContainer>
                    <div className=" flex justify-between items-center gap-5">
                      <div className="flex justify-center items-center gap-3">
                        <Image
                          src={"/images/graph.png"}
                          alt={"Speedo"}
                          width={40}
                          height={40}
                        />
                        <div className="font-bold text-xl text-muted-foreground">
                          Service Distribution
                        </div>
                        <div
                          onClick={() => {
                            setgraphselector(0);
                          }}
                          className="flex bg-[#F2F5F5] text-base font-semibold text-muted-foreground p-2 gap-2 rounded-xl cursor-pointer"
                        >
                          <Image
                            src="/images/Filter_big.png"
                            alt=""
                            width={0}
                            height={0}
                            className="w-6 h-6"
                          />{" "}
                          Current Year Comparison
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center mt-3">
                      <div className="flex gap-2 justify-center items-center w-full">
                        <Image
                          src="/images/marketplace.png"
                          alt=""
                          width={0}
                          height={0}
                          className="w-3 h-3"
                        />
                        <div className="text-muted-foreground text-sm font-medium">
                          Previous Year
                        </div>
                        {/* <div className="text-base text-secondary-foreground">46%</div> */}
                        <div className="text-base text-secondary-foreground">
                          {contractCompare?.previous}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-center items-center w-full">
                        <Image
                          src="/images/pending-remmitance.png"
                          alt=""
                          width={0}
                          height={0}
                          className="w-3 h-3"
                        />
                        <div className=" text-muted-foreground text-sm font-medium">
                          Current Year
                        </div>
                        {/* <div className=" text-base text-secondary-foreground">46%</div> */}
                        <div className=" text-base text-secondary-foreground">
                          {contractCompare?.current}
                        </div>
                      </div>
                    </div>
                    <Graph key={1} data={comparedata} type="CS2" />
                  </ShadowContainer>
                </div>
                <div className="w-full" ref={contractChartRef}>
                  <ShadowContainer>
                    <div className="flex justify-between items-center gap-5">
                      <div className="flex justify-center items-center gap-3">
                        <Image
                          src={"/images/graph.png"}
                          alt={"Speedo"}
                          width={40}
                          height={40}
                        />
                        <div className="font-bold text-xl text-muted-foreground">
                          Service Redemption
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center mt-3">
                      <div className="flex gap-2 justify-center items-center w-full">
                        <Image
                          src="/images/marketplace.png"
                          alt=""
                          width={0}
                          height={0}
                          className="w-3 h-3"
                        />
                        <div className="text-muted-foreground text-sm font-medium">
                          Previous Year
                        </div>
                        {/* <div className="text-base text-secondary-foreground">46%</div> */}
                        <div className="text-base text-secondary-foreground">
                          {servicesCompare?.previous}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-center items-center w-full">
                        <Image
                          src="/images/pending-remmitance.png"
                          alt=""
                          width={0}
                          height={0}
                          className="w-3 h-3"
                        />
                        <div className=" text-muted-foreground text-sm font-medium">
                          Current Year
                        </div>
                        {/* <div className=" text-base text-secondary-foreground">46%</div> */}
                        <div className=" text-base text-secondary-foreground">
                          {servicesCompare?.current}
                        </div>
                      </div>
                    </div>
                    <Graph key={2} data={comparedata} type="SR2" />
                  </ShadowContainer>
                </div>
              </div>
            )}
          </>
        )}

        {/* <div className={`flex gap-6 justify-around mt-[27px]`}> */}
        <div className={`grid gap-6 grid-cols-1 xl:grid-cols-3 mt-6  `}>
          {!data && loading ? (
            <SpinnerLoader />
          ) : (
            <>
              {contractService({
                title: "Upsell from services",
                value: isNaN(parseFloat(data?.dashboard_upsell.UpsellAmount))
                  ? "$ 0.00"
                  : `$ ${parseFloat(
                      data?.dashboard_upsell.UpsellAmount
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`,
              })}
              {contractService({
                title: "Contract to Service multiple",
                value: dealerredemption?.Servicemultiple
                  ? dealerredemption?.Servicemultiple
                  : "$ 0.00",
              })}
              {contractService({
                title: "Contract to Unique Visit multiple",
                value: data?.UniqueVisit ? data?.UniqueVisit : "$ 0.00",
              })}
            </>
          )}
        </div>
        {/* Service Distribution Timeline */}
        {pcpBreakdown ? (
          <div className="flex-1 min-w-[450px] mt-6">
            <ServiceDistributionTimeline
              isPcpBreakdownGraph={isPcpBreakdownGraph}
              pcpBreakdownGraph={pcpBreakdownGraph}
              pcpBreakdown={pcpBreakdown}
              displayDates={displayDates}
              loading={loading}
            />
          </div>
        ) : rowLoader ? (
          <div className={"mt-6"}>
            <ShadowContainer>
              {isPcpBreakdownGraph && (
                <div>
                  {loading && isPcpBreakdownGraph ? (
                    <div className="flex justify-center">
                      <SpinnerLoader />
                    </div>
                  ) : (
                    <ContractDistributionGraph
                      pcpBreakdownGraph={pcpBreakdownGraph}
                    />
                  )}
                </div>
              )}
            </ShadowContainer>
          </div>
        ) : null}
        <div className="comparison-container mt-6"></div>
        {data30days && (
          <div className="w-full">
            <ShadowContainer>
              <div className="text-xl my-2">30 Days Comparison</div>
              <div className="flex grid-cols-5 gap-4 justify-center items-center flex-wrap lg:flex-nowrap">
                {data30days?.CurrentThirtyday?.classic &&
                data30days?.LastThirtyday?.classic ? (
                  <Comparison
                    current30={data30days?.CurrentThirtyday?.classic}
                    last30={data30days?.LastThirtyday?.classic}
                    text="Classic"
                  />
                ) : (
                  ""
                )}

                {data30days?.CurrentThirtyday?.complimentary &&
                data30days?.LastThirtyday?.complimentary ? (
                  <Comparison
                    current30={data30days?.CurrentThirtyday?.complimentary}
                    last30={data30days?.LastThirtyday?.complimentary}
                    text="Complimentary"
                  />
                ) : (
                  ""
                )}

                {data30days?.CurrentThirtyday?.express &&
                data30days?.LastThirtyday?.express ? (
                  <Comparison
                    current30={data30days?.CurrentThirtyday?.express}
                    last30={data30days?.LastThirtyday?.express}
                    text="Express"
                  />
                ) : (
                  ""
                )}

                {data30days?.CurrentThirtyday?.subscriptions &&
                data30days?.LastThirtyday?.subscriptions ? (
                  <Comparison
                    current30={data30days?.CurrentThirtyday?.subscriptions}
                    last30={data30days?.LastThirtyday?.subscriptions}
                    text="Subscriptions"
                  />
                ) : (
                  ""
                )}

                {data30days?.CurrentThirtyday?.marketplace &&
                data30days?.LastThirtyday?.marketplace ? (
                  <Comparison
                    current30={data30days?.CurrentThirtyday?.marketplace}
                    last30={data30days?.LastThirtyday?.marketplace}
                    text="Marketplace"
                  />
                ) : (
                  ""
                )}
              </div>
            </ShadowContainer>
          </div>
        )}
        {/* {reservedGraphData?.drawtrendline?.googledata && (
          <div ref={trendLineRef} className="w-1/2">
            {drawtrendline ? null : <Drawtrendline />}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ContractsSold;
