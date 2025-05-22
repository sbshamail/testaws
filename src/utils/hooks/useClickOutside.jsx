"use client";
import { useEffect, useRef, useCallback } from "react";

const useClickOutside = (toggle) => {
  const divRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        if (toggle && typeof toggle === "function") {
          toggle();
        }
      }
    },
    [toggle]
  );

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousedown", handleClick);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousedown", handleClick);
      }
    };
  }, [handleClickOutside]);

  return divRef;
};

export default useClickOutside;
