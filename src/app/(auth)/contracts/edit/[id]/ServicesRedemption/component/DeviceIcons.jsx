import React from "react";
import { AiFillApple } from "react-icons/ai";
import { FaAndroid, FaWindows } from "react-icons/fa";
import { LuMonitor } from "react-icons/lu";

const DeviceIcons = ({ contract }) => {
  const { web, iphone, android, window_phone } = contract?.getuserbyid || {};
  return (
    <div>
      <div className="flex flex-row gap-4 bg-card">
        {/* Apple Icon */}
        <div
          className={`relative group flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl p-2 rounded-lg border ${
            iphone === "0" ? "border-border" : "border-green-400"
          } bg-card`}
        >
          <div
            className={`flex justify-center items-center w-10 h-10 rounded-full transition-all duration-300 ${
              iphone === "0"
                ? ""
                : "bg-gradient-to-tr from-green-400 to-green-600"
            } shadow-md`}
          >
            <AiFillApple
              color={iphone === "0" ? "#ccc" : "white"}
              size={20}
              className="transition-transform duration-300 transform group-hover:scale-110"
              aria-label="Apple"
            />
          </div>
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Apple
          </span>
        </div>

        {/* Android Icon */}
        <div
          className={`relative group flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl p-2 rounded-lg border ${
            android === "0" ? "border-border" : "border-green-400"
          } bg-card`}
        >
          <div
            className={`flex justify-center items-center w-10 h-10 rounded-full transition-all duration-300 ${
              android === "0"
                ? ""
                : "bg-gradient-to-tr from-green-400 to-green-600"
            } shadow-md`}
          >
            <FaAndroid
              color={android === "0" ? "#ccc" : "white"}
              size={20}
              className="transition-transform duration-300 transform group-hover:scale-110"
              aria-label="Android"
            />
          </div>
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Android
          </span>
        </div>

        {/* Windows Icon */}
        <div
          className={`relative group flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl p-2 rounded-lg border ${
            window_phone === "0" ? "border-border" : "border-green-400"
          } bg-card`}
        >
          <div
            className={`flex justify-center items-center w-10 h-10 rounded-full transition-all duration-300 ${
              window_phone === "0"
                ? ""
                : "bg-gradient-to-tr from-green-400 to-green-600"
            } shadow-md`}
          >
            <FaWindows
              color={window_phone === "0" ? "#ccc" : "white"}
              size={20}
              className="transition-transform duration-300 transform group-hover:scale-110"
              aria-label="Windows"
            />
          </div>
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Windows
          </span>
        </div>

        {/* Web Icon */}
        <div
          className={`relative group flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl p-2 rounded-lg border ${
            web === "0" ? "border-border" : "border-green-400"
          } bg-card`}
        >
          <div
            className={`flex justify-center items-center w-10 h-10 rounded-full transition-all duration-300 ${
              web === "0" ? "" : "bg-gradient-to-tr from-green-400 to-green-600"
            } shadow-md`}
          >
            <LuMonitor
              color={web === "0" ? "#ccc" : "white"}
              size={20}
              className="transition-transform duration-300 transform group-hover:scale-110"
              aria-label="Web"
            />
          </div>
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Web
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeviceIcons;
