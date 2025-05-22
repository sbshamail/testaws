import React from "react";

const CheckboxWithText = ({
  label,
  checked,
  setchecked,
  bg,
  color,
  icon,
  width,
}) => {
  // Normalize the checked state to boolean
  const isChecked =
    checked === true || checked === 1 || checked === "1" || checked === "true";

  const handleCheckboxChange = () => {
    // Toggle the checked value, ensuring it switches between normalized true/false equivalents
    const newValue = isChecked ? "0" : "1"; // Default toggle for 0/1
    if (typeof checked === "boolean") {
      setchecked(!isChecked); // For boolean values
    } else if (typeof checked === "string") {
      setchecked(isChecked ? "0" : "1"); // For string "0"/"1"
    } else if (typeof checked === "number") {
      setchecked(isChecked ? 0 : 1); // For number 0/1
    }
  };

  return (
    <div
      className={`${bg} bg-secondary text-secondary-foreground flex flex-row items-center w-${width} rounded-md h-10 text-sm ${
        color && "text-" + color
      } font-semibold`}
    >
      <div
        className={`w-1/12 h-full border-r ${
          color ? "border-" + color : "border-gray-500"
        } p-2 flex items-center`}
      >
        <input
          type="checkbox"
          checked={isChecked} // Use the normalized value to check the box
          onChange={handleCheckboxChange}
          className={`w-full h-4 border-transparent focus:outline-none ${bg} p-2 rounded-md `}
        />
      </div>
      <label className="w-full flex items-center gap-2 px-5">
        <div>{label}</div>
        {icon && icon}
      </label>
    </div>
  );
};

export default CheckboxWithText;
