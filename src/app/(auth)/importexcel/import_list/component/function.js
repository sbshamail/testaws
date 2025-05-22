import { fetchPostObj } from "@/utils/action/function";

export const fetchImportExport = async ({
  auth,
  data,
  Token,
  setLoading,

  dispatch,
  selector,
}) => {
  const res = await fetchPostObj({
    api: "importexcel/import_list",
    auth,
    Token,
    data,
    dispatch,
    fetchSelector: selector,
    setLoading,
    showToast: true,
  });
  return res;
};
