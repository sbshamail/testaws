"use client";
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { ResellContractContext } from "../page";
import Input from "@/app/Components/Inputs/Input";
import { generateYearsArray } from "@/app/functions";
import Button from "@/app/Components/Button";
import { GlobalContext } from "@/app/Provider";
import { Select as NextuiSelect, SelectItem } from "@nextui-org/react";
import CheckboxWithText from "@/app/Components/Inputs/CheckboxWithText";
import Select from "@/app/Components/Inputs/Select";

const ResellPVInfo = forwardRef(({ autoFillData, updateData }, ref) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    params,
    contract,
    services,
    setmodal,
    setDealerAutoFill,
    dealerAutoFill,
    setPlanCost,
    planCost,
    setPlanID,
    setDealerID,
    setMakeID,
    makeID,
    modal,
    newModelID,
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
    welcomeSmsCheck,
    dataRecieved,
    resellPlanClicked,
    resellPlanId,
    makes,
    plans,
    banks,
    setaddbankmodal,
    setplans,
    setproductsellingreps,
    productsellingreps,
    setsalespersons,
    salespersons,
    contractbank,
    setcontractbank,
    setvinDefault,
    contractcost,
  } = useContext(ResellContractContext);
  const [loading, setLoading] = useState(false);
  const [dealer, setdealer] = useState("515");
  const [vin, setvin] = useState("");
  const [contractno, setcontractno] = useState("");
  const [make, setmake] = useState("");
  const [plan, setplan] = useState(planDefault);
  const [smlcPointsSelect, setSmlcPointsSelect] = useState("");
  const [productsellingrep, setproductsellingrep] = useState(
    productsellingrepDefault
  );
  const [year, setyear] = useState("");
  const [password, setpassword] = useState("");
  // const [welcomeSms, setwelcomeSms] = useState("");
  const [salesperson, setsalesperson] = useState(salespersonDefault);
  const [deal, setdeal] = useState("");
  const [stock, setstock] = useState("");
  const [oneTimeRONumber, setOneTimeRONumber] = useState("");
  const [mileage, setmileage] = useState("");
  const [ro, setro] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [saledate, setsaledate] = useState("");
  const [expirationdate, setexpirationdate] = useState("");
  const [models, setmodels] = useState([]);
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
  const [errors, setErrors] = useState({});
  const [assignNewContractNumber, setAssignNewContractNumber] = useState(null);
  const [dealerData, setDealerData] = useState(null);
  const [vehicletype, setvehicletype] = useState(vehicletypeDefault);
  const [loyaltyId, setLoyaltyId] = useState("");
  const [modelsData, setModelsData] = useState([]);
  const [modelsNewID, setModelsNewID] = useState(null);
  const [smlcpoints, setSmlcpoints] = useState([]);
  const [expNew, setExpNew] = useState("");
  const [newContractTotalCost, setNewContractTotalCost] = useState();

  const [pvInfo, setPvInfo] = useState({
    dealer: dealer,
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
    expNew: expNew ? expNew : expirationdateDefault,
    welcomeSms: welcomeSmsCheck,
    loyaltyCash: loyaltyCashCheck,
    loyaltyPoints: loyaltyCashPoints,
    // LoyaltyID: "",
    oneTimeRONumber: "",
    smlcPointsSelect: "",
    contractbank: contractbank || "",
    contractcost: contractcost,
    newContractTotalCost: newContractTotalCost,
    isServiceContract: contract?.contractinfo?.isServiceContract
      ? contract.contractinfo.isServiceContract
      : "no",
  });

  useEffect(() => {
    if (makeDefault || modelDefault || yearDefault || vehicletypeDefault) {
      setSelectMakeID(new Set([makeDefault]));
      setSelectModelID(new Set([modelDefault]));
      setSelectYear(new Set([yearDefault]));
    }
  }, [makeDefault, modelDefault, yearDefault, vehicletypeDefault]);

  useEffect(() => {
    const bankObject = banks.find((bank) => bank.BankID === contractbank);

    if (bankObject) {
      setcontractbank(new Set([bankObject.BankID]));
    }
  }, [contractbank, banks]);

  const dealerOptions = GLOBAL_DEALERS_INFO
    ? GLOBAL_DEALERS_INFO.map((dealer) => ({
        text: dealer.DealerTitle,
        value: dealer.DealerID,
      }))
    : [];

  const defaultDealer = dealerOptions?.find(
    (dealer) => dealer.value === GLOBAL_RESPONSE?.DefaultDealerID
  );

  const makeslist = makes?.map((make, i) => {
    return { text: make.Make, value: make.MakeID };
  });

  const planslist = plans.map((plan, i) => ({
    text: plan.PlanDescription,
    value: plan.PlanID,
  }));
  const selectedPlan = plans.find((plan) => plan.PlanID === planDefault);
  const planPrice = selectedPlan ? selectedPlan.customerprice : null;

  const smlclist =
    smlcpoints?.map((loyalty) => ({
      text: loyalty.LoyaltyTitle,
      value: loyalty.LoyaltyID,
      points: loyalty.LoyaltyPoints,
    })) || [];

  const filteredList = plans?.find((plan) => plan?.PlanID === pvInfo?.plan);
  const filteredLoyalty = filteredList?.LoyaltyID > 0 ? filteredList : null;

  useEffect(() => {
    const loyaltyIDSet = new Set([filteredLoyalty?.LoyaltyID]);
    setSelectLoyaltyID(loyaltyIDSet);
    handleInputChange("smlcPointsSelect", loyaltyIDSet);
  }, [pvInfo.plan]);

  const specificPlanLimits = plans.filter(
    (plan) => pvInfo?.plan === plan?.PlanID
  );

  const modelslist = modelsData.map((plan, i) => ({
    text: plan.Model,
    value: plan.ModelID,
  }));

  const productsellingrepslist = productsellingreps.map((PSR, i) => ({
    text: PSR.FIManagerName,
    value: PSR.FIManagerID,
  }));

  const salespersonslist = salespersons.map((SP, i) => ({
    text: SP.FIManagerName,
    value: SP.FIManagerID,
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

  const fetchPlanCost = () => {
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

    fetch("https://mypcp.us/webservices/contracts/plancost", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          setPlanID(pvInfo?.plan);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const dataAgainstDealerId = useCallback(() => {
    setLoading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealer ? dealer : defaultDealer?.value);

    fetch("https://mypcp.us/webservices/contracts/dataagainstdealerid", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          setDealerData(res);
          setplans(res.Plans);
          setSmlcpoints(res.smlcpoints);
          setproductsellingreps(res.ProductSellingReps);
          setsalespersons(res.SalesSellingReps);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [GLOBAL_RESPONSE, dealer, defaultDealer, pvInfo?.plan]);

  const modelAgainstMake = useCallback(() => {
    setLoading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append(
      "MakeID",
      pvInfo.make instanceof Set ? [...pvInfo.make][0] : makeDefault
    );
    formdata.append(
      "DealerID",
      defaultDealer?.value ? defaultDealer?.value : dealer
    );

    fetch("https://mypcp.us/webservices/contracts/modelagainstmake", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          setModelsData(res?.SpecifixModels);
          setModelsNewID(res);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [GLOBAL_RESPONSE, dealer, defaultDealer]);

  const loyaltyIdList = dealerData?.smlcpoints?.map((loyalty, i) => ({
    text: loyalty?.LoyaltyTitle + " " + loyalty?.LoyaltyPoints,
    value: loyalty?.LoyaltyID,
  }));

  useEffect(() => {
    fetchPlanCost();
  }, [pvInfo?.plan]);

  useEffect(() => {
    dataAgainstDealerId();
  }, [GLOBAL_RESPONSE, dealer]);
  useEffect(() => {
    modelAgainstMake();
  }, [makeID, modal, newModelID, selectMakeID]);

  useEffect(() => {
    setDealerAutoFill(dealer);
  }, [autoFillData]);

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
    formdata.append("DealerID", dealer);
    formdata.append("VIN", vinDefault ? vinDefault : pvInfo.vin);
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
          dealer: dealer.toString(),
          vin: vinDefault?.toString(),
          make: makeObject?.value,
          model: modelObject.value,
          year: yearObject.text,
          contractbank: contractbank,
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

  const getPlanExpiry = () => {
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
    formdata.append("SaleDate", pvInfo?.saledate);

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
            setExpNew(formatDate(expiryDate));
          }
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getPlanExpiry();
  }, [pvInfo?.saledate]);

  useEffect(() => {
    updateData(pvInfo);
  }, [pvInfo, contract]);
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

      setSelectModelID(new Set([matchingModel?.value]));
    }
  }, [makeslist, modelslist, newModelID]);

  const validate = () => {
    const newErrors = {};

    // if (!pvInfo.saledate) newErrors.saledate = "Sale Date is required";
    if (!pvInfo.vin) newErrors.vin = "Vin is required";
    if (!pvInfo.model) newErrors.model = "Model is required";
    if (!pvInfo.year) newErrors.year = "Year is required";
    if (!pvInfo.saledate) newErrors.saledate = "Sale Date is required";
    // if (!pvInfo.salesperson) newErrors.salesperson = "Sales Rep is required";
    if (!pvInfo.mileage) newErrors.mileage = "Mileage is required";
    if (!pvInfo.vehicletype) newErrors.vehicletype = "Vehicle Type is required";
    if (!pvInfo.plan) newErrors.plan = "Plan is required";
    if (!pvInfo.dealer) newErrors.dealer = "Dealer is required";
    if (!pvInfo.expNew) newErrors.expNew = "Expiration Date is required";
    if (!pvInfo.make) newErrors.make = "Make is required";
    if (!pvInfo?.contractcost)
      newErrors.contractcost = "Contract Cost is required";

    setErrors(newErrors);
    Object.values(newErrors).forEach((error) => toast.error(error));

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setPvInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };
  useImperativeHandle(ref, () => ({
    validate,
  }));
  useEffect(() => {
    setPvInfo((prevState) => ({
      ...prevState,
      dealer: dealer?.toString(),
      contractbank: contractbank,
      // vin: vin?.toString(),
      // loyaltyCash: loyaltyCash,
      // loyaltyPoints: loyaltyPoints,
      contractno: contractnoDefault,
      expNew: expNew ? expNew.toString() : "",
    }));
    setDealerID(dealer);
  }, [dealer, vinDefault, expNew]);

  const convertDateToISO = (dateString) => {
    const [month, day, year] = dateString?.split("-");
    return `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;
  };

  useEffect(() => {
    if (pvInfo?.plan && plans?.length > 0) {
      const matchedPlan = plans.find((plan) => plan.PlanID === pvInfo.plan);
      if (matchedPlan) {
        setRoValue(matchedPlan.RO); // assuming RO is the property in the plan object
      }
    }
  }, [pvInfo, plans]);
  const filteredPlans = dealerData?.Plans?.filter(
    (plan) =>
      plan.EnableKaminskyLoyaltyProgram === "1" && plan.loyaltyId !== null
  );

  const handleAddModel = () => {
    if (!makeID) {
      toast.error("Please select a make before adding a model.");
      return;
    }
    setmodal(true);
  };
  const handleRadioChange = (e) => {
    const value = e.target.value.toLowerCase(); // Convert input value to lowercase for consistent handling
    const isServiceContract = value === "yes"; // Treat 'yes' as true, anything else as false

    // Update pvInfo state based on the radio button selection
    setPvInfo((prevState) => ({
      ...prevState,
      isServiceContract: isServiceContract ? "yes" : "no", // Store normalized value in state
    }));

    // Optionally, handle the change with your handleInputChange function
    handleInputChange("isServiceContract", isServiceContract ? "yes" : "no");
  };
  useEffect(() => {
    setPvInfo({
      dealer: dealer,
      vin: vinDefault,
      contractno: contractnoDefault,
      make: makeDefault,
      plan: planDefault,
      model: modelDefault,
      productsellingrep: productsellingrepDefault,
      year: yearDefault,
      password: "",
      vehicletype: vehicletypeDefault,
      // salesperson: salespersonDefault,
      stock: stockdealDefault,
      deal: dealNoDefault,
      mileage: mileageDefault,
      ro: roDefault,
      saledate: saledateDefault,
      customerNumber: "",
      expNew: expNew ? expNew : convertDateToISO(expirationdateDefault),
      welcomeSms: welcomeSmsCheck,
      loyaltyCash: loyaltyCashCheck,
      loyaltyPoints: loyaltyCashPoints,
      oneTimeRONumber: "",
      smlcPointsSelect: "",
      contractcost: contractcost,
      isServiceContract: contract?.contractinfo?.isServiceContract
        ? contract.contractinfo.isServiceContract
        : "no",
    });
  }, [
    contract,
    dealer,
    vinDefault,
    contractnoDefault,
    makeDefault,
    // planDefault,
    modelDefault,
    productsellingrepDefault,
    yearDefault,
    vehicletypeDefault,
    salespersonDefault,
    stockdealDefault,
    dealNoDefault,
    mileageDefault,
    roDefault,
    saledateDefault,
    expirationdateDefault,
    welcomeSmsCheck,
    loyaltyCashCheck,
    loyaltyCashPoints,
    contractbank,
  ]);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-left mb-4">Plan & Vehicle Info</h2>
      {dealerSettingCheck && (
        <div className="flex flex-row gap-4">
          <CheckboxWithText
            label="Loyalty Cash"
            checked={pvInfo.loyaltyCash}
            setchecked={(checked) => handleInputChange("loyaltyCash", checked)}
            bg="bg-gray-200"
          />
          <CheckboxWithText
            label="Loyalty Points"
            checked={pvInfo.loyaltyPoints}
            setchecked={(value) => handleInputChange("loyaltyPoints", value)}
            bg="bg-gray-200"
          />
        </div>
      )}
      {/* 5N1DR2DN6LC636204 */}
      <div className="flex justify-between">
        <div>
          <Select
            options={dealerOptions}
            value={!defaultDealer?.value ? "515" : dealer}
            setvalue={setdealer}
            label="Dealer"
            bgcolor="bg-[#ffffff]"
            defaultDealer={"515"}
            width={96}
            // setvalue={(value) => handleInputChange("dealer", value)}
          />
        </div>
        <div>
          <Input
            type="text"
            label="Contract Number"
            placeholder="Enter Contract Number"
            value={contractnoDefault}
            setvalue={(value) => handleInputChange("contractno", value)}
            required
            defaultValue1={contractnoDefault ? contractnoDefault : contractno}
            width={96}
            bgcolor={"gray-100"}
          />
        </div>
      </div>
      <div className="w-full flex gap-10">
        <div className="w-[50%]">
          <div className="grid grid-cols-3 gap-4 mt-1">
            <Input
              label="VIN"
              value={pvInfo.vin}
              setvalue={setvinDefault}
              placeholder="VIN"
              type="text"
              bgcolor="gray-100"
              image={"/images/vin-decode.png"}
              loading={loading}
              onImageClick={fetchVinData}
              autoFillValue={vinDefault}
              width={"full"}
            />

            <div className="flex flex-col gap-2">
              <label className="font-medium w-full">Make</label>
              <NextuiSelect
                label="Make"
                className="bg-red"
                selectedKeys={selectMakeID}
                onSelectionChange={(value) => {
                  setSelectMakeID(value);
                  setMakeID(value);
                  handleInputChange("make", value);
                }}
              >
                {makeslist?.map((make) => (
                  <SelectItem key={make.value} value={make.value}>
                    {make.text}
                  </SelectItem>
                ))}
              </NextuiSelect>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium w-full">Model</label>
              <NextuiSelect
                label="Model"
                selectedKeys={selectModelID}
                onSelectionChange={(value) => {
                  setSelectModelID(value);
                  handleInputChange("model", value);
                }}
              >
                {modelslist?.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.text}
                  </SelectItem>
                ))}
              </NextuiSelect>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium w-full">Year</label>
              <NextuiSelect
                label="Year"
                selectedKeys={selectYear}
                onSelectionChange={(value) => {
                  setSelectYear(value);
                  handleInputChange("year", value);
                }}
              >
                {yearslist?.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.text}
                  </SelectItem>
                ))}
              </NextuiSelect>
            </div>

            <div className="flex flex-col gap-2">
              {/* <label className="font-medium w-full">Vehicle Type</label> */}
              <Select
                options={vehicletypelist}
                value={pvInfo.vehicletype} // Pass current value
                setvalue={(value) => handleInputChange("vehicletype", value)} // Update state
                label="Vehicle Type"
                bgcolor="bg-[#ffffff]"
                width="full"
                defaultDealer={vehicletypeDefault ? vehicletypeDefault : ""}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                type="number"
                label="Mileage"
                placeholder="Enter Mileage"
                value={mileage}
                setvalue={(value) => handleInputChange("mileage", value)}
                autoFillValue={mileageDefault}
                width="full"
                bgcolor="gray-100"
                min={parseInt(specificPlanLimits[0]?.PlanMileage)}
                max={parseInt(specificPlanLimits[0]?.PlanMileageMax)}
              />
            </div>
          </div>
          <div className="my-4">
            <Button
              text="Add Model"
              onClick={() => {
                if ([...selectMakeID][0]) {
                  setmodal(true);
                  setMakeID([...selectMakeID][0]);
                }
              }}
              bg="siteBlue"
              disabled={!makeID && !makeDefault}
              diabledMessage={"Please select a Make first"}
            />
          </div>
          <div className="w-3/5 flex gap-4 items-center">
            <NextuiSelect
              label="Bank List"
              value={pvInfo.contractbank}
              setvalue={(value) => handleInputChange("contractbank", value)}
              onSelectionChange={(value) => {
                handleInputChange("contractbank", value);
              }}
              error={pvInfo.contractbank}
              selectedKeys={
                pvInfo.contractbank instanceof Set
                  ? [...pvInfo.contractbank][0]
                  : contractbank.toString()
              }
            >
              {banks?.map((bank) => (
                <SelectItem key={bank.BankID} value={bank.BankID}>
                  {bank?.BankName}
                  {/* {bank.CityName + bank.StateTitle + bank.StateCode} */}
                </SelectItem>
              ))}
            </NextuiSelect>
            <Button
              onClick={() => {
                setaddbankmodal(true);
              }}
              text="Add Bank"
              bg="siteBlue"
              width={"1/2"}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Input
              type="text"
              label="Deal"
              placeholder="Enter Deal"
              value={deal}
              setvalue={(value) => handleInputChange("deal", value)}
              width="full"
              bgcolor="gray-100"
              autoFillValue={dealNoDefault}
            />
            <Input
              label="Contract Total Cost"
              value={pvInfo?.contractcost}
              setvalue={(value) => handleInputChange("contractcost", value)}
              placeholder="Contract Total Cost"
              type="text"
              bgcolor={"gray-100"}
              width={"full"}
              defaultValue1={
                Number.isFinite(Number(planPrice))
                  ? parseInt(Number(planPrice).toFixed())
                  : 0
              }
            />
            <Input
              type="text"
              label="Stock"
              placeholder="Enter Stock"
              value={stock}
              setvalue={(value) => handleInputChange("stock", value)}
              width={"full"}
              bgcolor={"gray-100"}
              autoFillValue={stockdealDefault}
            />
          </div>
        </div>

        <div className="w-[50%]">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="w-full">
              <Select
                options={planslist}
                value={pvInfo.plan}
                // setvalue={setplan}
                // onSelectionChange={(e) => console.log(e)}
                setvalue={(value) => handleInputChange("plan", value)}
                label="Plan"
                bgcolor="bg-[#ffffff]"
                width={"full"}
                defaultDealer={planDefault ? planDefault : ""}
              />
            </div>

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

            <Input
              type="date"
              label="Sale Date"
              value={pvInfo?.saledate}
              setvalue={(value) => handleInputChange("saledate", value)}
              width={"full"}
              bgcolor={"gray-100"}
              editable={pvInfo?.plan ? false : true}
              defaultValue1={convertDateToISO(saledateDefault)}
              // setvalue={setsaledate}
            />

            <Input
              type="date"
              label="Expiration Date"
              value={expNew ?? pvInfo?.expNew}
              setvalue={(value) => {
                handleInputChange("expNew", value);
              }}
              width={"full"}
              bgcolor={"gray-100"}
              defaultValue1={expNew}
              // autoFillValue={convertDateToISO(expirationdateDefault)}
            />

            {roValue && roValue === "1" ? (
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
            ) : (
              <div></div>
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
          <div className="flex gap-5 py-4">
            <label className="text-base">
              Did you purchase a service contract?
            </label>
            <div className="flex gap-4">
              <label className="flex gap-[6px]">
                <input
                  type="radio"
                  name="serviceContract"
                  value="yes"
                  checked={
                    (pvInfo.isServiceContract || "").toLowerCase() === "yes"
                  } // Default to empty string if undefined
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label className="flex gap-[6px]">
                <input
                  type="radio"
                  name="serviceContract"
                  value="no"
                  checked={
                    (pvInfo.isServiceContract || "").toLowerCase() === "no"
                  } // Default to empty string if undefined
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
ResellPVInfo.displayName = "ResellPVInfo";

export default ResellPVInfo;
