import React from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";

const NextDropdown = ({
  disabledKeys,
  list,
  title,
  id = "id",
  text = "text",
  className,
  onChange,
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <div
          className={`border px-4 p-2 shadow cursor-pointer  rounded-lg ${className}`}
        >
          {title}
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        disabledKeys={disabledKeys}
        onAction={onChange}
      >
        {/* <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem> */}
        {list.map((item) => {
          return (
            <DropdownItem
              key={item[id]}
              className={item.className}
              color={item.color}
            >
              {item[text]}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NextDropdown;
