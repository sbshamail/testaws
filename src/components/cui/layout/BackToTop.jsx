"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

const BackToTop = () => {
  const [height, setHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [clientWindow, setClientWindow] = useState();
  console.log(height);
  const handleEvent = useCallback(() => {
    setHeight(window.innerHeight);
    setScrollY(window.scrollY);
    setClientWindow(window);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleEvent);
    handleEvent();
    return () => {
      window.removeEventListener("scroll", handleEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showArrowTop = scrollY > height ? true : false;
  const handleClick = () => {
    clientWindow?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        showArrowTop
          ? "fixed text-white bottom-0 right-0 bg-siteBlue hover:siteBlueHover z-50 rounded-full h-6 w-6 mb-10 me-1"
          : "hidden"
      }`}
    >
      <span>
        <Image
          src={"/images/arrowhead-up.png"}
          height={50}
          width={50}
          alt="top"
        />
      </span>
    </button>
  );
};

export default BackToTop;
