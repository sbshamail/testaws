import { fetchPost } from "@/utils/action/function";
import { objectToFormData } from "@/utils/helpers";
import { formatDate } from "@/utils/helpers";

//function saveSelectionPaidOut
export const saveSelectionPaidOut = async ({
  redem,
  auth,
  Token,
  DealerID,
  FormDate,
  ToDate,
  FixedDateParameter,
  offset,
  ReportDropDown,
  checkno,
  fetchReports,
}) => {
  let formdata = new FormData();
  Object.keys(redem).forEach((coupanId) => {
    if (redem[coupanId] === true) {
      formdata.append(`redem[${coupanId}]`, coupanId);
    } else if (redem[coupanId] === false) {
      formdata.append(`uncheckredem[${coupanId}]`, coupanId);
    }
  });
  const objToForm = {
    ...auth,
    DealerID,
    FormDate,
    ToDate,
    FixedDateParameter,
    offset,
    ReportDropDown,
    paidoutdate: formatDate(new Date()),
    checkno,
    TerritoryCode: "-1",
  };
  objectToFormData(objToForm, formdata);

  const res = await fetchPost({
    url: "https://mypcp.us/webservices/reports/paidout",
    token: Token,
    formdata,
    showToast: true,
  });
  if (res) {
    fetchReports({});
  }
};
