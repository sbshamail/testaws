import { cookies } from "next/headers";
import React from "react";

const Page = () => {
  const cookieStore = cookies();
  const authString = cookieStore.get("auth")?.value || "{}"; // Ensure a default empty object string
  const auth = JSON.parse(authString); // Parse the JSON string into an object

  const id = auth.pcp_user_id; // Now this will work
  //
  return (
    <iframe
      src={`https://av-insights.mypcp.us/?userid=${id}`}
      style={{
        width: "100%", // Full width of the viewport
        height: "100vh",
        border: "none",
      }}
      title="Iframe Example"
    ></iframe>
  );
};

export default Page;
