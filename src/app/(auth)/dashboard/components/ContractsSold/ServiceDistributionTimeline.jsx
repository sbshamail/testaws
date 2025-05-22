import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import SpinnerLoader from "@/app/Components/SpinnerLoader";
import Image from "next/image";
import React from "react";
import ContractDistributionGraph from "./ContractDistributionGraph";

const ServiceDistributionTimeline = ({
  isPcpBreakdownGraph,
  pcpBreakdownGraph,
  pcpBreakdown,
  displayDates,
  loading,
}) => {
  const pcpBreakdownList = [
    ["/images/pending-remmitance.png", "Classic", "Classic", "Classic"],
    ["/images/comp.png", "Complimentary", "Complimentary", "Complimentary"],
    ["/images/express.png", "Express", "Express", "Express"],
    ["/images/cancelled.png", "GPS", "GPS", "GPS"],
    ["/images/active.png", "Loyalty Cash", "Loyalty Cash", "Loyalty Cash"],
    [
      "/images/active.png",
      "Loyalty Points",
      "Loyalty Points",
      "Loyalty Points",
    ],
    //   [
    //   "/images/express.png",
    //   "Subscription",
    //   "Subscription",
    //   "subscriptions",
    // ],
    // [
    //   "/images/marketplace.png",
    //   "Marketplace",
    //   "marketplace_per",
    //   "TotalMarketPlace",
    // ],
    // [
    //   "/images/express.png",
    //   "Subscription",
    //   "subscriptions_per",
    //   "subscriptions",
    // ],
  ];
  const pcpBreakdownValue = (image, title, valuePer, value, api = "pie") => {
    if (
      !pcpBreakdown ||
      !pcpBreakdown[api] ||
      !pcpBreakdown[api][value] ||
      pcpBreakdown[api][value] == 0
    )
      return null;
    return (
      <div className="w-max flex items-center gap-3 ">
        <Image src={image} alt="" width={0} height={0} className="w-3 h-3" />
        <div className="w-max text-muted-foreground text-sm font-medium">
          {title}
        </div>
        <div className="flex  gap-2">
          <div className="w-full text-base text-secondary-foreground">
            {pcpBreakdown[api][valuePer]
              ? `${pcpBreakdown[api][valuePer]}%`
              : ""}
          </div>
          <div className="w-full text-base text-secondary-foreground">
            {pcpBreakdown[api][value] ? pcpBreakdown[api][value] : ""}
          </div>
        </div>
      </div>
    );
  };
  // console.log(pcpBreakdown);
  return (
    <ShadowContainer>
      <div className="w-full ">
        <div className="w-full flex flex-wrap justify-between items-center gap-5 ">
          <div className="flex justify-center flex-wrap items-center gap-5">
            <Image
              src={"/images/graph.png"}
              alt={"Speedo"}
              width={40}
              height={40}
            />
            <div className="font-bold text-xl text-muted-foreground">
              Service Distribution Timeline{" "}
            </div>{" "}
            <div className="font-normal text-xs text-card-foreground">
              {displayDates}
            </div>
            <div className="font-bold text-xl text-muted-foreground">
              Total Contracts:{" "}
              {pcpBreakdown?.PcpBreakDown?.Total.toLocaleString()}
            </div>{" "}
          </div>
          {/* <div
          // onClick={() => {
          //   setgraphselector(1);
          // }}
          className="flex bg-[#F2F5F5] text-base font-semibold text-muted-foreground p-2 gap-2 rounded-xl cursor-pointer"
        >
          <Image
            src="/images/Filter_big.png"
            alt=""
            width={0}
            height={0}
            className="w-6 h-6"
          />{" "}
          Previous Years Comparison
        </div> */}
        </div>
        <div className="flex flex-wrap gap-4 mt-4 mx-2">
          {pcpBreakdownList.map((item) =>
            pcpBreakdownValue(item[0], item[1], item[2], item[3], item[4])
          )}
        </div>
        {isPcpBreakdownGraph && (
          <div>
            {loading && pcpBreakdownGraph ? (
              <div className="flex justify-center ">
                <SpinnerLoader />
              </div>
            ) : (
              <ContractDistributionGraph
                pcpBreakdownGraph={pcpBreakdown?.pie}
              />
            )}
          </div>
        )}
      </div>
    </ShadowContainer>
  );
};

export default ServiceDistributionTimeline;
