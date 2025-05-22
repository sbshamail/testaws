import { cookies } from "next/headers";

export const getCookie = (key, parse) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(key)?.value;
  if (parse) {
    const parsedCookie = cookie ? JSON.parse(cookie) : null;
    return parsedCookie;
  }
  return cookie;
};
