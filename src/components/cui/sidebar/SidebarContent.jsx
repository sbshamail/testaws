"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import useCustomPathName from "@/utils/hooks/getPathName";
import { usePathname } from "next/navigation";
import {
  MdCircle,
  MdOutlineCircle,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    icon: "ic:baseline-dashboard",
    children: [
      {
        title: "Home",
        // icon: "material-symbols:circle",
        link: "/",
      },
      {
        title: "Main",
        // icon: "material-symbols:circle-outline",
        children: [
          {
            title: "Other",
            // icon: "material-symbols:circle",
            link: "/main",
          },
        ],
      },
    ],
  },
];
const findFirstChildWithLink = (item) => {
  if (!item.children || item.children.length === 0) {
    return null;
  }

  const firstChild = item.children[0];
  if (firstChild.link) {
    return firstChild.link;
  }

  return findFirstChildWithLink(firstChild);
};
const childSvg = (index, item) => {
  const isLast = index === item?.children?.length;
  console.log(item?.children);
  return (
    <svg
      className="w-4 h-auto "
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
        fill={"#CFD4D9"}
      />
    </svg>
  );
};
const ItemComponent = ({
  index,
  item,
  isOpen,
  onClick,
  children,
  pathname,
  isChildMatch,
  level,
  navigateToFirstChild,
}) => {
  const isMatch = pathname === item.link || isChildMatch;
  // Handle click on the item (not the arrow)
  const handleItemClick = (e) => {
    if (item.link) {
      // If item has a link, normal navigation will occur
      return;
    }

    // If item has no link but has children, navigate to first child with link
    if (item.children) {
      e.preventDefault();
      e.stopPropagation();
      navigateToFirstChild(item);
    }
  };

  // Handle click on the arrow icon
  const handleArrowClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(item.title);
  };

  const Icon = item.icon || (item.children ? MdOutlineCircle : MdCircle);

  return (
    <div className={cn("w-full ", level === 0 ? "mb-1" : "")}>
      <div
        className={cn(
          "w-full relative flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-200",
          isMatch
            ? "bg-primary/10 text-primary"
            : "text-accent-foreground hover:bg-accent/50",
          level > 0 && "text-sm"
        )}
        onClick={handleItemClick}
      >
        <div className=" flex justify-center items-center ms-7">
          <Link href={item.link || "#"} className="" onClick={item?.action}>
            <div className="flex items-center justify-start  flex-1 gap-3  ">
              {/* {level > 0 && (
                <span className="absolute left-0 ">
                  {childSvg(index, item)}
                </span>
              )} */}

              <Icon
                className={cn(
                  "flex-shrink-0 ",
                  isMatch ? "text-primary" : "text-muted-foreground",
                  level === 0 ? "text-lg" : "text-sm"
                )}
              />
              <span className={cn(" font-medium", level > 0 && "font-normal ")}>
                {item.title}
              </span>
            </div>
          </Link>
        </div>
        {item.children && (
          <button
            onClick={handleArrowClick}
            className="p-1 rounded-full hover:bg-accent focus:outline-none"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? (
              <MdOutlineKeyboardArrowDown className="text-muted-foreground" />
            ) : (
              <MdOutlineKeyboardArrowRight className="text-muted-foreground" />
            )}
          </button>
        )}
      </div>
      {isOpen && children && (
        <div className={cn("ml-4 mt-1 space-y-1 pl-2 border-l border-border")}>
          {children}
        </div>
      )}
    </div>
  );
};

// const checkMatch = (item, pathname) => {
//   if (item.link === pathname) {
//     return true;
//   }
//   return item.children
//     ? item.children.some((child) => checkMatch(child, pathname))
//     : false;
// };
const checkMatch = (item, pathname) => {
  if (!item?.link) return false;

  // Special handling: if link is "/", it must match exactly
  if (item.link === "/") {
    return pathname === "/";
  }

  const itemLinkParts = item.link.split("/").filter(Boolean);
  const pathnameParts = pathname.split("/").filter(Boolean);

  if (itemLinkParts.length > pathnameParts.length) {
    return false;
  }

  // Check if all parts match exactly
  for (let i = 0; i < itemLinkParts.length; i++) {
    if (itemLinkParts[i] !== pathnameParts[i]) {
      return false;
    }
  }

  return true;
};

const SidebarList = ({ data, className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openItems, setOpenItems] = useState([]);

  // Auto-open parent items if a child is active
  useEffect(() => {
    const newOpenItems = [];

    const checkAndAddParents = (items, parentTitle) => {
      items.forEach((item) => {
        if (item.children) {
          const hasActiveChild = item.children.some(
            (child) => child.link === pathname || checkMatch(child, pathname)
          );

          if (hasActiveChild && item.title) {
            newOpenItems.push(item.title);
          }

          checkAndAddParents(item.children, item.title);
        }
      });
    };

    checkAndAddParents(data);

    if (newOpenItems.length > 0) {
      setOpenItems((prev) => {
        const combined = [...prev, ...newOpenItems];
        return [...new Set(combined)]; // Remove duplicates
      });
    }
  }, [data, pathname]);

  const handleToggle = (title) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(title)
        ? prevOpenItems.filter((itemStr) => itemStr !== title)
        : [...prevOpenItems, title]
    );
  };

  const navigateToFirstChild = (item) => {
    const firstChildLink = findFirstChildWithLink(item);

    if (firstChildLink) {
      router.push(firstChildLink);
    }

    // Also open the dropdown
    if (!openItems.includes(item.title)) {
      setOpenItems((prev) => [...prev, item.title]);
    }
  };

  const renderItems = (items, level = 0) => {
    return items.map((item, index) => {
      const isChildMatch = item.children?.some((child) => {
        return checkMatch(child, pathname);
      });

      return (
        <div key={item.title}>
          <ItemComponent
            index={index}
            item={item}
            isOpen={openItems.includes(item.title)}
            onClick={handleToggle}
            pathname={pathname}
            isChildMatch={isChildMatch || false}
            level={level}
            navigateToFirstChild={navigateToFirstChild}
          >
            {item.children && renderItems(item.children, level + 1)}
          </ItemComponent>
        </div>
      );
    });
  };
  return (
    <div className={cn("w-full  flex flex-col", className)}>
      {renderItems(data)}
    </div>
  );
};

export default SidebarList;
