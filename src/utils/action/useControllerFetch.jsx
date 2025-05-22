import { showSpinner } from "@/components/cui/loader/SpinnerPortal";
import { useCallback, useEffect, useRef } from "react";

export const useControllerFetch = (timer = 120000) => {
  const controllerRef = useRef(null); // Use ref to keep the controller persistent
  const timeoutIdRef = useRef(null); // Use ref for timeout ID

  // Create a new AbortController
  const createController = useCallback(() => {
    // Abort the previous request if still active
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create a new AbortController
    const newController = new AbortController();
    controllerRef.current = newController;

    // Set a timeout to automatically abort the request
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      if (controllerRef.current) {
        controllerRef.current.abort();
        showSpinner(false, "Request Timed Out");
      }
    }, timer); // 120 seconds timeout

    return newController;
  }, []);

  // Manual abort handler
  const handleAbort = useCallback((msg = "Fetch Aborted") => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      showSpinner(false, msg);
      controllerRef.current = null;
    }

    // Clear the timeout if any
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => handleAbort("Fetch Aborted on Cleanup");
  }, [handleAbort]);

  return { handleAbort, createController, controller: controllerRef.current };
};
