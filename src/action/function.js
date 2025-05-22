import { fetchPostObj } from "@/utils/action/function";

export const isAllowed = async ({
  controller_name,
  function_name,
  auth,
  Token,
}) => {
  const data = {
    controller_name,
    function_name,
  };
  const res = await fetchPostObj({
    api: `loginreactcopy/allowmenu`,
    auth,
    Token,
    data,
  });
  return res;
};
