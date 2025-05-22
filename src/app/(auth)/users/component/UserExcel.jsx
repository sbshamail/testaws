import { CustomButton } from "@/components/cui/button/CustomButton";
import React, { useContext } from "react";
import { fetchPostObj } from "@/utils/action/function";
import { UserContext } from "../UserProvider";
import { FaFileExport } from "react-icons/fa6";
import { Toastify } from "@/utils/helpers";
import { jsonToExcel } from "@/utils/generateExcel";

const UserExcel = ({ auth, Token }) => {
  const { values, setLoading } = useContext(UserContext);

  const handleUserExcel = async () => {
    const res = await fetchPostObj({
      api: "users/exportusers",
      auth,
      Token,
      data: { ...values, DealerID: values.DealerID ?? "-1" },
      setLoading,
      showToast: true,
    });

    if (res) {
      jsonToExcel(res.users, "Users");
    }
  };
  return (
    <div className="flex justify-end w-full">
      <CustomButton
        size="sm"
        variant="white"
        Icon={FaFileExport}
        onClick={handleUserExcel}
      >
        Export
      </CustomButton>
    </div>
  );
};

export default UserExcel;
