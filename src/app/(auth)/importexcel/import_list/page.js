"use client";
import React, { useContext, useState } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";

import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import FormImportExcel from "./component/FormImportExcel";
import { AdminLayoutContext } from "@/app/(auth)/layout";

//redux
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { GlobalContext } from "@/app/Provider";
import ImportExcelTable from "./component/ImportExcelTable";

const Page = () => {
  const { auth, Token } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [FixedDateParameter, setFixedDateParameter] = useState("ITD");
  const { defaultDealerID, admindealeroptions } =
    useContext(AdminLayoutContext);
  const [values, setValues] = useState({
    DealerID: defaultDealerID,
    FromDate: "",
    ToDate: "",
    offset: 0,
  });

  const dispatch = useDispatch();
  const importListSelector = setReducer("importList");
  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />
      <div className=" flex flex-col gap-6 w-full ">
        <h1 className="font-bold text-xl my-2 mt-10">
          CONTRACT - IMPORT CONTRACTS
        </h1>
        <FormImportExcel
          dispatch={dispatch}
          selector={importListSelector}
          setLoading={setLoading}
          auth={auth}
          Token={Token}
          FixedDateParameter={FixedDateParameter}
          setFixedDateParameter={setFixedDateParameter}
          values={values}
          setValues={setValues}
          admindealeroptions={admindealeroptions}
        />

        <div className="">
          <ImportExcelTable />
        </div>
      </div>
    </PageContainer>
  );
};

export default Page;
