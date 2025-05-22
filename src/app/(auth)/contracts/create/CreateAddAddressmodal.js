import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "@/app/Provider";
import ModalContainer from "@/app/Components/containers/ModalContainer";
import Input from "@/app/Components/Inputs/Input";
import Select from "@/app/Components/Inputs/Select";
import Button from "@/app/Components/Button";
import TailwindLoading from "@/app/Components/TailwindLoading";
import { Select as NextuiSelect, SelectItem } from "@nextui-org/react";
import { CreateContractContext } from "./page";
import { BiTrash } from "react-icons/bi";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
const CreateAddAddressmodal = ({ open, close }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const {
    contract,
    dealer,
    contractbank,
    banks,
    setbanks,
    states,
    country,
    dealerID,
  } = useContext(CreateContractContext);
  const [city, setcity] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(null);
  const [stateCode, setStateCode] = useState(null);
  const [statesFromCountry, setStatesFromCountry] = useState([]);
  const [stateCodesArray, setStateCodesArray] = useState([]);
  const [saveAddress, setSaveAddress] = useState();
  const [bankAddresses, setBankAddresses] = useState([]);
  const [selectStateID, setSelectStateID] = useState(new Set([""]));
  const [selectStateCodeID, setSelectStateCodeID] = useState();
  const [selectCity, setSelectCity] = useState("");

  let selectedBank = banks?.find((bank) => bank.BankID === contractbank);
  let stateslist = states.map((state, i) => {
    return { text: state.StateTitle, value: state.StateID };
  });
  stateslist = [{ text: "Select State", value: "" }, ...stateslist];

  const fetchStateFromCountry = () => {
    setLoading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("CountryID", country);

    fetch("https://mypcp.us/webservices/contracts/countrystates", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          setStatesFromCountry(res.States);
          let stateCodes = res.States.map((state) => state.StateCode); // Extract all StateCode into an array
          setStateCodesArray(stateCodes); // Save the array in state
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const viewBankAddress = () => {
    setLoading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("CountryID", country);
    formdata.append("DealerID", dealerID);
    formdata.append("BankID", contractbank);

    fetch("https://mypcp.us/webservices/contracts/lienholderaddress", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          setBankAddresses(res.dealersbanks);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  // const useaddress = (bank) => {
  //   setcity(bank.CityName);
  //   let tempstate = states.find((state) => {
  //     return state.StateCode == bank.StateCode;
  //   });
  //   setstate(tempstate.StateID);
  // };

  const handleSaveAddress = () => {
    setLoading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("CountryID", country);
    formdata.append("DealerID", dealerID);
    formdata.append("BankID", contractbank);
    formdata.append("lienholder_city", city);

    // Get the state ID and StateTitle
    const stateID =
      selectStateID instanceof Set ? [...selectStateID][0] : selectStateID;
    const stateMatch = statesFromCountry.find(
      (state) => state.StateID === stateID
    );
    const stateTitle = stateMatch ? stateMatch.StateTitle : "";

    formdata.append("StateTitle", stateTitle);
    formdata.append(
      "StateCode",
      selectStateCodeID instanceof Set
        ? [...selectStateCodeID][0]
        : selectStateCodeID
    );

    fetch("https://mypcp.us/webservices/contracts/savelienholderaddress", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          setSaveAddress(res); // You can still keep this if you want to store the result
          toast.success("Address saved successfully!");

          // After a successful save, refresh the bank address list
          viewBankAddress();
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const handleDeleteAddress = (lineHolderId) => {
    setLoading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealerID);
    formdata.append("LienHolderID", lineHolderId);

    fetch("https://mypcp.us/webservices/contracts/deletelienholderaddress", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          // setStatesFromCountry(res.States);
          setBankAddresses(res?.dealersbanks);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    fetchStateFromCountry();
    viewBankAddress();
  }, [country]);

  const handleUseBankAddress = (state, city, stateCode) => {
    // console.log("_________________", state, city, stateCode, statesFromCountry);
    const stateId = statesFromCountry?.filter(
      (stateObj) => stateObj?.StateTitle?.toLowerCase() === state?.toLowerCase()
    );
    const stateCode1 = stateCodesArray?.filter((code) => code === stateCode);

    // console.log("FOCUS", stateId);
    setSelectStateID(stateId[0]?.StateID);
    setSelectCity(city);
    setcity(city);
    setSelectStateCodeID(stateCode1);
  };
  // console.log("setSelectStateCodeID", selectStateCodeID);

  return (
    <SimpleModal
      open={open}
      close={close}
      className={"max-w-3xl"}
      title={"Add New Bank Address"}
    >
      <div className="w-full flex flex-col gap-6 h-full mt-5">
        <div className="mx-10 grid grid-cols-12 sm:grid-cols-2 gap-4">
          <Input
            disable
            placeholder="Bank Name"
            type="text"
            bgcolor={"gray-100"}
            width="full"
            defaultValue1={selectedBank?.BankName}
          />

          <NextuiSelect
            label="State"
            className="h-12 bg-white border border-gray-100 rounded-xl"
            onSelectionChange={(value) => {
              setState(value);
              setSelectStateID(value);
            }}
            selectedKeys={selectStateID}
          >
            {statesFromCountry?.map((state) => (
              <SelectItem key={state.StateID} value={state.StateID}>
                {state.StateTitle}
              </SelectItem>
            ))}
          </NextuiSelect>

          <Input
            value={city}
            setvalue={setcity}
            placeholder="City Name"
            type="text"
            bgcolor={"gray-100"}
            width="full"
            defaultValue1={selectCity}
          />

          <NextuiSelect
            label="State Code"
            className="h-12 bg-white border border-gray-100 rounded-xl"
            onSelectionChange={(value) => {
              setStateCode(value);
              setSelectStateCodeID(value);
            }}
            selectedKeys={selectStateCodeID}
          >
            {stateCodesArray?.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </NextuiSelect>
        </div>

        <h4 className="mx-10 text-xl font-semibold mt-6">
          Previously Selected Addresses
        </h4>
        <div className="mx-10 grid grid-cols-6 gap-4">
          <div className="col-span-2 bg-siteBlue text-white p-4 rounded-tl-lg font-semibold">
            Bank Name
          </div>
          <div className="col-span-3 bg-siteBlue text-white p-4 font-semibold">
            Address
          </div>
          <div className="bg-siteBlue text-white p-4 rounded-tr-lg font-semibold">
            Actions
          </div>
        </div>
        <div className="mx-10  max-h-96 overflow-y-auto">
          <div className="grid grid-cols-6 bg-accent text-left font-semibold">
            <div className="col-span-2 p-4">Bank Name</div>
            <div className="col-span-3 p-4">Address</div>
            <div className="col-span-1 p-4">Actions</div>
          </div>
          {bankAddresses?.map((bank, i) => (
            <div key={i} className="grid grid-cols-6 gap-0.5">
              <div
                className={`col-span-2 p-4 ${
                  i % 2 === 0 ? "bg-accent" : "bg-muted"
                }`}
              >
                {bank?.BankName}
              </div>
              <div
                className={`col-span-3 p-4 ${
                  i % 2 === 0 ? "bg-accent" : "bg-muted"
                }`}
              >
                {bank.CityName}, {bank.StateTitle}, {bank.StateCode}
              </div>
              <div
                className={`col-span-1 p-4 flex items-center gap-2 ${
                  i % 2 === 0 ? "bg-accent" : "bg-muted"
                }`}
              >
                <button
                  onClick={() =>
                    handleUseBankAddress(
                      bank.StateTitle,
                      bank.CityName,
                      bank.StateCode
                    )
                  }
                  className="w-16 p-1 bg-siteBlue rounded-lg text-card-foreground text-sm font-medium flex items-center justify-center hover:bg-siteBlue/80"
                >
                  USE
                </button>
                <BiTrash
                  onClick={() => handleDeleteAddress(bank?.LienHolderID)}
                  color="red"
                  size={25}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center border-t py-6 gap-10">
        <Button
          text="Close"
          onClick={close}
          bg="red-500"
          className="px-5 py-3 text-white rounded-lg hover:bg-red-600 transition"
        />
        {loading ? (
          <SpinnerCenterScreen loading={loading} />
        ) : (
          <Button
            text="Save"
            onClick={handleSaveAddress}
            bg="siteBlue"
            className="px-5 py-3 text-white rounded-lg hover:bg-siteBlue-dark transition"
          />
        )}
      </div>
    </SimpleModal>
  );
};

export default CreateAddAddressmodal;
