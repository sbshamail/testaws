"use client";
import React, { useContext, useState, useEffect } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";

import { AdminLayoutContext } from "../../layout";
import { GlobalContext } from "@/app/Provider";
import Form from "../index/Form";
import Table from "../index/Table";
import Summary from "../index/Summary";

const Page = () => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { admindealeroptions, admincontracts } = useContext(AdminLayoutContext);
  const [offSet, setOffSet] = useState(0);

  const [refresh, setrefresh] = useState(false);
  const [contracts, setcontracts] = useState(admincontracts);

  useEffect(() => {
    setcontracts(admincontracts);
  }, [admincontracts]);

  return (
    <PageContainer>
      <div className="w-full flex justify-between gap-5">
        <Form
          admindealeroptions={admindealeroptions}
          setcontracts={setcontracts}
          setOffSet={setOffSet}
        />
        <Summary contracts={contracts} />
      </div>
      <Table contracts={contracts} admincontracts={admincontracts} />
    </PageContainer>
  );
};

export default Page;
