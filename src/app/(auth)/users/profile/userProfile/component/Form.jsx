import React, { useState } from "react";
import { z } from "zod";

import { CustomButton } from "@/components/cui/button/CustomButton";
import Select from "@/app/Components/Inputs/Select";
import TextField from "@/components/cui/textField/TextField";
import InputPhone from "@/app/Components/Inputs/InputPhone";
import Image from "next/image";
import { useSelection } from "@/reduxStore/function";
import { fetchPostObj } from "@/utils/action/function";

const profileSchema = z.object({
  FirstName: z.string().nonempty("First name is required"),
  email: z.string().email("Invalid email address"),
});
const Form = ({
  values,
  setValues,
  GLOBAL_RESPONSE,
  auth,
  Token,
  setLoading,
}) => {
  const [errors, setErrors] = useState({});
  const usertitles = useSelection("usertitles")?.UserTitles ?? [];

  const handleSelectValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const handleFileChange = (e) => {
    setValues({ ...values, file: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      // Validate values using Zod
      profileSchema.parse(values);
      setErrors({}); // Clear errors if validation passes

      const data = { ...values };
      const res = await fetchPostObj({
        api: "users/updateuser",
        data,
        setLoading,
        auth,
        Token,
        showToast: true,
      });
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="w-full flex flex-col items-center justify-center gap-4 ">
          <div className="flex justify-center items-center">
            <Image
              src={
                values.file instanceof File
                  ? URL.createObjectURL(values.file)
                  : GLOBAL_RESPONSE?.UserImage || "/images/Avatar.png"
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
        <div className="flex flex-col gap-3">
          <Select
            label={"User Title"}
            options={usertitles}
            placeholder="Select User Title"
            value={values["UserTitleID"]}
            setvalue={(value) => handleSelectValue("UserTitleID", value)}
            keyTitle="UserTitle"
            keyValue="UserTitleID"
            width={"full"}
          />

          <TextField
            name={"FirstName"}
            label={"First Name"}
            errors={errors}
            placeholder="Enter First Name"
            value={values["FirstName"]}
            onChange={(e) => handleSelectValue("FirstName", e.target.value)}
          />
          <TextField
            label={"Last Name"}
            placeholder="Enter Last Name"
            value={values["LastName"]}
            onChange={(e) => handleSelectValue("LastName", e.target.value)}
          />
          <TextField
            label={"Email"}
            name={"email"}
            errors={errors}
            placeholder="Enter Email"
            value={values["email"]}
            onChange={(e) => handleSelectValue("email", e.target.value)}
          />
          <InputPhone
            label="Phone"
            placeholder="Enter Phone"
            value={values["Telephone"]}
            setvalue={(value) => handleSelectValue("Telephone", value)}
          />
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
