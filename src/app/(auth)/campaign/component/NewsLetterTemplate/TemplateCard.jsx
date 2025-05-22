import Image from "next/image";
import React from "react";

const TemplateCard = ({ template, size = "large", handleTemplateSelect }) => {
  return (
    <div
      className={`flex-shrink-0  cursor-pointer transition-all duration-200 hover:scale-105`}
      onClick={() => handleTemplateSelect(template)}
    >
      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow       ">
        <div
          className={`${
            size === "large" ? "h-48" : "h-40"
          } relative overflow-hidden rounded-t-lg`}
        >
          <Image
            src={template.image}
            alt={template.title}
            fill
            className="object-cover"
            sizes={size === "large" ? "384px" : "320px"}
            priority
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900">{template.title}</h3>
          {size === "large" && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {template.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
