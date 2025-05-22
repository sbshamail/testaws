import React, { useRef} from "react";
import Image from "next/image";
import { AiOutlineCloudUpload,AiOutlineFileDone } from "react-icons/ai";
const FileUpload = ({ uploadedfile, setuploadedfile,width,height }) => {
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setuploadedfile(event.target.result); // Display uploaded image
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setuploadedfile(null); // Clear the uploaded image
    }
  };

  return (
    <button onClick={handleFileClick} className="w-full h-32 border-dashed border-2 flex justify-center items-center">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {uploadedfile ?
        <AiOutlineFileDone size={50} color="green" />:
        <AiOutlineCloudUpload size={50} color="#ccc" />
      }
    </button>
  );
};

export default FileUpload;
