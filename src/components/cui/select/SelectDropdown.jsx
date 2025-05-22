"use client";
import React, { useEffect, useState } from "react";
import { PopOver, PopOverContent, PopOverTrigger } from "../common/PopOver";

import {
  MdOutlineClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const SelectDropdown = ({
  className = "min-w-40",
  titleClass = "",
  listClass,
  value,
  setValue,
  options = [
    {
      title: "Abc",
      id: "1",
    },
    {
      title: "Efg",
      id: "2",
    },
  ],
  contentId = "value",
  contentTitle = "text",
  placeholder = "",
  label,
}) => {
  const [filterText, setFilterText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  // When selectedField changes, update external value
  useEffect(() => {
    if (options) {
      const getTitle = options.find((item) => item[contentId] === value);

      if (getTitle) {
        setFilterText(getTitle?.[contentTitle]);
      } else {
        setFilterText("");
      }
    }
  }, [value, setValue]);
  useEffect(() => {
    if (
      filterText &&
      filterText.trim() !==
        options.find((item) => item[contentId] === value)?.[contentTitle]
    ) {
      setFilteredOptions(
        options.filter((item) =>
          item[contentTitle].toLowerCase().includes(filterText.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(options); // Show all options if filter is blank or just matches selected
    }
  }, [filterText, options, value]);

  const handleToggle = (content) => {
    if (selectedIndex > -1) {
      setValue(content?.[contentId]);
      setFilterText(content?.[contentTitle]); // Clear the filter input
      setFilteredOptions(options); // Reset to full list
      setSelectedIndex(-1);
      setIsOpen(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredOptions.length); // Loop through options
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredOptions.length) % filteredOptions.length // Loop through options
      );
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      handleToggle(filteredOptions[selectedIndex]); // Select option on Enter
    }
  };

  const handleMouseClick = (content) => {
    handleToggle(content); // Select option on click
  };

  const Title = (open) => {
    const handleFilterText = (e) => {
      setFilterText(e.target.value);
      if (selectedIndex !== 0) {
        setSelectedIndex(0);
      }
      if ((e.target.value || filterText) && !isOpen) {
        setIsOpen(true);
      }
    };
    return (
      <div
        className={`bg-secondary shadow shadow-border  p-2 select-none ${className} ${titleClass}  rounded-lg overflow-hidden`}
      >
        <div className="flex items-center justify-between gap-2 ">
          <span className="">
            <input
              type="text"
              className="h-6 bg-transparent outline-none text-sm truncate "
              placeholder={placeholder ?? label}
              value={filterText}
              onChange={handleFilterText}
              onKeyDown={handleKeyDown}
            />
          </span>

          <div className="flex items-center gap-1 shrink-0">
            {value && (
              <MdOutlineClose
                className="hover:text-red-500 transition cursor-pointer"
                onClick={() => {
                  setValue("");
                  setFilterText("");
                  setIsOpen(true);
                }}
              />
            )}
            {open ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </div>
        </div>
      </div>
    );
  };
  const Content = () => (
    <div
      className={`bg-card border border-border shadow shadow-border rounded-lg max-h-[400px] overflow-auto ${className} ${listClass} flex flex-col `}
    >
      {filteredOptions?.length > 0 ? (
        filteredOptions?.map((content, index) => (
          <span
            key={index}
            className={` text-sm px-2 py-1 cursor-pointer hover:bg-accent ${
              content[contentId] === value
                ? "bg-accent/50 text-accent-foreground "
                : ""
            }
      ${
        selectedIndex === index ? "bg-accent text-accent-foreground" : "" // Highlight selected item
      }  
      `}
            onClick={() => handleMouseClick(content)} // Handle click event
            onMouseEnter={() => setSelectedIndex(index)} // Highlight on hover
          >
            {content[contentTitle]}
          </span>
        ))
      ) : (
        <h2 className="p-2 text-center text-muted-foreground">Not Found</h2>
      )}
    </div>
  );
  return (
    <div>
      {label && <label>{label}</label>}
      <PopOver style={"dropdown"} isOpen={isOpen} setIsOpen={setIsOpen}>
        <PopOverTrigger>{Title(isOpen)}</PopOverTrigger>
        <PopOverContent> {Content()}</PopOverContent>
      </PopOver>
    </div>
  );
};
export default SelectDropdown;
