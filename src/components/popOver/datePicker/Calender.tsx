"use client";
import React, { useState } from "react";
import AlterDatePicker from "@/@core/engineComponents/calender/AlterDatePicker";
import {
  PopOver,
  PopOverContent,
  PopOverTrigger,
} from "@/@core/engineComponents/popOver/PopOver";
import HButton from "@/components/button/HButton";
import Shadow from "@/components/tag/Shadow";
const Calender = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  // console.log("calender date", date);

  return (
    <PopOver>
      <PopOverTrigger>
        <HButton className="ms-2">Calender</HButton>
      </PopOverTrigger>
      <PopOverContent>
        <Shadow space="0" className="h-full">
          <AlterDatePicker
            mode="single"
            selected={date}
            onSelect={setDate}
            className=" "
          />
        </Shadow>
      </PopOverContent>
    </PopOver>
  );
};

export default Calender;
