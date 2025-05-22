"use client";
import React, { useState, useEffect, useRef } from "react";
import Iconify from "../@core/icon/HIconify";

const HSelectFieldCreateFields = ({
  name,
  title,
  label,
  list,
  values,
  setValues,
  required,
}) => {
  const [open, setOpen] = useState(false);

  //   const [value, setValue] = useState('');
  const divRef = useRef();
  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      //Close only if clicking outside the "refrence" div
      setOpen(false);
    }
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  const handleClick = (item) => {
    setValues([...values, item]);
    setOpen(false);
  };
  const Required = () => <span className="text-primary">*</span>;

  return (
    <>
      <div ref={divRef} className=" mb-3 inline-block ">
        <div className="group">
          {label && (
            <label>
              Select <span className="capitalize">{name || "Value"} *</span>
              &nbsp;
              {required && Required()}
            </label>
          )}
          <div
            style={{ border: "1px solid" }}
            className={`p-2  rounded border  group-hover:border-primary cursor-pointer select-none`}
            onClick={() => setOpen(!open)}
          >
            {title || "Choose a select item"}
            <Iconify icon="gridicons:dropdown" />
          </div>
          {open && (
            <div
              style={{ border: "1px solid" }}
              className="absolute  z-[100] border !border-gray-400"
            >
              <div className=" rounded w-full min-w-[200px] max-h-[300px] overflow-y-auto flex flex-col  bg-white shadow-xl border-1 ">
                {list?.map((item, index) => (
                  <span
                    style={{ borderBottom: "1px solid" }}
                    className={`w-full !border-b-2 !border-gray-200  cursor-pointer hover:bg-blue-600 hover:text-white p-2 `}
                    key={index}
                    onClick={() => handleClick(item)}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HSelectFieldCreateFields;
