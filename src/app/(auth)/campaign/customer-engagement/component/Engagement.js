import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Star,
  Settings,
  DollarSign,
  Clipboard,
  Car,
  Wrench,
} from "lucide-react";

const Engagement = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
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

  // Data for the boxes with their mileage and counts
  const mileageBoxes = [
    {
      id: 1,
      count: 450,
      mileage: 5000,
      active: true,
      icon: Car,
      hasCheckmark: true,
    },
    {
      id: 2,
      count: 150,
      mileage: 10000,
      active: true,
      icon: Car,
      hasCheckmark: true,
    },
    {
      id: 3,
      count: 8,
      mileage: 15000,
      active: true,
      icon: Car,
      hasCheckmark: true,
    },
    {
      id: 4,
      count: 0,
      mileage: 20000,
      active: false,
      icon: null,
      hasCheckmark: false,
    },
    {
      id: 5,
      count: 0,
      mileage: 30000,
      active: false,
      icon: Settings,
      hasCheckmark: false,
    },
    {
      id: 6,
      count: 0,
      mileage: 35000,
      active: false,
      icon: null,
      hasCheckmark: false,
    },
    {
      id: 7,
      count: 0,
      mileage: 40000,
      active: false,
      icon: MapPin,
      hasCheckmark: false,
    },
    {
      id: 8,
      count: 0,
      mileage: 45000,
      active: false,
      icon: null,
      hasCheckmark: false,
    },
    {
      id: 9,
      count: 0,
      mileage: 50000,
      active: false,
      icon: MapPin,
      hasCheckmark: false,
    },
    {
      id: 10,
      count: 0,
      mileage: 55000,
      active: false,
      icon: null,
      hasCheckmark: false,
    },
    {
      id: 11,
      count: 0,
      mileage: 60000,
      active: false,
      icon: Wrench,
      hasCheckmark: false,
    },
    {
      id: 12,
      count: 0,
      mileage: 65000,
      active: false,
      icon: null,
      hasCheckmark: false,
    },
    {
      id: 13,
      count: 0,
      mileage: 70000,
      active: false,
      icon: Settings,
      hasCheckmark: false,
    },
    {
      id: 14,
      count: 0,
      mileage: 75000,
      active: false,
      icon: null,
      hasCheckmark: false,
    },
    {
      id: 15,
      count: 0,
      mileage: 80000,
      active: false,
      icon: Car,
      hasCheckmark: true,
    },
    {
      id: 16,
      count: 0,
      mileage: 85000,
      active: false,
      icon: null,
      hasCheckmark: false,
    },
    {
      id: 17,
      count: 0,
      mileage: 90000,
      active: false,
      icon: Wrench,
      hasCheckmark: false,
    },
    {
      id: 18,
      count: 0,
      mileage: 100000,
      active: false,
      icon: null,
      hasCheckmark: false,
    },
  ];

  // Define top row of circles
  const topCircles = [
    { id: 1, icon: Car, hasCheckmark: true, active: true, position: 1 },
    { id: 2, icon: null, hasCheckmark: false, active: false, position: 2 },
    { id: 3, icon: Settings, hasCheckmark: false, active: true, position: 3 },
    { id: 4, icon: null, hasCheckmark: false, active: false, position: 4 },
    { id: 5, icon: MapPin, hasCheckmark: false, active: true, position: 5 },
    { id: 6, icon: Wrench, hasCheckmark: false, active: true, position: 6 },
    { id: 7, icon: Car, hasCheckmark: true, active: true, position: 7 },
    { id: 8, icon: null, hasCheckmark: false, active: false, position: 8 },
  ];

  // Define middle row of circles - alternating heights
  const middleCircles = [
    {
      id: 9,
      icon: Car,
      hasCheckmark: true,
      active: true,
      isElevated: false,
      position: 1,
    },
    {
      id: 10,
      icon: DollarSign,
      hasCheckmark: false,
      active: true,
      isElevated: true,
      position: 2,
    },
    {
      id: 11,
      icon: MapPin,
      hasCheckmark: false,
      active: true,
      isElevated: false,
      position: 3,
    },
    {
      id: 12,
      icon: null,
      hasCheckmark: false,
      active: false,
      isElevated: true,
      position: 4,
    },
    {
      id: 13,
      icon: Settings,
      hasCheckmark: false,
      active: true,
      isElevated: false,
      position: 5,
    },
    {
      id: 14,
      icon: Clipboard,
      hasCheckmark: false,
      active: true,
      isElevated: true,
      position: 6,
    },
    {
      id: 15,
      icon: Wrench,
      hasCheckmark: false,
      active: true,
      isElevated: false,
      position: 7,
    },
    {
      id: 16,
      icon: null,
      hasCheckmark: false,
      active: false,
      isElevated: true,
      position: 8,
    },
  ];

  const timelineMarkers = [20, 80];

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleMilestoneClick = (id) => {
    setActivePopup(activePopup === id ? null : id);
  };

  // New handlers for circle and box selection
  const handleCircleClick = (id, event) => {
    // Don't trigger if we're in the middle of a drag
    if (isDragging) return;

    event.stopPropagation(); // Prevent click from bubbling
    setSelectedCircle(selectedCircle === id ? null : id);
    // Close other opened elements
    setSelectedBox(null);
    setActivePopup(null);
  };

  const handleBoxClick = (id, event) => {
    // Don't trigger if we're in the middle of a drag
    if (isDragging) return;

    event.stopPropagation(); // Prevent click from bubbling
    setSelectedBox(selectedBox === id ? null : id);
    // Close other opened elements
    setSelectedCircle(null);
    setActivePopup(null);
  };

  // Handle background click to close any opened popups/selections
  const handleBackgroundClick = () => {
    if (!isDragging) {
      setSelectedCircle(null);
      setSelectedBox(null);
      setActivePopup(null);
    }
  };

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
    <div
      className="w-full flex flex-col  mx-auto   font-sans relative"
      onClick={handleBackgroundClick}
    >
      {/* Overlay when circle or box is selected */}
      {(selectedCircle || selectedBox) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-10" />
      )}

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
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto pb-8 relative z-20"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Content container with minimum width to ensure scroll */}
        <div style={{ minWidth: "1400px", position: "relative" }}>
          {/* Main layout for circles and boxes */}
          <div className="relative mb-12" style={{ height: "450px" }}>
            {/* The circles in staggered rows */}
            <div
              className="absolute top-10 left-0 right-0"
              style={{ ...getMilestoneStyle(1) }}
            >
              {/* Create the staggered layout with alternating rows */}
              <div className="relative" style={{ height: "200px" }}>
                {/* First 7 circles in alternating rows */}
                {[
                  { id: 1, row: 2, col: 1, icon: Car, active: true, boxId: 1 },
                  { id: 2, row: 1, col: 2, icon: Car, active: true, boxId: 2 },
                  { id: 3, row: 2, col: 3, icon: Car, active: true, boxId: 3 },
                  {
                    id: 4,
                    row: 1,
                    col: 4,
                    icon: Settings,
                    active: true,
                    boxId: 4,
                  },
                  {
                    id: 5,
                    row: 2,
                    col: 5,
                    icon: MapPin,
                    active: true,
                    boxId: 5,
                  },
                  {
                    id: 6,
                    row: 1,
                    col: 6,
                    icon: Wrench,
                    active: true,
                    boxId: 6,
                  },
                  { id: 7, row: 2, col: 7, icon: Car, active: true, boxId: 7 },
                ].map((circle, index) => {
                  // Calculate positions to achieve the staggered layout
                  // Adjustment for box width + 5px gap
                  const xPos = (circle.boxId - 1) * 75 + 35;
                  const yPos = circle.row === 1 ? 0 : 70;
                  const showLine = index <= 2; // Only first 3 circles have lines
                  const isSelected = selectedCircle === circle.id;

                  return (
                    <div
                      key={circle.id}
                      className="absolute"
                      style={{
                        left: `${xPos}px`,
                        top: `${yPos}px`,
                        zIndex: isSelected ? 30 : 20,
                      }}
                    >
                      <div
                        className={`rounded-full border-2 border-blue-500 bg-gray-100 flex items-center justify-center ${
                          isSelected ? "ring-4 ring-blue-300" : ""
                        }`}
                        style={{
                          width: "90px",
                          height: "90px",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          transform: isSelected ? "scale(1.1)" : "scale(1)",
                          boxShadow: isSelected
                            ? "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                            : "none",
                          cursor: "pointer",
                        }}
                        onClick={(e) => handleCircleClick(circle.id, e)}
                        onMouseEnter={(e) => {
                          if (!reduceMotion && !selectedCircle) {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 15px -5px rgba(59, 130, 246, 0.3)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!reduceMotion && !selectedCircle) {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                          }
                        }}
                      >
                        <circle.icon size={32} className="text-blue-500" />

                        {/* Template buttons shown when selected */}
                        {isSelected && (
                          <div
                            className="absolute flex flex-col gap-2"
                            style={{
                              right: "-150px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              zIndex: 40,
                            }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking buttons
                          >
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-200 whitespace-nowrap">
                              Change Template
                            </button>
                            <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-4 rounded-lg border border-blue-300 shadow-md transition-colors duration-200 whitespace-nowrap">
                              Edit Template
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Vertical lines to boxes */}
                      {showLine && (
                        <div
                          className="absolute bg-blue-500"
                          style={{
                            width: "2px",
                            height: circle.row === 1 ? "260px" : "190px",
                            top: "90px",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        ></div>
                      )}
                    </div>
                  );
                })}

                {/* Remaining circles - gray inactive ones */}
                {[
                  { id: 8, row: 1, col: 8, active: false, boxId: 8 },
                  { id: 9, row: 2, col: 9, active: false, boxId: 9 },
                  { id: 10, row: 1, col: 10, active: false, boxId: 10 },
                  { id: 11, row: 2, col: 11, active: false, boxId: 11 },
                  { id: 12, row: 1, col: 12, active: false, boxId: 12 },
                  { id: 13, row: 2, col: 13, active: false, boxId: 13 },
                  { id: 14, row: 1, col: 14, active: false, boxId: 14 },
                ].map((circle) => {
                  const xPos = (circle.boxId - 1) * 75 + 35;
                  const yPos = circle.row === 1 ? 0 : 70;

                  return (
                    <div
                      key={circle.id}
                      className="absolute"
                      style={{
                        left: `${xPos}px`,
                        top: `${yPos}px`,
                      }}
                    >
                      <div
                        className="rounded-full bg-gray-200"
                        style={{ width: "90px", height: "90px" }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Boxes row at the bottom with 5px gaps */}
            <div
              className="absolute bottom-0 left-0"
              style={{ ...getMilestoneStyle(3) }}
            >
              <div className="flex">
                {mileageBoxes.map((box, index) => {
                  const isBoxSelected = selectedBox === box.id;

                  return (
                    <div
                      key={box.id}
                      className="flex flex-col items-center relative"
                      style={{
                        marginRight: "5px",
                        zIndex: isBoxSelected ? 30 : 20,
                      }}
                    >
                      <div
                        className={`${
                          box.active
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        } font-bold flex items-center justify-center text-2xl ${
                          isBoxSelected ? "ring-4 ring-blue-300" : ""
                        }`}
                        style={{
                          width: "70px",
                          height: "56px",
                          borderRadius: "4px",
                          marginTop: "20px", // Added padding to move boxes down
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          transform: isBoxSelected ? "scale(1.1)" : "scale(1)",
                          boxShadow: isBoxSelected
                            ? "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                            : "none",
                          cursor: box.active ? "pointer" : "default",
                        }}
                        onClick={(e) => box.active && handleBoxClick(box.id, e)}
                        onMouseEnter={(e) => {
                          if (!reduceMotion && box.active && !selectedBox) {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 15px -5px rgba(59, 130, 246, 0.3)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!reduceMotion && box.active && !selectedBox) {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "none";
                          }
                        }}
                      >
                        {box.count}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-2">
                        {formatNumber(box.mileage)} ▼
                      </div>

                      {/* Popup for active boxes when selected */}
                      {isBoxSelected && box.active && (
                        <div
                          className="absolute bg-white rounded-lg shadow-lg p-4 w-64 z-40"
                          style={{
                            bottom: "120%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            animation: "fadeIn 0.3s ease-out",
                          }}
                          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking popup
                        >
                          <div className="text-lg font-medium text-gray-700 mb-2">
                            {box.mileage === 5000
                              ? "0 - 5,000"
                              : box.mileage === 10000
                              ? "5,000 - 10,000"
                              : box.mileage === 15000
                              ? "10,000 - 15,000"
                              : `${formatNumber(
                                  box.mileage - 5000
                                )} - ${formatNumber(box.mileage)}`}{" "}
                            Miles
                          </div>
                          <div className="flex items-center mb-2">
                            <Car size={18} className="text-blue-500 mr-2" />
                            <span className="text-gray-600">
                              Total Cars...............
                            </span>
                            <span className="ml-auto font-medium">1,256</span>
                          </div>
                          <div className="flex items-center mb-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-500 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-gray-600">
                              Total Emails Sent..
                            </span>
                            <span className="ml-auto font-medium">608</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Emails are sent to all customers who have reached
                            the set milestone of 100 miles less than{" "}
                            {formatNumber(box.mileage)} miles.
                          </div>

                          {/* Template buttons for boxes */}
                          <div className="flex justify-end gap-2 mt-3">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-lg text-sm shadow-sm transition-colors duration-200">
                              Change Template
                            </button>
                            <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-1 px-3 rounded-lg border border-blue-300 text-sm shadow-sm transition-colors duration-200">
                              Edit Template
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Timeline with markers that don't overlap the line */}
          <div className="relative h-10 mb-5" style={getMilestoneStyle(4)}>
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-blue-500"></div>

            {[20, 80].map((position, index) => (
              <div
                key={index}
                className="absolute"
                style={{ left: `${position}%`, top: "0px" }}
              >
                <MapPin size={20} className="text-blue-500" />
              </div>
            ))}
          </div>

          {/* Timeline month numbers - showing all months from 1-60 */}
          <div className="relative mb-8" style={{ ...getMilestoneStyle(5) }}>
            <div className="flex justify-between">
              {Array.from({ length: 61 }).map((_, index) => (
                <div
                  key={index}
                  className={`text-xs ${
                    index === 2
                      ? "text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center"
                      : "text-gray-400"
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
      </div>

      {/* Popup content - original code, maintaining for compatibility */}
      {activePopup === 2 && (
        <div
          className="absolute bg-white rounded-lg shadow-lg p-4 w-64 z-30"
          style={{ top: "220px", left: "130px" }}
        >
          <div className="text-lg font-medium text-gray-700 mb-2">
            10,000 - 15,000 Miles
          </div>
          <div className="flex items-center mb-2">
            <Car size={18} className="text-blue-500 mr-2" />
            <span className="text-gray-600">Total Cars...............</span>
            <span className="ml-auto font-medium">1,256</span>
          </div>
          <div className="flex items-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-600">Total Emails Sent..</span>
            <span className="ml-auto font-medium">608</span>
          </div>
          <div className="text-xs text-gray-500">
            Emails are sent to all customers who have reached the set milestone
            of 100 miles less than 5,000 miles.
          </div>
        </div>
      )}

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
      <div
        className="mt-8 text-sm text-gray-500 relative z-20"
        style={getMilestoneStyle(8)}
      >
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={reduceMotion}
            onChange={() => setReduceMotion(!reduceMotion)}
            className="mr-2"
          />
          Skip animations (for accessibility)
        </label>
      </div>

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

export default Engagement;
