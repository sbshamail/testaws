"use client";
import React, { FC, useEffect, useRef, useState } from "react";

// xs: "480px", // Extra small devices (phones)
// sm: "640px", // Small devices (landscape phones)
// md: "976px",
// lg: "1200px",
// xl: "1536px",
interface Props {
  children: React.ReactNode;
  props?: React.ComponentPropsWithoutRef<"div">;
  className?: React.ComponentProps<"div">["className"];
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

const ResizeDiv: FC<Props> = ({
  children,
  className,
  xs = "grid-cols-1",
  sm = "grid-cols-2",
  md = "grid-cols-3",
  lg = "grid-cols-4",
  xl,
  ...props
}) => {
  const [gridClass, setGridClass] = useState("grid-cols-1");

  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = (entries: any) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;

        if (width >= 1536) {
          setGridClass(xl ? xl : lg);
        } else if (width >= 1200) {
          setGridClass(lg);
        } else if (width >= 976) {
          setGridClass(md);
        } else if (width >= 640) {
          setGridClass(sm);
        } else if (width >= 480) {
          setGridClass(xs);
        } else {
          setGridClass("grid-cols-1");
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [lg, md, sm, xl, xs]);

  return (
    <div
      ref={boxRef}
      {...props}
      className={`max-w-full grid ${gridClass} gap-4 ${className} `}
    >
      {children}
    </div>
  );
};

export default ResizeDiv;
