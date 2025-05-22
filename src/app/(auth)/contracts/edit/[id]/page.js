"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import PageContainer from "@/app/Components/containers/PageContainer";
import { GlobalContext } from "@/app/Provider";
import Div1 from "./Div1";

import { unixTimestampToDate } from "@/app/functions";
import AddAddressmodal from "./AddAddressmodal";
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";

import ServiceDetails from "./ServicesRedemption/Services/ServiceDetails";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { fetchPostObj } from "@/utils/action/function";

export const EditContractContext = createContext(null);
const Page = ({ params }) => {
  const dispatch = useDispatch();
  const contractSelector = setReducer("contract");
  const [couponIds, setCouponIds] = useState([]);
  const [planDescription, setPlanDescription] = useState(null);
  const [expirayDate, setExpirayDate] = useState(null);
  // const [serviceRedeemed, setServiceRedeemed] = useState("0");
  const [serviceRedeemed, setServiceRedeemed] = useState(0);
  const [couponIdswithValues, setCouponIdswithValues] = useState([]);
  const [contract, setcontract] = useState(null);
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
  const [planDefault, setplanDefault] = useState("");
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
  const [contractbank, setcontractbank] = useState("");
  const [contractbankaddress, setcontractbankaddress] = useState("");
  const [customerprice, setcustomerprice] = useState("");
  const [planprice, setplanprice] = useState("");
  const [oneTimeRONumber, setOneTimeRONumber] = useState("");
  const [compPrice, setCompPrice] = useState("");
  const [isServicecontract, setIsServicecontract] = useState(false);
  const [ServiceContract, SetServiceContract] = useState(false);
  const [lpvsb, setlpvsb] = useState(false);
  const [addaddressmodal, setaddaddressmodal] = useState(false);

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
  const [customerID, setCustomerID] = useState(null);

  const [makeID, setMakeID] = useState(null);
  const [newModelID, setNewModelID] = useState(null);
  const [hideprice, sethideprice] = useState("");
  const [loyaltyCashCheck, setLoyaltyCashCheck] = useState("");
  const [loyaltyCashPoints, setLoyaltyCashPoints] = useState("");
  const [welcomeSmsCheck, setWelcomeSmsCheck] = useState("");
  const [dataRecieved, setDataRecieved] = useState(false);
  const [resellPlanId, setResellPlanId] = useState("");
  const [resellPlanClicked, setResellPlanClicked] = useState("0");
  const [redemptionData, setRedemptionData] = useState({});

  const { auth, Token } = useContext(GlobalContext);

  const fetchContract = async () => {
    const data = { ContractID: params.id };
    const res = await fetchPostObj({
      api: "contracts/editcontract",
      auth,
      Token,
      data,
      setLoading: setloading,
      showToast: true,
      toastMsg: "Contract Found",
    });
    if (res) {
      setcontract(res);
      setPlanCost(res?.contractinfo);
      dispatch(contractSelector(res));
    }
  };

  useEffect(() => {
    if (auth && Token) {
      fetchContract();
      setusedservices(contract?.GetRedemmedContractById);
      setservices(contract?.GetContractCouponById);
    }
  }, [auth, serviceRedeemed]);

  useEffect(() => {
    if (contract) {
      //arrays
      setcountries(contract?.Countries);

      setstates(contract.States);
      setmakes(contract.Makes);
      setplans(contract.Plans);
      setPlanDescription(contract.PlanDescription);
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

      setCustomerID(contractinfo.CustomerID);
      setCompPrice(contractinfo.CompPrice);
      setdealer(contractinfo.DealerID);
      setvinDefault(contractinfo.VIN);
      setcontractnoDefault(contractinfo.ContractNo);
      setmakeDefault(contractinfo.MakeID);
      setplanDefault(contractinfo.PlanID);
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
      setExpirayDate(contractinfo.ExpirayDate);
      //pp variables

      setcontractcost(contractinfo.ContractTotalCost);
      setcontractemail(info.PrimaryEmail);
      setcontractbank(contractinfo.BankId);
      setcustomerprice(contractinfo.CustomerPrice);
      setplanprice(contractinfo.EnteredCost);
      sethideprice(contractinfo.HidePrice);
      setIsServicecontract(contractinfo.isServiceContract);
      SetServiceContract(contractinfo.ServiceContract);
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
  }, [contract, serviceRedeemed]);

  return (
    <EditContractContext.Provider
      value={{
        setDataRecieved: setDataRecieved,
        dataRecieved: dataRecieved,
        params: params,
        tab: tab,
        setOneTimeRONumber: setOneTimeRONumber,
        oneTimeRONumber: oneTimeRONumber,
        settab: settab,
        setaddaddressmodal: setaddaddressmodal,
        countries: countries,
        states: states,
        makes: makes,
        planDescription: planDescription,
        plans: plans,
        models: models,
        setmodels: setmodels,
        productsellingreps: productsellingreps,
        setproductsellingreps: setproductsellingreps,
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
        compPrice,
        customerID: customerID,
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
        expirayDate: expirayDate,
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
        isServicecontract: isServicecontract,
        setIsServicecontract: setIsServicecontract,
        ServiceContract: ServiceContract,
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
        couponIds: couponIds,
        setCouponIds: setCouponIds,
        couponIdswithValues: couponIdswithValues,
        setCouponIdswithValues: setCouponIdswithValues,
        redemptionData: redemptionData,
        setRedemptionData: setRedemptionData,

        setplans: setplans,
        setServiceRedeemed: setServiceRedeemed,
        serviceRedeemed: serviceRedeemed,
      }}
    >
      <SpinnerCenterScreen loading={loading} />

      <PageContainer>
        {addaddressmodal && <AddAddressmodal setmodal={setaddaddressmodal} />}
        {servicedetailsmodal && <ServiceDetails />}

        <>
          <Div1 />
        </>
      </PageContainer>
    </EditContractContext.Provider>
  );
};

export default Page;
