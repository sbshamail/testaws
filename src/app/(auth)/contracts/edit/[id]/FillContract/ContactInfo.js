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
import { useTheme } from "@/utils/theme/themeProvider";
import { GlobalContext } from "@/app/Provider";
import { EditContractContext } from "../page";
import { Select as NextuiSelect, SelectItem } from "@nextui-org/react";
import { LuGhost } from "react-icons/lu";

// components
import InputPhone from "@/app/Components/Inputs/InputPhone";
import Input from "@/app/Components/Inputs/Input";
import Select from "@/app/Components/Inputs/Select";
import CheckboxWithText from "@/app/Components/Inputs/CheckboxWithText";
//action
import { fetchPost } from "@/utils/action/function";
//form function
import { handleFieldValue } from "@/components/forms/functions";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

const ContactInfo = forwardRef(({ updateData, setFormUpdateOnly }, ref) => {
  const { GLOBAL_DEALERS_INFO, GLOBAL_RESPONSE, dataRecieved } =
    useContext(GlobalContext);
  const {
    contract,
    params,
    states,
    setstates,
    setemail,
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
    password,
    countries,
  } = useContext(EditContractContext);

  const defaultValues = {
    fname: fname || "",
    lname: lname || "",
    streetaddress: streetaddress || "",
    country: country || "",
    city: city || "",
    state: state || "",
    email: contract?.customereinfo?.PrimaryEmail || "",
    zip: zip || "",
    phone: phone || "",
    dob: dob || "",
    sendemail: sendemail || false,
    sendsms: sendsms || false,
    hidetestcontract: hidetestcontract || false,
  };
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    setContactInfo({
      fname: fname || "",
      lname: lname || "",
      streetaddress: streetaddress || "",
      country: country || "",
      city: city || "",
      state: state || "",
      email: contract?.customereinfo?.PrimaryEmail || "",
      zip: zip || "",
      phone: phone || "",
      dob: dob || "",
      sendemail: sendemail || false,
      sendsms: sendsms || false,
      hidetestcontract: hidetestcontract || false,
    });
  }, [
    contract,
    fname,
    lname,
    streetaddress,
    dob,
    sendemail,
    sendsms,
    hidetestcontract,
    state,
  ]);

  const [loading, setLoading] = useState(true);
  const [selectCountryID, setSelectCountryID] = useState(new Set([]));
  const [errors, setErrors] = useState({});
  const countrieslist = countries.map((country, i) => {
    return { text: country.nicename, key: country.id };
  });

  const stateslist = states.map((state, i) => {
    return { text: state.StateTitle, value: state.StateID };
  });

  const [selectStateID, setSelectStateID] = useState(new Set([]));
  const { toggleMode, theme } = useTheme();

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

  const fetchStateFromCountry = async () => {
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
    const res = await fetchPost({
      api: "contracts/countrystates",
      token: Token,
      formdata,
      setLoading,
    });
    if (res && res.statusCode) {
      setstates(res.States);
    }
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

  // useEffect(() => {
  //   if (GLOBAL_RESPONSE) {
  //     fetchCustomerInfo();
  //   }
  // }, [GLOBAL_RESPONSE]);

  useEffect(() => {
    fetchStateFromCountry();
  }, [contactInfo?.country]);

  // globally set for edit contract
  useEffect(() => {
    setemail(contactInfo.email);
  }, [contactInfo.email]);
  // format data according to backend field (update request)
  const contactInfoUpdateData = (contract) => ({
    CustomerID: contract?.customereinfo?.CustomerID,
    CustomerFName: contactInfo.fname,
    dob: contactInfo.dob,
    CustomerLName: contactInfo.lname,
    CustomerAddressLine1: contactInfo.streetaddress,
    CustomerAddressLine2: contactInfo.CustomerAddressLine2,
    CountryID: contactInfo.country,
    CityName: contactInfo.city,
    StateID: contactInfo.state,
    Email: email,
    CustomerZIP: contactInfo.zip,
    PhoneHome: contactInfo.phone,
    SendEmail: contactInfo.sendemail,
    SendSms: contactInfo.sendsms,
    HideTestContract: contactInfo.hidetestcontract, //this field are in PvInfo on backend
  });

  useEffect(() => {
    setTimeout(() => {
      updateData(contactInfoUpdateData(contract));
    });
  }, [contactInfo, contract]);
  // useEffect(() => {
  //   setcountry(
  //     contactInfo.country instanceof Set
  //       ? [...contactInfo.country][0]
  //       : contactInfo.country
  //   );
  // }, [selectCountryID]);

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

  // handle change for contact Info
  const handleInputChange = (field, value) => {
    // console.log(field, defaultValues[field], value);
    // handle Form Update Only Condition
    if (defaultValues[field] !== value) {
      setFormUpdateOnly((prev) => ({ ...prev, contactInfo: true }));
    } else {
      setFormUpdateOnly((prev) => ({ ...prev, contactInfo: false }));
    }
    handleFieldValue(field, value, setContactInfo, setErrors);
  };

  // console.log("1---- contactInfo", contactInfo);

  return (
    <div className="mt-4">
      <ShadowContainer>
        <form autoComplete="off" className={`w-full p-6  flex flex-col gap-2`}>
          <h2 className="text-2xl font-bold text-left mb-4">Contact Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <Input
              label="Customer First Name"
              value={contactInfo.fname}
              setvalue={(value) => handleInputChange("fname", value)}
              placeholder="Customer First Name"
              type="text"
              className="flex-grow"
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
              width={"full"}
              autoFillValue={city}
            />

            <div className="flex flex-col  gap-y-3">
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
            <div className="flex flex-col w-full gap-y-3">
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

            <Input
              label="Zip Code"
              value={contactInfo.zip}
              setvalue={(value) => handleInputChange("zip", value)}
              placeholder="Zip Code"
              type="text"
              className="flex-grow"
              width={"full"}
              autoFillValue={zip}
            />

            <InputPhone
              label="Phone Number"
              value={contactInfo.phone}
              setvalue={(value) => handleInputChange("phone", value)}
              placeholder="Phone Number"
              type="text"
              className="flex-grow"
              width={"full"}
              autoFillValue={phone}
            />
            <Input
              label="Email"
              value={contactInfo.email}
              setvalue={(value) => handleInputChange("email", value)}
              placeholder="Email"
              type="email"
              className="flex-grow"
              width={"full"}
              autoFillValue={email}
            />

            {/* <Input
          type={"password"}
          label="Password"
          value={password}
          disable={true}
          width={"full"}
          setvalue={(value) => handleInputChange("password", value)}
        /> */}
            <Input
              label="Date of Birth"
              value={contactInfo.dob}
              setvalue={(value) => handleInputChange("dob", value)}
              placeholder="Date of Birth"
              type="date"
              className="w-full"
              width={"full"}
              autoFillValue={dob}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <CheckboxWithText
              label="Opt out customer from Smart Marketing"
              checked={contactInfo.sendemail}
              setchecked={(checked) => handleInputChange("sendemail", checked)}
              width={"full"}
              bg="bg-gray-100"
            />
            <CheckboxWithText
              label="Opt out customer from SMS Marketing"
              checked={contactInfo.sendsms}
              setchecked={(checked) => handleInputChange("sendsms", checked)}
              width={"full"}
              bg="bg-gray-100"
            />
            <CheckboxWithText
              label="Hide Test Contract from Remittance and Marketplace history"
              checked={contactInfo.hidetestcontract}
              setchecked={(checked) =>
                handleInputChange("hidetestcontract", checked)
              }
              bg="bg-gray-100"
              icon={<LuGhost />} // Passing the LuGhost icon
              width={"full"}
            />
          </div>
        </form>
      </ShadowContainer>
    </div>
  );
});

ContactInfo.displayName = "ContactInfo";

export default ContactInfo;
