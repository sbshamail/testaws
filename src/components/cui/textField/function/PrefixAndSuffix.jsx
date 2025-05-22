import React, { FC, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const PrefixAndSuffix = ({
  prefix,
  suffix,
  prefixClassName,
  suffixClassName,
  textarea,
  setPrefixWidth,
  setSuffixWidth,
  prefixDimension,
  suffixDimension,
}) => {
  useEffect(() => {
    const prefixW = prefix
      ? (Number(prefixDimension.dimension?.width) + 2).toString()
      : "";
    setPrefixWidth(prefixW);
  }, [prefix, prefixDimension.dimension?.width, setPrefixWidth]);
  useEffect(() => {
    const suffixW = suffix
      ? (Number(suffixDimension.dimension?.width) + 2).toString()
      : "";
    setSuffixWidth(suffixW);
  }, [setSuffixWidth, suffix, suffixDimension.dimension?.width]);

  // prefix or suffix wrapper
  const prefixSuffixClass = (className) =>
    twMerge(
      `h-full overflow-hidden absolute group-focus-within:border-primary ${
        textarea
          ? `top-0 `
          : "top-1/2 transform -translate-y-1/2 flex items-center "
      } `,
      `
                   ${className} `
    );
  return (
    <>
      {/* prefix and suffix wrapper*/}
      {prefix && (
        <div className={prefixSuffixClass()}>
          <span
            ref={prefixDimension.divRef}
            className={twMerge(
              `${typeof prefix !== "function" && "ps-1"} `,
              ` ${prefixClassName}`
            )}
          >
            {" "}
            {typeof prefix === "function" ? prefix() : prefix}
          </span>
        </div>
      )}
      {suffix && (
        <div className={prefixSuffixClass("right-0")}>
          <span
            ref={suffixDimension.divRef}
            className={twMerge(
              `h-full ${typeof suffix !== "function" && "pr-1"}`,
              ` ${suffixClassName}`
            )}
          >
            {typeof suffix === "function" ? suffix() : suffix}
          </span>
        </div>
      )}
    </>
  );
};

export default PrefixAndSuffix;
