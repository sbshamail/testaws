import React from "react";

const ShadowCard = ({ className, children }) => {
  return (
    <div
      className={`w-full p-6 px-12 bg-white rounded-lg shadow-md flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default ShadowCard;
