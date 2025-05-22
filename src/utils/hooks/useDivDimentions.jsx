import { useCallback, useEffect, useRef, useState } from "react";

const useDivDimensions = (events = []) => {
  const [dimension, setDimension] = useState(null);
  const divRef = useRef(null);

  const updateDimensions = useCallback(() => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const offsetWidth = divRef.current.offsetWidth;
      const offsetLeft = divRef.current.offsetLeft;
      setDimension({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        offsetWidth,
        offsetLeft,
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions(); // Trigger dimension update whenever the element size changes
    });

    // Start observing the divRef element
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    // Clean up observer on unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDimensions]);

  useEffect(() => {
    if (events.length > 0) {
      events.forEach((event) => {
        window.addEventListener(event, updateDimensions);
      });

      return () => {
        events.forEach((event) => {
          window.removeEventListener(event, updateDimensions);
        });
      };
    }
  }, [events, updateDimensions]);

  return { dimension, divRef };
};

export default useDivDimensions;
