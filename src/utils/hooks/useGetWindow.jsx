"use client";
import { useEffect, useRef, useState } from "react";
import { debounce } from "./useDebounce";

const useGetWindow = (events, conditionFunc) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [clientWindow, setClientWindow] = useState();
  const [condition, setCondition] = useState(false);

  const handleEventRef = useRef(
    debounce(() => {
      if (conditionFunc) {
        if (conditionFunc(window)) {
          setCondition(true);
        } else {
          setCondition(false);
        }
      } else {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        setScrollY(window.scrollY);
        setClientWindow(window);
      }
    }, 100)
  );
  useEffect(() => {
    const handleEvent = handleEventRef.current;
    if (events && events.length > 0) {
      events.forEach((event) => {
        window.addEventListener(event, handleEvent);
      });
      handleEvent();
      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, handleEvent);
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { width, height, scrollY, clientWindow, condition };
};

export default useGetWindow;

// handleEvent Function: This function checks the window's width. If the width is 976px or less and the sidebar is open, it sets isOpen to false.
// useEffect Hook: This hook adds the resize event listener to the window on component mount and removes it on unmount. It also checks the initial window size to set the correct sidebar state.
// useCallback Hook: This ensures that the handleEvent function does not get re-created on every render, which can lead to performance issues.
