import { fetchPostObj } from "@/utils/action/function";

export const fetchCustomer = async ({
  auth,
  Token,
  ContractID,
  customer_id,
  dispatch,
  reducer,
}) => {
  delete auth?.pcp_user_id;
  const data = { ContractID, CustomerID: customer_id, IsGuest: "0" };
  const res = await fetchPostObj({
    auth,
    Token,
    data,
    api: "customer/home",
    spinner: true,
    dispatch,
    fetchSelector: reducer,
  });
};
