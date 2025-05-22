import React, { useState } from "react";
import { z } from "zod";
import { CustomButton } from "@/components/cui/button/CustomButton";
import TextField from "@/components/cui/textField/TextField";
import InputPhone from "@/app/Components/Inputs/InputPhone";
import Image from "next/image";

import { fetchPostObj } from "@/utils/action/function";
import Input from "@/app/Components/Inputs/Input";
import { inputFormatDate, Toastify } from "@/utils/helpers";
import { SimpleFilterableSelect } from "@/components/cui/select/SimpleFilterableSelect";

const profileSchema = z.object({
  CustomerFName: z.string().nonempty("First name is required"),
  Email: z.string().email("Invalid email address"),
});
const Form = ({
  values,
  setValues,
  GLOBAL_RESPONSE,
  auth,
  Token,
  setLoading,
  userData,
  CustomerID,
  ContractID,
}) => {
  const [file, setFile] = useState("");
  const optionStates =
    userData?.List_States?.map((item) => ({
      text: item?.StateTitle,
      value: item?.StateID,
    })) ?? [];
  const optionCountries =
    userData?.List_Countries?.map((item) => ({
      text: item?.nicename,
      value: item?.id,
    })) ?? [];
  const [errors, setErrors] = useState({});

  const handleSelectValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      // Validate values using Zod
      profileSchema.parse(values);
      setErrors({}); // Clear errors if validation passes

      const data = {
        ...values,
        CustomerID,
        ContractID,
        HiddenCustomerImage: file ?? "",
      };
      const res = await fetchPostObj({
        api: "customer/editcustomerprofile",
        data,
        setLoading,
        auth,
        Token,
        spinner: true,
        isValue: true,
      });
      if (res.type === "Success") {
        Toastify("success", res.msg);
      } else if (res.success == 0) {
        Toastify("error", res.message);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Map Zod errors to form field names
        const errorObj = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr;
          return acc;
        }, {});
        setErrors(errorObj);
      }
    }
  };

  return (
    <form>
      <div className="grid grid-cols-1 xlg:grid-cols-12  gap-20">
        <div className="xlg:col-span-5 w-full flex flex-col items-center justify-center gap-6 ">
          <div className="flex flex-col gap-4">
            <div className="flex justify-center items-center">
              <Image
                src={
                  file instanceof File
                    ? URL.createObjectURL(file)
                    : userData?.GetCustomerById?.CustomerImage ||
                      "/images/Avatar.png"
                }
                height={100}
                width={100}
                alt="avatar"
                className="h-24 w-24 object-fill rounded-full border-2 border-gray-300"
              />
            </div>
            <div>
              <TextField
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-none file:shadow file:text-sm  file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Input
              disable={true}
              value={userData?.GetCustomerById?.Make}
              label={"Make"}
              className={"w-full"}
            />
            <Input
              disable={true}
              value={userData?.GetCustomerById?.Model}
              label={"Model"}
            />
            <Input
              disable={true}
              value={userData?.GetCustomerById?.VehYear}
              label={"VehYear"}
            />
          </div>
        </div>
        <div className="xlg:col-span-7 flex flex-col gap-3">
          <TextField
            labelInside={true}
            label={"First Name"}
            name={"CustomerFName"}
            errors={errors}
            placeholder="Enter First Name"
            value={values["CustomerFName"]}
            onChange={(e) => handleSelectValue("CustomerFName", e.target.value)}
          />
          <TextField
            labelInside={true}
            label={"Last Name"}
            placeholder="Enter Last Name"
            value={values["CustomerLastName"]}
            onChange={(e) =>
              handleSelectValue("CustomerLastName", e.target.value)
            }
          />
          <TextField
            labelInside={true}
            label={"Address"}
            placeholder="Enter Full Address"
            value={values["FullAddress"]}
            onChange={(e) => handleSelectValue("FullAddress", e.target.value)}
          />
          <TextField
            labelInside={true}
            label={"City Name"}
            placeholder="Enter City"
            value={values["CityName"]}
            onChange={(e) => handleSelectValue("CityName", e.target.value)}
          />
          <div className="w-full">
            <SimpleFilterableSelect
              labelPosition="inside"
              label={"Select State/Province"}
              className="w-full"
              value={values["State"]}
              options={optionStates}
              setvalue={(value) => handleSelectValue("State", value)}
            />
          </div>

          <TextField
            labelInside={true}
            label={"Zip"}
            placeholder="Enter Zip"
            value={values["ZipCode"]}
            onChange={(e) => handleSelectValue("ZipCode", e.target.value)}
          />
          <div className="w-full">
            <SimpleFilterableSelect
              labelPosition="inside"
              label={"Select Country"}
              className="w-full"
              options={optionCountries}
              value={values["Country"]}
              setvalue={(value) => handleSelectValue("Country", value)}
            />
          </div>

          <div className="w-full ">
            <div className="w-full">
              <InputPhone
                labelInside={true}
                label={"Phone"}
                placeholder="Enter Phone"
                value={values["Phone"]}
                setvalue={(value) => handleSelectValue("Phone", value)}
              />
            </div>
          </div>

          <TextField
            labelInside={true}
            label={"Email"}
            name={"Email"}
            errors={errors}
            placeholder="Enter Email"
            value={values["Email"]}
            onChange={(e) => handleSelectValue("Email", e.target.value)}
          />

          <div className="w-full ">
            <div className="w-full">
              <Input
                labelInside={true}
                label={"DOB"}
                type={"date"}
                placeholder="Enter DOB"
                value={inputFormatDate(values["DOB"])}
                onChange={(e) => handleSelectValue("DOB", e.target.value)}
              />
            </div>
          </div>

          <div>
            <CustomButton variant="main" type="submit" onClick={handleSubmit}>
              Update Profile
            </CustomButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
