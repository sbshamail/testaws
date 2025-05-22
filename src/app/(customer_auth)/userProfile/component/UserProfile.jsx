"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/app/Provider";

// components
import { MdKey } from "react-icons/md";
import { CustomButton } from "@/components/cui/button/CustomButton";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import { fetchPostObj } from "@/utils/action/function";
import Form from "./Form";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import ChangePasswordModal from "./ChangePasswordModal";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({});
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const { GLOBAL_RESPONSE, auth, Token } = useContext(GlobalContext);
  const {
    customer_id: CustomerID,
    ContractID,
    IsGuest = 0,
  } = GLOBAL_RESPONSE || {};
  useEffect(() => {
    const getUser = async () => {
      const data = { CustomerID, ContractID, IsGuest };
      const res = await fetchPostObj({
        api: "customer/userprofile",
        auth,
        Token,
        spinner: true,
        data,
      });
      if (res) {
        const user = res.GetCustomerById;
        setUserData(res);

        setValues({
          ...values,
          CustomerFName: user.CustomerFName,
          CustomerLastName: user.CustomerLName,
          FullAddress: user.CustomerAddressLine1,
          CityName: user.CityName,
          State: user.StateID,
          ZipCode: user.CustomerZIP,
          Country: user.CountryID,
          Phone: user.DealerTelephone,
          Email: user?.PrimaryEmail,
          DOB: user?.CustomerDOB,
          user_profile_id: user.user_id,
          IsGuest: 0,
          CustomerID,
          ContractID,
        });
      }
    };
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
          userData={userData}
          GLOBAL_RESPONSE={GLOBAL_RESPONSE}
          auth={auth}
          Token={Token}
          CustomerID={CustomerID}
          ContractID={ContractID}
        />
      </ShadowContainer>
      <ChangePasswordModal
        open={changePasswordModal}
        auth={auth}
        Token={Token}
        username={GLOBAL_RESPONSE?.user_name}
        close={() => setChangePasswordModal(false)}
        CustomerID={CustomerID}
        ContractID={ContractID}
        IsGuest={IsGuest}
      />
    </div>
  );
};

export default UserProfile;
