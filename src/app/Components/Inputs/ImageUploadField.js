import React, { useRef} from "react";
import Image from "next/image";
import { AiOutlineCloudUpload,AiOutlineFileDone } from "react-icons/ai";
const ImageUploadField = ({ label,uploadedimage, setuploadedimage,width,height }) => {
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
        setuploadedimage(event.target.result); // Display uploaded image
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setuploadedimage(null); // Clear the uploaded image
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label>{label}</label>}
      <button onClick={handleFileClick} className="w-full h-32 border-dashed border-2 flex justify-center items-center">
      
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {uploadedimage ?
          <Image
            src={uploadedimage}
            className="object-contain max-w-full max-h-full"
            alt="Uploaded"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          /> :
          <AiOutlineCloudUpload size={50} color="#ccc" />
        }
      </button>
    </div>
   
  );
};

export default ImageUploadField;
