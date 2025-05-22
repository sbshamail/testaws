"use client";
import React, { useState, useEffect, useContext, createContext } from "react";

import PageContainer from "@/app/Components/containers/PageContainer";
import { GlobalContext } from "@/app/Provider";
import toast from "react-hot-toast";

import { unixTimestampToDate } from "@/app/functions";
import ResellAddmodelModal from "./ResellAddmodelModal";
// import AddAddressmodal from "./AddAddressmodal";

import ResellDiv1 from "./ResellDiv1";
import ResellAddBankmodal from "./ResellAddBankmodal";
// import ServiceDetails from "./ServicesRedemption/Services/ServiceDetails";
// import { GalleryIcon } from "./GalleryIcon";
// import { MusicIcon } from "./MusicIcon";

export const ResellContractContext = createContext(null);
const Page = ({ params }) => {
  const planParam = params?.id.find((param) => param.includes("plan"));

  const planString = planParam
    ? decodeURIComponent(planParam.split("="))
    : null;

  const planId = planString.split("=")[1];

  console.log("paramsparams", params.id[0]);
  console.log("planIdplanId", planId);
  // console.log("searchParams", searchParams);
  const [contract, setcontract] = useState(null);
  const [addNewModel, setAddNewModal] = useState(null);
  const [addNewBank, setAddNewBank] = useState(null);
  const [previousId, setPreviousId] = useState(null);
  const [oldContractID, setOldContractID] = useState(params.id[0]);
  const [resellContractPopup, setResellContractPopup] = useState(planId);
  const [loading, setloading] = useState(false);
  const [tab, settab] = useState(0);
  const [countries, setcountries] = useState([]);
  const [states, setstates] = useState([]);
  const [makes, setmakes] = useState([]);
  const [plans, setplans] = useState([]);
  const [models, setmodels] = useState([]);
  const [productsellingreps, setproductsellingreps] = useState([]);
  const [salespersons, setsalespersons] = useState([]);
  const [banks, setbanks] = useState([]);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [streetaddress, setstreetaddress] = useState("");
  const [country, setcountry] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [email, setemail] = useState("");
  const [zip, setzip] = useState("");
  const [phone, setphone] = useState("");
  const [dob, setdob] = useState("");
  const [sendemail, setsendemail] = useState("");
  const [sendsms, setsendsms] = useState("");
  const [hidetestcontract, sethidetestcontract] = useState("");
  const [dealer, setdealer] = useState("");
  const [dealerAutoFill, setDealerAutoFill] = useState();
  const [vinDefault, setvinDefault] = useState("");
  const [contractnoDefault, setcontractnoDefault] = useState("");
  const [makeDefault, setmakeDefault] = useState("");
  const [planDefault, setplanDefault] = useState(planId);
  const [modelDefault, setmodelDefault] = useState("");
  const [productsellingrepDefault, setproductsellingrepDefault] = useState("");
  const [yearDefault, setyearDefault] = useState("");
  const [password, setpassword] = useState("");
  const [make, setmake] = useState("");
  const [plan, setplan] = useState("");
  const [model, setmodel] = useState("");
  const [vehicletypeDefault, setvehicletypeDefault] = useState("");
  const [salespersonDefault, setsalespersonDefault] = useState("");
  const [stockdealDefault, setstockdealDefault] = useState("");
  const [dealNoDefault, setdealNoDefault] = useState("");
  const [mileageDefault, setmileageDefault] = useState("");
  const [roDefault, setroDefault] = useState("");
  const [saledateDefault, setsaledateDefault] = useState("");
  const [expirationdateDefault, setexpirationdateDefault] = useState("");
  const [contractcost, setcontractcost] = useState("");
  const [contractemail, setcontractemail] = useState("");
  const [contractbank, setcontractbank] = useState(new Set([]));
  const [contractbankaddress, setcontractbankaddress] = useState("");
  const [customerprice, setcustomerprice] = useState("");
  const [planprice, setplanprice] = useState("");
  const [oneTimeRONumber, setOneTimeRONumber] = useState("");
  const [compPrice, setCompPrice] = useState("");
  const [servicecontract, setservicecontract] = useState(false);
  const [lpvsb, setlpvsb] = useState(false);
  const [modal, setmodal] = useState(false);
  const [addaddressmodal, setaddaddressmodal] = useState(false);
  const [addbankmodal, setaddbankmodal] = useState(false);
  const [servicedetailsmodal, setservicedetailsmodal] = useState(false);
  const [services, setservices] = useState([]);
  const [usedservices, setusedservices] = useState([]);
  const [maturedServices, setMaturedServices] = useState([]);
  const [giftedServices, setGiftedServices] = useState([]);
  const [recentmileage, setrecentmileage] = useState("");
  const [dailyMileage, setDailyMileage] = useState("");
  const [servicedetailsservice, setservicedetailsservice] = useState(null);
  const [planCost, setPlanCost] = useState(null);
  const [planID, setPlanID] = useState(null);
  const [dealerID, setDealerID] = useState(null);
  const [makeID, setMakeID] = useState(null);
  const [newModelID, setNewModelID] = useState(null);
  const [hideprice, sethideprice] = useState("");
  const [loyaltyCashCheck, setLoyaltyCashCheck] = useState("");
  const [loyaltyCashPoints, setLoyaltyCashPoints] = useState("");
  const [welcomeSmsCheck, setWelcomeSmsCheck] = useState("");
  const [dataRecieved, setDataRecieved] = useState(false);
  const [resellPlanId, setResellPlanId] = useState("");
  const [resellPlanClicked, setResellPlanClicked] = useState("0");
  // const [productsellingreps,setproductsellingreps] = useState([]);
  const [dataRecievedCount, setDataRecievedCount] = useState(0);

  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);

  const fetchContract = () => {
    setloading(true);

    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("ContractID", params.id[0]);

    fetch("https://mypcp.us/webservices/contracts/editcontract", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setloading(false);
        if (res.success === 1) {
          toast.success("Contract Found");
          setcontract(res);
          setPlanCost(res?.contractinfo);
        } else {
          toast.error("res.message");
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't get Contract err3");
        console.log(error);
      });
  };

  useEffect(() => {
    if (GLOBAL_RESPONSE || planID) {
      fetchContract();
    }
  }, [GLOBAL_RESPONSE, makeID, planID]);
  useEffect(() => {
    if (contract) {
      //arrays
      setcountries(contract.Countries);
      setstates(contract.States);
      setmakes(contract.Makes);
      setplans(contract.Plans);
      setmodels(contract.SpecifixModels);
      setproductsellingreps(contract.ProductSellingReps);
      setsalespersons(contract.SalesSellingReps);
      setbanks(contract.Banks);

      const info = contract.customereinfo;
      const contractinfo = contract.contractinfo;
      setfname(info.CustomerFName);
      setlname(info.CustomerLName);
      setstreetaddress(info.CustomerAddressLine1);
      setcountry(info.CountryID);
      setcity(info.CityName);
      setstate(info.StateID);
      setemail(info.PrimaryEmail);
      setzip(info.CustomerZIP);
      setphone(info.PhoneHome);
      setdob(info.CustomerDOB);
      setsendemail(info.SendEmail);
      setsendsms(info.SendSms);
      sethidetestcontract(contractinfo.HideTestContract);

      //contact variables

      //PV variables

      setdealer(contractinfo.DealerID);
      setvinDefault(contractinfo.VIN);
      setcontractnoDefault(contractinfo.ContractNo);
      setmakeDefault(contractinfo.MakeID);
      // setplanDefault(contractinfo.PlanID);
      setmodelDefault(contractinfo.ModelID);
      setproductsellingrepDefault(contractinfo.FIManagerID);
      setyearDefault(contractinfo.VehYear);
      setpassword(contract.getuserbyid.pass);
      setvehicletypeDefault(contractinfo.VehicleType);
      setsalespersonDefault(contractinfo.SIManagerID);
      setstockdealDefault(contractinfo.StockDealNo);
      setdealNoDefault(contractinfo.DealNo);
      setmileageDefault(contractinfo.ContractMileage);
      setroDefault(contractinfo.RO);
      setsaledateDefault(unixTimestampToDate(contractinfo.SaleDate));
      setexpirationdateDefault(unixTimestampToDate(contractinfo.ValidityDate));

      //pp variables

      setcontractcost(contractinfo.ContractTotalCost);
      setcontractemail(info.PrimaryEmail);
      setcontractbank(contractinfo.BankId);
      setcustomerprice(contractinfo.CustomerPrice);
      setplanprice(contractinfo.EnteredCost);
      sethideprice(contractinfo.HidePrice);
      setservicecontract(contractinfo.isServiceContract);
      setlpvsb(contractinfo.lpvsb);

      //services variables

      setservices(contract.GetContractCouponById);
      setusedservices(contract.GetRedemmedContractById);
      setMaturedServices(contract?.GetMaturedContractById);
      setGiftedServices(contract.GetGiftedContractById);
      setrecentmileage(contractinfo.RecentMileage);
      setDailyMileage(contractinfo?.DailyMileageRate);

      setLoyaltyCashCheck(contract?.getDealerByID.EnableLoyaltyCash);
      setLoyaltyCashPoints(contract?.getDealerByID.EnableLoyaltyCashPoint);
      setWelcomeSmsCheck(contract?.getDealerByID.EnableWelcomeSms);
    }
  }, [contract, modal, makeID, planID]);

  return (
    <ResellContractContext.Provider
      value={{
        setDataRecieved: setDataRecieved,
        dataRecieved: dataRecieved,
        params: params,
        tab: tab,
        setOneTimeRONumber: setOneTimeRONumber,
        oneTimeRONumber: oneTimeRONumber,
        settab: settab,
        setmodal: setmodal,
        setaddaddressmodal: setaddaddressmodal,
        setaddbankmodal: setaddbankmodal,
        countries: countries,
        states: states,
        makes: makes,
        plans: plans,
        models: models,
        setmodels: setmodels,
        productsellingreps: productsellingreps,
        salespersons: salespersons,
        banks: banks,
        setbanks: setbanks,
        fname: fname,
        setfname: setfname,
        lname: lname,
        setlname: setlname,
        streetaddress: streetaddress,
        setstreetaddress: setstreetaddress,
        country: country,
        setcountry: setcountry,
        city: city,
        setcity: setcity,
        state: state,
        setstate: setstate,
        email: email,
        setemail: setemail,
        zip: zip,
        setzip: setzip,
        phone: phone,
        setphone: setphone,
        dob: dob,
        setdob: setdob,
        sendemail: sendemail,
        setsendemail: setsendemail,
        sendsms: sendsms,
        setsendsms: setsendsms,
        hidetestcontract: hidetestcontract,
        sethidetestcontract: sethidetestcontract,
        dealer: dealer,
        setdealer: setdealer,
        setDealerAutoFill: setDealerAutoFill,
        dealerAutoFill: dealerAutoFill,
        vinDefault: vinDefault,
        setvinDefault: setvinDefault,
        contractnoDefault: contractnoDefault,
        setcontractnoDefault: setcontractnoDefault,
        makeDefault: makeDefault,
        setmakeDefault: setmakeDefault,
        planDefault: planDefault,
        setplanv: setplanDefault,
        modelDefault: modelDefault,
        setmodelDefault: setmodelDefault,
        productsellingrepDefault: productsellingrepDefault,
        setproductsellingrepDefault: setproductsellingrepDefault,
        yearDefault: yearDefault,
        setyearDefault: setyearDefault,
        password: password,
        setpassword: setpassword,
        vehicletypeDefault: vehicletypeDefault,
        setvehicletypeDefault: setvehicletypeDefault,
        salespersonDefault: salespersonDefault,
        setsalespersonDefault: setsalespersonDefault,
        stockdealDefault: stockdealDefault,
        setstockdealDefault: setstockdealDefault,
        setdealNoDefault: setdealNoDefault,
        dealNoDefault: dealNoDefault,
        mileageDefault: mileageDefault,
        setmileageDefault: setmileageDefault,
        roDefault: roDefault,
        setroDefault: setroDefault,
        saledateDefault: saledateDefault,
        setsaledateDefault: setsaledateDefault,
        expirationdateDefault: expirationdateDefault,
        setexpirationdateDefault: setexpirationdateDefault,
        contractcost: contractcost,
        setcontractcost: setcontractcost,
        contractemail: contractemail,
        setcontractemail: setcontractemail,
        contractbank: contractbank,
        setcontractbank: setcontractbank,
        contractbankaddress: contractbankaddress,
        setcontractbankaddress: setcontractbankaddress,
        customerprice: customerprice,
        setcustomerprice: setcustomerprice,
        planprice: planprice,
        setplanprice: setplanprice,
        hideprice: hideprice,
        sethideprice: sethideprice,
        servicecontract: servicecontract,
        setservicecontract: setservicecontract,
        lpvsb: lpvsb,
        setlpvsb: setlpvsb,
        services: services,
        setservices: setservices,
        usedservices: usedservices,
        setusedservices: setusedservices,
        maturedServices: maturedServices,
        setMaturedServices: setMaturedServices,
        giftedServices: giftedServices,
        setGiftedServices: setGiftedServices,
        recentmileage: recentmileage,
        setrecentmileage: setrecentmileage,
        dailyMileage: dailyMileage,
        setDailyMileage: setDailyMileage,
        servicedetailsservice: servicedetailsservice,
        setservicedetailsservice: setservicedetailsservice,
        servicedetailsmodal: servicedetailsmodal,
        setservicedetailsmodal: setservicedetailsmodal,
        setPlanCost: setPlanCost,
        planCost: planCost,
        setPlanID: setPlanID,
        planID: planID,
        setDealerID: setDealerID,
        dealerID: dealerID,
        setMakeID: setMakeID,
        makeID: makeID,
        setNewModelID: setNewModelID,
        newModelID: newModelID,
        setcontract: setcontract,
        contract: contract,
        setLoyaltyCashCheck: setLoyaltyCashCheck,
        loyaltyCashCheck: loyaltyCashCheck,
        setLoyaltyCashPoints: setLoyaltyCashPoints,
        loyaltyCashPoints: loyaltyCashPoints,
        setWelcomeSmsCheck: setWelcomeSmsCheck,
        welcomeSmsCheck: welcomeSmsCheck,
        setResellPlanClicked: setResellPlanClicked,
        resellPlanClicked: resellPlanClicked,
        setResellPlanId: setResellPlanId,
        resellPlanId: resellPlanId,
        setproductsellingreps: setproductsellingreps,
        oldContractID: oldContractID,
        setOldContractID: setOldContractID,
        resellContractPopup: resellContractPopup,
        setResellContractPopup: setResellContractPopup,
        dataRecievedCount: dataRecievedCount,
        setDataRecievedCount: setDataRecievedCount,
      }}
    >
      <PageContainer>
        {modal && <ResellAddmodelModal setmodal={setmodal} />}{" "}
        {/* {addaddressmodal && <AddAddressmodal setmodal={setaddaddressmodal} />} */}
        {addbankmodal && <ResellAddBankmodal setmodal={setaddbankmodal} />}
        {/* {servicedetailsmodal && <ServiceDetails />} */}
        {/* {loading && <TailwindLoading />} */}
        {/* {contract && ( */}
        <>
          <ResellDiv1 />
          {/* <div className="w-full"> 
            <ShadowContainer>
              <CreateNavbar />
              {tab == 0 && <CreateFillContract />}
              {tab == 1 && <CreatePricePrint />}
              {tab == 2 && <CreateServicesRedemption />}
            </ShadowContainer>
          </div> */}
          {/* <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color="primary" variant="bordered">
              <Tab
                key="photos"
                title={
                  <div className="flex items-center space-x-2">
                    <GalleryIcon />
                    <span>Fill Contract</span>
                  </div>
                }
              >
                <CreateFillContract /> 
              </Tab>
              <Tab
                key="music"
                title={
                  <div className="flex items-center space-x-2">
                    <MusicIcon />
                    <span>Price Print</span>
                  </div>
                }
              >
                <CreatePricePrint />
              </Tab>
            </Tabs>
          </div> */}
        </>
        {/* )} */}
      </PageContainer>
    </ResellContractContext.Provider>
  );
};

export default Page;
