"use client";

import React, { useId } from "react";
import { FiCamera, FiX } from "react-icons/fi";

const ProfilePictureUpload = ({
  selectedFile,
  onFileChange,
  maxSizeInMB = 1,
  width = "h-24",
  height = "w-24",
  className = "",
  Icon = FiCamera,
  IconClass,
  id: customId,
  showClear = true,
}) => {
  const generatedId = useId();
  const inputId = customId || `profile-picture-upload-${generatedId}`;
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert(`File size must be less than ${maxSizeInMB}MB`);
        return;
      }
      onFileChange(file);
    }
  };
  const handleClear = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering the file upload
    onFileChange(null);
  };
  return (
    <div
      className={`relative group overflow-hidden rounded-md border-2 border-blue-100 ${width} ${height} ${className}`}
    >
      {selectedFile ? (
        <img
          src={
            typeof selectedFile === "string"
              ? selectedFile
              : URL.createObjectURL(selectedFile)
          }
          alt="Profile"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          <Icon className={`h-8 w-8 text-foreground/50 ${IconClass}`} />
        </div>
      )}

      {/* Clear button - positioned outside the label */}
      {showClear && selectedFile && (
        <button
          type="button"
          onClick={handleClear}
          className="hidden group-hover:flex absolute top-1 right-1 z-20  h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Clear image"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}

      <label
        htmlFor={inputId}
        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100"
        style={{
          clipPath: selectedFile
            ? "polygon(0 0, 100% 0, 100% calc(100% - 30px), 0 100%)"
            : "none",
        }}
      >
        <Icon className={`h-8 w-8 text-foreground ${IconClass}`} />
        <span className="sr-only">Upload picture</span>
      </label>
      <input
        type="file"
        id={inputId}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        max={`${maxSizeInMB * 1024 * 1024}`} // Convert MB to bytes
      />
    </div>
  );
};

export default ProfilePictureUpload;
