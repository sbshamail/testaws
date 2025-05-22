import React, { useContext, useEffect, useRef, useState } from "react";

import { GlobalContext } from "@/app/Provider";

import ReportTable from "./ReportTable";
import { loadMoreButton } from "../functions";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { jsonToExcel } from "@/utils/generateExcel";
import DancingDotLoading from "@/components/cui/loader/DancingDotLoading";
import { useReactToPrint } from "react-to-print";
import FullScreen from "@/components/cui/layout/FullScreen";
import ServiceRedemptionPaidout from "./ServiceRedemptionPaidout";
//fn
import { saveSelectionPaidOut } from "./function";
import Header from "./Header";
const ServiceRedemption = ({
  loading,
  responseState,
  fetchReports,
  createPdf,
  createPdfLoading,
  DealerID,
  FormDate,
  ToDate,
  FixedDateParameter,
}) => {
  const { auth, Token } = useContext(GlobalContext);
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({
    documentTitle: "Going Matured Contracts",
    contentRef: contentRef,
  });
  const [data, setData] = useState([]);
  const [totalEntry, setTotalEntry] = useState([]);
  // states of paidout api
  const [redem, setRedem] = useState({});
  const [checkno, setCheckno] = useState("");
  // handle seperately data and pagination
  useEffect(() => {
    setCheckno("");
    setRedem([]);
    if (responseState.length === 0) {
      setData([]);
      setTotalEntry([]);
    }
    if (responseState?.offset <= 20) {
      setData(responseState.res.CouponRedemption);
      setTotalEntry(responseState.res.TotalEntry);
    } else if (responseState?.res?.CouponRedemption) {
      setData((prev) => [...prev, ...responseState.res.CouponRedemption]);
    }
  }, [responseState]);

  return (
    data && (
      <div
        className="flex flex-col  mt-5 relative  shadow-lg rounded-lg py-6"
        ref={contentRef}
      >
        <FullScreen offScreenClass={"mx-4"}>
          <Header totalEntry={totalEntry} />
          <ReportTable
            data={data}
            redem={redem}
            setRedem={setRedem}
            contentRef={contentRef}
          />
          {data.length > 0 && (
            <div className="w-full mt-2">
              {/* Service Redemption Paidouts */}
              <ServiceRedemptionPaidout
                redem={redem}
                setCheckno={setCheckno}
                checkno={checkno}
                data={data}
              />
              {/* load more */}
              {loadMoreButton(responseState, fetchReports, loading)}
              <div className="mt-6">
                <div className="printNone">
                  <div className="flex justify-end items-end gap-4 px-4 ">
                    <CustomButton
                      className={"font-bold"}
                      variant="main"
                      onClick={createPdf}
                    >
                      {createPdfLoading ? DancingDotLoading : "Generate PDF"}
                    </CustomButton>
                    <CustomButton variant="main" onClick={reactToPrintFn}>
                      Print Report
                    </CustomButton>

                    <CustomButton
                      className={"font-bold"}
                      variant="main"
                      onClick={() => {
                        jsonToExcel(data), "Authenticom Points Duplicate";
                      }}
                    >
                      Export Report
                    </CustomButton>
                    <CustomButton
                      variant="main"
                      onClick={() =>
                        saveSelectionPaidOut({
                          auth,
                          Token,
                          redem,
                          offset: responseState?.offset,
                          ReportDropDown: responseState?.res?.ReportDropDown,
                          DealerID,
                          FormDate,
                          ToDate,
                          FixedDateParameter,
                          checkno,
                          fetchReports,
                        })
                      }
                    >
                      Save Selection
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </FullScreen>
      </div>
    )
  );
};

export default ServiceRedemption;
