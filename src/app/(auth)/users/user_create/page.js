import React from "react";
import UserCreateForm from "@/components/forms/user/UserForm";

const page = () => {
  return (
    <div>
      <div className="w-full mt-10 flex justify-center items-center ">
        <div className="lg:w-8/12 w-full mx-4 mt-14">
          <div className="w-full bg-card rounded-2xl text-card-foreground  shadow-lg shadow-border  p-5 lg:px-10">
            <h1 className="text-center text-2xl font-bold">Create New User</h1>
            <UserCreateForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
