"use client";
import React, { useEffect } from "react";
import usePopOver from "@/utils/hooks/usePopOver";
import ReactDOM from "react-dom";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { twMerge } from "tailwind-merge";

export const PopOver = ({
  children,
  toggle,
  style,
  layout,
  mouseTrigger,
  setIsOpen,
  isOpen,
  position,
}) => {
  const {
    open,
    divRef,
    setOpen,
    dropdownPositionClass,
    dropdownLeftPositionClass,
    shouldOpenUpwards,
  } = usePopOver();

  useEffect(() => {
    setOpen(layout === "open");
  }, [layout, setOpen]);
  // Update internal state when external isOpen changes
  useEffect(() => {
    if (isOpen !== undefined && isOpen !== open) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  // Notify external state when internal open changes
  useEffect(() => {
    if (setIsOpen) {
      setIsOpen(open);
    }
  }, [open]);
  return (
    <div
      className="relative "
      ref={divRef}
      onMouseLeave={() => {
        mouseTrigger && setOpen && setOpen(false);
        mouseTrigger && setIsOpen && setIsOpen(false);
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              setOpen,
              open,
              setIsOpen,
              divRef,
              dropdownPositionClass,
              shouldOpenUpwards,
              dropdownLeftPositionClass,
              toggle,
              style,
              layout,
              mouseTrigger,
              position,
            })
          : child
      )}
    </div>
  );
};

export const PopOverTrigger = ({
  children,
  open,
  setOpen,
  setIsOpen,
  shouldOpenUpwards,
  style,
  mouseTrigger,
}) => {
  const handleTrigger = () => {
    if (setOpen) {
      setOpen(!open);
      if (setIsOpen) {
        setIsOpen(!open);
      }
    }
  };

  return (
    <div className="relative ">
      <div
        onClick={handleTrigger}
        onMouseEnter={mouseTrigger ? handleTrigger : undefined}
        className="cursor-pointer"
      >
        {style !== "dropdown" && open && (
          <div
            className={`absolute ${
              shouldOpenUpwards ? "bottom-[80%]" : "top-[80%]"
            }`}
          >
            {shouldOpenUpwards ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowUp />
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export const PopOverContent = ({
  children,
  open,
  setOpen,
  dropdownPositionClass,
  dropdownLeftPositionClass,
  toggle,
  style,
  layout,
  mouseTrigger,
  toggleOnContent = true,
  position,
  className,
}) => {
  if (!open && layout !== "fixed") return null;
  const getPosition = {
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
    left: "left-0",
  };
  const content = (
    <div
      onMouseLeave={() =>
        toggleOnContent && mouseTrigger && setOpen && setOpen(false)
      }
      onClick={() => toggleOnContent && toggle && setOpen && setOpen(false)}
    >
      <div
        className={twMerge(
          `absolute min-w-max z-popOver ${
            style === "dropdown" ? "w-full" : "w-auto my-3"
          } ${dropdownLeftPositionClass} ${dropdownPositionClass}`,
          `${getPosition[position]} ${className}`
        )}
      >
        {children}
      </div>
    </div>
  );
  return content;
};
