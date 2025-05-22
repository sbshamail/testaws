import Image from "next/image";
import { Bars } from "react-loader-spinner";
const SpinnerLoader = ({ size = "lg", className }) => {
  return (
    <Bars
      height="60"
      width="60"
      radius="9"
      color="#0097cc"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
    // <Image
    //   src={"/gif/loader.gif"}
    //   alt="Loading animation"
    //   className={`w-24 h-24 ${className}`}
    //   width={32}
    //   height={32}
    // />
  );
};

export default SpinnerLoader;
