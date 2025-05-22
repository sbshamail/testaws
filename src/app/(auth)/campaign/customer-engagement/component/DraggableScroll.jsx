"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CustomButton } from "@/components/cui/button/CustomButton";

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const scrollX = useMotionValue(0);
  const springScrollX = useSpring(scrollX, { damping: 30, stiffness: 200 });

  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Update constraints when the component mounts or window resizes
  useEffect(() => {
    const updateConstraints = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const maxScroll = -(container.scrollWidth - container.clientWidth);

      setConstraints({ left: maxScroll, right: 0 });
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  // Function to scroll to a specific position
  const scrollTo = (position) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const maxScroll = -(container.scrollWidth - container.clientWidth);

    // Clamp the scroll position between maxScroll and 0
    const clampedPosition = Math.max(maxScroll, Math.min(position, 0));

    scrollX.set(clampedPosition);
  };

  // Scroll left and right button handlers
  const scrollLeft = () => {
    const currentScroll = scrollX.get();
    const scrollAmount = containerRef.current?.clientWidth || 0 * 0.8;
    scrollTo(currentScroll + scrollAmount);
  };

  const scrollRight = () => {
    const currentScroll = scrollX.get();
    const scrollAmount = containerRef.current?.clientWidth || 0 * 0.8;
    scrollTo(currentScroll - scrollAmount);
  };

  // Items to display in the scroll
  const items = [
    { id: 1, title: "Item 1", color: "bg-rose-500" },
    { id: 2, title: "Item 2", color: "bg-blue-500" },
    { id: 3, title: "Item 3", color: "bg-amber-500" },
    { id: 4, title: "Item 4", color: "bg-emerald-500" },
    { id: 5, title: "Item 5", color: "bg-violet-500" },
    { id: 6, title: "Item 6", color: "bg-pink-500" },
    { id: 7, title: "Item 7", color: "bg-cyan-500" },
    { id: 8, title: "Item 8", color: "bg-orange-500" },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Horizontal Scroll</h2>

      {/* Navigation Buttons */}
      <div className="flex justify-between mb-4">
        <CustomButton
          variant="outline"
          size="icon"
          onClick={scrollLeft}
          className="rounded-full"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </CustomButton>
        <CustomButton
          variant="outline"
          size="icon"
          onClick={scrollRight}
          className="rounded-full"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </CustomButton>
      </div>

      {/* Scroll Container */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          className="flex space-x-4 pb-4 pt-2"
          style={{ x: springScrollX }}
          drag="x"
          dragConstraints={constraints}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, { offset, velocity }) => {
            setIsDragging(false);

            const currentScroll = scrollX.get();
            const swipeThreshold = 500;
            const swipePower = offset.x * velocity.x;

            if (Math.abs(swipePower) > swipeThreshold) {
              // Fast swipe - move in the direction of the swipe
              const moveDirection = swipePower > 0 ? 1 : -1;
              const moveAmount =
                (containerRef.current?.clientWidth || 0) * 0.8 * moveDirection;
              scrollTo(currentScroll + moveAmount);
            } else {
              // Slow drag - just move by the offset amount
              scrollTo(currentScroll + offset.x);
            }
          }}
          dragElastic={0}
          dragTransition={{ power: 0.1, timeConstant: 200 }}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`flex-shrink-0 w-80 h-64 rounded-lg ${item.color} flex items-center justify-center`}
              whileHover={{ scale: isDragging ? 1 : 1.03 }}
              whileTap={{ scale: isDragging ? 1 : 0.97 }}
            >
              <h3 className="text-white text-xl font-bold">{item.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gray-500 rounded-full"
          style={{
            scaleX:
              constraints.left === 0 ? 0 : scrollX.get() / constraints.left,
            transformOrigin: "left",
          }}
        />
      </div> */}
    </div>
  );
}
