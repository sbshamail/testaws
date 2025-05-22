"use client";
import React, { useContext, useState, useEffect } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import { AdminLayoutContext } from "../../layout";
import Form from "./Form";
import Table from "./Table";
import Summary from "./Summary";
import Legends from "./Legends";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";

const Page = () => {
  const { admindealeroptions, admincontracts } = useContext(AdminLayoutContext);
  const [contracts, setcontracts] = useState(admincontracts);
  const [offSetData, setOffSetData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(20);
  const [loading, setloading] = useState(false);
  const [mount, setMount] = useState(false);
  const [contract, setcontract] = useState("");
  useEffect(() => {
    setcontracts(admincontracts);
  }, [admincontracts, offSetData]);

  // console.log("TAKEN", offSet);
  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />
      <div className="w-full flex flex-col justify-between gap-5 mt-10">
        <Form
          admindealeroptions={admindealeroptions}
          setcontracts={setcontracts}
          offSetData={offSetData}
          setOffSetData={setOffSetData}
          setCurrentPage={setCurrentPage}
          loading={loading}
          setloading={setloading}
          contract={contract}
          setcontract={setcontract}
          mount={mount}
          dataLimit={dataLimit}
        />
        <Summary contracts={contracts} />
      </div>

      <ShadowContainer className="w-full mt-6">
        <Table
          contracts={contracts}
          admincontracts={admincontracts}
          setOffSetData={setOffSetData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          dataLimit={dataLimit}
          setDataLimit={setDataLimit}
          setMount={setMount}
          loading={loading}
        />
        <div className="mt-10">
          <Legends
            contract={contract}
            setcontract={setcontract}
            setMount={setMount}
          />
        </div>
      </ShadowContainer>
    </PageContainer>
  );
};

export default Page;
// clg
