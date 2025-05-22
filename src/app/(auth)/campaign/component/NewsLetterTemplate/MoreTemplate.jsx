import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import TemplateCard from "./TemplateCard";
import { moreTemplates } from "./data";

const MoreTemplate = ({ moreSliderRef, handleTemplateSelect, scroll }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">More</h3>
        <div className="flex gap-2">
          <MdChevronLeft
            className="text-2xl cursor-pointer"
            onClick={() => scroll("left", moreSliderRef)}
          />
          <MdChevronRight
            onClick={() => scroll("right", moreSliderRef)}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>
      <div
        ref={moreSliderRef}
        className="flex overflow-x-auto hide-scrollbar gap-4"
      >
        {moreTemplates.map((template, index) => (
          <div key={index} className="w-64  flex-shrink-0">
            <TemplateCard
              template={template}
              size="large"
              handleTemplateSelect={handleTemplateSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreTemplate;
