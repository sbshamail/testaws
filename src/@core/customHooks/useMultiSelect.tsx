"use client";
import { RefObject, useCallback, useEffect, useState } from "react";
import { usePopOver } from "./usePopOver";

interface Props {
  list: Array<{ [key: string]: any }>;
  itemId: string;
  values: any;
  setValues: (value: any) => void;
}

interface returnProps {
  divRef: RefObject<HTMLDivElement>;
  open: boolean;
  setOpen: (open: boolean) => void;
  dropdownPositionClass: string;
  highlightedIndex: number;
  setHighlightedIndex: (value: number) => void;
}
export const useMultiSelect = ({
  list,
  itemId,
  values,
  setValues,
}: Props): returnProps => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const { divRef, open, setOpen, dropdownPositionClass } = usePopOver();
  // keyboard event on down key
  const handleKeyDown = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault(); // Prevent outer window scroll
        setHighlightedIndex((prevIndex) =>
          prevIndex < list.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault(); // Prevent outer window scroll
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : list.length - 1
        );
      } else if (event.key === "Enter" && highlightedIndex !== -1) {
        event.preventDefault(); // Prevent default behavior of the Enter key
        const selectedItem = list[highlightedIndex];
        if (values.some((v: any) => v[itemId] === selectedItem[itemId])) {
          // Remove the item if it is already included
          setValues(
            values.filter((v: any) => v[itemId] !== selectedItem[itemId])
          );
        } else {
          // Add the item if it is not included
          setValues([...values, selectedItem]);
        }
        event.stopPropagation(); // Stop propagation of the event to prevent affecting other buttons or form submissions
      } else if (event.key === "Escape" || (event.key === "Tab" && open)) {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    },
    [highlightedIndex, itemId, list, open, setOpen, setValues, values]
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      if (open) {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }
    }
  }, [open, highlightedIndex, list, handleKeyDown]);
  return {
    divRef,
    open,
    setOpen,
    dropdownPositionClass,
    highlightedIndex,
    setHighlightedIndex,
  };
};
