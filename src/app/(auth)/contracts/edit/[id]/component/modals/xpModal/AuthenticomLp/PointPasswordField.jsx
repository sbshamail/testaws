import Input from "@/app/Components/Inputs/Input";
import NextDropdown from "@/components/nextui/NextDropdown";
import { fetchPostObj } from "@/utils/action/function";
import React, { useState } from "react";
import { MdEditSquare } from "react-icons/md";

const PointPasswordField = ({
  row,
  cell,
  smlcpoints,
  auth,
  Token,
  xpPoints,
}) => {
  const [values, setValues] = useState({
    PendingSetupCode: "",
    LoyaltyID: "",
  });

  const fetchAction = async () => {
    const data = {
      ...values,
      ID: row.ID,
      EnableLoyaltyCash: xpPoints.dealerinfo.EnableLoyaltyCash,
      ContractID: xpPoints.ContractID,
    };
    const res = await fetchPostObj({
      api: "contracts/updateloyaltypoints",
      auth,
      data,
      Token,
      showToast: true,
    });
  };

  if (
    row?.IsDifferent === "0" &&
    row?.comment?.trim().toLowerCase() === "qr code scan" &&
    auth.role_id === "1"
  ) {
    return (
      <div className="bg-card shadow p-1 w-40">
        <div className="w-full flex items-center justify-center gap-2 ">
          <span>{row?.Point}</span>
          <NextDropdown
            id="value"
            list={smlcpoints}
            title={"Points"}
            className={"p-1"}
            onChange={(v) => setValues({ ...values, LoyaltyID: v })}
          />

          <MdEditSquare
            className="hover:text-siteBlue cursor-pointer Transition"
            onClick={fetchAction}
          />
        </div>
        <Input
          type={"password"}
          placeholder={"code"}
          className={"p-2"}
          value={values.PendingSetupCode}
          setvalue={(v) => setValues({ ...values, PendingSetupCode: v })}
        />
      </div>
    );
  }
  return cell < 0 ? (
    <span className="text-red-500">{Math.abs(cell)}</span>
  ) : (
    cell
  );
};

export default PointPasswordField;
