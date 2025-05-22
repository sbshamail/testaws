import React from "react";

/**
 * A reusable checkbox component with custom change handling.
 * @param {boolean} [checked=false] - The current checked state of the checkbox.
 * @param {Function} [onChange] - Callback function to handle change events, receives the new checked state as an argument.
 * @param {string} [className] - Additional CSS class names for styling the checkbox.
 * @returns {JSX.Element} - A styled input of type checkbox.
 */
const Checkbox = ({
  checked = false,
  onChange,
  className,
  type = "checkbox",
}) => {
  const [check, setChecked] = React.useState(checked);

  React.useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const handleChange = () => {
    if (onChange) {
      onChange(!checked);
    } else {
      setChecked(!check);
    }
  };

  return (
    <input
      className={`cursor-pointer checkbox ${className || ""}`}
      type={type}
      checked={check}
      onChange={handleChange}
    />
  );
};

export default Checkbox;
