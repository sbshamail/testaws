"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSelection } from "@/reduxStore/function";

import { GlobalContext } from "@/app/Provider";

import { UserContext } from "../UserProvider";
import UserProvider from "../UserProvider";
import { setReducer } from "@/reduxStore/generate/generateReducer";

import { postSearchUser } from "../component/function";
import HeaderUser from "../component/header/HeaderUser";

//cui
import Table from "@/components/cui/table";

import ActionTableRender from "../component/ActionTable";
import UserPdf from "../component/UserPdf";
import UserExcel from "../component/UserExcel";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import PageContainer from "@/app/Components/containers/PageContainer";
import SelectDropdown from "@/components/cui/select/SelectDropdown";

const Page = () => {
  const { values, setLoading } = useContext(UserContext);
  const { auth, Token } = useContext(GlobalContext);

  const dispatch = useDispatch();
  const router = useRouter();
  const { users = [], total_users } = useSelection("users") ?? {};
  const usersSelector = setReducer("users");
  const userRoles = useSelection("userRoles")?.user_roles ?? [];
  const isFirstRender = useRef(true);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);
  const total = Number(total_users);

  useEffect(() => {
    // first time its true then false this to stop render on first
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const skip = (currentPage - 1) * dataLimit;

    postSearchUser({
      router,
      auth,
      Token,
      values: { ...values, offset: skip },
      dispatch,
      usersSelector,
      setLoading,
    });
  }, [currentPage, dataLimit]);

  const RoleRender = ({ cell }) =>
    userRoles.find((level) => level.cizacl_role_id === cell)
      ?.cizacl_role_name || "Role not found";

  const RowNumber = ({ index }) => {
    return Number(currentPage == 1 ? 0 : currentPage) * 10 + index + 1;
  };
  const testOptions = [
    {
      text: "Search by - CONTRACT#",
      value: "ContractNo",
    },
    {
      text: "Search by - VIN#",
      value: "VIN",
    },
    {
      text: "Search by - Customer Name",
      value: "CustomerName",
    },
    {
      text: "Search by - EMAIL ADDRESS",
      value: "PrimaryEmail",
    },
  ];
  const columns = [
    {
      title: "No.",
      render: RowNumber,
    },
    { title: "Dealer ID", accessor: "DefaultDealerID" },
    { title: "Account Username", accessor: "UserName" },
    { title: "Name", accessor: "Name" },
    { title: "Email", accessor: "UserEmail" },
    { title: "Title", accessor: "UserTitle" },
    //testing selection in table
    // {
    //   title: "Title",
    //   render: () => (
    //     <div className="">
    //       <SelectDropdown
    //         // value={adminsearchby}
    //         // setvalue={setadminsearchby}
    //         options={testOptions}
    //         placeholder="Search"
    //         className={"w-full xlg:w-max"}
    //       />
    //     </div>
    //   ),
    // },
    { title: "Role", accessor: "RoleID", render: RoleRender },
    {
      title: "Action",
      render: ({ row }) => (
        <ActionTableRender row={row} auth={auth} Token={Token} />
      ),
      className: "w-44",
    },
  ];

  return (
    <PageContainer>
      <UserProvider>
        <HeaderUser />
        {users?.length > 0 && (
          <div className="space-y-4 mt-6">
            <ShadowContainer>
              <Table
                headerAction={() => <UserPdf auth={auth} Token={Token} />}
                columns={columns}
                data={users}
                total={total}
                //pagination
                showPagination={true}
                pagination={{
                  currentPage,
                  setCurrentPage,
                  dataLimit,
                  setDataLimit,
                  dataLimitDisable: true,
                }}
              />
              <UserExcel auth={auth} Token={Token} />
            </ShadowContainer>
          </div>
        )}
      </UserProvider>
    </PageContainer>
  );
};

export default Page;
