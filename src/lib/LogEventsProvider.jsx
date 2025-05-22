"use client";
import { GlobalContext } from "@/app/Provider";
import SpinnerCenterScreen from "@/components/cui/loader/SpinnerCenterScreen";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
export const logEvent = (type, details = {}) => {
  const now = new Date();
  const timestamp = now.toISOString();
  const expiry = new Date(
    now.getTime() + 7 * 24 * 60 * 60 * 1000
  ).toISOString(); // 7 days from now

  const logEntry = { type, details, timestamp, expiry };

  // Retrieve existing logs from localStorage (if any)
  const existingLogs = JSON.parse(localStorage.getItem("eventLogs")) || [];

  // Filter out expired logs
  const filteredLogs = existingLogs.filter((log) => new Date(log.expiry) > now);
  // Add the new log entry
  filteredLogs.push(logEntry);

  // Save the updated log array back to localStorage
  localStorage.setItem("eventLogs", JSON.stringify(filteredLogs));
};
function LogEventsProvider() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(GlobalContext);
  const handleRoute = (target) => {
    const anchor = target.closest("a");
    if (anchor && anchor.href) {
      const isInternalLink = anchor.href.startsWith(window.location.origin);
      const anchorPath = new URL(anchor.href).pathname;
      const currentPath = window.location.pathname;
      console.log(anchorPath, currentPath);
      if (isInternalLink && anchorPath !== currentPath) {
        setLoading(true);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // Simulate loading for UX (adjust as needed)

    return () => clearTimeout(timer);
  }, [pathname]);
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target;
      handleRoute(target);
      if (target.tagName === "SPAN" && auth?.role_id == "1") {
        logEvent("RouteChange", { link: pathname });
      }
    };
    // const handleInput = (e) => {
    //   const target = e.target;
    //   logEvent("Input", {
    //     name: target.name,
    //     value: target.value?.slice(0, 50),
    //     tag: target.tagName,
    //   });
    // };

    // Log initial page load
    // document.addEventListener("input", handleInput);
    document.addEventListener("click", handleClick);
    // Cleanup on unmount
    return () => {
      // document.removeEventListener("input", handleInput);
      document.addEventListener("click", handleClick);
    };
  }, [pathname]);
  return <SpinnerCenterScreen loading={loading} setLoading={setLoading} />;
}

export default LogEventsProvider;
