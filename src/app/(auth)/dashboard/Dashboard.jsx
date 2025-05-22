"use client";
import React, { useContext, Suspense } from "react";
import Div1 from "./components/Div1/Div1";
import Div2 from "./components/Div2/Div2";
import Div3 from "./components/Div3/Div3";
import Div3_1 from "./components/Div3_1/Div3_1";
import ReservedInfo from "./components/ReservedInfo/ReservedInfo";
import CustomerInteraction from "./components/CustomerInteraction/CustomerInteraction";

import ContractsSold from "./components/ContractsSold/ContractsSold";

import RetentionMap from "./components/RetentionMap/RetentionMap";
import Div1_1 from "./components/Div1_1/Div1_1";
import { DashboardContext } from "./DashboardContext";
import DealerRedemptionRows from "./components/DealerRedemptionRows/DealerRedemptionRows";
import InceptionDate from "./components/InceptionDate";
import SpinnerLoader from "@/app/Components/SpinnerLoader";

const Dashboard = ({ auth, Token }) => {
  const { dealersetting } = useContext(DashboardContext);

  return (
    auth && (
      <>
        <Div1 auth={auth} Token={Token} />
        <InceptionDate />
        <Div1_1 />
        {/* Total Contract Sold */}
        {dealersetting && <Div3 />}
        <div className="w-full  grid grid-cols-12 gap-6 ">
          {/* Contracts Breakdown */}

          <Div3_1
            className="xlg:col-span-9 col-span-12 h-auto"
            auth={auth}
            Token={Token}
          />

          {/* App Usuage */}
          <CustomerInteraction
            className={"xlg:col-span-3 col-span-12 h-auto"}
          />
        </div>
        {dealersetting && (
          <>
            <DealerRedemptionRows />
            <ReservedInfo />

            {/* pcp breakdown */}
            {/* Sales Distribution */}
            <ContractsSold />
          </>
        )}
        {/* <LastMonthSummary /> not used*/}
        {dealersetting && (
          <Suspense fallback={<SpinnerLoader />}>
            <RetentionMap />
          </Suspense>
        )}
        <Div2 />
      </>
    )
  );
};

export default Dashboard;
