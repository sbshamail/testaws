"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PiUserFocus } from "react-icons/pi";
import Image from "next/image";
import {
  MdCampaign,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { cn } from "@/lib/utils";

const menusHave = {
  "AV INSIGHTS": ["avinsights"],
  CONTRACTS: ["batch", "importexcel", "contracts", "Importexcel"],
  REPORTS: ["reports"],
  USERS: ["users"],
};

const Nav = ({ menu, menuCheck, setMenuCheck, pathname }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Handle clicking on main menu item
  const handleMainClick = (main) => {
    setMenuCheck(main);
    setOpenDropdown(main);
  };

  // Handle clicking on arrow toggle
  const handleArrowToggle = (main, event) => {
    event.preventDefault();
    event.stopPropagation();

    // Toggle only the clicked menu, regardless of which menu is active
    setOpenDropdown((prev) => (prev === main ? null : main));

    // Only set menuCheck if we're opening the menu
    // if (openDropdown !== main) {
    //   setMenuCheck(main);
    // }
  };

  useEffect(() => {
    for (const [menu, paths] of Object.entries(menusHave)) {
      if (paths.some((path) => pathname.includes(path))) {
        setMenuCheck(menu);
        setOpenDropdown(menu);
        return; // Stop once a match is found
      }
    }
  }, [pathname]);

  // useEffect(() => {
  //     setOpenDropdown((prev) => (prev === menuCheck ? null : menuCheck));
  // }, [menu]);

  const Artificial = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        color="currentColor"
      >
        <path d="M4 12c0-3.771 0-5.657 1.172-6.828S8.229 4 12 4s5.657 0 6.828 1.172S20 8.229 20 12s0 5.657-1.172 6.828S15.771 20 12 20s-5.657 0-6.828-1.172S4 15.771 4 12" />
        <path d="m7.5 15l1.842-5.526a.694.694 0 0 1 1.316 0L12.5 15m-4-2h3m4-4v6M8 2v2m8-2v2m-4-2v2M8 20v2m4-2v2m4-2v2m6-6h-2M4 8H2m2 8H2m2-4H2m20-4h-2m2 4h-2" />
      </g>
    </svg>
  );

  const mainIcon = (title, value) => {
    const icons = {
      contracts: (
        <Image
          alt={title}
          src="/images/Sidebar/contract.svg"
          className={`w-7 ${value && "brightness-0 invert"}`}
          height={100}
          width={100}
        />
      ),
      reports: (
        <Image
          alt={title}
          src="/images/Sidebar/report.svg"
          className={`w-7 ${value && "brightness-0 invert"}`}
          height={100}
          width={100}
        />
      ),
      users: <PiUserFocus />,
      "av insights": Artificial(),
      "campaign manager": <MdCampaign />,
    };

    return <div className="text-2xl">{icons[title] || null}</div>;
  };
  const childSvg = (index, length, item) => {
    const isLast = index === item?.submenu?.length - 1;

    return (
      <svg
        className="w-4 h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 70"
        fill="none"
      >
        <path
          d={
            isLast
              ? "M13 36.2C13.3866 36.2 13.7 35.8866 13.7 35.5C13.7 35.1134 13.3866 34.8 13 34.8V36.2ZM0.3 0V26.4677H1.7V0H0.3ZM0.3 26.4677C0.3 30.5689 1.326 33.0893 3.19648 34.5374C5.02432 35.9525 7.49241 36.2 10 36.2V34.8C7.50759 34.8 5.47568 34.5314 4.05352 33.4304C2.674 32.3623 1.7 30.3666 1.7 26.4677H0.3ZM10 36.2H13V34.8H10V36.2Z"
              : "M13 35.7C13.3866 35.7 13.7 35.3866 13.7 35C13.7 34.6134 13.3866 34.3 13 34.3V35.7ZM0.3 69C0.3 69.3866 0.613401 69.7 1 69.7C1.3866 69.7 1.7 69.3866 1.7 69H0.3ZM0.3 0V25.9677H1.7V0H0.3ZM0.3 25.9677C0.3 30.0689 1.326 32.5893 3.19648 34.0374C5.02432 35.4525 7.49241 35.7 10 35.7V34.3C7.50759 34.3 5.47568 34.0314 4.05352 32.9304C2.674 31.8623 1.7 29.8666 1.7 25.9677H0.3ZM10 35.7H13V34.3H10V35.7ZM0.3 25.9677V69H1.7V25.9677H0.3Z"
          }
          fill={isLast ? "#CFD4D9" : "#CFD4D9"}
        />
      </svg>
    );
  };
  <svg
    width="14"
    height="37"
    viewBox="0 0 14 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 36.2C13.3866 36.2 13.7 35.8866 13.7 35.5C13.7 35.1134 13.3866 34.8 13 34.8V36.2ZM0.3 0V26.4677H1.7V0H0.3ZM0.3 26.4677C0.3 30.5689 1.326 33.0893 3.19648 34.5374C5.02432 35.9525 7.49241 36.2 10 36.2V34.8C7.50759 34.8 5.47568 34.5314 4.05352 33.4304C2.674 32.3623 1.7 30.3666 1.7 26.4677H0.3ZM10 36.2H13V34.8H10V36.2Z"
      fill="#AB1A1A"
    />
  </svg>;

  function formatLinkHref(url) {
    // Split the URL at slashes
    const parts = url.split("/");

    // If the second part exists, lowercase the first letter
    if (parts[1] && parts[1].length > 0) {
      parts[1] = parts[1].charAt(0).toLowerCase() + parts[1].slice(1);
    }

    // Rejoin the parts to form the updated URL
    return parts.join("/");
  }
  const memoizedMenu = useMemo(() => menu, [menu]);

  return (
    <div className="w-full flex items-center select-none">
      <div className="w-full flex flex-col gap-y-4">
        {memoizedMenu &&
          memoizedMenu.length > 0 &&
          memoizedMenu.map((item) => {
            const isActive = item.submenu.some((sub) => sub.url === pathname);
            const isOpen =
              openDropdown === item.main && menuCheck === item.main;

            return (
              item.main && (
                <div key={item.main} className="w-full">
                  <div className="w-full flex items-center gap-3">
                    <Link
                      href={item?.submenu[0]?.url}
                      className={cn(
                        "w-full gap-2 flex items-center justify-start px-4 text-sm font-bold rounded-xl cursor-pointer py-3",
                        isActive
                          ? "bg-siteBlue text-white"
                          : isOpen
                          ? "border text-muted-foreground"
                          : "text-muted-foreground hover:bg-primary/20 hover:text-accent-foreground"
                      )}
                      onClick={() => handleMainClick(item.main)}
                    >
                      <span>{mainIcon(item.main.toLowerCase(), isActive)}</span>
                      <span className="relative">
                        {item.main}

                        {item.main.toLowerCase() === "av insights" && (
                          <span
                            className={cn(
                              "absolute -right-8 top-0 text-xs",
                              menuCheck === item.main
                                ? "text-white"
                                : "text-primary"
                            )}
                          >
                            [Beta]
                          </span>
                        )}
                      </span>
                    </Link>

                    {item.submenu &&
                      item.submenu.length > 0 &&
                      item.main !== item.submenu[0]?.title && (
                        <div
                          className="cursor-pointer"
                          onClick={(e) => handleArrowToggle(item.main, e)}
                          aria-label={isOpen ? "Collapse menu" : "Expand menu"}
                        >
                          {openDropdown === item.main ? (
                            <div>
                              <MdOutlineKeyboardArrowDown className="text-2xl text-muted-foreground" />
                            </div>
                          ) : (
                            <MdOutlineKeyboardArrowRight className="text-2xl text-muted-foreground" />
                          )}
                        </div>
                      )}
                  </div>

                  {openDropdown === item.main && item.submenu && (
                    <div className="w-full rounded mt-1">
                      {item.main !== item.submenu[0]?.title &&
                        item.submenu.map((subitem, index) => {
                          const isSubActive = subitem.url === pathname;

                          return (
                            <Link
                              key={index}
                              href={formatLinkHref(subitem.url)}
                              className="m-0 p-0"
                              prefetch={false}
                            >
                              <div className="w-full flex items-center rounded-lg ms-4 cursor-pointer first:mt-4">
                                <div className="flex items-center justify-center w-6 h-12">
                                  {childSvg(index, subitem, item)}
                                </div>
                                <span
                                  className={cn(
                                    "flex items-center hover:bg-primary/20 hover:text-accent-foreground rounded-lg h-12 w-full m-0 px-4 text-sm",
                                    isSubActive
                                      ? "bg-primary/30 text-accent-foreground"
                                      : "text-muted-foreground"
                                  )}
                                >
                                  {subitem.title}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  )}
                </div>
              )
            );
          })}
      </div>
    </div>
  );
};

export default Nav;
