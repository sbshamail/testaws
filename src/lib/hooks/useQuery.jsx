"use client";

import { useSearchParams } from "next/navigation";

const useQuery = (pkey, pvalue) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const addQuery = (key, value) => {
    params.set(key ? key : pkey, value ? value : pvalue);
    window.history.pushState(null, "", `?${params.toString()}`);
    return params.toString(); // Return the updated query string
  };

  const deleteQueryAll = () => {
    const newParams = new URLSearchParams();
    window.history.pushState(null, "", `?${newParams.toString()}`);
  };

  const getQuery = (key) => {
    return searchParams.get(key ? key : pkey);
  };

  return {
    addQuery,
    deleteQueryAll,
    params,
    getQuery,
  };
};

export default useQuery;
