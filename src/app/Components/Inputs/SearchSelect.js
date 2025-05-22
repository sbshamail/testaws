"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { twMerge } from "tailwind-merge";

const SearchSelect = ({
  label,
  value,
  setvalue,
  list,
  placeholder,
  localStoragePlaceHolder,
  defaultValue1,
  width,
  className,
}) => {
  let renamedOptions = [];

  renamedOptions.push({
    label: "All",
    value: "-1",
  });

  const dealerOptions = list?.filter((option) => option.text !== "ALL");
  const dealerOptions1 = list?.filter(
    (option) => option.value === defaultValue1
  );

  dealerOptions.forEach((option) => {
    renamedOptions.push({
      label: option.text,
      value: option.value,
    });
  });

  // const handleClearSelection = () => {
  //   setvalue(null);
  // };

  // console.log("bro code", renamedOptions);

  return (
    <div className="">
      <Autocomplete
        defaultSelectedKey="-1"
        aria-label={label || placeholder || "search Select"}
        label={label}
        placeholder={placeholder}
        className={twMerge(
          ` ${width ? `w-${width}` : "w-full"} rounded-0 font-light`,
          className
        )}
        defaultItems={renamedOptions}
        onSelectionChange={(e) => {
          setvalue(e);
        }}
        onClick={(e) => {
          if (e.target && e.target.value) {
            e.target.select();
          }
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default SearchSelect;
