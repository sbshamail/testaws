"use client";
import { useEffect, useState, useRef } from "react";
import useGetWindow from "./useGetWindow";

const useScreenState = ({ open, defaultWidth = 976 }) => {
  const { width } = useGetWindow(["resize"]);
  const [isOpen, setIsOpen] = useState(open);
  const prevWidthRef = useRef(width);

  useEffect(() => {
    if (width) {
      if (
        width <= defaultWidth &&
        prevWidthRef.current > defaultWidth &&
        isOpen
      ) {
        setIsOpen(false);
      } else if (width > defaultWidth) {
        setIsOpen(true);
      }
    }
    prevWidthRef.current = width;
  }, [defaultWidth, width]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return { isOpen, setIsOpen, toggleSidebar };
};

export default useScreenState;
