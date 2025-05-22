import React, { useContext, useState, useEffect, useRef } from "react";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Input from "@/app/Components/Inputs/Input";
import ShowbySelector from "./ShowbySelector";
import { GlobalContext } from "@/app/Provider";
import SearchSelect from "@/app/Components/Inputs/SearchSelect";

import toast from "react-hot-toast";
import { formatDate, Toastify } from "@/utils/helpers";
import DancingLoadingButton from "@/components/cui/button/DancingLoadingButton";
import FixedDateParameterButton from "@/components/FixedDateParameterButton";
import Select from "@/app/Components/Inputs/Select";

const searchbyuserlist = [
  { text: "All Contracts", value: 0 },
  { text: "Ghost Contracts", value: 3 },
  { text: "Maintenance Contracts", value: 4 },
  { text: "GPS", value: 5 },
  { text: "GPS Not Connected", value: 6 },
  { text: "GPS Connected", value: 7 },
  { text: "Loyalty Program", value: 8 },
  { text: "Guest Contract", value: 1 },
  { text: "All Paused Contracts", value: 9 },
  { text: "GPS Pre-Load", value: 10 },
  { text: "VSS Contracts", value: 2 },
];
const datetypelist = [
  { text: "Sale Date", value: 1 },
  { text: "Posted Date", value: 2 },
];
const Form = ({
  admindealeroptions,
  setcontracts,
  offSetData,
  setCurrentPage,
  loading,
  setloading,
  contract,
  setcontract,
  dataLimit,
  mount,
}) => {
  const didMount = useRef(false);
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);

  const [dealer, setdealer] = useState("");
  const [FixedDateParameter, setFixedDateParameter] = useState("MTD");
  const [searchbyuser, setsearchbyuser] = useState(0);

  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [datetype, setdatetype] = useState("");
  const fetchContracts = ({ dateParameter, date, offSet = "0" }) => {
    if (offSet === "0") {
      setCurrentPage(1);
    }
    let FromDate = "";
    let ToDate = "";

    let fixedDateParameter = FixedDateParameter;
    if (dateParameter) {
      fixedDateParameter = dateParameter;
      setFixedDateParameter(dateParameter);
      setstartdate(null);
      setenddate(null);
    } else {
      FromDate = startdate ? formatDate(startdate) : "";
      ToDate = enddate ? formatDate(enddate) : "";
    }
    if (date) {
      fixedDateParameter = "";
      setFixedDateParameter("");
      if (!FromDate && !ToDate) {
        return toast.error("Please select a date");
      }
    }
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE || {};

    if (!pcp_user_id || !user_cizacl_role_id || !user_id || !Token) {
      return;
    }
    if (!dealer) {
      toast.error("Please select a dealer");

      return;
    }

    setloading(true);
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealer);
    formdata.append("from_date", FromDate);
    formdata.append("to_date", ToDate);
    formdata.append("FixedDateParameter", fixedDateParameter);
    formdata.append("offset", offSet.toString()); // Ensure using latest offset
    formdata.append("perpage", dataLimit);
    // Handle markservies_filter
    formdata.append("markservies_filter", contract === "MS" ? 1 : "");

    // Handle PerpetualPlan_filter
    formdata.append("PerpetualPlan_filter", contract === "PC" ? 1 : "");
    formdata.append("MaintananceProductContract", contract === "1" ? 1 : "");

    // Handle status_filter
    if (contract !== "MS" && contract !== "PC" && contract !== "1") {
      formdata.append("status_filter", contract === "all" ? "" : contract);
    }

    formdata.append("SearchContractBy", datetype);
    formdata.append("searchby", searchbyuser);

    fetch("https://mypcp.us/webservices/contracts/contractlist", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setloading(false);
        if (res.success === 1 && res?.contracts?.length > 0) {
          Toastify("success", "Contracts Found");
          setcontracts(res);
          return;
        } else {
          setcontracts([]);
          return Toastify("error", "Contracts Not Found");
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't get Contracts err3");
        console.log(error);
      });
  };

  useEffect(() => {
    if (didMount.current) {
      fetchContracts({ offSet: offSetData });
    } else {
      didMount.current = true; // Block the first run
    }
  }, [mount]);

  return (
    <div className="w-full">
      <ShadowContainer>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full grid  xl:grid-cols-4 xlg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            <div className="w-full rounded-md">
              <Select
                onlyLabel="Dealer"
                value={dealer}
                setvalue={setdealer}
                options={admindealeroptions}
                placeholder="Select Account"
                width={"full"}
              />
            </div>
            <div className="w-full">
              <Select
                onlyLabel="Search By"
                value={searchbyuser}
                setvalue={setsearchbyuser}
                options={searchbyuserlist}
                placeholder="Search By"
                width={"full"}
              />
            </div>

            <div className="w-full">
              <SearchSelect
                label="By Date"
                value={datetype}
                setvalue={setdatetype}
                options={datetypelist}
                list={datetypelist}
                placeholder="By Date"
                width={"full"}
              />
            </div>
            <div className="w-full ">
              <ShowbySelector value={contract} setvalue={setcontract} />
            </div>
            <div className="w-full">
              <Input
                label="Start Date"
                value={startdate}
                setvalue={setstartdate}
                type="date"
                placeholder="Select a date"
              />
            </div>
            <div className="w-full ">
              <Input
                label="End Date"
                value={enddate}
                setvalue={setenddate}
                type="date"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="flex items-center flex-wrap gap-4">
              <div className="flex flex-col justify-end min-w-72 flex-1 h-full">
                <FixedDateParameterButton
                  className={"p-3"}
                  action={fetchContracts}
                  FixedDateParameter={FixedDateParameter}
                />
              </div>
              <div className="w-full flex flex-1 items-end">
                <div className="">
                  {" "}
                  <div className="flex-grow"></div>{" "}
                  <DancingLoadingButton
                    loading={loading}
                    onClick={() => fetchContracts({ date: true, offSet: "0" })}
                    className={"px-20"}
                  >
                    Search
                  </DancingLoadingButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShadowContainer>
    </div>
  );
};

export default Form;
