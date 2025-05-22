"use client";
import React, { useState } from "react";
import Image from "next/image";
import ViewAllModal from "./ViewAllModal";

const StatusCard = ({ item, statuslist }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (item.text === "View All") {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`flex flex-row items-center gap-2 ${
          item.available === "0" ? "hidden grayscale" : ""
        } ${
          item.text === "View All"
            ? "cursor-pointer hover:scale-105 grayscale"
            : ""
        } rounded-lg`}
        onClick={openModal}
      >
        <Image
          src={"/images/" + item.src}
          width={40}
          height={40}
          alt={item.text}
        />
        <div
          className={` ${
            item.text === "Active Features"
              ? "text-xl font-bold leading-6 text-muted-foreground"
              : "leading-6 font-medium text-sm text-muted-foreground"
          }`}
        >
          {item.text}
        </div>
      </div>

      <ViewAllModal
        item={item}
        isOpen={isModalOpen}
        onClose={closeModal}
        statuslist={statuslist}
      />
    </>
  );
};

export default StatusCard;
