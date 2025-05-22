import { useState, useCallback } from "react";

export const useDebounceCallback = (func, delay) => {
  // eslint-disable-next-line no-undef
  const [timer, setTimer] = (useState < NodeJS.Timeout) | (null > null);
  const debouncedCallback = useCallback(
    (...args) => {
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        func(...args);
      }, delay);
      setTimer(newTimer);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return debouncedCallback;
};

export const debounce = (func, delay) => {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

//use  debounce and useDebounce // same procedure
//   const debouncedFunction = useDebounceCallback((value: string) => {
//     console.log(value);
//   }, 500);
//     debouncedFunction(value);

//   const debouncedFunction = useDebounceCallback(() => {
//     ...contents
//   }, 500);
