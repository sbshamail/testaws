"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "./Provider";

const NotFound = () => {
  const router = useRouter();
  const { auth } = useContext(GlobalContext);
  const [countdown, setCountdown] = useState(5); // Start from 5 seconds
  const isDashboard = auth?.pcp_user_id ? true : false;
  useEffect(() => {
    // Countdown interval, only if countdown is above 0
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => Math.max(prev - 1, 0)); // Prevent going below 0
      }, 1000);

      return () => clearInterval(interval);
    } else {
      // Redirect when countdown hits 0
      if (isDashboard) {
        router.push("/dashboard");
      } else {
        router.push("/customer");
      }
    }
  }, [countdown, router]);

  return (
    <div className="bg-background flex h-screen w-full items-center justify-center gap-2 flex-col">
      <h1 className="text-2xl font-bold">
        <span className="text-red-500">404</span> - Page Not Found
      </h1>
      <p className="text-xl font-bold">
        Oops! The page you&apos;re looking for doesn&apos;t{" "}
        <span className="text-yellow-500">exist</span> or you are not{" "}
        <span className="text-yellow-500">authorized</span> to view it.
      </p>
      <p className="text-lg font-bold">
        Redirecting to the {isDashboard ? "dashboard" : "customer"} in{" "}
        <span className="font-bold text-primary">{countdown}</span> seconds...
      </p>
    </div>
  );
};

export default NotFound;
