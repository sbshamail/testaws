"use client";
import React, { FC, ReactNode, useState } from "react";
import Link from "next/link";
import HIconify from "../icon/HIconify";
import { usePathname } from "next/navigation";
import { SidebarContentType } from "./interface";

interface itemComponentsProps {
  item: SidebarContentType;
  isOpen: boolean;
  onClick: (str: string) => void;
  child?: boolean;
  children: ReactNode;
  pathname?: string | null;
  isChildMatch: boolean;
}
const ItemComponent: FC<itemComponentsProps> = ({
  item,
  isOpen,
  onClick,
  children,
  pathname,
  isChildMatch,
}) => {
  let Container: any;
  if (item.link) {
    Container = Link;
  } else {
    Container = "div";
  }

  const isMatch = pathname === item.link || isChildMatch;

  // Prevent child clicks from closing the parent
  const handleItemClick = (e: React.MouseEvent) => {
    if (!item.link) {
      onClick(item.title);
      e.stopPropagation();
    }
  };

  return (
    <Container href={item.link || "#"} className={`no-underline`}>
      <div
        className={`flex items-center justify-between p-2 cursor-pointer ${
          isOpen && !item.link ? "bg-select-background-over" : ""
        }
        ${isMatch ? "bg-select-background-match" : ""}
         bg-select-background hover:bg-select-background-over
        `}
        onClick={(e) => handleItemClick(e)}
      >
        <div className="flex items-center space-x-2 drop-shadow-2xl filter ">
          <HIconify
            fontSize={item.id ? "1.5em" : "1.3em"}
            className={` 
              ${
                isOpen && !item.link
                  ? "text-select-icon-match"
                  : isMatch
                  ? "text-select-icon-match "
                  : "text-select-icon "
              }`}
            icon={
              item.icon
                ? item.icon
                : item.children
                ? "material-symbols:circle-outline"
                : "material-symbols:circle"
            }
          />
          <h4
            className={`${
              isMatch
                ? "text-select-foreground-match"
                : "text-select-foreground"
            }`}
          >
            {item.title}
          </h4>
        </div>
        {item.children && (
          <HIconify
            fontSize={"1.5em"}
            className={isOpen ? "iconPrimary" : ""}
            icon={
              isOpen
                ? "material-symbols:keyboard-arrow-down"
                : "material-symbols:keyboard-arrow-right"
            }
          />
        )}
      </div>
      {isOpen && children && <div className="ml-2">{children}</div>}
    </Container>
  );
};

interface Props {
  data: SidebarContentType[];
}

// Main Fuction
const Sidebar: FC<Props> = ({ data }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const pathname = usePathname();
  const handleToggle = (str: string) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(str)
        ? prevOpenItems.filter((itemStr) => itemStr !== str)
        : [...prevOpenItems, str]
    );
  };

  const checkMatch = (
    item: SidebarContentType,
    pathname: string | null
  ): boolean => {
    if (item.link === pathname) {
      return true;
    }
    return item.children
      ? item.children.some((child) => checkMatch(child, pathname))
      : false;
  };

  const renderItems = (items: SidebarContentType[]): ReactNode => {
    return items.map((item) => {
      const isChildMatch = item.children?.some((child) =>
        checkMatch(child, pathname)
      );

      return (
        <ItemComponent
          key={item.title}
          item={item}
          isOpen={openItems.includes(item.title)}
          onClick={handleToggle}
          pathname={pathname}
          isChildMatch={isChildMatch || false}
        >
          {item.children && renderItems(item.children)}
        </ItemComponent>
      );
    });
  };

  return (
    <div className="w-full mt-6">
      <div className="flex flex-col mx-6 space-y-3">{renderItems(data)}</div>
    </div>
  );
};

export default Sidebar;
