import { GlobalContext } from "@/app/Provider";
import { fetchPost, fetchPostObj } from "@/utils/action/function";
import { formatDate, objectToFormData } from "@/utils/helpers";
import React, { useContext } from "react";
import { DashboardContext } from "../../DashboardContext";
import { jsonToExcel } from "@/utils/generateExcel";

const Details = ({
  text,
  value,
  Icon,
  export_type,
  reportName,
  monthbefore = 0,
  submonthbefore = 0,
  IsSubscription,
  IsMarketPlace,
  SearchType,
  AllContractStatus,
  ContractStatus,
}) => {
  const { auth, Token } = useContext(GlobalContext);
  const { dealersetting, startdate, enddate, FixedDateParameter } =
    useContext(DashboardContext);
  const exportRetensionMap = async () => {
    const formdata = new FormData();
    const data = {
      ...auth,
      export_type,
      FromDate: formatDate(startdate),
      ToDate: formatDate(enddate),
      DealerID: dealersetting?.dealer?.DealerID,
      FixedDateParameter,
      monthbefore,
      submonthbefore,
      IsSubscription,
      IsMarketPlace,
      SearchType,
      AllContractStatus,
    };
    if (ContractStatus?.active) {
      formdata.append("ContractStatus[]", "L");
      formdata.append("ContractStatus[]", "S");
    }
    if (ContractStatus?.pending) {
      formdata.append("ContractStatus[]", "I");
    }
    if (ContractStatus?.cancelled) {
      formdata.append("ContractStatus[]", "C");
    }
    if (ContractStatus?.pendingmatured) {
      formdata.append("ContractStatus[]", "P");
    }
    if (ContractStatus?.matured) {
      formdata.append("ContractStatus[]", "M");
    }
    const mergeFormdata = objectToFormData(data, formdata);
    const res = await fetchPost({
      formdata: mergeFormdata,
      api: "dashboard/retentionmapexport",
      token: Token,
      showToast: true,
      spinner: true,
    });
    if (res && res[reportName]?.length) {
      jsonToExcel(res[reportName], res.report_name);
    }
  };
  return (
    <div className="w-full flex flex-row justify-between border-b border-border text-sm">
      <div className="flex items-center space-x-1">
        {Icon && Icon}
        <p className="text-card-foreground"> {text}</p>
      </div>
      <div className="flex gap-10 items-center">
        <div className="font-semibold">{value}</div>
        {value && export_type ? (
          <div
            onClick={exportRetensionMap}
            className="text-muted-foreground hover:text-foreground Transition cursor-pointer hover:scale-105"
          >
            Detail
          </div>
        ) : (
          <div className="w-[40px]"></div>
        )}
      </div>
    </div>
  );
};

export default Details;
