"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import usePopOver from "./usePopOver";

export const useIdSelect = ({ list, idName, idField, value, setValue }) => {
  const { divRef, open, setOpen, dropdownPositionClass } = usePopOver();
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleClickOutside = useCallback(
    (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        if (list.some((item) => item[idName] !== searchTerm)) {
          setSearchTerm("");
        }
        setOpen(false);
      }
    },
    [divRef, idName, list, searchTerm, setOpen]
  );
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // show filter value from input
  const filteredList = searchTerm
    ? list.filter((item) =>
        item[idName]?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      )
    : list;
  const selectedItem = list.find((item) => item[idField] === value);

  //show input value
  const inputValue = selectedItem ? selectedItem[idName] : "";

  // keyboard event on down key
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowDown") {
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredList.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === "ArrowUp") {
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredList.length - 1
        );
      } else if (event.key === "Enter" && highlightedIndex !== -1) {
        event.preventDefault(); // Prevent default behavior of the Enter key
        setValue(filteredList[highlightedIndex][idField]);
        setSearchTerm("");
        setOpen(false);
        setHighlightedIndex(-1);
        event.stopPropagation(); // Stop propagation of the event to prevent affecting other buttons or form submissions
      } else if (event.key === "Escape" || (event.key === "Tab" && open)) {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    },
    [filteredList, highlightedIndex, idField, open, setOpen, setValue]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open, handleKeyDown]);

  const handleInputKeyDown = (event) => {
    if (event.key === " " && !open) {
      setOpen(true);
    }
  };

  return {
    divRef,
    inputRef,
    // states
    open,
    setOpen,
    searchTerm,
    highlightedIndex,
    setHighlightedIndex,
    setSearchTerm,
    filteredList,
    inputValue,
    handleInputKeyDown,
    dropdownPositionClass,
  };
};
