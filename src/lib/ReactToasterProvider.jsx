import React from "react";
import { Toaster } from "react-hot-toast";

const ReactToasterProvider = ({ children }) => {
  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            color: "white",
          },
          success: {
            style: {
              background: "white !important",
              color: "black !important",
            },
          },
          error: {
            style: {
              background: "white !important",
              color: "black !important",
            },
          },
        }}
      />
      {children}
    </div>
  );
};

export default ReactToasterProvider;
