import React, { useContext, useEffect, useState } from "react";
import Input from "@/app/Components/Inputs/Input";
import { GlobalContext } from "@/app/Provider";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import { fetchPostObj } from "@/utils/action/function";
import { EditContractContext } from "../../page";
import { SimpleFilterableSelect } from "@/components/cui/select/SimpleFilterableSelect";
import { modelAgainstMake } from "@/components/forms/contract/commonfn";
import { generateYearsArray } from "@/app/functions";
import { CustomButton } from "@/components/cui/button/CustomButton";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import Select from "@/app/Components/Inputs/Select";

const VinAddVehicleModal = ({ close, open, setVehicleData }) => {
  const [loading, setLoading] = useState(false);

  const [VIN, setVIN] = useState("");
  const [MakeID, setMakeID] = useState("");
  const [ModelID, setModelID] = useState("");
  const [ModelYear, setModelYear] = useState("");

  const { auth, Token } = useContext(GlobalContext);
  const { dealer, makes } = useContext(EditContractContext);
  const [modelsData, setModelsData] = useState([]);
  const makeslist = makes?.map((make, i) => {
    return { text: make.Make, value: make.MakeID };
  });
  const modelslist = modelsData?.map((model, i) => ({
    text: model?.Model,
    value: model?.ModelID,
  }));

  const ModelAgainsMake = async (MakeID) => {
    const promiseModelAgainsMake = async () => {
      const res = await modelAgainstMake({
        auth,
        Token,
        setLoading,
        MakeID,
        DealerID: dealer,
      });
      if (res) {
        setModelID("");
        setModelsData(res?.SpecifixModels);
      }
    };
    if (MakeID) {
      promiseModelAgainsMake();
    }
  };

  const yearslist = generateYearsArray()
    .sort((a, b) => b - a) // Sorts the array in descending order
    .map((year) => ({
      text: year.toString(),
      value: year.toString(),
    }));
  const fetchVinData = async () => {
    const data = { VIN, DealerID: dealer };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "contracts/apivin",
      data,
      setLoading,
    });
    if (res) {
      setModelsData(res?.SpecifixModels);
      setMakeID(res?.MakeID.toString());
      setModelID(res?.ModelID.toString());
      setModelYear(res?.ModelYear.toString());
    }
  };
  const handleSaveValue = () => {
    setVehicleData({ VinNumber: VIN, MakeID, ModelID, ModelYear });
    close();
  };
  return (
    <SimpleModal
      title={"Add Vehicle"}
      close={close}
      open={open}
      className={"m-auto max-w-[600px]"}
    >
      <SpinnerCenterScreen loading={loading} />
      <div className="mx-6">
        <form className="w-full flex flex-col gap-2">
          <Input
            label="VIN"
            value={VIN}
            name="VIN"
            setvalue={setVIN}
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
          <SimpleFilterableSelect
            label={"Make"}
            options={makeslist}
            value={MakeID}
            setvalue={(v) => {
              setMakeID(v);
              ModelAgainsMake(v);
            }}
            className="w-full"
          />
          <SimpleFilterableSelect
            label={"Model"}
            options={modelslist}
            value={ModelID}
            setvalue={setModelID}
            className="w-full"
          />
          <SimpleFilterableSelect
            label={"Year"}
            options={yearslist}
            value={ModelYear}
            setvalue={setModelYear}
            className="w-full"
          />
          <div className="flex items-center justify-between">
            <CustomButton onClick={close}>Cancel</CustomButton>
            <CustomButton onClick={handleSaveValue}>OK</CustomButton>
          </div>
        </form>
      </div>
    </SimpleModal>
  );
};

export default VinAddVehicleModal;
