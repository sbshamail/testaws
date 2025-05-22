import { redirect } from "next/navigation";
import { getCookie } from "@/action/cookieAction";

export default async function Home() {
  const auth = await getCookie("auth", true);
  if (auth?.pcp_user_id) {
    redirect("/dashboard");
  } else {
    redirect("/customer");
  }
  // Redirect to /dashboard on the server side

  return <h1>Redirecting...</h1>;
}
