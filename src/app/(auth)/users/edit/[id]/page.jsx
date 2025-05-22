import React from "react";
import { fetchPostObj } from "@/utils/action/function";
import UserForm from "@/components/forms/user/UserForm";
import { getCookie } from "@/action/cookieAction";
const page = async ({ params }) => {
  const auth = getCookie("auth", true);
  const Token = getCookie("Token");

  const data = { UserID: params.id };
  const res = await fetchPostObj({
    api: "users/edituser",
    auth,
    Token,
    isValue: true,
    data,
  });
  const user = res.userinfo;
  let FirstName, LastName;
  const fullName = user?.Name;
  if (fullName) {
    const nameParts = fullName.split(" ");
    FirstName = nameParts[0];
    LastName = nameParts.slice(1).join(" ");
  }
  const editValues = {
    UserID: params.id,
    DealerID: user?.DefaultDealerID,
    UserTitleID: user?.UserTitleID,
    FirstName,
    LastName,
    email: user?.UserEmail,
    Telephone: user?.Telephone,
  };

  return (
    <div>
      <div className="w-full mt-10 flex justify-center items-center ">
        <div className="lg:w-8/12 w-full mx-4 mt-14">
          <div className="w-full bg-card text-card-foreground shadow-lg shadow-border rounded-2xl p-5 lg:px-10  ">
            <h1 className="text-center  text-2xl font-bold">Edit User</h1>

            <UserForm
              edit={true}
              editValues={editValues}
              api="users/updateuser"
              refresh={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
