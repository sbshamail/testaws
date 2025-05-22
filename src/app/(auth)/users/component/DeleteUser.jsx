import React, { useState } from "react";
import SimpleModal from "@/components/cui/modals/SimpleModal";
import Input from "@/app/Components/Inputs/Input";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { fetchPostObj } from "@/utils/action/function";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
const DeleteUser = ({
  close,
  open,
  auth,
  Token,
  row,
  prevUsers,
  dispatch,
  usersSelector,
  loading,
  setLoading,
}) => {
  const [deletepassword, setDeletePassword] = useState("");

  const deleteUser = async () => {
    const data = {
      id: row.UserID,
      deletepassword: deletepassword,
    };
    const res = await fetchPostObj({
      api: "users/delete_user",
      auth,
      Token,
      data,
      setLoading,
      showToast: true,
    });
    const newUsers = prevUsers.users.filter(
      (user) => user.UserID !== row.UserID
    );

    dispatch(usersSelector({ ...prevUsers, users: newUsers }));
    close();
  };
  return (
    <SimpleModal close={close} open={open} className={"w-96 "}>
      <SpinnerCenterScreen loading={loading} />
      <div className="p-4 flex flex-col gap-4 bg-white rounded-lg ">
        <p className="text-red-500">Are You Sure, You want to Delete?</p>
        <Input
          type="password"
          placeholder="Enter Password"
          value={deletepassword}
          onChange={(e) => setDeletePassword(e.target.value)}
        />
        <div className="flex items-center justify-end gap-2 ">
          <CustomButton variant="secondary" onClick={close}>
            Cancel
          </CustomButton>
          <CustomButton variant="danger" onClick={deleteUser}>
            Confirm
          </CustomButton>
        </div>
      </div>
    </SimpleModal>
  );
};

export default DeleteUser;
