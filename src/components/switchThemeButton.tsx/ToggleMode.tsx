"use client";
import { useTheme } from "@/utils/useContext/themeChange/themeChangeContext";

const ToggleMode = () => {
  const { labelTheme, toggleTheme } = useTheme();
  const colors = [
    { color: "#008000", label: "green" }, // Green
    { color: "#2563EB", label: "blue" }, // Blue
    { color: "#FFA500", label: "orange" }, // Orange
    { color: "#000000", label: "black" }, // Black
    { color: "#E11D48", label: "rose" },
  ];

  const handleColorChange = (label: string) => {
    if (toggleTheme) {
      toggleTheme(label);
    }
  };

  return (
    <div className="flex flex-end space-x-10">
      <div
        className="space-x-1"
        style={{
          display: "flex",
          margin: "0 auto",
        }}
      >
        {colors.length > 0 &&
          colors.map((item, index) => (
            <div
              key={index}
              onClick={() => handleColorChange(item.label)}
              className={`rounded-3xl w-5 h-5 border border-[${item.color.toString()}] cursor-pointer flex justify-center items-center bg-[${item.color.toString()}] ${
                labelTheme === item.label ? ` border-4 rounded-3xl p-2` : ""
              }`}
              style={{
                background: item.color,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default ToggleMode;
