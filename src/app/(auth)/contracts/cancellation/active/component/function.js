import { fetchPostObj } from "@/utils/action/function";
import { openHtmlInNewTab } from "@/utils/helpers";

export const recalculate = async ({ auth, Token, formData, setState }) => {
  const res = await fetchPostObj({
    api: "contracts/cancellationdetail",
    auth,
    Token,
    data: formData,
    spinner: true,
    setState,
  });
  return res;
};

export const handlePrintCancellationData = async ({
  ContractID,
  auth,
  Token,
}) => {
  const data = {
    ContractID,
  };
  const res = await fetchPostObj({
    auth,
    Token,
    api: "marketing/printcancelcontract",
    spinner: true,
    data,
  });
  if (res) {
    openHtmlInNewTab(res.html);
  }
};
