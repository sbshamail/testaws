"use client";
import React, { useState } from "react";
import { PopOver, PopOverContent, PopOverTrigger } from "../common/PopOver";

import Shadow from "../wrapper/Shadow";
import { twMerge } from "tailwind-merge";

const ContentList = ({ content, contentClass, contentId = "title" }) => {
  const handleToggle = (click) => {
    if (click) {
      click();
    }
  };
  return (
    <span
      className={twMerge(
        `w-full  py-1 px-2  flex items-center space-x-2 cursor-pointer hover:bg-accent`,
        contentClass,
        content.className
      )}
      onClick={() => handleToggle(content?.click)}
    >
      {content?.icon && content.icon()}
      <span className="w-full text-sm ">{content[contentId]}</span>
    </span>
  );
};
// Main
const IconDropdown = ({
  Icon,
  title,
  contents = [
    { title: "Create", click: () => {}, className: "" },
    { title: "Edit", click: () => {} },
  ],
  contentClass,
  contentsClass,
  contentId,
  style,
  customIcon,
  mouseTrigger,
  toggleOnContent,
  children,
  className,
  position,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PopOver
      style={style}
      toggle={true}
      mouseTrigger={mouseTrigger}
      setIsOpen={setIsOpen}
      position={position}
    >
      <PopOverTrigger>
        <div className="w-full">
          {customIcon ? customIcon(isOpen) : Icon && Icon()}
          {title && title}
        </div>
      </PopOverTrigger>
      <PopOverContent toggleOnContent={toggleOnContent}>
        <Shadow
          space="0"
          className={`w-full  border border-border bg-card shadow shadow-accent ${className}`}
        >
          <div
            className={twMerge(
              `w-full flex flex-col select-none rounded-2xl`,
              `${contentsClass}`
            )}
          >
            {children ||
              contents?.map((content, key) => (
                <div key={key} className="w-full">
                  {ContentList({ content, contentClass, contentId })}
                </div>
              ))}
          </div>
        </Shadow>
      </PopOverContent>
    </PopOver>
  );
};

export default IconDropdown;
