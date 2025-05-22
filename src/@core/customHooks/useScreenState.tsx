"use client";
import { useCallback, useEffect, useState } from "react";

const useScreenState = ({ open = true }) => {
  const [isOpen, setIsOpen] = useState(open);
  const handleResize = useCallback(() => {
    if (typeof window !== undefined) {
      if (window.innerWidth <= 976 && isOpen) {
        setIsOpen(false);
      }
    }
  }, [isOpen]);
  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("resize", handleResize);
      handleResize(); // Check on initial render
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize]);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return { isOpen, setIsOpen, toggleSidebar };
};

export default useScreenState;

// handleResize Function: This function checks the window's width. If the width is 976px or less and the sidebar is open, it sets isOpen to false.
// useEffect Hook: This hook adds the resize event listener to the window on component mount and removes it on unmount. It also checks the initial window size to set the correct sidebar state.
// useCallback Hook: This ensures that the handleResize function does not get re-created on every render, which can lead to performance issues.
