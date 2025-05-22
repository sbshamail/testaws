import { fetchPostObj } from "@/utils/action/function";

export const postSearchUser = async ({
  pathname,
  router,
  auth,
  Token,
  values,
  dispatch,
  usersSelector,
  setLoading,
}) => {
  if (pathname && pathname != "/users/index") {
    router.push("/users/index");
  }
  const res = await fetchPostObj({
    auth,
    Token,
    api: "users/index",
    data: { ...values, DealerID: values.DealerID ?? "-1" },
    dispatch,
    fetchSelector: usersSelector,
    setLoading,
    showToast: true,
  });
};
