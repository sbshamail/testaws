import toast from "react-hot-toast";
import { formDatatoObject, objectToFormData } from "../helpers";
import { mypcp } from "../../../config";
import { showSpinner } from "@/components/cui/loader/SpinnerPortal";
import { logEvent } from "@/lib/LogEventsProvider";

/**
 * Fetch data using POST method.
 * @param {Object} params - The parameters for the request.
 * @param {string} params.url - The request URL.
 * @param {FormData} params.formdata - The form data to send.
 * @param {string} [params.method="POST"] - The HTTP method to use.
 * @param {string} params.token - The authentication token.
 * @param {boolean} params.spinner - The spinner show on screen.
 * @param {function} params.setLoading - Function to set loading state.
 * @param {function} params.setState - Function to update state.
 * @param {boolean} params.showToast - Whether to show a toast message.
 * @param {string} params.toastMsg - The message to show in the toast.
 * @param {function} params.reset - Function to reset the form.
 * @param {string} params.isValue - The key to extract from the response.
 * @param {string} params.errorMsg - The error message to show on failure.
 * @param {function} params.dispatch  - useDispatch
 * @param {function} params.fetchSelector -- name of setReducer name
 * @param {function} params.selectionKey  -- setReducer obj key
 * @param {boolean} params.cache  - boolean
 * @param {string} params.cacheKey  -String
 * @param {string} params.controller  - boolean
 * @returns {Promise<void>} - Returns a promise that resolves to void.
 */
export const fetchPost = async ({
  url,
  api,
  formdata,
  method = "POST",
  contentType,
  token,
  spinner,
  setLoading,
  setState,
  showToast, //boolean
  toastMsg,
  reset,
  isValue, //string, res object
  errorMsg,
  dispatch,
  fetchSelector,
  selectionKey,

  cache,
  cacheKey,
  controller,
}) => {
  if (spinner) {
    showSpinner(true);
  }
  const baseUrl = url ? url : `${mypcp}${api}`;

  if (setLoading) {
    setLoading(true);
  }
  const headers = new Headers();
  if (token) {
    headers.append("AUTHORIZATION", token);
  }
  if (contentType) {
    headers.append("Content-Type", contentType);
  }
  try {
    if ((typeof window !== "undefined" && cache) || cacheKey) {
      const cachedData = sessionStorage?.getItem(cacheKey ? cacheKey : baseUrl);
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        if (setState) setState(parsedData);
        if (dispatch && fetchSelector) {
          dispatch(
            selectionKey
              ? fetchSelector({
                  [selectionKey]: parsedData,
                })
              : fetchSelector(parsedData)
          );
        }
        return parsedData; // Return cached data
      }
    }

    const response = await fetch(baseUrl, {
      method: method,
      body: formdata,
      headers: headers,
      ...(controller ? { signal: controller.signal } : {}),
    });

    if (typeof window !== "undefined" && formdata) {
      const data = formDatatoObject(formdata);
      if (data?.role_id == "1" && data?.pcp_user_id) {
        logEvent(method, { url: baseUrl, value: data });
      }
    }
    if (spinner) {
      showSpinner(false);
    }
    const contentType = response.headers.get("content-type");

    let res;
    if (response || contentType?.includes("application/json")) {
      res = await response.json(); // Parse JSON if the response is JSON
    } else {
      res = await response.text(); // Otherwise, parse it as text (HTML or plain text)
      if (setLoading) {
        setLoading(false);
      }
      return res;
    }

    if (setLoading) {
      setLoading(false);
    }
    if (isValue && !dispatch) {
      if (setState) {
        setState(res);
      }
      return res;
    }
    if (res.success === 1 || res.response === "success" || isValue) {
      if (showToast) {
        let message = toastMsg ?? res.message ?? res.messages ?? res.msg ?? "";
        // Remove all HTML tags using regex
        message = message.replace(/<\/?[^>]+(>|$)/g, "");

        toast.success(message, {
          style: {
            background: "white",
            color: "black",
          },
        });
      }
      if (setState) {
        setState(res);
      }
      if (reset) {
        reset();
      }

      if (dispatch && fetchSelector) {
        dispatch(
          selectionKey
            ? fetchSelector({
                [selectionKey]: res,
              })
            : fetchSelector(res)
        );
      }

      // ✅ Store in sessionStorage (cache until refresh)
      if ((typeof window !== "undefined" && cache) || cacheKey) {
        sessionStorage?.setItem(
          cacheKey ? cacheKey : baseUrl,
          JSON.stringify(res)
        );
      }
      return res;
    } else {
      if (showToast) {
        console.log("error", res);
        let message =
          res.message ??
          res.messages ??
          res.error ??
          res.text ??
          res.msg ??
          (typeof res?.html === "string" && res.html) ??
          errorMsg;

        message = message.replace(/<\/?[^>]+(>|$)/g, "");
        toast.error(message, {
          style: {
            background: "white ",
            color: "black ",
          },
        });
      }
      if (dispatch && fetchSelector) {
        dispatch(
          selectionKey
            ? fetchSelector({
                [selectionKey]: {},
              })
            : fetchSelector({})
        );
      }
      if (setLoading) {
        setLoading(false);
      }
    }
  } catch (err) {
    console.log("error", errorMsg, err);
    if (setLoading) {
      setLoading(false);
    }
    if (spinner) {
      showSpinner(false);
    }
    if (showToast) {
      toast.error("Unknown Error", {
        style: {
          background: "white ",
          color: "black ",
        },
      });
    }
  }
};

/**
 * Fetch data using POST method.
 * @param {Object} params - The parameters for the request.
 * @param {string} params.url - The request URL.
 * @param {string} [params.method="POST"] - The HTTP method to use.
 * @param {function} params.setLoading - Function to set loading state.
 * @param {function} params.setState - Function to update state.
 * @param {boolean} params.showToast - Whether to show a toast message.
 * @param {string} params.toastMsg - The message to show in the toast.
 * @param {function} params.reset - Function to reset the form.
 * @param {string} params.isValue - The key to extract from the response.
 * @param {string} params.errorMsg - The error message to show on failure.
 * @param {string} params.Token
 * @param {boolean} params.spinner - The spinner show on screen.
 * @param {string} params.auth
 * @param {function} params.dispatch  - useDispatch
 * @param {function} params.fetchSelector -- name of setReducer name
 * @param {function} params.selectionKey  -- setReducer obj key
 * @param {string} params.data
 * @param {boolean} params.cache
 * @param {string} params.cacheKey
 * @returns {Promise<void>} - Returns a promise that resolves to void.
 */
export const fetchPostObj = async ({
  url,
  api,
  method = "POST",
  setLoading,
  setState,
  showToast, //boolean
  toastMsg,
  reset,
  isValue, //string, res object
  errorMsg,
  Token,
  spinner,
  auth,
  dispatch,
  fetchSelector,
  selectionKey,
  data = {},
  cache,
  cacheKey,
  controller,
}) => {
  const formdata = objectToFormData({
    ...auth,
    ...data,
  });

  const res = await fetchPost({
    url,
    api,
    method,
    setLoading,
    setState,
    showToast, //boolean
    toastMsg,
    reset,
    isValue, //string, res object
    errorMsg,
    token: Token,
    spinner,
    formdata,
    dispatch,
    fetchSelector,
    selectionKey,

    cache,
    cacheKey,
    controller,
  });
  return res;
};

export const setCookie = async (key, value) => {
  await fetch("/api/cookie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, value }),
  });
};

export const getCookie = async (key) => {
  const res = await fetch(`/api/cookie?key=${key}`, { method: "GET" });
  const data = await res.json();
  return data.value;
};
