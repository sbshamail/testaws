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
import { GlobalContext } from "@/app/Provider";
import { ResellContractContext } from "../page";
import Input from "@/app/Components/Inputs/Input";
import Select from "@/app/Components/Inputs/Select";
import CheckboxWithText from "@/app/Components/Inputs/CheckboxWithText";
import { Select as NextuiSelect, SelectItem } from "@nextui-org/react";
import { LuGhost } from "react-icons/lu";
import InputPhone from "@/app/Components/Inputs/InputPhone";

const ResellContactInfo = forwardRef(({ updateData }, ref) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE, dataRecieved } =
    useContext(GlobalContext);
  const {
    contract,
    params,
    setcountry,
    fname,
    lname,
    streetaddress,
    country,
    city,
    state,
    email,
    zip,
    phone,
    dob,
    sendemail,
    sendsms,
    hidetestcontract,
    vin,
    contractno,
    make,
    plan,
    model,
    productsellingrep,
    year,
    vehicletype,
    salesperson,
    stockdeal,
    mileage,
    ro,
    saledate,
    expirationdate,
    countries,
  } = useContext(ResellContractContext);

  const [contactInfo, setContactInfo] = useState({
    fname: fname || "",
    lname: lname || "",
    streetaddress: streetaddress || "",
    country: country || "",
    city: city || "",
    state: state || "",
    email: email || "",
    zip: zip || "",
    phone: phone || "",
    dob: dob || "",
    sendemail: sendemail || false,
    sendsms: sendsms || false,
    hidetestcontract: hidetestcontract || false,
  });

  const [loading, setLoading] = useState(true);
  // const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectCountryID, setSelectCountryID] = useState(new Set([]));

  const [errors, setErrors] = useState({});
  const countrieslist = countries.map((country, i) => {
    return { text: country.nicename, key: country.id };
  });

  const stateslist = states.map((state, i) => {
    return { text: state.StateTitle, value: state.StateID };
  });

  const [selectStateID, setSelectStateID] = useState(new Set([]));

  useEffect(() => {
    if (country) {
      setSelectCountryID(new Set([country]));
    } else {
      setSelectCountryID(new Set(["226"]));
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      setSelectStateID(new Set([state]));
    }
  }, [state]);
  // const fetchCustomerInfo = () => {
  //   setLoading(true);
  //   const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
  //     GLOBAL_RESPONSE;

  //   const headers = new Headers();
  //   headers.append("AUTHORIZATION", Token);

  //   const formdata = new FormData();
  //   formdata.append("pcp_user_id", pcp_user_id);
  //   formdata.append("role_id", user_cizacl_role_id);
  //   formdata.append("ContractID", params.id);
  //   formdata.append("user_id", user_id);

  //   fetch("https://mypcp.us/webservices/contracts/editcontract", {
  //     method: "POST",
  //     body: formdata,
  //     headers: headers,
  //   })
  //     .then((response) => response.json())
  //     .then((res) => {
  //       setLoading(false);
  //       if (res.success === 1) {
  //         toast.success(res.message);
  //         setCountries(res.Countries);
  //         setStates(res.States);
  //       } else {
  //         toast.error(res.message);
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log(error);
  //     });
  // };

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
    formdata.append(
      "CountryID",
      contactInfo.country instanceof Set
        ? [...contactInfo.country][0]
        : contactInfo.country
    );

    fetch("https://mypcp.us/webservices/contracts/countrystates", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res.success === 1) {
          setStates(res.States);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

  useEffect(() => {
    fetchStateFromCountry();
  }, [contactInfo?.country]);

  useEffect(() => {
    updateData(contactInfo);
  }, [contactInfo, contract]);

  const validate = () => {
    const newErrors = {};

    if (!contactInfo.fname) newErrors.fname = "First name is required";
    if (!contactInfo.lname) newErrors.lname = "Last name is required";
    if (!contactInfo.streetaddress)
      newErrors.streetaddress = "Street address is required";
    if (!contactInfo.country) newErrors.country = "Country is required";
    if (!contactInfo.city) newErrors.city = "City is required";
    if (!contactInfo.state) newErrors.state = "State is required";
    if (!contactInfo.zip) newErrors.zip = "Zip code is required";
    if (!contactInfo.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(contactInfo.phone)) {
      newErrors.phone = "Phone number must be in the format 123-123-1111";
    }
    if (!contactInfo.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);

    Object.values(newErrors).forEach((error) => toast.error(error));

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setContactInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  useEffect(() => {
    setContactInfo({
      fname: fname || "",
      lname: lname || "",
      streetaddress: streetaddress || "",
      country: country || "",
      city: city || "",
      state: state || "",
      email: email || "",
      zip: zip || "",
      phone: phone || "",
      dob: dob || "",
      sendemail: sendemail || false,
      sendsms: sendsms || false,
      hidetestcontract: hidetestcontract || false,
    });
  }, [
    fname,
    lname,
    streetaddress,
    country,
    city,
    state,
    email,
    zip,
    phone,
    dob,
    sendemail,
    sendsms,
    hidetestcontract,
  ]);

  return (
    <div className="flex flex-col max-w-full container-max-width gap-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl my-1">Resell Plan</h1>
      </div>
      <div className="w-full p-6 bg-white rounded-lg shadow-md flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-left mb-4">Contact Info</h2>

        <div className="flex justify-between gap-3">
          <Input
            label="Customer First Name"
            value={contactInfo.fname}
            setvalue={(value) => handleInputChange("fname", value)}
            placeholder="Customer First Name"
            type="text"
            className="flex-grow"
            bgcolor={"gray-100"}
            autoFillValue={fname}
            width={"full"}
          />
          <Input
            label="Customer Last Name"
            value={contactInfo.lname}
            setvalue={(value) => handleInputChange("lname", value)}
            placeholder="Customer Last Name"
            type="text"
            className="flex-grow"
            bgcolor={"gray-100"}
            autoFillValue={lname}
            width={"full"}
          />
          <Input
            label="Street Address"
            value={contactInfo.streetaddress}
            setvalue={(value) => handleInputChange("streetaddress", value)}
            placeholder="Street Address"
            type="text"
            className="flex-grow"
            bgcolor={"gray-100"}
            width={"full"}
            autoFillValue={streetaddress}
          />
          <Input
            label="City"
            value={contactInfo.city}
            setvalue={(value) => handleInputChange("city", value)}
            placeholder="City"
            type="text"
            className="w-full"
            bgcolor={"gray-100"}
            width={"full"}
            autoFillValue={city}
          />
        </div>
        <div className="flex w-full justify-between gap-6">
          <div className="flex flex-col w-full gap-3">
            <label className="font-medium w-full">State</label>
            <NextuiSelect
              label="State"
              onSelectionChange={(value) => {
                setSelectStateID(value);
                handleInputChange("state", value);
              }}
              selectedKeys={selectStateID}
              className="h-10 flex justify-center items-center bg-white border border-gray-300 rounded-sm"
            >
              {stateslist?.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.text}
                </SelectItem>
              ))}
            </NextuiSelect>
          </div>
          <div className="flex flex-col w-full gap-3">
            <label className="font-medium w-full">Country</label>
            <NextuiSelect
              label="Country"
              onSelectionChange={(value) => {
                setSelectCountryID(value);
                handleInputChange("country", value);
              }}
              selectedKeys={selectCountryID}
              className="h-10 flex justify-center items-center border border-gray-300 rounded-md"
            >
              {countrieslist?.map((country) => (
                <SelectItem key={country.key} value={country.key}>
                  {country.text}
                </SelectItem>
              ))}
            </NextuiSelect>
          </div>
          <div className="flex flex-col gap-3">
            <Input
              label="Zip Code"
              value={contactInfo.zip}
              setvalue={(value) => handleInputChange("zip", value)}
              placeholder="Zip Code"
              type="text"
              className="flex-grow"
              bgcolor={"gray-100"}
              width={"96"}
              autoFillValue={zip}
            />
          </div>
        </div>
        <div className="flex w-full justify-between">
          <InputPhone
            label="Phone Number"
            value={contactInfo.phone}
            setvalue={(value) => handleInputChange("phone", value)}
            placeholder="Phone Number"
            type="text"
            className="flex-grow"
            bgcolor={"gray-100"}
            width={"96"}
            autoFillValue={phone}
          />
          <Input
            label="Email"
            value={contactInfo.email}
            setvalue={(value) => handleInputChange("email", value)}
            placeholder="Email"
            type="email"
            className="flex-grow"
            bgcolor={"gray-100"}
            width={"96"}
            autoFillValue={email}
          />

          <Input
            label="Date of Birth"
            value={contactInfo.dob}
            setvalue={(value) => handleInputChange("dob", value)}
            placeholder="Date of Birth"
            type="date"
            className="w-full"
            bgcolor={"gray-100"}
            width={"96"}
            autoFillValue={dob}
          />
        </div>

        <div className="flex flex-row gap-4 my-4 w-1/3">
          <CheckboxWithText
            label="Opt out customer from Smart Marketing"
            // checked={contactInfo.sendemail}
            // setchecked={(checked) => handleInputChange("sendemail", checked)}
            bg="bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
});

ResellContactInfo.displayName = "ResellContactInfo";

export default ResellContactInfo;
