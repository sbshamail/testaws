import React from "react";
import { Car, MailOpen } from "lucide-react";
import { createPortal } from "react-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
const MileageBox = ({
  getMilestoneStyle,
  mileage,
  selectedBox,
  isDragging,
  setSelectedBox,
  setSelectedCircle,
  setActivePopup,
}) => {
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  return (
    <div
      className="absolute bottom-0 left-0"
      style={{ ...getMilestoneStyle(3) }}
    >
      {selectedBox &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setSelectedBox(null)}
          />,
          document.body
        )}
      <div className="flex">
        {mileage &&
          mileage.map((box) => {
            const isBoxSelected = selectedBox === box.id;

            return (
              <Popover
                key={box.id}
                open={isBoxSelected && box.active}
                onOpenChange={(open) =>
                  handleBoxClick(open ? box.id : null, {
                    stopPropagation: () => {},
                  })
                }
              >
                <PopoverTrigger asChild>
                  <div
                    className="flex flex-col items-center relative"
                    style={{
                      marginRight: "5px",
                      zIndex: isBoxSelected ? 30 : 20,
                      cursor: box.active ? "pointer" : "default",
                    }}
                    onClick={(e) => box.active && handleBoxClick(box.id, e)}
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
                        marginTop: "20px",
                        transform: isBoxSelected ? "scale(1.1)" : "scale(1)",
                        boxShadow: isBoxSelected
                          ? "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                          : "none",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      }}
                    >
                      {box.count}
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-2">
                      {formatNumber(box.mileage)} ▼
                    </div>
                  </div>
                </PopoverTrigger>

                <PopoverContent
                  className="max-w-[340px] flex flex-col items-center justify-center z-50 bg-card text-card-foreground rounded-lg shadow-lg p-4"
                  side="top"
                  align="center"
                >
                  <div className="flex items-center gap-2 mb-2 ">
                    <div className="text-2xl font-semibold tracking-widest ">
                      {box.mileage === 5000
                        ? "0 - 5,000"
                        : box.mileage === 10000
                        ? "5,000 - 10,000"
                        : `${formatNumber(box.mileage - 5000)} - ${formatNumber(
                            box.mileage
                          )}`}{" "}
                    </div>
                    <span className="text-2xl">Miles</span>
                  </div>
                  <div>
                    <div className="flex items-center mb-2 gap-2">
                      <Car size={18} className="text-blue-500 " />
                      <span className="text-card-foreground/90">
                        Total Cars
                      </span>
                      <span className="text-card-foreground/90">1,256</span>
                    </div>
                    <div className="flex items-center mb-2 gap-2">
                      <MailOpen size={18} className="text-blue-500 " />
                      <span className="text-card-foreground/90">
                        Total Emails Sent
                      </span>
                      <span className="text-card-foreground/90">608</span>
                    </div>
                  </div>
                  <div className="text-xs text-card-foreground/80">
                    Emails are sent to all customers who have reached the set
                    milestone of !00 miles less than {formatNumber(box.mileage)}{" "}
                    miles.
                  </div>

                  <div className="flex justify-end gap-2 mt-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-lg text-sm shadow-sm transition-colors duration-200">
                      Change Template
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-1 px-3 rounded-lg border border-blue-300 text-sm shadow-sm transition-colors duration-200">
                      Edit Template
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
      </div>
    </div>
  );
};

export default MileageBox;
