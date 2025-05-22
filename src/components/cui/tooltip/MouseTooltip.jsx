import React, { useState } from "react";

const MouseTooltip = ({ content, children, className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {content && visible && (
        <div
          className={`fixed bg-card-foreground  text-card text-xs rounded-lg py-1 px-2 z-50 pointer-events-none transition-opacity duration-200 ${className}`}
          style={{
            top: `${position.y + 10}px`,
            left: `${position.x + 10}px`,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default MouseTooltip;
