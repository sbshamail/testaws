"use client";

import { useState } from "react";
import { Car, MapPin, Settings, Wrench } from "lucide-react";
import ActionIcon from "./ActionIcon";
import MileageBox from "./MileageBox";

export default function MileageMilestone({
  getMilestoneStyle,
  isDragging,
  selectedCircle,
  setSelectedCircle,
  selectedBox,
  setSelectedBox,
  reduceMotion,
}) {
  const [activePopup, setActivePopup] = useState(null);

  // Data for the boxes with their mileage and counts

  // Define top row of circles
  const customerEngagement = [
    {
      id: 1,
      icon: Car,
      active: true,
      mileage: {
        id: 1,
        count: 450,
        mileage: 5000,
        active: true,
        icon: Car,
        hasCheckmark: true,
      },
    },
    {
      id: 2,
      icon: Car,
      active: true,
      mileage: {
        id: 2,
        count: 150,
        mileage: 10000,
        active: true,
        icon: Car,
        hasCheckmark: true,
      },
    },
    {
      id: 3,
      icon: Car,
      active: true,

      mileage: {
        id: 3,
        count: 8,
        mileage: 15000,
        active: true,
        icon: Car,
        hasCheckmark: true,
      },
    },
    {
      id: 4,
      icon: Settings,
      active: false,
      mileage: {
        id: 4,
        count: 0,
        mileage: 20000,
        active: false,
        icon: null,
        hasCheckmark: false,
      },
    },
    {
      id: 5,
      icon: MapPin,
      active: false,
      mileage: {
        id: 5,
        count: 0,
        mileage: 30000,
        active: false,
        icon: Settings,
        hasCheckmark: false,
      },
    },
    {
      id: 6,
      icon: Wrench,
      active: false,
      mileage: {
        id: 6,
        count: 0,
        mileage: 35000,
        active: false,
        icon: null,
        hasCheckmark: false,
      },
    },
    {
      id: 7,
      icon: Car,
      active: false,
      mileage: {
        id: 7,
        count: 0,
        mileage: 40000,
        active: false,
        icon: MapPin,
        hasCheckmark: false,
      },
    },
    {
      id: 8,
      icon: null,
      active: false,
      mileage: {
        id: 8,
        count: 0,
        mileage: 45000,
        active: false,
        icon: null,
        hasCheckmark: false,
      },
    },
    {
      id: 9,
      icon: null,
      active: false,
      mileage: {
        id: 9,
        count: 0,
        mileage: 50000,
        active: false,
        icon: MapPin,
        hasCheckmark: false,
      },
    },
    {
      id: 10,
      icon: null,
      active: false,
      mileage: {
        id: 10,
        count: 0,
        mileage: 55000,
        active: false,
        icon: null,
        hasCheckmark: false,
      },
    },
    {
      id: 11,
      icon: null,
      active: false,
      mileage: {
        id: 11,
        count: 0,
        mileage: 60000,
        active: false,
        icon: Wrench,
        hasCheckmark: false,
      },
    },
    {
      id: 12,
      icon: null,
      active: false,
      mileage: {
        id: 12,
        count: 0,
        mileage: 65000,
        active: false,
        icon: null,
        hasCheckmark: false,
      },
    },
    {
      id: 13,
      icon: null,
      active: false,
      mileage: {
        id: 13,
        count: 0,
        mileage: 70000,
        active: false,
        icon: Settings,
        hasCheckmark: false,
      },
    },
    {
      id: 14,
      icon: null,
      active: false,
      mileage: {
        id: 14,
        count: 0,
        mileage: 75000,
        active: false,
        icon: null,
        hasCheckmark: false,
      },
    },
    {
      id: 15,
      icon: null,
      active: false,
      mileage: {
        id: 15,
        count: 0,
        mileage: 80000,
        active: false,
        icon: Car,
        hasCheckmark: true,
      },
    },
    {
      id: 16,
      icon: null,
      active: false,
      mileage: {
        id: 16,
        count: 0,
        mileage: 85000,
        active: false,
        icon: null,
        hasCheckmark: false,
      },
    },
    {
      id: 17,
      icon: null,
      active: false,
      mileage: {
        id: 17,
        count: 0,
        mileage: 90000,
        active: false,
        icon: Wrench,
        hasCheckmark: false,
      },
    },
    {
      id: 18,
      icon: null,
      active: false,
      mileage: {
        id: 18,
        count: 0,
        mileage: 100000,
        active: false,
        icon: null,
        hasCheckmark: false,
      },
    },
  ];

  return (
    <div className="relative">
      {/* Scroll container */}

      <div className="relative " style={{ height: "450px" }}>
        {/* The circles in staggered rows */}
        <div
          className="absolute top-10 left-0 right-0"
          style={{ ...getMilestoneStyle(1) }}
        >
          {/* Create the staggered layout with alternating rows */}
          <div className="relative" style={{ height: "200px" }}>
            {/* First 7 circles in alternating rows */}
            {customerEngagement.map((circle, index) => {
              // Calculate positions to achieve the staggered layout
              // Adjustment for box width + 5px gap
              const xPos = index * 75 + 20;
              const yPos = index % 2 ? 0 : 70;

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
                  {circle.icon ? (
                    <ActionIcon
                      isSelected={isSelected}
                      circle={circle}
                      reduceMotion={reduceMotion}
                      selectedCircle={selectedCircle}
                      setSelectedCircle={setSelectedCircle}
                      isDragging={isDragging}
                      setSelectedBox={setSelectedBox}
                      setActivePopup={setActivePopup}
                    />
                  ) : (
                    <div
                      className="rounded-full bg-gray-200"
                      style={{ width: "90px", height: "90px" }}
                    ></div>
                  )}
                  {/* Vertical lines to boxes */}
                  {circle.active && (
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2"
                      style={{
                        top: "90px",
                      }}
                    >
                      {/* Vertical line */}
                      <div
                        className="bg-blue-500 relative"
                        style={{
                          width: "2px",
                          height: index % 2 ? "220px" : "150px",
                        }}
                      >
                        {/* Circle at bottom of the line */}
                        <div
                          className="bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2"
                          style={{
                            width: "10px",
                            height: "10px",
                            bottom: "-5px", // Push circle just below the line
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Boxes row at the bottom with 5px gaps */}
        <MileageBox
          getMilestoneStyle={getMilestoneStyle}
          mileage={customerEngagement.map((item) => item.mileage)}
          selectedBox={selectedBox}
          isDragging={isDragging}
          setSelectedBox={setSelectedBox}
          setSelectedCircle={setSelectedCircle}
          setActivePopup={setActivePopup}
          reduceMotion={reduceMotion}
        />
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

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
