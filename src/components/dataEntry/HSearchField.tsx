import React, { ChangeEvent, FC } from "react";
import HIconify from "../icon/HIconify";

interface Props {
  label?: string;
  required?: boolean;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  size?: string | any;
  className?: string;
  setFilterEnter?: (b: boolean) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  maxlength?: string | any;
  max?: number;
  min?: number;
  minLength?: number;
  inputSize?: "0" | "1" | "2" | "3";
  rows?: number;
  id?: string;
}
const HSearchField: FC<Props> = ({
  type,
  name,
  placeholder = "Search ...",
  value,
  setFilterEnter = () => false,
  onChange,
  inputSize,
  size,
  className,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setFilterEnter(true);
    }
  };
  let inputSizeClass = "py-2";
  if (inputSize === "0") {
    inputSizeClass = "!py-0";
  } else if (inputSize === "1") {
    inputSizeClass = "!py-1";
  } else if (inputSize === "2") {
    inputSizeClass = "py-2";
  } else if (inputSize === "3") {
    inputSizeClass = "py-3";
  }
  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden border border-muted hover:border-ring group focus-within:border-primary shadow-sm shadow-ring ">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          className={`${inputSizeClass} ${className} relative border-none outline-none leading-tight  w-full`}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => setFilterEnter(true)}
          className="h-full px-2 w-auto absolute hover:bg-primary border-l border-muted group-focus-within:border-primary group-focus-within:bg-primary right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
        >
          <HIconify
            fontSize={size ? "1.4em" : "1.6em"}
            icon="material-symbols-light:search"
            className={`text-foreground p-0 m-0 group-focus-within:text-primary-foreground`}
          />
        </button>
      </div>
    </div>
  );
};

export default HSearchField;
