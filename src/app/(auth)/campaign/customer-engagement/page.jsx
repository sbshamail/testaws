"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  MapPin,
  Star,
  Settings,
  DollarSign,
  Clipboard,
  Car,
  Wrench,
} from "lucide-react";
import MileageMilestone from "./component/MileageMilesone/MileageMilestone";
import HorizontalScroll from "./component/DraggableScroll";
import Engagement from "./component/Engagement";

import IsSidebarOpen from "@/components/cui/layout/IsSidebarOpen";

const Page = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const scrollContainerRef = useRef(null);
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduceMotion(prefersReducedMotion);

    // Set animation complete after delay to simulate staggered animations
    const timer = setTimeout(
      () => {
        setAnimationComplete(true);
      },
      reduceMotion ? 0 : 1500
    );

    return () => clearTimeout(timer);
  }, [reduceMotion]);

  // Drag to scroll handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only handle left mouse button

    // Don't initiate drag if clicking on interactive elements
    if (
      e.target.closest("button") ||
      e.target.closest(".rounded-full") ||
      selectedCircle !== null ||
      selectedBox !== null
    ) {
      return;
    }

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);

    // Change cursor style
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Prevent default behavior (like text selection) during drag
    e.preventDefault();

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "default";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      document.body.style.cursor = "default";
    }
  };

  const getMilestoneStyle = (index) => {
    if (reduceMotion) return {};

    const baseDelay = 0.1; // Base delay in seconds
    const staggerDelay = 0.1; // Stagger delay between elements
    const totalDelay = baseDelay + index * staggerDelay;

    return {
      opacity: animationComplete ? 1 : 0,
      transform: animationComplete ? "translateX(0)" : "translateX(-20px)",
      transition: `opacity 0.6s ease-out ${totalDelay}s, transform 0.6s ease-out ${totalDelay}s`,
    };
  };

  return (
    <div className="flex flex-col w-full mx-auto p-6  font-sans">
      {/* <Engagement /> */}
      <div className="mb-8" style={getMilestoneStyle(0)}>
        <h1 className="text-3xl font-semibold text-muted-foreground mb-2">
          Customer Engagement Flow
        </h1>
        <div className="flex justify-between">
          <h2 className="text-xl text-primary">Tameron Gulf Coast</h2>
          <h2 className="text-xl text-primary">
            Procarma - Lifecycle Engagement Flow
          </h2>
        </div>
      </div>

      {/* Main outer container - ensures everything scrolls */}
      <div className="w-full  pb-8">
        {/* Content container with minimum width to ensure scroll */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-8 relative z-20 scroll-container"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <IsSidebarOpen className={`relative flex flex-col gap-6 `}>
            {/* Main layout for circles and boxes */}
            <div className=" relative ">
              <MileageMilestone
                getMilestoneStyle={getMilestoneStyle}
                isDragging={isDragging}
                selectedCircle={selectedCircle}
                setSelectedCircle={setSelectedCircle}
                selectedBox={selectedBox}
                setSelectedBox={setSelectedBox}
                reduceMotion={reduceMotion}
              />
            </div>
            {/* Timeline with markers that don't overlap the line */}
            <div className="mt-3">
              <div className="relative h-10 " style={getMilestoneStyle(4)}>
                <div className=" absolute top-4 left-0 right-0 h-0.5 bg-blue-500"></div>
                <span className="-mt-3 text-muted-foreground absolute">
                  Miles
                </span>
                {[20, 40, 60, 80].map((position, index) => (
                  <div
                    key={index}
                    className="absolute -mt-2"
                    style={{ left: `${position}%`, top: "0px" }}
                  >
                    <MapPin size={20} className="text-blue-500" />
                  </div>
                ))}
              </div>

              {/* Timeline month numbers - showing all months from 1-60 */}
              <div
                className="relative mb-5 "
                style={{ ...getMilestoneStyle(5) }}
              >
                <div className="flex justify-between gap-2 ">
                  {Array.from({ length: 61 }).map((_, index) => (
                    <div
                      key={index}
                      className={`text-xs text-gray-400  ${
                        index === 2
                          ? "bg-primary text-white p-[6px] h-4 w-4 flex items-center justify-center rounded"
                          : ""
                      }`}
                    >
                      {index}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stars under specific month markers */}
              <div className="relative mb-12" style={getMilestoneStyle(6)}>
                {[8, 18, 40, 55].map((position, index) => (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2"
                    style={{
                      left: `${(position / 60) * 100}%`,
                      top: "0px",
                    }}
                  >
                    <Star size={20} className="text-blue-500" />
                  </div>
                ))}
              </div>
            </div>
          </IsSidebarOpen>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex justify-between items-center mt-4 relative z-20"
        style={getMilestoneStyle(7)}
      >
        <div className="text-gray-700 text-lg">
          <div className="font-medium">Tameron Gulf Coast</div>
          <div className="text-sm text-gray-500">Customer engagement Flow</div>
        </div>

        <div className="text-3xl font-light text-gray-600">5 year Timeline</div>

        <div className="text-gray-700 text-lg text-right">
          <div className="font-medium">
            Procarma - Lifecycle Engagement Flow
          </div>
        </div>
      </div>

      {/* Accessibility controls */}
      {/* <div className="mt-8 text-sm text-gray-500" style={getMilestoneStyle(8)}>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={reduceMotion}
            onChange={() => setReduceMotion(!reduceMotion)}
            className="mr-2"
          />
          Skip animations (for accessibility)
        </label>
      </div> */}
      {/* CSS for fade-in animation and drag cursor */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }

        /* Add a visual indicator that the content is draggable */
        .grabbable {
          cursor: grab;
        }

        .grabbable:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default Page;
