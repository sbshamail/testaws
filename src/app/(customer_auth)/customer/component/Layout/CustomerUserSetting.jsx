"use client";
import React, { Suspense, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import IconDropdown from "@/components/cui/dropdown/IconDropdown";

import Swal from "sweetalert2";

import { useTheme } from "@/utils/theme/themeProvider";
import ToggleMode from "@/components/cui/themeToggle/ThemeMode";
import { GlobalContext } from "@/app/Provider";
import { useSelection } from "@/reduxStore/function";

const CustomerUserSettingMenu = () => {
  const { GLOBAL_RESPONSE, setGlobalLoader, isCustomerLogin } =
    useContext(GlobalContext);
  const customer = useSelection("customer");
  const router = useRouter();

  const { toggleMode, theme } = useTheme();

  const clearAllCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");

      // Delete for current domain
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${
        window.location.hostname
      }`;
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${
        window.location.hostname
      }`;

      // Try deleting from all possible paths
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/subpath;`;
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${
        document.domain
      }`;
    });
  };
  const logoutFromServer = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleLogout = async () => {
    // Clear session on backend (if applicable)
    await logoutFromServer();

    // Clear frontend storage
    localStorage.clear();
    sessionStorage.clear();
    clearAllCookies();

    // Reload page to fully clear cached data
    setTimeout(() => {
      setGlobalLoader(true);
      window.location.href = "/login";
    }, 500);
  };

  const confirmLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#ff9900",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonColor: "#ff9900", // Custom orange color for the OK button
        });
      }
    });
  };

  return (
    <Suspense fallback={<p>...loading</p>}>
      <div>
        <IconDropdown
          className={"  rounded-xl "}
          position="center"
          style="dropdown"
          mouseTrigger={true}
          contentsClass={"w-52 "}
          customIcon={(open) => {
            return (
              <div className="flex items-center group p-2 transition-all duration-500 relative rounded-2xl overflow-hidden">
                {/* Background Overlay (Expands on Hover) */}
                <div
                  className={`absolute  inset-0 bg-secondary  group-hover:scale-x-100 ${
                    open ? "scale-x-100" : "scale-x-0"
                  } origin-left transition-transform duration-500 rounded-2xl`}
                ></div>

                {/* Avatar */}
                <span
                  className={`relative z-10 border w-12 h-12 cursor-pointer rounded-full overflow-hidden transition-transform duration-500 
                 
                  `}
                >
                  <Image
                    src={
                      customer?.GetCustomerById?.CustomerImage ||
                      "/images/Avatar.png"
                    }
                    height={100}
                    width={100}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </span>

                {/* Text Content */}
                <div className="relative z-10 flex flex-col justify-center items-start ps-3">
                  <div className="text-card-foreground/70 group-hover:text-card-foreground/80 text-[14px] leading-[20px] font-semibold">
                    {customer?.GetCustomerById?.CustomerName}
                  </div>
                </div>
              </div>
            );
          }}
          contentClass={"p-2 "}
          contents={[
            {
              title: "My Profile",
              className: "hover:bg-secondary",
              click: () => {
                router.push(
                  isCustomerLogin ? "/userProfile" : "/users/profile"
                );
              },
            },
            {
              title:
                theme === "light" ? (
                  <span className=" flex items-center justify-between ">
                    <span>Switch to Dark</span>
                    <ToggleMode />
                  </span>
                ) : (
                  <div className="flex items-center justify-between ">
                    <span>Switch to Light</span> <ToggleMode />
                  </div>
                ),
              className: "hover:bg-secondary",
              click: () => {
                toggleMode();
              },
            },
            {
              title: "Logout",
              click: confirmLogout,
              className: "text-red-500 hover:bg-secondary",
            },
          ].filter(Boolean)}
        />
      </div>
    </Suspense>
  );
};

export default CustomerUserSettingMenu;
