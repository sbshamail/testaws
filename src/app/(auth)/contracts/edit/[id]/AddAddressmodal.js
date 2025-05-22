import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "@/app/Provider";
import ModalContainer from "@/app/Components/containers/ModalContainer";
import Input from "@/app/Components/Inputs/Input";
import Select from "@/app/Components/Inputs/Select";
import Button from "@/app/Components/Button";
import TailwindLoading from "@/app/Components/TailwindLoading";
import { EditContractContext } from "./page";
import { BiTrash } from "react-icons/bi";
const AddAddressmodal = ({ setmodal }) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE } = useContext(GlobalContext);
  const { contract, dealer, contractbank, banks, setbanks, states } =
    useContext(EditContractContext);
  const [loading, setloading] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  let stateslist = states.map((state, i) => {
    return { text: state.StateTitle, value: state.StateID };
  });
  stateslist = [{ text: "Select State", value: "" }, ...stateslist];
  const fetchAddAddress = () => {
    setloading(true);
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);
    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("DealerID", dealer);
    formdata.append("lienholder_city", city);
    let tempstate = states.find((item) => {
      return item.StateID == state;
    });
    formdata.append("StateCode", tempstate.StateCode);
    formdata.append("StateTitle", tempstate.StateTitle);
    formdata.append("BankID", contractbank);

    fetch("https://mypcp.us/webservices/contracts/savelienholderaddress", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => {
        let res = response.json();
        return res;
      })
      .then((res) => {
        setloading(false);
        if (res.success == "1") {
          toast.success(res.message);
          setbanks(res.Banks);
          setmodal(false);
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => {
        setloading(false);
        toast.error("Can't add Address err3");
        console.log(error);
      });
  };

  const useaddress = (bank) => {
    setcity(bank.CityName);
    let tempstate = states.find((state) => {
      return state.StateCode == bank.StateCode;
    });
    setstate(tempstate.StateID);
  };

  return (
    <ModalContainer width="w-2/3" height="h-full">
      <h3 className="w-full border-b p-5 font-semibold text-xl">
        Add New Bank Address
      </h3>
      <div className="w-full h-full p-5 flex flex-col gap-5  overflow-auto">
        <div className="w-full flex flex-row justify-between gap-5">
          <Input
            disable
            label="Bank Name"
            value={
              banks.find((bank) => {
                return contractbank == bank.BankID;
              })?.BankName
            }
            placeholder="Model Name"
            type="text"
            bgcolor={"gray-200"}
          />
          <Input
            label="City Name"
            value={city}
            setvalue={setcity}
            placeholder="City Name"
            type="text"
            bgcolor={"gray-200"}
          />
          <Select
            label="State Name"
            value={state}
            setvalue={setstate}
            options={stateslist}
            bgcolor={"gray-200"}
          />
        </div>
        <h4 className="font-semibold text-lg">Previously Selected Addresses</h4>
        <div className="w-full grid grid-cols-6">
          <div className="col-span-2 bg-siteBlue text-white p-3 rounded-tl-lg">
            Bank Name
          </div>
          <div className="col-span-3 bg-siteBlue text-white p-3">Address</div>
          <div className="bg-siteBlue text-white p-3 rounded-tr-lg">
            Actions
          </div>

          {contract?.dealersbanks?.map((bank, i) => (
            <>
              <div
                className={`col-span-2 bg-${
                  i % 2 == 0 ? "white" : "gray-200"
                } p-3 font-sm`}
              >
                {bank?.BankName}
              </div>
              <div
                className={`col-span-3 bg-${
                  i % 2 == 0 ? "white" : "gray-200"
                } p-3 font-sm`}
              >
                {bank.CityName},{bank.StateTitle},{bank.StateCode}
              </div>
              <div
                className={`bg-${
                  i % 2 == 0 ? "white" : "gray-200"
                } p-3 flex flex-row gap-1 items-center font-sm`}
              >
                <button
                  onClick={() => {
                    useaddress(bank);
                  }}
                  className="w-10 h-8 bg-siteBlue rounded-lg p-1 text-white"
                >
                  Use
                </button>
                <BiTrash color="red" size={25} />
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-row justify-between items-center border-t p-5">
        <Button
          text="Close"
          onClick={() => {
            setmodal(false);
          }}
          bg="red-500"
        />
        {loading ? (
          <TailwindLoading />
        ) : (
          <Button text="Save" onClick={fetchAddAddress} bg="siteBlue" />
        )}
      </div>
    </ModalContainer>
  );
};

export default AddAddressmodal;
