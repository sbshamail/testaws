"use client";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import SelectHook from "@/components/nextui/SelectHook";
import { CustomButton } from "@/components/cui/button/CustomButton";
import TextField from "@/components/cui/textField/TextField";
import { fetchPostObj } from "@/utils/action/function";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
//context
import { GlobalContext } from "@/app/Provider";
import { getUserTitlebyDealerId } from "../functions";

// Define Validation Schema
const schema = z.object({
  FirstName: z.string().min(1, "First Name is required"),
  LastName: z.string().min(1, "Last Name is required"),
  email: z.string().min(1, "Email is required"),
  Telephone: z.string().min(1, "Phone is required"),
  UserTitleID: z.string().min(1, "required"),
  DealerID: z.string().min(1, "required"),
});

export default function UserForm({
  edit,
  editValues,
  api = "users/adduser",
  refresh = true,
}) {
  const {
    GLOBAL_DEALERS_INFO = [],
    auth,
    Token,
    GLOBAL_RESPONSE,
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [userTitles, setUserTitles] = useState([]);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: edit
      ? editValues
      : {
          DealerID: "",
          UserTitleID: "",
          FirstName: "",
          LastName: "",
          email: "",
          Telephone: "",
        },
  });
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = methods;
  // Form Submission
  const { DealerID } = watch();

  // default dealer id
  useEffect(() => {
    if (GLOBAL_RESPONSE?.DefaultDealerID && !editValues) {
      setValue("DealerID", GLOBAL_RESPONSE?.DefaultDealerID);
    }
  }, [GLOBAL_RESPONSE]);

  //getusertitleby dealerid
  useEffect(() => {
    const getUserTitle = async () => {
      const res = await getUserTitlebyDealerId({ DealerID });

      setUserTitles(res?.UserTitles);
    };
    getUserTitle();
  }, [DealerID]);
  const onSubmit = async (data) => {
    if (edit) {
      data.UserID = editValues?.UserID; // Ensure UserID is added
    }
    const res = await fetchPostObj({
      api,
      data,
      setLoading,
      auth,
      Token,
      showToast: true,
      reset: refresh ? reset : false,
    });
  };

  return (
    <>
      <SpinnerCenterScreen loading={loading} />
      <form className="  mt-6">
        <div className="w-full m-auto space-y-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3   rounded-lg ">
            <SelectHook
              name={"DealerID"}
              data={GLOBAL_DEALERS_INFO}
              placeholder="Select Dealer"
              control={control}
              title="DealerTitle"
              id="DealerID"
              errors={errors}
            />
            <SelectHook
              name={"UserTitleID"}
              data={userTitles}
              placeholder="Select User Title"
              control={control}
              id="UserTitleID"
              title="UserTitle"
              errors={errors}
            />

            <TextField
              name="FirstName"
              placeholder="Enter First Name"
              register={register} // Register the field
              errors={errors} // Pass the errors to the TextField for validation
            />
            <TextField
              name="LastName"
              placeholder="Enter Last Name"
              register={register}
              errors={errors}
            />
            <TextField
              name="email"
              placeholder="Enter email"
              register={register}
              errors={errors}
            />
            <TextField
              name="Telephone"
              placeholder="Enter Telephone"
              register={register}
              errors={errors}
            />
          </div>
          <div className="flex justify-center">
            <CustomButton type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </CustomButton>
          </div>
        </div>
      </form>
    </>
  );
}
