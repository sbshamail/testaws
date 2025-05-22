import React from "react";
import { twMerge } from "tailwind-merge";
import ReactDOM from "react-dom";
import useClickOutside from "@/utils/hooks/useClickOutside";
const SimpleModal = ({
  open,
  close,
  closeOutside,
  children,
  className,
  headerClass,
  title,
}) => {
  const divRef = useClickOutside(close);
  if (!open || typeof window === "undefined") return null;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed   inset-0 flex  items-center justify-center   z-modal ">
      <div className="absolute inset-0 shadow-lg shadow-border bg-gray-800 text-card-foreground opacity-70 "></div>
      <div
        ref={closeOutside ? divRef : null}
        className={twMerge(
          ` z-[99]  animate-modalIn  
          max-h-[calc(100vh-200px)] overflow-auto bg-card  shadow-border shadow m-auto w-10/12 mt-10 rounded-lg `,
          `${className}`
        )}
      >
        {/* Sticky Header */}
        {title && (
          <div
            className={`sticky top-0 left-0 right-0 bg-card p-4 flex justify-between items-center border-b z-[121] ${headerClass}`}
          >
            <h2 className="text-lg font-semibold">{title}</h2>
            <div
              className="font-bold w-6 h-6 p-3 flex items-center justify-center border rounded-full hover:text-red-500 hover:border-red-500 Transition cursor-pointer "
              onClick={() => close(false)}
            >
              X
            </div>
          </div>
        )}
        {/* {children ? children : sample()} */}
        <div className=" overflow-auto p-4">
          {children ? children : <p>Coming Soon</p>}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default SimpleModal;
