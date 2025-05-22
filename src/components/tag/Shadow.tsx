import React from "react";

interface Props {
  props?: React.ComponentPropsWithoutRef<"div">;
  className?: React.ComponentProps<"div">["className"];
  children: React.ReactNode;
  space?: "0" | "1" | "2";
}
const Shadow = ({ children, className, space, ...props }: Props) => {
  let spacing = "p-3";
  if (space === "0") {
    spacing = "!p-0 !py-0 !m-0";
  } else if (space === "1") {
    spacing = "p-4 py-10";
  } else if (space === "2") {
    spacing = "p-6 py-12";
  }
  return (
    <div
      className={`bg-background bg-gradient-to-r from-background via-effect via-50% to-background shadow shadow-ring ${spacing}  ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Shadow;
