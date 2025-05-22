import { Skeleton } from "@nextui-org/react";
import React from "react";

const BarSkeleton = ({ loading, children, className, skeletonClass }) => {
  return (
    <div className="relative">
      {loading && (
        <div
          className={`${
            className
              ? className
              : "absolute z-50 w-full left-1/2 top-1/2 -translate-x-1/2"
          } `}
        >
          <Skeleton className={`h-6 rounded-lg ${skeletonClass}`} />
        </div>
      )}
      <div className={`${loading ? "opacity-40" : ""}`}>{children}</div>
    </div>
  );
};

export default BarSkeleton;
