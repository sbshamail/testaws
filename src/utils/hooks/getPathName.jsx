"use client";
import { useEffect, useState } from "react";

const useCustomPathName = () => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Function to update pathname based on window.location
      const updatePathname = () => {
        const url = window.location.href;
        const path = window.location.pathname;
        const hashIndex = url.indexOf("#");
        if (hashIndex !== -1) {
          const inputParam = url.substring(hashIndex);
          setPathname(path + inputParam);
        } else {
          setPathname(path);
        }
      };

      // Initial update on component mount
      updatePathname();

      // Event listener for hashchange, popstate, and click events
      const handleLocationChange = () => {
        updatePathname();
      };

      window.addEventListener("hashchange", handleLocationChange);
      window.addEventListener("popstate", handleLocationChange);

      // Handle click events on links or elements that change pathname
      const handleClick = (event) => {
        const target = event?.closest("a"); // Find the closest <a> element
        if (target && target.href.startsWith(window.location.origin)) {
          event.preventDefault(); // Prevent default navigation
          const href = target.getAttribute("href");
          window.history.pushState({}, "", href); // Change URL without reloading
          updatePathname();
        }
      };

      document.addEventListener("click", handleClick);

      // Clean up event listeners
      return () => {
        window.removeEventListener("hashchange", handleLocationChange);
        window.removeEventListener("popstate", handleLocationChange);
        document.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return pathname;
};

export default useCustomPathName;
