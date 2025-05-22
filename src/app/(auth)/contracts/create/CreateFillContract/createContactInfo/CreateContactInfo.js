"use client";
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useContext,
} from "react";

import { CreateContractContext } from "../../page";
import Input from "@/app/Components/Inputs/Input";
import CheckboxWithText from "@/app/Components/Inputs/CheckboxWithText";

import { LuGhost } from "react-icons/lu";
import InputPhone from "@/app/Components/Inputs/InputPhone";

//components

import { handleFieldValue } from "@/components/forms/functions";
import { validate, initialState } from "./fn";
import Select from "@/app/Components/Inputs/Select";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

const CreateContactInfo = forwardRef(
  (
    { autoFillData, auth, contactInfoForm, setContactInfoForm, contractCreate },
    ref
  ) => {
    const { params, setcountry, country } = useContext(CreateContractContext);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectCountryID, setSelectCountryID] = useState(
      initialState.country
    );
    //new Set(["226"]) Set default country ID
    const [selectStateID, setSelectStateID] = useState(new Set());
    const [errors, setErrors] = useState({});

    const countrieslist = countries?.map((country, i) => {
      return { text: country.nicename, key: country.id };
    });

    const stateslist = states?.map((state, i) => {
      return { text: state.StateTitle, value: state.StateID };
    });

    useEffect(() => {
      setContactInfoForm((prevForm) => ({
        ...initialState,
        ...prevForm,
      }));
    }, []);

    useEffect(() => {
      setCountries(contractCreate?.Countries);
      setContactInfoForm((prev) => ({ ...prev, country: "226" }));
      setStates(contractCreate?.States);
    }, [contractCreate]);

    useImperativeHandle(ref, () => ({
      validate: () => validate(contactInfoForm, setErrors),
    }));

    useEffect(() => {
      if (autoFillData && Object.keys(autoFillData || {}).length > 0) {
        setContactInfoForm((prev) => ({
          ...prev,
          fname: autoFillData.FIRST_NAME || "",
          lname: autoFillData.LAST_NAME || "",
          streetaddress: autoFillData.ADDRESS || "",
          country: autoFillData.Country || "",
          city: autoFillData.CITY || "",
          state: autoFillData.STATE || "",
          email: autoFillData.EMAIL || "",
          zip: autoFillData.ZIP || "",
          phone: autoFillData.PHONE || "",
          dob: autoFillData.DOB || "",
          sendemail: autoFillData.SEND_EMAIL || false,
          sendsms: autoFillData.SEND_SMS || false,
          hidetestcontract: autoFillData.HIDE_TEST_CONTRACT || false,
        }));

        const countryObject = countrieslist?.find(
          (country) => country.key === autoFillData.Country
        );

        if (countryObject) {
          setSelectCountryID(countryObject.key);
        }

        const stateObject = stateslist.find(
          (state) => state.value === autoFillData.STATE
        );

        if (stateObject) {
          setSelectStateID(new Set([stateObject.value]));
        }
      }
    }, [autoFillData]);

    useEffect(() => {
      setcountry(
        contactInfoForm.country instanceof Set
          ? [...contactInfoForm.country][0]
          : contactInfoForm.country
      );
    }, [selectCountryID]);

    const handleInputChange = (field, value) => {
      handleFieldValue(field, value, setContactInfoForm, setErrors);
    };

    return (
      <ShadowContainer className={"flex flex-col gap-4"}>
        <h2 className="text-2xl font-bold text-left ">Contact Info</h2>
        <form autoComplete="off" className={"flex flex-col gap-4"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <Input
              label="Customer First Name"
              value={contactInfoForm.fname}
              name="fname"
              setvalue={(value) => handleInputChange("fname", value)}
              placeholder="Customer First Name"
              type="text"
              className="flex-grow"
              autoFillValue={autoFillData?.FIRST_NAME}
              width={"full"}
            />
            <Input
              label="Customer Last Name"
              name="lname"
              value={contactInfoForm.lname}
              setvalue={(value) => handleInputChange("lname", value)}
              placeholder="Customer Last Name"
              type="text"
              className="flex-grow"
              autoFillValue={autoFillData?.LAST_NAME}
              width={"full"}
            />
            <Input
              label="Street Address"
              name="streetaddress"
              value={contactInfoForm.streetaddress}
              setvalue={(value) => handleInputChange("streetaddress", value)}
              placeholder="Street Address"
              type="text"
              className="flex-grow"
              width={"full"}
              autoFillValue={autoFillData?.ADDRESS}
            />
            <Input
              label="City"
              name="city"
              value={contactInfoForm.city}
              setvalue={(value) => handleInputChange("city", value)}
              placeholder="City"
              type="text"
              className="w-full"
              width={"full"}
              autoFillValue={autoFillData?.CITY}
            />

            <Select
              label="State"
              name="state"
              options={stateslist}
              value={contactInfoForm?.state}
              className={"w-full"}
              setvalue={(value) => {
                handleInputChange("state", value);
                setSelectStateID(value);
              }}
            />

            <Select
              label="Country"
              name="country"
              options={countrieslist}
              value={contactInfoForm?.country}
              className={"w-full"}
              setvalue={(value) => {
                handleInputChange("country", value);
                setSelectCountryID(value);
              }}
              keyTitle="text"
              keyValue="key"
            />

            <div className="flex flex-col gap-3">
              <Input
                label="Zip Code"
                name="zip"
                value={contactInfoForm.zip}
                setvalue={(value) => handleInputChange("zip", value)}
                placeholder="Zip Code"
                type="text"
                className="flex-grow"
                width={"full"}
                autoFillValue={autoFillData?.ZIP}
              />
            </div>
            <InputPhone
              name="phone"
              label="Phone Number"
              value={contactInfoForm.phone}
              setvalue={(value) => handleInputChange("phone", value)}
              placeholder="Phone Number"
              type="text"
              className="flex-grow"
              autoFillValue={autoFillData?.PHONE}
            />
            <Input
              label="Email"
              name="email"
              value={contactInfoForm.email}
              setvalue={(value) => handleInputChange("email", value)}
              placeholder="Email"
              type="email"
              className="flex-grow"
              width={"full"}
              autoFillValue={autoFillData?.EMAIL}
            />

            <Input
              label="Date of Birth"
              name="dob"
              value={contactInfoForm.dob}
              setvalue={(value) => handleInputChange("dob", value)}
              placeholder="Date of Birth"
              type="date"
              className="w-full"
              width={"full"}
              autoFillValue={autoFillData?.DOB}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xlg:grid-cols-3 gap-4">
            <CheckboxWithText
              label="Opt out customer from Smart Marketing"
              checked={contactInfoForm.sendemail}
              setchecked={(checked) => handleInputChange("sendemail", checked)}
              width={"full"}
            />
            <CheckboxWithText
              label="Opt out customer from SMS Marketing"
              checked={contactInfoForm.sendsms}
              setchecked={(checked) => handleInputChange("sendsms", checked)}
              width={"full"}
            />
            <CheckboxWithText
              label="Hide Test Contract from Remittance and Marketplace history"
              checked={contactInfoForm.hidetestcontract}
              setchecked={(checked) =>
                handleInputChange("hidetestcontract", checked)
              }
              icon={<LuGhost />}
              width={"full"}
            />
          </div>
        </form>
      </ShadowContainer>
    );
  }
);

CreateContactInfo.displayName = "CreateContactInfo";

export default CreateContactInfo;
