import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { Controller } from "react-hook-form";

const SelectHook = ({
  label,
  control,
  name,
  data,
  placeholder,
  isDisabled,
  errors,
  className,
  id = "id", // Title field to display
  title = "title", // This is the main field to save when selected
}) => {
  return (
    <div className={twMerge(` flex flex-col gap-2 `, className)}>
      {label && <label className="mb-1">{label}</label>}

      <div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Autocomplete
              className={`rounded-lg border ${
                errors[name] ? "!border-red-500" : "border-transparent"
              }`}
              aria-label={label || placeholder}
              isDisabled={isDisabled}
              defaultItems={data ?? []}
              placeholder={placeholder}
              selectedKey={field.value?.toString()} // Use field value from React Hook Form
              onSelectionChange={(selectedKey) => {
                field.onChange(selectedKey); // Pass the selected value back to React Hook Form
              }}
              menuTrigger="focus"
              onClick={(e) => {
                if (e.target && e.target.value) {
                  e.target.select();
                }
              }}
            >
              {(item) => (
                <AutocompleteItem key={item[id]} value={item[id]}>
                  {item[title]}
                </AutocompleteItem>
              )}
            </Autocomplete>
          )}
        />
        {/* Show error message if validation fails */}
        {errors && errors[name] && (
          <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
        )}
      </div>
    </div>
  );
};

export default SelectHook;
