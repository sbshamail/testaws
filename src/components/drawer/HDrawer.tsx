"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import useClickOutside from "@/@core/customHooks/useClickOutside";
import HIconify from "../icon/HIconify";
import Shadow from "../tag/Shadow";

interface Props {
  position?: "left" | "right";
  open: boolean;
  close: (b: boolean) => void;
  size?: string;
  drawerTitle?: string;
  children?: ReactNode;
}

const HDrawer: FC<Props> = ({
  position = "right",
  open,
  close,
  size,
  drawerTitle = "H Drawer",
  children,
}) => {
  const toggle = () => {
    close(false);
  };

  const drawerRef = useClickOutside(toggle);
  const [drawerSize, setDrawerSize] = useState<string>();

  // Update size dynamically if drawerSize changes
  useEffect(() => {
    setDrawerSize(size);
  }, [size]);

  const positionClass = position === "left" ? "left-0 " : "right-0";
  const widthClass: any = {
    "1": "md:w-1/4",
    "2": "md:w-2/4",
    "3": "md:w-3/4",
    "4": "md:w-4/4",
  };

  const getWidthClass = () => {
    return drawerSize ? widthClass[drawerSize] : "md:w-1/2 lg:w-1/3 xl:w-1/4";
  };
  return (
    <div className="relative z-drawer">
      {open ? (
        <div className={`fixed inset-0 top-0 `}>
          <div className="absolute inset-0 bg-background opacity-50"></div>
          <div
            ref={drawerRef}
            className={`fixed h-screen w-11/12 sm:w-10/12 
              ${getWidthClass()} ${positionClass} `}
          >
            <Shadow className="h-full overflow-auto">{children}</Shadow>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HDrawer;
