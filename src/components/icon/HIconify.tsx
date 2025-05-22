import React, { FC } from "react";
import { Icon, IconProps } from "@iconify/react";

interface props extends IconProps {
  icon: string;
  className?: React.ComponentProps<"div">["className"];
}

const HIconify: FC<props> = ({ icon, className, ...rest }) => {
  return (
    <Icon icon={icon} {...rest} className={`cursor-pointer ${className}`} />
  );
};

export default HIconify;
