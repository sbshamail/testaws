import React from "react";

import { Toaster } from "react-hot-toast";

import { PiArrowFatRightFill } from "react-icons/pi";
import { GrDocumentDownload } from "react-icons/gr";

import { FaExclamationCircle } from "react-icons/fa";
import ShadowContainer from "@/app/Components/containers/ShadowContainer";
import Dashboard from "./Dashboard";
import { getCookie } from "@/action/cookieAction";

const Page = () => {
  const auth = getCookie("auth", true);
  const Token = getCookie("Token");
  return (
    <div className="w-full">
      <Toaster
        toastOptions={{
          style: {
            color: "white",
          },
          success: {
            style: {
              background: "rgba(0,255,0,0.6)",
            },
          },
          error: {
            style: {
              background: "#FF5555",
            },
          },
        }}
      />
      <div className="p-3 px-6 bg-background pt-10 space-y-6 w-full overflow-hidden">
        {false && (
          <div className=" flex gap-4">
            <ShadowContainer className="relative">
              <div className="bg-white rounded-xl p-1 w-full max-w-3xl mx-auto">
                <div className="mb-3 text-sm font-semibold uppercase flex justify-end px-2">
                  <span className="px-4 py-2 bg-red-500 rounded-2xl text-white">
                    Override
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Contract Reserve",
                      count1: "5,497",
                      count2: "4,245",
                      amount: "$1,910,567.96",
                      color: "#00B7FF",
                    },
                    {
                      title: "Service Redeemed",
                      count1: "5,497",
                      count2: "4,245",
                      amount: "$1,910,567.96",
                      color: "#00B7FF",
                    },
                    {
                      title: "Service Pending",
                      count1: "5,497",
                      count2: "4,245",
                      amount: "$1,910,567.96",
                      color: "#00B7FF",
                    },
                    {
                      title: "Matured Contracts",
                      count1: "3,357",
                      count2: "",
                      amount: "$1,434,983.00",
                      color: "#008000",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg border border-gray-300 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-gray-600 font-semibold gap-2">
                          {item.title}
                          <GrDocumentDownload className="text-gray-400" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 w-1/3">
                          <span className="text-gray-900 font-semibold text-lg">
                            {item.count1}
                          </span>
                          {item.count2 && (
                            <span className="text-gray-400">|</span>
                          )}
                          {item.count2 && (
                            <span className="text-green-500 font-semibold text-lg">
                              {item.count2}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-center items-center">
                          <PiArrowFatRightFill
                            className="text-lg"
                            style={{ color: item.color }}
                          />
                        </div>
                        <div className="text-gray-600 font-semibold text-lg">
                          {item.amount}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex w-full justify-end items-center mt-4 gap-2">
                    <FaExclamationCircle className="text-siteBlue text-xl" />
                    <span className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg shadow-md font-bold">
                      $1,759.00
                    </span>
                    <span className="bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg shadow-md font-bold">
                      $301,124.00
                    </span>
                    <span className="bg-orange-600 text-white text-sm px-4 py-2 rounded-lg shadow-md font-bold">
                      $362.00
                    </span>
                  </div>
                </div>
              </div>
            </ShadowContainer>

            <ShadowContainer>
              <div className="bg-white rounded-xl p-1 w-full max-w-3xl mx-auto">
                <div className="mb-3 text-sm font-semibold uppercase flex justify-end px-2">
                  <span className="px-4 py-2 bg-red-500 rounded-2xl text-white">
                    Non Override
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Service Redeemed",
                      counts: ["5,497", "4,245"],
                      amount: "$1,910,567.96",
                      iconColor: "#008000",
                      alert: false,
                    },
                    {
                      title: "Service Pending",
                      counts: ["5,497", "4,245"],
                      amount: "$1,910,567.96",
                      iconColor: "#008000",
                      alert: false,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-lg border border-gray-300 p-4 shadow-sm ${
                        item.title === "Service Redeemed" ? "bg-red-500" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-gray-600 font-semibold gap-2">
                          {item.title}
                          <GrDocumentDownload className="text-gray-400" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 w-1/4 items-center">
                          {item.alert && (
                            <FaExclamationCircle className="text-siteBlue text-lg" />
                          )}
                          <span className="text-gray-900 font-semibold text-lg">
                            {item.counts[0]}
                          </span>
                          <span className="text-gray-400">|</span>
                          <span className="text-green-500 font-semibold text-lg">
                            {item.counts[1]}
                          </span>
                        </div>
                        <div className="w-1/6 flex justify-center">
                          <PiArrowFatRightFill
                            className="text-lg"
                            style={{ color: item.iconColor }}
                          />
                        </div>
                        <div className="text-gray-600 font-semibold text-lg">
                          {item.amount}
                        </div>
                      </div>
                      {item.title === "Service Redeemed" && (
                        <div className="w-full my-1 flex justify-between items-center border-gray-300 pt-2">
                          <div className="flex gap-2 items-center w-1/4">
                            <FaExclamationCircle className="text-siteBlue text-lg" />
                            <span className="text-black font-semibold block text-lg">
                              {item.counts[0]}
                            </span>
                          </div>
                          <div className="w-1/6 flex justify-center">
                            <PiArrowFatRightFill className="text-[#F57F1E] text-lg" />
                          </div>
                          <div className="text-gray-400 font-semibold text-lg">
                            {item.amount}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ShadowContainer>
          </div>
        )}
        <Dashboard auth={auth} Token={Token} />
      </div>
    </div>
  );
};

export default Page;
