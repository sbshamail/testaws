"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { usePopOver } from "@/@core/customHooks/usePopOver";
import HIconify from "@/components/icon/HIconify";

interface PopOverProps {
  children: ReactNode;
  toggle?: boolean;
}

export const PopOver: FC<PopOverProps> = ({ children, toggle }) => {
  const {
    divRef,
    open,
    setOpen,
    dropdownPositionClass,
    dropdownLeftPositionClass,
    shouldOpenUpwards,
  } = usePopOver();
  useEffect(() => {
    if (toggle === false) {
      setOpen(false);
    }
  }, [setOpen, toggle]);

  return (
    <div className="relative max-w-min">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            setOpen,
            open,
            divRef,
            dropdownPositionClass,
            shouldOpenUpwards,
            dropdownLeftPositionClass,
          } as any);
        }
        return child;
      })}
    </div>
  );
};

interface PopOverTriggerProps {
  children: ReactNode;
  open: boolean;
  setOpen: any;
  shouldOpenUpwards: boolean;
}

export const PopOverTrigger: FC<Partial<PopOverTriggerProps>> = ({
  children,
  open,
  setOpen,
  shouldOpenUpwards,
}) => {
  return (
    <div className="relative ">
      <div className="relative cursor-pointer " onClick={() => setOpen(!open)}>
        {open && !shouldOpenUpwards && (
          <div className=" absolute top-[80%] ">
            <HIconify
              fontSize="2rem"
              icon="iconamoon:arrow-up-2-thin"
              className="text-shadow-md opacity-50 iconPrimary "
            />
          </div>
        )}
        {open && shouldOpenUpwards && (
          <div className=" absolute bottom-[80%]">
            <HIconify
              fontSize="2rem"
              icon="iconamoon:arrow-down-2-thin"
              className="text-shadow-md opacity-50 iconPrimary"
            />
          </div>
        )}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              open,
            } as any);
          }
          return child;
        })}
      </div>
    </div>
  );
};

interface PopOverContentProps {
  children: ReactNode;
  divRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  dropdownPositionClass: string;
  dropdownLeftPositionClass: string;
}

export const PopOverContent: FC<Partial<PopOverContentProps>> = ({
  children,
  open,
  divRef,
  dropdownPositionClass,
  dropdownLeftPositionClass,
}) => {
  return open ? (
    <div ref={divRef} className="">
      <div
        className={` absolute z-popOver my-3  ${dropdownPositionClass} ${dropdownLeftPositionClass}`}
      >
        <div className="">{children}</div>
      </div>
    </div>
  ) : null;
};
