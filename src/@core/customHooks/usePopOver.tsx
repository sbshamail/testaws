"use client";
import { useState, RefObject, useEffect } from "react";
import useClickOutside from "./useClickOutside";

export interface UsePopOverReturn {
  divRef: RefObject<HTMLDivElement>;
  open: boolean;
  setOpen: (open: boolean) => void;
  dropdownPositionClass: string;
  dropdownLeftPositionClass: string;
  shouldOpenUpwards?: boolean;
}

export const usePopOver = (): UsePopOverReturn => {
  const [open, setOpen] = useState(false);
  const [dropdownPositionClass, setDropdownPositionClass] = useState("");
  const [dropdownLeftPositionClass, setDropdownLeftPositionClass] =
    useState("");
  const [shouldOpenUpwards, setShouldOpenUpwards] = useState(false);
  const toggle = () => {
    setOpen(false);
  };
  const divRef = useClickOutside(toggle);

  useEffect(() => {
    if (typeof window !== undefined) {
      const updateDropdownPosition = () => {
        if (divRef.current) {
          const dropdownRect = divRef.current.getBoundingClientRect();
          const viewportHeight =
            window.innerHeight || document.documentElement.clientHeight;
          const viewportWidth =
            window.innerWidth || document.documentElement.clientWidth;

          const spaceBelow = viewportHeight - dropdownRect.bottom;
          const spaceAbove = dropdownRect.top;
          const dropdownHeight = divRef.current.offsetHeight;

          // Determine if the dropdown should open upwards
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
      // Update position on mount and when the dropdown opens

      updateDropdownPosition();

      // Optionally, add resize and scroll event listeners if the position needs to be updated dynamically
      window.addEventListener("resize", updateDropdownPosition);
      window.addEventListener("scroll", updateDropdownPosition);

      return () => {
        window.removeEventListener("resize", updateDropdownPosition);
        window.removeEventListener("scroll", updateDropdownPosition);
      };
    }
  }, [divRef, open]);

  return {
    divRef,
    open,
    setOpen,
    dropdownPositionClass,
    dropdownLeftPositionClass,
    shouldOpenUpwards,
  };
};
