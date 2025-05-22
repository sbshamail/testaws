"use client";
import TooltipNext from "@/components/nextui/TooltipNext";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { fetchPostObj } from "@/utils/action/function";
import { setReducer } from "@/reduxStore/generate/generateReducer";
import { useDispatch } from "react-redux";
import { useSelection } from "@/reduxStore/function";
import DeleteUser from "./DeleteUser";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
const ActionTableRender = ({ row, auth, Token }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const prevUsers = useSelection("users") ?? {};
  const usersSelector = setReducer("users");
  const dispatch = useDispatch();
  const ClassName = `cursor-pointer Transition hover:border text-lg hover:text-xl w-6`;

  const ActionIcon = ({
    src,
    tooltip,
    width = "27",
    height = "27",
    href,
    onClick,
  }) => {
    return href ? (
      <TooltipNext content={tooltip}>
        <Link href={href}>
          <Image
            src={src}
            alt={tooltip}
            className={ClassName}
            width={width}
            height={height}
          />
        </Link>
      </TooltipNext>
    ) : (
      <TooltipNext content={tooltip}>
        <div onClick={onClick}>
          <Image
            src={src}
            alt={tooltip}
            className={ClassName}
            width={width}
            height={height}
          />
        </div>
      </TooltipNext>
    );
  };

  const statusChange = async () => {
    const data = {
      UserID: row.UserID,
      Status: row.Status === "1" ? "0" : "1",
    };
    const res = await fetchPostObj({
      api: "users/change_status",
      auth,
      Token,
      data,
      showToast: true,
      toastMsg: "Change Status Successfully",
      setLoading,
    });
    if (res) {
      const newUsers = prevUsers.users.map((user) =>
        user.UserID === row.UserID ? { ...user, Status: data.Status } : user
      );

      dispatch(usersSelector({ ...prevUsers, users: newUsers }));
    }
  };

  const hideChange = async () => {
    const data = {
      UserID: row.UserID,
      Status: row.HideonRedemptionActivity == "1" ? "0" : "1",
    };
    const res = await fetchPostObj({
      api: "users/hideusers",
      auth,
      Token,
      data,
      showToast: true,
      setLoading,
    });
    if (res) {
      const newUsers = prevUsers.users.map((user) =>
        user.UserID === row.UserID
          ? {
              ...user,
              HideonRedemptionActivity: data.Status,
            }
          : user
      );

      dispatch(usersSelector({ ...prevUsers, users: newUsers }));
    }
  };

  return (
    <>
      <SpinnerCenterScreen loading={loading} />
      <div className="flex space-x-1 items-center justify-between">
        <ActionIcon
          src={row.Status === "1" ? `/images/On.svg` : `/images/Off.svg`}
          tooltip={
            row.Status === "1" ? `Make User InActive` : `Make User Active`
          }
          onClick={statusChange}
        />
        <ActionIcon
          src={`/images/edit.svg`}
          tooltip={`Edit User`}
          href={`/users/edit/${row?.UserID}`} // ✅ Now right-click works!
        />
        <ActionIcon
          src={`/images/${
            row?.HideonRedemptionActivity === "1" ? "View" : "View_hide"
          }.svg`}
          tooltip={`Hide on New Performance Report`}
          onClick={hideChange}
        />
        <ActionIcon
          src={`/images/close-square.svg`}
          tooltip={`Delete User`}
          onClick={() => setDeleteModal(true)}
        />
      </div>
      <DeleteUser
        close={() => setDeleteModal(false)}
        open={deleteModal}
        auth={auth}
        Token={Token}
        row={row}
        dispatch={dispatch}
        prevUsers={prevUsers}
        usersSelector={usersSelector}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

export default ActionTableRender;
