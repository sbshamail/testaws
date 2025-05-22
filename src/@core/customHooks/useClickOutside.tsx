"use client";
import { useEffect, useRef, useCallback } from "react";

const useClickOutside = (toggle: () => void) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        toggle();
      }
    },
    [toggle]
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [handleClickOutside]);

  return divRef;
};

export default useClickOutside;

// We use useCallback to memoize the handleClickOutside function. This ensures that the function only changes if the toggle function changes.
