"use client";
import React, { useState, createContext } from "react";

import PageContainer from "@/app/Components/containers/PageContainer";

import CreateDiv1 from "./CreateDiv1";

export const CreateContractContext = createContext(null);
const Page = ({ params }) => {
  const [contract, setcontract] = useState(null);
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
  // autofill
  const [dealerAutoFill, setDealerAutoFill] = useState();
  const [autoFillData, setAutoFillData] = useState({});
  //
  const [vin, setvin] = useState("");
  const [contractno, setcontractno] = useState("");
  const [make, setmake] = useState("");
  const [plan, setplan] = useState("");
  const [model, setmodel] = useState("");
  const [productsellingrep, setproductsellingrep] = useState("");
  const [year, setyear] = useState("");
  const [password, setpassword] = useState("");
  const [vehicletype, setvehicletype] = useState("");
  const [salesperson, setsalesperson] = useState("");
  const [stockdeal, setstockdeal] = useState("");
  const [mileage, setmileage] = useState("");
  const [ro, setro] = useState("");
  const [saledate, setsaledate] = useState("");
  const [expirationdate, setexpirationdate] = useState("");
  const [contractcost, setcontractcost] = useState("");
  const [contractemail, setcontractemail] = useState("");
  const [contractbank, setcontractbank] = useState("");
  const [contractbankaddress, setcontractbankaddress] = useState("");
  const [customerprice, setcustomerprice] = useState("");
  const [planprice, setplanprice] = useState("");
  const [oneTimeRONumber, setOneTimeRONumber] = useState("");
  const [compPrice, setCompPrice] = useState("");
  const [lpvsb, setlpvsb] = useState("");

  const [servicedetailsmodal, setservicedetailsmodal] = useState(false);
  const [services, setservices] = useState([]);
  const [usedservices, setusedservices] = useState([]);
  const [recentmileage, setrecentmileage] = useState("");
  const [servicedetailsservice, setservicedetailsservice] = useState(null);
  const [planCost, setPlanCost] = useState(null);
  const [planID, setPlanID] = useState(null);
  const [dealerID, setDealerID] = useState(null);
  const [makeID, setMakeID] = useState(null);
  const [newModelID, setNewModelID] = useState(null);

  return (
    <CreateContractContext.Provider
      value={{
        params: params,
        // contract: contract,
        tab: tab,
        setOneTimeRONumber: setOneTimeRONumber,
        oneTimeRONumber: oneTimeRONumber,
        settab: settab,

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
        autoFillData: autoFillData,
        setAutoFillData: setAutoFillData,
        vin: vin,
        setvin: setvin,
        contractno: contractno,
        setcontractno: setcontractno,
        make: make,
        setmake: setmake,
        plan: plan,
        setplan: setplan,
        model: model,
        setmodel: setmodel,
        productsellingrep: productsellingrep,
        setproductsellingrep: setproductsellingrep,
        year: year,
        setyear: setyear,
        password: password,
        setpassword: setpassword,
        vehicletype: vehicletype,
        setvehicletype: setvehicletype,
        salesperson: salesperson,
        setsalesperson: setsalesperson,
        stockdeal: stockdeal,
        setstockdeal: setstockdeal,
        mileage: mileage,
        setmileage: setmileage,
        ro: ro,
        setro: setro,
        saledate: saledate,
        setsaledate: setsaledate,
        expirationdate: expirationdate,
        setexpirationdate: setexpirationdate,
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
        compPrice: compPrice,
        setCompPrice: setCompPrice,

        lpvsb: lpvsb,
        setlpvsb: setlpvsb,
        services: services,
        setservices: setservices,
        usedservices: usedservices,
        setusedservices: setusedservices,
        recentmileage: recentmileage,
        setrecentmileage: setrecentmileage,
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
        contract: contract,
        setcontract: setcontract,
      }}
    >
      <PageContainer>
        <>
          <CreateDiv1 />
        </>
      </PageContainer>
    </CreateContractContext.Provider>
  );
};

export default Page;
