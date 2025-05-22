"use client";
import React, {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { fetchPost } from "@/utils/action/function";
import { useDispatch } from "react-redux";
import { GlobalContext } from "@/app/Provider";

import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";

export const UserContext = createContext({
  values: null,
  setValues: () => {},
  setLoading: () => {},
});
const UserProvider = ({ children }) => {
  const { Token } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    DealerID: "-1",
    user_level: "",
    user_status: "",
    isprimaryaccount: "",
    user_name_search: "",
    user_email_search: "",
  });

  const dispatch = useDispatch();
  const userTitlesSelector = setReducer("usertitles");
  const userStatusSelector = setReducer("userstatus");
  const primaryAccountSelector = setReducer("primaryaccount");
  const userRolesSelector = setReducer("userRoles");

  useEffect(() => {
    const getData = async () => {
      await fetchPost({
        token: Token,
        api: "users/usertitles",
        method: "GET",
        dispatch,
        fetchSelector: userTitlesSelector,
        isValue: true,

        // cache: true,
      });
      await fetchPost({
        token: Token,
        api: "users/userstatus",
        method: "GET",
        dispatch,
        fetchSelector: userStatusSelector,
        isValue: true,
        // cache: true,
      });
      await fetchPost({
        token: Token,
        api: "users/primaryaccount",
        method: "GET",
        dispatch,
        fetchSelector: primaryAccountSelector,
        isValue: true,
        // cache: true,
      });
      await fetchPost({
        token: Token,
        api: "users/roles",
        method: "GET",
        dispatch,
        fetchSelector: userRolesSelector,
        isValue: true,
        // cache: true,
      });
    };
    getData();
  }, []);
  return (
    <UserContext.Provider value={{ values, setValues, setLoading }}>
      <SpinnerCenterScreen loading={loading} />
      <div>{children}</div>
    </UserContext.Provider>
  );
};

export default UserProvider;
