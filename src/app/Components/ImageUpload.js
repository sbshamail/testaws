import React, { useRef } from "react";
import Image from "next/image";
import { BsCameraFill } from "react-icons/bs";
const ImageUpload = ({ uploadedimage, setuploadedimage, width, height }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setuploadedimage(event.target.result); // Display uploaded image
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setuploadedimage(null); // Clear the uploaded image
    }
  };

  return (
    <button onClick={handleImageClick}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {uploadedimage ? (
        <Image
          src={uploadedimage}
          className="object-contain max-w-full max-h-full"
          alt="Uploaded"
          width={width}
          height={height}
        />
      ) : (
        <BsCameraFill size={height} color="#ccc" />
      )}
    </button>
  );
};

export default ImageUpload;
