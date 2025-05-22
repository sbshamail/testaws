"use client";
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useContext,
} from "react";
import toast from "react-hot-toast";
import { EditContractContext } from "../page";
import Input from "@/app/Components/Inputs/Input";
import { generateYearsArray } from "@/app/functions";

import { GlobalContext } from "@/app/Provider";
import { Select as NextuiSelect, SelectItem } from "@nextui-org/react";
import CheckboxWithText from "@/app/Components/Inputs/CheckboxWithText";
import Select from "@/app/Components/Inputs/Select";
//action
import { fetchPost } from "@/utils/action/function";
//form function
import { handleFieldValue } from "@/components/forms/functions";
import Addmodelmodal from "@/components/forms/contract/Addmodelmodal";
import {
  dataAgainstDealerId,
  modelAgainstMake,
} from "@/components/forms/contract/commonfn";
import { CustomButton } from "@/components/cui/button/CustomButton";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

const PVInfo = forwardRef(
  ({ autoFillData, updateData, setFormUpdateOnly }, ref) => {
    const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE, auth, Token } =
      useContext(GlobalContext);
    const {
      params,
      contract,
      dealer,
      setdealer,

      setDealerAutoFill,
      planDescription,

      setPlanID,

      setDealerID,
      setMakeID,
      makeID,
      vinDefault,
      contractnoDefault,
      makeDefault,
      planDefault,
      modelDefault,
      productsellingrepDefault,
      yearDefault,
      vehicletypeDefault,
      salespersonDefault,
      stockdealDefault,
      mileageDefault,
      roDefault,
      saledateDefault,
      expirationdateDefault,
      dealNoDefault,
      loyaltyCashCheck,
      loyaltyCashPoints,
      // welcomeSmsCheck,

      setproductsellingreps,
      productsellingreps,
      setplans,
      plans,
      usedservices,
    } = useContext(EditContractContext);
    const ghostSvg = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M3 11v8h.051c.245 1.692 1.69 3 3.449 3c1.174 0 2.074-.417 2.672-1.174a3.99 3.99 0 0 0 5.668-.014c.601.762 1.504 1.188 2.66 1.188c1.93 0 3.5-1.57 3.5-3.5V11c0-4.962-4.037-9-9-9s-9 4.038-9 9m6 1c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2m6-4c1.103 0 2 .897 2 2s-.897 2-2 2s-2-.897-2-2s.897-2 2-2"
        />
      </svg>
    );
    const [loading, setLoading] = useState(false);

    const [vin, setvin] = useState("");
    const [contractno, setcontractno] = useState("");

    // const [welcomeSms, setwelcomeSms] = useState("");

    const [ro, setro] = useState("");
    const [customerNumber, setCustomerNumber] = useState("");
    const [makes, setMakes] = useState([]);

    // const [productsellingreps, setproductsellingreps] = useState([]);
    const [salespersons, setsalespersons] = useState([]);
    const [vinData, setVinData] = useState();
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectMakeID, setSelectMakeID] = useState(new Set());
    const [selectLoyaltyID, setSelectLoyaltyID] = useState(new Set());
    const [selectYear, setSelectYear] = useState(new Set());
    const [selectModelID, setSelectModelID] = useState(new Set());
    const [modelList, setModelList] = useState([]);
    const [dealerSettingCheck, setDealerSettingCheck] = useState(false);
    const [dealerSetting, setDealerSetting] = useState();

    const [planCost1, setPlanCost1] = useState(null);
    const [roValue, setRoValue] = useState(null);
    const [errors, setErrors] = useState({});

    const [dealerData, setDealerData] = useState(null);

    const [modelsData, setModelsData] = useState([]);
    const [modelsNewID, setModelsNewID] = useState(null);
    const [smlcpoints, setSmlcpoints] = useState([]);
    const [allPlans, setAllPlans] = useState([]);
    const [specificPlanLimits, setSpecificPlanLimits] = useState([]);
    //open modal for car Model
    const [carModal, setCarModal] = useState(false);
    // use for get plan expirt
    // const [saleDate, setSaleDate] = useState(null);
    const defaultValues = {
      dealer: dealer ? dealer : contract?.contractinfo?.DealerID,
      vin: vinDefault,
      contractno: contractnoDefault,
      make: makeDefault,
      plan: planDefault,
      model: modelDefault,
      productsellingrep: productsellingrepDefault,
      year: yearDefault,
      password: "",
      vehicletype: vehicletypeDefault,
      salesperson: salespersonDefault,
      stock: stockdealDefault,
      deal: dealNoDefault,
      mileage: mileageDefault,
      ro: roDefault,
      saledate: saledateDefault,
      customerNumber: "",
      expNew: expirationdateDefault,
      // welcomeSms: welcomeSmsCheck,
      loyaltyCash: loyaltyCashCheck,
      loyaltyPoints: loyaltyCashPoints,
      // LoyaltyID: "",
      oneTimeRONumber: "",
      smlcPointsSelect: "",
    };
    const [pvInfo, setPvInfo] = useState(defaultValues);

    useEffect(() => {
      setPvInfo((prev) => ({
        ...prev,
        dealer: dealer ? dealer : contract?.contractinfo?.DealerID,
        vin: vinDefault,
        contractno: contractnoDefault,
        make: makeDefault,
        plan: planDefault,
        model: modelDefault,
        productsellingrep: productsellingrepDefault,
        year: yearDefault,
        password: "",
        vehicletype: vehicletypeDefault,
        salesperson: salespersonDefault,
        stock: stockdealDefault,
        deal: dealNoDefault,
        mileage: mileageDefault,
        ro: roDefault,
        saledate: saledateDefault,
        customerNumber: "",
        expNew: expirationdateDefault,
        // welcomeSms: welcomeSmsCheck,
        loyaltyCash: loyaltyCashCheck,
        loyaltyPoints: loyaltyCashPoints,
        oneTimeRONumber: "",
        smlcPointsSelect: "",
      }));
    }, [contract, salespersonDefault]);

    useEffect(() => {
      if (makeDefault || modelDefault || yearDefault || vehicletypeDefault) {
        setSelectMakeID(new Set([makeDefault]));
        setSelectModelID(new Set([modelDefault]));
        setSelectYear(new Set([yearDefault]));
      }
    }, [makeDefault, modelDefault, yearDefault, vehicletypeDefault]);

    const dealerOptions = GLOBAL_DEALERS_INFO
      ? GLOBAL_DEALERS_INFO.map((dealer) => ({
          text: dealer.DealerTitle,
          value: dealer.DealerID,
        }))
      : [];

    const defaultDealer = dealerOptions?.find(
      (dealer) => dealer.value === contract?.contractinfo?.DealerID
    );

    // make list
    const makeslist = makes?.map((make, i) => {
      return { text: make.Make, value: make.MakeID };
    });

    // handle plans, in active plan merging in list,
    useEffect(() => {
      if (!Array.isArray(plans)) return;
      const ifPlanFind = plans?.find(
        (item) => item.PlanDescription === planDescription
      );
      const mergePlan = ifPlanFind
        ? plans
        : plans.map((item) => ({
            ...item,
            PlanDescription: planDescription ?? item.PlanDescription, // Fallback to existing value
            PlanID: planDefault ?? item.PlanID, // Fallback to existing value
          }));

      const planslist = mergePlan.map((plan, i) => ({
        text: plan.PlanDescription,
        value: plan.PlanID,
      }));
      const specificPlanIds = plans?.filter(
        (plan) => pvInfo?.plan === plan?.PlanID
      );
      setSpecificPlanLimits(specificPlanIds);
      setAllPlans(planslist);
    }, [plans]);

    const smlclist =
      smlcpoints?.map((loyalty) => ({
        text: loyalty.LoyaltyTitle,
        value: loyalty.LoyaltyID,
        points: loyalty.LoyaltyPoints,
      })) || [];

    // Step 1: Filter rows where PlanID is equal to pvInfo?.plan
    const filteredList = plans?.find((plan) => plan?.PlanID === pvInfo?.plan);
    const filteredLoyalty = filteredList?.LoyaltyID > 0 ? filteredList : null;
    // Step 2: Check if LoyaltyID is not null, store value or null
    // const smlclistPreFilled = filteredList?.find((loyalty) => ({
    //   loyalty: loyalty.LoyaltyID !== null ? loyalty : null,
    // }));

    // console.log("smlclistPreFilled", filteredLoyalty, filteredLoyalty?.LoyaltyID);

    // make list
    useEffect(() => {
      if (contract?.Makes) {
        setMakes(contract.Makes);
      }
    }, [contract]);
    useEffect(() => {
      const loyaltyIDSet = new Set([filteredLoyalty?.LoyaltyID]);
      setSelectLoyaltyID(loyaltyIDSet);
      handleInputChange("smlcPointsSelect", loyaltyIDSet);
    }, [pvInfo.plan]);

    const modelslist = modelsData.map((plan, i) => ({
      text: plan.Model,
      value: plan.ModelID,
    }));

    const yearslist = generateYearsArray()
      .sort((a, b) => b - a) // Sorts the array in descending order
      .map((year) => ({
        text: year.toString(),
        value: year.toString(),
      }));

    const vehicletypelist = [
      { text: "Pre Owned", value: "O" },
      { text: "New Vehicle", value: "N" },
    ];

    const fetchPlanCost = async () => {
      setLoading(true);
      const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
        GLOBAL_RESPONSE ?? {};
      const headers = new Headers();
      headers.append("AUTHORIZATION", Token);
      let formdata = new FormData();
      formdata.append("pcp_user_id", pcp_user_id);
      formdata.append("role_id", user_cizacl_role_id);
      formdata.append("user_id", user_id);
      formdata.append("PlanID", pvInfo?.plan);
      formdata.append("DealerID", dealer ? dealer : defaultDealer?.value);
      const res = await fetchPost({
        api: "contracts/plancost",
        token: Token,
        formdata,
        setLoading,
      });
      if (res) {
        setPlanCost1(res);
        setPlanID(pvInfo?.plan);
      }
    };

    // console.log("dealerData", dealerData?.EnableKaminskyLoyaltyProgram);

    const loyaltyIdList = dealerData?.smlcpoints?.map((loyalty, i) => ({
      text: loyalty?.LoyaltyTitle + " " + loyalty?.LoyaltyPoints,
      value: loyalty?.LoyaltyID,
    }));

    // get data according to dealer id,
    useEffect(() => {
      fetchPlanCost();
    }, [pvInfo?.plan]);

    useEffect(() => {
      const promiseDataAgainsDealerId = async () => {
        const res = await dataAgainstDealerId({
          auth,
          DealerID: pvInfo.dealer ? pvInfo.dealer : defaultDealer?.value,
          Token,
          setLoading,
        });
        if (res) {
          setDealerData(res);
          setplans(res.Plans);
          setSmlcpoints(res.smlcpoints);
          setproductsellingreps(res.ProductSellingReps);
          setsalespersons(res.SalesSellingReps);
        }
      };
      promiseDataAgainsDealerId();
    }, [GLOBAL_RESPONSE, pvInfo.dealer]);

    // car model fetch according to car
    useEffect(() => {
      const promiseModelAgainsMake = async () => {
        const res = await modelAgainstMake({
          auth,
          Token,
          setLoading,
          MakeID: pvInfo?.make,
          DealerID: pvInfo?.dealer,
        });
        if (res) {
          setModelsData(res?.SpecifixModels);
          setModelsNewID(res);
        }
      };
      promiseModelAgainsMake();
    }, [makeID, selectMakeID]);

    useEffect(() => {
      setDealerAutoFill(dealer);
    }, [autoFillData]);

    // fetch Vin Data
    const fetchVinData = async () => {
      // Check if dealer and vin are available
      if (!dealer) {
        toast.error("Both Dealer and VIN number must be provided");
        return;
      }
      if (!pvInfo.vin) {
        toast.error("Both Dealer and VIN number must be provided");
        return;
      }

      setLoading(true);
      const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
        GLOBAL_RESPONSE ?? {};

      if (!Token) {
        setLoading(false);
        toast.error("Missing Token");
        return;
      }

      const headers = new Headers();
      headers.append("Authorization", Token);

      let formdata = new FormData();
      formdata.append("DealerID", dealer ? dealer : defaultDealer?.value);
      formdata.append("VIN", vin ? vin : pvInfo.vin);
      formdata.append("pcp_user_id", pcp_user_id);
      formdata.append("role_id", user_cizacl_role_id);
      formdata.append("user_id", user_id);

      try {
        const response = await fetch(
          "https://mypcp.us/webservices/contracts/apivin",
          {
            method: "POST",
            body: formdata,
            headers: headers,
          }
        );
        const data = await response.json();

        if (data.success === 1) {
          setLoading(false);
          const modelObject = {
            text: data.Model,
            value: data.ModelID.toString(),
          };
          // console.log("modelObject", modelObject);

          const makeObject = makeslist?.find(
            (make) => make.value === data.MakeID.toString()
          );
          const yearObject = yearslist.find(
            (year) => year.value.toString() === data.ModelYear.toString()
          );

          if (makeObject) {
            setSelectMakeID(new Set([makeObject.value]));
            setSelectedMake(makeObject.text);
          }
          if (yearObject) {
            setSelectYear(new Set([yearObject.value]));
            setSelectedYear(yearObject.text);
          }

          setModelList((prevModelList) => [
            ...(prevModelList || []),
            modelObject,
          ]);
          setSelectModelID(new Set([modelObject.value]));
          setSelectedModel(modelObject.text);

          setPvInfo((prevState) => ({
            ...prevState,
            dealer: contract?.contractinfo?.DealerID,
            vin: data.vin?.toString(),
            make: makeObject?.value,
            model: modelObject.value,
            year: yearObject.text,
          }));
        } else {
          toast.error(data.message || "Failed to decode VIN");
          setLoading(false);
        }
      } catch (error) {
        toast.error("Fetch failed or timed out");
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }

    const getPlanExpiry = (saleDate) => {
      setLoading(true);
      const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
        GLOBAL_RESPONSE ?? {};
      const headers = new Headers();
      headers.append("AUTHORIZATION", Token);

      let formdata = new FormData();
      formdata.append("pcp_user_id", pcp_user_id);
      formdata.append("role_id", user_cizacl_role_id);
      formdata.append("user_id", user_id);
      formdata.append("PlanID", pvInfo?.plan);
      formdata.append("DealerID", dealer ? dealer : defaultDealer?.value);
      formdata.append("SaleDate", saleDate);

      fetch("https://mypcp.us/webservices/contracts/getplanexpirydate", {
        method: "POST",
        body: formdata,
        headers: headers,
      })
        .then((response) => response.json())
        .then((res) => {
          setLoading(false);
          if (res.success === 1) {
            // Extract date from response
            // Parse and format the date
            const expiryDate = res?.contractexpirydate?.MakePlanExpiryDate;
            if (expiryDate) {
              const expdate = formatDate(expiryDate);
              setPvInfo((pvInfo) => ({ ...pvInfo, expNew: expdate }));
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    };

    const pvInfoUpdateData = (contract) => ({
      ContractID: params.id,
      CustomerID: contract?.getuserbyid?.CustomerID,
      DealerID: pvInfo?.dealer,
      VIN: pvInfo.vin,
      PlanID: pvInfo?.plan,
      OldPlanID: contract?.contractinfo?.PlanID,
      MakeID: pvInfo?.make,
      ModelID: pvInfo?.model,
      LoyaltyID: pvInfo?.smlcPointsSelect,
      Loyalty_Map: pvInfo?.loyaltyCash ? 1 : 0,
      LoyaltyCashEnable: pvInfo?.loyaltyPoints ? 1 : 0,
      EnableWelcomeSms: pvInfo?.welcomeSms ? 1 : 0,
      DealNo: pvInfo?.deal,
      StockDealNo: pvInfo?.stock,
      contractno: contractnoDefault, //pvInfo?.contractno,
      // OldContractNo: contractnoDefault,
      new_Contract_Number: pvInfo?.contractno,
      VehYear: pvInfo?.year,
      VehicleType: pvInfo?.vehicletype,
      SaleDate: formatDate(pvInfo?.saledate),
      Mileage: pvInfo?.mileage,
      SellingRep: pvInfo?.productsellingrep,
      ValidityDate: formatDate(pvInfo?.expNew),
      SIManagerID: pvInfo?.salesperson,
    });

    useEffect(() => {
      updateData(pvInfoUpdateData(contract));
    }, [pvInfo, contract]);

    useEffect(() => {
      if (vinData) {
        const matchingMake = makeslist.find(
          (make) => make.text === vinData.Make
        );
        if (matchingMake) {
          setSelectedMake(matchingMake.value);
        }
        const matchingModel = modelslist.find(
          (model) => model.text === vinData.Model
        );
        if (matchingModel) {
          setSelectedModel(matchingModel.value);
        }
      }
    }, [vinData, makeslist, modelslist]);

    // setting validation
    const validate = () => {
      const newErrors = {};

      // if (!pvInfo.saledate) newErrors.saledate = "Sale Date is required";
      if (!pvInfo.vin) newErrors.vin = "Vin is required";
      if (!pvInfo.model) newErrors.model = "Model is required";
      if (!pvInfo.year) newErrors.year = "Year is required";
      if (!pvInfo.saledate) newErrors.saledate = "Sale Date is required";
      // if (!pvInfo.salesperson) newErrors.salesperson = "Sales Rep is required";
      if (!pvInfo.mileage) newErrors.mileage = "Mileage is required";
      if (!pvInfo.vehicletype)
        newErrors.vehicletype = "Vehicle Type is required";
      if (!pvInfo.plan) newErrors.plan = "Plan is required";
      if (!pvInfo.dealer) newErrors.dealer = "Dealer is required";
      if (!pvInfo.expNew) newErrors.expNew = "Expiration Date is required";
      if (!pvInfo.make) newErrors.make = "Make is required";

      setErrors(newErrors);
      Object.values(newErrors).forEach((error) => toast.error(error));

      return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
      // handle Form Update Only Condition
      if (defaultValues[field] !== value) {
        setFormUpdateOnly((prev) => ({ ...prev, pvInfo: true }));
      } else {
        setFormUpdateOnly((prev) => ({ ...prev, pvInfo: false }));
      }
      handleFieldValue(field, value, setPvInfo, setErrors);
    };

    useImperativeHandle(ref, () => ({
      validate,
    }));

    useEffect(() => {
      setPvInfo((prevState) => ({
        ...prevState,
        dealer: dealer?.toString(),
        // vin: vin?.toString(),
        // loyaltyCash: loyaltyCash,
        // loyaltyPoints: loyaltyPoints,
        contractno: contractnoDefault,
        // expNew: expNew ? expNew.toString() : "",
      }));
      setDealerID(dealer);
    }, [dealer, vin]);

    useEffect(() => {
      if (pvInfo?.plan && plans?.length > 0) {
        const matchedPlan = plans.find((plan) => plan.PlanID === pvInfo.plan);
        if (matchedPlan) {
          setRoValue(matchedPlan.RO); // assuming RO is the property in the plan object
        }
      }
    }, [pvInfo.plan, plans]);

    // due to old code behaviour, setMakeId set Globally
    useEffect(() => {
      setMakeID(pvInfo.make);
    }, [pvInfo.make]);

    const filteredPlans = dealerData?.Plans?.filter(
      (plan) =>
        plan.EnableKaminskyLoyaltyProgram === "1" && plan.loyaltyId !== null
    );

    const handleAddModel = () => {
      if (!pvInfo?.make) {
        toast.error("Please select a make before adding a model.");
      } else {
        setCarModal(true);
      }
    };

    const productsellingrepslist = productsellingreps?.map((PSR, i) => ({
      text: PSR.FIManagerName,
      value: PSR.FIManagerID,
    }));

    const salespersonslist = salespersons?.map((SP, i) => ({
      text: SP.FIManagerName,
      value: SP.FIManagerID,
    }));

    const carModelCreate = () => (
      <Addmodelmodal
        setmodal={setCarModal}
        makeText={makeslist.find((item) => item.value === pvInfo.make)?.text}
        setmodels={setModelsData}
        MakeID={pvInfo.make}
        DealerID={pvInfo.dealer}
      />
    );
    // if batch no not null and Status=I or P dono surant main plan disable ho ga

    const disabledPlan =
      ((contract?.contractinfo?.Status === "I" ||
        contract?.contractinfo?.Status === "P") &&
        contract?.BatchNo !== null) ||
      usedservices?.length > 0;

    return (
      <>
        {carModal && carModelCreate()}
        <ShadowContainer>
          <div className={`w-full p-6  flex flex-col gap-2`}>
            <div className="flex items-center justify-between lg:flex-nowrap flex-wrap gap-4 ">
              <h2 className="text-2xl font-bold text-left mb-4">
                Plan & Vehicle Info
              </h2>
              {disabledPlan && (
                <div className="p-4 pr-32 bg-blue-200 text-black/80 rounded ">
                  Plan cannot be changed:{" "}
                  <span className="font-bold">
                    Because service(s) have already been used.
                  </span>
                </div>
              )}
            </div>
            {dealerSettingCheck && (
              <div className="flex flex-row gap-4">
                <CheckboxWithText
                  label="Loyalty Cash"
                  checked={pvInfo.loyaltyCash}
                  setchecked={(checked) =>
                    handleInputChange("loyaltyCash", checked)
                  }
                  bg="bg-gray-200"
                />
                <CheckboxWithText
                  label="Loyalty Points"
                  checked={pvInfo.loyaltyPoints}
                  setchecked={(value) =>
                    handleInputChange("loyaltyPoints", value)
                  }
                  bg="bg-gray-200"
                />
                {/* {dealerSetting?.EnableWelcomeSms && (
            <CheckboxWithText
              label="Enable Welcome SMS"
              checked={pvInfo.welcomeSms}
              setchecked={(checked) => handleInputChange("welcomeSms", checked)}
              bg="bg-gray-200"
            />
          )} */}
              </div>
            )}
            {/* 5N1DR2DN6LC636204 */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between">
              <div>
                <Select
                  options={dealerOptions}
                  value={pvInfo.dealer}
                  setvalue={setdealer}
                  label="Dealer"
                  bgcolor="bg-[#ffffff]"
                  defaultDealer={contract?.contractinfo?.DealerID}
                  width={"full"}
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Contract Number"
                  placeholder="Enter Contract Number"
                  value={pvInfo?.contractno}
                  setvalue={(value) => handleInputChange("contractno", value)}
                  required
                  defaultValue1={
                    contractnoDefault ? contractnoDefault : contractno
                  }
                  width={"full"}
                  bgcolor={"gray-100"}
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-12 gap-4">
              <div className="lg:col-span-8 col-span-12 gap-4 mt-6">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 mt-1">
                  <Input
                    label="VIN"
                    value={pvInfo?.vin}
                    setvalue={(value) => handleInputChange("vin", value)}
                    placeholder="VIN"
                    type="text"
                    bgcolor="gray-100"
                    className={"pr-16 z-10 "}
                    suffix={() => (
                      <div
                        onClick={fetchVinData}
                        className="z-0  overflow-hidden p-1 mr-1 hover:bg-gray-200 Transition 
                      flex items-center justify-center  rounded-lg border border-gray-500
                      text-xs text-gray-500 "
                      >
                        DECODE
                      </div>
                    )}
                    loading={loading}
                    width={"full"}
                  />
                  {/* make Select */}
                  <Select
                    label={"Make"}
                    options={makeslist}
                    value={pvInfo.make}
                    setvalue={(value) => {
                      setSelectMakeID(value);
                      setMakeID(value);
                      handleInputChange("make", value);
                    }}
                  />

                  {/* Show Model if selectMakeId and dealer */}
                  <Select
                    label={"Model"}
                    options={modelslist}
                    value={pvInfo.model}
                    setvalue={(value) => {
                      setSelectModelID(value);
                      handleInputChange("model", value);
                    }}
                  />
                  <Select
                    label={"Year"}
                    options={yearslist}
                    value={pvInfo.year}
                    setvalue={(value) => {
                      setSelectYear(value);
                      handleInputChange("year", value);
                    }}
                  />

                  <div className="flex flex-col gap-2">
                    {/* <label className="font-medium w-full">Vehicle Type</label> */}
                    <Select
                      options={vehicletypelist}
                      value={pvInfo.vehicletype} // Pass current value
                      setvalue={(value) =>
                        handleInputChange("vehicletype", value)
                      } // Update state
                      label="Vehicle Type"
                      bgcolor="bg-[#ffffff]"
                      width="full"
                      defaultDealer={
                        vehicletypeDefault ? vehicletypeDefault : ""
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="number"
                      label="Mileage"
                      placeholder="Enter Mileage"
                      value={pvInfo?.mileage}
                      setvalue={(value) => handleInputChange("mileage", value)}
                      defaultValue1={mileageDefault}
                      width="full"
                      bgcolor="gray-100"
                      min={parseInt(specificPlanLimits[0]?.PlanMileage)}
                      max={parseInt(specificPlanLimits[0]?.PlanMileageMax)}
                    />
                  </div>
                </div>

                <div className="my-4">
                  <CustomButton
                    size="sm"
                    onClick={handleAddModel}
                    disabled={!makeID && !makeDefault}
                  >
                    Add Model
                  </CustomButton>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                  <Input
                    type="text"
                    label="Deal"
                    placeholder="Enter Deal"
                    value={pvInfo?.deal}
                    setvalue={(value) => handleInputChange("deal", value)}
                    width="full"
                    bgcolor="gray-100"
                    autoFillValue={dealNoDefault}
                  />
                  {/* <Input
              label="One Time RO Number"
              value={oneTimeRONumber}
              setvalue={(value) => handleInputChange("oneTimeRONumber", value)}
              placeholder="One Time RO Number"
              type="text"
              bgcolor={"gray-100"}
              width={"full"}
              defaultValue1={roDefault}
            /> */}
                  <Input
                    type="text"
                    label="Stock"
                    placeholder="Enter Stock"
                    value={pvInfo?.stock}
                    setvalue={(value) => handleInputChange("stock", value)}
                    width={"full"}
                    bgcolor={"gray-100"}
                    autoFillValue={stockdealDefault}
                  />
                </div>
              </div>

              <div className="lg:col-span-4 col-span-12 gap-4 mt-6">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div className="w-full">
                    <Select
                      options={allPlans}
                      value={pvInfo.plan}
                      // setvalue={setplan}
                      // onSelectionChange={(e) => console.log(e)}
                      setvalue={(value) => handleInputChange("plan", value)}
                      label="Plan"
                      bgcolor="bg-[#ffffff]"
                      width={"full"}
                      defaultDealer={pvInfo.plan ? pvInfo.plan : ""}
                      isDisabled={disabledPlan}
                    />
                  </div>
                  {/* <Select   
            options={smlclist}
            value={smlcPointsSelect}
            // setvalue={setplan}
            // onSelectionChange={(e) => console.log(e)}
            setvalue={(value) => handleInputChange("smlcPointsSelect", value)}
            label="Loyalty Points"
            bgcolor="bg-[#ffffff]"
            width={"full"}
            defaultSelectedKey={[24]}
          /> */}
                  {filteredList?.EnableKaminskyLoyaltyProgram === "1" &&
                  dealerData?.EnableKaminskyLoyaltyProgram === "1" ? (
                    <div className="w-full flex flex-col gap-2">
                      <label className="font-medium w-full">
                        Loyalty Points
                      </label>
                      <NextuiSelect
                        label="Loyalty Points"
                        selectedKeys={selectLoyaltyID}
                        onSelectionChange={(value) => {
                          setSelectLoyaltyID(value);
                          handleInputChange("smlcPointsSelect", value);
                        }}
                        isDisabled={filteredList?.LoyaltyID !== null}
                      >
                        {smlclist?.map((smlc) => (
                          <SelectItem key={smlc.value} value={smlc.value}>
                            {smlc.text + " ( " + smlc.points + " )"}
                          </SelectItem>
                        ))}
                      </NextuiSelect>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Select
                    options={productsellingrepslist}
                    value={pvInfo.productsellingrep}
                    defaultDealer={
                      productsellingrepDefault ? productsellingrepDefault : ""
                    }
                    // setvalue={setproductsellingrep}
                    setvalue={(value) =>
                      handleInputChange("productsellingrep", value)
                    }
                    label="Product Selling Rep"
                    bgcolor="bg-[#ffffff]"
                    width={"full"}
                  />

                  {/* {(dealerData?.EnableKaminskyLoyaltyProgram === "1" ||
              dealerData?.EnableVehicleCoverageLP === "1") &&
            selectedPlan?.EnableKaminskyLoyaltyProgram === "1" ? (
              <Select
                options={loyaltyIdList}
                value={loyaltyId}
                // setvalue={setplan}
                // onSelectionChange={(e) => console.log(e)}
                setvalue={(value) => handleInputChange("LoyaltyID", value)}
                label="LoyaltyID"
                bgcolor="bg-[#ffffff]"
                width={"96"}
              /> 
            ) : (
              ""
            )} */}

                  <Select
                    options={salespersonslist}
                    value={pvInfo.salesperson}
                    defaultDealer={salespersonDefault ? salespersonDefault : ""}
                    setvalue={(value) =>
                      handleInputChange("salesperson", value)
                    }
                    label="Sales Person"
                    bgcolor="bg-[#ffffff]"
                    width={"full"}
                  />

                  <Input
                    type="date"
                    label="Sale Date"
                    value={formatDate(pvInfo?.saledate)}
                    setvalue={(value) => {
                      // setSaleDate(value);
                      getPlanExpiry(formatDate(value));
                      handleInputChange("saledate", formatDate(value));
                    }}
                    defaultValue1={formatDate(pvInfo?.saledate)}
                    autoFillValue={formatDate(pvInfo?.saledate)}
                    width={"full"}
                    bgcolor={"gray-100"}
                    editable={!pvInfo?.plan}
                  />

                  <Input
                    type="date"
                    label="Expiration Date"
                    value={pvInfo?.expNew ? formatDate(pvInfo?.expNew) : ""}
                    defaultValue1={formatDate(expirationdateDefault)}
                    width={"full"}
                    bgcolor={"gray-100"}
                    editable={true}
                    disable={true}
                    // autoFillValue={formatDate(pvInfo?.expNew)}
                  />

                  {roValue && roValue === "1" && (
                    <Input
                      type="text"
                      label="RO"
                      placeholder="Enter RO"
                      value={ro}
                      setvalue={(value) => handleInputChange("ro", value)}
                      autoFillValue={roDefault}
                      width="full"
                      bgcolor="gray-100"
                    />
                  )}
                  {dealerSetting?.CustomerNumber ? (
                    <div>
                      <Input
                        type="text"
                        label="CustomerNumber"
                        placeholder="Enter Customer Number"
                        value={customerNumber}
                        setvalue={(value) =>
                          handleInputChange("customerNumber", value)
                        }
                        width="full"
                        bgcolor="gray-100"
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ShadowContainer>
      </>
    );
  }
);
PVInfo.displayName = "PVInfo";

export default PVInfo;
