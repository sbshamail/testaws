"use client";
import { useState, useEffect } from "react";
import useClickOutside from "./useClickOutside";

const usePopOver = () => {
  const [open, setOpen] = useState(false);
  const [dropdownPositionClass, setDropdownPositionClass] = useState("");
  const [dropdownLeftPositionClass, setDropdownLeftPositionClass] =
    useState("");
  const [shouldOpenUpwards, setShouldOpenUpwards] = useState(false);

  const togglePopOver = () => {
    if (open) {
      setOpen(false);
    }
  };

  const divRef = useClickOutside(togglePopOver);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDropdownPosition = () => {
        if (divRef.current) {
          const dropdownRect = divRef.current.getBoundingClientRect();
          const viewportHeight =
            window.innerHeight || document.documentElement.clientHeight;
          const viewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          const spaceBelow = viewportHeight - dropdownRect.bottom;
          const dropdownHeight = divRef.current.offsetHeight;

          const shouldOpenUpwards =
            dropdownRect.bottom > viewportHeight * 0.8 ||
            spaceBelow < dropdownHeight;
          const shouldOpenLeft = dropdownRect.left > viewportWidth / 2;

          setShouldOpenUpwards(shouldOpenUpwards);
          setDropdownPositionClass(
            shouldOpenUpwards ? "top-auto bottom-full" : ""
          );
          setDropdownLeftPositionClass(shouldOpenLeft ? "right-0" : "left-0");
        }
      };

      updateDropdownPosition();

      window.addEventListener("resize", updateDropdownPosition);
      window.addEventListener("scroll", updateDropdownPosition);

      return () => {
        window.removeEventListener("resize", updateDropdownPosition);
        window.removeEventListener("scroll", updateDropdownPosition);
      };
    }
  }, [divRef, open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false); // Close dropdown when Esc is pressed
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup event listener on component unmount or when dropdown is closed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return {
    divRef,
    open,
    setOpen,
    dropdownPositionClass,
    dropdownLeftPositionClass,
    shouldOpenUpwards,
  };
};

export default usePopOver;
