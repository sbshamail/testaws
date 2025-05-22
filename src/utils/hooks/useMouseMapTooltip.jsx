import React, { useEffect, useRef } from "react";

const useMouseMapTooltip = () => {
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Function to update mouse position efficiently
  const handleMouseMove = (e) => {
    if (!tooltipRef.current) return;
    const containerRect = mapContainerRef.current.getBoundingClientRect();
    mousePositionRef.current = {
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
    };
    // Directly update tooltip position without triggering re-renders
    tooltipRef.current.style.left = `${mousePositionRef.current.x + 10}px`;
    tooltipRef.current.style.top = `${mousePositionRef.current.y + 10}px`;
  };

  //only for tooltip
  useEffect(() => {
    const mapElement = mapContainerRef.current;
    if (mapElement) {
      mapElement.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (mapElement) {
        mapElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [tooltipRef?.current?.textContent]);

  const handleOnMouseHover = (title) => {
    tooltipRef.current.style.display = "block";
    tooltipRef.current.textContent = title;
  };
  const handleOnMouseOut = () => {
    tooltipRef.current.style.display = "none";
  };
  const ShowTooltip = () => (
    <div
      ref={tooltipRef}
      className="absolute bg-card text-card-foreground text-sm p-2 shadow-md rounded pointer-events-none transition-opacity duration-200"
      style={{ display: "none", left: "0px", top: "0px" }}
    />
  );
  return {
    mapContainerRef,
    handleOnMouseHover,
    handleOnMouseOut,
    ShowTooltip,
  };
};

export default useMouseMapTooltip;
