import React from "react";

const PageContainer = ({ children }) => {
  return (
    <div className="w-full  flex flex-col items-center p-3 pb-4 bg-background text-foreground ">
      {children}
    </div>
  );
};

export default PageContainer;
