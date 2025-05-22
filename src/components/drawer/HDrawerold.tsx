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
  const [formSize, setFormSize] = useState<string>();

  // Update size dynamically if formSize changes
  useEffect(() => {
    setFormSize(size);
  }, [size]);

  const positionClass = position === "left" ? "left-0" : "right-0";

  return (
    <div className="relative">
      {open && (
        <div className="fixed inset-0 z-40 bg-background opacity-50"></div>
      )}

      <div ref={drawerRef}>
        <Shadow
          className={`fixed   h-screen max-h-screen top-0 ${positionClass} w-11/12 sm:w-10/12
      ${formSize ? `md:w-${formSize}/12` : `md:w-1/2 lg:w-1/3 xl:w-1/4`}    
       overflow-auto z-50 transform ${
         open
           ? "translate-x-0"
           : position === "left"
           ? "-translate-x-full "
           : "translate-x-full"
       } transition-transform duration-300 ease-in-out`}
        >
          <div className="">
            <div
              className="absolute  right-2 top-1 cursor-pointer hover:text-red-500"
              onClick={toggle}
            >
              <HIconify icon={"fa:close"} fontSize="1.2em " />
            </div>
            {/* Drawer Content Here */}
            {open && (
              <div className="p-4">
                <h2 className="font-bold text-lg">{drawerTitle}</h2>
                <div>{children}</div>
              </div>
            )}
          </div>
        </Shadow>
      </div>
    </div>
  );
};

export default HDrawer;
