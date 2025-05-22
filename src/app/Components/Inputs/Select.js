import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
const Select = ({
  label,
  value,
  setvalue,
  options = [],
  placeholder,
  isDisabled,
  defaultDealer,
  width,
  className,
  onlyLabel,
  contentWidth, // New Prop to control absolute positioning
  keyTitle = "text",
  keyValue = "value",
}) => {
  // Transform options to match expected format
  const renamedObject =
    options?.length > 0
      ? options.map((item) => ({
          label: item?.[keyTitle] || "Unnamed", // Fallback label
          value: item?.[keyValue]?.toString() || "", // Ensure value is a string
        }))
      : [];

  return (
    <div
      className={twMerge(
        `${width ? `w-${width}` : ""} flex flex-col gap-2 `, // Ensure container is relative
        className
      )}
    >
      {!onlyLabel && label && <label>{label}</label>}
      <Autocomplete
        id={label || placeholder}
        autoComplete="off"
        label={onlyLabel}
        aria-label={label || placeholder}
        isDisabled={isDisabled || renamedObject.length === 0} // Disable if no options
        placeholder={placeholder ?? label}
        defaultItems={renamedObject}
        onClear={() => setvalue()}
        onSelectionChange={(selectedKey) => {
          if (!selectedKey) {
            setvalue(); // Set to undefined when cleared
          } else {
            const selected = renamedObject.find(
              (item) => item.value === selectedKey
            );
            if (selected) {
              setvalue(selected.value);
            }
          }
        }}
        selectedKey={value?.toString() || defaultDealer?.toString() || null}
        classNames={{
          popoverContent: `min-w-max ${contentWidth} bg-secondary text-secondary-foreground`,
          listbox: "bg-secondary text-secondary-foreground",
          item: "bg-secondary text-secondary-foreground hover:bg-muted hover:text-muted-foreground",
        }}
        // inputProps={{
        //   classNames: {
        //     input: "bg-white text-secondary-foreground",
        //   },
        // }}
        menuTrigger="focus"
        onClick={(e) => {
          if (e.target && e.target.value) {
            e.target.select();
          }
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.value} value={item.value}>
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default Select;
