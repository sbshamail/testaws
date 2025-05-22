"use client";
import { createContext, useState, useEffect, Suspense } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { useQuery } from "@/lib/hooks";
import { usePathname } from "next/navigation";
export const GlobalContext = createContext(null);
function Provider({ children }) {
  const { addQuery } = useQuery();
  const pathname = usePathname();

  const router = useRouter();
  const [globalResponse, setGlobalResponse] = useState(null);
  const [globalMenusInfo, setGlobalMenusInfo] = useState(null);
  const [globalDealersInfo, setGlobalDealersInfo] = useState(null);
  const [globalState, setGlobalState] = useState(null);
  const [globalLoader, setGlobalLoader] = useState(false);
  const [Token, setToken] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [batchIdNew, setBatchIdNew] = useState(null);
  const [tempLoyaltyPoints, setTempLoyaltyPoints] = useState(null);
  const [customerLogin, setCustomerLogin] = useState(false);
  useEffect(() => {
    const localStorageResponse = localStorage.getItem("GLOBAL_RESPONSE");
    if (localStorageResponse) {
      const res = JSON.parse(localStorageResponse);

      setToken(res.Token);
      const authUser = {
        pcp_user_id: res?.pcp_user_id,
        role_id: res?.user_cizacl_role_id,
        user_id: res?.user_id,
      };
      setAuth(authUser);
      setGlobalResponse(JSON.parse(localStorageResponse));
      if (!res?.pcp_user_id) {
        setCustomerLogin(true);
      } else {
        setCustomerLogin(false);
      }
      // now used in when login attempt
      const auth = JSON.stringify(authUser);
      // ✅ Set cookies on the client-side
      document.cookie = `Token=${res.Token}; path=/; `;
      document.cookie = `auth=${auth}; path=/; `;
    } else {
      const query = addQuery(
        "redirectTo",
        pathname === "/login" ? "/dashboard" : pathname
      );
      router.push(`/login/?${query}`);
    }
  }, [router]);

  useEffect(() => {
    const localStorageMenus = localStorage.getItem("GLOBAL_MENUS_INFO");
    if (localStorageMenus) {
      setGlobalMenusInfo(JSON.parse(localStorageMenus));
    }
  }, []);

  useEffect(() => {
    const localStorageDealers = localStorage.getItem("GLOBAL_DEALERS_INFO");
    if (localStorageDealers) {
      setGlobalDealersInfo(JSON.parse(localStorageDealers));
    }
  }, []);

  useEffect(() => {
    if (globalResponse) {
      localStorage.setItem("GLOBAL_RESPONSE", JSON.stringify(globalResponse));
    }
  }, [globalResponse]);

  useEffect(() => {
    if (globalMenusInfo) {
      localStorage.setItem(
        "GLOBAL_MENUS_INFO",
        JSON.stringify(globalMenusInfo)
      );
    }
  }, [globalMenusInfo]);

  useEffect(() => {
    if (globalDealersInfo) {
      localStorage.setItem(
        "GLOBAL_DEALERS_INFO",
        JSON.stringify(globalDealersInfo)
      );
    }
  }, [globalDealersInfo]);

  const GlobalLoader = () => <SpinnerCenterScreen loading={globalLoader} />;

  return (
    <GlobalContext.Provider
      value={{
        GLOBAL_RESPONSE: globalResponse,
        SET_GLOBAL_RESPONSE: setGlobalResponse,
        GLOBAL_MENUS_INFO: globalMenusInfo,
        SET_GLOBAL_MENUS_INFO: setGlobalMenusInfo,
        GLOBAL_DEALERS_INFO: globalDealersInfo,
        SET_GLOBAL_DEALERS_INFO: setGlobalDealersInfo,
        globalLoader: globalLoader,
        setGlobalLoader: setGlobalLoader,
        auth: auth,
        SET_AUTH: setAuth,
        SET_TOKEN: setToken,
        isCustomerLogin: customerLogin,
        Token: Token,
        globalState: globalState,
        setGlobalState: setGlobalState,
        isSidebarOpen: isSidebarOpen,
        setIsSidebarOpen: setIsSidebarOpen,
        setBatchIdNew: setBatchIdNew,
        batchIdNew: batchIdNew,
        setTempLoyaltyPoints: setTempLoyaltyPoints,
        tempLoyaltyPoints: tempLoyaltyPoints,
      }}
    >
      <GlobalLoader />
      {children}
    </GlobalContext.Provider>
  );
}
export default Provider;

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <Suspense fallback={<SpinnerCenterScreen loading={true} />}>
        {children}
      </Suspense>
    </NextUIProvider>
  );
}
