"use client";
import { useState, useContext, createContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import NotFound from "../not-found";
import { GlobalContext } from "../Provider";
import LayoutAuth from "./LayoutAuth";
import { showSpinner } from "@/components/cui/loader/SpinnerPortal";
import LogEventsProvider from "@/lib/LogEventsProvider";

export const AdminLayoutContext = createContext(null);
export default function Layout({ children }) {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE, auth, isCustomerLogin } =
    useContext(GlobalContext);
  const { EnableAllDealership, DefaultDealerID } = GLOBAL_RESPONSE || {};

  const defaultDealerID =
    !DefaultDealerID || DefaultDealerID == "0" ? "-1" : DefaultDealerID;
  let dealerOptions =
    GLOBAL_DEALERS_INFO?.map((dealer) => {
      return { text: dealer.DealerTitle, value: dealer.DealerID };
    }) || [];

  let admindealeroptions = [...dealerOptions];
  EnableAllDealership == "1"
    ? (admindealeroptions = [
        { text: "ALL DEALERSHIP", value: "-1" },
        ...dealerOptions,
      ])
    : admindealeroptions;

  const [admindealer, setadmindealer] = useState(defaultDealerID);
  const [adminsearchby, setadminsearchby] = useState("VIN");
  const [adminsearch, setadminsearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [admincontracts, setadmincontracts] = useState(null);

  useEffect(() => {
    setadmindealer(defaultDealerID);
  }, [defaultDealerID]);
  const path = usePathname();
  if (!auth) {
    return showSpinner(true);
  } else if (isCustomerLogin) {
    return <NotFound />;
  }
  if (path.includes("print")) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <AdminLayoutContext.Provider
      value={{
        defaultDealerID: defaultDealerID,
        admindealer: admindealer,
        setadmindealer: setadmindealer,
        admindealeroptions: admindealeroptions,
        adminsearchby: adminsearchby,
        setadminsearchby: setadminsearchby,
        adminsearch: adminsearch,
        setadminsearch: setadminsearch,
        admincontracts: admincontracts,
        setadmincontracts: setadmincontracts,
      }}
    >
      <LogEventsProvider />
      <LayoutAuth loading={loading} setLoading={setLoading}>
        {children}
      </LayoutAuth>
    </AdminLayoutContext.Provider>
  );
}
