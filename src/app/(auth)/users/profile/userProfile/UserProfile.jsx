"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/app/Provider";

//redux
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { useDispatch } from "react-redux";
// components
import { MdKey } from "react-icons/md";
import { CustomButton } from "@/components/cui/button/CustomButton";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { fetchPost, fetchPostObj } from "@/utils/action/function";
import Form from "./component/Form";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import ChangePasswordModal from "./component/ChangePasswordModal";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const { GLOBAL_RESPONSE, auth, Token } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const userTitlesSelector = setReducer("usertitles");

  useEffect(() => {
    const { pcp_user_id, UserID } = GLOBAL_RESPONSE || {};
    const getUser = async () => {
      const data = { UserID: pcp_user_id };
      const res = await fetchPostObj({
        api: "users/edituser",
        auth,
        Token,
        isValue: true,
        spinner: true,
        data,
      });

      if (res) {
        const user = res.userinfo;
        let FirstName, LastName;
        const fullName = user?.Name;
        if (fullName) {
          const nameParts = fullName.split(" ");
          FirstName = nameParts[0];
          LastName = nameParts.slice(1).join(" ");
        }
        setValues({
          ...values,
          FirstName,
          LastName,
          UserID: UserID,
          email: user?.UserEmail,
          Telephone: user?.Telephone,
          UserTitleID: user?.UserTitleID,
          DealerID: user?.DefaultDealerID,
        });
      }
    };
    const getUserTitle = async () => {
      await fetchPost({
        token: Token,
        api: "users/usertitles",
        method: "GET",
        dispatch,
        fetchSelector: userTitlesSelector,
        isValue: true,
        cache: true,
      });
    };
    getUserTitle();
    getUser();
  }, [GLOBAL_RESPONSE]);

  return (
    <div className="mx-4 mt-10 grid grid-cols-1 gap-6">
      <SpinnerCenterScreen loading={loading} />
      <div className="flex justify-between p-2 bg-background rounded-lg">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <CustomButton Icon={MdKey} onClick={() => setChangePasswordModal(true)}>
          CHANGE PASSWORD
        </CustomButton>
      </div>
      <ShadowContainer>
        <Form
          values={values}
          setValues={setValues}
          setLoading={setLoading}
          GLOBAL_RESPONSE={GLOBAL_RESPONSE}
          auth={auth}
          Token={Token}
        />
      </ShadowContainer>
      <ChangePasswordModal
        open={changePasswordModal}
        auth={auth}
        Token={Token}
        username={GLOBAL_RESPONSE?.user_name}
        close={() => setChangePasswordModal(false)}
      />
    </div>
  );
};

export default UserProfile;
