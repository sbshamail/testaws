"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/app/Components/containers/PageContainer";
import { GlobalContext } from "@/app/Provider";

import { fetchPostObj } from "@/utils/action/function";
import Table from "@/components/cui/table";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { CustomButton } from "@/components/cui/button/CustomButton";
import { Toastify } from "@/utils/helpers";

function Page({ params }) {
  // const params = useParams();
  const router = useRouter();
  const { GLOBAL_RESPONSE, auth, Token } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);

  const [currentItems, setCurrentItems] = useState(null);

  const [selectedRows, setSelectedRows] = useState([]);

  const decodedId = decodeURIComponent(params.id);

  // Split the decoded ID string at '=' and get the last part
  const idValue = decodedId.split("=").pop();

  const fetchListOfEmails = async () => {
    const data = {
      BatchID: idValue,
    };
    const res = await fetchPostObj({
      auth,
      Token,
      api: "batch/getuserstoemailinvoice",
      setLoading,
      data,
    });
    if (res) {
      setCurrentItems(res?.UserInfoArray);
    }
  };

  const handleSendEmail = async () => {
    const { pcp_user_id, user_cizacl_role_id, user_id, Token } =
      GLOBAL_RESPONSE ?? {};

    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    let formdata = new FormData();
    formdata.append("pcp_user_id", pcp_user_id);
    formdata.append("role_id", user_cizacl_role_id);
    formdata.append("user_id", user_id);
    formdata.append("BatchID", idValue);
    selectedRows.forEach((row) => {
      formdata.append("UserID[]", row.UserID);
    });
    setLoading(true);

    fetch("https://mypcp.us/webservices/batch/emailinvoice", {
      method: "POST",
      body: formdata,
      headers: headers,
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        Toastify("success", res?.message);
        setSelectedRows([]);
        // console.log("resresres", res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (auth) {
      fetchListOfEmails();
    }
  }, [auth]);

  const columns = [
    { title: "No", render: ({ index }) => index + 1 },
    { title: "User Name", accessor: "UserName" },
    { title: "Name", accessor: "Name" },
    { title: "Email", accessor: "UserEmail" },
  ];

  const headerAction = () => {
    return (
      <CustomButton variant="main" onClick={handleSendEmail}>
        Send E-Mail
      </CustomButton>
    );
  };
  return (
    <PageContainer>
      <SpinnerCenterScreen loading={loading} />
      <div className="w-full">
        <div className="w-full flex justify-between mb-4 gap-4 items-center">
          <CustomButton
            onClick={() => router.back()}
            className={`flex gap-4 bg-siteHighLight hover:bg-siteHighLight  p-2 items-center rounded-xl text-sm font-bold tracking-wide text-white hover:opacity-80 transition-opacity duration-200`}
          >
            Go Back
          </CustomButton>
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-xl mt-2">
              Send Batch Email - FOR Dealer Users
            </h1>
            <div className="bg-siteOrange p-2 rounded-lg text-white text-center w-max">
              Total: {currentItems?.length ?? 0}
            </div>
          </div>
          <div></div>
        </div>
        <div className="w-full">
          <Table
            headerAction={headerAction}
            rowId={"UserID"}
            showHeader={true}
            data={currentItems}
            columns={columns}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </div>
      </div>
    </PageContainer>
  );
}

export default Page;
