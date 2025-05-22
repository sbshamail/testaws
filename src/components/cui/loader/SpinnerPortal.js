"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SpinnerCenterScreen from "./SpinnerCenterScreen";

// Singleton state to control the spinner
let showSpinnerFn = (bool, msg = "") => {};
// let hideSpinnerFn = () => {};

export const showSpinner = (bool, msg = "") => showSpinnerFn(bool, msg);
// export const hideSpinner = () => hideSpinnerFn();

const SpinnerPortal = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Assign the control function to the singleton
    showSpinnerFn = (bool, msg = "") => {
      setLoading(bool);
      setMsg(msg);
    };

    // Cleanup function to avoid memory leaks
    return () => {
      showSpinnerFn = () => {};
    };
  }, []);

  if (typeof window === "undefined") return null;
  let spinnerRoot = document.getElementById("spinner-root");
  if (!spinnerRoot) {
    spinnerRoot = document.createElement("div");
    spinnerRoot.id = "spinner-root";
    document.body.appendChild(spinnerRoot);
  }

  return ReactDOM.createPortal(
    <SpinnerCenterScreen loading={loading} setLoading={setLoading} msg={msg} />,
    spinnerRoot
  );
};

export default SpinnerPortal;
