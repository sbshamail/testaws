"use client";
import React, {
  useImperativeHandle,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import toast from "react-hot-toast";
import { CreateContractContext } from "../../page";
import Input from "@/app/Components/Inputs/Input";
import { generateYearsArray, unixTimestampToDate } from "@/app/functions";

import { GlobalContext } from "@/app/Provider";
import Select from "@/app/Components/Inputs/Select";
import { Checkbox } from "@nextui-org/react";

import { Select as NextuiSelect, SelectItem } from "@nextui-org/react";
import CheckboxWithText from "@/app/Components/Inputs/CheckboxWithText";
//components
import { handleFieldValue } from "@/components/forms/functions";
import { fetchPost } from "@/utils/action/function";
import { isValidDate, objectToFormData, Toastify } from "@/utils/helpers";
import {
  getPlanExpiry,
  initialState,
  makeDefaultPlan,
  makeDefaultProductSellingRep,
  validate,
} from "./fn";
import {
  dataAgainstDealerId,
  modelAgainstMake,
} from "@/components/forms/contract/commonfn";
import { CustomButton } from "@/components/cui/button/CustomButton";
import Addmodelmodal from "@/components/forms/contract/Addmodelmodal";
import NextSelect from "@/components/nextui/NextSelect";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import {
  useAutoFillData,
  useAutoFillSaleDate,
  useHandleLoyaltySelection,
} from "../createContactInfo/useHooks";

const CreatePVInfo = ({
  autoFillData,
  pvInfoForm,
  setPvInfoForm,
  auth,
  defaultDealer,
  contractCreate,
  setErrors,
  setLoading,
  errors,
}) => {
  const ref = useRef();

  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE, tab, setTempLoyaltyPoints } =
    useContext(GlobalContext);
  const { Token } = GLOBAL_RESPONSE ?? {};
  const {
    params,
    setDealerAutoFill,
    dealerAutoFill,
    setPlanCost,
    setPlanID,
    setDealerID,
    setMakeID,
    makeID,
    modal,
    newModelID,
    setcontract,
    contract,
  } = useContext(CreateContractContext);

  const [dealer, setdealer] = useState("");
  const [vin, setvin] = useState("");
  const [contractno, setcontractno] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [makes, setmakes] = useState([]);
  const [plans, setplans] = useState([]);
  const [models, setmodels] = useState([]);
  const [productsellingreps, setproductsellingreps] = useState([]);
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
  const [loyaltyCash, setLoyaltyCash] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(false);
  const [planCost1, setPlanCost1] = useState(null);
  const [roValue, setRoValue] = useState(null);

  const [assignNewContractNumber, setAssignNewContractNumber] = useState(null);
  const [dealerData, setDealerData] = useState(null);
  const [loyaltyId, setLoyaltyId] = useState("");
  const [modelsData, setModelsData] = useState([]);

  const [smlcpoints, setSmlcpoints] = useState([]);
  const [expNew, setExpNew] = useState(null);
  const [isPlanDefault, setIsPlanDefault] = useState("0");
  //open modal for car Model
  const [carModal, setCarModal] = useState(false);

  const [isProductSellingRepDefault, setIsProductSellingRepDefault] =
    useState("0");

  useEffect(() => {
    setPvInfoForm((prevForm) => ({
      ...initialState,
      ...prevForm,
    }));
  }, []);

  const dealerOptions = GLOBAL_DEALERS_INFO
    ? GLOBAL_DEALERS_INFO.map((dealer) => ({
        text: dealer.DealerTitle,
        value: dealer.DealerID,
      }))
    : [];
  // const defaultDealer = dealerOptions?.find(
  //   (dealer) => dealer.value === GLOBAL_RESPONSE?.DefaultDealerID
  // );

  const makeslist = makes?.map((make, i) => {
    return { text: make.Make, value: make.MakeID };
  });

  const planslist = plans?.map((plan, i) => ({
    text: plan.PlanDescription,
    value: plan.PlanID,
  }));
  const specificPlanLimits = plans?.filter(
    (plan) => pvInfoForm?.plan === plan?.PlanID
  );
  // console.log("specificPlanLimits", specificPlanLimits[0]?.LoyaltyID);

  const modelslist = modelsData?.map((plan, i) => ({
    text: plan.Model,
    value: plan.ModelID,
  }));
  const productsellingrepslist = productsellingreps?.map((PSR, i) => ({
    text: PSR.FIManagerName,
    value: PSR.FIManagerID,
  }));

  const salespersonslist = salespersons?.map((SP, i) => ({
    text: SP.FIManagerName,
    value: SP.FIManagerID,
  }));

  const smlclist =
    smlcpoints?.map((loyalty) => ({
      text: loyalty.LoyaltyTitle,
      value: loyalty.LoyaltyID,
      points: loyalty.LoyaltyPoints,
    })) || [];

  const yearslist = generateYearsArray()
    .sort((a, b) => b - a) // Sorts the array in descending order
    .map((year) => ({
      text: year.toString(),
      value: year.toString(),
    }));

  // Step 1: Filter rows where PlanID is equal to pvInfoForm?.plan
  const filteredList = plans?.find((plan) => plan?.PlanID === pvInfoForm?.plan);
  const filteredLoyalty = filteredList?.LoyaltyID > 0 ? filteredList : null;
  // Step 2: Check if LoyaltyID is not null, store value or null
  // const smlclistPreFilled = filteredList?.find((loyalty) => ({
  //   loyalty: loyalty.LoyaltyID !== null ? loyalty : null,
  // }));

  //useEffect
  useAutoFillData({
    autoFillData,
    defaultDealer,
    setdealer,
    setvin,
    setPvInfoForm,
    pvInfoForm,
    setSelectYear,
    setSelectModelID,
    setSelectMakeID,
  });
  // handle fields
  const handleInputChange = (field, value) => {
    handleFieldValue(field, value, setPvInfoForm, setErrors);
  };

  //useEffect
  useAutoFillSaleDate({
    autoFillData,
    pvInfoForm,
    setPvInfoForm,
  });
  //useEffect
  useHandleLoyaltySelection({
    filteredLoyalty,
    pvInfoForm,
    setSelectLoyaltyID,
    handleInputChange,
  });

  useEffect(() => {
    const loyaltyIDSet = new Set([filteredLoyalty?.LoyaltyID]);
    setSelectLoyaltyID(loyaltyIDSet);
    handleInputChange("smlcPointsSelect", loyaltyIDSet);
  }, [pvInfoForm.plan]);

  const vehicletypelist = [
    { text: "Pre Owned", value: "O" },
    { text: "New Vehicle", value: "N" },
  ];
  const welcomeSmsList = [
    { text: "Yes", value: "Yes" },
    { text: "No", value: "No" },
  ];

  // get List of AssignNewContractNumber, contract, makes, plan, models, productsellingreps, salespersons, DealerSettingCheck, DealerSetting
  useEffect(() => {
    setAssignNewContractNumber(contractCreate);
    setcontract(contractCreate);
    setmakes(contractCreate?.Makes);
    setplans(contractCreate?.Plans);
    setmodels(contractCreate?.SpecifixModels);
    setproductsellingreps(contractCreate?.ProductSellingReps);
    setsalespersons(contractCreate?.SalesSellingReps);
    setDealerSettingCheck(contractCreate?.dealersetting?.EnableLoyaltyCash);
    setDealerSetting(contractCreate?.dealersetting);
  }, [contractCreate]);

  // get list of planCost, planCost1, planId
  const fetchPlanCost = async () => {
    setLoading(true);
    const formdata = objectToFormData({
      ...auth,
      PlanID: pvInfoForm?.plan,
      DealerID: dealer ? dealer : defaultDealer?.value,
    });
    const res = await fetchPost({
      url: "https://mypcp.us/webservices/contracts/plancost",
      token: Token,
      formdata,
      setLoading,
    });
    if (res) {
      setPlanCost(res);
      setPlanCost1(res);
      setPlanID(pvInfoForm?.plan);
    }
  };

  //vin
  const fetchVinData = async () => {
    // Check if dealer and vin are available
    if (!dealer || !vin.trim()) {
      Toastify("error", "Both Dealer and VIN number must be provided");
      return;
    }

    setLoading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};

    if (!Token) {
      setLoading(false);
      Toastify("error", "Missing Token");
      return;
    }

    const headers = new Headers();
    headers.append("Authorization", Token);

    let formdata = new FormData();
    formdata.append("DealerID", dealer);
    formdata.append("VIN", vin);
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

        setPvInfoForm((prevState) => ({
          ...prevState,
          dealer: dealer.toString(),
          vin: vin?.toString(),
          make: makeObject?.value,
          model: modelObject.value,
          year: yearObject.text,
          loyaltyPointsNew:
            filteredPlansLoyalyPoints?.EnableKaminskyLoyaltyProgram || "",
        }));
      } else {
        Toastify("error", data.message || "Failed to decode VIN");
        setLoading(false);
      }
    } catch (error) {
      Toastify("error", "Fetch failed or timed out");
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const loyaltyIdList = dealerData?.smlcpoints?.map((loyalty, i) => ({
    text: loyalty?.LoyaltyTitle + " " + loyalty?.LoyaltyPoints,
    value: loyalty?.LoyaltyID,
  }));

  useEffect(() => {
    fetchPlanCost();
  }, [pvInfoForm?.plan]);

  // save dealer in autofill to get data accordingly
  useEffect(() => {
    setDealerAutoFill(dealer);
  }, [dealer]);

  //  data against dealer id
  useEffect(() => {
    const promiseDataAgainsDealerId = async () => {
      const res = await dataAgainstDealerId({
        auth,
        DealerID: dealer,
        Token,
        setLoading,
      });
      if (res) {
        setDealerData(res);
        setplans(res.Plans);
        setSmlcpoints(res.smlcpoints);
        setproductsellingreps(res.ProductSellingReps);
        setsalespersons(res.SalesSellingReps);
        //
        if (res?.UserPlans?.PlanID) {
          setIsPlanDefault("1");
        }
        if (res?.UserSpecifixSellingRep?.FIManagerID) {
          setIsProductSellingRepDefault("1");
        }
        setPvInfoForm({
          ...pvInfoForm,
          plan: res?.UserPlans?.PlanID,
          productsellingrep: res?.UserSpecifixSellingRep?.FIManagerID,
          loyaltyPointsNew:
            filteredPlansLoyalyPoints?.EnableKaminskyLoyaltyProgram || "",
        });
      }
    };
    promiseDataAgainsDealerId();
  }, [dealer]);
  //get list of modelsData,
  useEffect(() => {
    if (pvInfoForm.make && !dealer) {
      Toastify("error", "Dealer is not available for Model List");
    }

    const promiseModelAgainsMake = async () => {
      const res = await modelAgainstMake({
        auth,
        Token,
        setLoading,
        MakeID: pvInfoForm.make,
        DealerID: dealer ? dealer : defaultDealer?.value,
      });
      setModelsData(res?.SpecifixModels || []);
    };
    if (dealer && pvInfoForm.make) {
      promiseModelAgainsMake();
    }
  }, [makeID, modal, newModelID, selectMakeID, pvInfoForm.make, dealer]);
  // get expiry date according to saledate
  useEffect(() => {
    const promiseGetPlanExpiry = async () => {
      if (
        pvInfoForm?.saledate &&
        isValidDate(pvInfoForm.saledate) &&
        pvInfoForm?.plan
      ) {
        const res = await getPlanExpiry({
          auth,
          Token,
          PlanID: pvInfoForm?.plan,
          DealerID: dealer,
          SaleDate: pvInfoForm?.saledate,
          setLoading,
        });
        if (res) {
          const expiryDate = res?.contractexpirydate?.MakePlanExpiryDate;
          if (expiryDate) {
            setPvInfoForm((prevState) => ({
              ...prevState,
              expNew: formatDate(expiryDate),
              loyaltyPointsNew:
                filteredPlansLoyalyPoints?.EnableKaminskyLoyaltyProgram || "",
            }));
          }
        }
      }
    };
    promiseGetPlanExpiry();
  }, [pvInfoForm.saledate]);

  useEffect(() => {
    if (vinData) {
      const matchingMake = makeslist.find((make) => make.text === vinData.Make);
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
  useEffect(() => {
    if (newModelID) {
      const matchingModel = modelslist.find(
        (model) => model.value === newModelID.toString()
      );
      // console.log("!", modelslist);
      // console.log("!!", newModelID);
      // console.log("!!!", model);
      setSelectModelID(new Set([matchingModel?.value]));
    }
  }, [makeslist, modelslist, newModelID]);

  useEffect(() => {
    setPvInfoForm((prevState) => ({
      ...prevState,
      dealer: dealer?.toString(),
      vin: vin?.toString(),
      // loyaltyCash: loyaltyCash,
      // loyaltyPoints: loyaltyPoints,
      contractno: assignNewContractNumber?.AssignNewContractNumber,
      loyaltyPointsNew:
        filteredPlansLoyalyPoints?.EnableKaminskyLoyaltyProgram || "",
    }));
    setDealerID(dealer);
  }, [dealer, vin]);

  // const convertDateToISO = (dateString) => {
  //   const [month, day, year] = dateString?.split("-");
  //   return `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;
  // };

  useEffect(() => {
    if (pvInfoForm?.plan && plans?.length > 0) {
      const matchedPlan = plans.find((plan) => plan.PlanID === pvInfoForm.plan);

      setTempLoyaltyPoints(
        filteredPlansLoyalyPoints?.EnableKaminskyLoyaltyProgram
      );

      if (matchedPlan) {
        setRoValue(matchedPlan.RO); // assuming RO is the property in the plan object
        setPvInfoForm((prev) => ({
          ...prev,
          RO: matchedPlan.RO,
          loyaltyPointsNew:
            filteredPlansLoyalyPoints?.EnableKaminskyLoyaltyProgram || "",
        }));
      }
    }
  }, [pvInfoForm?.plan, plans]);
  const filteredPlans = dealerData?.Plans?.filter(
    (plan) =>
      plan.EnableKaminskyLoyaltyProgram === "1" && plan.loyaltyId !== null
  );

  // useEffect(() => {
  const filteredPlansLoyalyPoints = filteredPlans?.find(
    (plan) => plan.PlanID === pvInfoForm?.plan
  );

  // validate handling form
  useImperativeHandle(ref, () => ({
    validate: () => validate(pvInfoForm, setErrors),
  }));

  // checkbox handling
  const handlePlanChecked = (isChecked) => {
    setIsPlanDefault((prev) => {
      if (isChecked) {
        return "1";
      } else {
        return "0";
      }
    });
    makeDefaultPlan(
      { auth, Token },
      isChecked,
      pvInfoForm?.plan,
      dealer ? dealer : defaultDealer?.value,
      makeDefaultPlan,
      setLoading
    );
  };
  const handleProductSellingRepChecked = (isChecked) => {
    setIsProductSellingRepDefault((prev) => {
      if (isChecked) {
        return "1";
      } else {
        return "0";
      }
    });
    makeDefaultProductSellingRep(
      { auth, Token },
      isChecked,
      pvInfoForm?.productsellingrep,
      dealer ? dealer : defaultDealer?.value,
      setLoading
    );
  };
  const handleAddModel = () => {
    if (!pvInfoForm?.make) {
      Toastify("error", "Please select a make before adding a model.");
    } else {
      setCarModal(true);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  // Check if both conditions are met
  const matchingDealer = contract?.dealers?.filter(
    (dealer1) => dealer1.DealerID.toString() === dealer?.toString()
  );

  // Safeguard to handle an empty matchingDealer
  const firstMatchingDealer = matchingDealer?.[0] || {};

  // Check if all conditions are met for the matching dealer
  const showLoyaltyCashCheckbox =
    firstMatchingDealer.EnableLoyaltyCash == "1" &&
    firstMatchingDealer.EnableLoyaltyCashPoint == "1";

  // const showAdditionalConditionsCheckbox =
  //   firstMatchingDealer.EnableLoyaltyCash == "1" &&
  //   (firstMatchingDealer.EnableVehicleCoverageLP == "1" ||
  //     firstMatchingDealer.EnableKaminskyLoyaltyProgram == "1");

  const VinMakeModelYearVehicleMileage = () => {
    return (
      <div className="lg:col-span-8 col-span-12 gap-4 mt-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 mt-1">
          <Input
            label="VIN"
            name="vin"
            placeholder={"VIN"}
            value={vin}
            setvalue={setvin}
            type="text"
            suffix={() => (
              <div
                onClick={fetchVinData}
                className=" hover:bg-gray-200 transition
             flex items-center justify-center p-1 rounded-lg 
             border border-gray-500 text-xs text-gray-500 z-10"
              >
                DECODE
              </div>
            )}
          />
          {/* make Select */}
          <Select
            label={"Make"}
            options={makeslist}
            value={pvInfoForm.make}
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
            value={pvInfoForm.model}
            setvalue={(value) => {
              setSelectModelID(value);
              handleInputChange("model", value);
            }}
          />

          <Select
            label={"Year"}
            options={yearslist}
            value={pvInfoForm.year}
            setvalue={(value) => {
              setSelectYear(value);
              handleInputChange("year", value);
            }}
          />

          <div className="flex flex-col gap-2">
            {/* <label className="font-medium w-full">Vehicle Type</label> */}
            <NextSelect
              options={vehicletypelist}
              value={pvInfoForm.make?.vehicletype}
              setvalue={(value) => handleInputChange("vehicletype", value)}
              label="Vehicle Type"
              bgcolor="bg-[#ffffff]"
              width={"full"}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              type="number"
              label="Mileage"
              placeholder="Enter Mileage"
              value={pvInfoForm?.mileage}
              setvalue={(value) => handleInputChange("mileage", value)}
              autoFillValue={autoFillData?.MILEAGE}
              width="full"
              min={parseInt(
                specificPlanLimits ? specificPlanLimits[0]?.PlanMileage : 0
              )}
              max={parseInt(
                specificPlanLimits ? specificPlanLimits[0]?.PlanMileageMax : 100
              )}
            />
          </div>
        </div>

        <div className="my-4">
          <CustomButton
            id="add-model"
            size="sm"
            onClick={handleAddModel}
            disabled={!makeID && !dealer}
          >
            Add Model
          </CustomButton>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          <Input
            type="text"
            label="Deal"
            placeholder="Enter Deal"
            value={pvInfoForm?.deal}
            setvalue={(value) => handleInputChange("deal", value)}
            width="full"
          />
          {/* <Input
            label="One Time RO Number"
            value={pvInfoForm?.oneTimeRONumber}
            setvalue={(value) =>
              handleInputChange("oneTimeRONumber", value)
            }
            placeholder="One Time RO Number"
            type="text"
            
            width={"full"}
          /> */}
          <Input
            type="text"
            label="Stock"
            placeholder="Enter Stock"
            value={pvInfoForm?.stock}
            setvalue={(value) => handleInputChange("stock", value)}
            width={"full"}
          />
        </div>
      </div>
    );
  };
  return (
    <>
      {carModal && (
        <Addmodelmodal
          setmodal={setCarModal}
          makeText={
            makeslist.find((item) => item.value === pvInfoForm.make)?.text
          }
          setmodels={setModelsData}
          MakeID={pvInfoForm.make}
          DealerID={pvInfoForm.dealer ? pvInfoForm.dealer : dealer}
        />
      )}
      <ShadowContainer>
        <h2 className="text-2xl font-bold text-left mb-4">
          Plan & Vehicle Info
        </h2>
        {dealerSettingCheck && (
          <div className="flex flex-row gap-4 w-full max-w-[400px] min-w-full">
            {showLoyaltyCashCheckbox && (
              <CheckboxWithText
                label="Loyalty Cash"
                checked={pvInfoForm.loyaltyCash}
                setchecked={(checked) =>
                  handleInputChange("loyaltyCash", checked)
                }
                width={"1/3"}
              />
            )}

            {pvInfoForm?.loyaltyCash && (
              <CheckboxWithText
                label="Loyalty Points for buying Vehicle"
                checked={pvInfoForm.loyaltyPoints}
                setchecked={(value) =>
                  handleInputChange("loyaltyPoints", value)
                }
                width={"1/3"}
              />
            )}

            {dealerData?.dealersetting?.EnableWelcomeSms && (
              <CheckboxWithText
                label="Enable Welcome SMS"
                checked={pvInfoForm.welcomeSms}
                setchecked={(checked) =>
                  handleInputChange("welcomeSms", checked)
                }
                width={"1/3"}
              />
            )}
          </div>
        )}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between">
          <>
            <div>
              {/* dealer select */}
              <Select
                options={dealerOptions}
                value={dealer}
                label="Dealer"
                // defaultDealer={"515"}
                width={96}
                setvalue={(value) => {
                  setdealer(value);
                  handleInputChange("dealer", value);
                }}
              />
            </div>
            <div>
              <Input
                type="text"
                label="Contract Number"
                placeholder="Enter Contract Number"
                value={
                  assignNewContractNumber?.AssignNewContractNumber ?? contractno
                }
                setvalue={(value) => handleInputChange("contractno", value)}
                required
                // defaultValue1={assignNewContractNumber?.AssignNewContractNumber}
                width={96}
              />
            </div>
          </>
        </div>
        <div className="w-full grid grid-cols-12 gap-4">
          {VinMakeModelYearVehicleMileage()}

          <div className="lg:col-span-4 col-span-12 gap-4 mt-6">
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="w-full flex justify-center gap-4">
                <Select
                  options={planslist}
                  value={pvInfoForm?.plan}
                  // setvalue={setplan}
                  // onSelectionChange={(e) => console.log(e)}
                  setvalue={(value) => handleInputChange("plan", value)}
                  label="Plan"
                  width={"full"}
                  defaultDealer={dealerData?.UserPlans?.PlanID}
                />
                <Checkbox
                  isSelected={isPlanDefault === "1"}
                  onValueChange={(isChecked) => {
                    toast.dismiss();
                    if (!pvInfoForm?.plan && isChecked) {
                      Toastify("error", "Please select a plan");
                      return;
                    }
                    handlePlanChecked(isChecked);
                    // setIsPlanDefault(isChecked ? "1" : "0");
                  }}
                  radius="sm"
                  size="lg"
                  className="mt-6"
                  disabled={!pvInfoForm?.plan}
                />
              </div>
              {/* <Select 
            options={smlclist}
            value={smlcPointsSelect}
            // setvalue={setplan}
            // onSelectionChange={(e) => console.log(e)}
            setvalue={(value) => handleInputChange("smlcPointsSelect", value)}
            label="Loyalty Points"
          
            width={"full"}
            defaultSelectedKey={[24]}
          /> */}
              {filteredList?.EnableKaminskyLoyaltyProgram === "1" &&
              dealerData?.EnableKaminskyLoyaltyProgram === "1" ? (
                <div className="w-full flex flex-col gap-2">
                  <label className="font-medium w-full">Loyalty Points</label>
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

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="flex gap-3">
                <Select
                  options={productsellingrepslist}
                  value={pvInfoForm?.productsellingrep}
                  // setvalue={setproductsellingrep}
                  setvalue={(value) =>
                    handleInputChange("productsellingrep", value)
                  }
                  label="Product Selling Rep"
                  width={"full"}
                  defaultDealer={
                    dealerData?.UserSpecifixSellingRep?.FIManagerID
                  }
                />

                <Checkbox
                  isSelected={isProductSellingRepDefault === "1"}
                  onValueChange={(isChecked) => {
                    toast.dismiss();
                    if (!pvInfoForm?.productsellingrep && isChecked) {
                      Toastify("error", "Please select a Product Selling Rep");
                      return;
                    }
                    handleProductSellingRepChecked(isChecked);
                    // setIsProductSellingRepDefault(isChecked ? "1" : "0");
                  }}
                  radius="sm"
                  size="lg"
                  className="mt-6"
                  disabled={!pvInfoForm?.productsellingrep}
                />
              </div>

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
                width={"96"}
              /> 
            ) : (
              ""
            )} */}

              <Select
                options={salespersonslist}
                value={pvInfoForm.salesperson}
                // setvalue={setsalesperson}
                setvalue={(value) => handleInputChange("salesperson", value)}
                label="Sales Person"
                width={"full"}
              />
            </div>
            <div className="grid grid-cols-2 mt-4 gap-2">
              {/* sale date input */}
              <Input
                type="date"
                label="Sale Date"
                value={
                  pvInfoForm?.saledate
                  // formatDate(pvInfoForm?.saledate)
                  //   ? formatDate(pvInfoForm?.saledate)
                  //   : ""
                }
                setvalue={(value) => handleInputChange("saledate", value)}
                autoFillValue={
                  autoFillData?.Sold_Date
                    ? formatDate(autoFillData?.Sold_Date)
                    : ""
                }
                width={"full"}
              />

              <Input
                type="date"
                label="Expiration Date"
                value={pvInfoForm.expNew ? pvInfoForm.expNew : ""}
                setvalue={(value) => {
                  handleInputChange("expNew", value);
                }}
                width={"full"}
                editable={true}
                // autoFillValue={expNew ? expNew : ""}
              />

              {roValue && roValue === "1" && (
                <Input
                  type="text"
                  label="RO"
                  placeholder="Enter RO"
                  value={pvInfoForm.RO}
                  setvalue={(value) => handleInputChange("RO", value)}
                  autoFillValue={autoFillData?.RO}
                  width="full"
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
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </ShadowContainer>
    </>
  );
};

export default CreatePVInfo;
