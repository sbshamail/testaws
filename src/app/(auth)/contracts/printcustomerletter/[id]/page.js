"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { GlobalContext } from "@/app/Provider";
import TailwindLoading from "@/app/Components/TailwindLoading";
import Button from "@/app/Components/Button";

const Page = ({ params }) => {
  const { GLOBAL_RESPONSE } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const { Token } = GLOBAL_RESPONSE;
    const headers = new Headers();
    headers.append("AUTHORIZATION", Token);

    fetch(
      `https://mypcp.us/webservices/contracts/printcustomerletter?Contract_Id=${params.id}`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        setLoading(false);
        setData(res.html);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  });

  const handlePrint = () => {
    // Check if window object is available before using it
    window.print();
  };

  return (
    <div className="w-full h-screen flex flex-row justify-center gap-10 p-5">
      {loading && (
        <div className="w-full h-full flex justify-center items-center">
          <TailwindLoading />
        </div>
      )}
      {data && (
        <>
          <button className="no-print" onClick={handlePrint}>
            <Image
              src="/images/printer.png"
              width={120}
              height={120}
              alt="print"
            />
          </button>
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </>
      )}
    </div>
  );
};

export default Page;
