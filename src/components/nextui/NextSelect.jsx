import { Select, SelectItem } from "@nextui-org/react";

const NextSelect = ({
  label,
  value,
  setvalue,
  options = [],
  placeholder,
  isDisabled,
  labelPlacement = "outside", //inside, outside-left
  contentWidth, // New Prop to control absolute positioning
  keyTitle = "text",
  keyValue = "value",
  style,
  className,
  onlySelect,
}) => {
  // Transform options to match expected format
  const renamedObject =
    options?.length > 0
      ? options.map((item) => ({
          label: item?.[keyTitle] || "Unnamed", // Fallback label
          value: item?.[keyValue]?.toString() || "", // Ensure value is a string
        }))
      : [];
  const OnlySelect = (labell) => {
    return (
      <Select
        labelPlacement={labelPlacement}
        allowsCustomValue={true}
        label={labell}
        id={label || placeholder}
        style={{ borderRadius: "8px", ...style }}
        className={className}
        aria-label={label || placeholder}
        isDisabled={isDisabled || renamedObject.length === 0} // Disable if no options
        placeholder={
          renamedObject.length === 0
            ? "No options available"
            : placeholder ?? label
        }
        defaultItems={renamedObject}
        onChange={(e) => setvalue(e.target.value)}
        // onSelectionChange={(selectedKeys) => {
        //     const selectedKey = Array.from(selectedKey)[0];
        //     setvalue(selectedKey);
        //   }
        // }
        value={value}
        // selectedKeys={value?.toString()}
        classNames={{
          innerWrapper: "",
          description: "",
          popoverContent: `min-w-max ${contentWidth} `,
        }}
      >
        {renamedObject.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    );
  };
  return onlySelect ? (
    OnlySelect(label)
  ) : (
    <div className="min-w-max">
      <label>{label}</label>
      {OnlySelect()}
    </div>
  );
};

export default NextSelect;
