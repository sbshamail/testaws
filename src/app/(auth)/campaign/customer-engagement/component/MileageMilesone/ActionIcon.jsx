import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { createPortal } from "react-dom";

const ActionIcon = ({
  isSelected,
  circle,
  reduceMotion,
  selectedCircle,
  setSelectedCircle,
  isDragging,
  setSelectedBox,
  setActivePopup,
}) => {
  const deselectCircle = () => setSelectedCircle(null);
  const handleCircleClick = (id, event) => {
    // Don't trigger if we're in the middle of a drag
    if (isDragging) return;

    event.stopPropagation(); // Prevent click from bubbling
    setSelectedCircle(selectedCircle === id ? null : id);
    // Close other opened elements
    setSelectedBox(null);
    setActivePopup(null);
  };
  return (
    <>
      {selectedCircle &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/10 z-40"
            onClick={() => setSelectedCircle(null)}
          />,
          document.body
        )}

      <Popover
        open={isSelected}
        onOpenChange={(open) => {
          if (!open) deselectCircle(); // <-- handle outside click
        }}
      >
        <PopoverTrigger asChild>
          <div
            className={`relative rounded-full border-2 border-blue-500 bg-gray-100 flex items-center justify-center ${
              isSelected ? "ring-4 ring-blue-300" : ""
            }`}
            style={{
              width: "90px",
              height: "90px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
            {isSelected && (
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-blue-300" />
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          side="right"
          sideOffset={12}
          align="center"
          className="flex flex-col gap-2 z-40 bg-card"
        >
          {/* Optional arrow element */}
          <div className="absolute  border-l border-t border-blue-300 z-[-1]" />

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-200 whitespace-nowrap">
            Change Template
          </button>
          <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-4 rounded-lg border border-blue-300 shadow-md transition-colors duration-200 whitespace-nowrap">
            Edit Template
          </button>
          <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-4 rounded-lg border border-blue-300 shadow-md transition-colors duration-200 whitespace-nowrap">
            Change Icon
          </button>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ActionIcon;
