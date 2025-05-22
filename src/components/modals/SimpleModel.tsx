"use client";
import React, { FC, useState } from "react";
import useClickOutside from "@/@core/customHooks/useClickOutside";
import Shadow from "../tag/Shadow";
import HButton from "../button/HButton";

interface Props {
  open: boolean;
  close: (b: boolean) => void;
  children?: React.ReactNode;
}
const SimpleModal: FC<Props> = ({ open, close, children }) => {
  const [opens, setOpens] = useState(false);
  const toggle = () => {
    close(false);
  };
  const divRef = useClickOutside(toggle);
  const sample = () => (
    <div>
      {" "}
      <p>Comming Soon</p>
      <div className="flex items-center">
        Modals:
        <div onClick={() => setOpens(true)} className="ms-2 cursor-pointer">
          <HButton>Open Modal</HButton>
        </div>
        <SimpleModal open={opens} close={setOpens}></SimpleModal>
      </div>
      <div className="w-full flex justify-end ">
        <HButton className="secondary" onClick={() => close(false)}>
          Close
        </HButton>
      </div>
    </div>
  );
  return (
    <div className="relative ">
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-modal ">
          <div className="absolute  inset-0 bg-background opacity-50"></div>
          <div ref={divRef} className="z-[60]  ">
            <Shadow className="w-[calc(100vw/2)] ">
              {children ? children : sample()}
            </Shadow>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleModal;
