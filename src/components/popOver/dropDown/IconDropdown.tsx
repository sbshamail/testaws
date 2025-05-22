import {
  PopOver,
  PopOverContent,
  PopOverTrigger,
} from "@/@core/engineComponents/popOver/PopOver";
import HIconify from "@/components/icon/HIconify";
import Shadow from "@/components/tag/Shadow";

import React, { FC, useState } from "react";

interface ContentItem {
  [key: string]: any;
  icon?: string;
  title: string;
}
interface Props {
  icon?: string;
  contents?: ContentItem;
  contentId?: string;
}

const IconDropdown: FC<Props> = ({
  icon,
  contents = [
    {
      title: "Create",
      icon: "tabler:plus",
    },
    {
      title: "Edit",
      icon: "tabler:edit",
    },
  ],
  contentId = "title",
}) => {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle(false);
  };
  return (
    <>
      <PopOver toggle={toggle}>
        <PopOverTrigger>
          <HIconify
            fontSize="2rem"
            icon={icon || "mdi:call-to-action"}
            className={`iconPrimary`}
          />
        </PopOverTrigger>
        <PopOverContent>
          <Shadow space="0">
            <div className="flex flex-col  ">
              {contents?.map((content: ContentItem, index: number) => (
                <span
                  key={index}
                  className="w-full px-2 py-1 flex items-center space-x-2 uppercase cursor-pointer hover:bg-accent"
                  onClick={() => handleToggle()}
                >
                  {content?.icon && (
                    <HIconify fontSize="0.9rem" icon={content.icon} />
                  )}
                  <span>{content[contentId]}</span>
                </span>
              ))}
            </div>
          </Shadow>
        </PopOverContent>
      </PopOver>
    </>
  );
};

export default IconDropdown;
