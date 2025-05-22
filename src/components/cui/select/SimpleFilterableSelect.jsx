"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import Input from "@/app/Components/Inputs/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomButton } from "../button/CustomButton";
import { twMerge } from "tailwind-merge";

// Sample timezone data
const demo = [
  { value: "1", text: "International Date Line West" },
  { value: "2", text: "Coordinated Universal Time-11" },
  { value: "3", text: " Hawaii" },
];

export function SimpleFilterableSelect({
  label,
  labelPosition = "top", //"inside" | "top";
  placeholder,
  className = "",
  options = demo,
  listClass,
  value,
  setvalue,
  onChange,
  keyTitle = "text",
  keyId = "value",
  align = "center",
}) {
  const [open, setOpen] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState(null);
  const [selectedText, setSelectedText] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const triggerRef = React.useRef(null);
  const [minWidth, setMinWidth] = React.useState(undefined);

  React.useEffect(() => {
    if (triggerRef.current) {
      const width = triggerRef.current.clientWidth;
      setMinWidth(width);
    }
    setSearchQuery("");
  }, [open]); // Run when popover opens

  React.useEffect(() => {
    if (options) {
      const getTitle = options.find((item) => item[keyId] === value);

      if (getTitle) {
        setSelectedText(getTitle?.[keyTitle]);
      } else {
        setSelectedText("");
      }
    }
  }, [value, setvalue]);
  // Filter options based on search query
  const filteredTimezones = React.useMemo(() => {
    if (!searchQuery?.trim()) return options;

    const query = searchQuery?.toLowerCase().trim();
    return options.filter((timezone) =>
      timezone.text.toLowerCase().includes(query)
    );
  }, [searchQuery, options]);

  // Handle selection
  const handleSelect = (timezone) => {
    setvalue(timezone.value);

    setSearchQuery(null);
    onChange?.(timezone.value);
    setOpen(false);
  };
  const handleClear = (e) => {
    e.stopPropagation(); // Prevent triggering the dropdown
    setvalue("");
    onChange?.("");
    setSearchQuery(null);
  };

  return (
    <div className={twMerge(`space-y-2 relative w-48 `, ` ${className}`)}>
      {label && labelPosition !== "inside" && (
        <label
          htmlFor="timezone-select"
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            ref={triggerRef}
            className={`relative flex justify-between gap-2 items-center bg-secondary shadow shadow-border p-2 select-none rounded-lg overflow-hidden ${className} ${
              !value && "text-muted-foreground"
            }`}
          >
            {label && labelPosition === "inside" && (
              <label
                htmlFor="timezone-select"
                className="absolute left-2 top-1 text-[10px] text-muted-foreground pointer-events-none"
              >
                {label}
              </label>
            )}
            <span
              className={`w-full truncate ${
                labelPosition === "inside" && "mt-2"
              }`}
            >
              {selectedText ? (
                selectedText
              ) : (
                <span className="text-muted-foreground">
                  {" "}
                  {placeholder ?? label}
                </span>
              )}
            </span>
            <div className="flex items-center">
              {value && (
                <CustomButton
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 mr-1 rounded-full hover:bg-muted"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </CustomButton>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className={"w-max bg-card shadow shadow-border p-0  m-0"}
          align={align}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlightedIndex((prev) =>
                Math.min(prev + 1, filteredTimezones.length - 1)
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlightedIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === "Enter") {
              const selected = filteredTimezones[highlightedIndex];
              if (selected) handleSelect(selected);
            }
          }}
          tabIndex={0}
        >
          <div
            className={`space-y-1 w-full  ${listClass}`}
            style={{ minWidth: minWidth }}
          >
            <Input
              placeholder={`Search ${label?.toLowerCase() || ""}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 m-0 w-full bg-transparent rounded-none border-0 border-b-1 border-border"
            />
            <ScrollArea className="w-full  rounded-md p-0  m-0">
              <div className="max-h-[300px] overflow-y-auto">
                {filteredTimezones?.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No Data found.
                  </div>
                ) : (
                  filteredTimezones?.map((timezone, index) => (
                    <div
                      key={timezone.value}
                      className={cn(
                        "w-full flex px-1 items-center rounded-md py-2 text-sm cursor-pointer hover:bg-accent",
                        index === highlightedIndex &&
                          "bg-accent text-accent-foreground",
                        value === timezone.value && "bg-accent"
                      )}
                      onClick={() => handleSelect(timezone)}
                    >
                      {value === timezone.value && (
                        <Check
                          className={cn(
                            "mr-1 w-2",
                            value === timezone.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      )}
                      <span className="px-2">{timezone.text}</span>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
