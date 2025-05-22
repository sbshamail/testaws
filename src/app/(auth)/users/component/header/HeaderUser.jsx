"use client";
import React, { useContext } from "react";
import Select from "@/app/Components/Inputs/Select";
import { useSelection } from "@/reduxStore/function";
import { GlobalContext } from "@/app/Provider";
import Input from "@/app/Components/Inputs/Input";
import { CustomButton } from "@/components/cui/button/CustomButton";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
//redux
import { useDispatch } from "react-redux";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { UserContext } from "../../UserProvider";
// action
import { postSearchUser } from "../function";
import { AdminLayoutContext } from "@/app/(auth)/layout";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";

const HeaderUser = () => {
  const { admindealeroptions } = useContext(AdminLayoutContext);
  const { auth, Token } = useContext(GlobalContext);
  const { values, setValues, setLoading } = useContext(UserContext);
  const dispatch = useDispatch();
  const usersSelector = setReducer("users");
  const router = useRouter();
  const pathname = usePathname();

  const usertitles = useSelection("usertitles")?.UserTitles ?? [];
  const userstatus = useSelection("userstatus")?.user_status ?? {};
  const primaryaccount = useSelection("primaryaccount")?.p_account ?? {};
  const userRoles = useSelection("userRoles")?.user_roles ?? [];

  const statusArray = Object?.entries(userstatus)?.map(([key, value]) => ({
    value: Number(key),
    text: value,
  }));
  const primaryAccountArray = Object?.entries(primaryaccount)?.map(
    ([key, value]) => ({
      value: Number(key),
      text: value,
    })
  );

  const handleSelectValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSearchUser = async () => {
    await postSearchUser({
      pathname,
      router,
      auth,
      Token,
      values,
      dispatch,
      usersSelector,
      setLoading,
    });
  };
  return (
    <div className="flex flex-col gap-6  ">
      <div className={"mt-6"}>
        <ShadowContainer>
          <div className="flex justify-between sm:flex-nowrap flex-wrap gap-4">
            <div className="w-full flex items-center flex-wrap gap-4 ">
              <Select
                options={userRoles}
                placeholder="Select Level"
                value={values?.user_level}
                setvalue={(value) => handleSelectValue("user_level", value)}
                keyTitle="cizacl_role_name"
                keyValue="cizacl_role_id"
              />
              <Select
                options={usertitles}
                placeholder="Select User Title"
                value={values["UserTitleID[]"]}
                setvalue={(value) => handleSelectValue("UserTitleID[]", value)}
                keyTitle="UserTitle"
                keyValue="UserTitleID"
              />
              <Select
                options={admindealeroptions}
                placeholder="Select Dealer"
                value={values?.DealerID}
                setvalue={(value) => handleSelectValue("DealerID", value)}
              />
              <Select
                options={statusArray}
                placeholder="Select Status"
                value={values?.user_status}
                setvalue={(value) => handleSelectValue("user_status", value)}
              />
              <Select
                options={primaryAccountArray}
                placeholder="Select Account"
                value={values?.isprimaryaccount}
                setvalue={(value) =>
                  handleSelectValue("isprimaryaccount", value)
                }
              />
            </div>

            <CustomButton
              className="min-w-max   h-10"
              variant="main"
              onClick={() => router.push("/users/user_create")}
              Icon={() => <p>+</p>}
            >
              Add User
            </CustomButton>
          </div>
        </ShadowContainer>
      </div>
      <div className={""}>
        <ShadowContainer>
          <div className="w-full flex justify-between sm:flex-nowrap flex-wrap gap-4">
            <div className="w-full flex items-center  flex-wrap gap-4">
              <Input
                placeholder={"User Name"}
                width={"full"}
                className={"w-80"}
                value={values.user_name_search}
                onChange={(e) =>
                  handleSelectValue("user_name_search", e.target.value)
                }
              />

              <Input
                placeholder={"User Email"}
                width={"full"}
                className={"w-80"}
                value={values.user_email_search}
                onChange={(e) =>
                  handleSelectValue("user_email_search", e.target.value)
                }
              />
            </div>
            <CustomButton
              className="min-w-max   h-10"
              onClick={handleSearchUser}
            >
              Search User
            </CustomButton>
          </div>
        </ShadowContainer>
      </div>
    </div>
  );
};

export default HeaderUser;
