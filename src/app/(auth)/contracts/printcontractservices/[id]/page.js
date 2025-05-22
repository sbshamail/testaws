"use client";
import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/app/Provider";
import TailwindLoading from "@/app/Components/TailwindLoading";
import Header from "./Header";
import Details from "./Details";
const Page = ({ params }) => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState(null);

  useEffect(() => {
    if (GLOBAL_RESPONSE) {
      const { Token } = GLOBAL_RESPONSE;
      const headers = new Headers();
      headers.append("AUTHORIZATION", Token);

      fetch(
        `https://mypcp.us/webservices/contracts/printcontractservices/${params.id}`,
        {
          method: "GET",
          headers: headers,
        }
      )
        .then((response) => {
          let res = response.json();
          return res;
        })
        .then((res) => {
          setloading(false);
          setdata(res);
        })
        .catch((error) => {
          setloading(false);
          console.log(error);
        });
    }
  }, [GLOBAL_RESPONSE]);
  return (
    <div className="w-full h-screen">
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <TailwindLoading />
        </div>
      )}
      {data && (
        <div className="w-full h-full flex flex-col gap-10 p-5">
          <Header data={data} />
          <Details data={data} />
        </div>
      )}
    </div>
  );
};

export default Page;
