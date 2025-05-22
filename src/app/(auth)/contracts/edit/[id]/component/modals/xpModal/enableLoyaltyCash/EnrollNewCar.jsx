import React, { useContext, useEffect, useState } from "react";
import Input from "@/app/Components/Inputs/Input";
import Select from "@/app/Components/Inputs/Select";

import { GlobalContext } from "@/app/Provider";
import { fetchPostObj } from "@/utils/action/function";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { modelAgainstMake } from "@/components/forms/contract/commonfn";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { useDispatch } from "react-redux";
import { useSelection } from "@/reduxStore/function";
import { setReducer } from "@/reduxStore/generate/generateReducer";

const EnrollNewCar = ({
  contract,
  close,
  open,
  xpPoints,
  api,
  editCarValue,
  setXpPoints,
}) => {
  const [makes, setMakes] = useState([]);
  const [dealer, setDealer] = useState("");
  const dispatch = useDispatch();
  const reducer = setReducer("contract");
  const editContract = useSelection("contract");
  const fetchContract = async () => {
    const data = { ContractID: contract.ContractID };
    const res = await fetchPostObj({
      api: "contracts/editcontract",
      auth,
      Token,
      data,
      spinner: true,
      showToast: true,
    });
    if (res) {
      dispatch(reducer(res));
      setMakes(res?.Makes);
      setDealer(res?.DealerID);
    }
  };
  useEffect(() => {
    if (editContract) {
      setMakes(editContract?.Makes);
      setDealer(editContract?.DealerID);
    } else {
      fetchContract();
    }
  }, []);

  const [modelsData, setModelsData] = useState([]);
  const { auth, Token } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const years = Array.from(
    { length: new Date().getFullYear() - 1925 + 2 }, // +2 to include next year
    (_, i) => new Date().getFullYear() + 1 - i // Start from next year and decrease
  ).map((item) => ({ text: item.toString(), value: item.toString() }));
  const [values, setValues] = useState({
    VinNumber: "",
    VehicleModel: "",
    VehicleMake: "",
    VehicleYear: "",
  });
  // id efitCarValue
  useEffect(() => {
    const { ID, MakeID, ModelID, VIN, VehYear } = editCarValue || {};
    setValues({
      ID,
      VinNumber: VIN,
      VehicleModel: ModelID,
      VehicleMake: MakeID,
      VehicleYear: VehYear,
    });
    promiseModelAgainsMake(MakeID);
  }, [editCarValue]);

  // fetch this when select make
  const promiseModelAgainsMake = async (makeId) => {
    const modelAgainstMakeRes = await modelAgainstMake({
      auth,
      Token,
      setLoading,
      MakeID: makeId,
      DealerID: dealer,
    });

    if (modelAgainstMakeRes) {
      setModelsData(modelAgainstMakeRes?.SpecifixModels);
      return modelAgainstMakeRes;
    }
  };

  const fetchCarfaxVin = async () => {
    const data = {
      ...auth,
      ContractID: contract?.ContractID,
      ContractNo: contract?.ContractNo,
      VIN: values.VinNumber,
    };
    const res = await fetchPostObj({
      Token,
      api: "contracts/getvindetail",
      data,
      setLoading,
      showToast: true,
    });
    if (res) {
      const year = res?.serviceHistory?.year;
      const make = res?.serviceHistory?.make;
      const makeId = makes.find(
        (item) => item.Make.toLowerCase() === make.toLowerCase()
      )?.MakeID;
      const model = res.serviceHistory.model;

      setValues({ ...values, VehicleMake: makeId });
      const resModel = await promiseModelAgainsMake(makeId);
      if (resModel) {
        const modelId = resModel?.SpecifixModels?.find(
          (item) => item.Model.toLowerCase() === model.toLowerCase()
        )?.ModelID;
        setValues({
          ...values,
          VehicleMake: makeId,
          VehicleModel: modelId,
          VehicleYear: year,
        });
      }
    }
  };
  const handleSubmit = async () => {
    const data = {
      DealerID: xpPoints.DealerID,
      ContractID: xpPoints.ContractID,
      ...values,
    };
    const res = await fetchPostObj({
      api: api ? api : "contracts/savenewcarvin",
      auth,
      data,
      Token,
      showToast: true,
    });
    if (res) {
      setXpPoints((prev) => ({ ...prev, contractvins: res.contractvins }));
      close();
    }
  };
  const handleInputChange = (name, value) => {
    if (name === "VehicleMake") {
      promiseModelAgainsMake(value);
    }
    setValues({ ...values, [name]: value });
  };

  return (
    <SimpleModal
      close={close}
      open={open}
      className={"w-10/12 m-auto  p-6 rounded-lg mt-10"}
    >
      <div className="flex items-end justify-end">
        <div
          className="font-bold w-6 h-6 p-3 flex items-center justify-center border rounded-full hover:text-red-500 hover:border-red-500 Transition cursor-pointer "
          onClick={close}
        >
          X
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 ">
        <Input
          label="VIN"
          value={values?.VinNumber}
          setvalue={(value) => handleInputChange("VinNumber", value)}
          placeholder="VIN"
          type="text"
          bgcolor="gray-100"
          className={"pr-16 z-10 w-full "}
          suffix={() => (
            <div
              onClick={fetchCarfaxVin}
              className="z-0  overflow-hidden p-1 mr-1 hover:bg-gray-200 Transition
                        flex items-center justify-center  rounded-lg border border-gray-500
                        text-xs text-gray-500 "
            >
              DECODE
            </div>
          )}
          loading={loading}
        />
        <Select
          placeholder={"Make"}
          label={"Make"}
          options={makes}
          keyTitle={"Make"}
          value={values.VehicleMake}
          setvalue={(value) => handleInputChange("VehicleMake", value)}
          keyValue={"MakeID"}
        />
        <Select
          placeholder={"model"}
          label={"Model"}
          options={modelsData}
          value={values.VehicleModel}
          setvalue={(value) => handleInputChange("VehicleModel", value)}
          keyTitle={"Model"}
          keyValue={"ModelID"}
        />
        <Select
          placeholder={"Vehicle Year"}
          label={"Year"}
          value={values?.VehicleYear}
          options={years}
          setvalue={(value) => handleInputChange("VehicleYear", value)}
        />
        <div className="flex items-center justify-center gap-2">
          <CustomButton variant="main" onClick={close}>
            Close
          </CustomButton>
          <CustomButton onClick={() => handleSubmit()}>Save</CustomButton>
        </div>
      </div>
    </SimpleModal>
  );
};

export default EnrollNewCar;
